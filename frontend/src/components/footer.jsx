import FooterImage from "../Assets/images/FooterImage.png"
import Logo from "../Assets/images/Logo.png"
import { /* BrowserRouter, Routes, Route,*/ Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
        <div className='row container-fluid'>

        <div className='col-lg-7'>
            <h1 className='inter-bold footerHeading'>Engage with Us in Conversation</h1>
            <p className='inter-bold footerText'>In a global world based on communication, a premium hospitality brand must look beyond its borders, open up to new experiences, and dare to be different. Meeting the brightest minds of one's time is the most effective way to nurture creativity and trust.</p>
        </div>

        <div className='col-lg-5'>
            <img src={FooterImage} alt="House with swimming pool" className="footerimage"/>
        </div>

        </div>

        <div className='row container-fluid'>

            <div className='col-lg-3 marginFooter'>
                <p className='inter-bold footerText'>About Us</p>

                <p className="inter-regular footerPageLinks">Our Story</p>
                <p className="inter-regular footerPageLinks">Vetting Process</p>
                <p className="inter-regular footerPageLinks">Sustainability</p>
                <p className="inter-regular footerPageLinks">Careers</p>
                <p className="inter-regular footerPageLinks">Contact</p>
            </div>

            <div className='col-lg-3'>
                <p className='inter-bold footerText'>Customer Service</p>

                <p className="inter-regular footerPageLinks">Prices and Payments</p>
                <p className="inter-regular footerPageLinks">Booking Policy</p>
                <p className="inter-regular footerPageLinks">Return & Cancellation</p>
                <p className="inter-regular footerPageLinks">Terms of Service</p>
                <p className="inter-regular footerPageLinks">Privacy Policy </p>

            </div>

            <div className='col-lg-2'>
                <p className='inter-bold footerText'>Social Media</p>

                <p className="inter-regular footerPageLinks">Instagram</p>
                <p className="inter-regular footerPageLinks">Facebook</p>
                <p className="inter-regular footerPageLinks">LinkedIn</p>
                <p className="inter-regular footerPageLinks">X (Twitter)</p>
            </div>

            <div className='col-lg-3'>
                <Link to="/"><img src={Logo} alt="Deluxe Bookings logo" className="footerimage"/></Link>
            </div>

        </div>

    </footer>
  )
}

export default Footer;