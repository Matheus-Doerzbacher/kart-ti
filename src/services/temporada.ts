import { db } from '@/config/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

export type Temporada = {
  id: string
  atual: boolean
  nome: string
  ano: number
}

const nameCollection = 'temporada'

export const getAllTemporada = async (): Promise<Temporada[]> => {
  const temporadaCollection = collection(db, nameCollection)
  const temporadaSnapshot = await getDocs(temporadaCollection)
  const temporadas = temporadaSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as Temporada,
  )
  return temporadas
}

export const getTemporada = async (id: string): Promise<Temporada> => {
  const temporadaDoc = doc(db, nameCollection, id)
  const temporadaSnapshot = await getDoc(temporadaDoc)
  return { ...temporadaSnapshot.data(), id: temporadaSnapshot.id } as Temporada
}

export const getTemporadaAtual = async (): Promise<Temporada> => {
  const temporadaCollection = collection(db, nameCollection)
  const q = query(temporadaCollection, where('atual', '==', true))
  const temporadaSnapshot = await getDocs(q)
  return temporadaSnapshot.docs[0].data() as Temporada
}

export const alterarTemporadaAtual = async (id: string): Promise<void> => {
  const temporada = await getTemporada(id)

  const temporadaAtualizada = {
    ...temporada,
    atual: !temporada.atual,
  }
  await updateTemporada(temporada.id, temporadaAtualizada)
}

export const addTemporada = async (
  temporada: Omit<Temporada, 'id'>,
): Promise<void> => {
  const temporadaCollection = collection(db, nameCollection)
  await addDoc(temporadaCollection, temporada)
}

export const updateTemporada = async (
  id: string,
  temporada: Partial<Temporada>,
): Promise<void> => {
  const temporadaDoc = doc(db, nameCollection, id)
  await updateDoc(temporadaDoc, temporada)
}

export const deleteTemporada = async (id: string): Promise<void> => {
  const temporadaDoc = doc(db, nameCollection, id)
  await deleteDoc(temporadaDoc)
}
