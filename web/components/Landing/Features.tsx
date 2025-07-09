"use client";

import React, { useState } from "react";
import { Brain, Zap, Sparkles, Globe } from "lucide-react";
import { LayoutProvider } from "./LayoutProvider";

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "Multi-Model AI",
      description: "Seamlessly combine different AI models for optimal results",
      icon: Brain,
      gradient: "from-purple-500/20 to-pink-500/20",
      size: "large",
      stats: "12+ Models",
    },
    {
      id: 2,
      title: "Easy Setup",
      description: "Create workflows within a minute",
      icon: Zap,
      gradient: " to-red-400/20",
      size: "medium",
      //   stats: "~1.8s avg",
    },
    {
      id: 5,
      title: "Everything here",
      description: "All llms in one place   ",
      icon: Globe,
      gradient: "from-indigo-500/20 to-purple-500/20",
      size: "small",
      stats: "100% Uptime",
    },
    {
      id: 6,
      title: "Smart Automation",
      description: "Intelligent workflow optimization",
      icon: Sparkles,
      gradient: "from-pink-500/20 to-rose-500/20",
      size: "small",
      stats: "85% Faster",
    },
  ];

  const getGridClasses = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2 md:col-span-2 md:row-span-2";
      case "medium":
        return "col-span-1 row-span-2 md:col-span-1 md:row-span-2";
      case "small":
        return "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
      default:
        return "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
    }
  };

  return (
    <LayoutProvider>
      <section className="py-16 md:py-24 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why Choose{" "}
              <span className="underline decoration-2 underline-offset-4 decoration-purple-600 ">
                OrchLLM
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Experience the future of AI workflows with cutting-edge features
              designed for professionals
            </p>
          </div>

          {/* Responsive Bento Grid */}
          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === feature.id;

              return (
                <div
                  key={feature.id}
                  className={`
                  ${getGridClasses(feature.size)}
                  group relative overflow-hidden rounded-xl md:rounded-2xl
                  bg-gradient-to-br ${feature.gradient}
                  backdrop-blur-sm border border-white/10
                  hover:border-white/20 transition-all duration-500
                  cursor-pointer transform-gpu min-h-[140px] md:min-h-0
                  ${
                    isHovered
                      ? "scale-[1.02] shadow-2xl shadow-purple-500/10"
                      : "hover:scale-[1.01]"
                  }
                `}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

                  {/* Content */}
                  <div className="relative z-10 p-4 md:p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div
                          className={`
                        p-2 md:p-3 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-sm
                        group-hover:bg-white/20 transition-all duration-300
                        ${isHovered ? "scale-110 rotate-6" : ""}
                      `}
                        >
                          <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xs md:text-sm font-mono text-purple-300 opacity-70">
                          {feature.stats}
                        </span>
                      </div>

                      <h3 className="text-sm md:text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors leading-tight">
                        {feature.title}
                      </h3>

                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div
                      className={`
                    mt-3 md:mt-4 w-full h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
                    transition-all duration-300 origin-left
                    ${
                      isHovered
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-50"
                    }
                  `}
                    />
                  </div>

                  {/* Animated background particles */}
                  <div className="absolute inset-0 opacity-30">
                    <div
                      className={`
                    absolute top-2 right-2 md:top-4 md:right-4 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full
                    transition-all duration-700
                    ${isHovered ? "animate-ping" : "animate-pulse"}
                  `}
                    />
                    <div
                      className={`
                    absolute bottom-4 left-4 md:bottom-8 md:left-8 w-1 h-1 bg-purple-400 rounded-full
                    transition-all duration-500 delay-100
                    ${isHovered ? "animate-bounce" : ""}
                  `}
                    />
                    <div
                      className={`
                    absolute top-1/2 right-4 md:right-8 w-1 h-1 md:w-1.5 md:h-1.5 bg-pink-400 rounded-full
                    transition-all duration-600 delay-200
                    ${isHovered ? "animate-pulse" : ""}
                  `}
                    />
                  </div>

                  {/* Gradient overlay on hover */}
                  <div
                    className={`
                  absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl md:rounded-2xl
                  transition-opacity duration-500
                  ${isHovered ? "opacity-100" : "opacity-0"}
                `}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayoutProvider>
  );
};

export default Features;
