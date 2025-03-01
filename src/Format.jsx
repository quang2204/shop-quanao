const FormatPrice = ({ price }) => {
  const formatprice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return formatprice;
};
const FormatDate = ({ date }) => {
  const formatDate = new Intl.DateTimeFormat("vi-VN").format(new Date(date));
  return formatDate;
};
export  {FormatPrice, FormatDate};
