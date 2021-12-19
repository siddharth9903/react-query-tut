import { useParams } from "react-router-dom"
import { useSuperHeroData } from "../hooks/useSuperHeroData.hook"

export const RQheroPage = () => {
    const { heroId } = useParams()
    const { isLoading, data, isError, error } = useSuperHeroData(heroId)

    if (isLoading) {
        return <h2>loading.....</h2>
    }

    console.log(data)

    return (
        <div>
            <h3> {data?.data.name} - {data?.data.alterEgo}</h3>
            <h2>heroId page</h2>
        </div>
    )
}
