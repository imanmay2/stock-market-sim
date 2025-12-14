import { useState } from "react";
import Greet from "./greet";
import Login from "./login";
import Signup from "./signup";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="w-full relative overflow-hidden">
      
      {/* Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />

      <div className="relative z-10 grid grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* Left */}
        <Greet />

        {/* Right */}
        <div className="flex items-center justify-center">
          {isSignup ? (
            <Signup onSwitch={() => setIsSignup(false)} />
          ) : (
            <Login onSwitch={() => setIsSignup(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
