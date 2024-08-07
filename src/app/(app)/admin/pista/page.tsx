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
import { SheetFormPista } from './_components/sheet_form_pista'
import { toast } from '@/components/ui/use-toast'
import { deletePista, getAllPista, Pista } from '@/services/pista'

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pistas, setPistas] = useState<Pista[]>([])
  const [pistaEdit, setPistaEdit] = useState<Pista | undefined>(undefined)

  const buscarPistas = async () => {
    const data = await getAllPista()
    setPistas(data)
  }

  useEffect(() => {
    buscarPistas()
  }, [])

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Pistas</h1>
        <SheetFormPista
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          atualizarLista={buscarPistas}
          defaultValue={pistaEdit}
        >
          <Button onClick={() => setPistaEdit(undefined)}>
            Adicionar Pista
          </Button>
        </SheetFormPista>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg">
              Nome
            </TableHead>
            <TableHead className="text-primary-foreground">Local</TableHead>
            <TableHead className="text-right text-primary-foreground rounded-tr-lg">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pistas.length > 0 ? (
            pistas
              .sort((a, b) => b.nome.localeCompare(a.nome))
              .map((pista) => (
                <TableRow key={pista.id}>
                  <TableCell>{pista.nome}</TableCell>
                  <TableCell>{pista.local}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <SheetFormPista
                      open={sheetOpen}
                      onOpenChange={setSheetOpen}
                      defaultValue={pistaEdit}
                      atualizarLista={buscarPistas}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setPistaEdit(pista)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </SheetFormPista>
                    <Button
                      variant="outline"
                      onClick={() => {
                        try {
                          deletePista(pista.id)
                          buscarPistas()
                          toast({
                            title: 'Pista deletada com sucesso',
                          })
                        } catch (error) {
                          console.error(error)
                          toast({
                            variant: 'destructive',
                            title: 'Erro ao deletar a pista',
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
