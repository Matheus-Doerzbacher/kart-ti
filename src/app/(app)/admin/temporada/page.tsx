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
import { SheetFormTemporada } from './_components/sheet_form_temporda'
import {
  deleteTemporada,
  getAllTemporada,
  Temporada,
} from '@/services/temporada'
import { toast } from '@/components/ui/use-toast'

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [temporadas, setTemporadas] = useState<Temporada[]>([])
  const [temporadaToEdit, setTemporadaToEdit] = useState<Temporada | undefined>(
    undefined,
  )

  const buscarTemporadas = async () => {
    const data = await getAllTemporada()
    setTemporadas(data)
  }

  useEffect(() => {
    buscarTemporadas()
  }, [])

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Temporadas</h1>
        <SheetFormTemporada
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          atualizarLista={buscarTemporadas}
          defaultValue={temporadaToEdit}
        >
          <Button onClick={() => setTemporadaToEdit(undefined)}>
            Adicionar Temporada
          </Button>
        </SheetFormTemporada>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg">
              Nome
            </TableHead>
            <TableHead className="text-primary-foreground">Ano</TableHead>
            <TableHead className="text-center text-primary-foreground">
              Atual
            </TableHead>
            <TableHead className="text-right text-primary-foreground rounded-tr-lg">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {temporadas.length > 0 ? (
            temporadas
              .sort((a, b) => b.ano - a.ano)
              .map((temporada) => (
                <TableRow key={temporada.id}>
                  <TableCell>{temporada.nome}</TableCell>
                  <TableCell>{temporada.ano}</TableCell>
                  <TableCell className="text-center">
                    <div
                      className={`rounded-full text-white text-xs px-2 py-1 ${
                        temporada.atual ? 'bg-green-500' : 'bg-destructive'
                      }`}
                    >
                      {temporada.atual ? 'Sim' : 'Não'}
                    </div>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <SheetFormTemporada
                      open={sheetOpen}
                      onOpenChange={setSheetOpen}
                      defaultValue={temporadaToEdit}
                      atualizarLista={buscarTemporadas}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setTemporadaToEdit(temporada)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </SheetFormTemporada>
                    <Button
                      variant="outline"
                      onClick={() => {
                        try {
                          deleteTemporada(temporada.id)
                          buscarTemporadas()
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
              <TableCell colSpan={4} className="text-center">
                Nenhuma temporada encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
