import type {NextApiResponse } from 'next'

export default async function handler(res: NextApiResponse) {

  try {
    const firebaseUrl = `http://127.0.0.1:5001/furiachatdatabase/us-central1/hltvfuria/partidaFixa`
    const response = await fetch(firebaseUrl)

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Erro ao buscar match stats:', error)
    res.status(500).json({ error: 'Failed to fetch match stats' })
  }
}
