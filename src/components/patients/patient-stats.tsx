import { Card } from "@/components/ui/card";
import { Patient } from "@/types/patient";
import { Users, Calendar, Activity, Clock } from "lucide-react";

interface PatientStatsProps {
  patients: Patient[];
}

export function PatientStats({ patients }: PatientStatsProps) {
  // Cálculo das estatísticas
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'em_tratamento').length;
  const newPatientsThisMonth = patients.filter(p => {
    const createdAt = new Date(p.createdAt);
    const now = new Date();
    return createdAt.getMonth() === now.getMonth() && 
           createdAt.getFullYear() === now.getFullYear();
  }).length;
  const waitingPatients = patients.filter(p => p.status === 'aguardando').length;

  const stats = [
    {
      title: "Total de Pacientes",
      value: totalPatients,
      icon: Users,
      description: "Pacientes cadastrados",
      color: "text-blue-600"
    },
    {
      title: "Em Tratamento",
      value: activePatients,
      icon: Activity,
      description: "Pacientes ativos",
      color: "text-green-600"
    },
    {
      title: "Novos este Mês",
      value: newPatientsThisMonth,
      icon: Calendar,
      description: "Cadastrados recentemente",
      color: "text-purple-600"
    },
    {
      title: "Em Espera",
      value: waitingPatients,
      icon: Clock,
      description: "Aguardando atendimento",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center gap-4">
            <div className={`rounded-full p-3 ${stat.color} bg-opacity-10`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 