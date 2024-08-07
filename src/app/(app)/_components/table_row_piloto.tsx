'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TableCell, TableRow } from '@/components/ui/table'
import { getPiloto, Piloto } from '@/services/piloto'
import { TemporadaPiloto } from '@/services/temporadaPiloto'
import { useEffect, useState } from 'react'

export const TableRowPiloto = ({
  temporadaPiloto,
  tipo,
  index,
}: {
  temporadaPiloto: TemporadaPiloto
  tipo: 'pontos' | 'vitorias'
  index: number
}) => {
  const [piloto, setPiloto] = useState<Piloto>()

  useEffect(() => {
    const fetchPiloto = async () => {
      const pilotoData = await getPiloto(temporadaPiloto.idPiloto)
      setPiloto(pilotoData)
    }
    fetchPiloto()
  }, [temporadaPiloto.idPiloto])

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={piloto?.urlImage} />
          <AvatarFallback>{piloto?.nome.charAt(0)}</AvatarFallback>
        </Avatar>
        {piloto?.nome}
      </TableCell>
      <TableCell className="text-center">
        {tipo === 'pontos' ? temporadaPiloto.pontos : temporadaPiloto.vitorias}
      </TableCell>
    </TableRow>
  )
}
