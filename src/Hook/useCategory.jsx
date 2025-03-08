import {  useMutation, useQuery, useQueryClient } from "react-query";
import { deleteCategory, getCategory } from "../Apis/Api";
import { message } from "antd";
const useCategory = () => {
  const { data: category, isLoading: isCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });
  console.log(category);
  return { category, isCategory };
};
const useDeleteCategory = (id) => {
  const queryClient = useQueryClient();
  const {mutate,isLoading}=useMutation({
    mutationFn:(id)=>deleteCategory(id),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["category"]});
      message.success("Xóa danh muc thành công");

    },
    onError:()=>{
      message.error("Xóa sản phẩm thất bại");
    }
  })
  return {mutate,isLoading}
}
export  {useCategory,useDeleteCategory};
