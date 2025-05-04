import { BaseSelect } from "@/components/reusable";
import { FormBase, FormField } from "@/components/reusable";
import { PayoutSchema } from "@/schema/payout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import type { ICustomSelectProps } from "@/components/reusable/base-select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { africanBanks, africanCurrencies } from "@/components/constants";

export default function PayoutTab() {
  return (
    <div className="flex flex-col gap-[96px] pb-[424px]">
      <div className="max-w-[590px] flex flex-col gap-[54px]">
        <div className="flex flex-col gap-2">
          <p className="font-input-mono font-semilight">
            Add your payout account details to receive funds from your Ticket
            sales
          </p>

          <p className="w-full py-[9px] font-input-mono text-2xl text-center bg-soft-gray opacity-70 h-fit">
            BANK TRANSFER
          </p>
        </div>

        <PayoutForm />
      </div>

      <div className="flex flex-col gap-10">
        <Separator className="w-full bg-white/70" />

        <RefundBuyerBlock />
      </div>
    </div>
  );
}

function PayoutForm() {
  const form = useForm<z.infer<typeof PayoutSchema>>({
    resolver: zodResolver(PayoutSchema),
    defaultValues: {
      currency: "",
      bank: "",
      account_number: undefined,
      account_name: "",
    },
  });

  function onSubmit(values: z.infer<typeof PayoutSchema>) {
    console.log(values);
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-4"
    >
      {payout_select_fields.map((item) => (
        <FormField
          key={item.name}
          form={form}
          name={item.name}
          label={item.label}
        >
          {(field) => (
            <BaseSelect
              type="auth"
              placeholder={item.placeholder}
              onChange={(value) => field.onChange(value)}
              items={item.data}
              triggerClassName="w-full border-none text-white bg-charcoal h-[46px] px-[18px] py-3.5 font-input-mono"
            />
          )}
        </FormField>
      ))}

      {payout_input_fields.map((item) => (
        <FormField
          key={item.name}
          form={form}
          name={item.name}
          label={item.label}
        >
          <Input
            type={item.name === "account_number" ? "number" : "text"}
            placeholder={item.placeholder}
            className="h-[46px] w-full bg-charcoal text-white/70 font-input-mono"
          />
        </FormField>
      ))}
    </FormBase>
  );
}

function RefundBuyerBlock() {
  return (
    <div className="max-w-[540px] w-full flex flex-col gap-[21px]">
      <div className="flex flex-col gap-2 font-sf-pro-display">
        <p className="text-2xl">
          If the event is canceled, postponed or rescheduled
        </p>
        <p className="text-lg font-light">Use this card to refund the buyer</p>
      </div>

      <CreditCard />

      <Button className="w-full bg-transparent hover:bg-transparent group py-[18px] px-[13px] flex items-center justify-start gap-2 font-sf-pro-display">
        <PlusIcon color="#ffffff" size={16} />
        <span className="text-bright-green font-black group-hover:text-bright-green/80 text-base">
          Add New Credit Card
        </span>
      </Button>
    </div>
  );
}

function CreditCard() {
  return (
    <RadioGroup
      defaultValue="option-one"
      className="w-full flex flex-col gap-3"
    >
      <div className="w-full h-[55px] flex items-center gap-[7px] bg-slate-gray/74 border border-slate-gray py-[11px] pl-[22px] pr-[15px]">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label
          htmlFor="option-one"
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/dashboard/visa.png"
              alt="Visa"
              width={45}
              height={33}
            />
            <p className="font-sf-pro-display font-bold text-white">****4567</p>
          </div>

          <img
            src="/assets/dashboard/Icon.png"
            alt="Icon"
            width={21}
            height={21}
          />
        </Label>
      </div>
    </RadioGroup>
  );
}

const payout_select_fields: IPayoutSelectFields[] = [
  { name: "currency", data: africanCurrencies, placeholder: "SELECT CURRENCY" },
  {
    label: "*Bank name",
    name: "bank",
    data: africanBanks,
    placeholder: "SELECT BANK",
  },
];

const payout_input_fields: {
  label: string;
  name: keyof PayoutFormFields;
  placeholder: string;
}[] = [
  {
    label: "*Account number",
    name: "account_number",
    placeholder: "ACCOUNT NUMBER",
  },
  {
    label: "*Account name",
    name: "account_name",
    placeholder: "ACCOUNT NAME",
  },
];

type PayoutFormFields = z.infer<typeof PayoutSchema>;

interface IPayoutSelectFields {
  label?: string;
  name: keyof PayoutFormFields;
  data: ICustomSelectProps["items"];
  placeholder: string;
}
