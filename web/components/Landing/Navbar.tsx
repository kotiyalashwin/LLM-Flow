"use client";

import { Button } from "@/web/components/ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-foreground/10 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-background">
              Orch<span className="text-purple-400">LLM</span>
            </h1>
          </div>

          {/* Get Started Button */}
          <div className="flex items-center">
            <Button
              variant="default"
              size="sm"
              className="group bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              onClick={() => {
                // For now, just scroll to bottom or you can add routing later
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
