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

export type Pista = {
  id: string
  nome: string
  local: string
  urlImage: string
}

// Buscar todas as pistas
export const getPistas = async (): Promise<Pista[]> => {
  const pistaCollection = collection(db, 'pistas')
  const pistaSnapshot = await getDocs(pistaCollection)
  const pistas = pistaSnapshot.docs.map((doc) => doc.data() as Pista)
  return pistas
}

// Buscar uma pista
export const getPista = async (id: string): Promise<Pista> => {
  const pistaDoc = doc(db, 'pistas', id)
  const pistaSnapshot = await getDoc(pistaDoc)
  return pistaSnapshot.data() as Pista
}

// Adicionar nova pista
export const addPista = async (pista: Omit<Pista, 'id'>): Promise<void> => {
  const pistaCollection = collection(db, 'pistas')
  await addDoc(pistaCollection, pista)
}

// Atualizar pista
export const updatePista = async (
  id: string,
  pista: Partial<Pista>,
): Promise<void> => {
  const pistaDoc = doc(db, 'pistas', id)
  await updateDoc(pistaDoc, pista)
}

// Deletar pista
export const deletePista = async (id: string): Promise<void> => {
  const pistaDoc = doc(db, 'pistas', id)
  await deleteDoc(pistaDoc)
}
