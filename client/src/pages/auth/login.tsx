import React, { useState } from "react";
import { makeRequest, showMessage } from "../../lib/utils";

type LoginProps = {
  onSwitch: () => void;
};

const Login = ({ onSwitch }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = await makeRequest("user/login", "POST", { username, password })

      if (payload.detail) {
        const msg = (payload.detail.message || "Login failed");
        showMessage(msg, true);
        return
      }

      const token = payload.token;

      localStorage.setItem("token", token);
      window.location.href = "/stocks";
      
    } catch (err) {
      console.log(err)
      showMessage("An unexpected error occurred. Please try again", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[420px] rounded-3xl p-10
      bg-gradient-to-br from-[#12133f] via-[#1b1c55] to-[#17184a]
      shadow-2xl border border-white/10"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-white">
          Welcome Back
        </h1>
        <p className="text-gray-300 mt-2">
          Sign in to your account
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-200 mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full px-3 py-2 rounded-full
              bg-white/20 text-white placeholder-gray-300
              outline-none border border-white/10
              focus:ring-2 focus:ring-green-400/70
            "
          />
        </div>

        <div>
          <label className="block text-sm text-gray-200 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-3 py-2 rounded-full
              bg-white/20 text-white placeholder-gray-300
              outline-none border border-white/10
              focus:ring-2 focus:ring-green-400/70
            "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-4 rounded-full
            bg-gradient-to-r from-[#6ee38f] to-[#3ca76a]
            text-white font-medium text-lg
            hover:opacity-90 transition disabled:opacity-60
          "
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-8">
        <div onClick={onSwitch}>
          <p className="cursor-pointer text-[#6ee38f] underline text-sm">Don&apos;t have an account? Sign up</p>
        </div>
      </div>
    </div>
  );
};

export default Login;