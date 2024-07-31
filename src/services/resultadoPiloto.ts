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
import { Corrida } from './corrida'

export type ResultadoPiloto = {
  id: string
  piloto: Piloto
  corrida: Corrida
  posicao: number
  melhorVolta: string
  numeroDaMelhorVolta: number
  tempoDoPilotoDaFrente: string | number
  tempoDoPilotoLider: string | number
  totalDeVoltas: number
  velocidadeMedia: number
  numeroKart: number
  pontos: number
  posicaoQualificacao: number
  tempoQualificacao: string
}

const nameCollection = 'resultadoPiloto'

export const getAllResultadoPilotos = async (): Promise<ResultadoPiloto[]> => {
  const resultadoCollection = collection(db, nameCollection)
  const resultadoSnapshot = await getDocs(resultadoCollection)
  const resultados = resultadoSnapshot.docs.map(
    (doc) => doc.data() as ResultadoPiloto,
  )
  return resultados
}

export const getResultadoPiloto = async (
  id: string,
): Promise<ResultadoPiloto> => {
  const resultadoDoc = doc(db, nameCollection, id)
  const resultadoSnapshot = await getDoc(resultadoDoc)
  return resultadoSnapshot.data() as ResultadoPiloto
}

export const addResultadoPiloto = async (
  resultado: ResultadoPiloto,
): Promise<void> => {
  const resultadoCollection = collection(db, nameCollection)
  await addDoc(resultadoCollection, resultado)
}

export const updateResultadoPiloto = async (
  id: string,
  resultado: Partial<ResultadoPiloto>,
): Promise<void> => {
  const resultadoDoc = doc(db, nameCollection, id)
  await updateDoc(resultadoDoc, resultado)
}

export const deleteResultadoPiloto = async (id: string): Promise<void> => {
  const resultadoDoc = doc(db, nameCollection, id)
  await deleteDoc(resultadoDoc)
}
