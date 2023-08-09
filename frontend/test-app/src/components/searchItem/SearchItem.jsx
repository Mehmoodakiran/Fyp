import "./searchItem.css";
import img from "../../Images/mountv214.jpg";
const SearchItem = () => {
  return (
    <div className="searchItem">
        <img src={img} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Tower Street Apartment</h1>
        <div className="siDistance">500m from center</div>
        <span className="siTaxiOp"> Free Airport taxi</span>
        <span className="siSubtitle">Studio Apartment with Air Conditioning</span>
        <span className="siFeature">  Entire studio • 1 bathroom •  1 full bed</span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later,so lock in this great price today!
        </span>
        
      </div>

      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Price 500</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
      
    </div>
    
    
  );
};

export default SearchItem;
