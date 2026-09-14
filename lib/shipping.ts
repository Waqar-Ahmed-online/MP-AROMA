export const FREE_SHIPPING_THRESHOLD = 2000;

export type ShippingMethod = "free" | "sindh" | "other";

export interface ShippingOption {
  id: ShippingMethod;
  label: string;
  cost: number;
}

export function getAvailableShippingMethods(subtotal: number): ShippingOption[] {
  const options: ShippingOption[] = [];

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    options.push({
      id: "free",
      label: `Spend Rs. ${FREE_SHIPPING_THRESHOLD.toLocaleString()} & Get FREE Delivery`,
      cost: 0,
    });
  }

  options.push({ id: "sindh", label: "Sindh Delivery Charges", cost: 349 });
  options.push({ id: "other", label: "Other Provinces Delivery Charges", cost: 449 });

  return options;
}