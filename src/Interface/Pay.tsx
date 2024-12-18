interface Pay{
    customerName: string;
    totalPrice: number;
    phone: string;
    address: string;
    voucher: string;
    products:{
        productId: string;
        quantity: number;
        _id: string;
    }
}
export default Pay