import React from 'react';

const TwoStep = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '-150px' }}>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Two Step Verification</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <div className="card p-4 shadow-lg" style={{ width: 400 }}>
          <div className="text-center">
            <i className="fas fa-shield-alt fa-3x text-primary" />
            <h3 className="mt-3">Two Step Verification</h3>
            <p className="text-muted">
              Enter the verification code sent to your email.
            </p>
          </div>
          <form>
            <div className="mb-3 text-center">
              <input
                type="text"
                className="form-control text-center fs-4"
                maxLength={6}
                placeholder="______"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Verify
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-muted">
              Didn't receive a code?{" "}
              <a href="#" className="text-primary">
                Resend
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoStep;