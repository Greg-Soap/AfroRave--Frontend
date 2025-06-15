import type {
  FieldValues,
  UseFormReturn,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import { FormField } from "../reusable";
import { Label } from "../ui/label";

export function FormFieldWithCounter<T extends FieldValues>({
  form,
  field_name,
  name,
  children,
}: {
  form: UseFormReturn<T>;
  field_name: Path<T>;
  name: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}) {
  return (
    <FormField
      form={form}
      name={field_name}
      className="w-full flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
    >
      {(field) => (
        <>
          <div className="w-full flex items-center justify-between text-black text-xs uppercase font-sf-pro-text">
            <Label htmlFor={field_name}>{name}</Label>
            <p className="font-light">
              {950 - String(field.value || "").length}/950
            </p>
          </div>
          {children(field)}
        </>
      )}
    </FormField>
  );
}
