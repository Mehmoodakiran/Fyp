import {TiSocialFacebook} from 'react-icons/ti';
import {AiOutlineLinkedin  } from 'react-icons/ai';
import { AiFillYoutube } from 'react-icons/ai';
import { FaPinterestP } from 'react-icons/fa';
import React from 'react'
import "./footer.css";



const Footer = () => {
  return (
    <div className='footer'>
    <div className="sectionContainer  container grid">
    <div className="gridOne">
      {/* <div className="logoDiv">
        <img src={Logo} className='Logo' alt="" />
      </div> */}
      <p>Your mind should be stronger than your feelings, booking!</p>


    </div>
        <div className="fLists">
            <ul className="fList">
               <li className="fListItem">Home</li>
               <li className="fListItem">Booking</li>
               <li className="fListItem">Check-In</li>
               <li className="fListItem">Manage your Booking</li>
               <li className="fListItem">Hotels</li>
             
            </ul>
            <ul className="fList">
               <li className="fListItem">Countries</li>
               <li className="fListItem">Regions</li>
               <li className="fListItem">Cities</li>
               <li className="fListItem">Districs</li>
               <li className="fListItem">Hotels</li>
             
            </ul>
         
            <ul className="fList">
               <li className="fListItem">Chauffuer</li>
               <li className="fListItem">Destination</li>
               <li className="fListItem">Careers</li>
               <li className="fListItem">Transportation</li>
               <li className="fListItem">Programe Rules</li>
             
            </ul>
            <ul className="fList">
               <li className="fListItem">FAQ</li>
               <li className="fListItem">Features</li>
               <li className="fListItem">How to</li>
               <li className="fListItem">Districs</li>
               <li className="fListItem">Our Communities</li>
             
            </ul>
            </div>
              <div className="socialIcon flex">
    <a href="https://www.facebook.com/Rinor.pakistan">
        <TiSocialFacebook className='icon'/>
    </a>
    <a href="https://www.linkedin.com/company/rinor-pk/mycompany/">
        <AiOutlineLinkedin className='icon'/>
    </a>
    <a href="https://www.youtube.com/your-youtube-profile-link">
        <AiFillYoutube className='icon'/>
    </a>
    <a href="https://www.pinterest.com/your-pinterest-profile-link">
        <FaPinterestP className='icon'/>
    </a>
</div>
        </div>
<div className="copyRightDiv flex">
  <p>Courtesy Design|Developed by <a href="" target='-blank' >Mehmooda Kiran</a></p>
</div>     
</div>
 )
}

export default Footer