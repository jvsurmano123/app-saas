import { Card, CardContent } from '../ui/card'
import { Calendar, DollarSign, Stethoscope, Users } from 'lucide-react'

interface Metric {
  name: string
  value: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  trend: {
    value: string
    positive: boolean
  }
}

export function MetricsCards() {
  const metrics: Metric[] = [
    {
      name: 'Consultas Hoje',
      value: '12',
      description: 'Total de consultas agendadas',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: {
        value: '+20%',
        positive: true,
      },
    },
    {
      name: 'Pacientes Ativos',
      value: '284',
      description: 'Total de pacientes ativos',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      trend: {
        value: '+12%',
        positive: true,
      },
    },
    {
      name: 'Procedimentos',
      value: '38',
      description: 'Realizados este mês',
      icon: Stethoscope,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: {
        value: '+5%',
        positive: true,
      },
    },
    {
      name: 'Faturamento',
      value: 'R$ 15.280',
      description: 'Receita do mês',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: {
        value: '+8%',
        positive: true,
      },
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon

        return (
          <Card key={metric.name} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    metric.trend.positive ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {metric.trend.value}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-bold text-gray-900">{metric.value}</h4>
                <p className="text-sm font-semibold text-gray-700">{metric.name}</p>
                <p className="mt-1 text-sm text-gray-600">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 