import { Pista } from '@/services/pista'
import Image from 'next/image'
import { useState } from 'react'

export const CardPista = ({ pista }: { pista: Pista }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="relative w-full h-48">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        <Image
          src={pista.urlImage}
          alt={pista.nome}
          width={600}
          height={400}
          className={`w-full h-48 object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{pista.nome}</h3>
        <p className="text-muted-foreground mt-2">{pista.local}</p>
      </div>
    </div>
  )
}
