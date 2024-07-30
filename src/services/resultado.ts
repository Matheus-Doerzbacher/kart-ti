import { db } from '@/config/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

import { Piloto } from './piloto'

export type ResultadoPiloto = {
  piloto: Piloto
  posicao: number
  melhorVolta: Date
  numeroDaMelhorVolta: number
  tempoDoPilotoDaFrente: Date | number
  tempoDoPilotoLider: Date | number
  totalDeVoltas: number
  velocidadeMedia: number
  numeroKart: number
}

export type Resultado = {
  resultadoDosPilotos: ResultadoPiloto[]
}

// Buscar todos os resultados
export const getResultados = async (): Promise<Resultado[]> => {
  const resultadoCollection = collection(db, 'resultados')
  const resultadoSnapshot = await getDocs(resultadoCollection)
  const resultados = resultadoSnapshot.docs.map(
    (doc) => doc.data() as Resultado,
  )
  return resultados
}

// Buscar um resultado
export const getResultado = async (id: string): Promise<Resultado> => {
  const resultadoDoc = doc(db, 'resultados', id)
  const resultadoSnapshot = await getDoc(resultadoDoc)
  return resultadoSnapshot.data() as Resultado
}

// Adicionar novo resultado
export const addResultado = async (resultado: Resultado): Promise<void> => {
  const resultadoCollection = collection(db, 'resultados')
  await addDoc(resultadoCollection, resultado)
}

// Atualizar resultado
export const updateResultado = async (
  id: string,
  resultado: Partial<Resultado>,
): Promise<void> => {
  const resultadoDoc = doc(db, 'resultados', id)
  await updateDoc(resultadoDoc, resultado)
}

// Deletar resultado
export const deleteResultado = async (id: string): Promise<void> => {
  const resultadoDoc = doc(db, 'resultados', id)
  await deleteDoc(resultadoDoc)
}
