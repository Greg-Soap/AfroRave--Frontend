import { useAfroStore } from "@/stores";
import { Link, useNavigate } from "react-router-dom";
import { getRoutePath } from "@/config/get-route-path";
import { getUserInitials } from '@/lib/utils'
import { useLogout } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VendorEditProfileModal } from '@/pages/vendor/profile/edit-profile-modal'
import type { User } from '@/types/auth'

function VendorMenuButton({ user }: { user: User | null }) {
  const navigate = useNavigate()
  const logoutMutation = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="py-2 px-3 h-10 w-10 transition-colors border flex items-center justify-center gap-[5px] rounded-full group border-black text-black hover:bg-black/10 bg-white">
          <span className="font-sf-pro-text text-[14px] uppercase text-black group-hover:text-black">
            {getUserInitials(user)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user?.profile?.firstName} {user?.profile?.lastName}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(getRoutePath('vendor_profile'))}>
          Dashboard
        </DropdownMenuItem>
        <VendorEditProfileModal
          customTrigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Settings
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem onClick={() => logoutMutation.mutate()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function VendorDashboardHeader() {
  const { user } = useAfroStore();

  return (
    <header className="w-full flex justify-center bg-white border-b border-b-light-gray">
      <nav className="relative px-4 md:px-8 w-full flex items-center justify-between py-4">
        <Link to={getRoutePath("home")}>
          <img
            src="/assets/dashboard/creator/ar2.png"
            alt="Logo"
            width={60}
            height={32}
          />
        </Link>

        <div className="flex items-center gap-8">
          <img
            src="/assets/dashboard/creator/bell-icon.png"
            alt="Bell"
            width={20}
            height={22}
          />

          <VendorMenuButton user={user} />
        </div>
      </nav>
    </header>
  );
}
