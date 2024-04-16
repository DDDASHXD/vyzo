import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  Command,
  Inbox,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

const UserMenu = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 px-3 py-1 items-center hover:bg-black/5 rounded-md cursor-pointer">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full">
          <p>Sebastian Skov</p>
          <p className="text-xs text-muted-foreground">skov@skxv.dev</p>
        </div>
        <ChevronDown />
      </div>
      <Button
        className="justify-between text-muted-foreground"
        variant={"ghost"}
      >
        <div className="flex gap-2 items-center">
          <Search />
          Search
        </div>
        <Badge className="gap-1 bg-background" variant="outline">
          <Command size="12" />K
        </Badge>
      </Button>
      <Button
        className="justify-between text-muted-foreground"
        variant={"ghost"}
      >
        <div className="flex gap-2 items-center">
          <Inbox />
          Inbox
        </div>
      </Button>
      <Button
        className="justify-between text-muted-foreground"
        variant={"ghost"}
      >
        <div className="flex gap-2 items-center">
          <Settings />
          Settings
        </div>
      </Button>
      <Button
        className="justify-between text-muted-foreground"
        variant={"ghost"}
      >
        <div className="flex gap-2 items-center">
          <PlusCircle />
          New Folder
        </div>
      </Button>
    </div>
  );
};

export default UserMenu;
