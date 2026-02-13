import { ChevronLeft } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLogout } from '@/hooks/use-auth'
import './sidebar.css'

export default function AccountSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const logoutMutation = useLogout()

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    const isProfileActive = () => {
        return location.pathname === '/account' && !location.search.includes('account=wallet')
    }

    const isSupportActive = () => {
        return location.pathname === '/fans/support' || location.pathname === '/support'
    }

    return (
        <aside className='account-sidebar-unique fixed left-0 top-0 h-screen w-[180px] bg-transparent flex flex-col pl-12 pr-4 pt-[100px] pb-8 z-40 pointer-events-none border-r border-white/10'>
            <div className="pointer-events-auto flex flex-col w-full">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className='account-sidebar-back-btn flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors mb-20'
                >
                    <ChevronLeft className='w-5 h-5' strokeWidth={1.5} />
                </button>

                {/* Navigation Items */}
                <nav className='flex flex-col gap-0'>
                    {/* PROFILE */}
                    <div className='mb-0'>
                        <button
                            onClick={() => navigate('/account')}
                            className={`account-sidebar-profile-link flex items-center gap-3 text-left transition-all w-full pb-6 ${isProfileActive()
                                    ? 'text-[#C30010]'
                                    : 'text-white/40 hover:text-white/60'
                                }`}
                        >
                            <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <span className='font-sf-pro-display text-[11px] uppercase tracking-[0.12em] font-normal'>
                                PROFILE
                            </span>
                        </button>
                        <div className='w-full h-[0.5px] bg-white/10 mb-6'></div>
                    </div>

                    {/* SUPPORT */}
                    <div className='mb-0'>
                        <button
                            onClick={() => navigate('/fans/support')}
                            className={`account-sidebar-support-link flex items-center gap-3 text-left transition-all w-full pb-6 ${isSupportActive()
                                    ? 'text-[#C30010]'
                                    : 'text-white/40 hover:text-white/60'
                                }`}
                        >
                            <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                            <span className='font-sf-pro-display text-[11px] uppercase tracking-[0.12em] font-normal'>
                                SUPPORT
                            </span>
                        </button>
                        <div className='w-full h-[0.5px] bg-white/10 mb-6'></div>
                    </div>

                    {/* LOG OUT */}
                    <div className='mb-0'>
                        <button
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                            className='account-sidebar-logout-btn flex items-center gap-3 text-left transition-all w-full pb-6 text-white/40 hover:text-white/60 disabled:opacity-50'
                        >
                            <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </div>
                            <span className='font-sf-pro-display text-[11px] uppercase tracking-[0.12em] font-normal'>
                                {logoutMutation.isPending ? 'LOGGING OUT...' : 'LOG OUT'}
                            </span>
                        </button>
                        <div className='w-full h-[0.5px] bg-white/10'></div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}