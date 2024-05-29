const EventList: React.FC = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div
        className="single-features text-center mt-30 wow fadeIn"
        data-wow-duration="1s"
        data-wow-delay="0s"
      >
        <div className="features-icon">
          <i className="lni-microphone" />
          <span>01</span>
        </div>
        <div className="features-content">
          <h4 className="features-title">
            <a href="#">Great Speakers</a>
          </h4>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor dunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventList;
