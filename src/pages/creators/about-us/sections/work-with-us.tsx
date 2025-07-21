import { TextSectionContainer } from "../../_components/text-section-ctn";
import { LinkButton } from "../../_components/link-btn";
import { getRoutePath } from "@/config/get-route-path";

export default function WorKWithUsSection() {
  return (
    <section className="container flex flex-col items-center mb-[238px]">
      <div className="w-fit flex flex-col gap-5 items-center py-5 px-8">
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
        <LinkButton name="Contact Us" href={getRoutePath("creators_about")} />
      </div>
    </section>
  );
}
