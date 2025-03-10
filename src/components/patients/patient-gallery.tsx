'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';

interface PatientGalleryProps {
  patientId: string;
}

// TODO: Implementar busca das imagens do paciente
const mockImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=200&auto=format&fit=crop",
    title: "Consulta de rotina",
    date: new Date(),
    type: "photo",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop",
    title: "Raio-X Tórax",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: "exam",
  },
];

export function PatientGallery({ patientId }: PatientGalleryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Galeria</CardTitle>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Imagem
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockImages.map((image) => (
            <div key={image.id} className="group relative aspect-square rounded-md overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-white font-medium">{image.title}</p>
                <p className="text-white/80 text-sm">
                  {format(image.date, "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 