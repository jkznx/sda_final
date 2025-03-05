"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LottoPage from './lotto/page'; // Correct import

const navigation = [
  { name: "Dashboard", href: "/dashboards", current: true },
  { name: "Check", href: "/dashboards/check", current: false },
  { name: "Carts", href: "/dashboards/carts", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ username?: string; email?: string; imageUrl?: string; role?: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Add searchTerm state

  // Check sessionStorage for user data and admin status
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.role === 'admin');
      
      if (parsedUser.role === 'admin' && pathname !== '/dashboards/adminboard') {
        router.push('/dashboards/adminboard');
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }

    const handleStorageChange = () => {
      const updatedUser = sessionStorage.getItem("user");
      const updatedToken = sessionStorage.getItem("token");

      if (updatedToken && updatedUser) {
        const parsedUser = JSON.parse(updatedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsAdmin(parsedUser.role === 'admin');
        if (parsedUser.role === 'admin' && pathname !== '/dashboards/adminboard') {
          router.push('/dashboards/adminboard');
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router, pathname]);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/dashboards/login");
  };

  const userNavigation = [
    { name: user ? `${user.username}'s Profile` : "Your Profile", href: "#" },
    { name: isLoggedIn ? "Sign out" : "Log in", href: isLoggedIn ? "#" : "/dashboards/login", onClick: isLoggedIn ? handleSignOut : undefined },
  ];

  return (
    <div>
      {/* Marquee for Login and Signout reminders */}
      {!isLoggedIn && (
        <div className="bg-violet-500 text-white p-4 text-center text-xl font-semibold">
          <marquee behavior="scroll" direction="left" scrollamount="5">
            กรุณา login ก่อนใช้งาน และ sign out ทุกครั้งหลังใช้งานเสร็จ
          </marquee>
        </div>
      )}
      
      <Disclosure as="nav" className="bg-white-400 shadow">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0 mt-4">
                <img alt="Logo" src="/coe-lotto.png" className="w-35 h-25" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={classNames(
                        pathname === item.href ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {isAdmin && (
                    <Link
                      href="/dashboards/adminboard"
                      className={classNames(
                        pathname === "/dashboards/adminboard" ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      Admin Board
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 justify-between space-x-6">
                {/* Search Box */}
                <div className="flex items-center">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <input
                      id="search"
                      name="search"
                      type="text"
                      placeholder="Search by lotto number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 w-48"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="relative rounded-full bg-violet-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-violet-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img alt="" src={user?.imageUrl || "https://via.placeholder.com/150"} className="size-8 rounded-full" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        onClick={item.onClick}
                      >
                        <MenuItem>
                          <div className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-none">
                            {item.name}
                          </div>
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <DisclosureButton
                  className={classNames(
                    pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              </Link>
            ))}
            {isAdmin && (
              <Link href="/dashboards/adminboard">
                <DisclosureButton
                  className={classNames(
                    pathname === "/dashboards/adminboard" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  Admin Board
                </DisclosureButton>
              </Link>
            )}
          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img alt="" src={user?.imageUrl || "https://via.placeholder.com/150"} className="size-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.username || "Guest"}</div>
                <div className="text-sm font-medium text-gray-400">{user?.email || "No email"}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={item.onClick}
                >
                  <DisclosureButton
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                </Link>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Render LottoPage for /dashboards route, otherwise render children */}
          {pathname === '/dashboards' && !isAdmin ? (
            <>
              <h1 className="text-2xl font-semibold text-gray-900">ยินดีต้อนรับสู่ กองฉลากPSU</h1>
              <LottoPage searchTerm={searchTerm} />
            </>
          ) : (
            React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, { searchTerm } as any)
                : child
            )
          )}
        </div>
      </main>
    </div>
  );
}
