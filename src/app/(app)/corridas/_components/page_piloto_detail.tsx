import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Corrida, getCorrida } from '@/services/corrida'
import { getPiloto, Piloto } from '@/services/piloto'
import { getPista } from '@/services/pista'
import {
  getAllResultadoPilotosByPiloto,
  ResultadoPiloto,
} from '@/services/resultadoPiloto'
import {
  getTemporadaPilotoByPilotoAndTemporada,
  TemporadaPiloto,
} from '@/services/temporadaPiloto'
import { useEffect, useState } from 'react'

export default function PagePilotoDetail({
  idPiloto,
  idTemporada,
  setIdCorrida,
  setSelectedOption,
}: {
  idPiloto: string
  idTemporada: string
  setIdCorrida: (idCorrida: string) => void
  setSelectedOption: (selectedOption: string) => void
}) {
  const [resultadosPiloto, setResultadosPiloto] = useState<ResultadoPiloto[]>(
    [],
  )
  const [piloto, setPiloto] = useState<Piloto>()
  const [temporadaPiloto, setTemporadaPiloto] = useState<TemporadaPiloto>()
  const [corridas, setCorridas] = useState<{ [key: string]: Corrida }>({})

  useEffect(() => {
    const buscarResultadosPiloto = async () => {
      const resultados = await getAllResultadoPilotosByPiloto(idPiloto)
      setResultadosPiloto(resultados)

      const pilotoData = await getPiloto(idPiloto)
      setPiloto(pilotoData)

      const temporadaPilotoData = await getTemporadaPilotoByPilotoAndTemporada(
        idPiloto,
        idTemporada,
      )
      setTemporadaPiloto(temporadaPilotoData!)
    }
    buscarResultadosPiloto()
  }, [idPiloto, idTemporada])

  useEffect(() => {
    const fetchCorridas = async () => {
      const corridasData: { [key: string]: Corrida } = {}
      if (resultadosPiloto) {
        for (const resultadoPiloto of resultadosPiloto) {
          const corrida = await getCorrida(resultadoPiloto.idCorrida)
          if (corrida) {
            const pista = await getPista(corrida.idPista)
            corridasData[resultadoPiloto.idCorrida] = {
              ...corrida,
              nome: pista.nome,
            }
          }
        }
      }
      setCorridas(corridasData)
    }

    if (resultadosPiloto && resultadosPiloto.length > 0) {
      fetchCorridas()
    }
  }, [resultadosPiloto])

  return (
    <main className="flex-1 py-8 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{piloto?.nome}</h1>
        <p className="text-md font-semibold mr-2">
          Pontos: {temporadaPiloto?.pontos}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-center text-primary-foreground rounded-tl-lg">
              Corrida
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Data
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              N. Melhor Volta
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Melhor Volta
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Posição
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Posição Quali
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Tempo Quali
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              V. Média
            </TableHead>
            <TableHead className="text-center text-primary-foreground rounded-tr-lg">
              Pontos na Corrida
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resultadosPiloto
            .sort(
              (a, b) =>
                new Date(corridas[b.idCorrida]?.data.toDate()).getTime() -
                new Date(corridas[a.idCorrida]?.data.toDate()).getTime(),
            )
            .map((result, index) => (
              <TableRow
                key={index}
                className="hover:bg-secondary cursor-pointer"
                onClick={() => {
                  setIdCorrida(result.idCorrida)
                  setSelectedOption('corridas')
                }}
              >
                <TableCell className="text-center">
                  {corridas[result.idCorrida]?.nome}
                </TableCell>
                <TableCell className="text-center">
                  {corridas[result.idCorrida]?.data
                    .toDate()
                    .toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-center">
                  {result.numeroDaMelhorVolta}
                </TableCell>
                <TableCell className="text-center">
                  {result.melhorVolta}
                </TableCell>
                <TableCell className="text-center">{result.posicao}</TableCell>
                <TableCell className="text-center">
                  {result.posicaoQualificacao}
                </TableCell>
                <TableCell className="text-center">
                  {result.tempoQualificacao}
                </TableCell>
                <TableCell className="text-center">
                  {result.velocidadeMedia}
                </TableCell>
                <TableCell className="text-center">
                  {result.isMelhorVoltaCorrida
                    ? result.pontos + 1
                    : result.pontos}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  )
}
