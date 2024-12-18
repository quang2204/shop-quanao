interface Cart {
    _id: any;
    quantity: number;
    product: {
        _id: string;
        name: string;
        imageUrl: string;
        price: number;
    };
    user: string;
}
export default Cart