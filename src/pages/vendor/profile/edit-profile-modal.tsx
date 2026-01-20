import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Plus } from "lucide-react"

import { useState } from "react"

export function VendorEditProfileModal() {
    const [selectedMessage, setSelectedMessage] = useState<number | null>(null)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="px-5 py-2.5 rounded-[6px] gap-3 h-8 bg-red-600 hover:bg-red-700 text-white"
                >
                    <span className="font-sf-pro-text text-xs capitalize">
                        Edit Profile
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center h-[90vh] sm:h-auto overflow-y-auto">
                <DialogHeader className="w-full flex flex-row items-center justify-center relative py-4">
                    {/* Close button is auto-added by DialogContent */}
                </DialogHeader>

                <Tabs defaultValue="profile" className="w-full">
                    <div className="flex justify-center w-full mb-6">
                        <TabsList className="bg-transparent gap-8">
                            <TabsTrigger value="profile" className="data-[state=active]:text-red-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-red-400 text-base font-medium">Profile</TabsTrigger>
                            <TabsTrigger value="inbox" className="data-[state=active]:text-red-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-red-400 text-base font-medium">Inbox</TabsTrigger>
                            <TabsTrigger value="account" className="data-[state=active]:text-red-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-red-400 text-base font-medium">Account</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center overflow-hidden border">
                                <img src="/assets/dashboard/store.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <Button variant="link" className="text-blue-500 h-auto p-0">Edit picture</Button>
                        </div>

                        <div className="w-full space-y-4 px-2">
                            <div className="space-y-1">
                                <Label htmlFor="name" className="text-gray-500 font-normal">Name</Label>
                                <Input id="name" defaultValue="Favour Eseose Atie" className="font-semibold text-black border-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="business" className="text-gray-500 font-normal">Business Name</Label>
                                <Input id="business" defaultValue="Sooyah Bistro" className="font-semibold text-black border-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email" className="text-gray-500 font-normal">Email Address</Label>
                                <Input id="email" defaultValue="eseoseatie22@icloud.com" className="font-semibold text-blue-500 border-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="phone" className="text-gray-500 font-normal">Phone Number</Label>
                                <Input id="phone" defaultValue="+234 814 602 7405" className="font-semibold text-blue-500 border-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="gender" className="text-gray-500 font-normal">Gender</Label>
                                <Select defaultValue="female">
                                    <SelectTrigger className="w-full border-gray-200 text-gray-500">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-2 border-t border-gray-100 flex items-center justify-between py-3 cursor-pointer">
                                <div className="flex flex-col">
                                    <Label className="text-black font-medium text-base">Portfolio</Label>
                                    <span className="text-gray-400 text-sm">Attach file / Add link</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="border-t border-gray-100 flex items-center justify-between py-3 cursor-pointer">
                                <div className="flex flex-col">
                                    <Label className="text-black font-medium text-base">Social Links</Label>
                                    <span className="text-gray-400 text-sm">Add links</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="inbox" className="w-full h-full flex flex-col">
                        {!selectedMessage ? (
                            <>
                                <div className="flex items-center justify-between col-span-full border-b border-gray-100 pb-3">
                                    <div className="flex gap-2">
                                        <Button className="h-7 rounded-full bg-black text-white text-xs px-4">All</Button>
                                        <Button className="h-7 rounded-full bg-black text-white text-xs px-4">Unread (4)</Button>
                                    </div>
                                    <button className="text-[10px] text-red-500 hover:underline">Mark all as read</button>
                                </div>

                                <div className="flex flex-col w-full h-full overflow-y-auto mt-4 px-1 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-gray-400 text-xs">Yesterday</p>
                                        {[1, 2, 3].map((_, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedMessage(i)}
                                                className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="size-10 rounded-full bg-black flex-shrink-0 overflow-hidden">
                                                    <img src="/assets/dashboard/store.png" alt="Icon" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col flex-1 gap-0.5">
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="font-semibold text-sm text-black truncate max-w-[180px]">Urban Rise Festival Vol 3</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-400 text-xs">June 12</span>
                                                            <div className="size-2 rounded-full bg-red-600" />
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate w-full">You've Been Accepted As...</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <p className="text-gray-400 text-xs">7 Days Ago</p>
                                        {[4, 5, 6].map((_, i) => (
                                            <div key={i} className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <div className="size-10 rounded-full bg-black flex-shrink-0 overflow-hidden">
                                                    <img src="/assets/dashboard/store.png" alt="Icon" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col flex-1 gap-0.5">
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="font-semibold text-sm text-black truncate max-w-[180px]">Urban Rise Festival Vol 3</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-400 text-xs">June 12</span>
                                                            <div className="size-2 rounded-full bg-red-600" />
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate w-full">You've Been Accepted As...</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col w-full h-full">
                                <div className="flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)} className="-ml-3 h-8 w-8">
                                        <ChevronRight className="h-5 w-5 rotate-180 text-black" />
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-black overflow-hidden">
                                            <img src="/assets/dashboard/store.png" alt="Icon" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-semibold text-sm text-black">Urban Rise Festival Vol 3</span>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    <div className="border border-blue-500 rounded-lg p-4 flex flex-col gap-2 relative overflow-hidden">
                                        <div className="flex items-start gap-4 z-10 relative">
                                            <div className="size-12 rounded-full bg-black flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                                                <img src="/assets/dashboard/store.png" alt="Icon" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-bold text-sm text-black">Urban Rise Festival Vol 3</p>
                                                <p className="text-xs leading-relaxed text-gray-600">
                                                    You've been accepted as a vendor for Lagos Street Jam.
                                                    Lock in your spot by completing the payment.
                                                </p>
                                            </div>
                                        </div>

                                        <Button className="w-full bg-[#B91C1C] hover:bg-red-800 text-white font-semibold text-sm h-10 mt-2 shadow-sm">
                                            Secure Slot
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="account">
                        <div className="flex items-center justify-center h-48 text-gray-400">
                            Account settings coming soon.
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
