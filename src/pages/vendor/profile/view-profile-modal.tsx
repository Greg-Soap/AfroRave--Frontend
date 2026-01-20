import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { X, Instagram } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock Icon for X (Twitter) since lucide might not have it or it's named differently
const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)

export function ViewProfileModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 px-2 md:px-4 bg-secondary-white rounded-[4px] text-xs font-sf-pro-display text-black hover:bg-black/10">
                    <span className="hidden md:inline">View Profile</span>
                    <span className="md:hidden">View</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] flex flex-col h-[90vh] sm:h-auto overflow-y-auto bg-white p-0 gap-0">
                <div className="absolute right-4 top-4 z-50">
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-black/5 rounded-full">
                            <X className="h-5 w-5 text-black" />
                        </Button>
                    </DialogClose>
                </div>

                <DialogHeader className="w-full py-4 border-b border-gray-100 flex items-center justify-center">
                    <h2 className="text-black font-bold text-base font-sf-pro-display">Your Profile</h2>
                </DialogHeader>

                <div className="flex flex-col items-center p-6 gap-4">
                    {/* Avatar */}
                    <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                        <img src="/assets/dashboard/store.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col items-center text-center gap-2">
                        <h1 className="text-xl font-bold text-black font-sf-pro-display">Cytech World Communication</h1>
                        <Badge className="bg-[#00C338] hover:bg-[#00C338] text-white text-[10px] font-sf-pro-rounded px-3 py-0.5 rounded-full uppercase font-medium border-none shadow-none">
                            service vendor
                        </Badge>
                    </div>

                    <p className="text-center text-gray-500 text-sm font-sf-pro-display leading-relaxed">
                        Cytech World brings events to life with top-tier equipment rentals—from sound and lighting to staging and LED screens. Trusted by organizers across Nigeria, we deliver fast, reliable setups that make every event unforgettable.
                    </p>

                    <div className="w-full flex flex-col gap-4 mt-2">
                        <h3 className="font-bold text-black text-sm">Contact Details</h3>

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-500 text-xs">Email Address</p>
                            <a href="mailto:cytechworld@yahoo.com" className="text-[#007AFF] text-sm font-medium hover:underline">cytechworld@yahoo.com</a>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-500 text-xs">Portfolio</p>
                            <a href="#" className="text-[#007AFF] text-sm font-medium hover:underline">view website</a>
                            <a href="#" className="text-[#007AFF] text-sm font-medium hover:underline">view file</a>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-500 text-xs">Socials</p>
                            <div className="flex gap-3">
                                <Instagram className="h-6 w-6 text-black" />
                                <span className="text-xl font-bold text-black">X</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-4 mt-2">
                        <p className="text-center text-gray-400 text-xs">Gallery</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="aspect-square bg-gray-900 rounded-md overflow-hidden relative group">
                                <img src="/assets/dashboard/p1.png" className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" alt="Gallery 1" />
                            </div>
                            <div className="aspect-square bg-gray-900 rounded-md overflow-hidden relative group">
                                <img src="/assets/dashboard/p2.png" className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" alt="Gallery 2" />
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
