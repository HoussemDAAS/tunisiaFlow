import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date ): string => {
  const parsedDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const now = new Date();
  const diffMs = now.getTime() - parsedDate.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  } else if (diffYears < 1) {
    return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
  } else {
    return 'Very old';
  }
};

export const formatNumber = (num: number | string): string => {
  if (typeof num === 'number') {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return Math.round(num / 1000) + 'k';
    } else {
      return (num / 1000000).toFixed(1) + 'm';
    }
  } else {
    return num;
  }
};