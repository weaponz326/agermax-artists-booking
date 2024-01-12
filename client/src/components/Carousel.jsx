export default function Carousel() {
  return (
    <div className="carousel-container">
      <img
        className="carousel-img"
        alt="Rectangle"
        src="/img/rectangle-332-5.png"
      />
      <div className="carousel-title-text">Mike Eriksson</div>
      <div className="carousel-genre">
        <div className="carousel-genre-text">Rock</div>
        <div className="carousel-genre-text">Trubadur</div>
      </div>
      <button className="book-now">Book Now</button>
    </div>
  );
}
