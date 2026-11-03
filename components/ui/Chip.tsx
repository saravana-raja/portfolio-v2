type Level = "prod" | "lab" | "learning";

type ChipProps = {
  children: React.ReactNode;
  level?: Level;
  solid?: boolean;
  title?: string;
};

export function Chip({ children, level, solid, title }: ChipProps) {
  return (
    <span className={`chip${solid ? " chip--solid" : ""}`} title={title}>
      {level && <span className={`dot dot--${level}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
