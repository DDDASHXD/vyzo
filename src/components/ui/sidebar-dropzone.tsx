import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SidebarDropzone = () => {
  const { beginDrag, dragging, dragged, getFolders } =
    React.useContext(ApplicationContext);
  const [hovered, setHovered] = React.useState(false);

  const handleMouseMove = (e: any) => {
    if (dragging && dragged!.type !== "file" && dragged!.parent !== null) {
      setHovered(true);
    }
  };

  const handleMouseUp = async () => {
    if (dragged && dragged!.type !== "file") {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/folders/move`, {
          folder: dragged,
          newParent: null,
          token: localStorage.getItem("token"),
        });

        getFolders();
      } catch (error) {
        toast.error("An error ocurred while moving file");
        console.error(error);
      }
    }
  };

  return (
    <div
      className={cn("w-full h-4 relative", {
        "": hovered,
      })}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={(e) => setHovered(false)}
      onMouseUp={() => handleMouseUp()}
    >
      {hovered && (
        <div className="absolute top-1 left-0 w-full h-[1px] bg-foreground">
          <div className="absolute size-1 bg-foreground rounded-full -translate-y-1/2"></div>
        </div>
      )}
    </div>
  );
};

export default SidebarDropzone;
