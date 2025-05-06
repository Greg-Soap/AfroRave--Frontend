import { Button } from "@/components/ui/button";
import { BaseTab } from "@/components/reusable/base-tab";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActiveListedTicketsTab from "./listed-tickets-tab/active";
import SoldTicketsTab from "./listed-tickets-tab/sold";
import ExpiredTicketsTab from "./listed-tickets-tab/expired";

export default function ListedTicketPage() {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const listedParam = searchParams.get("listed");

    if (
      listedParam === "active" ||
      listedParam === "sold" ||
      listedParam === "expired"
    ) {
      setActiveTab(listedParam);
    } else {
      setActiveTab("active");
      setSearchParams({ listed: "active" });
    }
  }, [searchParams]);

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ listed: tab });
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
        tabs={listed_tabs}
        variant="listed-tickets"
      />
    </section>
  );
}

const listed_tabs: IListedTab[] = [
  {
    value: "active",
    name: "Active",
    element: <ActiveListedTicketsTab />,
  },
  {
    value: "sold",
    name: "Sold",
    element: <SoldTicketsTab />,
  },
  {
    value: "expired",
    name: "Expired",
    element: <ExpiredTicketsTab />,
  },
];

interface IListedTab {
  value: "active" | "sold" | "expired";
  name: string;
  element: React.ReactNode;
}
