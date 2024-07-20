import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";

const Update = () => {
  const { getFiles, currentFolder } = React.useContext(ApplicationContext);

  React.useEffect(() => {
    if (currentFolder) {
      getFiles(currentFolder);
    }
  }, [currentFolder]);

  return <></>;
};

export default Update;
