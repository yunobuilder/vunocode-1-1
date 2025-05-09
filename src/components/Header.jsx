// src/components/Header.jsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-purple-700 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">VUNOCODE 2.0</h1>
      <nav className="flex gap-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/sobre" className="hover:underline">Sobre</Link>
      </nav>
    </header>
  )
}
