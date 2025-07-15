import { AuthButton } from "./AuthButton";

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
            <AuthButton>Get Started</AuthButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
