"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import NavItem from "./NavItem";
import NavMobile from "./NavMobile";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/images/trophy.jpeg" alt="Logo" width={50} height={50} />
          <h1 className="text-lg font-bold text-gray-900 hidden sm:block">BeliTrophy</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <NavItem label="Home" href="/" />
          <NavItem label="Produk" href="/product" />
          <NavItem label="Custom" href="/custom" />
          <NavItem label="Tentang" href="/tentang" />
        </nav>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 border rounded-full px-4 py-2 bg-gray-100">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent outline-none text-sm w-40"
          />
          <Search className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpenMenu(!openMenu)} className="md:hidden p-2 hover:bg-gray-100 rounded">
          <Menu size={22} />
        </button>
      </div>

      {openMenu && (
        <div className="md:hidden mt-2 flex flex-col gap-3 bg-gray-50 p-4 rounded-lg shadow">
          <NavMobile label="Home" href="/" />
          <NavMobile label="Produk" href="/product" />
          <NavMobile label="Custom" href="/custom" />
          <NavMobile label="Tentang" href="/tentang" />
        </div>
      )}
    </header>
  );
}
