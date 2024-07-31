import { Pista } from '@/services/pista'
import Image from 'next/image'

export const CardPista = ({ pista }: { pista: Pista }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <Image
        src={pista.urlImage}
        alt={pista.nome}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{pista.nome}</h3>
        <p className="text-muted-foreground mt-2">{pista.local}</p>
      </div>
    </div>
  )
}
