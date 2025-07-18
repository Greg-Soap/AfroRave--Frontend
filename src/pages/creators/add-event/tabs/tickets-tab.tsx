import CreateTicketForm from "../ticket-forms/create-ticket-form";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PromoCodeForm from "../ticket-forms/promo-code-form";
import UpgradeForm from "../ticket-forms/upgrade-form";

export default function TicketsTab({
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

    if (
      formParam === "create" ||
      formParam === "promocode" ||
      formParam === "upgrades"
    ) {
      setCurrentForm(formParam);
    } else if (searchParams.get("tab") === "tickets") {
      setSearchParams({ tab: "tickets", form: "create" });
    }
  }, [searchParams]);

  function handleFormChange(form: string) {
    setSearchParams({ tab: "tickets", form: form });
    setCurrentForm(form);
  }

  function renderThemeTab() {
    setActiveTabState("theme");
    searchParams.delete("form");
  }

  if (currentForm === "promocode") {
    setStep(2.5);
    return <PromoCodeForm handleFormChange={handleFormChange} />;
  }

  if (currentForm === "upgrades") {
    setStep(2.5);
    return <UpgradeForm renderThemeTab={renderThemeTab} />;
  }

  if (currentForm === "create") {
    setStep(2);
    return <CreateTicketForm handleFormChange={handleFormChange} />;
  }
}
