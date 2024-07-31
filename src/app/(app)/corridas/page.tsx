'use client'
import { useState, useEffect } from 'react'
import PageCorridas from './(corridas)/page_corridas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { temporadaPilotoMock } from '@/mock/temporadaPilotoMock'
import PageCorridaDetail from './(corridas)/page_corrida_detail'

export default function Page() {
  // const { userSession, setUserSession } = useUserSession()
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedOption, setSelectedOption] = useState('corridas')
  const [selectedItem, setSelectedItem] = useState('todas')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

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
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            {['2024', '2023', '2022'].map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value)
            if (value === 'corridas') {
              setSelectedItem('todas')
            } else {
              setSelectedItem('')
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
          value={selectedItem}
          onValueChange={(value) => setSelectedItem(value)}
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
                {['GP Foz 10/05', 'GP Foz 10/08', 'GP Medianeira 10/05'].map(
                  (corrida) => (
                    <SelectItem key={corrida} value={corrida}>
                      {corrida}
                    </SelectItem>
                  ),
                )}
              </>
            ) : (
              temporadaPilotoMock.map((piloto) => (
                <SelectItem key={piloto.id} value={piloto.id}>
                  {piloto.piloto.nome}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      {selectedOption === 'corridas' && selectedItem === 'todas' ? (
        <PageCorridas />
      ) : selectedOption === 'corridas' ? (
        <PageCorridaDetail />
      ) : null}
    </main>
  )
}
