import { FormBase } from "@/components/reusable";
import { EditEventDetailsSchema } from "@/schema/edit-event-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { IEvents } from "@/data/events";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/reusable";
import { eventCategories, ageRatings, africanTimezones } from "../constant";
import { DateForm } from "@/components/custom/date-form";
import { FormFieldWithAbsoluteText } from "@/components/custom/field-with-absolute-text";
import { FormFieldWithCounter } from "@/components/custom/field-with-counter";
import {
  CustomFormField as FormField,
  CustomInput as Input,
} from "@/components/custom/custom-form";

export default function EventDetailsTab({ event }: { event: IEvents }) {
  return (
    <div className="w-full flex flex-col p-0 md:p-14 gap-2.5">
      <div className="flex flex-col gap-4 w-full md:min-w-[560px] max-w-[800px]">
        <p className="uppercase font-sf-pro-display font-black text-black text-xl">
          Event Details
        </p>

        <EventDetailsForm event={event} />
      </div>
    </div>
  );
}

function EventDetailsForm({ event }: { event: IEvents }) {
  const form = useForm<z.infer<typeof EditEventDetailsSchema>>({
    resolver: zodResolver(EditEventDetailsSchema),
    defaultValues: {
      name: event.event_name,
      category: "FASHION & LIFESTYLE",
      venue: event.event_location,
      description: event.description.join("\n"),
      start_date: {
        date: new Date(),
        hour: "12",
        minute: "00",
        period: "AM",
      },
      end_date: {
        date: new Date(),
        hour: "12",
        minute: "00",
        period: "AM",
      },
      email: "",
      website_url: event.socials.website,
      socials: {
        instagram: event.socials.instagram_link,
        tiktok: event.socials.tiktok_link,
        x: event.socials.x_link,
      },
    },
  });

  function onSubmit(values: z.infer<typeof EditEventDetailsSchema>) {
    console.log(values);
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className="w-full flex flex-col space-y-5 md:space-y-8"
    >
      <FormFieldWithCounter
        name="NAME"
        field_name="name"
        form={form}
        maxLength={85}
      >
        {(field) => (
          <Input
            placeholder="Enter event name."
            className="uppercase"
            {...field}
            value={field.value == null ? "" : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <div className="w-full grid grid-cols-2 gap-5 md:gap-8">
        <FormField form={form} name="age_rating" label="Age Rating">
          {(field) => (
            <BaseSelect
              type="auth"
              items={ageRatings}
              defaultValue="PG"
              placeholder="Select an age rating."
              triggerClassName="w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

        <FormField form={form} name="category" label="Event Category">
          {(field) => (
            <BaseSelect
              type="auth"
              items={eventCategories}
              placeholder="Select a Category."
              triggerClassName="w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>
      </div>

      <FormField form={form} name="venue" label="Venue">
        {(field) => (
          <Input
            placeholder="Enter event venue."
            className="uppercase"
            {...field}
            value={field.value == null ? "" : String(field.value)}
          />
        )}
      </FormField>

      <FormFieldWithCounter
        name="DESCRIPTION"
        field_name="description"
        form={form}
        maxLength={950}
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

      <FormFieldWithAbsoluteText
        form={form}
        name="custom_url"
        label="Custom URL"
        text="afrorevive/events/"
      >
        {(field) => (
          <Input
            placeholder="Enter custom URL."
            className="border-none h-9"
            {...field}
            value={field.value == null ? "" : String(field.value)}
          />
        )}
      </FormFieldWithAbsoluteText>

      <FormField form={form} name="time_zone" label="Timezone">
        {(field) => (
          <BaseSelect
            type="auth"
            items={africanTimezones}
            defaultValue="Africa/Lagos"
            placeholder="Select a time zone."
            triggerClassName="w-full h-10 text-black px-3 py-[11px] bg-white rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      </FormField>

      <DateForm
        form={form}
        name="START DATE"
        input_name="start_date.date"
        hour_name="start_date.hour"
        minute_name="start_date.minute"
        period_name="start_date.period"
      />

      <DateForm
        form={form}
        name="END DATE"
        input_name="end_date.date"
        hour_name="end_date.hour"
        minute_name="end_date.minute"
        period_name="end_date.period"
      />

      {/**Contact */}
      <div className="flex flex-col gap-5">
        <SectionHeader name="CONTACT DETAILS" />

        <div className="flex flex-col gap-6">
          <FormField form={form} name="email" label="Email">
            {(field) => (
              <Input
                placeholder="Enter email address."
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormField>

          <FormField form={form} name="website_url" label="Website URL">
            {(field) => (
              <Input
                placeholder="Enter your website URL."
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormField>
        </div>
      </div>

      {/**Socials */}
      <div className="flex flex-col gap-5">
        <SectionHeader name="SOCIALS" />

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
          {[
            { name: "socials.instagram" as const, label: "Instagram" },
            { name: "socials.x" as const, label: "X" },
            { name: "socials.tiktok" as const, label: "Tiktok" },
            { name: "socials.facebook" as const, label: "Facebook" },
          ].map((item) => (
            <FormField
              key={item.name}
              form={form}
              name={item.name}
              label={item.label}
            >
              {(field) => (
                <Input
                  placeholder={`Enter your ${item.label} Link.`}
                  className="text-[#0033A0]"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                />
              )}
            </FormField>
          ))}
        </div>
      </div>
    </FormBase>
  );
}

function SectionHeader({ name }: { name: string }) {
  return (
    <p className="text-xl font-medium font-sf-pro-text text-black -mb-3">
      {name}
    </p>
  );
}
