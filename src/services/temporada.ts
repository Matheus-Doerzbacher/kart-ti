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
  const temporadas = temporadaSnapshot.docs.map((doc) => {
    const temporada = doc.data() as Temporada
    return { ...temporada, id: doc.id }
  })
  return temporadas
}

export const getTemporada = async (id: string): Promise<Temporada> => {
  const temporadaDoc = doc(db, nameCollection, id)
  const temporadaSnapshot = await getDoc(temporadaDoc)
  return { ...temporadaSnapshot.data(), id: temporadaSnapshot.id } as Temporada
}

// export const getTemporadaAtual = async (): Promise<Temporada> => {
//   const temporadaCollection = collection(db, nameCollection)
//   const q = query(temporadaCollection, where('atual', '==', true))
//   const temporadaSnapshot = await getDocs(q)
//   return temporadaSnapshot.docs[0].data() as Temporada
// }

export const addTemporada = async (
  temporada: Omit<Temporada, 'id'>,
): Promise<void> => {
  const temporadaCollection = collection(db, nameCollection)
  const docRef = await addDoc(temporadaCollection, temporada)

  if (temporada.atual === true) {
    const novaTemporada = { ...temporada, id: docRef.id }
    await atualizaTemporadaAtual(novaTemporada)
  }
}

export const updateTemporada = async (temporada: Temporada): Promise<void> => {
  const temporadaDoc = doc(db, nameCollection, temporada.id)
  await updateDoc(temporadaDoc, temporada)
  if (temporada.atual === true) {
    await atualizaTemporadaAtual(temporada)
  }
}

const atualizaTemporadaAtual = async (temporada: Temporada): Promise<void> => {
  if (temporada.atual === true) {
    const temporadas = await getAllTemporada()
    temporadas.forEach(async (t) => {
      if (t.id !== temporada.id) {
        await updateTemporada({ ...t, atual: false })
      }
    })
  }
}

export const deleteTemporada = async (id: string): Promise<void> => {
  const temporadaDoc = doc(db, nameCollection, id)
  await deleteDoc(temporadaDoc)
}
