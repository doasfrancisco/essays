import Link from "next/link";

export default function Translations({
  items
}: {
  items: { href: string; label: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <ul className="translations">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
