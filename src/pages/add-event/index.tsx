import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import EventDetailsTab from "./tabs/event-details-tab";
import TicketsTab from "./tabs/tickets-tab";
import ThemeTab from "./tabs/theme-tab";
import VendorTab from "./tabs/vendor-tab";
import PublishTab from "./tabs/publish-tab";

export default function AddEventPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("event-details");
  const [heading, setHeading] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [step, setStep] = useState<number>();

  useEffect(() => {
    const editParam = searchParams.get("editTab");

    if (
      editParam === "event-details" ||
      editParam === "tickets" ||
      editParam === "theme" ||
      editParam === "vendor" ||
      editParam === "publish"
    ) {
      setActiveTab(editParam);
      RenderHeadline(editParam, setHeading, setDescription);
    } else {
      setActiveTab("event-details");
      setSearchParams({ editTab: "event-details" });
      RenderHeadline("event-details", setHeading, setDescription);
    }
  }, [searchParams]);

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ account: tab });
    RenderHeadline(tab, setHeading, setDescription);
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
      element: <EventDetailsTab setStep={setStep} />,
    },
    { value: "tickets", name: "Tickets", element: <TicketsTab /> },
    { value: "theme", name: "Theme", element: <ThemeTab /> },
    { value: "vendor", name: "Vendor", element: <VendorTab /> },
    { value: "publish", name: "Publish", element: <PublishTab /> },
  ];

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTabState}
      className="w-full min-h-screen flex flex-col items-center bg-black overflow-x-hidden"
    >
      <div className="w-full h-[72px] flex items-center justify-between py-4 px-8">
        <img
          src="/assets/landing-page/AR.png"
          alt="AR"
          width={60}
          height={32}
        />

        <TabsList className="flex items-center gap-24 w-fit h-fit bg-transparent p-0">
          {edit_tabs.map((tab) => (
            <TabsTrigger
              disabled
              key={tab.value}
              value={tab.value}
              className="bg-transparent p-0 font-sf-pro-rounded font-normal text-sm text-white/50 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none disabled:opacity-100 uppercase"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <p className="size-10 rounded-full border border-white text-white flex items-center justify-center font-sf-pro-text text-sm font-black uppercase">
          EA
        </p>
      </div>
      {edit_tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="w-full max-w-screen overflow-x-hidden bg-[#f8f8f8]"
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
                className="h-10 w-[120px] text-xs font-sf-pro-text font-black rounded-[5px]"
              >
                Save and Exit Text
              </Button>
            </div>

            <section className="container w-full flex flex-col gap-10">
              <div className="flex flex-col gap-2 py-10 px-14 text-black font-sf-pro-display">
                <p className="font-black text-4xl uppercase">{heading}</p>
                <p className="text-[13px] max-w-[351px] uppercase">
                  {description}
                </p>
                <p className="text-xl font-black">STEP {step}</p>
              </div>

              {tab.element}
            </section>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function RenderHeadline(
  activeTab: string,
  setHeading: (heading: string) => void,
  setDescription: (description: string) => void
) {
  if (activeTab === "tickets") {
    setHeading("CREATE YOUR TICKETS!");
    setDescription(
      "Enhance your ticketing power with flexible, fan-friendly features"
    );
    return;
  }

  if (activeTab === "theme") {
    setHeading("AESTHETICS MATTERS!");
    setDescription("Match with trusted vendors who bring your vision to life");
    return;
  }

  if (activeTab === "vendor") {
    setHeading("Bring Your Event Together!");
    setDescription("Match with trusted vendors who bring your vision to life");
    return;
  }

  if (activeTab === "publish") {
    setHeading("Let's Go Live!");
    setDescription(
      "You're one step from live sales. Review your event details and publish when you're confident"
    );
    return;
  }

  setHeading("BUILD YOUR STAGE!");
  setDescription("Your moment starts here! tell us about your event");
  return;
}

interface IEditTabProps {
  value: string;
  name: string;
  element: React.ReactNode;
}
