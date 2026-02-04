"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardTitle, Input, Button } from "@/components/ui";
import { LogIn, Clock } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username: username.trim(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Feil brukernavn eller passord");
      setIsLoading(false);
      return;
    }

    if (result?.ok) {
      router.push("/");
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <CardTitle>Logg inn på RandomTask</CardTitle>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="username"
            label="Brukernavn"
            type="text"
            placeholder="Skriv inn brukernavn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Passord"
            type="password"
            placeholder="Skriv inn passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            {isLoading ? "Logger inn..." : "Logg inn"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Har du ikke en konto?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              Registrer deg
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}