// src/util/date.ts
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  })
}
