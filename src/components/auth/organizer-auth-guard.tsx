import { AuthGuard } from './auth-guard';

interface OrganizerAuthGuardProps {
  children: React.ReactNode;
}

export function OrganizerAuthGuard({ children }: OrganizerAuthGuardProps) {
  return (
    <AuthGuard requiredAccountType="Organizer">
      {children}
    </AuthGuard>
  );
} 