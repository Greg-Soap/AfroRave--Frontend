import {
  type FieldValues,
  type UseFormReturn,
  type Path,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { SelectField } from "../component/select-field";
import { TabContainer } from "../component/tab-ctn";
import {
  CustomFormField as FormField,
  CustomInput as Input,
} from "@/components/custom/custom-form";
import { BaseCheckbox } from "@/components/reusable/base-checkbox";
import { FormFieldWithCounter } from "@/components/custom/field-with-counter";
import { Textarea } from "@/components/ui/textarea";
import { AddBtn } from "../component/add-btn";
import { useState } from "react";
import { SubmitBtn } from "../component/submit-btn";
import { defaultSlotValue, slotSchema } from "../schemas/vendor-slot-schema";
import { PriceField } from "../component/price-field";
import {
  QuantityDecreaseButton,
  QuantityIncreaseBtn,
} from "../component/quantity-buttons";
import {
  africanCountryCodes,
  vendorTypes,
  categoryOptions,
  vendorCheckboxData as checkboxData,
} from "../constant";
import { SkipBtn } from "../component/skip-btn";

export default function SlotForm({
  renderPublishTab,
}: {
  renderPublishTab: () => void;
}) {
  const [slots, setSlots] = useState([{ id: Date.now() + Math.random() }]);
  const [phones, setPhones] = useState([{ id: Date.now() + Math.random() }]);

  const form = useForm<z.infer<typeof slotSchema>>({
    resolver: zodResolver(slotSchema),
    defaultValues: defaultSlotValue,
  });

  function onSubmit(data: z.infer<typeof slotSchema>) {
    console.log(data);
    renderPublishTab();
  }

  const addSlot = () => {
    setSlots((prev) => [...prev, { id: Date.now() + Math.random() }]);
  };

  const addPhone = () => {
    setPhones((prev) => [...prev, { id: Date.now() + Math.random() }]);
  };

  return (
    <TabContainer
      form={form}
      onSubmit={onSubmit}
      heading="ADD VENDORS"
      description="List your vendor slots and let the right vendors come to you"
    >
      {slots.map((slot, idx) => (
        <div key={slot.id} className="w-full flex flex-col gap-8">
          <SelectField
            form={form}
            name={`slot.${idx}.type`}
            label="Vendor Type"
            placeholder="Select a type."
            triggerClassName="text-deep-red w-[480px]"
            data={vendorTypes}
          />

          <SelectField
            form={form}
            name={`slot.${idx}.category`}
            label="Category"
            placeholder="Select a category."
            triggerClassName="text-deep-red w-[480px]"
            data={categoryOptions}
          />

          <div className="flex flex-col gap-4">
            <p className="text-xl font-sf-pro-text text-black">Slot Details</p>

            <FormField form={form} name={`slot.${idx}.name`} label="SLOT NAME">
              <Input />
            </FormField>
          </div>

          <AmountForm form={form} name={`slot.${idx}.slotAmount`} />

          <div className="flex flex-col gap-2">
            <PriceField
              form={form}
              name={`slot.${idx}.pricePerSlot`}
              label="PRICE PER SLOT"
            />

            <p className="text-[10px] font-sf-pro-text text-charcoal">
              Afro Revive adds a 10% service fee on top of your listed slot
              price.
            </p>
          </div>

          <FormFieldWithCounter
            name="DESCRIPTION"
            field_name={`slot.${idx}.description`}
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

      <AddBtn name="vendor slot" onClick={addSlot} />

      <div className="flex flex-col gap-3">
        <FormField form={form} name={`useDifferentContactDetails`}>
          {(field) => <BaseCheckbox data={checkboxData[1]} {...field} />}
        </FormField>

        <div className="flex flex-col gap-6">
          <FormField form={form} name="email" label="EMAIL">
            <Input />
          </FormField>

          <div className="flex flex-col gap-4">
            {phones.map((phone, idx) => (
              <div key={phone.id} className="flex items-end gap-3">
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

            <AddBtn custom name="PHONE NUMBER" onClick={addPhone} />
          </div>
        </div>

        <FormField form={form} name="showSocialHandles">
          {(field) => <BaseCheckbox data={checkboxData[2]} {...field} />}
        </FormField>
      </div>

      <SubmitBtn>
        <SkipBtn action={renderPublishTab} />
      </SubmitBtn>
    </TabContainer>
  );
}

function AmountForm<T extends FieldValues>({
  form,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
}) {
  const increaseAmount = () => {
    const currentPeriod = form.getValues(name);
    const newMinute = Number(currentPeriod) + 1;
    form.setValue(name, newMinute as any);
  };

  const decreaseAmount = () => {
    const currentPeriod = form.getValues(name);
    const newMinute = Number(currentPeriod) > 0 && currentPeriod - 1;
    form.setValue(name, newMinute as any);
  };

  return (
    <FormField form={form} name={name} label="NUMBER OF SLOTS">
      {(field) => (
        <div className="flex h-10 w-[133px] border rounded-[4px]">
          <Input type="number" {...field} />

          <div className="flex w-10 h-10 flex-col items-center justify-between rounded-r-[4px] border border-mid-dark-gray/50">
            <QuantityIncreaseBtn action={increaseAmount} />
            <QuantityDecreaseButton action={decreaseAmount} />
          </div>
        </div>
      )}
    </FormField>
  );
}
