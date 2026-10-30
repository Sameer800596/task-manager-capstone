import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function ThemeManager() {
  const theme = useSelector(
    (state: RootState) => state.theme.theme
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  return null;
}