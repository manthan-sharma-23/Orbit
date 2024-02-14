const profileColors = [
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#FF00FF",
  "#32CD32",
  "#C6A6FF",
  "#D8BFD8",
  "#E6E6FA",
  "#F0F8FF",
];
export const profileColor = (): string => {
  const color = profileColors[Math.floor(Math.random() * profileColors.length)];
  return color;
};
