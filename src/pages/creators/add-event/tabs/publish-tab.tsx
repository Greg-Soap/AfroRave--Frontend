import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { IBaseCheckbox } from "@/components/reusable/base-checkbox";
import { CustomFormField as FormField } from "@/components/custom/custom-form";
import { cn } from "@/lib/utils";
import { FormBase } from "@/components/reusable";
import { SubmitBtn } from "../component/submit-btn";
import { SkipBtn } from "../component/skip-btn";
import { useEffect } from "react";
import { BaseBooleanCheckbox } from "@/components/reusable/base-boolean-checkbox";

const notificationSchema = z.object({
  sales: z.boolean().optional(),
  promoCode: z.boolean().optional(),
  vendorSlot: z.boolean().optional(),
  ticketSalesStatus: z.boolean().optional(),
});

export default function PublishTab({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  useEffect(() => setStep(5), []);

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      sales: true,
      promoCode: true,
      vendorSlot: true,
      ticketSalesStatus: true,
    },
  });

  function onSubmit(data: z.infer<typeof notificationSchema>) {
    console.log(data);
  }

  return (
    <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-[100px] justify-center">
        <div className="w-full md:w-[520px] h-fit md:h-[260px] flex flex-col md:flex-row bg-charcoal py-[25px] px-[22px] rounded-[10px] gap-[22px]">
          <img
            src="/assets/landing-page/s1.png"
            alt="Flyer"
            width={134}
            height={188}
            className="rounded-[10px]"
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 font-sf-pro-display">
              <p className="font-bold">BLACKMARKET FLEA FESTIVAL</p>
              <p className="text-xs font-light">
                Harbour point, Vitoria Island, Lagos
              </p>
              <p className="text-xs font-light">Wed Oct 5 at 11am WAT</p>
            </div>

            <ul className="flex flex-col gap-3">
              <ListItem
                name="ticket status:"
                status="scheduled at August 5 at 11am"
              />
              <ListItem name="theme:" status="scheduled at August 5 at 11am" />
              <ListItem name="vendors slots:" status="active" />
              <ListItem name="promo codes:" status="active" />
              <ListItem name="ticket Upgrades:" status="active" />
            </ul>
          </div>
        </div>

        <div className="max-w-[491px] flex flex-col gap-6 space-y-0">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-black font-sf-pro-display uppercase text-black">
              notifications
            </p>
            <p className="text-xs font-sf-pro-display text-mid-dark-gray">
              Customize how you want to stay informed about your event’s key
              updates. You can always make changes later in your dashboard
              settings.
            </p>
          </div>

          <FormField form={form} name="sales">
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[0]} {...field} />
            )}
          </FormField>
          <FormField form={form} name="promoCode">
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[1]} {...field} />
            )}
          </FormField>
          <FormField form={form} name="vendorSlot">
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[2]} {...field} />
            )}
          </FormField>
          <FormField form={form} name="ticketSalesStatus">
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[3]} {...field} />
            )}
          </FormField>
        </div>
      </div>

      <SubmitBtn>
        <SkipBtn name="VIEW" action={() => console.log("Hello world")} />
      </SubmitBtn>
    </FormBase>
  );
}

function ListItem({
  name,
  status,
}: {
  name: string;
  status: "active" | "inactive" | (string & {});
}) {
  return (
    <li className="flex items-center gap-4 text-xs font-sf-pro-display">
      <span className="font-medium capitalize">{name}</span>
      <span
        className={cn("font-light", {
          "text-[#00A023]": status === "active",
          "text-deep-red": status === "inactive",
        })}
      >
        {status}
      </span>
    </li>
  );
}

const checkboxData: IBaseCheckbox[] = [
  {
    items: [
      {
        label: "Notify When Sales Start",
        id: "sales",
        description: "Get a notification when your tickets first go live",
      },
    ],
  },
  {
    items: [
      {
        label: "Promo Code Expiry Reminder",
        id: "promoCode",
        description:
          "Receive a notification 48 hours before your promo codes expire",
      },
    ],
  },
  {
    items: [
      {
        label: "NVendor Slot Request Alerts",
        id: "vendorSlot",
        description: "Get notifications when vendors apply for available slots",
      },
    ],
  },
  {
    items: [
      {
        label: "Ticket Sales Status",
        id: "ticketSalesStatus",
        description:
          "Get regular push notifications on your ticket sales performance, including milestones and key updates.",
      },
    ],
  },
];
