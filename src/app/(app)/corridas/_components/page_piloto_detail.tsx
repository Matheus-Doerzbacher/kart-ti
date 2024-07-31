import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { resultadoPilotosMock } from '@/mock/resultadoPilotoMock'
import { temporadaPilotoMock } from '@/mock/temporadaPilotoMock'

export default function PagePilotoDetail() {
  const result = resultadoPilotosMock[0]
  return (
    <main className="flex-1 py-8 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{result.piloto.nome}</h1>
        <p className="text-md font-semibold mr-2">
          Pontos:{' '}
          {
            temporadaPilotoMock.find((t) => t.piloto.id === result.piloto.id)
              ?.pontos
          }
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
              Melhor Volta
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Posição
            </TableHead>
            <TableHead className="text-center text-primary-foreground rounded-tr-lg">
              Pontos na Corrida
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[0, 1, 2, 3].map((index) => (
            <TableRow key={index} className="hover:bg-secondary">
              <TableCell className="text-center">
                {result.corrida.pista.nome}
              </TableCell>
              <TableCell className="text-center">
                {result.corrida.data.toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell className="text-center">
                {result.melhorVolta}
              </TableCell>
              <TableCell className="text-center">{result.posicao}</TableCell>
              <TableCell className="text-center">{result.pontos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
