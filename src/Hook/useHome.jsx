import { useQuery } from "react-query";
import { getHome } from "../Apis/Api";

const getHomes=()=>{
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => getHome(),

  });
  return { data, isLoading };
}
export default getHomes