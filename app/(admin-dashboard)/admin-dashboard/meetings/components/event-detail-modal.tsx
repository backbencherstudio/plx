"use client"

import React from 'react'

type EventDetail = {
  id: string
  title: string
  time: string
  date: string
  location?: string
  description?: string
  color?: "emerald" | "slate" | "violet"
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
}

type Props = {
  open: boolean
  onClose: () => void
  event: EventDetail | null
}

export default function EventDetailModal({ open, onClose, event }: Props) {
  if (!open || !event) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 cursor-pointer " onClick={onClose} />
      <div className="relative z-10 w-full max-w-md mx-4 rounded-lg bg-white shadow-lg border border-zinc-100">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-700 font-sans">Meeting details</h3>
          <button onClick={onClose} className="px-2 py-1 text-zinc-500 hover:text-zinc-700">✕</button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <div className="text-sm text-zinc-500">Title</div>
            <div className="text-neutral-700 font-medium">{event.title}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-zinc-500">Date</div>
              <div className="text-neutral-700">{event.date}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Time</div>
              <div className="text-neutral-700">{event.time}</div>
            </div>
          </div>
          {event.email && (
            <div>
              <div className="text-sm text-zinc-500">Email</div>
              <div className="text-neutral-700">{event.email}</div>
            </div>
          )}
          {event.timeZone && (
            <div>
              <div className="text-sm text-zinc-500">Time Zone</div>
              <div className="text-neutral-700">{event.timeZone}</div>
            </div>
          )}
          {event.duration && (
            <div>
              <div className="text-sm text-zinc-500">Duration</div>
              <div className="text-neutral-700">{event.duration}</div>
            </div>
          )}
          {event.subject && (
            <div>
              <div className="text-sm text-zinc-500">Subject</div>
              <div className="text-neutral-700">{event.subject}</div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {event.status && (
              <div>
                <div className="text-sm text-zinc-500">Status</div>
                <div className="text-neutral-700 capitalize">{event.status}</div>
              </div>
            )}
            {event.type && (
              <div>
                <div className="text-sm text-zinc-500">Type</div>
                <div className="text-neutral-700 capitalize">{event.type}</div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {event.priority && (
              <div>
                <div className="text-sm text-zinc-500">Priority</div>
                <div className="text-neutral-700 capitalize">{event.priority}</div>
              </div>
            )}
            {event.meetingType && (
              <div>
                <div className="text-sm text-zinc-500">Meeting Type</div>
                <div className="text-neutral-700 capitalize">{event.meetingType.replace("_", " ")}</div>
              </div>
            )}
          </div>
          {event.participants && event.participants.length > 0 && (
            <div>
              <div className="text-sm text-zinc-500">Participants</div>
              <div className="text-neutral-700">{event.participants.join(", ")}</div>
            </div>
          )}
          {event.notes && (
            <div>
              <div className="text-sm text-zinc-500">Notes</div>
              <div className="text-neutral-700">{event.notes}</div>
            </div>
          )}
          {event.location && (
            <div>
              <div className="text-sm text-zinc-500">Location</div>
              <div className="text-neutral-700">{event.location}</div>
            </div>
          )}
          {event.description && (
            <div>
              <div className="text-sm text-zinc-500">Description</div>
              <div className="text-neutral-700">{event.description}</div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-zinc-100 flex justify-end">
          <button onClick={onClose} className="h-9 px-4 rounded-md bg-slate-200 text-sky-900 text-sm font-medium cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  )
}
