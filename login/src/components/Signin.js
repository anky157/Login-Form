import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Keyss from "../Images/KEY.svg"
import Line from "../Images/Line 15.svg"
import Logo from "../Images/Logo.svg"
import WhiteLogo from "../Images/White Logo.svg"
import Mail from "../Images/mail.svg"
import Object from "../Images/Object 3D.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (validate()) {
            axios.post('http://staging.console.api.credin.in/api/auth/login',
                {
                    email: email,
                    password: password
                })
                .then(res => {
                    if (res.data.auth === false) {
                        toast.error(res.data.msg)
                    }
                    else {
                        toast.success('Login Successful')
                        localStorage.setItem('TOKEN', res.data.token)
                        localStorage.setItem('EMAIL', res.data.email)
                        setTimeout(() => {
                            navigate('/')
                        }, 3000);
                    }

                }).catch(err => {
                    toast.error('Login Failed due to :' + err.message);
                })
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.error('Please Enter Email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.error('Please Enter Password');
        }
        return result;
    }

    return (
        <div className="main-div">

            <div className="bg-blue">

                <div className="bg-content">
                    <h1>Welcome!</h1>
                    <p>To the Credin Control Panel</p>
                </div>

                <div className="white-logo">
                    <img src={WhiteLogo} className="white-logo" alt="object logo" />
                </div>

                <div className="object-image">
                    <img src={Object} className="object-image" alt="object logo" />
                </div>

                <div className="bg-content-two">
                    <h1>Welcome!</h1>
                    <p>To the Credin Control Panel</p>
                </div>

            </div>

            <div className="right-form">

                <div className="wrapper">

                    <div className="logo">
                        <img src={Logo} className="logo-one" alt="credIn logo" />
                    </div>

                    <div className="input-fields">

                        <img src={Mail} className="mail-img" alt="credIn logo" />
                        <img src={Line} className="line-img-one" alt="credIn logo" />

                        <input placeholder="Input your Email" onChange={(e) => { setEmail(e.target.value) }} value={email} className="inputs place-holder" type="email" /> <br /> <br />

                        <img src={Keyss} className="Keyss-img" alt="credIn logo" />
                        <img src={Line} className="line-img-two" alt="credIn logo" />

                        <input placeholder="Input your password" onChange={(e) => { setPassword(e.target.value) }} value={password} className="inputs input-height place-holder" type="password" /> <br /> <br />

                        <button type="submit" onClick={handleSubmit} className="btns"> LOG IN </button>

                        <div className="login-footer">
                            <p className="para">Version 1.0.1(201.4)</p>
                            <p className="para-reserved">All right reserved  &copy; Upkram Technology Pvt. Ltd.@2022</p>
                        </div>

                        <ToastContainer />

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Signin;




