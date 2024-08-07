import { db } from '@/config/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

export type Corrida = {
  id: string
  idPista: string
  idTemporada: string
  data: Timestamp
  voltas: number
  tempo: string
  idPiloto?: string
}

const nameCollection = 'corrida'

export const getAllCorrida = async (): Promise<Corrida[]> => {
  const corridaCollection = collection(db, nameCollection)
  const corridaSnapshot = await getDocs(corridaCollection)
  const corridas = corridaSnapshot.docs.map((doc) => {
    const corrida = doc.data() as Corrida
    return { ...corrida, id: doc.id }
  })
  return corridas
}

export const getCorridasPorTemporada = async (
  idTemporada: string,
): Promise<Corrida[]> => {
  const corridaCollection = collection(db, nameCollection)
  const q = query(corridaCollection, where('idTemporada', '==', idTemporada))
  const corridaSnapshot = await getDocs(q)
  const corridas = corridaSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as Corrida,
  )
  return corridas
}

export const getCorrida = async (id: string): Promise<Corrida> => {
  const corridaDoc = doc(db, nameCollection, id)
  const corridaSnapshot = await getDoc(corridaDoc)
  return corridaSnapshot.data() as Corrida
}

export const addCorrida = async (
  corrida: Omit<Corrida, 'id'>,
): Promise<void> => {
  const corridaCollection = collection(db, nameCollection)
  const docRef = await addDoc(corridaCollection, corrida)

  const novaCorrida: Corrida = {
    ...corrida,
    id: docRef.id,
  }

  await updateCorrida(novaCorrida)
}

export const updateCorrida = async (corrida: Corrida): Promise<void> => {
  const corridaDoc = doc(db, nameCollection, corrida.id)
  await updateDoc(corridaDoc, corrida)
}

export const deleteCorrida = async (id: string): Promise<void> => {
  const corridaDoc = doc(db, nameCollection, id)
  await deleteDoc(corridaDoc)
}
