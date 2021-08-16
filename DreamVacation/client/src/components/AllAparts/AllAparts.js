import React, { useState, useEffect } from 'react'
import Apartment from '../Apartment/Apartment.js';
import './AllAparts.css'


export default function AllAparts(props) {
    const [aparts, setAparts] = useState(props.list);

    useEffect(() => {
        setAparts(props.list);
    }, [props.list])

    return (
        <div>
            {aparts != undefined &&
                <div className="ap-container">
                    {(aparts.length == 0) && <h2 className="not-found">לא נמצאו תוצאות.</h2>}
                    {aparts.map((item) => {
                        return <Apartment id={item.id} />
                    })}

                </div>}
        </div>
    )
}
