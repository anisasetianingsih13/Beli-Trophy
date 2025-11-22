import Link from "next/link";

interface NavMobileProps {
  label: string;
  href: string;
}

export default function NavMobile({ label, href }: NavMobileProps) {
  return (
    <Link
      href={href}
      className="block w-full p-2 border rounded-md hover:bg-gray-200 text-gray-800 text-sm transition"
    >
      {label}
    </Link>
  );
}
