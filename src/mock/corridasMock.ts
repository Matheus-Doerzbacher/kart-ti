import { Corrida } from '@/services/corrida'
import { pilotosMock } from './pilotoMock'

export const corridasMock: Corrida[] = [
  {
    id: '1',
    pista: {
      id: 'p1',
      nome: 'Interlagos',
      local: 'São Paulo',
      urlImage: 'https://example.com/interlagos.jpg',
    },
    temporada: { id: 't2024', nome: '2024', ano: 2024, atual: true },
    data: new Date('2024-03-15T14:00:00'),
    voltas: 71,
    tempo: '1:30:05.123',
    ganhador: pilotosMock[1], // Max Verstappen
  },
  {
    id: '2',
    pista: {
      id: 'p2',
      nome: 'Monaco',
      local: 'Monte Carlo',
      urlImage: 'https://example.com/monaco.jpg',
    },
    temporada: { id: 't2024', nome: '2024', ano: 2024, atual: true },
    data: new Date('2024-05-28T14:00:00'),
    voltas: 78,
    tempo: '1:45:30.456',
    ganhador: pilotosMock[0], // Lewis Hamilton
  },
  {
    id: '3',
    pista: {
      id: 'p3',
      nome: 'Silverstone',
      local: 'Silverstone',
      urlImage: 'https://example.com/silverstone.jpg',
    },
    temporada: { id: 't2024', nome: '2024', ano: 2024, atual: true },
    data: new Date('2024-07-09T14:00:00'),
    voltas: 52,
    tempo: '1:25:15.789',
    ganhador: pilotosMock[2], // Charles Leclerc
  },
  {
    id: '4',
    pista: {
      id: 'p4',
      nome: 'Spa-Francorchamps',
      local: 'Stavelot',
      urlImage: 'https://example.com/spa.jpg',
    },
    temporada: { id: 't2024', nome: '2024', ano: 2024, atual: true },
    data: new Date('2024-08-27T14:00:00'),
    voltas: 44,
    tempo: '1:35:45.012',
    ganhador: pilotosMock[4], // Fernando Alonso
  },
  {
    id: '5',
    pista: {
      id: 'p5',
      nome: 'Suzuka',
      local: 'Suzuka',
      urlImage: 'https://example.com/suzuka.jpg',
    },
    temporada: { id: 't2024', nome: '2024', ano: 2024, atual: true },
    data: new Date('2024-09-24T14:00:00'),
    voltas: 53,
    tempo: '1:28:20.345',
    ganhador: pilotosMock[3], // Lando Norris
  },
]
