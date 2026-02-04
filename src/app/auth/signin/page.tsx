"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardTitle, Input, Button } from "@/components/ui";
import { LogIn, Clock } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const result = await signIn("credentials", {
      email: email.trim(),
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <CardTitle>Logg inn på RandomTask</CardTitle>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="E-postadresse"
            type="email"
            placeholder="din@epost.no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            {isLoading ? "Logger inn..." : "Logg inn"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Demo-modus: Skriv inn en e-postadresse for å starte.
        </p>
      </Card>
    </div>
  );
}