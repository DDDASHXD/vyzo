import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const Index = () => {
  const [file, setFile] = React.useState<any>(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("file", file);
      token && formData.append("token", token);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL!}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("File uploaded... probably");
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-max h">
        <Input type="file" onChange={(e: any) => setFile(e.target.files[0])} />
        {file && (
          <Button onClick={() => handleSubmit()} type="submit">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
