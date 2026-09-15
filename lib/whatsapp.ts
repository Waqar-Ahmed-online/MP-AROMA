// ⚠️ Apna asli WhatsApp business number yahan daalein
// Format: countrycode + number, bina "+" bina space (e.g. Pakistan: "923001234567")
export const WHATSAPP_NUMBER = "923113288776";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}