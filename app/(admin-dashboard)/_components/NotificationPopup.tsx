import { X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "message" | "update" | "meeting"
  title: string
  description?: string
  timestamp: string
  isRecent?: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from Admin",
    timestamp: "12:58 PM",
    isRecent: true,
  },
  {
    id: "2",
    type: "update",
    title: "Schedule has been updated successfully.",
    timestamp: "2 hours ago",
    isRecent: true,
  },
  {
    id: "3",
    type: "meeting",
    title: "Your meeting with Admin at 5:00 PM on 12/02/2025 via Calendly, has been approved.",
    timestamp: "8 hours ago",
  },
]

interface NotificationPopupProps {
  onClose: () => void;
}

export function NotificationPopup({ onClose }: NotificationPopupProps) {
  return (
    <div className="w-[500px] mr-[170px] top-0 bg-white rounded-2xl shadow-[0px_16px_60px_0px_rgba(26,26,26,0.25)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5">
        <h2 className="text-lg font-normal text-neutral-600">Recent Notifications</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onClose}>
          <X className="h-4 w-4 text-neutral-600" />
        </Button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col px-2 pb-5">
        <div className="flex flex-col gap-3">
          {/* Recent notifications with backgroundd */}
          <div className="bg-slate-50 rounded-xl overflow-hidden">
            {notifications
              .filter((n) => n.isRecent)
              .map((notification) => (
                <div key={notification.id} className="px-4 py-3 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-base font-medium text-neutral-600 leading-tight">{notification.title}</p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs text-zinc-500 leading-none">{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Other notifications */}
          {notifications
            .filter((n) => !n.isRecent)
            .map((notification) => (
              <div key={notification.id} className="px-4 py-3 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-base font-medium text-neutral-600 leading-relaxed">{notification.title}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs text-zinc-500 leading-none">{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* See all notifications link */}
        <div className="px-4 py-1 mt-2">
          <Button variant="ghost" className="text-blue-900 font-medium p-0 h-auto">
            See all notifications
          </Button>
        </div>
      </div>
    </div>
  )
}