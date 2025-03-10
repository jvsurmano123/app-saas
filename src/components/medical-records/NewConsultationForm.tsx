'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newConsultationSchema = z.object({
  reason: z.string().min(1, "Informe o motivo da consulta"),
  symptoms: z.string().min(1, "Informe os sintomas"),
  diagnosis: z.string().min(1, "Informe o diagnóstico"),
  notes: z.string().optional(),
  weight: z.string().min(1, "Informe o peso"),
  temperature: z.string().min(1, "Informe a temperatura"),
  heartRate: z.string().min(1, "Informe a frequência cardíaca"),
  respiratoryRate: z.string().min(1, "Informe a frequência respiratória"),
  bloodPressure: z.string().min(1, "Informe a pressão arterial"),
});

type NewConsultationForm = z.infer<typeof newConsultationSchema>;

export function NewConsultationForm() {
  const form = useForm<NewConsultationForm>({
    resolver: zodResolver(newConsultationSchema),
    defaultValues: {
      reason: "",
      symptoms: "",
      diagnosis: "",
      notes: "",
      weight: "",
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      bloodPressure: "",
    },
  });

  function onSubmit(data: NewConsultationForm) {
    // TODO: Implementar o envio do formulário
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Consulta</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivo da Consulta</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe o motivo da consulta" {...field} />
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

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnóstico</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe o diagnóstico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Observações adicionais"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-4">Sinais Vitais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pressão Arterial</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 120/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit">Salvar Consulta</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
} 