/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { academicServices, postAcademicServices, preDepartureServices, supportServices, visaServices } from '../Navbar/ServicesMenu';
import SideMenuListItem from './SideMenuListItem';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? true : storedSidebarExpanded === 'false'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-screen flex-col overflow-y-hidden bg-background duration-300 ease-linear bg-white lg:hidden lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >


      <div className="no-scrollbar mt-5 flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <div className="mb-4 ml-4 text-sm font-semibold text-midnight">
              MENU
              <hr className="border-t-2 border-red-300 mx-auto mt-2" />
            </div>

            <div className="mb-6 flex flex-col gap-1.5">

              {/* <!-- Menu Item Home --> */}
              <div>
                <NavLink
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-midnight duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 $`}
                >
                  Home
                </NavLink>
              </div>
              {/* <!-- Menu Item Home --> */}

              {/* <!-- Menu Item services --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/services' || pathname.includes('services')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Services
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <div className=" flex flex-col gap-2.5 pl-6">
                          <SideMenuListItem name='Academic Services' listItem={academicServices} setSidebarOpen={setSidebarOpen} />
                          <SideMenuListItem name='Post-Academic Services' listItem={postAcademicServices} setSidebarOpen={setSidebarOpen} />
                          <SideMenuListItem name='Support Services' listItem={supportServices} setSidebarOpen={setSidebarOpen} />
                          <SideMenuListItem name='Pre Departure Services' listItem={preDepartureServices} setSidebarOpen={setSidebarOpen} />
                          <SideMenuListItem name='Visa Services' listItem={visaServices} setSidebarOpen={setSidebarOpen} />
                        </div>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item services --> */}

              <div>
                <NavLink
                  to="/career"
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out`}
                >
                  Career
                </NavLink>
              </div>
              {/* <!-- Menu Item Package --> */}

            </div>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <div className="mb-4 ml-4 text-sm font-semibold text-midnight">
              OTHERS
              <hr className="border-t-2 border-red-300 mx-auto mt-2" />
            </div>

            <div className="mb-6 flex flex-col gap-1.5">

              {/* <!-- Menu Item Package --> */}
              <div>
                <NavLink
                  to="/package"
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out`}
                >
                  Package
                </NavLink>
              </div>
              {/* <!-- Menu Item Package --> */}

              {/* <!-- Menu Item ABOUT US --> */}
              <div>
                <NavLink
                  to="/about"
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out`}
                >
                  About Us
                </NavLink>
              </div>
              {/* <!-- Menu Item ABOUT US --> */}



            </div>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
