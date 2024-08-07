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
const nameCollection = 'pista'

export const getAllPista = async (): Promise<Pista[]> => {
  const pistaCollection = collection(db, nameCollection)
  const pistaSnapshot = await getDocs(pistaCollection)
  const pistas = pistaSnapshot.docs.map((doc) => {
    const pista = doc.data() as Pista
    return { ...pista, id: doc.id }
  })
  return pistas
}

export const getPista = async (id: string): Promise<Pista> => {
  const pistaDoc = doc(db, nameCollection, id)
  const pistaSnapshot = await getDoc(pistaDoc)
  return { ...pistaSnapshot.data(), id: pistaSnapshot.id } as Pista
}

export const addPista = async (pista: Omit<Pista, 'id'>): Promise<void> => {
  const pistaCollection = collection(db, nameCollection)
  await addDoc(pistaCollection, pista)
}

export const updatePista = async (pista: Pista): Promise<void> => {
  const pistaDoc = doc(db, nameCollection, pista.id)
  await updateDoc(pistaDoc, pista)
}

export const deletePista = async (id: string): Promise<void> => {
  const pistaDoc = doc(db, nameCollection, id)
  await deleteDoc(pistaDoc)
}
