import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  CustomFormField as FormField,
  CustomInput as Input,
} from "@/components/custom/custom-form";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/reusable";
import { DateForm } from "@/components/custom/date-form";
import { FormFieldWithCounter } from "@/components/custom/field-with-counter";
import { Button } from "@/components/ui/button";
import { defaultTicketValues, ticketSchema } from "../schemas/tickets-schema";
import { TabContainer } from "../component/tab-ctn";
import { SubmitBtn } from "../component/submit-btn";
import {
  BaseCheckbox,
  type IBaseCheckbox,
} from "@/components/reusable/base-checkbox";
import { cn } from "@/lib/utils";
import { AddBtn } from "../component/add-btn";
import { PriceField } from "../component/price-field";
import { SelectField } from "../component/select-field";

export default function CreateTicketForm({
  handleFormChange,
}: {
  handleFormChange: (form: string) => void;
}) {
  const [ticketCount, setTicketCount] = useState<number>(1);

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: defaultTicketValues,
  });

  function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
    handleFormChange("promocode");
  }

  return (
    <TabContainer<z.infer<typeof ticketSchema>>
      heading="CREATE TICKETS"
      className="w-full flex flex-col"
      form={form}
      onSubmit={onSubmit}
    >
      <>
        {Array.from({ length: ticketCount }).map((_, idx) => (
          <TicketForm key={idx} form={form} idx={idx} />
        ))}

        <AddBtn
          onClick={() => setTicketCount((prev) => prev + 1)}
          name="Ticket"
        />

        <div className="w-[488px] flex flex-col gap-5">
          <p className="uppercase text-xl font-bold font-sf-pro-display text-black">
            When Should Ticket Sales Start?
          </p>

          <FormField form={form} name="whenToStart">
            {(field) => (
              <BaseCheckbox
                orientation="vertical"
                data={checkboxData[2]}
                {...field}
                labelClassName="text-base"
                descriptionClassName="text-xs"
              />
            )}
          </FormField>

          <DateForm
            form={form}
            name="START DATE"
            input_name="scheduledDate.date"
            hour_name="scheduledDate.hour"
            minute_name="scheduledDate.minute"
            period_name="scheduledDate.period"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 font-sf-pro-display text-black">
            <p className="text-xl font-bold">
              Customize your confirmation email
            </p>
            <p className="text-sm font-light ">
              Add a personal touch to the confirmation email your ticket buyers
              receive after purchase
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <FormFieldWithCounter
              name="CONFIRMATION EMAIL"
              field_name="confirmationMailText"
              form={form}
              maxLength={250}
              description="optional"
            >
              {(field) => (
                <Textarea
                  placeholder="Nice one! You're locked in"
                  className="w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                />
              )}
            </FormFieldWithCounter>

            <div className="flex items-end gap-6">
              <FormField
                form={form}
                name="email"
                label="EMAIL"
                className="max-w-[360px]"
              >
                {(field) => (
                  <Input
                    {...field}
                    value={field.value == null ? "" : String(field.value)}
                  />
                )}
              </FormField>

              <Button className="w-[160px] h-10 bg-black rounded-[4px]">
                SEND TEST
              </Button>
            </div>
          </div>
        </div>

        <SubmitBtn />
      </>
    </TabContainer>
  );
}

function TicketForm({
  form,
  idx,
}: {
  form: UseFormReturn<z.infer<typeof ticketSchema>>;
  idx: number;
}) {
  const [perksCount, setPerksCount] = useState<number>(1);

  return (
    <>
      <p
        className={cn("text-black font-bold", {
          hidden: idx === 0,
          flex: idx > 0,
        })}
      >
        TICKET {idx + 1}
      </p>

      <div className="flex flex-col gap-3">
        <FormFieldWithCounter
          name="TICKET NAME"
          field_name={`tickets.${idx}.ticketName`}
          form={form}
          className="font-normal"
          maxLength={65}
        >
          {(field) => (
            <Input
              placeholder="VIP Access"
              className="uppercase"
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          )}
        </FormFieldWithCounter>

        <FormField form={form} name={`tickets.${idx}.type`}>
          {(field) => (
            <BaseCheckbox
              data={checkboxData[3]}
              {...field}
              labelClassName="text-xs"
              descriptionClassName="max-w-[255px]"
            />
          )}
        </FormField>
      </div>

      <SelectField
        form={form}
        name={`tickets.${idx}.salesType`}
        label="SALES TYPE"
        data={salesTypeItems}
        placeholder="Select a type of sale."
        triggerClassName="w-full"
      />

      <SelectField
        form={form}
        name={`tickets.${idx}.ticketType`}
        label="TICKET TYPE"
        data={ticketTypeItems}
        placeholder="Select a type of sale."
        triggerClassName="w-full"
      />

      <div className="flex items-end gap-3">
        <SelectField
          form={form}
          name={`tickets.${idx}.quantity.availability`}
          label="QUANTITY"
          className="w-fit"
          data={availability}
          placeholder="Select availability."
        />

        <FormField
          form={form}
          name={`tickets.${idx}.quantity.amount`}
          className="mb-2"
        >
          {(field) => (
            <Input
              className="w-[200px] h-9"
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          )}
        </FormField>
      </div>

      <PriceField form={form} name={`tickets.${idx}.price`} />

      <FormFieldWithCounter
        name="DESCRIPTION"
        field_name={`tickets.${idx}.description`}
        form={form}
        maxLength={450}
      >
        {(field) => (
          <Textarea
            placeholder="Enter event description."
            className="w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
            {...field}
            value={field.value == null ? "" : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <div className="flex flex-col gap-3.5">
        {Array.from({ length: perksCount }).map((_, index) => (
          <FormField
            key={`perk-${index}-${Date.now()}`}
            form={form}
            name={`tickets.${idx}.perks.${index}`}
            label={index === 0 ? "Perks" : undefined}
          >
            {(field) => (
              <Input
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormField>
        ))}

        <AddBtn
          name="Perks"
          onClick={() => setPerksCount((prev) => prev + 1)}
        />
      </div>

      <SelectField
        form={form}
        name={`tickets.${idx}.tags`}
        label="TAGS"
        triggerClassName="w-full"
        data={tags}
        placeholder="Select a tag."
      />

      <div className="flex flex-col gap-4">
        <FormField form={form} name={`tickets.${idx}.advancedOptions`}>
          {(field) => <BaseCheckbox data={checkboxData[0]} {...field} />}
        </FormField>

        <FormField form={form} name="tickets.0.allowResell">
          {(field) => (
            <BaseCheckbox
              data={checkboxData[1]}
              {...field}
              labelClassName="text-xs"
              descriptionClassName="max-w-[255px]"
            />
          )}
        </FormField>
      </div>
    </>
  );
}

const salesTypeItems: { value: string; label: string }[] = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "both", label: "Both" },
];

const ticketTypeItems: { value: string; label: string }[] = [
  { value: "single_ticket", label: "Single Ticket" },
  { value: "group_ticket", label: "Group Ticket" },
  { value: "vip", label: "VIP" },
  { value: "season_pass", label: "Season Pass" },
];

const availability: { value: string; label: string }[] = [
  { value: "limited", label: "Limited" },
  { value: "unlimited", label: "Unlimited" },
];

const tags: { value: string; label: string }[] = [
  { value: "news", label: "News" },
  { value: "finance", label: "Finance" },
  { value: "update", label: "Update" },
  { value: "event", label: "Event" },
  { value: "announcement", label: "Announcement" },
  { value: "partnership", label: "Partnership" },
  { value: "initiative", label: "Initiative" },
  { value: "feature", label: "Feature" },
  { value: "promo", label: "Promo" },
];

const checkboxData: IBaseCheckbox[] = [
  { items: [{ label: "ADVANCED OPTIONS", id: "allow" }] },
  {
    description:
      "This option allows attendees to resell their tickets to other fans.",
    items: [{ label: "ALLOW RESELL", id: "allow" }],
  },
  {
    items: [
      {
        label: "START SALES IMMEDIATELY",
        id: "immediately",
        description: "Tickets go on sale as soon as your event is live",
      },
      {
        label: "Schedule Sales Start",
        id: "at-a-scheduled-date",
        description:
          "Pick a date/time to open sales after your event page is live",
      },
    ],
  },
  {
    items: [
      { label: "FREE", id: "free" },
      { label: "PAID", id: "paid" },
      { label: "INVITE ONLY", id: "invite-only" },
    ],
  },
];
