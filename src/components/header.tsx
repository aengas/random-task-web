import { Clock } from "lucide-react";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">RandomTask</h1>
            <p className="text-sm text-gray-600">Planlegg dagen din</p>
          </div>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}