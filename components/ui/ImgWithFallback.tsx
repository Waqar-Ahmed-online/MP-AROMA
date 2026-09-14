"use client";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function ImgWithFallback({ src, alt, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23181614'/%3E%3C/svg%3E";
      }}
    />
  );
}
