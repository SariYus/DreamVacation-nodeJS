import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home'
import Find from './components/Find/Find'
import Add from './components/Add/Add'
import Error404 from './components/Error404/Error404'
import About from './components/About/About'
import Tips from './components/Tips/Tips'
import Policy from './components/Policy/Policy'
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./assets/images/logo.png";


function App() {

    const [isShabbos, setIsShabbos] = useState(false);

    useEffect(async () => {
        chaeckIsShabbos();
    }, [])

    function chaeckIsShabbos() {
        let date = new Date();
        let day = date.getDay();
        let hour = date.getHours();
        if ((day == 5 && hour > 19) || (day == 6 && hour < 20)) setIsShabbos(true);
        else setIsShabbos(false);
        return;
    }

    return (
        <div className="App">
            <ToastContainer position="bottom-right" />
            {!isShabbos &&
                <Router>
                    <nav >
                        <div >
                            <ul className="mynav">
                                <li >
                                    <Link to="/">בית</Link>
                                </li>
                                <li >
                                    <Link to="/about">אודות</Link>
                                </li>
                                <li >
                                    <Link to="/find">חיפוש</Link>
                                </li>
                                <li >
                                    <Link to="/add">פרסום</Link>
                                </li>
                                <li >
                                    <Link to="/tips">טיפים</Link>
                                </li>
                                <li className="logo-li">
                                    <img src={logo} alt="תמונה" className="logo-img" />
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/find">
                            <Find />
                        </Route>
                        <Route path="/add">
                            <Add />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/tips">
                            <Tips />
                        </Route>
                        <Route path="/policy">
                            <Policy />
                        </Route>
                        <Route exact>
                            <Error404 />
                        </Route>
                    </Switch>
                </Router>}
            {
                isShabbos &&
                <div className="container1">
                    <h4>אתר זה סגור בשבת</h4>
                    <p>
                        משתמש יקר, שמירת שבת הינה ערך עליון, ועל כן הוא חסום כעת.
                    </p>
                    <p>
                        נשמח לשרת אתכם לאחר השבת.
                    </p>
                    <p>
                        <a href="https://www.hidabroot.org/%D7%A9%D7%91%D7%AA" target="_blank">לפרטים נוספים</a>
                    </p>
                </div>
            }
        </div>
    );
}

export default App;
