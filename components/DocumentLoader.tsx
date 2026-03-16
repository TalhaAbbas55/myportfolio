"use client";

import { useEffect, useState } from "react";

export default function DocumentLoader() {
  const [isLoading, setIsLoading] = useState(
    typeof document !== "undefined" ? document.readyState !== "complete" : true,
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const update = () => {
      setIsLoading(document.readyState !== "complete");
    };

    // Ensure state is correct on mount
    update();

    document.addEventListener("readystatechange", update);
    return () => document.removeEventListener("readystatechange", update);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            height: 48,
            width: 48,
            borderRadius: "50%",
            border: "4px solid rgba(255,255,255,0.24)",
            borderTop: "4px solid white",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ fontSize: 14, fontWeight: 500 }}>Loading…</p>
      </div>
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}
