import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceForm from "../vendor-forms/service-form";
import SlotForm from "../vendor-forms/slot-form";

export default function VendorTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void;
  setActiveTabState: (activeTab: string) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentForm, setCurrentForm] = useState<string>();

  useEffect(() => {
    const formParam = searchParams.get("form");

    if (formParam === "service" || formParam === "slot") {
      setCurrentForm(formParam);
    } else if (searchParams.get("tab") === "vendor") {
      setSearchParams({ tab: "vendor", form: "service" });
    }
  }, [searchParams]);

  function handleFormChange() {
    setSearchParams({ tab: "vendor", form: "slot" });
    setCurrentForm("slot");
  }

  function renderPublishTab() {
    setActiveTabState("publish");
    searchParams.delete("form");
  }

  if (currentForm === "slot") {
    setStep(4.5);
    return <SlotForm renderPublishTab={renderPublishTab} />;
  }

  setStep(4);
  return <ServiceForm handleFormChange={handleFormChange} />;
}
