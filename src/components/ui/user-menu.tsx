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
        <div className="flex gap-2 items-center text-sm">
          <Search size="20" />
          Search
        </div>
        <Badge className="gap-1 bg-background text-xs" variant="outline">
          <Command size="10" />K
        </Badge>
      </Button>
      <Button
        className="justify-between text-muted-foreground text-sm"
        variant={"ghost"}
      >
        <div className="flex gap-2 items-center text-sm">
          <Settings size="20" />
          Settings
        </div>
      </Button>
    </div>
  );
};

export default UserMenu;
