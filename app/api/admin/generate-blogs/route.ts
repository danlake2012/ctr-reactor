import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Check for admin authentication
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    const providedPassword = req.headers.get('x-admin-password');
    
    if (!providedPassword || providedPassword !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { topic, count = 1 } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    if (count < 1 || count > 100) {
      return NextResponse.json({ error: 'Count must be between 1 and 100' }, { status: 400 });
    }

    const blogs = [];

    for (let i = 0; i < count; i++) {
      try {
        // Generate unique blog content
        const completion = await openai.chat.completions.create({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: `You are a professional blog writer for CTR-Reactor, a cutting-edge ad performance analysis platform. Write engaging, informative blog posts that are 800-1200 words long. Use emojis strategically throughout the content to make it engaging and modern. Include practical tips, insights, and actionable advice. Write in a friendly but professional tone.`,
            },
            {
              role: 'user',
              content: `Write a unique blog post about: ${topic}. 
              
              Requirements:
              - 800-1200 words
              - Include 5-10 relevant emojis throughout
              - Use markdown formatting (headings, lists, bold, italic)
              - Include an engaging introduction and strong conclusion
              - Add practical examples or case studies
              - Make it SEO-friendly with natural keyword usage
              - Variation ${i + 1} of ${count} (make each unique if generating multiple)
              
              Return ONLY a JSON object with this structure:
              {
                "title": "Engaging blog post title (50-60 characters)",
                "content": "Full markdown blog content (800-1200 words with emojis)",
                "excerpt": "Compelling 150-200 character summary",
                "tags": ["tag1", "tag2", "tag3"]
              }`,
            },
          ],
          temperature: 0.8,
          response_format: { type: 'json_object' },
        });

        const blogData = JSON.parse(completion.choices[0].message.content || '{}');
        
        // Generate detailed, realistic advertising-focused image
        const imagePrompt = `Create a photorealistic, professional image depicting: ${blogData.title}. 

Context: ${blogData.excerpt || blogData.content.substring(0, 200)}

The image should show:
- Real-world advertising scenarios (digital marketing dashboards, Google Ads interfaces, analytics screens, marketing teams at work)
- Professional business environment with modern technology
- Data visualizations showing metrics like CTR (Click-Through Rate), ROAS (Return on Ad Spend), CPC (Cost Per Click)
- Realistic advertising concepts: ad campaigns, PPC advertising, conversion optimization, performance metrics
- Clean, modern corporate aesthetic with authentic lighting and professional photography style
- No text overlays, just pure photorealistic imagery
- Vibrant but professional color scheme focusing on blues, whites, and accent colors

Style: Professional stock photography, high-end business photography, ultra-realistic, sharp focus, modern corporate environment.`;
        
        const imageResponse = await openai.images.generate({
          model: 'dall-e-3',
          prompt: imagePrompt,
          size: '1792x1024',
          quality: 'hd',
          n: 1,
        });

        const imageUrl = imageResponse.data?.[0]?.url || '';

        blogs.push({
          ...blogData,
          imageUrl,
          imagePrompt,
        });

        // Small delay to avoid rate limits
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Error generating blog ${i + 1}:`, error);
        // Continue with other blogs even if one fails
        blogs.push({
          error: `Failed to generate blog ${i + 1}`,
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate blogs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
