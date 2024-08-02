'use client'

import { useEffect, useState } from 'react'
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
import { SheetFormCorrida } from './_components/sheet_form_corrida'
import { toast } from '@/components/ui/use-toast'
import { Corrida, deleteCorrida, getAllCorrida } from '@/services/corrida'
import { getPista } from '@/services/pista'
import { getTemporada } from '@/services/temporada'
import { getPiloto } from '@/services/piloto'

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [corridas, setCorridas] = useState<Corrida[]>([])
  const [corridaEdit, setCorridaEdit] = useState<Corrida | undefined>(undefined)
  const [pistas, setPistas] = useState<{ [key: string]: string }>({})
  const [temporadas, setTemporadas] = useState<{ [key: string]: string }>({})
  const [pilotos, setPilotos] = useState<{ [key: string]: string }>({})

  const buscarCorridas = async () => {
    const data = await getAllCorrida()
    setCorridas(data)
  }

  useEffect(() => {
    buscarCorridas()
  }, [])

  useEffect(() => {
    const fetchPistas = async () => {
      const pistasData: { [key: string]: string } = {}
      for (const corrida of corridas) {
        const pista = await getPista(corrida.idPista)
        pistasData[corrida.idPista] = pista.nome
      }
      setPistas(pistasData)
    }

    if (corridas.length > 0) {
      fetchPistas()
    }
  }, [corridas])

  useEffect(() => {
    const fetchTemporadas = async () => {
      const temporadasData: { [key: string]: string } = {}
      for (const corrida of corridas) {
        const temporada = await getTemporada(corrida.idTemporada)
        temporadasData[corrida.idTemporada] = temporada.nome
      }
      setTemporadas(temporadasData)
    }

    if (corridas.length > 0) {
      fetchTemporadas()
    }
  }, [corridas])

  useEffect(() => {
    const fetchPilotos = async () => {
      const pilotosData: { [key: string]: string } = {}
      for (const corrida of corridas) {
        if (corrida.idPiloto) {
          const piloto = await getPiloto(corrida.idPiloto)
          pilotosData[corrida.idPiloto] = piloto.nome
        }
      }
      setPilotos(pilotosData)
    }

    if (corridas.length > 0) {
      fetchPilotos()
    }
  }, [corridas])

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Pistas</h1>
        <SheetFormCorrida
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          atualizarLista={buscarCorridas}
          defaultValue={corridaEdit}
        >
          <Button onClick={() => setCorridaEdit(undefined)}>
            Adicionar Pista
          </Button>
        </SheetFormCorrida>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg">
              Local
            </TableHead>
            <TableHead className="text-primary-foreground">Temporada</TableHead>
            <TableHead className="text-primary-foreground">Data</TableHead>
            <TableHead className="text-primary-foreground">Voltas</TableHead>
            <TableHead className="text-primary-foreground">Tempo</TableHead>
            <TableHead className="text-primary-foreground">Ganhador</TableHead>
            <TableHead className="text-right text-primary-foreground rounded-tr-lg">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {corridas.length > 0 ? (
            corridas
              .sort((a, b) => b.data.getTime() - a.data.getTime())
              .map((corrida) => (
                <TableRow key={corrida.id}>
                  <TableCell>{pistas[corrida.idPista]}</TableCell>
                  <TableCell>{temporadas[corrida.idTemporada]}</TableCell>
                  <TableCell>{corrida.data.toLocaleDateString()}</TableCell>
                  <TableCell>{corrida.voltas}</TableCell>
                  <TableCell>{corrida.tempo}</TableCell>
                  <TableCell>{pilotos[corrida.idPiloto || '']}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <SheetFormCorrida
                      open={sheetOpen}
                      onOpenChange={setSheetOpen}
                      defaultValue={corridaEdit}
                      atualizarLista={buscarCorridas}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setCorridaEdit(corrida)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </SheetFormCorrida>
                    <Button
                      variant="outline"
                      onClick={() => {
                        try {
                          deleteCorrida(corrida.id)
                          buscarCorridas()
                          toast({
                            title: 'Temporada deletada com sucesso',
                          })
                        } catch (error) {
                          console.error(error)
                          toast({
                            variant: 'destructive',
                            title: 'Erro ao deletar temporada',
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
              <TableCell colSpan={7} className="text-center">
                Nenhuma temporada encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
