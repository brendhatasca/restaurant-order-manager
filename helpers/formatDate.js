import { format, parse, isValid } from 'date-fns';

export function formatPickupTime(time24) {
  if (!time24) return "";

  // Ensure it's a string like "13:45"
  const parsed = parse(String(time24), "HH:mm", new Date());
  if (!isValid(parsed)) return String(time24);

  return format(parsed, "h:mm a"); // 1:45 PM
}

export function formatCreatedAt(ts) {
  if (!ts) return "";

  // ts is like "17-02-2026"
  const parsed = parse(String(ts), "dd-MM-yyyy", new Date());
  if (!isValid(parsed)) return String(ts);

  return format(parsed, "MMM d, yyyy"); // Feb 17, 2026
}

