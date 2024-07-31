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
import { Piloto } from './piloto'
import { Temporada } from './temporada'

export type TemporadaPiloto = {
  id: string
  piloto: Piloto
  temporada: Temporada
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
  id: string,
): Promise<TemporadaPiloto> => {
  const temporadaPilotoDoc = doc(db, nameCollection, id)
  const temporadaPilotoSnapshot = await getDoc(temporadaPilotoDoc)
  return temporadaPilotoSnapshot.data() as TemporadaPiloto
}

export const getAllTempordaPilotoByPiloto = async (
  idPiloto: string,
): Promise<TemporadaPiloto[]> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  const q = query(temporadaPilotoCollection, where('idPiloto', '==', idPiloto))
  const temporadaPilotoSnapshot = await getDocs(q)
  return temporadaPilotoSnapshot.docs.map(
    (doc) => doc.data() as TemporadaPiloto,
  )
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

export const addTemporadaPiloto = async (
  temporadaPiloto: TemporadaPiloto,
): Promise<void> => {
  const temporadaPilotoCollection = collection(db, nameCollection)
  await addDoc(temporadaPilotoCollection, temporadaPiloto)
}

export const updateTemporadaPiloto = async (
  id: string,
  temporadaPiloto: Partial<TemporadaPiloto>,
): Promise<void> => {
  const temporadaPilotoDoc = doc(db, nameCollection, id)
  await updateDoc(temporadaPilotoDoc, temporadaPiloto)
}

export const sumPontosTemporadaPiloto = async (
  idPiloto: string,
  idTemporada: string,
  pontos: number,
): Promise<void> => {
  const temporadaPiloto = await getTemporadaPilotoByPilotoAndTemporada(
    idPiloto,
    idTemporada,
  )
  const temporadaPilotoAtualizado = {
    ...temporadaPiloto,
    pontos: temporadaPiloto.pontos + pontos,
  }
  await updateTemporadaPiloto(temporadaPiloto.id, temporadaPilotoAtualizado)
}

export const sumVitoriasTemporadaPiloto = async (
  idPiloto: string,
  idTemporada: string,
): Promise<void> => {
  const temporadaPiloto = await getTemporadaPilotoByPilotoAndTemporada(
    idPiloto,
    idTemporada,
  )
  const temporadaPilotoAtualizado = {
    ...temporadaPiloto,
    vitorias: temporadaPiloto.vitorias + 1,
  }
  await updateTemporadaPiloto(temporadaPiloto.id, temporadaPilotoAtualizado)
}

export const deleteTemporadaPiloto = async (id: string): Promise<void> => {
  const temporadaPilotoDoc = doc(db, nameCollection, id)
  await deleteDoc(temporadaPilotoDoc)
}
