import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { Button } from "@/components/ui/button";
import { File, Folder } from "lucide-react";

const Update = () => {
  const { getFiles, currentFolder, getFolders, dragged, dragging } =
    React.useContext(ApplicationContext);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [moving, setMoving] = React.useState(false);

  React.useEffect(() => {
    if (currentFolder) {
      getFiles(currentFolder);
    }
  }, [currentFolder]);

  React.useEffect(() => {
    getFolders();
  }, [dragged]);

  React.useEffect(() => {
    const handleMouseMove = (e: any) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging]);

  React.useEffect(() => {
    let moveTimeout: any;
    if (dragging) {
      moveTimeout = setTimeout(() => {
        setMoving(true);
      }, 200);
    } else {
      setMoving(false);
    }

    return () => {
      clearTimeout(moveTimeout);
    };
  }, [dragging]);

  return (
    <>
      {dragging && dragged && moving && (
        <div
          className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-background rounded-md opacity-50"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        >
          <Button
            variant="outline"
            className="opacity-60 text-xs h-max py-2 px-12 gap-2"
          >
            {dragged.type === "folder" ? (
              <Folder size={12} />
            ) : (
              <File size={12} />
            )}
            {dragged.name}
          </Button>
        </div>
      )}
    </>
  );
};

export default Update;
