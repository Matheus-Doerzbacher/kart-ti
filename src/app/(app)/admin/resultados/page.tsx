'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import { SheetFormResultado } from './_components/sheet_form_resultado'
import { toast } from '@/components/ui/use-toast'
import {
  deleteResultadoPiloto,
  getAllResultadoPilotosByIdCorrida,
  ResultadoPiloto,
} from '@/services/resultadoPiloto'
import { getAllTemporada, Temporada } from '@/services/temporada'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Corrida, getCorridasPorTemporada } from '@/services/corrida'
import { getPista } from '@/services/pista'
import { getPiloto } from '@/services/piloto'

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false)

  const [selectTemporada, setSelectTemporada] = useState<Temporada[]>()
  const [selectCorrida, setSelectCorrida] = useState<Corrida[]>()
  const [idTemporada, setIdTemporada] = useState<string>()
  const [idCorrida, setIdCorrida] = useState<string>()
  const [resultados, setResultados] = useState<ResultadoPiloto[]>()
  const [resultadoToEdit, setResultadoToEdit] = useState<
    ResultadoPiloto | undefined
  >(undefined)
  const [pilotos, setPilotos] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const buscarTemporadas = async () => {
      const dataSelectTemporada = await getAllTemporada()
      setSelectTemporada(dataSelectTemporada)
    }
    buscarTemporadas()
  }, [])

  const buscarResultados = useCallback(async () => {
    if (idCorrida) {
      const data = await getAllResultadoPilotosByIdCorrida(idCorrida)
      setResultados(data)
    }
  }, [idCorrida])

  useEffect(() => {
    buscarResultados()
  }, [buscarResultados])

  useEffect(() => {
    const atualizarCorridas = async () => {
      if (idTemporada) {
        const data: Corrida[] = await getCorridasPorTemporada(idTemporada)

        const dataCorrida = await Promise.all(
          data.map(async (corrida: Corrida) => ({
            ...corrida,
            nome: (await getPista(corrida.idPista)).nome, // Corrigido para acessar a propriedade 'nome'
          })),
        )

        setSelectCorrida(dataCorrida)
      }
    }
    atualizarCorridas()
  }, [idTemporada])

  useEffect(() => {
    const fetchPilotos = async () => {
      const pilotosData: { [key: string]: string } = {}
      if (resultados) {
        for (const resultado of resultados) {
          const piloto = await getPiloto(resultado.idPiloto)
          pilotosData[resultado.idPiloto] = piloto.nome
        }
      }
      setPilotos(pilotosData)
    }

    if (resultados && resultados.length > 0) {
      fetchPilotos()
    }
  }, [resultados])

  const valorDoPilotoDaFrente = (valor: string) => {
    const numeroInteiro = parseInt(valor)
    if (!isNaN(numeroInteiro) && numeroInteiro > 0) {
      return `-${numeroInteiro} Voltas`
    } else {
      return valor
    }
  }

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="flex justify-between gap-5">
        <h1 className="text-2xl font-bold mb-4">Resultados</h1>
        {/* Select Temporada */}
        <Select onValueChange={(value) => setIdTemporada(value)}>
          <SelectTrigger className="border-primary">
            <SelectValue placeholder="Selecione a temporada" />
          </SelectTrigger>
          <SelectContent className="border-primary">
            {selectTemporada?.map((temporada: Temporada) => (
              <SelectItem key={temporada.id} value={temporada.id}>
                {temporada.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Select Corridas */}
        <Select onValueChange={(value) => setIdCorrida(value)}>
          <SelectTrigger className="border-primary">
            <SelectValue placeholder="Selecione a corrida" />
          </SelectTrigger>
          <SelectContent className="border-primary">
            {selectCorrida?.map((corrida) => (
              <SelectItem key={corrida.id} value={corrida.id}>
                {corrida.nome}
                {' - '}
                {corrida.data.toDate().toLocaleDateString('pt-BR')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {idCorrida && (
          <SheetFormResultado
            idCorrida={idCorrida!}
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            atualizarLista={buscarResultados}
            defaultValue={resultadoToEdit}
          >
            <Button onClick={() => setResultadoToEdit(undefined)}>
              Adicionar Resultado
            </Button>
          </SheetFormResultado>
        )}
      </div>
      {idCorrida && (
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary/80">
              <TableHead className="text-primary-foreground rounded-tl-lg">
                Pos
              </TableHead>
              <TableHead className="text-primary-foreground">Kart</TableHead>
              <TableHead className="text-center text-primary-foreground">
                Piloto
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                N M.v
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Melhor Volta
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Dif. Lider
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Dif. Piloto Frente
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Total de Voltas
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Vel. Média
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Pos Quali
              </TableHead>
              <TableHead className="text-center text-primary-foreground">
                Tempo Quali
              </TableHead>
              <TableHead className="text-right text-primary-foreground rounded-tr-lg">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resultados && resultados.length > 0 ? (
              resultados
                .sort((a, b) => a.posicao - b.posicao)
                .map((resultado) => (
                  <TableRow key={resultado.id}>
                    <TableCell className="text-center font-bold">
                      {resultado.posicao}
                    </TableCell>
                    <TableCell className="text-center">
                      {resultado.numeroKart}
                    </TableCell>
                    <TableCell>{pilotos[resultado.idPiloto]}</TableCell>
                    <TableCell className="text-center">
                      {resultado.numeroDaMelhorVolta}
                    </TableCell>
                    <TableCell className="text-center">
                      {resultado.melhorVolta}
                    </TableCell>
                    <TableCell className="text-center">
                      {valorDoPilotoDaFrente(resultado.tempoDoPilotoLider) ||
                        '---'}
                    </TableCell>
                    <TableCell className="text-center">
                      {valorDoPilotoDaFrente(resultado.tempoDoPilotoDaFrente) ||
                        '---'}
                    </TableCell>
                    <TableCell className="text-center">
                      {resultado.totalDeVoltas}
                    </TableCell>
                    <TableCell className="text-center">
                      {resultado.velocidadeMedia}
                    </TableCell>
                    <TableCell className="text-center">
                      {resultado.posicaoQualificacao}
                    </TableCell>
                    <TableCell className="text-center">
                      {resultado.tempoQualificacao}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-end">
                      <SheetFormResultado
                        idCorrida={idCorrida!}
                        open={sheetOpen}
                        onOpenChange={setSheetOpen}
                        defaultValue={resultadoToEdit}
                        atualizarLista={buscarResultados}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setResultadoToEdit(resultado)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </SheetFormResultado>
                      <Button
                        variant="outline"
                        onClick={() => {
                          try {
                            deleteResultadoPiloto(resultado.id)
                            buscarResultados()
                            toast({
                              title: 'Resultado deletado com sucesso',
                            })
                          } catch (error) {
                            console.error(error)
                            toast({
                              variant: 'destructive',
                              title: 'Erro ao deletar resultado',
                              description: 'Ocorreu um erro inesperado',
                            })
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center">
                  Nenhuma temporada encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
