import React from 'react';
const TwoStep = () => {
  return (
    <>
  <meta charSet="utf-8" />
  <title>Two Step Verification | Velzon - Admin &amp; Dashboard Template</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    content="Premium Multipurpose Admin & Dashboard Template"
    name="description"
  />
  <meta content="Themesbrand" name="author" />
  {/* App favicon */}
  <link rel="shortcut icon" href="assets/images/favicon.ico" />
  {/* Layout config Js */}
  {/* Bootstrap Css */}
  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  {/* Icons Css */}
  <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
  {/* App Css*/}
  <link href="assets/css/app.min.css" rel="stylesheet" type="text/css" />
  {/* custom Css*/}
  <link href="assets/css/custom.min.css" rel="stylesheet" type="text/css" />
    
<div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
  <div className="bg-overlay" />
  {/* auth-page content */}
  <div className="auth-page-content overflow-hidden pt-lg-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="card overflow-hidden">
            <div className="row justify-content-center g-0">
              <div className="col-lg-6">
                <div className="p-lg-5 p-4 auth-one-bg h-100">
                  <div className="bg-overlay" />
                  <div className="position-relative h-100 d-flex flex-column">
                    <div className="mb-4">
                      <a href="index.html" className="d-block">
                        <img
                          src={"assets/images/logo-light.png"}
                          alt=""
                          height={18}
                        />
                      </a>
                    </div>
                    <div className="mt-auto">
                      <div className="mb-3">
                        <i className="ri-double-quotes-l display-4 text-success" />
                      </div>
                      <div
                        id="qoutescarouselIndicators"
                        className="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-indicators">
                          <button
                            type="button"
                            data-bs-target="#qoutescarouselIndicators"
                            data-bs-slide-to={0}
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                          />
                          <button
                            type="button"
                            data-bs-target="#qoutescarouselIndicators"
                            data-bs-slide-to={1}
                            aria-label="Slide 2"
                          />
                          <button
                            type="button"
                            data-bs-target="#qoutescarouselIndicators"
                            data-bs-slide-to={2}
                            aria-label="Slide 3"
                          />
                        </div>
                        <div className="carousel-inner text-center text-white-50 pb-5">
                          <div className="carousel-item active">
                            <p className="fs-15">
                              " Great! Clean code, clean design, easy for
                              customization. Thanks very much! "
                            </p>
                          </div>
                          <div className="carousel-item">
                            <p className="fs-15">
                              " The theme is really great with an amazing
                              customer support."
                            </p>
                          </div>
                          <div className="carousel-item">
                            <p className="fs-15">
                              " Great! Clean code, clean design, easy for
                              customization. Thanks very much! "
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* end carousel */}
                    </div>
                  </div>
                </div>
              </div>
              {/* end col */}
              <div className="col-lg-6">
                <div className="p-lg-5 p-4">
                  <div className="mb-4">
                    <div className="avatar-lg mx-auto">
                      <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                        <i className="ri-mail-line" />
                      </div>
                    </div>
                  </div>
                  <div className="text-muted text-center mx-lg-3">
                    <h4 className="">Verify Your Email</h4>
                    <p>
                      Please enter the 4 digit code sent to{" "}
                      <span className="fw-semibold">example@abc.com</span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <form autoComplete="off">
                      <div className="row">
                        <div className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit1-input"
                              className="visually-hidden"
                            >
                              Digit 1
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              onkeyup="moveToNext(1, event)"
                              maxLength={1}
                              id="digit1-input"
                            />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit2-input"
                              className="visually-hidden"
                            >
                              Digit 2
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              onkeyup="moveToNext(2, event)"
                              maxLength={1}
                              id="digit2-input"
                            />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit3-input"
                              className="visually-hidden"
                            >
                              Digit 3
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              onkeyup="moveToNext(3, event)"
                              maxLength={1}
                              id="digit3-input"
                            />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit4-input"
                              className="visually-hidden"
                            >
                              Digit 4
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              onkeyup="moveToNext(4, event)"
                              maxLength={1}
                              id="digit4-input"
                            />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      <div className="mt-3">
                        <button type="button" className="btn btn-success w-100">
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="mt-5 text-center">
                    <p className="mb-0">
                      Didn't receive a code ?{" "}
                      <a
                        href="auth-pass-reset-cover.html"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        Resend
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* end col */}
            </div>
            {/* end row */}
          </div>
          {/* end card */}
        </div>
        {/* end col */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </div>
  {/* end auth page content */}
  {/* footer */}
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <p className="mb-0">
              © Velzon. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
              by Themesbrand
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* end Footer */}
</div>
</>

  );
};

export default TwoStep;