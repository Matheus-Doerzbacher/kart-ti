'use client'
import { useState, useEffect } from 'react'
import PageCorridas from './_components/page_corridas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PageCorridaDetail from './_components/page_corrida_detail'
import PagePilotosRanking from './_components/page_pilotos_ranking'
import PagePilotoDetail from './_components/page_piloto_detail'
import { getAllTemporada, Temporada } from '@/services/temporada'
import { getAllPiloto, Piloto } from '@/services/piloto'
import { Corrida, getCorridasPorTemporada } from '@/services/corrida'
import { getPista } from '@/services/pista'

export default function Page() {
  // const { userSession, setUserSession } = useUserSession()
  const [temporadasSelect, setTemporadasSelect] = useState<Temporada[]>([])
  const [pilotosSelect, setPilotosSelect] = useState<Piloto[]>([])
  const [corridasSelect, setCorridasSelect] = useState<Corrida[]>([])

  const [idTemporada, setIdTemporada] = useState<string>('')
  const [idPiloto, setIdPiloto] = useState<string>('todos')
  const [idCorrida, setIdCorrida] = useState<string>('todas')

  const [selectedOption, setSelectedOption] = useState('corridas')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const buscarTemporadas = async () => {
      const temporadas = await getAllTemporada()
      setTemporadasSelect(temporadas)
    }
    buscarTemporadas()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const buscarPilotos = async () => {
      const pilotos = await getAllPiloto()
      setPilotosSelect(pilotos)
    }
    buscarPilotos()
  }, [])

  useEffect(() => {
    const atualizarCorridas = async () => {
      if (idTemporada) {
        const data: Corrida[] = await getCorridasPorTemporada(idTemporada)

        const dataCorrida = await Promise.all(
          data.map(async (corrida: Corrida) => ({
            ...corrida,
            nome: (await getPista(corrida.idPista)).nome, // Corrigido para acessar a propriedade 'nome'
          })),
        )

        setCorridasSelect(dataCorrida)
      }
    }
    atualizarCorridas()
  }, [idTemporada])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20 border-b shadow-sm">
        Carregando...
      </div>
    )
  }

  return (
    <main className="flex-1 py-8 px-6">
      <div className="flex items-center m-4 gap-4">
        <Select
          value={idTemporada}
          onValueChange={(value) => setIdTemporada(value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a temporada" />
          </SelectTrigger>
          <SelectContent>
            {temporadasSelect.map((temporada) => (
              <SelectItem key={temporada.id} value={temporada.id}>
                {temporada.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value)
            if (value === 'pilotos') {
              setIdPiloto('todos')
            } else {
              setIdCorrida('todas')
            }
          }}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            {['corridas', 'pilotos'].map((option) => (
              <SelectItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedOption === 'corridas' ? idCorrida : idPiloto}
          onValueChange={(value) => {
            if (selectedOption === 'corridas') {
              setIdCorrida(value)
            } else {
              setIdPiloto(value)
            }
          }}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                selectedOption === 'corridas'
                  ? 'Selecione a corrida'
                  : 'Selecione o piloto'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectedOption === 'corridas' ? (
              <>
                <SelectItem value="todas">Todas</SelectItem>
                {corridasSelect.map((corrida) => (
                  <SelectItem key={corrida.id} value={corrida.id}>
                    {corrida.nome}
                  </SelectItem>
                ))}
              </>
            ) : (
              <>
                <SelectItem value="todos">Todos</SelectItem>
                {pilotosSelect.map((piloto) => (
                  <SelectItem key={piloto.id} value={piloto.id}>
                    {piloto.nome}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
      {idTemporada && selectedOption === 'corridas' && idCorrida === 'todas' ? (
        <PageCorridas idTemporada={idTemporada} />
      ) : idTemporada && selectedOption === 'corridas' ? (
        <PageCorridaDetail idCorrida={idCorrida} />
      ) : null}
      {idTemporada && selectedOption === 'pilotos' && idPiloto === 'todos' ? (
        <PagePilotosRanking idTemporada={idTemporada} />
      ) : idTemporada && selectedOption === 'pilotos' ? (
        <PagePilotoDetail />
      ) : null}
    </main>
  )
}
