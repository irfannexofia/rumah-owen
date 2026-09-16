"use client";

import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password")
      })
    });

    if (!response.ok) {
      setMessage("Username atau password salah.");
      return;
    }

    window.location.reload();
  }

  return (
    <main className="container-pad flex min-h-[70vh] items-center justify-center py-16">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4 p-8">
        <p className="eyebrow">Admin</p>
        <h1 className="font-serif text-4xl">Dashboard Login</h1>
        <input name="username" required placeholder="Username" className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 outline-none focus:border-olive" />
        <input name="password" required type="password" placeholder="Password" className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 outline-none focus:border-olive" />
        {message ? <p className="text-sm text-red-700">{message}</p> : null}
        <button className="btn-primary w-full">Login</button>
      </form>
    </main>
  );
}
