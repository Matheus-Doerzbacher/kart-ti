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
import { recalcularTemporadaPiloto } from './temporadaPiloto'
import { atualizarGanhadorCorrida } from './corrida'

export type ResultadoPiloto = {
  id: string
  idPiloto: string
  idCorrida: string
  posicao: number
  melhorVolta: string
  numeroDaMelhorVolta: number
  tempoDoPilotoDaFrente: string
  tempoDoPilotoLider: string
  totalDeVoltas: number
  velocidadeMedia: string
  numeroKart: number
  pontos: number
  posicaoQualificacao: number
  tempoQualificacao: string
}

const nameCollection = 'resultadoPiloto'

export const getPontos = (posicao: number) => {
  if (posicao === 1) return 20
  if (posicao === 2) return 18
  if (posicao === 3) return 16
  if (posicao === 4) return 14
  if (posicao === 5) return 12
  if (posicao === 6) return 10
  if (posicao === 7) return 8
  if (posicao === 8) return 6
  if (posicao === 9) return 4
  if (posicao === 10) return 2
  return 0
}

export const getAllResultadoPilotos = async (
  idCorrida: string,
): Promise<ResultadoPiloto[]> => {
  const resultadoCollection = collection(db, nameCollection)
  const q = query(resultadoCollection, where('idCorrida', '==', idCorrida))
  const resultadoSnapshot = await getDocs(q)
  const resultados = resultadoSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as ResultadoPiloto,
  )
  return resultados
}

export const getAllResultadoPilotosByPiloto = async (
  idPiloto: string,
): Promise<ResultadoPiloto[]> => {
  const resultadoCollection = collection(db, nameCollection)
  const q = query(resultadoCollection, where('idPiloto', '==', idPiloto))
  const resultadoSnapshot = await getDocs(q)
  const resultados = resultadoSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as ResultadoPiloto,
  )
  return resultados
}

export const getResultadoPiloto = async (
  id: string,
): Promise<ResultadoPiloto> => {
  const resultadoDoc = doc(db, nameCollection, id)
  const resultadoSnapshot = await getDoc(resultadoDoc)
  return resultadoSnapshot.data() as ResultadoPiloto
}

export const addResultadoPiloto = async (
  resultado: ResultadoPiloto,
): Promise<void> => {
  const resultadoCollection = collection(db, nameCollection)
  await addDoc(resultadoCollection, resultado)
  await recalcularTemporadaPiloto(resultado.idPiloto, resultado.idCorrida)
  if (resultado.posicao === 1) {
    await atualizarGanhadorCorrida(resultado.idCorrida, resultado.idPiloto)
  }
}

export const updateResultadoPiloto = async (
  resultado: ResultadoPiloto,
): Promise<void> => {
  const resultadoDoc = doc(db, nameCollection, resultado.id)
  await updateDoc(resultadoDoc, resultado)
  await recalcularTemporadaPiloto(resultado.idPiloto, resultado.idCorrida)
  if (resultado.posicao === 1) {
    await atualizarGanhadorCorrida(resultado.idCorrida, resultado.idPiloto)
  }
}

export const deleteResultadoPiloto = async (id: string): Promise<void> => {
  const resultadoDoc = doc(db, nameCollection, id)
  await deleteDoc(resultadoDoc)
}
