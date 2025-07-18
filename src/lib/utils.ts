import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { User } from '@/types/auth'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get user initials from user profile data
 * @param user - User object from auth store
 * @returns User initials or "U" as fallback
 */
export function getUserInitials(user: User | null): string {
  if (!user?.profile?.firstName && !user?.profile?.lastName) return "U";
  const first = user.profile.firstName?.charAt(0) || "";
  const last = user.profile.lastName?.charAt(0) || "";
  return (first + last).toUpperCase() || "U";
}
