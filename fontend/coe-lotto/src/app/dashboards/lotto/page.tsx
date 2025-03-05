'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

const LottoPage = ({ searchTerm = '' }) => {
  const [lottoData, setLottoData] = useState<any[]>([])
  const [bestSellerData, setBestSellerData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLottoData = async () => {
      try {
        // Fetch regular lotto numbers
        const lottoResponse = await axios.get('http://localhost:1337/api/lotto6s?populate[0]=lotto4num', {
          params: {
            fields: 'lottonumber',
            'populate[lotto4num][fields]': 'lottonumber',
          },
        })

        // Fetch best seller lotto numbers
        const bestSellerResponse = await axios.get('http://localhost:1337/api/lotto6s/best-seller?populate[0]=lotto4num', {
          params: {
            fields: 'lottonumber',
            'populate[lotto4num][fields]': 'lottonumber',
          },
        })

        console.log('Regular Lotto Response:', lottoResponse.data)
        console.log('Best Seller Response:', bestSellerResponse.data)

        // Format regular lotto data
        const formatLottoData = (response: any) => {
          const data = response.data?.data || response.data || []
          if (!Array.isArray(data)) {
            console.error('Regular lotto data is not an array:', data)
            return []
          }
          return data.map((lotto: any) => {
            const lotto6Number = lotto.attributes?.lottonumber || lotto.lottonumber || 'N/A'
            const lotto4Number = lotto.attributes?.lotto4num?.data?.attributes?.lottonumber || lotto.lotto4num?.lottonumber || 'N/A'
            return {
              lotto6number: String(lotto6Number).padStart(6, '0'),
              lotto4number: String(lotto4Number).padStart(4, '0')
            }
          })
        }

        // Format best seller data
        const formatBestSellerData = (response: any) => {
          const data = response.data?.data || response.data || []
          if (!Array.isArray(data)) {
            console.error('Best seller data is not an array:', data)
            return []
          }
          return data.map((lotto: any) => {
            const lotto6Number = lotto.attributes?.lottonumber || lotto.lottonumber || 'N/A'
            const lotto4Number = lotto.attributes?.lotto4num?.data?.attributes?.lottonumber || lotto.lotto4num?.lottonumber || 'N/A'
            return {
              lotto6number: String(lotto6Number).padStart(6, '0'),
              lotto4number: String(lotto4Number).padStart(4, '0')
            }
          })
        }

        setLottoData(formatLottoData(lottoResponse))
        setBestSellerData(formatBestSellerData(bestSellerResponse))
      } catch (err: any) {
        const errorMessage = err.response
          ? `Server Error: ${err.response.status} - ${err.response.data?.error?.message || 'Unknown error'}`
          : `Network Error: ${err.message}`
        setError(errorMessage)
        console.error('Fetch Error:', err)
        console.error('Error Details:', err.response?.data)
      } finally {
        setLoading(false)
      }
    }

    fetchLottoData()
  }, [])

  const filteredData = lottoData.filter((lotto) =>
    lotto.lotto6number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lotto.lotto4number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredBestSellers = bestSellerData.filter((lotto) =>
    lotto.lotto6number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lotto.lotto4number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBuy = (lotto: { lotto6number: string; lotto4number: string }) => {
    alert(`Buying: ${lotto.lotto6number} / ${lotto.lotto4number}`)
  }

  const handleAddToCart = (lotto: { lotto6number: string; lotto4number: string }) => {
    alert(`Added to cart: ${lotto.lotto6number} / ${lotto.lotto4number}`)
  }

  if (loading) {
    return <div>Loading lotto data...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lotto Numbers</h2>
        <div className="mt-4 flex overflow-x-auto gap-6 py-4 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredData.map((lotto: { lotto6number: string; lotto4number: string }, index) => (
            <div key={index} className="group relative flex-none w-64">
              <div className="aspect-3/2 w-full rounded-md bg-purple-500 flex items-center justify-center flex-col shadow">
                <h1 className="text-md text-white">6 digit</h1>
                <h3 className="text-2xl font-bold text-white">{lotto.lotto6number}</h3>
                <h1 className="text-md text-white">4 digit</h1>
                <p className="text-lg font-bold text-white">{lotto.lotto4number}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  {lotto.lotto6number} / {lotto.lotto4number}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBuy(lotto)}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleAddToCart(lotto)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best Seller</h2>
        <div className="mt-4 flex overflow-x-auto gap-6 py-4 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredBestSellers.map((lotto: { lotto6number: string; lotto4number: string }, index) => (
            <div key={index} className="group relative flex-none w-64">
              <div className="aspect-3/2 w-full rounded-md bg-purple-500 flex items-center justify-center flex-col shadow">
                <h1 className="text-md text-white">6 digit</h1>
                <h3 className="text-2xl font-bold text-white">{lotto.lotto6number}</h3>
                <h1 className="text-md text-white">4 digit</h1>
                <p className="text-lg font-bold text-white">{lotto.lotto4number}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  {lotto.lotto6number} / {lotto.lotto4number}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBuy(lotto)}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleAddToCart(lotto)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LottoPage