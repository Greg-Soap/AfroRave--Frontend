import { TextSectionContainer } from '../../_components/text-section-ctn'


export default function LeadershipSection() {
  return (
    <section className='w-full flex flex-col gap-8 md:gap-14 items-center pt-20 pb-16 md:pt-0 md:pb-[240px] px-5 md:px-0'>
      <TextSectionContainer name='NEXT GEN LEADERSHIP'>
        <p>
          our leadership reflects a new generation shaping the future of events, technology, and
          creative culture
        </p>
      </TextSectionContainer>

      <div className='w-full max-w-[600px] flex flex-col gap-6 md:flex-wrap md:flex-row md:justify-center md:gap-x-[133px] md:gap-y-14'>
        {team.map((item) => (
          <TeamCard key={item.shorthand} {...item} />
        ))}
      </div>
    </section>
  )
}

function TeamCard({ shorthand, name, position }: ITeam) {
  return (
    <div className='w-full h-fit flex items-center gap-4'>
      <p className='shrink-0 size-[60px] md:size-[83px] py-4 px-3 md:py-8 md:px-6 flex items-center justify-center border-2 md:border-3 border-white rounded-full text-sm md:text-base'>
        {shorthand}
      </p>
      <div className='flex flex-col gap-1 text-white font-sf-pro-display'>
        <p className='text-xl md:text-2xl font-bold capitalize'>{name}</p>
        <p className='capitalize font-light text-sm md:text-base'>{position}</p>
      </div>
    </div>
  )
}

const team: ITeam[] = [
  {
    shorthand: 'EA',
    name: 'Eseose atie',
    position: 'co-founder & president, design',
  },
  {
    shorthand: 'CY',
    name: 'Cyril atie',
    position: 'co-founder',
  },
  {
    shorthand: 'PO',
    name: 'Peter Osian',
    position: 'head developer',
  },
]

interface ITeam {
  shorthand: string
  name: string
  position: string
}
