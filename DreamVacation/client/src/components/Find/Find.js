import React, { useState, useEffect } from 'react'
import AllAparts from './../AllAparts/AllAparts'
import './Find.css'
import { get } from '../../services/serverCommunicate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function Find() {
    const [supply, setSupply] = useState([]);
    const [filtered, setFiltered] = useState(null);
    const [default_value, set_default_value] = useState({ location: "", })

    useEffect(async () => {
        let data = await get("apartments");
        setSupply(data);
        setFiltered(data);
    }, []);

    const search_term = (element) => {
        if (default_value.location == "") return true;
        return element.location == default_value.location;
    }


    const search = () => {
        let newFiltered = supply.filter(search_term);
        setFiltered(newFiltered);
    }

    const change_value = (event) => {
        set_default_value({
            ...default_value, [event.target.id]: event.target.value
        })
    }

    return (
        <div className="find-container">
            <form>
                <div className="field">
                    <input id="location" type="text" onChange={change_value} value={default_value.location} placeholder="חפש לפי שם עיר או יישוב" />
                    <button type="button" onClick={search} className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>

            {filtered != null && <AllAparts list={filtered} />}
            {filtered == null && <div className="loading-icon-find"><FontAwesomeIcon icon={faHome} spin /></div>}
        </div>)

}
export default Find