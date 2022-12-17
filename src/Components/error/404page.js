import React from "react";
import "./style.css";

const NotFoundPage = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1
                  style={{
                    fontSize: "100px",
                  }}
                  className="text-center "
                >
                  404
                </h1>
              </div>

              <div className="contant_box_404">
                <h1 className="error-message">Look like you're lost</h1>

                <p>the page you are looking for not avaible!</p>

                <a href="/" className="link_404">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
