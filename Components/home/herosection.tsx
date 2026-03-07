const Herosection = () => {
  return (
    <div className='hero-container banner-img'>
      <div className='hero-content container ps-lg-5'>
        <div className='row '>
          <div className="col-md-8 col-lg-6 ps-lg-3">
            <h1 className='hero-title'>
              QuickBite - Food Delivered Fast!
            </h1>
            <p className='hero-description'>
              Get your favorite meals delivered to your doorstep in minutes. QuickBite connects you with the best restaurants in your city for a fast, convenient, and delicious dining experience.
            </p>
            <div className='hero-buttons d-flex gap-3'>
              <button className='btn btn-primary btn-lg px-4 py-2 rounded-pill fw-bold'>
                Order Now
              </button>
              <button className='btn btn-outline-light btn-lg px-4 py-2 rounded-pill'>
                Learn More
              </button>
            </div>
            <div className='hero-subtext mt-4'>
              <small>Join 1M+ satisfied customers enjoying QuickBite</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Herosection;