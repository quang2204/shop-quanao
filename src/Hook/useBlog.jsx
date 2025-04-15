import { useQuery } from "react-query";
import { getBlogDetail, getBlogs } from "../Apis/Api";
import { useParams } from "react-router-dom";

const useBlogs = (filters = {}) => {
  const { data, isLoading } = useQuery({
    queryFn:()=> getBlogs(filters),
    queryKey: ["blogs",filters],
  });
  return { data, isLoading };
};
const useBlogDetail = () => {
  const {id}=useParams()
  const { data, isLoading } = useQuery({
    queryFn:()=> getBlogDetail(id),
    queryKey: ["blogs",id],
  });
  return { data, isLoading };
};
export { useBlogs,useBlogDetail };
