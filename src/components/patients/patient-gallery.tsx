'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Download, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PatientGalleryProps {
  patientId: string;
}

const galleryData = [
  {
    id: 1,
    type: 'image',
    url: '/gallery/image-1.jpg',
    thumbnail: '/gallery/thumb-1.jpg',
    date: '10/03/2024',
    description: 'Foto da consulta - Dermatite',
    tags: ['dermatite', 'consulta'],
  },
  {
    id: 2,
    type: 'image',
    url: '/gallery/image-2.jpg',
    thumbnail: '/gallery/thumb-2.jpg',
    date: '15/02/2024',
    description: 'Radiografia Tórax',
    tags: ['radiografia', 'tórax'],
  },
  {
    id: 3,
    type: 'video',
    url: '/gallery/video-1.mp4',
    thumbnail: '/gallery/thumb-3.jpg',
    date: '01/02/2024',
    description: 'Avaliação de marcha',
    tags: ['ortopedia', 'marcha'],
  },
];

export function PatientGallery({ patientId }: PatientGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Galeria
          </h2>
          <p className="text-sm text-muted-foreground">
            Fotos e vídeos do paciente
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Mídia
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="relative">
              <img
                src={item.thumbnail}
                alt={item.description}
                className="w-full aspect-video object-cover"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button size="icon" variant="secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 