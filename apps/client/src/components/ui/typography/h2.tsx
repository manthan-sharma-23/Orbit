export function TypographyH2({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <h2
      className={
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0  " +
        className
      }
    >
      {text}
    </h2>
  );
}
