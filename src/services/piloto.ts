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

const nameCollection = 'piloto'

export const getAllPiloto = async (): Promise<Piloto[]> => {
  const pilotoCollection = collection(db, nameCollection)
  const pilotoSnapshot = await getDocs(pilotoCollection)
  const pilotos = pilotoSnapshot.docs.map((doc) => doc.data() as Piloto)
  return pilotos
}

export const getPiloto = async (id: string): Promise<Piloto> => {
  const pilotoDoc = doc(db, nameCollection, id)
  const pilotoSnapshot = await getDoc(pilotoDoc)
  return pilotoSnapshot.data() as Piloto
}

export const addPiloto = async (piloto: Omit<Piloto, 'id'>): Promise<void> => {
  const pilotoCollection = collection(db, nameCollection)
  await addDoc(pilotoCollection, piloto)
}

export const updatePiloto = async (
  id: string,
  piloto: Partial<Piloto>,
): Promise<void> => {
  const pilotoDoc = doc(db, nameCollection, id)
  await updateDoc(pilotoDoc, piloto)
}

export const deletePiloto = async (id: string): Promise<void> => {
  const pilotoDoc = doc(db, nameCollection, id)
  await deleteDoc(pilotoDoc)
}
