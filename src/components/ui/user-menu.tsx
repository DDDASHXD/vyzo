import React from "react";

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
import { ApplicationContext } from "@/providers/ApplicationProvider";

import UserDropdown from "./user-dropdown";

const UserMenu = () => {
  const { user, userLoading } = React.useContext(ApplicationContext);

  return (
    <div className="flex flex-col w-full">
      <UserDropdown />
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
