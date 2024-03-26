export function TypographyH4({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <h4
      className={
        "scroll-m-20 text-xl font-semibold tracking-tight " + className
      }
    >
      {text}
    </h4>
  );
}
