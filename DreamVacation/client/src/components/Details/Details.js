import React, { useState, useEffect } from 'react'
import './Details.css'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { getItem, update } from '../../services/serverCommunicate'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'


function Details(props) {

    let id = props.id;

    const [apart, setApart] = useState({});
    const [isLoad, setIsLoad] = useState(false);

    useEffect(async () => {
        let apart = await getItem(id);
        setApart(apart);
    }, [props.id])
    const [rec, setRec] = useState("")

    const saveRec = async () => {
        setIsLoad(true);
        await update(id, rec);
        let apart = await getItem(id);
        setApart(apart);
        setIsLoad(false);
        toast("המלצתך נוספה בהצלחה")
        setRec("");
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal-header">

            </Modal.Header>
            <Modal.Body className="det-window">
                <div className="det-container">
                    <div className="det-image">
                        <img src={apart.img} alt="תמונה" />
                    </div>
                    <div className="det-item">
                        <h3 className="location">{apart.location}</h3>
                        <h4 className="detailed">{apart.beds_num} מיטות</h4>
                        <div className="detailed">
                            <h6>מחיר ללילה: </h6>
                            <p>{apart.price_per_night}</p>
                            <h6>מחיר לסוף שבוע:</h6>
                            <p>{apart.price_per_shabat}</p>
                            {(apart.additions != "") && <h6>הערות והוספות: </h6>}
                            <p>{apart.additions}</p>
                        </div>
                        <div className="detailed">
                            {(apart.recommendations != undefined) && (apart.recommendations.length != 0) && <h6>המלצות: </h6>}
                            <p>
                                {(apart.recommendations != undefined) && apart.recommendations.map((rec) => {
                                    return (<div>
                                        {rec}
                                        <br />
                                    </div>)
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>לפרטים נוספים והזמנת הצימר: </h5>
                    <p>
                        {apart.email}
                        <br />
                        {apart.phone}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <form className="rec-form">
                    <label className="rec-label" htmlFor="rec"> נהניתם כאן? השאירו המלצה לנופשים אחרים</label>
                    <input className="rec-input" id="rec" type="text" value={rec} onChange={(event => { setRec(event.target.value) })}></input>
                </form>
                <button className="send-rec" type="button" onClick={saveRec}>שלח</button>
                <div className="loading-icon-rec"> {isLoad && <FontAwesomeIcon icon={faHome} spin />}</div>
                <Button className="close-button" onClick={props.onHide}>סגור</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default Details
