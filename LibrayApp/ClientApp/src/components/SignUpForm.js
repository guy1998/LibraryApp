import "../assets/Login.css";
import { Link } from "react-router-dom";


function SignUpForm() {

    return (
        <>
            <form className="form">
                <h2>Sign-Up</h2>
                <div className="sufields">
                    <div className="form-floating mb-3 inputDiv">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name"
                            style={{ backgroundColor: "transparent" }}
                        />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3 inputDiv">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            style={{ backgroundColor: "transparent" }}
                        />
                        <label htmlFor="floatingInput">Surname</label>
                    </div>
                    <div className="form-floating mb-3 inputDiv">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            style={{ backgroundColor: "transparent" }}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating inputDiv">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            style={{ backgroundColor: "transparent" }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <button type="button" className="button2">
                    Sign-up
                </button>
                <h6>Already registered? <Link to="/"><u>Log-in now!</u></Link></h6>
            </form>
        </>
    );

}


export default SignUpForm;