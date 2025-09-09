import type {
  FieldValues,
  UseFormReturn,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import { FormField } from "../reusable";

export function FormFieldWithAbsoluteText<T extends FieldValues>({
  form,
  name,
  label,
  text,
  children,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  text: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}) {
  return (
    <FormField
      form={form}
      name={name}
      label={label}
      className="w-full flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
    >
      {(field) => (
        <div className="flex items-center h-10 w-full border rounded-[4px] border-mid-dark-gray/50 bg-white">
          <p className="lowercase border-r border-mid-dark-gray/50 px-3 py-[11px] rounded-l-[4px] text-black text-xs font-light font-sf-pro-text">
            {text}
          </p>

          {children(field)}
        </div>
      )}
    </FormField>
  );
}
