import PropTypes from "prop-types";

export default function UserAvatar({ userId, username }) {
  UserAvatar.propTypes = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };

  const firstLetter = username[0];
  const intId = parseInt(userId.substring(10), 16);
  const bgColors = [
    "bg-cyan-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-teal-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-gray-500",
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-indigo-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-orange-600",
    "bg-gray-600",
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
