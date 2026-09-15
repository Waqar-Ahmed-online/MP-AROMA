export interface AboutSection {
  id: string;
  eyebrow: string;      // chhoti caption, jaise "THE HEART BEHIND THE SCENT"
  title: string;        // jaise "Our Story"
  description: string;
  image: string;
  imagePosition: "left" | "right"; // image left ya right side pe hogi
  order: number;
}   