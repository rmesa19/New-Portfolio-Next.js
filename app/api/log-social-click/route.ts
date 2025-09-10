import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { label, href } = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "Unknown";

  const ua = req.headers.get("user-agent") || "Unknown";

  if (process.env.NODE_ENV === "production") {
    const { error } = await supabase.from("portfolio_audit").insert([
      {
        ip_address: ip,
        path: href,
        event_type: `social_click:${label.toLowerCase()}`, // e.g. social_click:github
        user_agent: ua,
      },
    ]);
    if (error) console.error("Supabase insert error:", error);
  } else {
    console.log("Social click (dev mode, not inserted):", { label, href, ip, ua });
  }

  return NextResponse.json({ success: true });
}
