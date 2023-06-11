export default function UserAvatar({ userId, username }) {
  const firstLetter = username[0];
  const intId = parseInt(userId, 16);
  const bgColors = [
    "bg-cyan-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-teal-500",
  ];
  const colorIndex = intId % bgColors.length;

  return (
    <div
      className={`w-9 h-9 rounded-full ${bgColors[colorIndex]} text-white text-center leading-9`}
    >
      {firstLetter.toUpperCase()}
    </div>
  );
}
