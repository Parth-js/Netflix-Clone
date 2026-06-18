import React, { useState } from 'react'
import './Login.css'
import logo from  '../../assets/logo.png'
import { db, login, logout, signup } from '../../firebase'

const Login = () => {

  const [signState, setSignState]= useState("Sign In")

  const [name , setName]=useState("");
  const [email , setEmail]=useState("");
  const [password , setPasseord]=useState("");


  const userAuth = async (e) => {
    e.preventDefault();
    if (signState==="Sign In") {
      await login(email,password)
    } else {
      await signup(name,email,password)
      
    }
  }


  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        {/* <h1>Sign Up</h1> */}
        <h1>{signState}</h1>
        <form >

          {signState==="Sign Up"?<input type="text" placeholder='Your Name' value={name} onChange={(e)=>{setName(e.target.value)}} />:<></>} {/* for login page show Name section*/}
          
          <input type="email" placeholder='Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type='password' placeholder='Password'value={password} onChange={(e)=>{setPasseord(e.target.value)}}/>
          <button onClick={userAuth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">

          {signState==="Sign In"?<p >New To Netflix?
             <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          :<p >Already Have Account? 
            <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>

          }
          
          
        </div>
      </div>
    </div>
  )
}

export default Login
