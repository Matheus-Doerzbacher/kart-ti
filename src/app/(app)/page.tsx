'use client'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { TableRowPiloto } from './_components/table_row_piloto'
import { useEffect, useState } from 'react'
import {
  getTemporada,
  getTemporadaAtual,
  Temporada,
} from '@/services/temporada'
import {
  getAllTempordaPilotoByTemporada,
  TemporadaPiloto,
} from '@/services/temporadaPiloto'
import { Corrida, getCorridasPorTemporada } from '@/services/corrida'
import { TableRowCorrida } from './_components/table_row_corrida'
import { getPista, Pista } from '@/services/pista'

interface CorridaCustom extends Corrida {
  pista: Pista
  temporada: Temporada
}

export default function Page() {
  const [temporadaPilotos, setTemporadaPilotos] = useState<TemporadaPiloto[]>(
    [],
  )
  const [corridas, setCorridas] = useState<CorridaCustom[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const temporadaAtual = await getTemporadaAtual()
      const temporadaPilotos = await getAllTempordaPilotoByTemporada(
        temporadaAtual.id,
      )
      setTemporadaPilotos(temporadaPilotos)

      const corridasData = await getCorridasPorTemporada(temporadaAtual.id)

      const corridasCustom = await Promise.all(
        corridasData.map(async (corrida) => {
          const pista = await getPista(corrida.idPista)
          const temporada = await getTemporada(corrida.idTemporada)
          return {
            ...corrida,
            pista,
            temporada,
          }
        }),
      )
      setCorridas(corridasCustom)
    }
    fetchData()
  }, [])

  return (
    <main className="flex-1 py-8 px-6">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Corridas Recentes
          </h2>
          <Link
            href="/resultados/corridas"
            className="text-primary hover:text-primary-hover"
            prefetch={false}
          >
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corridas.map((corrida) => (
            <Card key={corrida.id}>
              <CardHeader>
                <CardTitle>Corrida na Pista {corrida.pista.nome}</CardTitle>
                <CardDescription>
                  {corrida.data.toDate().toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead className="text-center">
                        Melhor Volta
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRowCorrida corrida={corrida} />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Classificação de Pilotos
          </h2>
          <Link
            href="/classificacoes"
            className="text-primary hover:text-primary-hover"
            prefetch={false}
          >
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Classificação Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Piloto</TableHead>
                    <TableHead className="text-center">Pontos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {temporadaPilotos
                    .sort((a, b) => b.pontos - a.pontos)
                    .slice(0, 3)
                    .map((piloto, index) => (
                      <TableRowPiloto
                        key={piloto.id}
                        temporadaPiloto={piloto}
                        tipo="pontos"
                        index={index}
                      />
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vitórias</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Piloto</TableHead>
                    <TableHead className="text-center">Vitórias</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {temporadaPilotos
                    .sort((a, b) => b.vitorias - a.vitorias)
                    .slice(0, 3)
                    .map((piloto, index) => (
                      <TableRowPiloto
                        key={piloto.id}
                        temporadaPiloto={piloto}
                        tipo="vitorias"
                        index={index}
                      />
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
