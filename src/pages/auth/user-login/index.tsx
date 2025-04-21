import CustomSheet from '@/components/reusable/base-sheet'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import UserLoginForm from './user-login-form'

export default function UserLogin() {
  const [open, setOpen] = useState<boolean>(false)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const loginParam = searchParams.get('login')

    // This is what i am going to use on the log run, but for now, we stick to what i used
    // if(loginParam === "guest") {
    //     setUserAuth(true)
    // } else if(loginParam ==="creator") {
    //     setCreatorAuth(true)
    // } else if (loginParam === "vendor") {
    //     setVendorAuth(true)
    // }

    if (loginParam === 'true') {
      setOpen(true)
    }
  }, [searchParams])

  return (
    <CustomSheet
      hasNav
      open={open}
      setOpen={setOpen}
      size='full'
      side='bottom'
      title='Welcome Back'
      description='Sign in to access your account and manage your events'
      contentClassName='pt-[90px]'
      hasFooter={false}>
      <UserLoginForm />
    </CustomSheet>
  )
}
