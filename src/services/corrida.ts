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

import { Pista } from './pista'
import { Resultado } from './resultado'

export type Corrida = {
  pista: Pista
  data: Date
  resultadoCorrida: Resultado
  resultadoQuali: Resultado
}

// Buscar todas as corridas
export const getCorridas = async (): Promise<Corrida[]> => {
  const corridaCollection = collection(db, 'corridas')
  const corridaSnapshot = await getDocs(corridaCollection)
  const corridas = corridaSnapshot.docs.map((doc) => doc.data() as Corrida)
  return corridas
}

// Buscar uma corrida
export const getCorrida = async (id: string): Promise<Corrida> => {
  const corridaDoc = doc(db, 'corridas', id)
  const corridaSnapshot = await getDoc(corridaDoc)
  return corridaSnapshot.data() as Corrida
}

// Adicionar nova corrida
export const addCorrida = async (
  corrida: Omit<Corrida, 'id'>,
): Promise<void> => {
  const corridaCollection = collection(db, 'corridas')
  await addDoc(corridaCollection, corrida)
}

// Atualizar corrida
export const updateCorrida = async (
  id: string,
  corrida: Partial<Corrida>,
): Promise<void> => {
  const corridaDoc = doc(db, 'corridas', id)
  await updateDoc(corridaDoc, corrida)
}

// Deletar corrida
export const deleteCorrida = async (id: string): Promise<void> => {
  const corridaDoc = doc(db, 'corridas', id)
  await deleteDoc(corridaDoc)
}
