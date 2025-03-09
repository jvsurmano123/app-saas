'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Home,
  PackageSearch,
  Settings,
  Stethoscope,
} from 'lucide-react'
import { Logo } from '../ui/logo'

const navigation = [
  { 
    name: 'Home', 
    href: '/dashboard', 
    icon: Home,
  },
  { 
    name: 'Pacientes', 
    href: '/dashboard/patients', 
    icon: Stethoscope,
  },
  { 
    name: 'Agenda', 
    href: '/dashboard/appointments', 
    icon: CalendarDays,
  },
  { 
    name: 'Prontuários', 
    href: '/dashboard/medical-records', 
    icon: ClipboardList,
  },
  { 
    name: 'Estoque', 
    href: '/dashboard/inventory', 
    icon: PackageSearch,
  },
  { 
    name: 'Relatórios', 
    href: '/dashboard/reports', 
    icon: BarChart3,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[280px] flex-col bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b">
        <Logo />
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-0.5 p-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all',
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 flex-shrink-0 transition-colors',
                isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'
              )} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Configurações */}
      <div className="border-t p-3">
        <Link
          href="/dashboard/settings"
          className={cn(
            'group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all',
            pathname === '/dashboard/settings' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          )}
        >
          <Settings className={cn(
            'h-5 w-5 flex-shrink-0 transition-colors',
            pathname === '/dashboard/settings' ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'
          )} />
          Settings
        </Link>
      </div>
    </div>
  )
} 