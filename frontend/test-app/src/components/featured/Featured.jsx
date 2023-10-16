import "./featured.css";
import IMG from "../../Images/img2.jpg";
import img from "../../Images/img3.jpg";
import useFetch from "../../hooks/useFetch.js";
const Featured = () => {
  // const { data, loading, error } = useFetch("/hotels/countByCity?cities=Skardu,Khapulu,Astanaa");
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=Skardu,Khapulu,Astanaa");

  console.log(data)

return (
  <div className="featured">
    {loading ? (
      "Loading please wait"
    ) : (
      <>
        <div className="featuredItem">
        <img
        src={IMG}
        alt="Image"
        className="featuredImg"/>
          <div className="featuredTitles">
            <h1>Skardu</h1>
            <h2>{data[0]} properties</h2>
          </div>
        </div>

        <div className="featuredItem">
        <img
        src={img}
        alt="Image"
        className="featuredImg"/>
          <div className="featuredTitles">
            <h1>Khapulu</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
        <img
        src={IMG}
        alt="Image"
        className="featuredImg"/>
          <div className="featuredTitles">
            <h1>Astanaa</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
      </>
    )}
  </div>
);
};

export default Featured;
