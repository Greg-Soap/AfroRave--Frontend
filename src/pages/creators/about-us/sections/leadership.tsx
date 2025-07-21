import { TextSectionContainer } from "../../_components/text-section-ctn";

export default function LeadershipSection() {
  return (
    <section className="container max-w-[1000px] w-full flex flex-col gap-14 items-center">
      <TextSectionContainer name="NEXT GEN LEADERSHIP">
        <p>
          our leadership reflects a new generation shaping the future of events,
          technology, and creative culture
        </p>
      </TextSectionContainer>

      <div className="flex flex-wrap justify-center gap-x-[133px] gap-y-14">
        {team.map((item) => (
          <TeamCard key={item.shorthand} {...item} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ shorthand, name, position }: ITeam) {
  return (
    <div className="w-full md:w-fit h-fit flex items-center gap-4">
      <p className="size-[83px] py-8 px-6 flex items-center justify-center border-3 border-white rounded-full">
        {shorthand}
      </p>
      <div className="flex flex-col gap-1 text-white font-sf-pro-display">
        <p className="text-2xl font-bold capitalize">{name}</p>
        <p className="capitalize font-light">{position}</p>
      </div>
    </div>
  );
}

const team: ITeam[] = [
  {
    shorthand: "EA",
    name: "Eseose atie",
    position: "co-founder & president, design",
  },
  {
    shorthand: "CY",
    name: "Cyril atie",
    position: "co-founder",
  },
  {
    shorthand: "PO",
    name: "peter osian",
    position: "head developer",
  },
  {
    shorthand: "OB",
    name: "obi nonso",
    position: "asst. UI/UX designer",
  },
];

interface ITeam {
  shorthand: string;
  name: string;
  position: string;
}
