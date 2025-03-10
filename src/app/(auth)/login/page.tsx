'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/hooks/use-auth'
import { AuthCard } from '@/components/ui/auth-card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      await signIn(email, password)
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      setError(error?.message || 'Ocorreu um erro ao fazer login. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Bem-vindo de volta"
      subtitle="Digite suas credenciais para acessar sua conta e continue gerenciando sua clínica"
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
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            type="button" 
            disabled={loading} 
            className="w-full bg-white hover:bg-gray-50/80 border-gray-200 text-gray-700 font-medium h-11 shadow-sm"
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
            <span className="bg-white px-4 text-gray-500 text-[13px]">ou continue com email</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/90"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="Digite sua senha"
              type="password"
              autoComplete="current-password"
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
              required
            />
          </div>
          <Button className="w-full h-11 text-[15px] font-medium shadow-md" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar na minha conta'}
          </Button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          <Link
            href="/register"
            className="text-primary hover:text-primary/90 font-medium"
          >
            Não tem uma conta? Registre-se gratuitamente
          </Link>
        </p>
      </div>
    </AuthCard>
  )
} 