'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

const LottoPage = ({ searchTerm = '' }) => {
  const [lottoData, setLottoData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLottoData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/lotto6s?populate[0]=lotto4num', {
          params: {
            fields: 'id,lottonumber',
            'populate[lotto4num][fields]': 'lottonumber',
          },
        })

        console.log('API Response:', response.data)

        const formattedData = response.data.data.map((lotto: any) => {
          const lotto6Number = lotto.lottonumber || 'N/A'
          const lotto4Number = lotto.lotto4num?.lottonumber || 'N/A'
          return {
            id: lotto.id || 'Unknown',
            lotto6number: String(lotto6Number).padStart(6, '0'),
            lotto4number: String(lotto4Number).padStart(4, '0')
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
  }, [])

  // Filter the data based on searchTerm
  const filteredData = lottoData.filter((lotto) =>
    lotto.lotto6number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lotto.lotto4number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div>Loading lotto data...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lotto Numbers</h2>

        <div className="mt-4 flex overflow-x-auto gap-6 py-4 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredData.map((lotto: { id: number | string; lotto6number: string; lotto4number: string }) => (
            <div key={lotto.id} className="group relative flex-none w-64">
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best Seller</h2>

        <div className="mt-4 flex overflow-x-auto gap-6 py-4 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredData.map((lotto: { id: number | string; lotto6number: string; lotto4number: string }) => (
            <div key={lotto.id} className="group relative flex-none w-64">
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