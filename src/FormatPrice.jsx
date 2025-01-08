const FormatPrice = ({ price }) => {
  const formatprice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return formatprice;
};

export default FormatPrice;
