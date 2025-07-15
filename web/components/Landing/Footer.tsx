import React from "react";
import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {/* App Name */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text">
              Orch<span className="text-purple-400">LLM</span>
            </h3>
          </div>

          {/* Developer & Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-gray-300">
            {/* Built by */}
            <div className="flex items-center gap-2">
              <span>Built by</span>
              <a
                href="https://x.com/ashwinntwt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center gap-1 group"
              >
                Ashwin
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/kotiyalashwin/LLM-Flow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
