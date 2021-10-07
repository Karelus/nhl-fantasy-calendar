import { addDays } from "date-fns";

export const getDays = (startDate: Date, endDate: Date): Date[] => {
  let currentDate = startDate;
  const days: Date[] = [];

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days;
};
