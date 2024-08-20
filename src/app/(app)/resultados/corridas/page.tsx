'use client'
import { Corrida, getCorridasPorTemporada } from '@/services/corrida'
import {
  getTemporada,
  getTemporadaAtual,
  Temporada,
} from '@/services/temporada'
import { useEffect, useState } from 'react'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

import { getPiloto, Piloto } from '@/services/piloto'
import { getPista, Pista } from '@/services/pista'
import { useRouter, useSearchParams } from 'next/navigation'

interface CorridasCustom extends Corrida {
  pista: Pista
  piloto: Piloto
  temporada: Temporada
}

export default function PageCorridas() {
  const idTemporada = useSearchParams().get('idTemporada')
  const [temporada, setTemporada] = useState<string>()
  const router = useRouter()
  const [corridas, setCorridas] = useState<CorridasCustom[]>([])

  useEffect(() => {
    const buscarCorridas = async () => {
      const idTemporadaData = idTemporada ?? (await getTemporadaAtual()).id

      const corridasData: Corrida[] = await getCorridasPorTemporada(
        idTemporadaData as string,
      )

      const corridasCustom: CorridasCustom[] = await Promise.all(
        corridasData.map(async (corrida) => {
          const pista = await getPista(corrida.idPista)
          const piloto = await getPiloto(corrida.idPiloto || '')
          const temporada = await getTemporada(corrida.idTemporada)
          return { ...corrida, pista, piloto, temporada }
        }),
      )

      setCorridas(corridasCustom)
      setTemporada(idTemporadaData)
    }
    buscarCorridas()
  }, [idTemporada])

  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">Corridas</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg min-w-24">
              Pista
            </TableHead>
            <TableHead className="text-primary-foreground">Data</TableHead>
            <TableHead className="text-primary-foreground min-w-44">
              Ganhador
            </TableHead>
            <TableHead className="text-primary-foreground">Voltas</TableHead>
            <TableHead className="text-primary-foreground rounded-tr-lg">
              Tempo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {corridas
            .sort(
              (a, b) =>
                new Date(b.data.toDate()).getTime() -
                new Date(a.data.toDate()).getTime(),
            )
            .map((corrida, index) => (
              <TableRow
                key={index}
                className="hover:bg-secondary cursor-pointer"
                onClick={() =>
                  router.push(
                    `/resultados/corridas/${corrida.id}?idTemporada=${temporada}`,
                  )
                }
              >
                <TableCell>{corrida.pista.nome}</TableCell>
                <TableCell>
                  {corrida.data.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {corrida.piloto?.nome?.split(' ').slice(0, 2).join(' ')}
                </TableCell>
                <TableCell className="pl-5">{corrida.voltas}</TableCell>
                <TableCell>{corrida.tempo}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  )
}
