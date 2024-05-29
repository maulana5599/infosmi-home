const DetailEvent: any = () => {
  return (
    <section id="about" className="about-area pb-130 pt-80">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div
              className="about-image mt-50 wow fadeInLeft"
              data-wow-duration="1s"
            >
              <img
                className="img-thumbnail"
                src="https://api.yesplis.com/images/banner/a4382ac21129200a85351dac1d538f1c1064b4cd.png.webp"
                alt="About"
              />
            </div>{" "}
            {/* about image */}
          </div>
          <div className="col-lg-6">
            <div
              className="about-content mt-45 wow fadeInRight"
              data-wow-duration="1s"
            >
              <div className="section-title">
                <h2 className="title">Shiela On 7: Kutunggu Dibandung</h2>
              </div>{" "}
              {/* section title */}
              <p className="date">
                <span>
                  25<sup>th</sup>
                </span>{" "}
                December’ 19
              </p>
              <p className="mt-4">
                <i className="lni lni-map-marker" />
                <span>Stadion Mandala Krida | Mandala Krida</span>
              </p>
            </div>{" "}
            {/* about content */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-3 ">
            <h3>Description</h3>
            <hr />
            <div>
              <p className="text mt- text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip. <br /> <br /> Adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <h3>Category Ticket</h3>
            <hr />
            <div className="card">
              <div className="card-header">All Ticket</div>
              <div className="card-body">
                <div id="tiket-id" />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <h5>Subtotal</h5>
                <h5 className="total-checkout">Rp. 0</h5>
              </div>
              <div>
                <button
                  type="button"
                  id="checkout-page"
                  className="btn btn-danger"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* container */}
    </section>
  );
};
