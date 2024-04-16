import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link href="/app">
        <Button>Go to app</Button>
      </Link>
    </div>
  );
}
