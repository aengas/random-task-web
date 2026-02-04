"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardTitle, Input, Button } from "@/components/ui";
import { User, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const displayName = name || session?.user?.name || "";

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Kunne ikke oppdatere profil");
        setIsLoading(false);
        return;
      }

      await update();
      router.refresh();
      setMessage("Profilen er oppdatert");
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
    }
    setIsLoading(false);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passordene stemmer ikke overens");
      return;
    }

    if (newPassword.length < 4) {
      setError("Nytt passord må være minst 4 tegn");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Kunne ikke endre passord");
        setIsLoading(false);
        return;
      }

      setMessage("Passordet er endret");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
    }
    setIsLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Tilbake til oppgaver
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Min profil
        </h1>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <Card>
          <CardTitle className="mb-4">Profilinformasjon</CardTitle>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Brukernavn
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                {session?.user?.name || "—"}
              </p>
            </div>
            <Input
              id="name"
              label="Visningsnavn"
              type="text"
              placeholder="Ditt navn"
              value={displayName}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              Lagre endringer
            </Button>
          </form>
        </Card>

        <Card>
          <CardTitle className="mb-4">Endre passord</CardTitle>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              id="currentPassword"
              label="Nåværende passord"
              type="password"
              placeholder="Skriv inn nåværende passord"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              id="newPassword"
              label="Nytt passord"
              type="password"
              placeholder="Skriv inn nytt passord"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              id="confirmPassword"
              label="Bekreft nytt passord"
              type="password"
              placeholder="Skriv inn nytt passord igjen"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              Endre passord
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}