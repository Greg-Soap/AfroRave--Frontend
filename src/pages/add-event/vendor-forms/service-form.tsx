import {
  type FieldValues,
  type UseFormReturn,
  type Path,
  useForm,
} from "react-hook-form";
import {
  defaultServiceValue,
  serviceSchema,
} from "../schemas/vendor-service-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { SelectField } from "../component/select-field";
import { TabContainer } from "../component/tab-ctn";
import {
  CustomFormField as FormField,
  CustomInput as Input,
} from "@/components/custom/custom-form";
import {
  BaseCheckbox,
  type IBaseCheckbox,
} from "@/components/reusable/base-checkbox";
import { TimeForm } from "@/components/custom/time-form";
import { FormFieldWithCounter } from "@/components/custom/field-with-counter";
import { Textarea } from "@/components/ui/textarea";
import { AddBtn } from "../component/add-btn";
import { useState } from "react";
import { SubmitBtn } from "../component/submit-btn";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ServiceForm({
  handleFormChange,
}: {
  handleFormChange: () => void;
}) {
  const [slotCount, setSlotCount] = useState<number>(1);
  const [phoneCount, setPhoneCount] = useState<number>(1);

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultServiceValue,
  });

  function onSubmit(data: z.infer<typeof serviceSchema>) {
    console.log(data);
    handleFormChange();
  }

  return (
    <TabContainer
      form={form}
      onSubmit={onSubmit}
      heading="ADD VENDORS"
      description="List your vendor slots and let the right vendors come to you"
    >
      {Array.from({ length: slotCount }).map((_, idx) => (
        <div key={idx} className="w-full flex flex-col gap-8">
          <SelectField
            form={form}
            name={`service.${idx}.type`}
            label="Vendor Type"
            placeholder="Select a type."
            triggerClassName="text-deep-red w-[480px]"
            data={vendorTypes}
          />

          <SelectField
            form={form}
            name={`service.${idx}.category`}
            label="Category"
            placeholder="Select a category."
            triggerClassName="text-deep-red w-[480px]"
            data={categoryOptions}
          />

          <div className="flex flex-col gap-4">
            <p className="text-xl font-sf-pro-text text-black">
              Service Details
            </p>

            <FormField form={form} name={`service.${idx}.name`}>
              <Input />
            </FormField>
          </div>

          <div className="flex flex-col gap-4">
            <FormField form={form} name={`service.${idx}.budgetRange`}>
              {(field) => <BaseCheckbox data={checkboxData[0]} {...field} />}
            </FormField>

            {/** A range is supposed to be here */}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-black uppercase font-sf-pro-text">
              Work duration
            </p>

            <DetailedTimeForm
              form={form}
              hour_name={`service.${idx}.workDuration.hour`}
              minute_name={`service.${idx}.workDuration.minute`}
              second_name={`service.${idx}.workDuration.second`}
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-2">
                <p className="uppercase text-black text-xs font-sf-pro-text">
                  Start
                </p>
                <TimeForm
                  form={form}
                  hour_name={`service.${idx}.start.hour`}
                  minute_name={`service.${idx}.start.minute`}
                  period_name={`service.${idx}.start.period`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="uppercase text-black text-xs font-sf-pro-text">
                  Stop
                </p>
                <TimeForm
                  form={form}
                  hour_name={`service.${idx}.stop.hour`}
                  minute_name={`service.${idx}.stop.minute`}
                  period_name={`service.${idx}.stop.period`}
                />
              </div>
            </div>
          </div>

          <FormFieldWithCounter
            name="DESCRIPTION"
            field_name={`service.${idx}.description`}
            form={form}
            className="font-normal"
            maxLength={450}
          >
            {(field) => (
              <Textarea
                placeholder="e.g., Bring your own setup"
                className="uppercase h-[240px]"
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormFieldWithCounter>
        </div>
      ))}

      <AddBtn name="vendor slot" onClick={() => setSlotCount((s) => s + 1)} />

      <div className="flex flex-col gap-3">
        <FormField form={form} name={`useDifferentContactDetails`}>
          {(field) => <BaseCheckbox data={checkboxData[1]} {...field} />}
        </FormField>

        <div className="flex flex-col gap-6">
          <FormField form={form} name="email">
            <Input />
          </FormField>

          <div className="flex flex-col gap-4">
            {Array.from({ length: phoneCount }).map((_, idx) => (
              <div key={idx} className="flex items-end gap-3">
                <SelectField
                  form={form}
                  name={`phone.${idx}.countryCode`}
                  label="PHONE NUMBER"
                  placeholder=""
                  className="w-fit"
                  data={africanCountryCodes}
                />

                <FormField
                  form={form}
                  name={`phone.${idx}.number`}
                  className="mb-2"
                >
                  <Input className="h-9" />
                </FormField>
              </div>
            ))}

            <AddBtn
              custom
              name="PHONE NUMBER"
              onClick={() => setPhoneCount((s) => s + 1)}
            />
          </div>
        </div>

        <FormField form={form} name="showSocialHandles">
          {(field) => <BaseCheckbox data={checkboxData[2]} {...field} />}
        </FormField>
      </div>

      <SubmitBtn />
    </TabContainer>
  );
}

function DetailedTimeForm<T extends FieldValues>({
  form,
  hour_name,
  minute_name,
  second_name,
}: ITimeFormProps<T>) {
  const increaseMinute = () => {
    const currentPeriod = form.getValues(minute_name);
    const newMinute = Number(currentPeriod) + 1;
    form.setValue(minute_name, newMinute as any);
  };

  const decreaseMinute = () => {
    const currentPeriod = form.getValues(minute_name);
    const newMinute = Number(currentPeriod) > 0 && currentPeriod - 1;
    form.setValue(minute_name, newMinute as any);
  };

  return (
    <div className="relative w-full h-10 flex items-center">
      <div className="w-[150px] h-10 flex items-center bg-white justify-between border border-mid-dark-gray/50 rounded-l-[4px] px-3 py-2">
        <FormField
          form={form}
          name={hour_name}
          className="w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        </FormField>

        <span className="px-1 text-black">:</span>

        <FormField
          form={form}
          name={minute_name}
          className="w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        </FormField>

        <span className="px-1 text-black">:</span>

        <FormField
          form={form}
          name={second_name}
          className="w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        </FormField>
      </div>

      <div className="flex w-10 h-10 flex-col items-center justify-between rounded-r-[4px] border border-mid-dark-gray/50">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={increaseMinute}
          className="w-8 p-0 hover:bg-black/10 h-1/2 border-b border-black rounded-none px-0"
        >
          <ChevronUp className="h-3 w-1.5" color="#000000" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={decreaseMinute}
          className="h-1/2 w-8 p-0 hover:bg-black/10"
        >
          <ChevronDown className="h-3 w-1.5" color="#000000" />
        </Button>
      </div>
    </div>
  );
}

interface ITimeFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  hour_name: Path<T>;
  minute_name: Path<T>;
  second_name: Path<T>;
}

const checkboxData: IBaseCheckbox[] = [
  { items: [{ label: "BUDGET RANGE", id: "yes" }] },
  { items: [{ label: "use different CONTACT DETAILS", id: "yes" }] },
  { items: [{ label: "SHOW SOCIAL HANDLES", id: "yes" }] },
];

const vendorTypes: { value: string; label: string }[] = [
  { value: "service_vendor", label: "Service Vendor" },
  { value: "product_vendor", label: "Product Vendor" },
  { value: "consultant", label: "Consultant" },
  { value: "contractor", label: "Contractor" },
  { value: "freelancer", label: "Freelancer" },
];

const categoryOptions: { value: string; label: string }[] = [
  { value: "dj_mc", label: "DJ/MC" },
  { value: "live_band", label: "Live Band" },
  { value: "photographer", label: "Photographer" },
  { value: "videographer", label: "Videographer" },
  { value: "caterer", label: "Caterer" },
  { value: "decorator", label: "Decorator" },
  { value: "event_planner", label: "Event Planner" },
  { value: "security", label: "Security" },
  { value: "usher", label: "Usher" },
  { value: "makeup_artist", label: "Makeup Artist" },
  { value: "lighting", label: "Lighting" },
  { value: "sound", label: "Sound" },
];

const africanCountryCodes: { value: string; label: string }[] = [
  { value: "+213", label: "Algeria (+213)" },
  { value: "+244", label: "Angola (+244)" },
  { value: "+229", label: "Benin (+229)" },
  { value: "+267", label: "Botswana (+267)" },
  { value: "+226", label: "Burkina Faso (+226)" },
  { value: "+257", label: "Burundi (+257)" },
  { value: "+237", label: "Cameroon (+237)" },
  { value: "+238", label: "Cape Verde (+238)" },
  { value: "+236", label: "Central African Republic (+236)" },
  { value: "+235", label: "Chad (+235)" },
  { value: "+269", label: "Comoros (+269)" },
  { value: "+242", label: "Congo - Brazzaville (+242)" },
  { value: "+243", label: "Congo - Kinshasa (+243)" },
  { value: "+225", label: "Côte d’Ivoire (+225)" },
  { value: "+253", label: "Djibouti (+253)" },
  { value: "+20", label: "Egypt (+20)" },
  { value: "+240", label: "Equatorial Guinea (+240)" },
  { value: "+291", label: "Eritrea (+291)" },
  { value: "+268", label: "Eswatini (+268)" },
  { value: "+251", label: "Ethiopia (+251)" },
  { value: "+241", label: "Gabon (+241)" },
  { value: "+220", label: "Gambia (+220)" },
  { value: "+233", label: "Ghana (+233)" },
  { value: "+224", label: "Guinea (+224)" },
  { value: "+245", label: "Guinea-Bissau (+245)" },
  { value: "+254", label: "Kenya (+254)" },
  { value: "+266", label: "Lesotho (+266)" },
  { value: "+231", label: "Liberia (+231)" },
  { value: "+218", label: "Libya (+218)" },
  { value: "+261", label: "Madagascar (+261)" },
  { value: "+265", label: "Malawi (+265)" },
  { value: "+223", label: "Mali (+223)" },
  { value: "+222", label: "Mauritania (+222)" },
  { value: "+230", label: "Mauritius (+230)" },
  { value: "+212", label: "Morocco (+212)" },
  { value: "+258", label: "Mozambique (+258)" },
  { value: "+264", label: "Namibia (+264)" },
  { value: "+227", label: "Niger (+227)" },
  { value: "+234", label: "Nigeria (+234)" },
  { value: "+250", label: "Rwanda (+250)" },
  { value: "+239", label: "São Tomé & Príncipe (+239)" },
  { value: "+221", label: "Senegal (+221)" },
  { value: "+248", label: "Seychelles (+248)" },
  { value: "+232", label: "Sierra Leone (+232)" },
  { value: "+252", label: "Somalia (+252)" },
  { value: "+27", label: "South Africa (+27)" },
  { value: "+211", label: "South Sudan (+211)" },
  { value: "+249", label: "Sudan (+249)" },
  { value: "+255", label: "Tanzania (+255)" },
  { value: "+228", label: "Togo (+228)" },
  { value: "+216", label: "Tunisia (+216)" },
  { value: "+256", label: "Uganda (+256)" },
  { value: "+260", label: "Zambia (+260)" },
  { value: "+263", label: "Zimbabwe (+263)" },
];
