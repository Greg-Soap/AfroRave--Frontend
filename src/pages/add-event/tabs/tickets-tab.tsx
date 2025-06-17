import CreateTicketForm from "../ticket-forms/create-ticket-form";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PromoCodeForm from "../ticket-forms/promo-code-form";

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
    } else {
      setCurrentForm("create");
      setSearchParams({ form: "create" });
    }
  }, [searchParams]);

  function handleFormChange(form: string) {
    setSearchParams(form);
    setCurrentForm(form);
  }

  if (currentForm === "promocode") {
    setStep(2.5);
    return <PromoCodeForm handleFormChange={handleFormChange} />;
  }

  if (currentForm === "upgrades") {
    setStep(2.5);
    return <CreateTicketForm handleFormChange={handleFormChange} />;
  }

  setStep(2);
  return <CreateTicketForm handleFormChange={handleFormChange} />;
}
