import { useEffect } from "react";

export default function EventDetailsTab({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  useEffect(() => setStep(1), []);

  return (
    <section className="container w-full flex flex-col gap-10">hello</section>
  );
}
