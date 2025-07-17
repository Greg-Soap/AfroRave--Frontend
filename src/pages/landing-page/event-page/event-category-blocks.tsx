import {
  BaseSelect,
  type ICustomSelectProps,
} from "@/components/reusable/base-select";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { type IEvents, events } from "@/data/events";
import { date_list } from "@/components/constants";
import { Suspense, useState } from "react";
import { getRoutePath } from "@/config/get-route-path";
import { cn } from "@/lib/utils";

export default function EventCategoryBlocks() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <section className="w-full flex flex-col gap-20 mt-36 pb-16 max-lg:px-8 min-h-[calc(100vh-300px)]">
      <div className="lg:pl-[60px]">
        <Suspense fallback={<CategoryBlockSkeleton />}>
          <CategoryBlock
            name="Trending"
            data={events}
            showLocation={false}
            layout="middle"
          />
        </Suspense>
      </div>

      <div className="flex flex-col gap-[60px] lg:pl-[60px] xl:pl-[120px]">
        <div className="flex items-center gap-6 overflow-x-auto min-h-[40px]">
          <BaseSelect
            type="others"
            placeholder={category_list.placeholder}
            width={category_list.width}
            items={category_list.items}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              console.log("Category changed:", value);
            }}
          />

          <BaseSelect
            type="others"
            placeholder={date_list.placeholder}
            items={date_list.items}
            value={selectedDate}
            onChange={(value) => {
              setSelectedDate(value);
              console.log("Date changed:", value);
            }}
          />
        </div>

        <Suspense fallback={<CategoryBlockSkeleton />}>
          <CategoryBlock data={events} showLocation={true} display="grid" />
        </Suspense>
      </div>
    </section>
  );
}

export function CategoryBlock({
  name,
  data,
  layout = "start",
  showLocation,
  display = "flex",
}: {
  name?: string;
  data: IEvents[];
  layout?: IEventCardProps["layout"];
  showLocation?: IEventCardProps["showLocation"];
  display?: "flex" | "grid";
}) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {name && <p className="text-xl font-bold font-sf-pro-display">{name}</p>}

      <div
        className={cn({
          "flex gap-5 overflow-x-scroll scrollbar-none w-full":
            display === "flex",
          "grid md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 justify-center":
            display === "grid",
        })}
      >
        {data.map((item) => (
          <EventCard
            key={item.id}
            {...item}
            start_time={item.event_time.start_time}
            showLocation={showLocation}
            layout={layout}
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
  showLocation,
  layout = "start",
}: IEventCardProps) {
  return (
    <Link
      to={getRoutePath("individual_event", { eventId: id })}
      className={cn(
        "flex flex-col gap-1 min-w-[243px] max-w-[243px] md:min-w-fit md:max-w-full lg:min-w-[245px] lg:max-w-[284px] w-full",
        {
          "items-start": layout === "start",
          "items-center": layout === "middle",
        }
      )}
    >
      <img
        src={image}
        alt={event_name}
        className="rounded-[15px] h-[312px] object-cover"
      />

      <div className="flex flex-col gap-2 py-2 px-1">
        <p
          className={cn("text-base font-bold font-sf-pro-display uppercase", {
            "text-center": layout === "middle",
            "text-start": layout === "start",
          })}
        >
          {event_name}
        </p>

        <div className="flex flex-col gap-1">
          {showLocation && (
            <div
              className={cn("flex items-center gap-1.5 justify-center", {
                "justify-center": layout === "middle",
                "justify-start": layout === "start",
              })}
            >
              <CalendarDays size={10} color="var(--foreground)" />
              <p className="font-sf-pro-display text-xs font-normal text-center">
                {event_date} at {start_time}
              </p>
            </div>
          )}

          <div
            className={cn("flex items-center gap-1.5", {
              "justify-center": layout === "middle",
            })}
          >
            {showLocation && <MapPin size={10} color="var(--foreground)" />}
            <p className="font-sf-pro-display text-xs font-normal">
              {event_location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CategoryBlockSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />

      <div className={"gap-7 flex pr-7 overflow-x-auto scrollbar-none"}>
        {Array.from({ length: 4 }).map(() => (
          <div
            key={`event-skeleton-${crypto.randomUUID()}`}
            className="flex flex-col gap-4"
          >
            <div className="aspect-square w-full bg-gray-200 rounded-[15px] animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const category_list: ICustomSelectProps = {
  width: 368,
  defaultValue: "sports",
  placeholder: "Select Category",
  items: [
    { value: "concerts-and-festivals", label: "Concerts & Festivals" },
    { value: "arts-and-performance", label: "Arts & Performance" },
    { value: "children", label: "Children" },
    { value: "sports", label: "Sports" },
    { value: "career-and-business", label: "Career & Business" },
    { value: "comedy", label: "Comedy" },
    { value: "culture-and-religion", label: "Culture & Religion" },
  ],
};

interface IEventCardProps {
  id: number;
  image: string;
  event_name: string;
  event_location: string;
  event_date: string;
  start_time: string;
  isTrending?: boolean;
  layout?: "start" | "middle";
  showLocation?: boolean;
}
