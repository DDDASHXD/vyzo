import { LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { Skeleton } from "./skeleton";
import React from "react";
import { cn } from "@/lib/utils";

const UserDropdown = () => {
  const { user, userLoading, logout } = React.useContext(ApplicationContext);
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu onOpenChange={(e: boolean) => setOpen(e)}>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-4 px-3 py-1 items-center hover:bg-black/5 rounded-md cursor-pointer">
          <Avatar>
            <AvatarFallback>
              {!userLoading && user ? user.name.charAt(0) : ".."}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full">
            <p>
              {!userLoading ? (
                user && user.name
              ) : (
                <Skeleton className="h-4 w-[250px]" />
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {!userLoading ? (
                user && user.email
              ) : (
                <Skeleton className="h-2 w-[150px]" />
              )}
            </p>
          </div>
          <ChevronDown
            className={cn("transition-all", {
              "-rotate-180": open,
            })}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
