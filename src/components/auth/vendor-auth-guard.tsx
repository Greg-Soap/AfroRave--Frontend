import { AuthGuard } from './auth-guard';

interface VendorAuthGuardProps {
  children: React.ReactNode;
}

export function VendorAuthGuard({ children }: VendorAuthGuardProps) {
  return (
    <AuthGuard requiredAccountType="Vendor">
      {children}
    </AuthGuard>
  );
} 