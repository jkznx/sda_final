'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

const LottoPage = () => {
  const [lottoData, setLottoData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch lotto data from Strapi API using axios
  useEffect(() => {
    const fetchLottoData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/lotto6s', {
          params: {
            fields: 'id,lottonumber',  // Passing the query parameter to fetch specific fields
          }
        })
        // Format the lottonumber to 6 digits
        const formattedData = response.data.data.map((lotto: { lottonumber: string }) => {
          lotto.lottonumber = lotto.lottonumber.padStart(6, '0');  // Pad with zeros
          return lotto;
        });
        setLottoData(formattedData);
      } catch (err) {
        setError('Error fetching lotto data.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLottoData()
  }, [])  // Empty dependency array ensures it runs once on mount

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
          {lottoData.map((lotto: { id: number, lottonumber: string }) => (
            <div key={lotto.id} className="group relative">
              <div className="aspect-3/2 w-full rounded-md bg-violet-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{lotto.lottonumber}</h3>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-sm text-gray-700">ID: {lotto.id}</p>
                <p className="text-sm font-medium text-gray-900 ">{lotto.lottonumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LottoPage
