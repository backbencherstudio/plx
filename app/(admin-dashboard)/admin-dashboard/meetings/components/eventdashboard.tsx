"use client"

import { ChevronLeft, ChevronRight, Calendar, List } from "lucide-react"
import { useMemo, useState } from "react"
import EventDetailModal from "./event-detail-modal"
import DynamicTable from "@/app/(admin-dashboard)/_components/reusable/DynamicTable"
import { UpcomingMeetingColumn } from "@/app/(admin-dashboard)/_components/columns/UpcomingMettingColumn"
import { AdminData } from "@/app/lib/admindata"

type EventItem = {
  id: string
  title: string
  time: string
  color: "emerald" | "slate" | "violet"
  location?: string
  description?: string
}

type DayEvents = {
  date: string // YYYY-MM-DD
  items: EventItem[]
}

export default function EventDashboard() {
  // Build calendar events from AdminData.meetings (group by meetingDate)
  const events: DayEvents[] = useMemo(() => {
    const byDate = new Map<string, EventItem[]>()
    for (const m of (AdminData.meetings || [])) {
      const dateKey = m.meetingDate
      const color: EventItem["color"] = m.typeCode === "CONSULTATION" ? "emerald" : m.typeCode === "COMPLIANCE" ? "slate" : "violet"
      const arr = byDate.get(dateKey) || []
      arr.push({
        id: String(m.id),
        title: m.user,
        time: m.time,
        color,
        location: m.meetingType, // lightweight hint
        description: m.subject,
        // extra fields are passed to modal via selectedEvent below
      })
      byDate.set(dateKey, arr)
    }
    return Array.from(byDate.entries()).map(([date, items]) => ({ date, items }))
  }, [])

  const [current, setCurrent] = useState(() => {
    const firstEvent = events[0]
    if (firstEvent) {
      const [y, m] = firstEvent.date.split("-")
      return new Date(Number(y), Number(m) - 1, 1)
    }
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  // View toggle: calendar or list
  const [view, setView] = useState<"calendar" | "list">("calendar")

  const year = current.getFullYear()
  const month = current.getMonth()

  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(current), [current])

  const startDay = new Date(year, month, 1)
  const endDay = new Date(year, month + 1, 0)
  const totalDays = endDay.getDate()
  const startOffset = startDay.getDay() // 0-6, Sun first

  // Build 42 cells (6 rows * 7 cols) for stable layout
  const cells = useMemo(() => {
    const arr: { date: Date | null; inMonth: boolean }[] = []
    for (let i = 0; i < startOffset; i++) {
      arr.push({ date: null, inMonth: false })
    }
    for (let d = 1; d <= totalDays; d++) {
      arr.push({ date: new Date(year, month, d), inMonth: true })
    }
    while (arr.length % 7 !== 0) {
      arr.push({ date: null, inMonth: false })
    }
    if (arr.length < 42) {
      while (arr.length < 42) arr.push({ date: null, inMonth: false })
    }
    return arr
  }, [year, month, startOffset, totalDays])

  const eventMap = useMemo(() => {
    const map = new Map<string, DayEvents>()
    for (const e of events) map.set(e.date, e)
    return map
  }, [events])

  const today = new Date()
  const isToday = (d: Date) => d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()

  const formatDateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

  const meetingsCount = useMemo(() => events.reduce((sum, e) => sum + e.items.length, 0), [events])

  const colorChip = (color: EventItem["color"]) => {
    if (color === "emerald") return "bg-emerald-50 text-teal-400 border-neutral-300"
    if (color === "slate") return "bg-slate-200 text-sky-900 border-slate-300"
    return "bg-purple-100 text-violet-700 border-violet-700"
  }

  const [selectedEvent, setSelectedEvent] = useState<null | {
    id: string
    title: string
    time: string
    date: string
    email?: string
    timeZone?: string
    duration?: string
    subject?: string
    status?: string
    type?: string
    priority?: string
    meetingType?: string
    participants?: string[]
    notes?: string
    location?: string
    description?: string
    color?: "emerald" | "slate" | "violet"
  }>(null)

  return (
    <div className="w-full mx-auto flex flex-col justify-start items-center gap-6 p-6">
      <EventDetailModal open={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} event={selectedEvent} />
      {/* Header Section */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-start items-center gap-6">
              <div className="flex justify-center items-center gap-3">
                <button onClick={() => setCurrent(new Date(year, month - 1, 1))} className="w-8 h-8 p-2.5 rounded-lg border border-gray-100 flex justify-center items-center gap-2.5 hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4 text-zinc-600" />
                </button>
                <button onClick={() => setCurrent(new Date(year, month + 1, 1))} className="w-8 h-8 p-2.5 rounded-lg border border-gray-100 flex justify-center items-center gap-2.5 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>
              </div>
              <div className="text-neutral-600 text-lg font-semibold font-sans leading-normal">{monthLabel}</div>
            </div>
            <div className="w-24 h-7 p-1 bg-slate-200 rounded-full flex justify-center items-center">
              <div className="text-sky-900 text-xs font-medium font-sans leading-none">{meetingsCount} meetings</div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <button onClick={() => setCurrent(new Date(today.getFullYear(), today.getMonth(), 1))} className="h-7 px-3 py-1 rounded-2xl border border-slate-200 flex justify-center items-center">
              <div className="text-zinc-500 text-sm font-normal font-sans leading-tight">Today</div>
            </button>
            <div className="text-red-500 text-base font-normal font-sans leading-tight">You have {events.find(e => e.date === formatDateKey(today))?.items.length ?? 0} meetings today!</div>
          </div>
        </div>
        <div className="h-14 px-4 py-3 bg-slate-200 rounded-lg flex justify-center items-center gap-3">
          <button onClick={() => setView("calendar")} className={`w-12 h-10 px-2 py-0.5 rounded flex justify-center items-center ${view === "calendar" ? "bg-white shadow-[0px_4px_10px_0px_rgba(218,233,241,1.00)]" : "bg-transparent"}`}>
            <Calendar className={`w-6 h-6 ${view === "calendar" ? "text-blue-900" : "text-zinc-500"}`} />
          </button>
          <button onClick={() => setView("list")} className={`w-12 h-10 px-2 py-0.5 rounded flex justify-center items-center ${view === "list" ? "bg-white shadow-[0px_4px_10px_0px_rgba(218,233,241,1.00)]" : "bg-transparent"}`}>
            <List className={`w-6 h-6 ${view === "list" ? "text-blue-900" : "text-zinc-500"}`} />
          </button>
        </div>
      </div>

      {/* View container */}
      <div className="w-full bg-white rounded-lg border border-zinc-100 flex flex-col justify-start items-start">
        {view === "calendar" ? (
          <>
        {/* Day Headers */}
        <div className="self-stretch px-3 grid grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-14 px-4 py-3 flex justify-center items-center">
              <div className="text-zinc-500 text-xs font-medium font-sans leading-none">{day}</div>
            </div>
          ))}
        </div>

        {/* Calendar Days - 7 columns per row, alignedd */}
        <div className="self-stretch px-3 pb-3 grid grid-cols-7 gap-1.5">
          {cells.map((cell, idx) => {
            if (!cell.inMonth || !cell.date) {
              return (
                <div key={idx} className="h-28 p-3 bg-gray-50 rounded border border-gray-100" />
              )
            }
            const key = formatDateKey(cell.date)
            const dayEvents = eventMap.get(key)
            const dayNumber = cell.date.getDate()
            const highlight = isToday(cell.date)
            return (
              <div key={idx} className={`h-28 p-3 relative bg-white rounded ${highlight ? "border-2 border-blue-900" : "border border-gray-200"} flex justify-end items-start`}>
                {/* Events content */}
                <div className="absolute left-[10px] top-[30px] right-2 bottom-2 flex flex-col justify-start items-start gap-1.5 overflow-y-auto pr-1 custom-scroll-thin">
                  {dayEvents?.items?.map((ev) => (
                    <button onClick={() => {
                      const m = (AdminData.meetings || []).find(mm => String(mm.id) === ev.id)
                      setSelectedEvent({
                        id: ev.id,
                        title: m?.user || ev.title,
                        time: m?.time || ev.time,
                        date: key,
                        email: m?.email,
                        timeZone: m?.timeZone,
                        duration: m?.duration,
                        subject: m?.subject,
                        status: m?.status,
                        type: m?.type,
                        priority: m?.priority,
                        meetingType: m?.meetingType,
                        participants: m?.participants,
                        notes: m?.notes,
                        location: ev.location,
                        description: ev.description,
                        color: ev.color
                      })
                    }} key={ev.id} className={`self-stretch h-5 pl-1.5 pr-1 rounded-full flex justify-center items-center gap-1 border ${colorChip(ev.color)} cursor-pointer`}>
                      <div className="flex-1 text-xs font-normal font-sans leading-none truncate">{ev.title}</div>
                      <div className="w-0.5 h-2.5 border-l border-current/30" />
                      <div className="w-12 text-xs font-normal font-sans leading-none">{ev.time}</div>
                    </button>
                  ))}
                </div>
                {/* Day numbeer */}
                <div className={`w-5 h-5 px-2 absolute right-[5px] top-[5px] ${highlight ? "bg-blue-900 text-white" : ""} rounded-full flex justify-center items-center`}>
                  <div className={`text-xs font-medium font-sans ${highlight ? "text-white" : "text-zinc-500"}`}>{dayNumber}</div>
                </div>
              </div>
            )
          })}
        </div>
          </>
        ) : (
          <div className="w-full">
            <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-b border-[#E7ECF4]">
              <h2 className="text-lg font-semibold text-graytext">Upcoming Meetings</h2>
            </div>
            <DynamicTable
              columns={UpcomingMeetingColumn}
              data={(AdminData.meetings || []).slice(0, 50)}
              hasWrapperBorder={false}
              wrapperBorderColor="#E7ECF4"
              headerStyles={{
                backgroundColor: "#F5F8FA",
                textColor: "#625F6E",
                fontSize: "14px",
                padding: "12px 16px",
                fontWeight: "500",
              }}
              cellBorderColor="#E7ECF4"
            />
          </div>
        )}
      </div>
    </div>
  )
}
