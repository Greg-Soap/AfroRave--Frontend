import { FormBase, FormField as BaseFormField } from "@/components/reusable";
import { EditEventDetailsSchema } from "@/schema/edit-event-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type Control } from "react-hook-form";
import type { z } from "zod";
import { Input as ShadcnInput, type InputProps } from "@/components/ui/input";
import type { ReactElement } from "react";
import type {
  ControllerRenderProps,
  UseFormReturn,
  FieldValues,
  Path,
} from "react-hook-form";
import type { IEvents } from "@/data/events";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BaseDatePicker } from "@/components/reusable/base-date-picker";
import { BaseSelect } from "@/components/reusable";
import { Button } from "@/components/ui/button";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

export default function EventDetailsTab({ event }: { event: IEvents }) {
  return (
    <div className="flex flex-col p-14 gap-2.5">
      <div className="flex flex-col gap-4 min-w-[560px] max-w-[800px]">
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
      date: { start_date: undefined, end_date: undefined },
      time: {
        hour: "12",
        minute: "00",
        period: "am",
        start_time: "",
        end_time: "",
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
      className="w-full flex flex-col gap-8"
    >
      <FormField form={form} name="name">
        {(field) => (
          <>
            <div className="w-full flex items-center justify-between text-black text-xs uppercase font-sf-pro-text">
              <Label htmlFor="name">EVENT NAME</Label>
              <p className="font-light">
                {85 - String(field.value || "").length}/85
              </p>
            </div>
            <Input
              placeholder="Enter event name."
              className="uppercase"
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          </>
        )}
      </FormField>

      <GridCtn>
        <FormField form={form} name="age_rating" label="Age Rating">
          {(field) => (
            <BaseSelect
              type="auth"
              items={ageRatings}
              defaultValue="PG"
              placeholder="Select an age rating."
              triggerClassName="w-full h-10 text-black px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

        <FormField form={form} name="category" label="Event Category">
          {(field) => (
            <Input
              placeholder="Enter event category."
              className="uppercase"
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          )}
        </FormField>
      </GridCtn>

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

      <FormField form={form} name="description">
        {(field) => (
          <>
            <div className="w-full flex items-center justify-between text-black text-xs uppercase font-sf-pro-text">
              <Label htmlFor="name">DESCRIPTION</Label>
              <p className="font-light">
                {950 - String(field.value || "").length}/950
              </p>
            </div>
            <Textarea
              placeholder="Enter event description."
              className="w-full h-[272px] text-black px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          </>
        )}
      </FormField>

      <FormField form={form} name="custom_url" label="Custom URL">
        {(field) => (
          <div className="flex items-center h-10 w-full border rounded-[4px] border-mid-dark-gray/50">
            <p className="lowercase border-r border-mid-dark-gray/50 px-3 py-[11px] rounded-l-[4px] text-black text-xs font-light font-sf-pro-text">
              afrorevive/events/
            </p>
            <Input
              placeholder="Enter custom URL."
              className="border-none"
              {...field}
              value={field.value == null ? "" : String(field.value)}
            />
          </div>
        )}
      </FormField>

      <p className="w-[300px] h-10 bg-medium-gray rounded-[4px] flex items-center justify-center">
        Standalone
      </p>

      <FormField form={form} name="time_zone" label="Timezone">
        {(field) => (
          <BaseSelect
            type="auth"
            items={africanTimezones}
            defaultValue="Africa/Lagos"
            placeholder="Select a time zone."
            triggerClassName="w-full h-10 text-black px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      </FormField>

      <GridCtn>
        <FormField form={form} name="date.start_date" label="Start date">
          {(field) => (
            <BaseDatePicker
              {...field}
              className="min-h-10 bg-white border-mid-dark-gray/50 rounded-[4px] hover:bg-black/10"
            />
          )}
        </FormField>

        <FormField form={form} name="date.end_date" label="End date">
          {(field) => (
            <BaseDatePicker
              {...field}
              className="min-h-10 bg-white border-mid-dark-gray/50 rounded-[4px] hover:bg-black/10"
            />
          )}
        </FormField>
      </GridCtn>

      <GridCtn>
        <FormField form={form} name="time.start_time" label="Start Time">
          {(field) => <TimeForm control={form.control} {...field} />}
        </FormField>

        <FormField form={form} name="time.end_time" label="End Time">
          {(field) => <TimeForm control={form.control} {...field} />}
        </FormField>
      </GridCtn>

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

        <GridCtn>
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
        </GridCtn>
      </div>
    </FormBase>
  );
}

function FormField<T extends FieldValues>({
  name,
  children,
  form,
  label,
  className,
}: {
  name: Path<T>;
  children:
    | ReactElement
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactElement);
  form: UseFormReturn<T>;
  label?: string;
  className?: string;
}) {
  return (
    <BaseFormField
      form={form}
      name={name}
      label={label}
      className={cn(
        "w-full flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text",
        className
      )}
    >
      {children}
    </BaseFormField>
  );
}

function Input({
  placeholder,
  className,
  ...props
}: { placeholder?: string; className?: string } & Omit<InputProps, "ref">) {
  return (
    <ShadcnInput
      placeholder={placeholder}
      className={cn(
        "w-full h-10 text-black px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display",
        className
      )}
      {...props}
    />
  );
}

function TimeForm({
  control,
}: {
  control: Control<z.infer<typeof EditEventDetailsSchema>>;
}) {
  return (
    <div className="relative w-full h-10 flex gap-1 items-center">
      <div className="h-10 flex items-center justify-between border border-mid-dark-gray/50 w-full rounded-l-[4px] px-3 py-2">
        <Clock className="h-[18px] w-4 mr-2 text-muted-foreground" />

        <Controller
          name="time.hour"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              maxLength={2}
              className="w-10 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        />

        <span className="px-1">:</span>

        <Controller
          name="time.minute"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              maxLength={2}
              className="w-10 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        />
      </div>

      <div className="ml-auto flex flex-col items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-3 w-8 p-0 hover:bg-black/10"
        >
          <ChevronUp className="h-3 w-1.5" />
        </Button>

        <Controller
          name="time.period"
          control={control}
          render={({ field }) => (
            <BaseSelect
              type="auth"
              items={period}
              defaultValue="am"
              placeholder="AM / PM"
              triggerClassName="w-12 min-h-10 text-black px-3 font-bold py-[11px] rounded-l-none rounded-r-[4px] border border-mid-dark-gray/50 text-xs font-sf-pro-text [&>svg]:hidden"
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-3 w-8 p-0 hover:bg-black/10"
        >
          <ChevronDown className="h-3 w-1.5" />
        </Button>
      </div>
    </div>
  );
}

function GridCtn({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-8 gap-y-5">{children}</div>;
}

function SectionHeader({ name }: { name: string }) {
  return (
    <p className="text-xl font-medium font-sf-pro-text text-black -mb-3">
      {name}
    </p>
  );
}

const ageRatings: { value: string; label: string }[] = [
  { value: "G", label: "G – General Audiences" },
  { value: "PG", label: "PG – Parental Guidance Suggested" },
  { value: "PG-13", label: "PG-13 – Parents Strongly Cautioned" },
  { value: "R", label: "R – Restricted" },
  { value: "NC-17", label: "NC-17 – Adults Only" },
  { value: "NR", label: "NR – Not Rated" },
];

const africanTimezones: { value: string; label: string }[] = [
  { value: "Africa/Abidjan", label: "GMT – Abidjan" },
  { value: "Africa/Accra", label: "GMT – Accra" },
  { value: "Africa/Addis_Ababa", label: "EAT – Addis Ababa" },
  { value: "Africa/Algiers", label: "CET – Algiers" },
  { value: "Africa/Asmara", label: "EAT – Asmara" },
  { value: "Africa/Bamako", label: "GMT – Bamako" },
  { value: "Africa/Bangui", label: "WAT – Bangui" },
  { value: "Africa/Banjul", label: "GMT – Banjul" },
  { value: "Africa/Bissau", label: "GMT – Bissau" },
  { value: "Africa/Blantyre", label: "CAT – Blantyre" },
  { value: "Africa/Brazzaville", label: "WAT – Brazzaville" },
  { value: "Africa/Bujumbura", label: "CAT – Bujumbura" },
  { value: "Africa/Cairo", label: "EET – Cairo" },
  { value: "Africa/Casablanca", label: "WET – Casablanca" },
  { value: "Africa/Ceuta", label: "CET – Ceuta" },
  { value: "Africa/Conakry", label: "GMT – Conakry" },
  { value: "Africa/Dakar", label: "GMT – Dakar" },
  { value: "Africa/Dar_es_Salaam", label: "EAT – Dar es Salaam" },
  { value: "Africa/Djibouti", label: "EAT – Djibouti" },
  { value: "Africa/Douala", label: "WAT – Douala" },
  { value: "Africa/El_Aaiun", label: "WET – El Aaiun" },
  { value: "Africa/Freetown", label: "GMT – Freetown" },
  { value: "Africa/Gaborone", label: "CAT – Gaborone" },
  { value: "Africa/Harare", label: "CAT – Harare" },
  { value: "Africa/Johannesburg", label: "SAST – Johannesburg" },
  { value: "Africa/Juba", label: "CAT – Juba" },
  { value: "Africa/Kampala", label: "EAT – Kampala" },
  { value: "Africa/Khartoum", label: "CAT – Khartoum" },
  { value: "Africa/Kigali", label: "CAT – Kigali" },
  { value: "Africa/Kinshasa", label: "WAT – Kinshasa" },
  { value: "Africa/Lagos", label: "WAT – Lagos" },
  { value: "Africa/Libreville", label: "WAT – Libreville" },
  { value: "Africa/Lome", label: "GMT – Lomé" },
  { value: "Africa/Luanda", label: "WAT – Luanda" },
  { value: "Africa/Lubumbashi", label: "CAT – Lubumbashi" },
  { value: "Africa/Lusaka", label: "CAT – Lusaka" },
  { value: "Africa/Malabo", label: "WAT – Malabo" },
  { value: "Africa/Maputo", label: "CAT – Maputo" },
  { value: "Africa/Maseru", label: "SAST – Maseru" },
  { value: "Africa/Mbabane", label: "SAST – Mbabane" },
  { value: "Africa/Mogadishu", label: "EAT – Mogadishu" },
  { value: "Africa/Monrovia", label: "GMT – Monrovia" },
  { value: "Africa/Nairobi", label: "EAT – Nairobi" },
  { value: "Africa/Ndjamena", label: "WAT – Ndjamena" },
  { value: "Africa/Niamey", label: "WAT – Niamey" },
  { value: "Africa/Nouakchott", label: "GMT – Nouakchott" },
  { value: "Africa/Ouagadougou", label: "GMT – Ouagadougou" },
  { value: "Africa/Porto-Novo", label: "WAT – Porto-Novo" },
  { value: "Africa/Sao_Tome", label: "GMT – São Tomé" },
  { value: "Africa/Tripoli", label: "EET – Tripoli" },
  { value: "Africa/Tunis", label: "CET – Tunis" },
  { value: "Africa/Windhoek", label: "CAT – Windhoek" },
];

const period: { value: string; label: string }[] = [
  { value: "am", label: "AM" },
  { value: "pm", label: "PM" },
];
