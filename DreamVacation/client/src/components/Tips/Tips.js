import { React, useEffect, useState } from 'react'
import './Tips.css'
import { get, insertTip } from "../../services/serverCommunicate"
import { toast } from 'react-toastify';

function Tips() {

    const [tips, setTips] = useState([]);
    const [tip, setTip] = useState("")

    useEffect(async () => {
        let data = await get("tips");
        setTips(data);
    }, []);

    const saveTip = async () => {
        await insertTip(tip);
        toast("הטיפ שלך נשמר בהצלחה!");
        let data = await get("tips");
        setTips(data);
        setTip("");
    }

    return (
        <div className="tip-page">
            <div className="tips-title">
                <h3>הטיפים שלכם לנופש מושלם</h3>
                <h4>רשימת הטיפים הגדולה לחופשה חלומית, נערכת על ידי משתמשים מכל אזורי הארץ</h4>
            </div>
            <div className="all-tips">
                {tips.map((item) => {
                    return (
                        <div>
                            <h5> - {item.tip}</h5>
                        </div>
                    )
                })}
            </div>
            <div className="tips-footer">
                <label htmlFor="tipInput">הוסיפו כאן טיפ משלכם! </label>
                <input type="text" id="insertTip" className="tip-input" onChange={(e) => setTip(e.target.value)} value={tip} />
                <button type="submit" className="save-tip" onClick={async () => { await saveTip() }}>שמור</button>
            </div>
        </div>
    )
}

export default Tips
