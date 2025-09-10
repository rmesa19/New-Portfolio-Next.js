import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "Unknown";

  const ua = req.headers.get("user-agent") || "Unknown";

  if (process.env.NODE_ENV === "production") {
    const { error } = await supabase.from("portfolio_audit").insert([
      {
        ip_address: ip,
        path: "/files/resume.pdf",
        event_type: "resume_click",
        user_agent: ua,
      },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
  } else {
    console.log("Resume click (dev mode, not inserted):", { ip, ua });
  }

  return NextResponse.json({ success: true });
}
