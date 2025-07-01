import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  CustomFormField as FormField,
  CustomInput as Input,
} from "@/components/custom/custom-form";
import { Textarea } from "@/components/ui/textarea";
import { DateForm } from "@/components/custom/date-form";
import { FormFieldWithCounter } from "@/components/custom/field-with-counter";
import { TabContainer } from "../component/tab-ctn";
import { SubmitBtn } from "../component/submit-btn";
import type { IBaseCheckbox } from "@/components/reusable/base-checkbox";
import {
  promoCodeSchema,
  defaultPromoCodeValues,
} from "../schemas/promo-code-schema";
import { AddBtn } from "../component/add-btn";
import { Button } from "@/components/ui/button";
import { SkipBtn } from "../component/skip-btn";
import { PriceField } from "../component/price-field";
import { SelectField } from "../component/select-field";
import { FormCount } from "../component/form-count";
import { BaseBooleanCheckbox } from "@/components/reusable/base-boolean-checkbox";

export default function PromoCodeForm({
  handleFormChange,
}: {
  handleFormChange: (form: string) => void;
}) {
  const [perksCount, setPerksCount] = useState<number>(1);
  const [promoCodes, setPromoCodes] = useState([
    { id: Date.now() + Math.random() },
  ]);

  const form = useForm<{ promoCodes: z.infer<typeof promoCodeSchema> }>({
    resolver: zodResolver(z.object({ promoCodes: promoCodeSchema })),
    defaultValues: { promoCodes: defaultPromoCodeValues },
  });

  function onSubmit(values: { promoCodes: z.infer<typeof promoCodeSchema> }) {
    console.log(values.promoCodes);
    handleFormChange("upgrades");
  }

  return (
    <TabContainer<{ promoCodes: z.infer<typeof promoCodeSchema> }>
      heading="enable PROMO CODES"
      description="Code names must be unique per event"
      headerButton={
        <Button className="uppercase text-xs font-semibold font-sf-pro-rounded h-10 w-[192px]">
          generate multiple codes
        </Button>
      }
      className="w-full flex flex-col"
      form={form}
      onSubmit={onSubmit}
    >
      {promoCodes.map((promo, idx) => (
        <div key={promo.id} className="w-full flex flex-col gap-8">
          <FormCount name="promocode" idx={idx} />

          <FormFieldWithCounter
            name="promo code"
            field_name={`promoCodes.${idx}.code`}
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
            <SelectField<{ promoCodes: z.infer<typeof promoCodeSchema> }>
              form={form}
              name={`promoCodes.${idx}.discount.type`}
              label="SALES TYPE"
              className="w-fit"
              data={discountTypes}
              placeholder="Select a type of sale."
            />

            <FormField
              form={form}
              name={`promoCodes.${idx}.discount.amount`}
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

          <FormField
            form={form}
            name={`promoCodes.${idx}.usageLimit`}
            label="usage limit"
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

          <FormField form={form} name={`promoCodes.${idx}.onePerCustomer`}>
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[0]} {...field} />
            )}
          </FormField>

          <div className="flex flex-col gap-4">
            <DateForm
              form={form}
              name="START DATE"
              input_name={`promoCodes.${idx}.startDate.date`}
              hour_name={`promoCodes.${idx}.startDate.hour`}
              minute_name={`promoCodes.${idx}.startDate.minute`}
              period_name={`promoCodes.${idx}.startDate.period`}
            />

            <DateForm
              form={form}
              name="END DATE"
              input_name={`promoCodes.${idx}.endDate.date`}
              hour_name={`promoCodes.${idx}.endDate.hour`}
              minute_name={`promoCodes.${idx}.endDate.minute`}
              period_name={`promoCodes.${idx}.endDate.period`}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              form={form}
              name={`promoCodes.${idx}.conditions.spend.minimum`}
            >
              {(field) => (
                <BaseBooleanCheckbox data={checkboxData[1]} {...field} />
              )}
            </FormField>

            <PriceField
              form={form}
              name={`promoCodes.${idx}.conditions.spend.amount`}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              form={form}
              name={`promoCodes.${idx}.conditions.purchased.minimum`}
            >
              {(field) => (
                <BaseBooleanCheckbox data={checkboxData[2]} {...field} />
              )}
            </FormField>

            <FormField
              form={form}
              name={`promoCodes.${idx}.conditions.purchased.amount`}
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

          <FormField form={form} name={`promoCodes.${idx}.private`}>
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[3]} {...field} />
            )}
          </FormField>

          <FormFieldWithCounter
            name="DESCRIPTION"
            field_name={`promoCodes.${idx}.notes`}
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
                name={`promoCodes.${idx}.perks.${index}`}
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

          <FormField form={form} name={`promoCodes.${idx}.partnershipCode`}>
            {(field) => (
              <BaseBooleanCheckbox data={checkboxData[4]} {...field} />
            )}
          </FormField>
        </div>
      ))}

      <AddBtn
        name="Promo Code"
        onClick={() =>
          setPromoCodes((prev) => [...prev, { id: Date.now() + Math.random() }])
        }
      />

      <SubmitBtn>
        <SkipBtn action={() => handleFormChange("upgrades")} />
      </SubmitBtn>
    </TabContainer>
  );
}

const checkboxData: IBaseCheckbox[] = [
  {
    description: "only 1 use per customer",
    items: [{ label: "limit per customer", id: "onePerCustomer" }],
  },
  {
    description: "Only allow use if cart total exceeds this",
    items: [{ label: "minimum spend", id: "spendMinimum" }],
  },
  {
    description: "Only allow use if tickets total exceeds this",
    items: [{ label: "minimum tickets", id: "purchasedMinimum" }],
  },
  {
    description: "Promo code won't be displayed on the event page",
    items: [{ label: "private", id: "private" }],
  },
  {
    description:
      "Link THIS code to a partner or influencer for sales tracking.",
    items: [{ label: "partnership code?", id: "partnershipCode" }],
  },
];

const discountTypes: { value: string; label: string }[] = [
  { value: "percentage", label: "% OFF" },
  { value: "fixed", label: "Fixed Amount" },
];
