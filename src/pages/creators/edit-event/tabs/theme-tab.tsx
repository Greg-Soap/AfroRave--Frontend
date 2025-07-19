import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormBase, FormField } from "@/components/reusable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

const themeSchema = z.object({
  theme: z.enum(["default", "standard carousel", "carousel with flyer"]),
});

export default function ThemeTab() {
  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: "default",
    },
  });

  function onSubmit(data: z.infer<typeof themeSchema>) {
    console.log(data);
  }

  // Log the checked value whenever it changes
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Checked value:", value.theme);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className="w-full flex justify-center mb-[76px]"
    >
      <FormField form={form} name="theme">
        {(field) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex items-center justify-center flex-wrap gap-10"
          >
            {theme.map((item) => (
              <div key={item.name} className="w-fit flex flex-col">
                <RadioGroupItem
                  value={item.name}
                  id={item.name}
                  className="hidden"
                />
                <ThemePreviewCards
                  {...item}
                  isChecked={field.value === item.name}
                />
              </div>
            ))}
          </RadioGroup>
        )}
      </FormField>
    </FormBase>
  );
}

function ThemePreviewCards({
  name,
  src,
  isChecked,
}: IThemeProps & { isChecked: boolean }) {
  return (
    <Label
      htmlFor={name}
      className={cn(
        "flex flex-col p-5 gap-3 rounded-[8px] w-full md:!w-[400px] !h-[252px] bg-medium-gray border-2",
        {
          "border-deep-red": isChecked,
          "border-transparent": !isChecked,
        }
      )}
    >
      <p className="w-full font-sf-pro-display font-black uppercase text-white">
        {name}
      </p>
      <img src={src} alt={name} className="w-full h-auto" />
    </Label>
  );
}

const theme: IThemeProps[] = [
  { name: "defualt", src: "/assets/event/t1.png" },
  { name: "standard carousel", src: "/assets/event/t2.png" },
  { name: "carousel with flyer", src: "/assets/event/t3.png" },
];

interface IThemeProps {
  name: string;
  src: string;
}
