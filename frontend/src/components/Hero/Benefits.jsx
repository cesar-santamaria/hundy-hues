import clickImg from "/assets/click.png"
import shippingImg from "/assets/shipping.png"
import payImg from "/assets/card.png"
import contact from "/assets/contact.png"

export default function Benefits() {
    return (
        <article className="benefitsStripe">
            <div className="benefitsBox">
                <img className='benefitImg1' src={clickImg} alt="Product Image" loading='lazy' />

                <p>Click & Collect</p>
            </div>
            <div className="benefitsBox">
                <img className='benefitImg2' src={shippingImg} alt="Product Image" loading='lazy' />
                <p>Free Shipping</p>
            </div>
            <div className="benefitsBox">
                <img className='benefitImg3' src={payImg} alt="Product Image" loading='lazy' />
                <p>Pay with card</p>
            </div>
            <div className="benefitsBox">
                <img className='benefitImg4' src={contact} alt="Product Image" loading='lazy' />
                <p>Contact us</p>
            </div>
        </article>
    )
}
