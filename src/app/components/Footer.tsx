"use client";
import { Heart, Home, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const footerMenuItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Search",
    icon: Search,
    href: "/%E0%B8%97%E0%B8%94%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%95%E0%B8%9F%E0%B8%A3%E0%B8%B5",
  },
  {
    label: "Favorites",
    icon: Heart,
    href: "/%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B8%AA%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%95%E0%B9%81%E0%B8%95%E0%B8%81%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2",
  },
  {
    label: "Profile",
    icon: User,
    href: "/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%95%E0%B8%9D%E0%B8%B2%E0%B8%81-100-%E0%B8%A3%E0%B8%B1%E0%B8%9A-200",
  },
  {
    label: "Menu",
    icon: Menu,
    href: "/%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B8%AA%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%95",
  },
];

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="fixed bottom-0 left-0 w-full h-14 border-t border-gray-200 md:hidden ">
      <div className="flex justify-between  dark:bg-gray-900 ">
        {footerMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center   justify-center px-5 my-2 border-gray-200 dark:bg-gray-900",
                isActive && "bg-gray-50 "
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-400",
                  isActive && "text-blue-600"
                )}
              />
              <span
                className={cn(
                  "text-xs text-gray-500 group-hover:text-blue-600",
                  isActive && "text-blue-600"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};
export default Footer;
