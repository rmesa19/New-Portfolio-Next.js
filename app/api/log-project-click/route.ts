import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const { title, year, link } = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "Unknown";

  const ua = req.headers.get("user-agent") || "Unknown";

  if (process.env.NODE_ENV === "production") {
    const { error } = await supabase.from("portfolio_audit").insert([
      {
        ip_address: ip,
        path: link,
        event_type: "project_click",
        user_agent: ua,
      },
    ]);
    if (error) console.error("Supabase insert error:", error);
  } else {
    console.log("Project click (dev mode, not inserted):", { title, year, link, ip, ua });
  }

  return NextResponse.json({ success: true });
}
