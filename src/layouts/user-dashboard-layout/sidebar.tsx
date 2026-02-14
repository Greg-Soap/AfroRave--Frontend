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
        <aside className='fan-sidebar-container'>
            <div className="fan-sidebar-content">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className='fan-sidebar-back-btn'
                >
                    <ChevronLeft className='w-5 h-5' strokeWidth={1.5} />
                </button>

                {/* Navigation Items */}
                <nav className='flex flex-col gap-0'>
                    {/* PROFILE */}
                    <div className='mb-0'>
                        <button
                            onClick={() => navigate('/account')}
                            className={`fan-sidebar-link ${isProfileActive()
                                ? 'fan-sidebar-link-active'
                                : ''
                                }`}
                        >
                            <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                                <svg
                                    width="16"
                                    height="16"
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
                            <span className='fan-sidebar-text'>
                                PROFILE
                            </span>
                        </button>
                        <div className='fan-sidebar-divider'></div>
                    </div>

                    {/* SUPPORT */}
                    <div className='mb-0'>
                        <button
                            onClick={() => navigate('/fans/support')}
                            className={`fan-sidebar-link ${isSupportActive()
                                ? 'fan-sidebar-link-active'
                                : ''
                                }`}
                        >
                            <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                                <svg
                                    width="16"
                                    height="16"
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
                            <span className='fan-sidebar-text'>
                                SUPPORT
                            </span>
                        </button>
                        <div className='fan-sidebar-divider'></div>
                    </div>

                    {/* LOG OUT */}
                    <div className='mb-0'>
                        <button
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                            className='fan-sidebar-link'
                        >
                            <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                                <svg
                                    width="16"
                                    height="16"
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
                            <span className='fan-sidebar-text'>
                                {logoutMutation.isPending ? 'LOGGING OUT...' : 'LOG OUT'}
                            </span>
                        </button>
                        <div className='fan-sidebar-divider'></div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}