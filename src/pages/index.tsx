import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      return router.push("/login");
    }

    return router.push("/app");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Button onClick={() => handleClick()}>Go to app</Button>
    </div>
  );
}
