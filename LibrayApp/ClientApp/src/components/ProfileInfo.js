import "../assets/profileInfo.css";

function ProfileInfo({ admin }) {

    return (
        <>
            <aside className="profileSide">
                <h1>Hello {admin.name}</h1>
                <img className="profilePic" src="../images/dreamworld with 1 (1).png"></img>
                <h4>Personal infromation</h4>
                <div className="personalBox">
                    <div className="col-3">
                        <input className="effect-7" type="text" placeholder="Name" defaultValue={admin.name} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <div className="col-3">
                        <input className="effect-7" type="text" placeholder="Surname" defaultValue={admin.surname} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <div className="col-3">
                        <input className="effect-7" type="text" placeholder="Username" defaultValue={admin.username} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </div>
                <button className="passButton">Change your password</button>
                <div className="settings">
                    <div className="toggle">
                        <input type="checkbox" id="toggle" />
                        <label htmlFor="toggle"></label>
                    </div>
                    <ul className="help">
                        <li className="helpIcon"></li>
                        <li>Help</li>
                    </ul>
                </div>
            </aside>
        </>
    );

}

export default ProfileInfo;