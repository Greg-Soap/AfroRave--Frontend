export interface IServiceVendor {
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

export interface IService {
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
  vendors: IServiceVendor[];
}

export const services: IService[] = [
  {
    id: 1,
    name: "Venue Setup",
    category: "Event Planning",
    date: "Jan 1, 2025",
    status: "Complete",
    vendors: [
      {
        id: 1,
        name: "Clessy",
        category: "Photography",
        date: "Jan 1, 2025",
        status: "Complete",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
      {
        id: 2,
        name: "Clessy",
        category: "Photography",
        date: "Jan 1, 2025",
        status: "Pending",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
      {
        id: 3,
        name: "Clessy",
        category: "Photography",
        date: "Jan 1, 2025",
        status: "Rejected",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
    ],
  },
  {
    id: 2,
    name: "Catering Services",
    category: "Food and Drinks",
    date: "Feb 5, 2025",
    status: "Draft",
    vendors: [
      {
        id: 4,
        name: "Clessy",
        category: "Photography",
        date: "Jan 1, 2025",
        status: "Complete",
        logoUrl: "/assets/dashboard/creator/ar2.png",
      },
    ],
  },
];
