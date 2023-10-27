import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item,photos }) => {
  console.log("items photo", item.photos)
  return (
    <div className="searchItem">
      {photos && photos.length > 0 ? (
        <img src={photos[0]} alt="alt text" className="siImg" />
      ) : (
        <p>No photos available</p> // Add a message if there are no photos
      )}
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
// import "./searchItem.css";
// import img from "../../Images/mountv214.jpg";
// const SearchItem = () => {
//   return (
//     <div className="searchItem">
//         <img src={img} alt="" className="siImg" />
//       <div className="siDesc">
//         <h1 className="siTitle">Tower Street Apartment</h1>
//         <div className="siDistance">500m from center</div>
//         <span className="siTaxiOp"> Free Airport taxi</span>
//         <span className="siSubtitle">Studio Apartment with Air Conditioning</span>
//         <span className="siFeature">  Entire studio • 1 bathroom •  1 full bed</span>
//         <span className="siCancelOp">Free Cancellation</span>
//         <span className="siCancelOpSubtitle">
//           You can cancel later,so lock in this great price today!
//         </span>
        
//       </div>

//       <div className="siDetails">
//         <div className="siRating">
//           <span>Excellent</span>
//           <button>8.9</button>
//         </div>
//         <div className="siDetailTexts">
//           <span className="siPrice">Price 500</span>
//           <span className="siTaxOp">Includes taxes and fees</span>
//           <button className="siCheckButton">See availability</button>
//         </div>
//       </div>
      
//     </div>
    
    
//   );
// };

// export default SearchItem;
