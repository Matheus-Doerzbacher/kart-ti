import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TableCell, TableRow } from '@/components/ui/table'
import { TemporadaPiloto } from '@/services/temporadaPiloto'

export const TableRowPiloto = ({
  piloto,
  tipo,
  index,
}: {
  piloto: TemporadaPiloto
  tipo: 'pontos' | 'vitorias'
  index: number
}) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={piloto.piloto.urlImage} />
          <AvatarFallback>{piloto.piloto.nome.charAt(0)}</AvatarFallback>
        </Avatar>
        {piloto.piloto.nome}
      </TableCell>
      <TableCell className="text-center">
        {tipo === 'pontos' ? piloto.pontos : piloto.vitorias}
      </TableCell>
    </TableRow>
  )
}
