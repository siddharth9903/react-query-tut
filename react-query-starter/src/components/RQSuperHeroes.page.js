import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useAddSuperHeroData } from "../hooks/useSuperHeroData.hook"

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const [movieName, setMovieName] = useState('')
  const [actorName, setActorName] = useState('')

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      staleTime: 5000,
      cacheTime: 10000,
    }
  )

  const { mutate:addHero} = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    const hero={name:movieName,alterEgo:actorName}
    console.log(hero)
    addHero(hero)
  }

  // {
  // staleTime:5000,
  // cacheTime:10000,
  //refechInterval:10000,
  //refetchIntervalInBackground:10000,
  // refetchOnMount:false,
  //refetchOnWindowFocus:false,

  //onSuccess: desired function
  //onError: desired function
  // }

  // console.log({ isLoading, isFetching });
  if (isLoading) {
    return <h1> loading... </h1>
  }

  // if (isFetching) {
  //   return <h1> isFetching....</h1>
  // }

  if (isError) {
    return <h2>{error.message}</h2>
  }


  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input value={movieName} onChange={(e) => { setMovieName(e.target.value) }} type="text" placeholder="movie" />
        <input value={actorName} onChange={(e) => { setActorName(e.target.value) }} type="text" placeholder="actor name" />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}> refetch</button>
      {data?.data.map((hero, key) => {
        return (
          <Link key={key} to={`/super-heroes/${hero.id}`}>
            <h2>{hero.name}</h2>
          </Link>
        )

      })}
    </>
  )

}
