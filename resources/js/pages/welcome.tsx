import { Link } from '@inertiajs/react'

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Bienvenue dans votre système de gestion
        </h1>
        <p className="text-lg text-zinc-400 mb-10">
          Gérez efficacement les produits, clients, fournisseurs et ventes de votre entreprise d'électronique.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-white text-black font-semibold py-2 px-6 rounded hover:bg-zinc-200 transition"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="border border-white text-white font-semibold py-2 px-6 rounded hover:bg-white hover:text-black transition"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  )
}
