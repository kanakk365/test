"use client";
import { useState } from "react";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  return (
    <header className="py-4 bg-black sm:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <a href="#" title="" className="flex">
              <img
                className="w-auto h-9"
                src="https://cdn.global.noobsverse.com/CoffeeCodes+Logo.svg"
                alt=""
              />
            </a>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <span
                style={{ display: expanded ? "none" : "inline" }}
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </span>

              <span
                style={{ display: expanded ? "inline" : "none" }}
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>

          <nav className="hidden md:flex md:items-center md:justify-end md:space-x-12">
            <a
              href="/auth/login"
              title=""
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              {" "}
              Login{" "}
            </a>
          </nav>
        </div>

        {expanded && (
          <nav>
            <div className="flex flex-col pt-8 pb-4 space-y-6">
              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Products{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Features{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Pricing{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {" "}
                Support{" "}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
