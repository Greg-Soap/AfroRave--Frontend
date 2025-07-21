import { TextSectionContainer } from "../../_components/text-section-ctn";

export default function StatementsSection() {
  return (
    <section className="container w-full flex flex-col items-center gap-[240px] py-[227px] pb-[120px]">
      <TextSectionContainer name="our story">
        <p>
          Afro Revive was founded to make the event experience simpler, more
          accessible, and more innovative. Launched by 18-year-old creative
          director <span className="font-black">Eseose Atie</span> and{" "}
          <span className="font-black">Cyril Atie</span>, the founder of{" "}
          <span className="font-black">Cytech World Communication</span>,
          Nigeria’s largest event equipment rental company, Afro Revive brings
          together fresh vision and deep industry experience.
        </p>

        <p>
          What started as a small idea has grown into a company with three key
          arms: ticketing, VFX screen rentals/production, and an upcoming media
          platform for highlighting creatives and entrepreneurs in
          entertainment, fashion, and business.
        </p>
      </TextSectionContainer>

      <TextSectionContainer name="our mission">
        <p>
          our mission is to bridge creativity, technology, and community to
          transform how events are experienced and shared.
        </p>

        <p>
          We’re building intuitive tools and platforms that empower organizers,
          vendors, and creatives—while fostering connection, culture, and
          opportunity across Africa’s entertainment, fashion, and business
          spaces.
        </p>

        <p>
          Through innovation and inclusivity, we aim to make event experiences
          more seamless, expressive, and impactful—from Nigeria to the world.
        </p>
      </TextSectionContainer>
    </section>
  );
}
