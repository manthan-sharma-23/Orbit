export function TypographyMuted({
  text,
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return <p className={className + " text-muted-foreground "}>{text}</p>;
}
