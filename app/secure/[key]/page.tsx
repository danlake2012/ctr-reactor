import Admin from '../../admin/page';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { key: string };
}

export default function SecureAdminPage({ params }: PageProps) {
  const secret = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET;

  // If no secret configured, deny access
  if (!secret) {
    notFound();
  }

  if (params.key !== secret) {
    notFound();
  }

  // key matched, render the admin panel here so we avoid using '/admin'
  return <Admin />;
}
