import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { supabase } from "./lib/supabase-server"; 

export async function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const parser = new UAParser(ua);
  const result = parser.getResult();
  const country = req.headers.get("x-vercel-ip-country") || "Unknown";
  const city = req.headers.get("x-vercel-ip-city") || "Unknown";
  const region = req.headers.get("x-vercel-ip-country-region") || "Unknown";


  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "Unknown";

  const logData = {
    ip_address: ip,
    path: req.nextUrl.pathname,
    device: result.device.type || "desktop",
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
    user_agent: ua,
    country: country,
    city: city,
    region: region
  };

  if (process.env.NODE_ENV === "production") {
    const { error } = await supabase.from("portfolio_audit").insert([logData]);
    if (error) console.error("Error inserting audit log:", error);
  } else {
    console.log("Audit log (dev mode, not inserted):", logData);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/archive"], 
};
