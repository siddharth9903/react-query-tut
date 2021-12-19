import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'

function fetchColors(page) {
    
    console.log(page)
    // return axios.get(`http://localhost:4000/colors`)
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`)
}



export const PaginatedQueries = () => {

    const [pageNo, setPageNo] = useState(1)
    const { data,isLoading,isFetching } = useQuery(['colors',pageNo], () => fetchColors(pageNo),{
        keepPreviousData:true
    })

if(isLoading) {
    return <h4>loading...</h4>
}

    return (
        <div>
            {data?.data.map((color,key)=>{
                return (
                    <div key={key}>
                        <h3>{color.id} {color.name}</h3>
                    </div>
                )
            })}
            <button onClick={()=>setPageNo(pageNo-1)} disabled={pageNo === 1} type="button">previous page</button>
            <button onClick={()=>setPageNo(pageNo+1)} disabled={pageNo === 3} type="button">Next page</button>
            {isFetching && <h4>fetching ....</h4>}
        </div>
    )
}
