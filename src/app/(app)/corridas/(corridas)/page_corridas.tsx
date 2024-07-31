import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { corridasMock } from '@/mock/corridasMock'

export default function PageCorridas() {
  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">Corridas</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-primary-foreground rounded-tl-lg">
              Pista
            </TableHead>
            <TableHead className="text-primary-foreground">Data</TableHead>
            <TableHead className="text-primary-foreground">Ganhador</TableHead>
            <TableHead className="text-primary-foreground">Voltas</TableHead>
            <TableHead className="text-primary-foreground rounded-tr-lg">
              Tempo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {corridasMock.map((corrida, index) => (
            <TableRow key={index} className="hover:bg-secondary">
              <TableCell>{corrida.pista.nome}</TableCell>
              <TableCell>{corrida.data.toLocaleDateString()}</TableCell>
              <TableCell>{corrida.ganhador?.nome || ''}</TableCell>
              <TableCell>{corrida.voltas}</TableCell>
              <TableCell>{corrida.tempo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
