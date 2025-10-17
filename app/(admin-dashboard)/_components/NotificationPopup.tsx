import { X, Clock, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { deleteSelectedNotifications } from "@/services/notificationService"

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
  const [showAll, setShowAll] = useState(false)
  const [items, setItems] = useState<Notification[]>(notifications)
  const [isDeleting, setIsDeleting] = useState(false)
  const [openItemMenuId, setOpenItemMenuId] = useState<string | number | null>(null)
  const [openGlobalMenu, setOpenGlobalMenu] = useState(false)

  useEffect(() => {
    setItems(notifications)
  }, [notifications])

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

  const getItemStyle = (notification: Notification) => {
    const isRecent = isRecentNotification(notification)
    return {
      backgroundColor: isRecent ? "rgba(0, 122, 255, 0.5)" : "rgba(0, 122, 255, 0.05)",
    } as React.CSSProperties
  }

  const displayedNotifications = showAll ? items : items.slice(0, 6)

  const handleDeleteAll = async () => {
    if (isDeleting || items.length === 0) return
    const confirmDelete = window.confirm("Delete all notifications?")
    if (!confirmDelete) return
    try {
      setIsDeleting(true)
      const ids = items.map((n) => String(n.id))
      await deleteSelectedNotifications(ids)
      setItems([])
    } catch (e) {
      alert("Failed to delete notifications")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteOne = async (id: string | number) => {
    if (isDeleting) return
    const confirmDelete = window.confirm("Delete this notification?")
    if (!confirmDelete) return
    try {
      setIsDeleting(true)
      await deleteSelectedNotifications([String(id)])
      setItems((prev) => prev.filter((n) => n.id !== id))
    } catch (e) {
      alert("Failed to delete notification")
    } finally {
      setIsDeleting(false)
    }
  }

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
          {displayedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="px-4 py-3 flex items-start gap-4 rounded-xl relative"
              style={getItemStyle(notification)}
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
              <button
                className="absolute bottom-2 right-2 p-1 rounded hover:bg-zinc-100 cursor-pointer"
                title="More actions"
                onClick={() => setOpenItemMenuId((prev) => prev === notification.id ? null : notification.id)}
                disabled={isDeleting}
              >
                <MoreVertical className="w-4 h-4 text-zinc-500" />
              </button>
              {openItemMenuId === notification.id && (
                <div className="absolute bottom-8 right-2 bg-white border border-zinc-200 rounded-md shadow-md z-10">
                  <button
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 w-full text-left cursor-pointer"
                    onClick={() => {
                      setOpenItemMenuId(null)
                      handleDeleteOne(notification.id)
                    }}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* See all notifications link */}
        {!showAll && items.length > 7 && (
          <div className="px-4 py-1 mt-2">
            <Button
              variant="ghost"
              className="text-blue-900 font-medium p-0 h-auto"
              onClick={() => setShowAll(true)}
            >
              See all notifications
            </Button>
          </div>
        )}
      </div>
      <button
        className="absolute bottom-3 right-3 p-2 rounded hover:bg-zinc-100 cursor-pointer"
        title="More actions"
        onClick={() => setOpenGlobalMenu((v) => !v)}
        disabled={isDeleting || items.length === 0}
      >
        <MoreVertical className="w-5 h-5 text-zinc-600" />
      </button>
      {openGlobalMenu && (
        <div className="absolute bottom-12 right-3 bg-white border border-zinc-200 rounded-md shadow-md z-20">
          <button
            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 w-full text-left cursor-pointer"
            onClick={() => {
              setOpenGlobalMenu(false)
              handleDeleteAll()
            }}
            disabled={isDeleting || items.length === 0}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}