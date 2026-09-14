interface ProductPriceProps {
  priceRs: number;
  compareAtPriceRs?: number;
  size?: "sm" | "md" | "lg";
}

const SIZE_STYLES = {
  sm: { sale: "text-sm", compare: "text-xs" },
  md: { sale: "font-body text-sm", compare: "text-xs" },
  lg: { sale: "font-body text-xl", compare: "text-sm" },
};

// Agar compareAtPriceRs diya gaya ho aur woh sale price se zyada ho, to
// actual price cut (strikethrough) dikhate hain sale price ke sath.
// Warna sirf sale price dikhta hai — jaisa pehle tha.
export default function ProductPrice({
  priceRs,
  compareAtPriceRs,
  size = "md",
}: ProductPriceProps) {
  const showCompare =
    typeof compareAtPriceRs === "number" && compareAtPriceRs > priceRs;
  const styles = SIZE_STYLES[size];

  return (
    <span className="inline-flex flex-wrap items-baseline gap-2">
      <span className={`${styles.sale} text-gold`}>
        Rs. {priceRs.toLocaleString()}.00
      </span>
      {showCompare && (
        <span className={`${styles.compare} text-smoke line-through`}>
          Rs. {compareAtPriceRs!.toLocaleString()}.00
        </span>
      )}
    </span>
  );
}