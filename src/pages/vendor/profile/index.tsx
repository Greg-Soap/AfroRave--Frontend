import { Button } from "@/components/ui/button";
import { AddFilterBUtton } from "@/pages/creators/standalone/components/add-filter-btn";
import { ChevronLeft, Upload, ChevronRight } from "lucide-react";
import { useAfroStore } from "@/stores";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";
import BaseTable from "@/components/reusable/base-table";
import { Progress } from "@/components/ui/progress";
import { VendorEditProfileModal } from "./edit-profile-modal";
import { ViewProfileModal } from "./view-profile-modal";

// ... existing imports ...

export default function VendorProfilePage() {
  const { user } = useAfroStore();

  return (
    <section className="w-full h-full flex flex-col justify-start items-start px-[1px]">
      <div className="w-full h-14 flex items-center justify-between px-4 md:px-8 bg-white">
        <AddFilterBUtton />

        <div className="flex items-center gap-1 md:gap-4">
          <Button
            variant="ghost"
            className="px-2 md:px-5 py-2.5 rounded-[6px] gap-1 h-8 text-black opacity-50 hover:bg-black/10"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden md:inline font-sf-pro-text text-xs capitalize">
              Upload Portfolio
            </span>
          </Button>
          <ViewProfileModal />
          <VendorEditProfileModal />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 md:gap-8 px-4 md:px-5 py-6 md:py-10">
        <div className="w-full flex items-center gap-3 pr-3">
          <img
            src="/assets/dashboard/store.png"
            alt="Store"
            width={42}
            height={42}
            className="w-8 h-8 md:w-10 md:h-10"
          />

          <p className="text-xl sm:text-2xl md:text-4xl font-sf-pro-display text-black break-words">
            Welcome! {user?.profile.firstName} {user?.profile.lastName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-y-3 md:gap-x-2">
          <ProfileSection user={user} />
          <div className="w-full flex flex-col gap-2">
            <VendorSummarySection />
            <InboxSection user={user} />
          </div>
          <div className="col-span-2">
            <SlotOverviewSection />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSection({ user }: { user: User | null }) {
  return (
    <SectionContainer className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-black font-sf-pro-display">
          <p className="text-xs sm:text-sm md:text-base">You’re almost done! </p>
          <p className="font-medium text-black underline-offset-4 underline text-xs sm:text-sm md:text-base whitespace-nowrap">
            Complete Your Profile
          </p>
        </div>

        <Progress value={33} />
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full flex gap-3">
          <img
            src="/assets/dashboard/store.png"
            alt={user?.profile.firstName}
            className="size-16 rounded-full"
          />
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1 font-sf-pro-display text-black">
              <p className="font-bold uppercase leading-[100%]">
                {user?.companyName}
              </p>
              <p className="text-[13px]">{user?.vendorType}</p>
              <p className="text-xs capitalize">
                {user?.profile.firstName} {user?.profile.lastName}
              </p>
              <Badge className="text-xs font-sf-pro-rounded rounded-[10px] text-white bg-[#00AD2E] px-2 py-1">
                {user?.vendorType}
              </Badge>
            </div>
            <p className="text-xs font-sf-pro-display text-medium-gray capitalize">
              {user?.createdAt}
            </p>
          </div>
        </div>

        <div className="h-full flex flex-col gap-2 justify-between">
          <ProfileSubSections name="Phone Number">
            <span className="px-2 font-semibold text-[#007AFF] truncate block max-w-full">
              {user?.telphone}
            </span>
          </ProfileSubSections>
          <ProfileSubSections name="Email Address">
            <span className="px-2 font-semibold text-[#007AFF] truncate block max-w-full break-all">
              {user?.email}
            </span>
          </ProfileSubSections>
          <ProfileSubSections name="Portfolio">
            {user?.portfolio ? (
              <a
                href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 font-semibold text-[#007AFF] hover:underline truncate block max-w-full break-all"
              >
                {user.portfolio}
              </a>
            ) : (
              <span className="px-2 text-gray-400 text-xs">No portfolio added</span>
            )}
          </ProfileSubSections>
          <ProfileSubSections name="Socials">
            {user?.socialLinks ? (
              <a
                href={user.socialLinks.startsWith('http') ? user.socialLinks : `https://${user.socialLinks}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 font-semibold text-[#007AFF] hover:underline truncate block max-w-full break-all"
              >
                {user.socialLinks}
              </a>
            ) : (
              <span className="px-2 text-gray-400 text-xs">No social links added</span>
            )}
          </ProfileSubSections>
        </div>
      </div>
    </SectionContainer>
  );
}

function VendorSummarySection() {
  return (
    <SectionContainer className="flex flex-col">
      <p className="text-black font-bold font-sf-pro-display">Vendor Summary</p>
      <VendorSummarySubSection name="Saved Events" amount={12} />
      <VendorSummarySubSection name="total events secured" amount={12} />
      <VendorSummarySubSection name="total slots acquired" amount={12} />
    </SectionContainer>
  );
}

function SlotOverviewSection() {
  return (
    <SectionContainer className="!py-3 flex flex-col gap-3">
      <p className="text-black font-bold font-sf-pro-display text-sm md:text-base">Slot Overview</p>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-[600px] px-4 md:px-0">
          <BaseTable caption="Slot Overview" columns={columns} data={ticketData} />
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex gap-1">
          <p className="py-1 px-2 text-xs text-black font-sf-pro-rounded">
            1-4 0f 16 items
          </p>
          <p className="py-1 px-2 text-xs text-black font-sf-pro-rounded">
            1 0f 4 items
          </p>
        </div>

        <div className="px-2">
          <Button
            size="icon"
            variant="ghost"
            className="px-3.5 py-4 hover:bg-black/10"
          >
            <ChevronLeft color="#1e1e1e" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="px-3.5 py-4 hover:bg-black/10"
          >
            <ChevronRight color="#1e1e1e" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}

function InboxSection({ user }: { user: User | null }) {
  return (
    <SectionContainer className="flex flex-row h-full items-center justify-between">
      <div className="flex items-center gap-4">
        <p className="text-black font-medium font-sf-pro-display">Inbox</p>
        <p className="py-1 px-2 rounded-full text-white bg-deep-red text-xs font-sf-pro-rounded font-semibold">
          {user?.messages}
        </p>
      </div>

      <Button variant="ghost" size="icon" className="px-3.5 py-4">
        <ChevronRight color="#1e1e1e" size={12} />
      </Button>
    </SectionContainer>
  );
}

// Removed ProfileRadioGroup - no longer needed

function ProfileSubSections({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-1 flex font-sf-pro-display text-sm">
      <span className="w-[100px] text-black">{name}</span>
      {children}
    </div>
  );
}

function VendorSummarySubSection({
  name,
  amount,
}: {
  name: string;
  amount: number;
}) {
  return (
    <div className="w-full h-12 flex items-center justify-between border-t border-mid-dark-gray/50 text-black">
      <p className="text-sm font-sf-pro-display font-medium capitalize">
        {name}
      </p>
      <p className="px-3.5 text-xs font-sf-pro-rounded">{amount}</p>
    </div>
  );
}

function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full px-[30px] py-6 bg-secondary-white rounded-[10px]",
        className
      )}
    >
      {children}
    </div>
  );
}

const columns = [
  { key: "ticketName", label: "Ticket Name" },
  { key: "ticketSold", label: "Ticket Sold" },
  { key: "price", label: "Price" },
  { key: "status", label: "Status" },
];

const ticketData = [
  {
    ticketName: "General Admission",
    ticketSold: "1000/1200",
    price: "₦20,000",
    status: "ONGOING",
  },
  {
    ticketName: "Vip Access",
    ticketSold: "150/150",
    price: "₦100,000",
    status: "SOLD OUT",
  },
  {
    ticketName: "Standard Premium",
    ticketSold: "80/100",
    price: "₦50,000",
    status: "ONGOING",
  },
  {
    ticketName: "Standard",
    ticketSold: "500/500",
    price: "₦25,000",
    status: "ONGOING",
  },
];
