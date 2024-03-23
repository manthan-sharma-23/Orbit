import moment from "moment";

// Generate a random number between 1 and 4 and format it with leading zeros if necessary
export function getRandomNumberWithLeadingZeros(n: number) {
  const randomNumber = Math.floor(Math.random() * n) + 1;
  return randomNumber < 10 ? "0" + randomNumber : "" + randomNumber;
}

export function timeAgo(date: Date): string {
  return moment(date).fromNow();
}
