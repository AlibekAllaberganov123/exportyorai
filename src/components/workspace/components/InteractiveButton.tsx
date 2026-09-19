import { useState } from "react";

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  [key: string]: unknown;
}

export function InteractiveButton({
  children,
  onClick,
  className = "",
  ...props
}: InteractiveButtonProps) {
  const [localFeedback, setLocalFeedback] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLocalFeedback({ x, y });
    setTimeout(() => setLocalFeedback(null), 600);
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} className={`relative overflow-hidden ${className}`} {...props}>
      {children}
      {localFeedback && (
        <span
          className="absolute pointer-events-none rounded-full bg-white/30 animate-bounce-in"
          style={{
            left: localFeedback.x,
            top: localFeedback.y,
            width: 20,
            height: 20,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}
