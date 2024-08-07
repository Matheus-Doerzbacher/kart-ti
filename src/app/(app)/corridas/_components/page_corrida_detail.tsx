import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { corridasMock } from '@/mock/corridasMock'
import { resultadoPilotosMock } from '@/mock/resultadoPilotoMock'

export default function PageCorridaDetail() {
  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-2xl font-bold">
        {`${corridasMock[0].pista.nome} ${corridasMock[0].data.toLocaleDateString()}`}
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary/80">
            <TableHead className="text-center text-primary-foreground rounded-tl-lg">
              Pos
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Kart
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Piloto
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Nº M.V
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Melhor Volta
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Dif. Líder
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Dif. Piloto Frente
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              N. de Voltas
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Vel. Média
            </TableHead>
            <TableHead className="text-center text-primary-foreground">
              Pos Quali
            </TableHead>
            <TableHead className="text-center text-primary-foreground rounded-tr-lg">
              Tempo Quali
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resultadoPilotosMock.map((result, index) => (
            <TableRow key={index} className="hover:bg-secondary">
              <TableCell className="text-center">{result.posicao}</TableCell>
              <TableCell className="text-center">{result.numeroKart}</TableCell>
              <TableCell>{result.piloto.nome}</TableCell>
              <TableCell className="text-center">
                {result.numeroDaMelhorVolta}
              </TableCell>
              <TableCell className="text-center">
                {result.melhorVolta}
              </TableCell>
              <TableCell className="text-center">
                {typeof result.tempoDoPilotoLider === 'number'
                  ? `-${result.tempoDoPilotoLider} voltas`
                  : result.tempoDoPilotoLider}
              </TableCell>
              <TableCell className="text-center">
                {typeof result.tempoDoPilotoDaFrente === 'number'
                  ? `-${result.tempoDoPilotoDaFrente} voltas`
                  : result.tempoDoPilotoDaFrente}
              </TableCell>
              <TableCell className="text-center">
                {result.velocidadeMedia}
              </TableCell>
              <TableCell className="text-center">
                {result.posicaoQualificacao}
              </TableCell>
              <TableCell className="text-center">
                {result.tempoQualificacao}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Legenda:</p>
        <ul className="list-disc pl-4">
          <li>Pos: Posição</li>
          <li>Kart: Número do Kart</li>
          <li>Nº M.V: Número da Melhor Volta</li>
          <li>Melhor Volta: Melhor Volta do Piloto</li>
          <li>Dif. Líder: Diferença para o Líder</li>
          <li>Dif. Piloto Frente: Diferença para o Piloto da Frente</li>
          <li>Vel. Média: Velocidade Média</li>
          <li>Pos Quali: Posição na Qualificação</li>
          <li>Tempo Quali: Tempo na Qualificação</li>
        </ul>
      </div>
    </main>
  )
}
