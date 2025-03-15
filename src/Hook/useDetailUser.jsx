import { useQuery } from "react-query";
import { detailUser } from "../Apis/Api.jsx";
const UseDetailUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => detailUser(user.id),

  });
  return { data, isLoading };
};

export default UseDetailUser;
