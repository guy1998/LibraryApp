import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import "../assets/styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function InitialPage() {
    return (
        <>
            <Router>
                <div className='appContainer'>
                    <Routes>
                        <Route path="signup" element={<SignUpForm />}></Route>
                        <Route path='/' element={<LoginForm />}></Route>
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default InitialPage;