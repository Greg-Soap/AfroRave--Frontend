import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Upload, X, LogOut } from "lucide-react"
import { useState } from "react"
import { useAfroStore } from "@/stores"
import { useLogout } from '@/hooks/use-auth'

export function CreatorSettingsModal({ customTrigger }: { customTrigger?: React.ReactNode }) {
    const { user } = useAfroStore()
    const logoutMutation = useLogout()
    const [portfolioLink, setPortfolioLink] = useState(user?.portfolio || "")
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {customTrigger ? (
                    customTrigger
                ) : (
                    <Button
                        variant="ghost"
                        className="w-full justify-between items-center px-6 py-3 h-14 hover:bg-gray-50 text-gray-500 hover:text-black font-sf-pro-display text-[13px] uppercase tracking-wider font-normal border-b border-gray-50 last:border-0"
                    >
                        <span>Account Settings</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent noCancel className="sm:max-w-[500px] w-[95vw] flex flex-col items-center h-[90vh] sm:h-[85vh] overflow-hidden rounded-[20px] p-0 bg-white gap-0 outline-none data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-500">
                <div className="sr-only">
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Make changes to your creator profile here.</DialogDescription>
                </div>
                <div
                    className="absolute z-[9999]"
                    style={{ top: '16px', right: '16px' }}
                >
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-black flex items-center justify-center border-0 shadow-none"
                        >
                            <X className="h-5 w-5 stroke-[2.5px]" />
                        </Button>
                    </DialogClose>
                </div>
                <Tabs defaultValue="profile" className="w-full flex flex-col h-full overflow-hidden">
                    <div className="flex justify-start w-full pt-4 pb-0 shrink-0 border-b border-gray-100 px-6">
                        <TabsList className="bg-transparent gap-8 h-10 p-0 justify-start w-full">
                            <TabsTrigger value="profile" className="data-[state=active]:text-[#D32F2F] data-[state=active]:shadow-none data-[state=active]:bg-transparent text-gray-500 hover:text-gray-800 text-[14px] font-medium font-sf-pro-display border-b-2 border-transparent data-[state=active]:border-[#D32F2F] rounded-none px-0 pb-2 transition-all">Profile</TabsTrigger>
                            <TabsTrigger value="account" className="data-[state=active]:text-[#D32F2F] data-[state=active]:shadow-none data-[state=active]:bg-transparent text-gray-500 hover:text-gray-800 text-[14px] font-medium font-sf-pro-display border-b-2 border-transparent data-[state=active]:border-[#D32F2F] rounded-none px-0 pb-2 transition-all">Account</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="flex flex-col items-center gap-8 w-full p-6 pt-6 overflow-y-auto flex-1">
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-[100px] rounded-full bg-black flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm relative group cursor-pointer">
                                <img src={user?.profilePicture || "/assets/dashboard/store.png"} alt="Profile" className="w-[60%] object-contain" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Upload className="text-white w-6 h-6" />
                                </div>
                            </div>
                            <Button variant="link" className="text-[#007AFF] h-auto p-0 text-[12px] font-medium hover:no-underline">Edit picture</Button>
                        </div>

                        <div className="w-full space-y-6 pb-6">
                            {/* Form Fields Grid */}
                            <div className="grid grid-cols-[100px_1fr] gap-y-5 items-center w-full">
                                <Label htmlFor="name" className="text-gray-600 font-normal text-[13px]">Name</Label>
                                <Input id="name" defaultValue={`${user?.profile.firstName} ${user?.profile.lastName}`} className="text-black border-gray-300 h-[42px] text-[13px] rounded-[6px] focus-visible:ring-1 focus-visible:ring-gray-400 w-full" />

                                <Label htmlFor="business" className="text-gray-600 font-normal text-[13px]">Company Name</Label>
                                <Input id="business" defaultValue={user?.businessName || user?.companyName} className="text-black border-gray-300 h-[42px] text-[13px] rounded-[6px] focus-visible:ring-1 focus-visible:ring-gray-400 w-full" />

                                <Label htmlFor="email" className="text-gray-600 font-normal text-[13px]">Email Address</Label>
                                <Input id="email" defaultValue={user?.email} className="text-[#007AFF] border-gray-300 h-[42px] text-[13px] rounded-[6px] focus-visible:ring-1 focus-visible:ring-gray-400 w-full" />

                                <Label htmlFor="phone" className="text-gray-600 font-normal text-[13px] whitespace-nowrap">Phone Number</Label>
                                <Input id="phone" defaultValue={user?.telphone || "+234 814 602 7405"} className="text-[#007AFF] border-gray-300 h-[42px] text-[13px] rounded-[6px] focus-visible:ring-1 focus-visible:ring-gray-400 w-full" />

                                <Label htmlFor="gender" className="text-gray-600 font-normal text-[13px]">Gender</Label>
                                <Select defaultValue={user?.gender || "female"}>
                                    <SelectTrigger className="w-full border-gray-300 text-gray-500 font-normal h-[42px] text-[13px] rounded-[6px] focus:ring-1 focus:ring-gray-400">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Web Url / Portfolio */}
                            <div className="flex flex-col border-t border-gray-100 mt-2">
                                <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer group hover:bg-gray-50/50 transition-colors" onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}>
                                    <div className="grid grid-cols-[100px_1fr] items-center w-full">
                                        <Label className="text-gray-600 font-normal text-[13px] cursor-pointer">Web Url</Label>
                                        <span className="text-gray-400 text-[12px] font-normal">{portfolioLink ? 'Link Added' : 'Add link'}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-black shrink-0" />
                                </div>
                                {isPortfolioOpen && (
                                    <div className="px-4 pb-4 pt-2 bg-gray-50 rounded-b-md mb-2">
                                        <div className="flex flex-col gap-1">
                                            <Input value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} placeholder="https://" className="h-8 text-xs bg-white" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button className="w-full bg-[#B91C1C] hover:bg-red-800 text-white h-[44px] rounded-[6px] font-medium text-[14px] shadow-sm mt-2 uppercase tracking-wide">
                                SAVE
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="account" className="flex flex-col items-center w-full p-6 pt-6 overflow-y-auto flex-1 gap-6">
                        <div className="flex flex-col w-full gap-0">
                            <AccountSettingItem label="Password" value="Change Password" isAction />
                            <AccountSettingItem label="Language" value="English" />

                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <p className="text-[13px] text-gray-600 font-sf-pro-display">Theme</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 cursor-pointer">
                                        <div className="size-4 rounded-full border border-red-600 flex items-center justify-center">
                                            <div className="size-2 bg-red-600 rounded-full" />
                                        </div>
                                        <span className="text-[13px] text-black">Light</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 cursor-pointer opacity-50">
                                        <div className="size-4 rounded-full border border-gray-300" />
                                        <span className="text-[13px] text-black">Dark</span>
                                    </div>
                                </div>
                            </div>

                            <div onClick={handleLogout} className="flex items-center gap-2 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 -mx-2 px-2 transition-colors mt-2 text-[#B91C1C]">
                                <LogOut className="size-4" />
                                <span className="text-[13px] font-medium font-sf-pro-display">Log Out</span>
                            </div>
                        </div>

                        <div className="mt-auto w-full flex justify-center pb-2">
                            <Button variant="ghost" className="bg-[#666666] hover:bg-[#555555] text-white hover:text-white text-[12px] h-8 px-4 rounded-[4px] font-medium transition-colors">
                                Delete Account
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

function AccountSettingItem({ label, value, isAction }: { label: string, value: string, isAction?: boolean }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <p className="text-[13px] text-gray-600 font-sf-pro-display">{label}</p>
            {isAction ? (
                <button className="text-[13px] text-[#007AFF] hover:underline font-sf-pro-text">{value}</button>
            ) : (
                <p className="text-[13px] text-black font-sf-pro-text">{value}</p>
            )}
        </div>
    )
}
