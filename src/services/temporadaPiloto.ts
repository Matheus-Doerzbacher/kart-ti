import { getTemporada } from '@/services/temporada'
import { db } from '@/config/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { getCorrida, getCorridasPorTemporada } from './corrida'
import { getAllResultadoPilotos, getPontos } from './resultadoPiloto'

export type TemporadaPiloto = {
  id: string
  idPiloto: string
  idTemporada: string
  pontos: number
  vitorias: number
}

const nameCollection = 'temporadaPiloto'

export const getAllTempordaPiloto = async (): Promise<TemporadaPiloto[]> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  const temporadaPilotoSnapshot = await getDocs(temporadaPilotoCollection)
  const temporadaPilotos = temporadaPilotoSnapshot.docs.map(
    (doc) => doc.data() as TemporadaPiloto,
  )
  return temporadaPilotos
}

export const getTemporadaPiloto = async (
  idPiloto: string,
  idTemporada: string,
): Promise<TemporadaPiloto> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  const q = query(
    temporadaPilotoCollection,
    where('idPiloto', '==', idPiloto),
    where('idTemporada', '==', idTemporada),
  )
  const temporadaPilotoSnapshot = await getDocs(q)
  return temporadaPilotoSnapshot.docs[0].data() as TemporadaPiloto
}

export const getAllTempordaPilotoByTemporada = async (
  idTemporada: string,
): Promise<TemporadaPiloto[]> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  const q = query(
    temporadaPilotoCollection,
    where('idTemporada', '==', idTemporada),
  )
  const temporadaPilotoSnapshot = await getDocs(q)
  return temporadaPilotoSnapshot.docs.map(
    (doc) => doc.data() as TemporadaPiloto,
  )
}

export const getTemporadaPilotoByPilotoAndTemporada = async (
  idPiloto: string,
  idTemporada: string,
): Promise<TemporadaPiloto | null> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  const q = query(
    temporadaPilotoCollection,
    where('idPiloto', '==', idPiloto),
    where('idTemporada', '==', idTemporada),
  )
  const temporadaPilotoSnapshot = await getDocs(q)
  if (temporadaPilotoSnapshot.docs.length === 0) {
    return null
  }
  const doc = temporadaPilotoSnapshot.docs[0]
  return { ...doc.data(), id: doc.id } as TemporadaPiloto
}

export const addTemporadaPiloto = async (
  temporadaPiloto: Omit<TemporadaPiloto, 'id'>,
): Promise<void> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  await addDoc(temporadaPilotoCollection, temporadaPiloto)
}

export const updateTemporadaPiloto = async (
  temporadaPiloto: TemporadaPiloto,
): Promise<void> => {
  const temporadaPilotoDoc = doc(db, nameCollection, temporadaPiloto.id)
  await updateDoc(temporadaPilotoDoc, temporadaPiloto)
}

export const deleteTemporadaPiloto = async (id: string): Promise<void> => {
  const temporadaPilotoDoc = doc(db, nameCollection, id)
  await deleteDoc(temporadaPilotoDoc)
}

export const recalcularTemporadaPiloto = async (
  idPiloto: string,
  idCorrida: string,
): Promise<void> => {
  const corrida = await getCorrida(idCorrida)
  const temporada = await getTemporada(corrida.idTemporada)

  const corridasDaTemporada = await getCorridasPorTemporada(temporada.id)

  let vitorias = 0
  let pontos = 0

  corridasDaTemporada.forEach(async (corrida) => {
    const resultados = await getAllResultadoPilotos(corrida.id)
    resultados.forEach((resultado) => {
      if (resultado.idPiloto === idPiloto) {
        if (resultado.posicao === 1) {
          vitorias++
        }
        pontos += getPontos(resultado.posicao)
      }
    })
  })

  const temporadaPiloto = await getTemporadaPilotoByPilotoAndTemporada(
    idPiloto,
    temporada.id,
  )

  console.log(temporadaPiloto)

  if (!temporadaPiloto) {
    addTemporadaPiloto({
      idPiloto,
      idTemporada: temporada.id,
      pontos,
      vitorias,
    })
  } else {
    const temporadaPilotoAtualizada: TemporadaPiloto = {
      ...temporadaPiloto,
      pontos,
      vitorias,
    }
    await updateTemporadaPiloto(temporadaPilotoAtualizada)
  }
}
