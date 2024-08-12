'use client'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Corrida, getCorridasPorTemporada } from '@/services/corrida'
import { getPiloto } from '@/services/piloto'
import { getPista } from '@/services/pista'
import { useEffect, useState } from 'react'

export default function PageCorridas({
  idTemporada,
  setIdCorrida,
}: {
  idTemporada: string
  setIdCorrida: React.Dispatch<React.SetStateAction<string>>
}) {
  const [corridas, setCorridas] = useState<Corrida[]>([])
  const [pistas, setPistas] = useState<{ [key: string]: string }>({})
  const [pilotosGanhadores, setPilotosGanhadores] = useState<{
    [key: string]: string
  }>({})

  useEffect(() => {
    const buscarCorridas = async () => {
      const data: Corrida[] = await getCorridasPorTemporada(idTemporada)
      setCorridas(data)
    }
    buscarCorridas()
  }, [idTemporada])

  useEffect(() => {
    const fetchPistas = async () => {
      const pistasData: { [key: string]: string } = {}
      if (corridas) {
        for (const corrida of corridas) {
          const pista = await getPista(corrida.idPista)
          pistasData[pista.id] = pista.nome
        }
      }
      setPistas(pistasData)
    }

    if (corridas && corridas.length > 0) {
      fetchPistas()
    }
  }, [corridas])

  useEffect(() => {
    const fetchPilotos = async () => {
      const pilotosGanhadoresData: { [key: string]: string } = {}
      if (corridas) {
        for (const corrida of corridas) {
          const piloto = await getPiloto(corrida.idPiloto || '')
          pilotosGanhadoresData[piloto.id] = piloto.nome
        }
      }
      setPilotosGanhadores(pilotosGanhadoresData)
    }

    if (corridas && corridas.length > 0) {
      fetchPilotos()
    }
  }, [corridas])

  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">Corridas</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg">
              Pista
            </TableHead>
            <TableHead className="text-primary-foreground">Data</TableHead>
            <TableHead className="text-primary-foreground">Ganhador</TableHead>
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
                onClick={() => setIdCorrida(corrida.id)}
              >
                <TableCell>{pistas[corrida.idPista]}</TableCell>
                <TableCell>
                  {corrida.data.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {pilotosGanhadores[corrida.idPiloto || '']}
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
