import React from 'react'
import './About.css'
import Card from 'react-bootstrap/Card'
import { Button } from "react-bootstrap";
import ReactBootstrap, { Nav } from 'react-bootstrap'
import logo from "../../assets/images/logo.png";

export default function About() {
    return (
        <div className="about-div">
            <img src={logo} alt="תמונה" className="about-logo-img" />
            <p>
                כאן המקום שלך לפרסם דירות וצימרים לאירוח ולחשוף אותם לאלפי משתמשים תוך פרסום רב ודילים משתלמים.
            </p>
            <p>
                זה גם המקום לכל המחפשים דירות נופש במפרט גבוה הנבדקות מעת לעת על ידי צוות אחראי ומקצועי שלנו.
            </p>
            <p>
                לכל שאלה, פניה או הארה, צוות "דרים וקיישן" כאן איתכם!
            </p>
            <p>צרו איתנו קשר:</p>
            <p className="email">
                support@dreamvacation.com
            </p>
            <h2>חופשה נעימה</h2>
            <br />
            <h6><a className="policy-link" href="/policy">מדיניות ופרטים</a></h6>
        </div>
    )
}
