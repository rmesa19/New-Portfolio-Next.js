"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"

type AuditEvent = {
  id: number
  created_at: string
  ip_address: string
  path: string
  event_type: string
  user_agent: string
  country?: string
  city?: string
  region?: string
}

export default function DashboardPage() {
  const [events, setEvents] = useState<AuditEvent[]>([])

  useEffect(() => {
    // Initial fetch of last 20 events
    const fetchInitial = async () => {
      const { data } = await supabase
        .from("portfolio_audit")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)
      if (data) setEvents(data)
    }
    fetchInitial()

    // Subscribe to realtime changes
    const channel = supabase
      .channel("audit-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_audit" },
        (payload) => {
          setEvents((prev) => [payload.new as AuditEvent, ...prev].slice(0, 20))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Live Audit Dashboard</h1>

      <table className="w-full border-collapse border border-gray-700 text-sm">
        <thead className="bg-gray-900 text-gray-100">
          <tr>
            <th className="px-3 py-2 border">Time</th>
            <th className="px-3 py-2 border">Event</th>
            <th className="px-3 py-2 border">Path</th>
            <th className="px-3 py-2 border">IP</th>
            <th className="px-3 py-2 border">Location</th>
            <th className="px-3 py-2 border">User Agent</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-t border-gray-600">
              <td className="px-3 py-2">{new Date(e.created_at).toLocaleString()}</td>
              <td className="px-3 py-2 font-semibold">{e.event_type}</td>
              <td className="px-3 py-2">{e.path}</td>
              <td className="px-3 py-2">{e.ip_address}</td>
              <td className="px-3 py-2">
                {[e.city, e.region, e.country].filter(Boolean).join(", ")}
              </td>
              <td className="px-3 py-2 truncate max-w-xs">{e.user_agent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
