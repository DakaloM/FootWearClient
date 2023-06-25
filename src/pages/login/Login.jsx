import React, { useEffect, useState } from 'react';
import "./login.scss";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useQueries } from 'react-query';
import Message from '../../components/message/Message';

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [displayMessage, setDisplayMessage] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const error = useSelector(state => state.user.error)

  const link = useLocation().search;
  console.log(link)

  useEffect(() => {
      setDisplayMessage(link && true)

      window.setTimeout(() => {
        setDisplayMessage(false)
      }, 4000)

  }, [link])
  

  console.log(displayMessage)

   const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {username, password});

  }

  const user = useSelector(state => state.user.currentUser)
  user !== null && navigate("/?user")

  return (
    <div className='login'>

            <Message complete={displayMessage}
              message="You must be logged in to make a payment"
            />

            <div className="heading">
                <h1 className="title">Login</h1>
                <p className="desc">
                    Login with your credentials below
                </p>
            </div>

            <div className="container display">
              
              <form action="">
                <div className="inputGroup">
                  <label htmlFor="username">Username:</label>
                  <input type="text"  id='username' placeholder='dakalo998'
                  value={username}
                  onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="password">password:</label>
                  <input type="password"  id='password' placeholder='****'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <span className="link">Dont have an account? <Link style={{textDecoration: "none", color: "inherit"}} to="/register"><span>Register here</span></Link></span>
                <div className="inputGroup">
                  <button onClick={handleLogin}>Login</button>
                </div>

                {error && <span className="error">Something went wrong!</span>}

                <div className="demoUser">
                  <span className="text">Demo User</span>
                  <div className="item">
                    <span className="key">Username:</span>
                    <span className="value">dakalo</span>
                  </div>
                  <div className="item">
                    <span className="key">Password:</span>
                    <span className="value">dk970329</span>
                  </div>
                </div>
              </form>
            </div>
      
    </div>
  )
}

export default Login