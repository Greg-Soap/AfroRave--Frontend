import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getRoutePath } from '@/config/get-route-path'
import { getUserInitials } from '@/lib/utils'
import { useLogout } from '@/hooks/use-auth'
import type { User } from '@/types/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CreatorSettingsModal } from '@/pages/creators/standalone/components/creator-settings-modal'

interface CreatorMenuButtonProps {
  user: User | null
  variant?: 'dark' | 'light'
}

export function CreatorMenuButton({ user, variant = 'light' }: CreatorMenuButtonProps) {
  const navigate = useNavigate()
  const logoutMutation = useLogout()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleDashboardClick = () => {
    if (!user) return

    switch (user.accountType) {
      case 'Organizer':
        navigate(getRoutePath('standalone'))
        break
      case 'Vendor':
        navigate(getRoutePath('vendor_profile'))
        break
      default:
        navigate(getRoutePath('home'))
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`py-2 px-3 h-10 w-10 transition-colors border flex items-center justify-center gap-[5px] rounded-full group ${
              variant === 'dark'
                ? 'border-white text-white hover:bg-white/20 bg-black'
                : 'border-black text-black hover:bg-black/10 bg-white'
            }`}>
            <span
              className={`font-sf-pro-text text-[14px] uppercase ${
                variant === 'dark'
                  ? 'text-white group-hover:text-white'
                  : 'text-black group-hover:text-black'
              }`}>
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
          <DropdownMenuItem onClick={handleDashboardClick}>Dashboard</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSettingsOpen(true)}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings modal rendered outside dropdown to avoid Radix nesting issues */}
      <CreatorSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
