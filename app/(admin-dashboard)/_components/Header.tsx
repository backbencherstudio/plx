import profileImg from "@/public/header/images/profileImg.png";
// import NotificationIcon from "@/public/header/NotificationIcon";
// import SearchIcon from "@/public/header/SearchIcon";
import Image from "next/image";
import { Menu } from 'lucide-react';
import NotificationIcon from "@/public/header/Icons/NotificationIcon";
import ProfileIcon from "@/public/header/Icons/ProfileIcon";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { useAuth } from "@/app/context/AuthContext"; // Import useAuth

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
//   const { role, logout } = useAuth(); // Get the role and logout from the context

//   const handleLogout = () => {
//     console.log("Logging out...");
//     logout(); // Call logout when the user clicks logout
//   };

//   const handleLogoutChange = (value: string) => {
//     if (value === "logout") {
//       handleLogout(); // Trigger logout if "logout" is selected
//     }
//   };

  return (
    <header className="bg-[#EDF2F7]   py-3 pr-8 border-l border-l-[#E9E9EA]">
      <div className="flex items-center justify-between p-4">
        <div className=" flex items-center gap-4">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            onClick={onMenuClick}
          >
        <Menu />
          </button>
          <h2 className=" text-[#1D1F2C] text-lg font-semibold ">Dashboard</h2>
        </div>

        <div className=" flex items-center gap-3">
          <div className=" p-2">
              <NotificationIcon/>
          </div>

          <div className=" flex items-center gap-4">
            <div className=" bg-primary p-2 rounded-full">

            <ProfileIcon/>
            </div>
            <div>
              <h3 className=" text-sm text-graytext font-semibold">Miguel Trevino</h3>
              <p className=" text-[#777980] text-sm">Admin</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
