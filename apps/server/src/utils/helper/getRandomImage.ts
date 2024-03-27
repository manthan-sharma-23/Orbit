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

export const getProfilePicture = (): string => {
  // Generate a random index within the range of the array length
  const randomIndex = Math.floor(Math.random() * imgIcons.length);
  // Get the name at the random index
  const ImageName = imgIcons[randomIndex];
  // Construct the URL using the selected ImageName
  const url = `https://api.dicebear.com/8.x/identicon/svg?seed=${ImageName}&backgroundColor[]`;

  return url;
};
