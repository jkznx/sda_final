'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

const LottoPage = () => {
  const [lottoData, setLottoData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLottoData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/lotto6s?populate[0]=lotto4num', {
          params: {
            fields: 'id,lottonumber', // Fields from lotto6s
            'populate[lotto4num][fields]': 'lottonumber', // Fields from lotto4num relation
          },
        })

        console.log('API Response:', response.data) // Log for debugging

        // Format the data to include both lotto6 and lotto4 numbers
        const formattedData = response.data.data.map((lotto: any) => {
          const lotto6Number = lotto.lottonumber || 'N/A' // Fallback for lotto6s
          const lotto4Number = lotto.lotto4num?.lottonumber || 'N/A' // Fallback for lotto4num
          return {
            id: lotto.id || 'Unknown', // Fallback for id
            lotto6number: String(lotto6Number).padStart(6, '0'), // Pad to 6 digits
            lotto4number: String(lotto4Number).padStart(4, '0'), // Pad to 4 digits
          }
        })

        setLottoData(formattedData)
      } catch (err: any) {
        const errorMessage = err.response
          ? `Server Error: ${err.response.status} - ${err.response.data.error?.message || 'Unknown error'}`
          : `Network Error: ${err.message}`
        setError(errorMessage)
        console.error('Fetch Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLottoData()
  }, []) // Empty dependency array ensures it runs once on mount

  if (loading) {
    return <div>Loading lotto data...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lotto Numbers</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {lottoData.map((lotto: { id: number | string; lotto6number: string; lotto4number: string }) => (
            <div key={lotto.id} className="group relative">
              <div className="aspect-3/2 w-full rounded-md bg-purple-500 flex items-center justify-center flex-col">
                <h1 className="text-md text-white">6 digit</h1>
                <h3 className="text-2xl font-bold text-white">{lotto.lotto6number}</h3>
                <h1 className="text-md text-white">4 digit</h1>
                <p className="text-lg font-bold text-white">{lotto.lotto4number}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-sm text-gray-700">ID: {lotto.id}</p>
                <p className="text-sm font-medium text-gray-900">
                  {lotto.lotto6number} / {lotto.lotto4number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LottoPage