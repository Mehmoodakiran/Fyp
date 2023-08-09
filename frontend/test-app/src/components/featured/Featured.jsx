import "./featured.css";
import IMG from "../../Images/img2.jpg";
import img from "../../Images/img3.jpg";
const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src={IMG}
          alt="Image"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1></h1>
          <h2></h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src={img}
          alt="Image"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1></h1>
          <h2></h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src={IMG}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1></h1>
          <h2></h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
