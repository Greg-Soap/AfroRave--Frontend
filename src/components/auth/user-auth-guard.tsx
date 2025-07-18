import { AuthGuard } from './auth-guard';

interface UserAuthGuardProps {
  children: React.ReactNode;
}

export function UserAuthGuard({ children }: UserAuthGuardProps) {
  return (
    <AuthGuard requiredAccountType="User">
      {children}
    </AuthGuard>
  );
} 