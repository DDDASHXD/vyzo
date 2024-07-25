import React from "react";
import { iFolder } from "./useFolders";
import { iFile } from "./useFiles";

export interface iDragProps {
  file?: iFile;
  folder?: iFolder;
}

const UseDND = () => {
  const [dragged, setDragged] = React.useState<iFolder | iFile | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const [mouseBegin, setMouseBegin] = React.useState(false);

  const beginDrag = (e: any, props: iDragProps) => {
    if (props.file) {
      setDragged(props.file);
    }

    if (props.folder) {
      setDragged(props.folder);
    }

    setMouseBegin(true);
  };

  React.useEffect(() => {
    const mouseUpListener = () => {
      setMouseBegin(false);
      setDragging(false);
    };

    const mouseMoveListener = (e: any) => {
      if (mouseBegin) {
        setDragging(true);
        setMouseBegin(false);
      }
      if (dragging) {
      }
    };

    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        setDragging(false);
        setDragged(null);
      }
    };

    document.addEventListener("mouseup", mouseUpListener);
    document.addEventListener("mousemove", mouseMoveListener);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", mouseUpListener);
      document.removeEventListener("mousemove", mouseMoveListener);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dragging, mouseBegin]);

  return { beginDrag, dragged, dragging };
};

export default UseDND;
