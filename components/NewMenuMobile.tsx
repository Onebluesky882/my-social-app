"use client";
import { useState } from "react";

export function NewMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Home", href: "#" },
    { title: "About", href: "#" },
    { title: "Services", href: "#" },
    { title: "Contact", href: "#" },
  ];

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center"
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute w-6 h-0.5 bg-black transform transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-black transform transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-black transform transition-all duration-300 ${
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 h-full">
          <div className="space-y-8 mt-16">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="block text-2xl font-medium hover:text-blue-500 transition-colors transform hover:translate-x-2 duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
