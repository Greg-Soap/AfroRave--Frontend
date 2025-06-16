import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { FieldValues, Path, useForm, UseFormReturn } from "react-hook-form";
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

export default function TicketsTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void;
  setActiveTabState: (tab: string) => void;
}) {
  useEffect(() => setStep(2), []);

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: defaultTicketValues,
  });

  function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
    setActiveTabState("tickets");
  }

  return (
    <TabContainer<z.infer<typeof ticketSchema>>
      heading="CREATE TICKETS"
      className="w-full flex flex-col gap-8"
      form={form}
      onSubmit={onSubmit}
    >
      <>
        <div className="flex flex-col gap-3">
          <FormFieldWithCounter
            name="TICKET NAME"
            field_name="ticketName"
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
        </div>

        <FormField form={form} name="salesType" label="SALES TYPE">
          {(field) => (
            <BaseSelect
              type="auth"
              defaultValue="online"
              items={salesTypeItems}
              placeholder="Select a type of sale."
              triggerClassName="w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

        <FormField form={form} name="ticketType" label="TICKET TYPE">
          {(field) => (
            <BaseSelect
              type="auth"
              defaultValue="single_ticket"
              items={ticketTypeItems}
              placeholder="Select a type of sale."
              triggerClassName="w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

        <div className="flex items-end gap-3">
          <FormField
            form={form}
            name="quantity.availability"
            label="QUANTITY"
            className="w-fit"
          >
            {(field) => (
              <BaseSelect
                type="auth"
                defaultValue="limited"
                items={availability}
                placeholder="Select availability."
                triggerClassName="w-[140px] h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
                value={field.value as string}
                onChange={field.onChange}
              />
            )}
          </FormField>

          <FormField form={form} name="quantity.amount" className="mb-2">
            {(field) => (
              <Input
                className="w-[200px] h-9"
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormField>
        </div>

        <FormField form={form} name="price" label="PRICE">
          {(field) => (
            <div className="flex items-center gap-3">
              <p className="py-[11px] px-[66px] w-[140px] h-10 flex items-center justify-center bg-[#acacac] rounded-[5px]">
                ₦
              </p>
              <Input
                className="w-[200px]"
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            </div>
          )}
        </FormField>

        <FormFieldWithCounter
          name="DESCRIPTION"
          field_name="description"
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

        <FormField form={form} name="perks" label="perks">
          {(field) => (
            <Input
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          )}
        </FormField>

        <FormField form={form} name="tags" label="TAGS" className="w-full">
          {(field) => (
            <BaseSelect
              type="auth"
              items={tags}
              placeholder="Select a tag."
              triggerClassName="w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

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
                  placeholder="Nice one! You’re locked in"
                  className="w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                />
              )}
            </FormFieldWithCounter>

            <div className="flex items-end gap-6">
              <FormField form={form} name="email" label="EMAIL">
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
