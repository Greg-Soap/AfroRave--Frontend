import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { events, type IEvents } from "@/data/events";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetailsTab from "./tabs/event-details-tab";
import TicketsTab from "./tabs/tickets-tab";
import ThemeTab from "./tabs/theme-tab";
import SettingsTab from "./tabs/settings-tab";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function EditEventPage() {
  const { eventId } = useParams();
  const event = events.find((item) => item.id === Number(eventId));

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("event-details");

  useEffect(() => {
    const editParam = searchParams.get("editTab");

    if (
      editParam === "event-details" ||
      editParam === "tickets" ||
      editParam === "theme" ||
      editParam === "settings"
    ) {
      setActiveTab(editParam);
    } else {
      setActiveTab("event-details");
      setSearchParams({ editTab: "event-details" });
    }
  }, [searchParams]);

  if (!event) {
    return <p>No Events Found</p>;
  }

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ account: tab });
  };

  const handleBackClick = () => {
    const currentIndex = edit_tabs.findIndex((tab) => tab.value === activeTab);
    if (currentIndex > 0) {
      const previousTab = edit_tabs[currentIndex - 1].value;
      setActiveTab(previousTab);
      setSearchParams({ account: previousTab });
    }
  };

  const edit_tabs: IEditTabProps[] = [
    {
      value: "event-details",
      name: "Event Details",
      element: <EventDetailsTab event={event} />,
    },
    { value: "tickets", name: "Tickets", element: <TicketsTab /> },
    { value: "theme", name: "Theme", element: <ThemeTab /> },
    { value: "settings", name: "Settings", element: <SettingsTab /> },
  ];

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTabState}
      className="w-full min-h-screen flex flex-col items-center bg-white overflow-x-hidden"
    >
      <div className="w-full flex items-center justify-between py-4 px-8">
        <img src="/assets/event/ar-black.png" alt="AR" width={60} height={32} />

        <TabsList className="flex items-center gap-24 w-fit h-fit bg-transparent p-0">
          {edit_tabs.map((tab) => (
            <TabsTrigger
              disabled
              key={tab.value}
              value={tab.value}
              className="bg-transparent p-0 font-sf-pro-rounded font-normal text-sm text-black data-[state=active]:text-deep-red data-[state=active]:bg-transparent data-[state=active]:shadow-none disabled:opacity-100"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <p className="size-10 rounded-full border border-black text-black flex items-center justify-center font-sf-pro-text text-sm font-black uppercase">
          EA
        </p>
      </div>
      {edit_tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="w-full max-w-screen overflow-x-hidden"
        >
          <div className="w-full h-fit flex flex-col items-center">
            {/** Nav */}
            <div className="w-full flex items-center justify-between py-3 px-8">
              <Button
                variant="ghost"
                className="w-fit h-fit hover:bg-black/10"
                onClick={handleBackClick}
                disabled={activeTab === "event-details"}
              >
                <ChevronLeft color="#000000" className="min-w-1.5 min-h-3" />
              </Button>

              <Button
                variant="destructive"
                disabled
                className="h-8 w-24 text-xs font-sf-pro-text font-black rounded-[5px]"
              >
                SAVE
              </Button>
            </div>

            {/**Content */}
            <div className="container h-fit gap-2 flex">
              <div className="flex flex-col py-16 px-14 gap-14 max-w-[612px]">
                <EventDetails {...event} />

                <SalesSummary />
              </div>

              {tab.element}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function EventDetails({
  image,
  event_name,
  event_location,
  event_date,
  event_time,
}: IEvents) {
  return (
    <div className="flex gap-6 text-black">
      <img
        src={image}
        alt={event_name}
        width={240}
        height={285}
        className="rounded-[10px]"
      />

      <div className="flex flex-col max-w-[237px] gap-2 py-3 font-sf-pro-display">
        <p className="text-xl font-bold uppercase">{event_name}</p>
        <p className="text-sm font-normal">{event_location}</p>
        <p className="text-sm font-normal">
          {event_date} {event_time.start_time}
        </p>
        <p className="w-fit py-1 px-2 rounded-[5px] bg-[#f3f3f3] text-xs font-semibold capitalize font-sf-pro-rounded text-[#00AD2E]">
          upcoming
        </p>
      </div>
    </div>
  );
}

function SalesSummary() {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-[10px]">
      <p className="p-1 font-sf-pro-display text-2xl font-bold text-black capitalize">
        Sales Summary
      </p>

      <div className="grid grid-cols-2 gap-y-6 gap-x-3">
        <IndividualSaleSummary title="total tickets sold" details="1250" />
        <IndividualSaleSummary title="total revenue" details="₦20,000,000" />
        <IndividualSaleSummary title="total tickets" details="2500" />
        <IndividualSaleSummary title="active promo codes" details="4" />
      </div>
    </div>
  );
}

function IndividualSaleSummary({
  title,
  details,
}: {
  title: string;
  details: string;
}) {
  return (
    <div className="flex flex-col p-1 font-sf-pro-display text-pure-black">
      <p className="text-sm capitalize">{title}</p>
      <p className="font-semibold">{details}</p>
    </div>
  );
}

interface IEditTabProps {
  value: string;
  name: string;
  element: React.ReactNode;
}
