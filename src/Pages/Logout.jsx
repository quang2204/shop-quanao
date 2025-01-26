import React from "react";

const Logout = () => {
  return (
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
                              src="assets/images/logo-light.png"
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
                                <p className="fs-15 fst-italic">
                                  " Great! Clean code, clean design, easy for
                                  customization. Thanks very much! "
                                </p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">
                                  " The theme is really great with an amazing
                                  customer support."
                                </p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">
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
                    <div className="p-lg-5 p-4 text-center">
                      <img
                        src="https://media-public.canva.com/pCMX8/MAFQBopCMX8/1/tl.png"
                        alt=""
                        width={200}
                        className="mx-auto d-block"
                      />
                      <div className="mt-4 pt-2">
                        <h5>You are Logged Out</h5>
                        <p className="text-muted">
                          Thank you for using
                          <span className="fw-semibold">velzon</span> admin
                          template
                        </p>
                        <div className="mt-4">
                          <a
                            href="auth-signin-basic.html"
                            className="py-3 px-36 rounded-md btn-success w-100"
                          >
                            Sign In
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Logout;
