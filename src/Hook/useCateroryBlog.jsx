import { useQuery } from "react-query"
import { getCateroryBlog } from "../Apis/Api"

const usecateroryBlogs=()=>{
    const {data,isLoading}=useQuery({
        queryKey:["cateroryBlogs"],
        queryFn:getCateroryBlog
    })
    return {data,isLoading}
}
export {usecateroryBlogs}