import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";


const fetchSuperHero = ({ queryKey }) => {
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const addSuperHero = (hero) => {
    console.log(hero)
    return axios.post(`http://localhost:4000/superheroes`, hero)
}

export function useSuperHeroData(heroId) {
    const queryClient = useQueryClient()
    return useQuery(['super-heroes', heroId], fetchSuperHero,
        {
            initialData: () => {
                console.log(queryClient.getQueryData('super-heroes'))
                const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId))

                if (hero) {
                    return {
                        data: hero
                    }
                } else {
                    return undefined
                }

            }
        });
}

export function useAddSuperHeroData() {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        onSuccess: (data) => {
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return (
                    {
                        ...oldQueryData,
                        data: [
                            ...oldQueryData.data,
                            data.data
                        ]
                    }
                )
            })

            // queryClient.invalidateQueries('super-heroes')
        }
    })
}