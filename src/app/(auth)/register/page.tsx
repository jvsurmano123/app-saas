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

    // Validação básica
    if (!name || !email || !password || !clinic) {
      setError('Por favor, preencha todos os campos')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      console.log('Iniciando registro com:', { email, name, clinic })
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
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome completo</Label>
            <Input
              id="name"
              placeholder="Dr. João Silva"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect="off"
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clinic" className="text-sm font-medium text-gray-700">Nome da clínica</Label>
            <Input
              id="clinic"
              placeholder="Clínica Veterinária Exemplo"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              disabled={loading}
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="h-11"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</Label>
            <Input
              id="password"
              placeholder="Crie uma senha segura"
              type="password"
              autoComplete="new-password"
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
          </div>
          
          <Button className="w-full h-11 text-[15px] font-medium shadow-md" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar minha conta'}
          </Button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          <Link
            href="/login"
            className="text-primary hover:text-primary/90 font-medium"
          >
            Já tem uma conta? Faça login
          </Link>
        </p>
      </div>
    </AuthCard>
  )
} 