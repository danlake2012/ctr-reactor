import Admin from '../../admin/page';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { key: string };
}

export default function SecureAdminPage({ params }: PageProps) {
  // Allow multiple comma-separated secrets for convenience.
  const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
  const allowed = secretEnv.split(',').map(s => s.trim()).filter(Boolean);

  // If no secret configured, deny access
  if (allowed.length === 0) {
    notFound();
  }

  // decode URI component as URL encoding may be used for special chars or spaces
  const keyParam = decodeURIComponent(params.key || '').trim();

  if (!allowed.includes(keyParam)) {
    // For security, return a 404 so the existence of admin page is hidden
    notFound();
  }

  // key matched, render the admin panel here
  return <Admin />;
}
