export function TypographyH1({
  text,
  tracking = "tight",
}: {
  text?: string;
  tracking?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-${tracking} lg:text-5xl`}
    >
      {text}
    </h1>
  );
}
