import { Link } from 'react-router-dom'
import { getRoutePath } from '@/config/get-route-path'

export function NavLogo() {
  return (
    <Link to={getRoutePath('home')}>
      <img
        src='/assets/landing-page/logo.png'
        alt='Logo'
        width={282}
        height={202}
        className='-ml-7'
      />
    </Link>
  )
}
