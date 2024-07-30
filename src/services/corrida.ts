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

export type Corrida = {
  id: string
  idPista: string
  idTemporada: string
  data: Date
}

const nameCollection = 'corrida'

export const getAllCorrida = async (): Promise<Corrida[]> => {
  const corridaCollection = collection(db, nameCollection)
  const corridaSnapshot = await getDocs(corridaCollection)
  const corridas = corridaSnapshot.docs.map((doc) => doc.data() as Corrida)
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
  await addDoc(corridaCollection, corrida)
}

export const updateCorrida = async (
  id: string,
  corrida: Partial<Corrida>,
): Promise<void> => {
  const corridaDoc = doc(db, nameCollection, id)
  await updateDoc(corridaDoc, corrida)
}

export const deleteCorrida = async (id: string): Promise<void> => {
  const corridaDoc = doc(db, nameCollection, id)
  await deleteDoc(corridaDoc)
}
