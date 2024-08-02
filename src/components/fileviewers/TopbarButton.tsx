import React from "react";
import { Button } from "../ui/button";

export interface iTopbarButtonProps {
  props?: any;
  variant?: any;
  children: any;
}

const TopbarButton = ({ props, children }: iTopbarButtonProps) => {
  return (
    <Button
      {...props}
      variant={props && props.variant ? props.variant : "ghost"}
      className="p-1 size-5"
    >
      {children}
    </Button>
  );
};

export default TopbarButton;
