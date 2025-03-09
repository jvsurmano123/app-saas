'use client'

import { AuthCard } from '@/components/ui/auth-card'

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Verifique seu email"
      subtitle="Enviamos um link de confirmação para o seu email. Por favor, verifique sua caixa de entrada e spam."
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
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <p>
            Para sua segurança, precisamos verificar seu endereço de email. 
            Por favor, siga as instruções que enviamos para concluir seu cadastro.
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            Não recebeu o email? Verifique sua pasta de spam ou{' '}
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary hover:underline font-medium"
            >
              tente novamente
            </button>
            .
          </p>
        </div>
      </div>
    </AuthCard>
  )
} 