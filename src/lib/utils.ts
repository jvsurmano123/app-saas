import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  if (!date) return ''
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, "dd/MM/yyyy", { locale: ptBR })
}
