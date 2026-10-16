"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { profile } from "@/data/content";

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#455CE9" },
          light: { "cal-brand": "#455CE9" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="30min"
      calLink={profile.calLink}
      style={{ width: "100%", height: "100%", minHeight: "640px" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
