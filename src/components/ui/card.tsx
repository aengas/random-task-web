import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    function Card({ className, padding = "md", ...props }, ref) {
        return (
          <div 
            ref={ref}
            className={cn(
                "bg-white rounded-xl shadow-sm border border-gray-200",
                getPaddingClasses(padding),
                className
            )}
            {...props}
          />
        );
    }
)

function getPaddingClasses(padding: CardProps["padding"]) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8",
  };
  return paddings[padding ?? "md"];
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-b border-gray-200 pb-4 mb-4", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>){
    return (
        <h2
          className={cn("text-lg font-semibold text-gray-900", className)}
          {...props}
        />
    );
}