import { useQuery } from "react-query";
import { detailUser } from "../Apis/Api.jsx";
const UseDetailUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => detailUser(),

  });
  return { data, isLoading };
};

export default UseDetailUser;
