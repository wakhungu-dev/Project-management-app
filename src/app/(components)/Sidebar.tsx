"use client";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import Link from "next/link";
import { setIsSidebarCollapsed } from "@/state";

// Define the expected shape of your Redux state for type safety
interface GlobalState {
  global: {
    isSidebarCollapsed: boolean;
  };
}

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state: GlobalState) => state.global.isSidebarCollapsed
  );

  // Handle window resizing for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setIsSidebarCollapsed(true));
      } else {
        dispatch(setIsSidebarCollapsed(false));
      }
    };
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl
    transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 pt-3">
          <div className="text-xl font-bold text-white">SASA</div>
          {!isSidebarCollapsed && (
            <button
              aria-label="Collapse Sidebar"
              className="py-3"
              onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            >
              <X className="h-6 w-6 text-white hover:text-gray-300" />
            </button>
          )}
        </div>
        {/* Team Section */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700 bg-white dark:bg-black">
          <Image src="/logo.png" width={40} height={40} alt="Team Logo" />
        </div>
        <h3 className="px-8 text-md font-bold tracking-wide text-gray-800 dark:text-gray-200">
          Sasa Team
        </h3>
        <div className="mt-1 px-8 flex items-start gap-2">
          <LockIcon size={20} className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Private to your team</p>
        </div>
        {/* Navigation Links */}
        <nav className="z-10 w-full mt-4">
          <SidebarLink href="/" icon={Home} label="Home" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/timeline" icon={Briefcase} label="timeline" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/Search" icon={Search} label="search" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/Settings" icon={Settings} label="Settings" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/Users" icon={User} label="users" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/Teams" icon={Users} label="teams" isCollapsed={isSidebarCollapsed} />

        </nav>
        {/* projects links */}
        <button onClick={() => setShowProjects((prev) =>
        !prev)} className="flex w-full items-center justify-betweenpx-8 py-3 text-gray-500">
          <span className="">Projects</span>
          {showProjects ? (<ChevronUp className="h-5 w-5 "/>): <ChevronDown className="h-5 w-5 "/>}
        </button>

        {/* priority links */}
        <button onClick={() => setShowPriority((prev) =>
        !prev)} className="flex w-full items-center justify-betweenpx-8 py-3 text-gray-500">
          <span className="">Priority</span>
          {showPriority ? (<ChevronUp className="h-5 w-5 "/>): <ChevronDown className="h-5 w-5 "/>}
        </button>
        {showPriority && (
          <>
          <SidebarLink href="/Priority/urgent" icon={AlertCircle} label="Urgent" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/priority/high" icon={ShieldAlert} label="High" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/priority/medium" icon={AlertTriangle} label="Medium" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" isCollapsed={isSidebarCollapsed} />
          <SidebarLink href="/Priority/backlog" icon={Layers3} label="Backlog" isCollapsed={isSidebarCollapsed} />


          </>
        )}

      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 p-3 transition-colors 
        hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 
        ${isActive ? "bg-gray-100 dark:bg-gray-700" : ""} justify-start px-8 py-3`}
      >
        {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />}
        <Icon size={20} className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        {!isCollapsed && (
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Sidebar;
