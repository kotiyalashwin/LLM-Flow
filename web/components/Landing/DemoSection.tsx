"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import TypingAnimation from "./Animated/TypingAnimation";
import { Button } from "../ui/button";
import { LayoutProvider } from "./LayoutProvider";

export const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [reset, setReset] = useState(0);

  const demoSteps = [
    {
      title: "Research Query",
      content: "Analyzing Apple Intelligence developments...",
      model: "Gemini",
      color: "bg-green-600",
      duration: 2000, // 2 seconds
    },
    {
      title: "Processing Data",
      content: "Found 247 relevant articles, papers, and reports",
      model: "Gemini",
      color: "bg-green-600",
      duration: 3000, // 3 seconds
    },
    {
      title: "Summarization",
      content:
        "Apple Intelligence represents a significant leap in on-device AI processing, focusing on privacy-first machine learning that runs locally on Apple silicon. The technology integrates deeply with iOS and macOS...",
      model: "Claude",
      color: "bg-purple-600",
      duration: 1000, // 1 second
    },
    {
      title: "Final Summary",
      content:
        "• Privacy-focused on-device AI processing\n• Deep integration with Apple ecosystem\n• Enhanced Siri capabilities with contextual understanding\n• Advanced text and image generation\n• Improved accessibility features",
      model: "Claude",
      color: "bg-purple-600",
      duration: 3000, // 3 seconds
    },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && currentStep < demoSteps.length - 1) {
      const currentStepDuration = demoSteps[currentStep].duration;
      timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, currentStepDuration);
    } else if (currentStep >= demoSteps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    if (currentStep >= demoSteps.length - 1) {
      setCurrentStep(0);
      setReset((prev) => prev + 1);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setReset((prev) => prev + 1);
  };

  return (
    // <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
    //   <div className="max-w-4xl mx-auto">
    <LayoutProvider>
      <div className="min-h-screen py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="underline  underline-offset-4 decoration-purple-600">
              OrchLLM
            </span>{" "}
            Workflows in Action
          </h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">
            Watch how the AI models collaborate to research and summarize
            complex topics
          </p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button
              onClick={handlePlay}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isPlaying ? "Pause" : "Start Demo"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-600 bg-transparent text-white w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {demoSteps.map((step, index) => (
              <div
                key={`${index}-${reset}`}
                className={`p-4 sm:p-6 rounded-xl border transition-all duration-500 ${
                  index <= currentStep
                    ? "bg-gray-800/80 border-purple-500/30 opacity-100"
                    : "bg-gray-900/40 border-gray-700/30 opacity-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${step.color} w-fit`}
                  >
                    {step.model}
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    {step.title}
                  </h3>
                </div>

                {index <= currentStep && (
                  <div className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {index === currentStep ? (
                      <TypingAnimation
                        key={`${index}-${reset}`}
                        text={step.content}
                        speed={30}
                      />
                    ) : (
                      <span className="whitespace-pre-line">
                        {step.content}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutProvider>
    //   </div>
    // </div>
  );
};
