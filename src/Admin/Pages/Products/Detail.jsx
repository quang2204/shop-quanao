import useDetailProduct from "../../../Hook/useDetailProduct.jsx";
import { Spin } from "antd";
import img1 from "../../velzon/assets/images/products/img-8.png";
const Detail = () => {
  // const { detailProduct, isDetailProduct } = useDetailProduct();
  // if (isDetailProduct) {
  //   return (
  //     <Spin
  //       size="large"
  //       className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
  //     />
  //   );
  // }
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Product Detail</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={img1}
              alt=""
              className="img-fluid d-block"
              style={{ width: "50%" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">Product Name</h2>
            <p className="text-muted">Category: Electronics</p>
            <h4 className="text-danger">$199.99</h4>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis egestas rhoncus.
            </p>
            <div className="d-flex align-items-center mb-3">
              <input
                type="number"
                className="form-control w-25 me-2"
                defaultValue={1}
                min={1}
              />
              <button className="btn btn-primary">
                Add to Cart <i className="fas fa-shopping-cart" />
              </button>
            </div>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-check-circle text-success" /> In Stock
              </li>
              <li>
                <i className="fas fa-truck text-primary" /> Free Shipping
              </li>
              <li>
                <i className="fas fa-sync text-warning" /> 30-day Return Policy
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5">
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            accumsan, ligula at ultricies commodo, lacus eros consequat urna, at
            laoreet libero turpis vel velit.
          </p>
        </div>
        <div className="mt-4">
          <h3>Customer Reviews</h3>
          <div className="border p-3 rounded">
            <strong>John Doe</strong>{" "}
            <span className="text-warning">★★★★★</span>
            <p>Great product! Highly recommend.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
