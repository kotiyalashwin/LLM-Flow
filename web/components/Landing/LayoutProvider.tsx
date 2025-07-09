import React from "react";
import Navbar from "./Navbar";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative z-20 w-screen flex flex-row justify-center">
      <div className="w-full md:max-w-[85vw]">{children}</div>
    </div>
  );
};
