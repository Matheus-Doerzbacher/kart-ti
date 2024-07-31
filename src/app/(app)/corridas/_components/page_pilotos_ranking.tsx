import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { temporadaPilotoMock } from '@/mock/temporadaPilotoMock'
import { TemporadaPiloto } from '@/services/temporadaPiloto'

export default function PagePilotosRanking() {
  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">{`Pilotos`}</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-center text-primary-foreground rounded-tl-lg">
              Pos
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Nome
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Pontos
            </TableHead>
            <TableHead className="text-center text-primary-foreground rounded-tr-lg">
              Vitorias
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {temporadaPilotoMock.map((piloto: TemporadaPiloto, index) => (
            <TableRow key={index} className="hover:bg-secondary">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">
                {piloto.piloto.nome}
              </TableCell>
              <TableCell className="text-center">{piloto.pontos}</TableCell>
              <TableCell className="text-center">{piloto.vitorias}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
