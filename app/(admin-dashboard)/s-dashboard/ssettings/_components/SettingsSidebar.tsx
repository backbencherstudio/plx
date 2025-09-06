'use client'
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminInfoIcon from '@/public/settings/icons/AdminInfoIcon';
import NotificationIcon from '@/public/settings/icons/NotificationIcon';
import Security from '@/public/settings/icons/Security';
import IntegrationIcon from '@/public/settings/icons/IntegrationIcon';

interface SidebarItemType {
  name: string;
  href: string;
  icon: React.ComponentType;
}

const sidebarItems: SidebarItemType[] = [
  {
    name: "Admin Information",
    href: "/admin-dashboard/settings",
    icon: AdminInfoIcon
  },
  {
    name: "Notification",
    href: "/admin-dashboard/settings/notification",
    icon: NotificationIcon
  },
  {
    name: "Security",
    href: "/admin-dashboard/settings/security",
    icon: Security
  },
  {
    name: "Integrations",
    href: "/admin-dashboard/settings/integrations",
    icon: IntegrationIcon
  } 
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>("/admin-dashboard/settings");

  useEffect(() => {
    const sortedItems = [...sidebarItems].sort((a, b) => b.href.length - a.href.length);
    
    const currentItem = sortedItems.find(item => {
      if (item.href === "/admin-dashboard/settings") {
        return pathname === "/admin-dashboard/settings";
      }
      return pathname.startsWith(item.href);
    });

    if (!currentItem && pathname.startsWith("/admin-dashboard/settings")) {
      setActiveItem("/admin-dashboard/settings");
    } else {
      setActiveItem(currentItem ? currentItem.href : "/admin-dashboard/settings");
    }
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setActiveItem(href);
  };

  const isActiveItem = (itemHref: string) => {
    return activeItem === itemHref;
  };

  return (
    <div className="bg-white p-5 rounded-[12px] xl:min-w-[364px]">
      <nav className="flex flex-row xl:flex-col gap-4 xl:gap-6 whitespace-nowrap overflow-x-auto scrollbar-hide">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-colors duration-200 ${
              isActiveItem(item.href)
                ? "bg-[#E7ECF4] border border-[#B6C3DE] text-primary"
                : "hover:bg-[#E7ECF4] text-[#4A4C56]"
            }`}
            onClick={() => handleLinkClick(item.href)}
          >
            <item.icon />
            <h3 className="text-base font-medium">{item.name}</h3>
          </Link>
        ))}
      </nav>
    </div>
  );
}
