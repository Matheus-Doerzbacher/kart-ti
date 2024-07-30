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

export type Piloto = {
  id: string
  nome: string
  urlImage: string
}

// Buscar todos os pilotos
export const getPilotos = async (): Promise<Piloto[]> => {
  const pilotoCollection = collection(db, 'pilotos')
  const pilotoSnapshot = await getDocs(pilotoCollection)
  const pilotos = pilotoSnapshot.docs.map((doc) => doc.data() as Piloto)
  return pilotos
}

// Buscar um piloto
export const getPiloto = async (id: string): Promise<Piloto> => {
  const pilotoDoc = doc(db, 'pilotos', id)
  const pilotoSnapshot = await getDoc(pilotoDoc)
  return pilotoSnapshot.data() as Piloto
}

// Adicionar novo piloto
export const addPiloto = async (piloto: Omit<Piloto, 'id'>): Promise<void> => {
  const pilotoCollection = collection(db, 'pilotos')
  await addDoc(pilotoCollection, piloto)
}

// Atualizar piloto
export const updatePiloto = async (
  id: string,
  piloto: Partial<Piloto>,
): Promise<void> => {
  const pilotoDoc = doc(db, 'pilotos', id)
  await updateDoc(pilotoDoc, piloto)
}

// Deletar piloto
export const deletePiloto = async (id: string): Promise<void> => {
  const pilotoDoc = doc(db, 'pilotos', id)
  await deleteDoc(pilotoDoc)
}
