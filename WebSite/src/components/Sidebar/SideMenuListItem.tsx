/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import React, { useState, useEffect } from "react";

interface SideMenuListItemProps {
    name: string;
    listItem: { label: string; link: string }[];
    setSidebarOpen?: (open: boolean) => void;
}

const SideMenuListItem: React.FC<SideMenuListItemProps> = ({ name, listItem, setSidebarOpen }) => {
    const { pathname } = useLocation();

    // Get sidebar state from localStorage outside of useState
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded") === "true";
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded);

    // Update localStorage when sidebar state changes
    useEffect(() => {
        localStorage.setItem("sidebar-expanded", String(sidebarExpanded));
    }, [sidebarExpanded]);

    return (
        <li>
            <SidebarLinkGroup activeCondition={pathname.includes(name)}>
                {(handleClick, open) => (
                    <>
                        <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out 
                                ${pathname.includes(name) ? "bg-gray-200" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                            }}
                        >
                            {name}
                            <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform duration-200 ${open ? "rotate-180" : ""
                                    }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                />
                            </svg>
                        </NavLink>
                        {/* Dropdown Menu */}
                        <div className={`transform overflow-hidden transition-all ${!open ? "hidden" : ""}`}>
                            <ul className="flex flex-col gap-2.5 pl-6">
                                {listItem.map((academic, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={academic.link}
                                            onClick={() => setSidebarOpen && setSidebarOpen(false)}
                                            className={({ isActive }) =>
                                                `group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-black duration-300 ease-in-out hover:text-white ${isActive ? "!text-black" : ""}`
                                            }
                                        >
                                            {academic.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </SidebarLinkGroup>
        </li>
    );
};

export default SideMenuListItem;
