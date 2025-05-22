import { SupportSchema } from "@/schema/support-schema";
import { FormBase, FormField } from "@/components/reusable";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SupportTab() {
  const form = useForm<z.infer<typeof SupportSchema>>({
    resolver: zodResolver(SupportSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof SupportSchema>) {
    console.log(values);
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className="w-[529px] flex flex-col gap-[25px] mb-[285px]"
    >
      <div className="w-full flex flex-col gap-[15px]">
        {support_form.slice(0, 3).map((item) => (
          <FormField
            key={item.name}
            name={item.name}
            label={item.label}
            form={form}
            className={cn(
              "w-full flex flex-col gap-2 p-2.5 rounded-[6px] bg-charcoal text-white font-input-mono",
              {
                "opacity-50": item.opacity === "half",
                "opacity-100": item.opacity === "full",
              }
            )}
          >
            <Input className="border-none bg-transparent pl-0 text-lg py-0 h-fit text-white" />
          </FormField>
        ))}
      </div>

      <FormField name={support_form[3].name} form={form} className="w-full">
        <Textarea
          className="bg-transparent text-lg h-[291px] px-[22px] py-[23px]"
          placeholder="How can we help you?"
        />
      </FormField>

      <Button
        variant="destructive"
        className="w-full h-[69px] mt-[25px] font-sf-pro-text text-xl font-bold"
      >
        SUBMIT
      </Button>
    </FormBase>
  );
}

const support_form: ISupportForm[] = [
  { name: "first_name", label: "First Name", opacity: "half" },
  { name: "last_name", label: "Last Name", opacity: "half" },
  { name: "email", label: "Email", opacity: "full" },
  { name: "message", opacity: "full" },
];

type ProfileFormFields = z.infer<typeof SupportSchema>;

interface ISupportForm {
  name: keyof ProfileFormFields;
  label?: string;
  opacity: "half" | "full";
}
