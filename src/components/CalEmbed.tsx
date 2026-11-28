"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { profile } from "@/data/content";

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#7a1428" },
          light: { "cal-brand": "#7a1428" },
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
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
