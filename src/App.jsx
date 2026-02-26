import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import Search from './components/Search'
import axios from 'axios'
import Spinner from './components/Spinner'
import AnimeCard from './components/AnimeCard'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingAnime } from './appwrite'

function App() {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm])

  
  const getJikanData = async (endpoint) => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4${endpoint}`)
      return response.data.data
    } catch (err) {
      setError('Failed to fetch anime data')
      throw err
    }
  }

  
  const fetchTopAnime = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getJikanData('/top/anime')
      setAnimeList(data)
    } catch {
      setError('Failed to fetch anime')
    } finally {
      setLoading(false)
    }
  }

  const loadTrendingAnimes = async () => {
    try{
      const  animes = await getTrendingAnime();

      setTrendingAnimes(animes)
    } catch (error) {
      console.error(`Error fetching trends: ${error}`);
      
    }
  }
  const searchAnime = async (query) => {
    try {
      setLoading(true)
      setError(null)

      const data = await getJikanData(
        `/anime?q=${encodeURIComponent(query)}&limit=12`
      )

      setAnimeList(data)

      
      if (data && data.length > 0) {
        updateSearchCount(query, data[0])
        console.log('Saved search:', query, data[0].title)
      }
    } catch {
      setError('Failed to fetch anime data')
    } finally {
      setLoading(false)
    }
  }

 
  useEffect(() => {
    fetchTopAnime()
  }, [])

  useEffect(() => {
    loadTrendingAnimes();
  },[]);

  
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchAnime(debouncedSearchTerm)
    } else {
      fetchTopAnime()
    }
  }, [debouncedSearchTerm])

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./logo.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Animes</span> You'll Enjoy
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingAnimes.length > 0 && (
          <section className='trending'>
            <h2>Trending Animes</h2>
            <ul>
              {trendingAnimes.map((anime, index) => (
                <li key ={anime.$id}>
                  <p>{index + 1}</p>
                  <img src={anime.poster_url} alt={anime.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2 >All Animes</h2>

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App