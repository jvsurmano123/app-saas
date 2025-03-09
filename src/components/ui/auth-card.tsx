import { Logo } from "./logo"

interface AuthCardProps {
  children: React.ReactNode
  title: string
  subtitle: string
  rightContent?: React.ReactNode
}

export function AuthCard({ children, title, subtitle, rightContent }: AuthCardProps) {
  return (
    <div className="auth-card min-h-screen flex bg-gray-50/40">
      {/* Lado esquerdo - Formulário */}
      <div className="auth-card-left flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-[440px] space-y-8">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="text-base text-gray-600">
              {subtitle}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_8px_rgb(0,0,0,0.08)] border border-gray-100">
            {children}
          </div>
        </div>
      </div>

      {/* Lado direito - Preview */}
      <div className="auth-card-right hidden lg:block lg:flex-1 bg-gradient-to-br from-primary/90 to-primary-600 text-white">
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[url('/auth-pattern.svg')] bg-cover bg-center bg-no-repeat bg-blend-soft-light">
          <div className="flex-1 flex items-center">
            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl font-bold leading-[1.2]">
                A maneira mais simples de gerenciar sua clínica veterinária
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Acesse sua conta para gerenciar consultas, pacientes e muito mais.
              </p>
            </div>
          </div>
          
          {rightContent && (
            <div className="mt-12">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 