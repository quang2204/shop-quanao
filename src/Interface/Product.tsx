interface Product {
  _id: string;
  name: string;
  caterori: {
    _id: string;
    name: string;
  };
  albumImg: [
    {
      _id: string;
      url: string;
    },
  ];
  price: number;
  imageUrl: string;
  description: string;
  variant: [
    {
      _id: string;
      color: string;
      price: number;
      quantity: number;
      imageUrl: string;
      size: string;
    },
  ];
}

export default Product;
