import { FormBase } from "@/components/reusable";
import type { FormBaseProps } from "@/components/reusable/base-form";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export function TabContainer<TFormValues extends FieldValues>({
  heading,
  description,
  headerButton,
  children,
  form,
  onSubmit,
  ...props
}: {
  heading: string;
  description?: string;
  headerButton?: React.ReactNode;
  children: React.ReactNode;
  form: UseFormReturn<TFormValues>;
  onSubmit: (data: TFormValues) => void;
} & Omit<FormBaseProps<TFormValues>, "form" | "onSubmit" | "onError">) {
  function onError(errors: any) {
    console.log("Form validation failed!");
    console.log("Validation errors:", errors);
  }

  return (
    <div className="flex flex-col gap-5 px-[402px] mb-[167px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-black font-sf-pro-display uppercase text-black">
            {heading}
          </p>
          {description && (
            <p className="text-xs font-sf-pro-display text-mid-dark-gray">
              {description}
            </p>
          )}
        </div>

        {headerButton && headerButton}
      </div>

      <FormBase form={form} onSubmit={onSubmit} onError={onError} {...props}>
        {children}
      </FormBase>
    </div>
  );
}
