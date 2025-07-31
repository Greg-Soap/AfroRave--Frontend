import { FormBase, FormField } from "@/components/reusable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { type LoginType, useAuth } from "@/contexts/auth-context";
import { useLogin } from "@/hooks/use-auth";
import type { LoginData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type LucideIcon, Mail, LockKeyhole } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
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

export function UserLoginForm() {
  const { loginType, switchToSignup } = useAuth();
  const login = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const loginData: LoginData = {
      email: values.email,
      password: values.password,
    };

    login.mutate(loginData);
  }

  const handleSwitchToSignup = () => {
    switchToSignup(loginType);
  };

  useEffect(() => {
    // Find the matching dummy data for the current login type
    const dummyData = dummyLoginData.find((data) => data.type === loginType);

    if (dummyData) {
      // Set form values
      form.setValue("email", dummyData.email);
      form.setValue("password", dummyData.password);
    }
  }, [loginType, form]);

  return (
    <div className="relative flex justify-center">
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="w-[420px] h-fit rounded-[12px] !bg-white space-y-6 bg-red px-7 py-4 md:px-8 md:py-[37px] z-10 font-sf-pro-text"
      >
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold leading-[100%] text-black font-sf-pro-display">
              Log In
            </p>
            <span className="text-xs leading-[100%] text-black font-sf-pro-text">
              New to AfroRevive?{" "}
              <button
                type="button"
                onClick={handleSwitchToSignup}
                className="text-base font-bold text-accent hover:underline"
              >
                Sign Up
              </button>
            </span>
          </div>

          <FormField
            form={form}
            name="email"
            showError={true}
            showMessage={true}
          >
            <InputContainer Icon={Mail}>
              <Input
                placeholder="Email Address."
                className="h-full pl-0 rounded-none border-none !text-xs"
              />
            </InputContainer>
          </FormField>

          <div className="w-full flex flex-col items-end gap-2">
            <FormField
              form={form}
              name="password"
              className="w-full"
              showError={true}
              showMessage={true}
            >
              {(field) => (
                <InputContainer Icon={LockKeyhole}>
                  <PasswordInput
                    placeholder="Enter password."
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className="min-h-full px-0 !text-xs border-none"
                  />
                </InputContainer>
              )}
            </FormField>

            <button
              type="button"
              className="text-[10px] font-bold text-black hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] text-xl font-semibold font-sf-pro-text"
          disabled={login.isPending}
        >
          {login.isPending ? "Signing In..." : "Sign In"}
        </Button>
      </FormBase>
    </div>
  );
}

function InputContainer({
  Icon,
  children,
}: {
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex items-center gap-1 h-11 border border-black rounded-[4px] px-3">
      <Icon color="#686868" size={12} />
      {children}
    </div>
  );
}

const dummyLoginData: { type: LoginType; email: string; password: string }[] = [
  {
    type: "creator",
    email: "organizer@gmail.com",
    password: "password",
  },
  {
    type: "vendor",
    email: "vendor@gmail.com",
    password: "password",
  },
  {
    type: "guest",
    email: "fans@gmail.com",
    password: "password",
  },
];
