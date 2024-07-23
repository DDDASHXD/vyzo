import React from "react";
import { Switch } from "./switch";
import { useTheme } from "next-themes";

const DarkmodeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [toggled, setToggled] = React.useState(false);

  return (
    <Switch
      onClick={() =>
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
      checked={resolvedTheme === "dark" ? true : false}
    />
  );
};

export default DarkmodeSwitch;
