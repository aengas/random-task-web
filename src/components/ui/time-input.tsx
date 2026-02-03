import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface TimeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput({ className, label, id, ...props }, ref) {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="time"
          id={id}
          className={cn(
            "rounded-lg border border-gray-300 px-3 py-2",
            "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);