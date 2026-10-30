import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Temporary demo login — authentication will be added next.
    if (email === "demo@example.com" && password === "Demo123!") {
         localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/", {replace: true});
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>

        <p className="mb-6 text-gray-600">
          Login to your Task Manager account.
        </p>

        <label htmlFor="email" className="mb-2 block font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="demo@example.com"
          className="mb-4 w-full rounded border p-3"
          required
        />

        <label htmlFor="password" className="mb-2 block font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className="mb-4 w-full rounded border p-3"
          required
        />

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </main>
  );
}