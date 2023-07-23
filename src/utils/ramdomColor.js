import { useState, useEffect } from "react";

export const useRandomColor = () => {
  const [avatarBgColor, setAvatarBgColor] = useState("");

  useEffect(() => {
    setAvatarBgColor(randomColor());
  }, []);

  return avatarBgColor;
};

export const randomColor = () => {
  // generate a random color
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
