'use client'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  getAllTemporada,
  getTemporadaAtual,
  Temporada,
} from '@/services/temporada'
import { getAllPiloto, Piloto } from '@/services/piloto'
import { Corrida, getCorridasPorTemporada } from '@/services/corrida'
import { getPista } from '@/services/pista'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

export function HeaderResultados() {
  const { idCorrida, idPiloto } = useParams()
  const idTemporada = useSearchParams().get('idTemporada')
  const pathname = usePathname()
  const router = useRouter()

  const [temporadasSelect, setTemporadasSelect] = useState<Temporada[]>([])
  const [pilotosSelect, setPilotosSelect] = useState<Piloto[]>([])
  const [corridasSelect, setCorridasSelect] = useState<Corrida[]>([])

  const [temporadaSelecionada, setTemporadaSelecionada] = useState<string>('')

  const [selectedOption, setSelectedOption] = useState('corridas')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const buscarTemporadas = async () => {
      const temporadas = await getAllTemporada()
      setTemporadasSelect(temporadas)

      const idTemporadaData = idTemporada ?? (await getTemporadaAtual()).id
      setTemporadaSelecionada(idTemporadaData as string)
    }
    buscarTemporadas()

    if (pathname === '/resultados/corridas') {
      setSelectedOption('corridas')
    } else if (pathname === '/resultados/pilotos') {
      setSelectedOption('pilotos')
    }
    setIsLoading(false)
  }, [idTemporada, pathname])

  useEffect(() => {
    const buscarPilotos = async () => {
      const pilotos = await getAllPiloto()
      setPilotosSelect(pilotos)
    }
    buscarPilotos()
  }, [])

  useEffect(() => {
    const atualizarCorridas = async () => {
      if (temporadaSelecionada) {
        const data: Corrida[] =
          await getCorridasPorTemporada(temporadaSelecionada)

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
  }, [temporadaSelecionada])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20 border-b shadow-sm">
        Carregando...
      </div>
    )
  }

  return (
    <header className="w-full pt-8 px-6">
      <div className="flex md:flex-row flex-col items-center m-4 gap-4">
        {/* SELECT TEMPORADA */}
        <Select
          value={temporadaSelecionada}
          onValueChange={(value) => {
            setTemporadaSelecionada(value)
            router.push(`/resultados/corridas?idTemporada=${value}`)
          }}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a temporada" />
          </SelectTrigger>
          <SelectContent>
            {temporadasSelect.map((temporada) => (
              <SelectItem key={temporada.id} value={temporada.id}>
                {temporada.nome}
                {'  '}
                {temporada.atual && '(atual)'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* SELECT OPÇÃO */}
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value)
            if (value === 'pilotos') {
              router.push(
                `/resultados/pilotos?idTemporada=${temporadaSelecionada}`,
              )
            } else {
              router.push(
                `/resultados/corridas?idTemporada=${temporadaSelecionada}`,
              )
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
        {/* SELECT CORRIDA OU PILOTO */}
        <Select
          value={
            selectedOption === 'corridas'
              ? (idCorrida as string) || 'todas'
              : (idPiloto as string) || 'todos'
          }
          onValueChange={(value) => {
            if (selectedOption === 'corridas') {
              if (value === 'todas') {
                router.push(`/resultados/corridas`)
              } else {
                router.push(
                  `/resultados/corridas/${value}?idTemporada=${temporadaSelecionada}`,
                )
              }
            } else {
              if (value === 'todos') {
                router.push(`/resultados/pilotos`)
              } else {
                router.push(
                  `/resultados/pilotos/${value}?idTemporada=${temporadaSelecionada}`,
                )
              }
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
                    {corrida.nome} -{' '}
                    {corrida.data.toDate().toLocaleDateString('pt-BR')}
                  </SelectItem>
                ))}
              </>
            ) : (
              <>
                <SelectItem value="todos">Todos</SelectItem>
                {pilotosSelect
                  .sort((a, b) => a.nome.localeCompare(b.nome))
                  .map((piloto) => (
                    <SelectItem key={piloto.id} value={piloto.id}>
                      {piloto.nome}
                    </SelectItem>
                  ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
