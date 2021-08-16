import React, { useState } from 'react'
import { are_values_valid } from "../../shared/validation"
import { insert } from "../../services/serverCommunicate"
import './Add.css'
import { log } from 'util';
import { toast } from 'react-toastify';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

function Add(props) {

    const [default_value, set_default_value] = useState({
        location: "",
        price_per_night: "",
        price_per_shabat: "",
        beds_num: "",
        additions: "",
        img: "",
        phone: "",
        email: ""
    })

    const change_value = (event) => {
        set_default_value({
            ...default_value,
            [event.target.id]: event.target.value
        })
    }

    const submit = async (event) => {
        if (!(are_values_valid(default_value))) {
            event.preventDefault();
        }
        else {
            event.preventDefault();
            await insert(default_value);
            toast("הנתונים הועלו בהצלחה");
            set_default_value({
                location: "",
                price_per_night: "",
                price_per_shabat: "",
                beds_num: "",
                additions: "",
                img: "",
                phone: "",
                email: ""
            })
        }
    }

    return (
        <div className="add-div">
            <form onSubmit={submit}>
                <div className="field">
                    <input id="location" type="text" onChange={change_value} value={default_value.location} placeholder="יישוב" />
                </div>
                <div className="field">
                    <input id="price_per_night" type="text" onChange={change_value} value={default_value.price_per_night} placeholder="מחיר ללילה" />
                </div>
                <div className="field">
                    <input id="price_per_shabat" type="text" onChange={change_value} value={default_value.price_per_shabat} placeholder="מחיר לסוף שבוע" />
                </div>
                <div className="field">
                    <input id="beds_num" type="text" onChange={change_value} value={default_value.beds_num} placeholder="מספר המיטות" />
                </div>
                <div className="field">
                    <input id="additions" type="text" onChange={change_value} value={default_value.additions} placeholder="תוספות והערות" />
                </div>
                <div className="field">
                    <input id="phone" type="text" onChange={change_value} value={default_value.phone} placeholder="מספר טלפון" />
                </div>
                <div className="field">
                    <input id="email" type="text" onChange={change_value} value={default_value.email} placeholder="דואר אלקטרוני" />
                </div>
                <div className="file-input">
                    {default_value.img != "" && <img src={default_value.img} className="choose-img" />}
                    <label className="custom-file-upload">
                        <input
                            className="file-input-button"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);

                                reader.onload = () => {
                                    set_default_value({
                                        ...default_value,
                                        img: reader.result
                                    })
                                };
                            }}
                        />
                        העלה תמונה
                    </label>
                </div>
                <br />
                <button type="submit" className="button">אישור</button>
            </form>
        </div>
    )
}

export default Add