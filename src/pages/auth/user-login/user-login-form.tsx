import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FormBase, FormField } from "@/components/reusable";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string().email({
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, {
      message: "Password too short.",
    })
    .max(20, {
      message: "Password too long.",
    }),
});

interface UserLoginFormProps {
  loginType: "guest" | "creator" | "vendor";
}

export default function UserLoginForm({ loginType }: UserLoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="relative flex justify-center">
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="w-[415px] h-fit rounded-[12px] space-y-5 bg-red px-7 py-4 md:px-10 md:py-12 z-10 font-sf-pro-text"
      >
        <div className="flex flex-col">
          <p className="text-[32px] font-bold text-black font-sf-pro-display">
            Log In as {loginType}
          </p>
          <span className="text-sm text-black font-sf-pro-text">
            New to AfroRevive?{" "}
            <span className="text-base font-bold text-accent">Sign Up</span>
          </span>
        </div>

        <FormField form={form} name="email" label="Email Address">
          <Input placeholder="Enter email address." />
        </FormField>

        <div className="w-full flex flex-col items-end gap-2">
          <FormField
            form={form}
            name="password"
            label="Password"
            className="w-full"
          >
            {(field) => (
              <PasswordInput
                placeholder="Enter password."
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          </FormField>

          <Link
            to="#"
            className="text-[13px] font-bold text-accent pointer-events-none"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] text-xl font-semibold font-sf-pro-text"
        >
          Sign In
        </Button>
      </FormBase>
    </div>
  );
}
