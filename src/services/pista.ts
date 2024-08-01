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
  const pistas = pistaSnapshot.docs.map((doc) => doc.data() as Pista)
  return pistas
}

export const getPista = async (id: string): Promise<Pista> => {
  const pistaDoc = doc(db, nameCollection, id)
  const pistaSnapshot = await getDoc(pistaDoc)
  return pistaSnapshot.data() as Pista
}

export const addPista = async (pista: Omit<Pista, 'id'>): Promise<void> => {
  const pistaCollection = collection(db, nameCollection)
  const DocRef = await addDoc(pistaCollection, pista)

  const novaPista = {
    id: DocRef.id,
    nome: pista.nome,
    local: pista.local,
    urlImage: pista.urlImage,
  }

  await updatePista(novaPista)
}

export const updatePista = async (pista: Pista): Promise<void> => {
  const pistaDoc = doc(db, nameCollection, pista.id)
  await updateDoc(pistaDoc, pista)
}

export const deletePista = async (id: string): Promise<void> => {
  const pistaDoc = doc(db, nameCollection, id)
  await deleteDoc(pistaDoc)
}
