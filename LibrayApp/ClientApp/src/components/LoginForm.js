import "../assets/Login.css";
import {Link} from 'react-router-dom';


function LoginForm() {
  return (
    <>
      <form className="form">
        <h1>My library app</h1>
        <h2>Log-In</h2>
        <div className="fields">
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
        <button type="button" className="button">
          Log-in
        </button>
        <h6>You do not have an account? <Link to="signup"><u>Sign-up now!</u></Link></h6>
      </form>
    </>
  );
}

export default LoginForm;
