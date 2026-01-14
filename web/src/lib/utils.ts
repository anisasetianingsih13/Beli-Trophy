import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Tambahkan fungsi ini (Penting untuk Shadcn UI)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fungsi WhatsApp Anda tetap di sini
export function formatWhatsAppLink(items: { name: string, price: number, qty: number }[]) {
  const phone = "628123456789"; // Ganti dengan nomor Admin BeliTrophy
  let message = "Halo BeliTrophy, saya ingin memesan:\n\n";
  
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.qty} pcs) - Rp${item.price.toLocaleString()}\n`;
  });

  const total = items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  message += `\n*Total Estimasi: Rp${total.toLocaleString()}*`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}