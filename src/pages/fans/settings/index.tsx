import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
    return (
        <div className='w-full flex-1 flex flex-col items-center px-4 md:px-0 pt-8'>
            <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

            <div className='w-full max-w-[550px] flex flex-col gap-8 pb-[100px]'>
                {/* Notifications Section */}
                <div className='flex flex-col gap-4 p-6 bg-white/5 rounded-lg border border-white/10'>
                    <h2 className='text-lg font-semibold text-white'>Notifications</h2>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-1'>
                            <Label className='text-white'>Email Notifications</Label>
                            <p className='text-xs text-white/60'>Receive updates about your tickets and events</p>
                        </div>
                        <Switch />
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-1'>
                            <Label className='text-white'>SMS Notifications</Label>
                            <p className='text-xs text-white/60'>Get text alerts for important updates</p>
                        </div>
                        <Switch />
                    </div>
                </div>

                {/* Security Section */}
                <div className='flex flex-col gap-4 p-6 bg-white/5 rounded-lg border border-white/10'>
                    <h2 className='text-lg font-semibold text-white'>Security</h2>
                    <div className='flex flex-col gap-4 max-w-md'>
                        <div className='flex flex-col gap-2'>
                            <Label className='text-white'>Current Password</Label>
                            <Input type="password" placeholder="Enter current password" className='bg-transparent border-white/10 text-white' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='text-white'>New Password</Label>
                            <Input type="password" placeholder="Enter new password" className='bg-transparent border-white/10 text-white' />
                        </div>
                        <Button className='w-full mt-2 bg-[#E31E24] hover:bg-[#C30010] text-white'>Update Password</Button>
                    </div>
                </div>

                <div className='flex flex-col gap-4 p-6 bg-white/5 rounded-lg border border-white/10'>
                    <h2 className='text-lg font-semibold text-white text-red-500'>Danger Zone</h2>
                    <Button variant="destructive" className='w-fit'>Delete Account</Button>
                </div>

            </div>
        </div>
    )
}
