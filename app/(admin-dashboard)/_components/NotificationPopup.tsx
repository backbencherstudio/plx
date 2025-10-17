import { X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string | number
  type: string
  title: string
  description?: string
  message?: string
  timestamp: string
  isRecent?: boolean
  status?: string
}

interface NotificationPopupProps {
  onClose: () => void;
  notifications: Notification[];
}

export function NotificationPopup({ onClose, notifications }: NotificationPopupProps) {
  // Helper function to determine if notification is recent/unread
  const isRecentNotification = (notification: Notification) => {
    // For admin data: check status === "unread"
    if (notification.status !== undefined) {
      return notification.status === "unread";
    }
    // For user data: check isRecent === true
    return notification.isRecent === true;
  };

  // Helper function to get notification content
  const getNotificationContent = (notification: Notification) => {
    return notification.description || notification.message || notification.title;
  };

  return (
    <div className="w-[90vw] max-w-[500px] min-w-[300px] bg-white rounded-2xl shadow-[0px_16px_60px_0px_rgba(26,26,26,0.25)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5">
        <h2 className="text-lg font-normal text-neutral-600">Recent Notifications</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onClose}>
          <X className="h-4 w-4 text-neutral-600" />
        </Button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col px-2 pb-5 max-h-[60vh] overflow-y-auto pr-2">
        <div className="flex flex-col gap-3">
          {/* Recent notifications with background (unread/recent notifications) */}
          <div className="rounded-xl overflow-visible">
            {notifications
              .filter((n) => isRecentNotification(n))
              .map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-3 flex items-start gap-4 rounded-xl"
                  style={{ backgroundColor: "rgba(0, 122, 255, 0.15)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-base font-medium text-neutral-600 leading-tight">{notification.title}</p>
                        {getNotificationContent(notification) !== notification.title && (
                          <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{getNotificationContent(notification)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs text-zinc-500 leading-none">{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Other notifications (read/old notifications) */}
          {notifications
            .filter((n) => !isRecentNotification(n))
            .map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-3 flex items-start gap-4 rounded-xl"
                style={{ backgroundColor: "rgba(0, 122, 255, 0.05)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-base font-medium text-neutral-600 leading-relaxed">{notification.title}</p>
                      {getNotificationContent(notification) !== notification.title && (
                        <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{getNotificationContent(notification)}</p>
                      )}
                    </div>
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