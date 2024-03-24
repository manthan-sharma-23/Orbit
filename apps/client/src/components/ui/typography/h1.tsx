export function TypographyH1({
  text,
  tracking = "tight",
  className,
}: {
  text?: string;
  tracking?: string;
  className?: string;
}) {
  return (
    <h1
      className={
        `scroll-m-20 text-4xl font-extrabold tracking-${tracking} lg:text-5xl ` +
        className
      }
    >
      {text}
    </h1>
  );
}
