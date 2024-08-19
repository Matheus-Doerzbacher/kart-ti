'use client'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Corrida, getCorrida } from '@/services/corrida'
import { getPiloto } from '@/services/piloto'
import { getPista, Pista } from '@/services/pista'
import {
  getAllResultadoPilotosByIdCorrida,
  ResultadoPiloto,
} from '@/services/resultadoPiloto'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageCorrida() {
  const { idCorrida } = useParams()
  const router = useRouter()
  const [corrida, setCorrida] = useState<Corrida | null>(null)
  const [resultadoPilotos, setResultadoPilotos] = useState<ResultadoPiloto[]>(
    [],
  )
  const [pista, setPista] = useState<Pista>()
  const [pilotos, setPilotos] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchCorrida = async () => {
      const dataCorrida = await getCorrida(idCorrida as string)
      setCorrida(dataCorrida)

      const dataPista = await getPista(dataCorrida.idPista)
      setPista(dataPista)

      const dataResultadoPilotos = await getAllResultadoPilotosByIdCorrida(
        idCorrida as string,
      )
      setResultadoPilotos(dataResultadoPilotos)
    }
    fetchCorrida()
  }, [idCorrida])

  useEffect(() => {
    const fetchPistas = async () => {
      const pilotosData: { [key: string]: string } = {}
      if (resultadoPilotos) {
        for (const result of resultadoPilotos) {
          const piloto = await getPiloto(result.idPiloto)
          pilotosData[result.idPiloto] = piloto.nome
        }
      }
      setPilotos(pilotosData)
    }

    if (resultadoPilotos && resultadoPilotos.length > 0) {
      fetchPistas()
    }
  }, [resultadoPilotos])

  const valorDoPilotoDaFrente = (valor: string) => {
    const numeroInteiro = parseInt(valor)
    if (!isNaN(numeroInteiro) && numeroInteiro > 0) {
      return `-${numeroInteiro} Voltas`
    } else {
      return valor
    }
  }

  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">
        {`${pista?.nome} ${corrida?.data.toDate().toLocaleDateString()}`}
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-center text-primary-foreground rounded-tl-lg">
              Pos
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Kart
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Piloto
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Nº M.V
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Melhor Volta
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Dif. Líder
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Dif. Piloto Frente
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              N. de Voltas
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Vel. Média
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Pos Quali
            </TableHead>
            <TableHead className="text-center text-primary-foreground rounded-tr-lg">
              Tempo Quali
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resultadoPilotos
            .sort((a, b) => a.posicao - b.posicao)
            .map((result, index) => (
              <TableRow key={index} className="hover:bg-secondary">
                <TableCell className="text-center">{result.posicao}</TableCell>
                <TableCell className="text-center">
                  {result.numeroKart}
                </TableCell>
                <TableCell
                  onClick={() =>
                    router.push(
                      `/resultados/pilotos/${result.idPiloto}?idTemporada=${corrida?.idTemporada}`,
                    )
                  }
                  className="cursor-pointer"
                >
                  {pilotos[result.idPiloto]}
                </TableCell>
                <TableCell className="text-center">
                  {result.numeroDaMelhorVolta}
                </TableCell>
                <TableCell
                  className={`text-center ${result.isMelhorVoltaCorrida ? 'text-green-500' : ''}`}
                >
                  {result.melhorVolta}
                </TableCell>
                <TableCell className="text-center">
                  {valorDoPilotoDaFrente(result.tempoDoPilotoLider) || '---'}
                </TableCell>
                <TableCell className="text-center">
                  {valorDoPilotoDaFrente(result.tempoDoPilotoDaFrente) || '---'}
                </TableCell>
                <TableCell className="text-center">
                  {result.totalDeVoltas}
                </TableCell>
                <TableCell className="text-center">
                  {result.velocidadeMedia}
                </TableCell>
                <TableCell className="text-center">
                  {result.posicaoQualificacao}
                </TableCell>
                <TableCell className="text-center">
                  {result.tempoQualificacao}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Legenda:</p>
        <ul className="list-disc pl-4">
          <li>Pos: Posição</li>
          <li>Kart: Número do Kart</li>
          <li>Nº M.V: Número da Melhor Volta</li>
          <li>Melhor Volta: Melhor Volta do Piloto</li>
          <li>Dif. Líder: Diferença para o Líder</li>
          <li>Dif. Piloto Frente: Diferença para o Piloto da Frente</li>
          <li>Vel. Média: Velocidade Média</li>
          <li>Pos Quali: Posição na Qualificação</li>
          <li>Tempo Quali: Tempo na Qualificação</li>
        </ul>
      </div>
    </main>
  )
}
