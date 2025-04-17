import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { type IEvents, events } from "@/data/events";

export default function TicketCategoryBlocks() {
  return (
    <section className="max-w-[1536px] w-full pl-[1rem] md:pl-[2rem] flex flex-col gap-16 mt-36 pb-16">
      <div className="flex items-center gap-3.5">
        <Select>
          <SelectTrigger className="w-[244px] min-h-[62px] rounded-[21px] border-white font-input-mono text-foreground text-xl">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="font-input-mono">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-10">
        <CategoryBlock name="Trending" data={events} />

        <CategoryBlock name="Concerts and Festivals" data={events} />

        <CategoryBlock name="Sports" data={events} />

        <CategoryBlock name="Art and Culture" data={events} />

        <CategoryBlock name="Comedy" data={events} />
      </div>
    </section>
  );
}

function CategoryBlock({ name, data }: { name: string; data: IEvents[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-bold font-input-mono">{name}</p>

      <div className="flex gap-7 pr-7 overflow-x-scroll scrollbar-none">
        {data.map((item) => (
          <EventCard
            key={item.id}
            {...item}
            start_time={item.event_time.start_time}
          />
        ))}
      </div>
    </div>
  );
}

function EventCard({
  id,
  image,
  event_name,
  event_location,
  event_date,
  start_time,
}: IEventCardProps) {
  return (
    <Link to={`/${id}`} className="flex flex-col gap-4">
      <img
        src={image}
        alt={event_name}
        className="rounded-[15px] min-w-[290px] h-[290px]"
      />

      <div className="flex flex-col gap-1.5">
        <p className="text-xl uppercase">{event_name}</p>

        <div className="flex items-center gap-1.5">
          <MapPin size={9} color="var(--foreground)" opacity={70} />
          <p className="font-sf-pro-display text-sm opacity-70">
            {event_location}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <CalendarDays size={9} color="var(--foreground)" opacity={70} />
          <p className="font-sf-pro-display text-sm opacity-70">
            {event_date} at {start_time}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface IEventCardProps {
  id: number;
  image: string;
  event_name: string;
  event_location: string;
  event_date: string;
  start_time: string;
}
