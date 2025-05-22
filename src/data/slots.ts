export interface IVendor {
  id: number;
  name: string;
  category: string;
  date: string;
  status:
    | "Requested"
    | "Active"
    | "Pending"
    | "Rejected"
    | "Draft"
    | "Complete";
  logoUrl: string;
}

export interface ISlot {
  id: number;
  name: string;
  category: string;
  date: string;
  count: string;
  status:
    | "Requested"
    | "Active"
    | "Pending"
    | "Rejected"
    | "Draft"
    | "Complete";
  vendors: IVendor[];
}

export const slots: ISlot[] = [
  {
    id: 1,
    name: "Morning Shift",
    category: "Food and Drinks",
    date: "Jan 1, 2025",
    count: "5/10",
    status: "Active",
    vendors: [
      {
        id: 101,
        name: "Sooyah Bistro",
        category: "Food and Drinks",
        date: "Jan 1, 2025",
        status: "Requested",
        logoUrl: "/assets/dashboard/creator/ar2.png", // replace with actual image path
      },
      {
        id: 102,
        name: "Sooyah Bistro",
        category: "Food and Drinks",
        date: "Jan 1, 2025",
        status: "Active",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
    ],
  },
  {
    id: 2,
    name: "Afternoon Shift",
    category: "Food and Drinks",
    date: "Jan 1, 2025",
    count: "10/10",
    status: "Complete",
    vendors: [
      {
        id: 103,
        name: "Sooyah Bistro",
        category: "Food and Drinks",
        date: "Jan 1, 2025",
        status: "Pending",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
    ],
  },
  {
    id: 3,
    name: "Evening Shift",
    category: "Food and Drinks",
    date: "Jan 1, 2025",
    count: "Draft",
    status: "Draft",
    vendors: [
      {
        id: 104,
        name: "Sooyah Bistro",
        category: "Food and Drinks",
        date: "Jan 1, 2025",
        status: "Rejected",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
    ],
  },
];
