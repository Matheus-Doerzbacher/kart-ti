import { Card } from '@/components/ui/card'
import { TemporadaPiloto } from '@/services/temporadaPiloto'
import Image from 'next/image'

export const CardPiloto = ({
  piloto,
  posicao,
}: {
  piloto: TemporadaPiloto
  posicao: number
}) => {
  return (
    <Card className="flex flex-col items-center p-4 hover:border-primary">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold">{posicao}</h2>
          <p className="text-sm">{piloto.pontos} PTS</p>
        </div>
        <div>
          <p className="text-lg font-bold">{piloto.piloto.nome}</p>
          <p className="text-sm text-right">{piloto.vitorias} Vitórias</p>
        </div>
      </div>
      <Image
        src={piloto.piloto.urlImage}
        alt={piloto.piloto.nome}
        width={200}
        height={200}
        className="my-4 rounded-2xl"
        // className="my-4 object-cover rounded-full"
      />
    </Card>
  )
}
