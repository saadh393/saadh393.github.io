export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure style={{ margin: "32px 0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.08)",
          display: "block",
        }}
      />
      {caption && (
        <figcaption
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "#999",
            textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.02em",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
