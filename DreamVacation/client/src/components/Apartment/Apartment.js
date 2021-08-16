import React, { useEffect, useState } from 'react'
import './Apartment.css'
import Details from '../Details/Details'
import { getItem } from '../../services/serverCommunicate.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function Apartment(props) {
    const [modalShow, setModalShow] = useState(false);
    const [apart, setApart] = useState({});
    const [aid, setAid] = useState(props.id);

    useEffect(async () => {
        let apart = await getItem(props.id);
        setApart(apart);
    }, [])

    useEffect(async () => {
        let apart = await getItem(props.id);
        setApart(apart);
        setAid(props.id);
    }, [props.id])

    return (
        <div>
            <div className="apart" onClick={() => { setModalShow(true); }}>
                {apart.img != null && <>
                    <img src={apart.img} alt="תמונה" />
                    <p className="basic">
                        {apart.location}
                        <br />
                        {apart.beds_num} מיטות
                    </p>
                </>}
                {apart.img == null && <div className="loading-icon-find"><FontAwesomeIcon icon={faHome} spin /></div>}
            </div>

            {<Details
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={aid}
            />}
        </div>

    )
}

export default Apartment