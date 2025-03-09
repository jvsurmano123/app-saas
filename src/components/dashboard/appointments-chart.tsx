import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { name: 'Segunda', consultas: 4 },
  { name: 'Terça', consultas: 7 },
  { name: 'Quarta', consultas: 5 },
  { name: 'Quinta', consultas: 6 },
  { name: 'Sexta', consultas: 8 },
  { name: 'Sábado', consultas: 3 },
  { name: 'Domingo', consultas: 0 },
]

export function AppointmentsChart() {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Consultas por Dia da Semana
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis
                dataKey="name"
                stroke="#4B5563"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#4B5563"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: '#111827', fontWeight: 600 }}
                itemStyle={{ color: '#4B5563' }}
              />
              <Area
                type="monotone"
                dataKey="consultas"
                stroke="#0EA5E9"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConsultas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 