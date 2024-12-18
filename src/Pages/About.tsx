import React from "react";

const About = () => {
  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{
          backgroundImage: "url('src/images/bg-01.jpg') ",
        }}
      >
        <h2 className="ltext-105 cl0 txt-center">About</h2>
      </section>
      <section className="bg0 p-t-75 p-b-120">
        <div className="container">
          <div className="row p-b-148">
            <div className="col-md-7 col-lg-8">
              <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                <h3 className="mtext-111 cl2 p-b-16">Our Story</h3>
                <p className="stext-113 cl6 p-b-26">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris consequat consequat enim, non auctor massa ultrices
                  non. Morbi sed odio massa. Quisque at vehicula tellus, sed
                  tincidunt augue. Orci varius natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Maecenas varius
                  egestas diam, eu sodales metus scelerisque congue.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Maecenas gravida justo eu
                  arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum
                  eget, dictum enim. Donec non neque ut enim dapibus tincidunt
                  vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec
                  condimentum euismod tortor, eget facilisis diam faucibus et.
                  Morbi a tempor elit.
                </p>
                <p className="stext-113 cl6 p-b-26">
                  Donec gravida lorem elit, quis condimentum ex semper sit amet.
                  Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut
                  fringilla turpis in vehicula vehicula. Pellentesque congue ac
                  orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a
                  arcu facilisis, eu sodales lectus sagittis. Etiam
                  pellentesque, magna vel dictum rutrum, neque justo eleifend
                  elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut
                  commodo efficitur, quam velit convallis ipsum, et maximus enim
                  ligula ac ligula.
                </p>
                <p className="stext-113 cl6 p-b-26">
                  Any questions? Let us know in store at 8th floor, 379 Hudson
                  St, New York, NY 10018 or call us on (+1) 96 716 6879
                </p>
              </div>
            </div>
            <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
              <div className="how-bor1">
                <div className="hov-img0">
                  <img alt="IMG" src="src/images/about-01.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
              <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                <h3 className="mtext-111 cl2 p-b-16">Our Mission</h3>
                <p className="stext-113 cl6 p-b-26">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
                  consequatur nesciunt soluta reiciendis ullam deleniti nobis
                  vel eos beatae dolorum tenetur tempore magni qui accusamus
                  incidunt aliquam, commodi amet quibusdam! Exercitationem sint,
                  delectus quae eaque soluta in minus, harum eos aperiam aut
                  expedita, et consectetur. Eligendi quisquam necessitatibus,
                  neque ab quidem, accusantium repellat id nesciunt a eveniet
                  maxime veniam mollitia. Quas atque sit minus omnis suscipit
                  maiores impedit laboriosam ducimus placeat magnam, nulla
                  adipisci nobis culpa vel maxime labore consequuntur reiciendis
                  exercitationem eius. Cum quis excepturi, accusantium vel
                  aliquid dolor?
                </p>
                <div className="bor16 p-l-29 p-b-9 m-t-22">
                  <p className="stext-114 cl6 p-r-40 p-b-11">
                    Creativity is just connecting things. When you ask creative
                    people how they did something, they feel a little guilty
                    because they didn't really do it, they just saw something.
                    It seemed obvious to them after a while.
                  </p>
                  <span className="stext-111 cl8">- Steve Job’s</span>
                </div>
              </div>
            </div>
            <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
              <div className="how-bor2">
                <div className="hov-img0">
                  <img alt="IMG" src="src/images/about-02.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
