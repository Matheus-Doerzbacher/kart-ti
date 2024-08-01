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

  const docRef = await addDoc(pilotoCollection, piloto)

  const novoPiloto = {
    id: docRef.id,
    nome: piloto.nome,
    urlImage: piloto.urlImage,
  }

  await updatePiloto(novoPiloto)
}

export const updatePiloto = async (piloto: Piloto): Promise<void> => {
  const pilotoDoc = doc(db, nameCollection, piloto.id)
  await updateDoc(pilotoDoc, piloto)
}

export const deletePiloto = async (id: string): Promise<void> => {
  const pilotoDoc = doc(db, nameCollection, id)
  await deleteDoc(pilotoDoc)
}
