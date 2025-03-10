'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const consultationFormSchema = z.object({
  reason: z.string().min(3, "Motivo deve ter pelo menos 3 caracteres"),
  symptoms: z.string().min(3, "Sintomas devem ter pelo menos 3 caracteres"),
  weight: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Peso deve ser um número válido",
  }),
  temperature: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Temperatura deve ser um número válido",
  }),
  heartRate: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Frequência cardíaca deve ser um número válido",
  }),
  respiratoryRate: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Frequência respiratória deve ser um número válido",
  }),
  notes: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

const defaultValues: Partial<ConsultationFormValues> = {
  reason: "",
  symptoms: "",
  weight: "",
  temperature: "",
  heartRate: "",
  respiratoryRate: "",
  notes: "",
};

interface NewConsultationFormProps {
  patientId: string;
  onSubmit: (data: ConsultationFormValues) => void;
}

export function NewConsultationForm({ patientId, onSubmit }: NewConsultationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues,
  });

  async function handleSubmit(data: ConsultationFormValues) {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Consulta</CardTitle>
        <CardDescription>
          Registre os detalhes da consulta do paciente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo da Consulta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Consulta de rotina" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sintomas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva os sintomas apresentados"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperatura (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heartRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Freq. Cardíaca (bpm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="respiratoryRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Freq. Respiratória (rpm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observações adicionais sobre a consulta"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Consulta"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 