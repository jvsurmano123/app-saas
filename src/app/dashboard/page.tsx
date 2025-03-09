'use client'

import { AppointmentsCard } from '@/components/dashboard/appointments-card'
import { AppointmentsChart } from '@/components/dashboard/appointments-chart'
import { MetricsCards } from '@/components/dashboard/metrics-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { TeamPerformanceCard } from '@/components/dashboard/team-performance-card'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Métricas */}
      <MetricsCards />

      {/* Atalhos Rápidos */}
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Consultas */}
        <AppointmentsChart />

        {/* Agendamentos do Dia */}
        <AppointmentsCard />
      </div>

      {/* Desempenho da Equipe */}
      <TeamPerformanceCard />
    </div>
  )
} 