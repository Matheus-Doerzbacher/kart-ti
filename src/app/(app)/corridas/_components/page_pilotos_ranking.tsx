'use client'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { getPiloto } from '@/services/piloto'
import {
  getAllTempordaPilotoByTemporada,
  TemporadaPiloto,
} from '@/services/temporadaPiloto'
import { useEffect, useState } from 'react'

export default function PagePilotosRanking({
  idTemporada,
  setIdPiloto,
}: {
  idTemporada: string
  setIdPiloto: React.Dispatch<React.SetStateAction<string>>
}) {
  const [temporadaPilotos, setTemporadaPilotos] = useState<TemporadaPiloto[]>(
    [],
  )
  const [pilotos, setPilotos] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchTemporadaPilotos = async () => {
      const data = await getAllTempordaPilotoByTemporada(idTemporada)
      setTemporadaPilotos(data)
    }
    fetchTemporadaPilotos()
  }, [idTemporada])

  useEffect(() => {
    const fetchPistas = async () => {
      const pistasData: { [key: string]: string } = {}
      if (temporadaPilotos) {
        for (const temporadaPiloto of temporadaPilotos) {
          const piloto = await getPiloto(temporadaPiloto.idPiloto)
          pistasData[temporadaPiloto.idPiloto] = piloto.nome
        }
      }
      setPilotos(pistasData)
    }

    if (temporadaPilotos && temporadaPilotos.length > 0) {
      fetchPistas()
    }
  }, [temporadaPilotos])

  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">{`Pilotos`}</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-center text-primary-foreground rounded-tl-lg">
              Pos
            </TableHead>
            <TableHead className=" text-primary-foreground">Nome</TableHead>
            <TableHead className="text-center text-primary-foreground">
              Pontos
            </TableHead>
            <TableHead className="text-center text-primary-foreground rounded-tr-lg">
              Vitorias
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {temporadaPilotos
            .sort((a, b) => b.pontos - a.pontos)
            .map((piloto: TemporadaPiloto, index) => (
              <TableRow
                key={index}
                className="hover:bg-secondary cursor-pointer"
                onClick={() => setIdPiloto(piloto.idPiloto)}
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{pilotos[piloto.idPiloto]}</TableCell>
                <TableCell className="text-center">{piloto.pontos}</TableCell>
                <TableCell className="text-center">{piloto.vitorias}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  )
}
