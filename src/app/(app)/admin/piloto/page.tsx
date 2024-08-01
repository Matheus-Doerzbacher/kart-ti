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
import { SheetFormPiloto } from './_components/sheet_form_piloto'
import { toast } from '@/components/ui/use-toast'
import { deletePiloto, getAllPiloto, Piloto } from '@/services/piloto'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pilotos, setPilotos] = useState<Piloto[]>([])
  const [pilotoToEdit, setPilotoToEdit] = useState<Piloto | undefined>(
    undefined,
  )

  const buscarPilotos = async () => {
    const data = await getAllPiloto()
    setPilotos(data)
  }

  useEffect(() => {
    buscarPilotos()
  }, [])

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Pilotos</h1>
        <SheetFormPiloto
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          atualizarLista={buscarPilotos}
          defaultValue={pilotoToEdit}
        >
          <Button onClick={() => setPilotoToEdit(undefined)}>
            Adicionar Piloto
          </Button>
        </SheetFormPiloto>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg">
              Nome
            </TableHead>
            <TableHead className="text-right text-primary-foreground rounded-tr-lg">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pilotos.length > 0 ? (
            pilotos
              .sort((a, b) => b.nome.localeCompare(a.nome))
              .map((piloto) => (
                <TableRow key={piloto.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={piloto.urlImage} />
                        <AvatarFallback>{piloto.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {piloto.nome}
                    </div>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <SheetFormPiloto
                      open={sheetOpen}
                      onOpenChange={setSheetOpen}
                      defaultValue={pilotoToEdit}
                      atualizarLista={buscarPilotos}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setPilotoToEdit(piloto)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </SheetFormPiloto>
                    <Button
                      variant="outline"
                      onClick={() => {
                        try {
                          deletePiloto(piloto.id)
                          buscarPilotos()
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
