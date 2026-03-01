import { Button } from "@/components/ui/button";
import { BaseDropdown } from "@/components/reusable";
import { cn } from "@/lib/utils";

export type EventFilter = 'all' | 'drafts' | 'ongoing' | 'sold_out' | 'ended'

const FILTER_LABELS: Record<EventFilter, string> = {
  all: 'Add Filter',
  drafts: 'Drafts',
  ongoing: 'Ongoing',
  sold_out: 'Sold Out',
  ended: 'Ended',
}

export function AddFilterBUtton({
  img = "/assets/dashboard/creator/filter.png",
  className,
  activeFilter = 'all',
  onFilterChange,
}: {
  className?: string;
  img?: string;
  activeFilter?: EventFilter;
  onFilterChange?: (filter: EventFilter) => void;
}) {
  return (
    <BaseDropdown
      trigger={
        <Button
          variant="outline"
          className={cn(
            "gap-2 px-3 h-9 border bg-white hover:bg-gray-50 rounded-[6px] transition-colors text-black",
            activeFilter !== 'all'
              ? "border-deep-red text-deep-red"
              : "border-gray-300"
          )}
        >
          <img src={img} alt="Filter" width={16} height={14} />
          <span className={cn("font-medium text-xs font-sf-pro-rounded", className)}>
            {FILTER_LABELS[activeFilter]}
          </span>
        </Button>
      }
      items={[
        { label: "All Events",  onClick: () => onFilterChange?.('all') },
        { label: "Drafts",      onClick: () => onFilterChange?.('drafts') },
        { label: "Ongoing",     onClick: () => onFilterChange?.('ongoing') },
        { label: "Sold Out",    onClick: () => onFilterChange?.('sold_out') },
        { label: "Ended",       onClick: () => onFilterChange?.('ended') },
      ]}
    />
  );
}
