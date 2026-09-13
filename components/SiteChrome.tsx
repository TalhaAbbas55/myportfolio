"use client";

import { navItems } from "@/data";
import { FloatingNav } from "./ui/FloatingNavbar";
import { ScrollProgress } from "./ui/ScrollProgress";
import { CustomCursor } from "./ui/CustomCursor";
import {
  CommandPalette,
  useCommandPalette,
} from "./ui/CommandPalette";

/**
 * All the persistent, page-level interactive furniture in one client island:
 * nav, read-progress bar, custom cursor and the Cmd-K palette.
 *
 * Grouping them here keeps `page.tsx` a server component, so every section
 * below still renders as HTML in the first response.
 */
export const SiteChrome = () => {
  const { open, setOpen } = useCommandPalette();

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <FloatingNav navItems={navItems} onOpenPalette={() => setOpen(true)} />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
};
