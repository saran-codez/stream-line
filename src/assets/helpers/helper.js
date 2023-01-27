import {
  differenceInDays,
  parseISO,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export const getTimeOfPost = (postedOn) => {
  const parsed = parseISO(postedOn);
  const diffInDays = differenceInDays(Date.now(), parsed);
  const diffInHours = differenceInHours(Date.now(), parsed);
  const diffInMin = differenceInMinutes(Date.now(), parsed);
  const diffInSec = differenceInSeconds(Date.now(), parsed);

  if (diffInDays > 0) return `${diffInDays}d`;
  if (diffInHours > 0) return `${diffInHours}h`;
  if (diffInMin > 0) return `${diffInMin}m`;
  if (diffInSec > 0) return `${diffInSec}s`;
};
