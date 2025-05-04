import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const matchId = req.query.id

  if (!matchId) {
    return res.status(400).json({ error: 'Missing match ID' })
  }

  try {
    const firebaseUrl = `http://localhost:5001/YOUR_PROJECT_ID/us-central1/matchStats?id=${matchId}`
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
