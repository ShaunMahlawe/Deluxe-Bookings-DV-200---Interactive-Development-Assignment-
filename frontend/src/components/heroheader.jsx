import Joinbutton from '../Assets/images/buttoniconjoin.png'
import circularText from '../Assets/images/circularText.png'

function HeroHeader() {
  return (
  <div className='heroImage'>

    <div className='row container-fluid'>

      <div className='col-lg-6'>
      <p className='m-plus-rounded-1c-black herotext marginBody'>Luxury Without Compromise</p>

        <div className='herocard m-plus-rounded-1c-bold marginBody'>
            <p> Showcase your property to the world's most discerning travellers. We don't just list hotels; we curate experiences for a global audience that values quality over quantity.</p>
            <button className='primaryButton inter-regular buttontext col-4'>Apply to join 
              <img src={Joinbutton} alt="plus icon" className='joinButton'/>
              </button>
            </div>
          </div>
      
      <div className='col-lg-6'>
            <img src={circularText} alt="plus icon" className='circularText'/>
      </div>
      </div>

    </div>
  )
}

export default HeroHeader;