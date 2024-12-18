import { useQuery } from "react-query";
import { detailUser } from "../Apis/Api.tsx";
const UseDetailUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => detailUser(user._id),
  });
  return { data, isLoading };
};

export default UseDetailUser;
