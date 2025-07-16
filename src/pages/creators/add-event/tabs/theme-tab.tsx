import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Path, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { TabContainer } from "../component/tab-ctn";
import { useEffect, useState } from "react";
import { CustomFormField as FormField } from "@/components/custom/custom-form";
import {
  BaseRadioGroup,
  type IRadioGroupProps,
} from "@/components/reusable/base-radio-group";
import { SubmitBtn } from "../component/submit-btn";
import { Input } from "@/components/ui/input";
import { FormDescription } from "@/components/ui/form";
import { useSearchParams } from "react-router-dom";

const themeSchema = z.object({
  theme: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
});

const bannerSchema = z.object({
  desktop: z.object({
    flyer: z.instanceof(File, { message: "Please upload an image file." }),
    background: z.instanceof(File, { message: "Please upload an image file." }),
  }),
  mobile: z.object({
    flyer: z.instanceof(File, { message: "Please upload an image file." }),
    background: z.instanceof(File, { message: "Please upload an image file." }),
  }),
});

export default function ThemeTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void;
  setActiveTabState: (activeTab: string) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeForm, setActiveForm] = useState<string>();

  useEffect(() => {
    const formParam = searchParams.get("form");

    if (formParam === "layout" || formParam === "banner") {
      setActiveForm(formParam);
    } else if (searchParams.get("tab") === "theme") {
      setSearchParams({ tab: "theme", form: "layout" });
    }
  }, [searchParams]);

  function handleFormChange() {
    setSearchParams({ tab: "theme", form: "banner" });
    setActiveForm("banner");
  }

  function renderVendorTab() {
    setActiveTabState("vendor");
    searchParams.delete("form");
  }

  if (activeForm === "banner") {
    setStep(3.5);
    return <BannerImagesForm renderVendorTab={renderVendorTab} />;
  }

  setStep(3);
  return <LayoutForm handleFormChange={handleFormChange} />;
}

function LayoutForm({ handleFormChange }: { handleFormChange: () => void }) {
  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: "1",
    },
  });

  function onSubmit(values: z.infer<typeof themeSchema>) {
    console.log(values);
    handleFormChange();
  }

  return (
    <TabContainer form={form} onSubmit={onSubmit}>
      <FormField form={form} name="theme">
        {(field) => <BaseRadioGroup {...field} data={data} />}
      </FormField>

      <SubmitBtn />
    </TabContainer>
  );
}

function BannerImagesForm({
  renderVendorTab,
}: {
  renderVendorTab: () => void;
}) {
  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      desktop: {
        flyer: undefined,
        background: undefined,
      },
      mobile: {
        flyer: undefined,
        background: undefined,
      },
    },
  });

  function onSubmit(values: z.infer<typeof bannerSchema>) {
    console.log(values);
    renderVendorTab();
  }

  return (
    <TabContainer form={form} onSubmit={onSubmit} className="gap-[100px]">
      {bannerForm.map((item) => (
        <div key={item.type} className="w-full flex flex-col gap-3">
          <p className="font-sf-pro-text text-black text-2xl uppercase">
            {item.type} VIEW
          </p>
          <div className="w-full flex gap-14">
            <FormField form={form} name={item.flyer_name} className="w-[162px]">
              {(field) => (
                <>
                  <FileInputWithPreview
                    onChange={field.onChange}
                    type="flyer"
                  />

                  <FieldDescription description="Shown on Web page when in Flyer View. Also appears on the Ticket and Confirmation" />
                </>
              )}
            </FormField>

            <FormField
              form={form}
              name={item.background_name}
              className="w-full"
            >
              {(field) => (
                <>
                  <FileInputWithPreview
                    onChange={field.onChange}
                    type="background"
                  />

                  <FieldDescription description="Background image on Webpage when viewed from a desktop" />
                </>
              )}
            </FormField>
          </div>
        </div>
      ))}

      <SubmitBtn />
    </TabContainer>
  );
}

function FileInputWithPreview({
  onChange,
  type,
  className,
}: {
  onChange: (file: File | undefined) => void;
  type: "flyer" | "background";
  className?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    } else {
      setPreview(null);
      onChange(undefined);
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center border border-black ${
        type === "flyer" ? "w-[162px] h-[216px]" : "w-full h-[200px]"
      } relative ${className || ""}`}
    >
      <Input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="object-contain w-full h-full pointer-events-none"
        />
      ) : (
        <InnerText type={type} />
      )}
    </div>
  );
}

function InnerText({ type }: { type: "background" | "flyer" }) {
  return (
    <div className="flex flex-col items-center justify-center font-sf-pro-text pointer-events-none">
      <span className="text-mid-dark-gray text-sm">Insert {type} image</span>
      <span className="text-deep-red text-xs mt-2">
        {type === "background" ? " 1600 X 500" : "550 x 770"} (PIXELS)
      </span>
    </div>
  );
}

function FieldDescription({ description }: { description: string }) {
  return (
    <FormDescription className="text-black text-sm text-center">
      {description}
    </FormDescription>
  );
}

const bannerForm: IBannerForm<z.infer<typeof bannerSchema>>[] = [
  {
    type: "desktop",
    flyer_name: "desktop.flyer",
    background_name: "desktop.background",
  },
  {
    type: "mobile",
    flyer_name: "mobile.flyer",
    background_name: "mobile.background",
  },
];

const data: IRadioGroupProps[] = [
  { value: "1", src: "/assets/event/1.png", alt: "layout" },
  { value: "2", src: "/assets/event/2.png", alt: "layout" },
  { value: "3", src: "/assets/event/3.png", alt: "layout" },
  { value: "4", src: "/assets/event/4.png", alt: "layout" },
];

interface IBannerForm<T extends FieldValues> {
  type: "mobile" | "desktop";
  flyer_name: Path<T>;
  background_name: Path<T>;
}
