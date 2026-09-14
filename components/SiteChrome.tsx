"use client";

import dynamic from "next/dynamic";
import { navItems } from "@/data";
import { FloatingNav } from "./ui/FloatingNavbar";
import { ScrollProgress } from "./ui/ScrollProgress";
import { CustomCursor } from "./ui/CustomCursor";
import {
  CommandPalette,
  useCommandPalette,
} from "./ui/CommandPalette";

// three.js is ~600 KB and purely decorative, so it streams in after the page
// has painted rather than blocking the first render.
const NeuralBackdrop = dynamic(
  () => import("./ui/NeuralCore").then((m) => m.NeuralBackdrop),
  { ssr: false },
);

/**
 * All the persistent, page-level interactive furniture in one client island:
 * the 3D backdrop, nav, read-progress bar, custom cursor and the Cmd-K palette.
 *
 * Grouping them here keeps `page.tsx` a server component, so every section
 * below still renders as HTML in the first response.
 */
export const SiteChrome = () => {
  const { open, setOpen } = useCommandPalette();

  return (
    <>
      <NeuralBackdrop />
      <ScrollProgress />
      <CustomCursor />
      <FloatingNav navItems={navItems} onOpenPalette={() => setOpen(true)} />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
};
