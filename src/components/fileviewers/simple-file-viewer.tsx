import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Topbar from "./topbar";
import { iFileviewerProps } from "./fileviewer";

const SimpleFileViewer = ({ fullscreen, setFullscreen }: iFileviewerProps) => {
  const { currentFile } = React.useContext(ApplicationContext);
  const [data, setData] = React.useState<string | null>(null);

  const getData = async () => {
    try {
      const res = await axios.get(currentFile?.url!);
      setData(res.data);
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred while reading file");
    }
  };

  React.useEffect(() => {
    getData();
  }, [currentFile]);

  if (!data)
    return (
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-5 flex flex-col">
      <Topbar
        exportFunction="fuck you"
        fullscreen={fullscreen}
        setFullscreen={(e) => setFullscreen(e)}
      />
      {data}
    </div>
  );
};

export default SimpleFileViewer;
