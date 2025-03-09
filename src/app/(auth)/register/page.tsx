'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/hooks/use-auth'
import { AuthCard } from '@/components/ui/auth-card'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [clinic, setClinic] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signUp(email, password, name, clinic)
    } catch (error: any) {
      console.error('Erro ao criar conta:', error)
      setError(error?.message || 'Ocorreu um erro ao criar sua conta. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Comece agora mesmo a gerenciar sua clínica veterinária"
      rightContent={
        <div className="w-full">
          <img 
            src="/dashboard-preview.png" 
            alt="Dashboard Preview" 
            className="w-full rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm"
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            type="button" 
            disabled={loading} 
            className="w-full bg-white hover:bg-gray-50/80 border-gray-200 text-gray-800 font-medium h-11 shadow-sm"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar com Google
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-600 font-medium">
              ou continue com email
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-800">
              Nome completo
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
              className="h-11 text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
              className="h-11 text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-800">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="h-11 text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinic" className="text-gray-800">
              Nome da clínica
            </Label>
            <Input
              id="clinic"
              type="text"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              placeholder="Digite o nome da sua clínica"
              required
              className="h-11 text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full h-11 font-medium"
        >
          {loading ? 'Criando sua conta...' : 'Criar minha conta'}
        </Button>

        <p className="text-center text-sm">
          <span className="text-gray-600">Já tem uma conta?</span>{' '}
          <Link href="/login" className="text-gray-700 font-semibold hover:text-primary">
            Faça login
          </Link>
        </p>
      </form>
    </AuthCard>
  )
} 