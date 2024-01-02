import React, { Component } from 'react';
import '../styles/Navbar.css';


class Cards extends Component {
  render() {

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4 hot">Hot artists</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <img src="" alt="" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Mike Eriksson</h5>
                  <div className="d-flex custom-badge">
                    <div className="badge">Rock</div>
                    <div className="badge">Trubadur</div>
                  </div>
                  <button className="button-custom">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cards;
