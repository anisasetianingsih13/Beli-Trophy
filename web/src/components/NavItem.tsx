import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
}

export default function NavItem({ label, href }: NavItemProps) {
  return (
    <Link href={href} className="hover:text-yellow-600 transition cursor-pointer">
      {label}
    </Link>
  );
}
