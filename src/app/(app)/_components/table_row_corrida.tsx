'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TableCell, TableRow } from '@/components/ui/table'
import { Corrida } from '@/services/corrida'
import { getPiloto, Piloto } from '@/services/piloto'
import {
  getAllResultadoPilotosByIdCorrida,
  ResultadoPiloto,
} from '@/services/resultadoPiloto'
import { useEffect, useState } from 'react'

export const TableRowCorrida = ({ corrida }: { corrida: Corrida }) => {
  const [resultadoPilotos, setResultadoPilotos] = useState<ResultadoPiloto[]>()
  const [pilotos, setPilotos] = useState<{ [key: string]: Piloto }>()

  useEffect(() => {
    const fetchPiloto = async () => {
      const resultados = await getAllResultadoPilotosByIdCorrida(corrida.id)
      setResultadoPilotos(resultados)
    }
    fetchPiloto()
  }, [corrida.id])

  useEffect(() => {
    const fetchPilotos = async () => {
      const pilotosData: { [key: string]: Piloto } = {}
      if (resultadoPilotos) {
        for (const result of resultadoPilotos) {
          const piloto = await getPiloto(result.idPiloto)
          pilotosData[result.idPiloto] = piloto
        }
      }
      setPilotos(pilotosData)
    }

    if (resultadoPilotos && resultadoPilotos.length > 0) {
      fetchPilotos()
    }
  }, [resultadoPilotos])

  return (
    <>
      {resultadoPilotos
        ?.sort((a, b) => a.posicao - b.posicao)
        .slice(0, 3)
        .map((result) => (
          <TableRow key={result.id}>
            <TableCell>{result.posicao}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={pilotos?.[result.idPiloto]?.urlImage} />
                <AvatarFallback>
                  {pilotos?.[result.idPiloto]?.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {pilotos?.[result.idPiloto]?.nome}
            </TableCell>
            <TableCell className="text-center">{result.melhorVolta}</TableCell>
          </TableRow>
        ))}
    </>
  )
}
