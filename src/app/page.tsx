import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bem-vindo ao VetCare
        </h1>
        <p className="text-center mb-8">
          Sistema completo para gestão de clínicas veterinárias
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          >
            Registrar
          </Link>
        </div>
      </div>
    </main>
  )
}
