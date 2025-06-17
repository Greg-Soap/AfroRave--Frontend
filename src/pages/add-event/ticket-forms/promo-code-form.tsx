import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import {
  CustomFormField as FormField,
  CustomInput as Input,
} from "@/components/custom/custom-form";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/reusable";
import { DateForm } from "@/components/custom/date-form";
import { FormFieldWithCounter } from "@/components/custom/field-with-counter";
import { TabContainer } from "../component/tab-ctn";
import { SubmitBtn } from "../component/submit-btn";
import {
  BaseCheckbox,
  type IBaseCheckbox,
} from "@/components/reusable/base-checkbox";
import {
  promoCodeSchema,
  defaultPromoCodeValues,
} from "../schemas/promo-code-schema";
import { AddBtn } from "../component/add-btn";
import { Button } from "@/components/ui/button";

export default function PromoCodeForm({
  handleFormChange,
}: {
  handleFormChange: (form: string) => void;
}) {
  const [formCount, setFormCount] = useState<number>(1);
  const [perksCount, setPerksCount] = useState<number>(1);

  const form = useForm<z.infer<typeof promoCodeSchema>>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: defaultPromoCodeValues,
  });

  function onSubmit(values: z.infer<typeof promoCodeSchema>) {
    console.log(values);
    handleFormChange("upgrades");
  }

  return (
    <TabContainer<z.infer<typeof promoCodeSchema>>
      heading="CREATE TICKETS"
      className="w-full flex flex-col"
      form={form}
      onSubmit={onSubmit}
    >
      {Array.from({ length: formCount }).map((_, idx) => (
        <div key={idx} className="w-full flex flex-col gap-8">
          <FormFieldWithCounter
            name="promo code"
            field_name={`${idx}.code`}
            form={form}
            className="font-normal"
            maxLength={20}
          >
            {(field) => (
              <Input
                className="uppercase"
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormFieldWithCounter>

          <div className="flex items-end gap-3">
            <FormField
              form={form}
              name={`${idx}.discount.type`}
              label="SALES TYPE"
              className="w-fit"
            >
              {(field) => (
                <BaseSelect
                  type="auth"
                  items={discountTypes}
                  placeholder="Select a type of sale."
                  triggerClassName="w-[120px] h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display"
                  value={field.value as string}
                  onChange={field.onChange}
                />
              )}
            </FormField>

            <FormField
              form={form}
              name={`${idx}.discount.amount`}
              className="mb-2"
            >
              {(field) => (
                <Input
                  type="number"
                  className="w-[120px] h-9"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                />
              )}
            </FormField>
          </div>

          <FormField form={form} name={`${idx}.usageLimit`} className="mb-2">
            {(field) => (
              <Input
                type="number"
                className="w-[120px] h-9"
                {...field}
                value={field.value == null ? "" : String(field.value)}
              />
            )}
          </FormField>

          <FormField form={form} name={`${idx}.onePerCustomer`}>
            {(field) => (
              <BaseCheckbox
                data={checkboxData[0]}
                {...field}
                labelClassName="text-xs"
              />
            )}
          </FormField>

          <div className="flex flex-col gap-4">
            <DateForm
              form={form}
              name="START DATE"
              input_name={`${idx}.startDate.date`}
              hour_name={`${idx}.startDate.hour`}
              minute_name={`${idx}.startDate.minute`}
              period_name={`${idx}.startDate.period`}
            />

            <DateForm
              form={form}
              name="END DATE"
              input_name={`${idx}.endDate.date`}
              hour_name={`${idx}.endDate.hour`}
              minute_name={`${idx}.endDate.minute`}
              period_name={`${idx}.endDate.period`}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField form={form} name={`${idx}.conditions.spend.minimum`}>
              {(field) => (
                <BaseCheckbox
                  data={checkboxData[1]}
                  {...field}
                  labelClassName="text-xs"
                />
              )}
            </FormField>

            <FormField
              form={form}
              name={`${idx}.conditions.spend.amount`}
              label="PRICE"
            >
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
          </div>

          <div className="flex flex-col gap-4">
            <FormField form={form} name={`${idx}.conditions.purchased.minimum`}>
              {(field) => (
                <BaseCheckbox
                  data={checkboxData[2]}
                  {...field}
                  labelClassName="text-xs"
                />
              )}
            </FormField>

            <FormField
              form={form}
              name={`${idx}.conditions.purchased.amount`}
              label="PRICE"
            >
              {(field) => (
                <Input
                  className="w-[200px]"
                  type="number"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                />
              )}
            </FormField>
          </div>

          <FormField form={form} name={`${idx}.private`}>
            {(field) => (
              <BaseCheckbox
                data={checkboxData[3]}
                {...field}
                labelClassName="text-xs"
              />
            )}
          </FormField>

          <FormFieldWithCounter
            name="DESCRIPTION"
            field_name={`${idx}.notes`}
            form={form}
            maxLength={450}
            description="Optional"
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
                name={`${idx}.perks.${index}`}
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

          <FormField form={form} name={`${idx}.private`}>
            {(field) => (
              <BaseCheckbox
                data={checkboxData[4]}
                {...field}
                labelClassName="text-xs"
              />
            )}
          </FormField>

          <AddBtn
            name="Promo Code"
            onClick={() => setFormCount((prev) => prev + 1)}
          />
        </div>
      ))}

      <SubmitBtn>
        <Button
          type="button"
          onClick={() => handleFormChange("upgrades")}
          className="w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase bg-black text-white hover:bg-black hover:text-white"
        >
          SKIP
        </Button>
      </SubmitBtn>
    </TabContainer>
  );
}

const checkboxData: IBaseCheckbox[] = [
  {
    description: "only 1 use per customer",
    items: [{ label: "limit per customer", id: "yes" }],
  },
  {
    description: "Only allow use if cart total exceeds this",
    items: [{ label: "minimum spend", id: "yes" }],
  },
  {
    description: "Only allow use if cart total exceeds this",
    items: [{ label: "minimum spend", id: "yes" }],
  },
  {
    description: "Promo code won’t be displayed on the event page",
    items: [{ label: "private", id: "yes" }],
  },
  {
    description:
      "Link THIS code to a partner or influencer for sales tracking.",
    items: [{ label: "partnership code?", id: "yes" }],
  },
];

const discountTypes: { value: string; label: string }[] = [
  { value: "percentage", label: "% OFF" },
  { value: "fixed", label: "Fixed Amount" },
];
