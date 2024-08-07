'use client'
import { Card } from '@/components/ui/card'
import { getPiloto, Piloto } from '@/services/piloto'
import { TemporadaPiloto } from '@/services/temporadaPiloto'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const CardPiloto = ({
  temporadaPiloto,
  posicao,
}: {
  temporadaPiloto: TemporadaPiloto
  posicao: number
}) => {
  const [piloto, setPiloto] = useState<Piloto>()

  useEffect(() => {
    const fetchPiloto = async () => {
      const piloto = await getPiloto(temporadaPiloto?.idPiloto || '')
      setPiloto(piloto)
    }
    fetchPiloto()
  }, [temporadaPiloto?.idPiloto])

  return (
    <Card className="flex flex-col items-center p-4 hover:border-primary">
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold">{posicao}</h2>
          <p className="text-sm">{temporadaPiloto.pontos} PTS</p>
        </div>
        <div>
          <p className="text-lg font-bold">{piloto?.nome}</p>
          <p className="text-sm text-right">
            {temporadaPiloto.vitorias} Vitórias
          </p>
        </div>
      </div>
      <Image
        src={piloto?.urlImage || ''}
        alt={piloto?.nome || ''}
        width={200}
        height={200}
        className="my-4 rounded-2xl"
        // className="my-4 object-cover rounded-full"
      />
    </Card>
  )
}
