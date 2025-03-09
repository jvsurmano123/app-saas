'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientHeader } from '@/components/patients/patient-header';
import { PatientOverview } from '@/components/patients/patient-overview';
import { PatientHistory } from '@/components/patients/patient-history';
import { PatientRecords } from '@/components/patients/patient-records';
import { PatientVaccines } from '@/components/patients/patient-vaccines';
import { PatientExams } from '@/components/patients/patient-exams';
import { PatientMedications } from '@/components/patients/patient-medications';
import { PatientGallery } from '@/components/patients/patient-gallery';
import { PatientDocuments } from '@/components/patients/patient-documents';
import { PatientOwner } from '@/components/patients/patient-owner';

export default function PatientPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <PatientHeader patientId={params.id} />
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <PatientOwner patientId={params.id} />
        </div>
        
        <div className="col-span-3">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-9 w-full">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="records">Prontuário</TabsTrigger>
              <TabsTrigger value="vaccines">Vacinação</TabsTrigger>
              <TabsTrigger value="exams">Exames</TabsTrigger>
              <TabsTrigger value="medications">Medicações</TabsTrigger>
              <TabsTrigger value="hospitalizations">Internações</TabsTrigger>
              <TabsTrigger value="gallery">Galeria</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <PatientOverview patientId={params.id} />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <PatientHistory patientId={params.id} />
            </TabsContent>

            <TabsContent value="records" className="space-y-4">
              <PatientRecords patientId={params.id} />
            </TabsContent>

            <TabsContent value="vaccines" className="space-y-4">
              <PatientVaccines patientId={params.id} />
            </TabsContent>

            <TabsContent value="exams" className="space-y-4">
              <PatientExams patientId={params.id} />
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <PatientMedications patientId={params.id} />
            </TabsContent>

            <TabsContent value="hospitalizations" className="space-y-4">
              <div>Conteúdo de Internações</div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <PatientGallery patientId={params.id} />
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <PatientDocuments patientId={params.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 