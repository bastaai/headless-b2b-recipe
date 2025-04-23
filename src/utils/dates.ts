export type TimeDiff = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// diff calculates the time difference between two epoch
// timestamps and returns a TimeDiff object.
export const diff = (a: any, b: any): TimeDiff => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;

  // If b is higher than a we show calculate diff
  if (a < b) {
    seconds = Math.floor((b - a) / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
  }

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
