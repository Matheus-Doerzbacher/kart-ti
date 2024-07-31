import { pistasMock } from '@/mock/pistasMock'
import { CardPista } from './_components/card_pista'

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Pistas de Kart
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {pistasMock.map((pista) => (
          <CardPista key={pista.id} pista={pista} />
        ))}
      </div>
    </div>
  )
}
