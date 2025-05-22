import { Button } from "@/components/ui/button";
import { BaseTab } from "@/components/reusable/base-tab";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActiveTicketsTab from "./my-tickets-tabs/active-tab";
import PastTicketsTab from "./my-tickets-tabs/past-tab";

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const myTicketParam = searchParams.get("myticket");

    if (myTicketParam === "active" || myTicketParam === "past") {
      setActiveTab(myTicketParam);
    } else {
      setActiveTab("active");
      setSearchParams({ myticket: "active" });
    }
  }, [searchParams]);

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ myticket: tab });
  };

  return (
    <section className="w-full flex flex-col items-center justify-center gap-[34px] mt-[124px]">
      <Button
        variant="ghost"
        className="ml-[50px] self-start w-fit hover:bg-white/10"
      >
        <ChevronLeft color="#ffffff" className="w-[14px] h-[30px]" />
      </Button>

      <BaseTab
        activeTab={activeTab}
        setActiveTab={setActiveTabState}
        tabs={my_tickets_tabs}
        variant="listed-tickets"
      />
    </section>
  );
}

const my_tickets_tabs: IMyTicketsTab[] = [
  {
    value: "active",
    name: "Active",
    element: <ActiveTicketsTab />,
  },
  {
    value: "past",
    name: "Past",
    element: <PastTicketsTab />,
  },
];

interface IMyTicketsTab {
  value: "active" | "past";
  name: string;
  element: React.ReactNode;
}
