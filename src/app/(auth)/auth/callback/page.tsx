'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabase/config'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Verificar se há um perfil pendente no localStorage
        const pendingProfileStr = localStorage.getItem('pendingProfile')
        if (!pendingProfileStr) {
          throw new Error('Dados do perfil não encontrados')
        }

        const pendingProfile = JSON.parse(pendingProfileStr)

        // Criar o perfil do usuário
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(pendingProfile)

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          throw profileError
        }

        // Limpar os dados do localStorage
        localStorage.removeItem('pendingProfile')

        // Redirecionar para o dashboard
        router.push('/dashboard')
      } catch (error) {
        console.error('Erro ao processar callback:', error)
        router.push('/login?error=callback')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Verificando...</h2>
        <p className="text-gray-600">Por favor, aguarde enquanto confirmamos seu email.</p>
      </div>
    </div>
  )
} 