"use client";

import { useEffect } from "react";

const ThemeWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: string;
}) => {
  useEffect(() => {
    document.body.setAttribute("data-theme", style);
    return () => document.body.removeAttribute("data-theme");
  }, [style]);

  return <>{children}</>;
};

export default ThemeWrapper;