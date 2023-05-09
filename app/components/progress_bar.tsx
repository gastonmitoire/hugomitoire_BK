import { useEffect, useState } from "react";

type ProgressBarProps = {
  timeout: number;
};

export function ProgressBar({ timeout }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / (timeout / 100));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timeout]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
    }
  }, [progress]);

  return (
    <div
      className="dark:bg-neutral-200 dark:bg-opacity-30"
      style={{
        width: `${progress}%`,
        height: "4px",
        transition: "width 0.1s linear",
        zIndex: 1000,
      }}
    ></div>
  );
}
