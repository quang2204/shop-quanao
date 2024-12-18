const FormatPrice = ({ price }: { price: number }) => {
  const formatprice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return formatprice;
};

export default FormatPrice;
