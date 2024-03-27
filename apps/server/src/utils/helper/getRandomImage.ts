const imgIcons = [
  "Shadow",
  "Simba",
  "Tiger",
  "Molly",
  "Sassy",
  "Rocky",
  "Loki",
  "Oscar",
  "Jasmine",
  "Nala",
  "Lily",
  "Baby",
  "Bandit",
  "Cali",
  "Jack",
  "Sadie",
  "Lucky",
  "Snowball",
  "Sophie",
  "Mittens",
];

const colors = [
  "#FFFFFF", // White
  "#FFFF00", // Yellow
  "#00FFFF", // Cyan
  "#FF00FF", // Magenta
  "#00FF00", // Lime Green
  "#FF0000", // Red
  "#0000FF", // Blue
  "#FFA500", // Orange
  "#FF4500", // OrangeRed
  "#7FFFD4", // AquaMarine
  "#DA70D6", // Orchid
  "#FF69B4", // HotPink
  "#00FF7F", // SpringGreen
  "#9400D3", // DarkViolet
  "#7FFF00", // Chartreuse
  "#8A2BE2", // BlueViolet
  "#20B2AA", // LightSeaGreen
  "#FF8C00", // DarkOrange
  "#9932CC", // DarkOrchid
  "#FF6347", // Tomato
  "#48D1CC", // MediumTurquoise
  "#FFD700", // Gold
  "#8B0000", // DarkRed
  "#8B008B", // DarkMagenta
  "#556B2F", // DarkOliveGreen
  "#B22222", // FireBrick
  "#008B8B", // DarkCyan
  "#1E90FF", // DodgerBlue
  "#B8860B", // DarkGoldenRod
  "#9932CC", // DarkOrchid
  "#4B0082", // Indigo
  "#FF1493", // DeepPink
  "#32CD32", // LimeGreen
  "#800000", // Maroon
  "#2E8B57", // SeaGreen
  "#FF4500", // OrangeRed
  "#8A2BE2", // BlueViolet
  "#20B2AA", // LightSeaGreen
  "#B22222", // FireBrick
  "#48D1CC", // MediumTurquoise
  "#00CED1", // DarkTurquoise
  "#8B4513", // SaddleBrown
  "#9932CC", // DarkOrchid
  "#9400D3", // DarkViolet
  "#A0522D", // Sienna
  "#000080", // Navy
  "#228B22", // ForestGreen
  "#4169E1", // RoyalBlue
  "#8B008B", // DarkMagenta
  "#DAA520", // GoldenRod
  "#9932CC", // DarkOrchid
  "#8B4513", // SaddleBrown
  "#800080", // Purple
  "#DC143C", // Crimson
  "#00008B", // DarkBlue
  "#FF8C00", // DarkOrange
  "#2F4F4F", // DarkSlateGray
  "#FF69B4", // HotPink
  "#00FF00", // Lime
  "#8B0000", // DarkRed
  "#1E90FF", // DodgerBlue
  "#556B2F", // DarkOliveGreen
  "#B8860B", // DarkGoldenRod
  "#483D8B", // DarkSlateBlue
  "#BDB76B", // DarkKhaki
  "#9400D3", // DarkViolet
  "#A0522D", // Sienna
  "#8A2BE2", // BlueViolet
  "#8B008B", // DarkMagenta
  "#FF4500", // OrangeRed
  "#32CD32", // LimeGreen
  "#8B4513", // SaddleBrown
  "#008B8B", // DarkCyan
  "#20B2AA", // LightSeaGreen
  "#DAA520", // GoldenRod
  "#9932CC", // DarkOrchid
  "#8B0000", // DarkRed
  "#00FF00", // Lime
  "#8B4513", // SaddleBrown
  "#FF8C00", // DarkOrange
  "#8A2BE2", // BlueViolet
  "#FF6347", // Tomato
  "#FF69B4", // HotPink
  "#800080", // Purple
  "#9932CC", // DarkOrchid
  "#800000", // Maroon
  "#8B008B", // DarkMagenta
  "#32CD32", // LimeGreen
  "#A0522D", // Sienna
  "#1E90FF", // DodgerBlue
  "#556B2F", // DarkOliveGreen
  "#DAA520", // GoldenRod
  "#9400D3", // DarkViolet
  "#B22222", // FireBrick
  "#000080", // Navy
  "#9932CC", // DarkOrchid
  "#8B4513", // SaddleBrown
  "#8B0000", // DarkRed
  "#800000", // Maroon
  "#8B008B", // DarkMagenta
  "#9400D3", // DarkViolet
];

function generateRandomHexCode(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as string;
}

export const getProfilePicture = (): string => {
  // Generate a random index within the range of the array length
  const randomIndex = Math.floor(Math.random() * imgIcons.length);
  // Get the name at the random index
  const ImageName = imgIcons[randomIndex];
  const hexCode = generateRandomHexCode();
  // Construct the URL using the selected ImageName
  const url = `https://api.dicebear.com/8.x/identicon/svg?seed=${ImageName}&rowColor-${hexCode}&backgroundColor[]`;

  return url;
};
