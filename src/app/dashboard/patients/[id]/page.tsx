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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl">
          <PatientHeader patientId={params.id} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl sticky top-8">
              <PatientOwner patientId={params.id} />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="inline-flex h-auto flex-wrap gap-2 bg-gray-100/50 p-2 rounded-xl border border-gray-100">
                  {[
                    { value: "overview", label: "Visão Geral" },
                    { value: "history", label: "Histórico" },
                    { value: "records", label: "Prontuário" },
                    { value: "vaccines", label: "Vacinação" },
                    { value: "exams", label: "Exames" },
                    { value: "medications", label: "Medicações" },
                    { value: "hospitalizations", label: "Internações" },
                    { value: "gallery", label: "Galeria" },
                    { value: "documents", label: "Documentos" }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value}
                      className="rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 
                        hover:bg-white/50 hover:text-primary
                        data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm
                        data-[state=active]:ring-1 data-[state=active]:ring-primary/20"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="mt-8">
                  {[
                    { value: "overview", component: <PatientOverview patientId={params.id} /> },
                    { value: "history", component: <PatientHistory patientId={params.id} /> },
                    { value: "records", component: <PatientRecords patientId={params.id} /> },
                    { value: "vaccines", component: <PatientVaccines patientId={params.id} /> },
                    { value: "exams", component: <PatientExams patientId={params.id} /> },
                    { value: "medications", component: <PatientMedications patientId={params.id} /> },
                    { value: "hospitalizations", component: (
                      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <p className="text-lg font-medium">Nenhuma internação registrada</p>
                        <p className="mt-1 text-sm text-gray-400">Quando houver internações, elas aparecerão aqui</p>
                      </div>
                    )},
                    { value: "gallery", component: <PatientGallery patientId={params.id} /> },
                    { value: "documents", component: <PatientDocuments patientId={params.id} /> }
                  ].map((content) => (
                    <TabsContent key={content.value} value={content.value} className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                      {content.component}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 