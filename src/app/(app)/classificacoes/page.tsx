import { temporadaPilotoMock } from '@/mock/temporadaPilotoMock'
import { CardPiloto } from './_components/card_pilotos'

export default function Page() {
  return (
    <main className="flex-1 py-8 px-6">
      <h1 className="text-4xl font-bold mb-4">Temporada 2024</h1>
      <p className="mb-6">
        Confira a classificação atual da nossa emocionante competição de kart da
        TI. Detalhes completos dos pilotos, pontos e posições atualizadas.
        Acompanhe seus colegas favoritos nas pistas e nos bastidores da empresa.
      </p>
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {temporadaPilotoMock.slice(0, 3).map((piloto, index) => (
            <div
              key={piloto.id}
              className={index === 0 ? 'lg:col-span-2 xl:col-span-1' : ''}
            >
              <CardPiloto piloto={piloto} posicao={index + 1} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {temporadaPilotoMock.slice(3).map((piloto, index) => (
            <CardPiloto key={piloto.id} piloto={piloto} posicao={index + 4} />
          ))}
        </div>
      </div>
    </main>
  )
}
