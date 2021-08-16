import React from 'react'
import './Home.css'
import logo from "../../assets/images/logo.png";

function Home() {
    return (
        <div>
            <img src={logo} alt="תמונה" className="home-logo-img" />
            <div className="text-container">
                <a className="a-opt" href="/find">
                    <div className="text-box">
                        <h4>הכתובת שלך לנופש מושלם!</h4>
                        <br />
                        <p>חשבתם לקחת פסק זמן? לעצור להתרעננות ממרוץ החיים?</p>
                        <p>כאן תמצאו את הנופש האידיאלי עבורכם בתנאים המתאימים לצרכים שלכם!</p>
                        <p>בחרו באפשרות "חיפוש" ומצאו את דירת הנופש המושלמת בשביל בחופשה שלכם,</p>
                        <p>בקלות, במהירות, מהבית וללא עלות!</p>
                        <b>dream vacation - החופשה מהחלומות שלך.</b>
                    </div>
                </a>
                <a className="a-opt" href="/add">
                    <div className="text-box">
                        <h4>המקום הנכון לפרסם את הצימר שלך</h4>
                        <br />
                        <p>יש לכם דירה המיועדת לנופשים?</p>
                        <p>מעוניינים לקבל שוכרים על בסיס רצוף ובלי הוצאות פרסום?</p>
                        <p>בחרו באפשרות "פרסום" והפיצו את הצימר שלכם לקהל יעד של אלפים,</p>
                        <p>בפרסום מיידי וחינמי ובתפוצה נרחבת!</p>
                        <b>dream vacation - הפרסום שתמיד חלמת עליו.</b>
                    </div>
                </a>
            </div>
        </div>
    )
}


export default Home
