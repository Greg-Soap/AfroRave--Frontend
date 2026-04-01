import { TextSectionContainer } from "../../_components/text-section-ctn";
import { LinkButton } from "../../_components/link-btn";
import { getRoutePath } from "@/config/get-route-path";

export default function WorKWithUsSection() {
  return (
    <section className="flex flex-col items-center pt-20 mb-16 md:pt-0 md:mb-[238px] px-5 md:px-0">
      <div className="w-full max-w-[700px] flex flex-col gap-5 items-center py-4 px-0 md:px-8">
        <TextSectionContainer
          name="work with us"
          className="underline underline-offset-4"
        >
          <p>
            As we grow, we’re always open to working with forward-thinking
            brands, creatives, and organizations that believe in innovation,
            culture, and community. Interested in partnering with us? Let’s
            build something meaningful—together.
          </p>
        </TextSectionContainer>
        <LinkButton name="Contact Us" href={getRoutePath("creators_contact")} />
      </div>
    </section>
  );
}
