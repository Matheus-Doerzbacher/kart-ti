'use client'
import { temporadaPilotoMock } from '@/mock/temporadaPilotoMock'
import { CardPiloto } from './_components/card_pilotos'
import { useEffect, useState } from 'react'
import {
  getAllTempordaPilotoByTemporada,
  TemporadaPiloto,
} from '@/services/temporadaPiloto'
import { getTemporadaAtual } from '@/services/temporada'

export default function Page() {
  const [temporadaPilotos, setTemporadaPilotos] = useState<TemporadaPiloto[]>(
    [],
  )

  useEffect(() => {
    const fetchTemporadaPilotos = async () => {
      const temporadaAtual = await getTemporadaAtual()
      const temporadaPilotos = await getAllTempordaPilotoByTemporada(
        temporadaAtual.id,
      )
      setTemporadaPilotos(temporadaPilotos)
    }
    fetchTemporadaPilotos()
  }, [])

  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-4xl font-bold mb-4">Temporada 2024</h1>
      <p className="mb-6">
        Confira a classificação atual da nossa emocionante competição de kart da
        TI. Detalhes completos dos pilotos, pontos e posições atualizadas.
        Acompanhe seus colegas favoritos nas pistas e nos bastidores da empresa.
      </p>
      <div className="space-y-5 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {temporadaPilotos
            .sort((a, b) => b.pontos - a.pontos)
            .slice(0, 3)
            .map((temporadaPiloto, index) => (
              <div
                key={temporadaPiloto.id}
                className={index === 0 ? 'lg:col-span-2 xl:col-span-1' : ''}
              >
                <CardPiloto
                  temporadaPiloto={temporadaPiloto}
                  posicao={index + 1}
                />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {temporadaPilotos
            .sort((a, b) => b.pontos - a.pontos)
            .slice(3)
            .map((temporadaPiloto, index) => (
              <CardPiloto
                key={temporadaPiloto.id}
                temporadaPiloto={temporadaPiloto}
                posicao={index + 4}
              />
            ))}
        </div>
      </div>
    </main>
  )
}
