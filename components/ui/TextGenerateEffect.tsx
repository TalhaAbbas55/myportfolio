import { cn } from "@/lib/utils";

/**
 * Staggered word reveal for the hero headline.
 *
 * This used to be a framer-motion client component that rendered every word at
 * opacity-0 and only faded them in after hydration. That made the largest text
 * on the page invisible until the JS bundle landed, which wrecked LCP.
 *
 * It is now a server component using a pure CSS animation: the text ships in
 * the initial HTML (good for LCP and for crawlers) and the reveal is layered on
 * top as progressive enhancement.
 */
export const TextGenerateEffect = ({
  words,
  className,
  as: Tag = "div",
}: {
  words: string;
  className?: string;
  as?: "h1" | "h2" | "div";
}) => {
  const wordsArray = words.split(" ");

  return (
    <Tag className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <span
              key={word + idx}
              // idx > 3 switches the tail of the headline to the accent colour
              className={cn(
                "animate-word-appear",
                idx > 3 ? "text-purple" : "dark:text-white text-black",
              )}
              // Total reveal stays under ~0.8s so the headline (the LCP
              // element) is not held transparent for long.
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  );
};
