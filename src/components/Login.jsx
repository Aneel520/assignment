import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const Login = ({isLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['accessToken']);

  if(cookies.accessToken){
    return <Navigate to='/' />
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        console.log({ email, password });
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({ email, password }), 
          };
        const res = await fetch('http://localhost:5000/api/login',options)
        if (!res.ok) {
            throw new Error('Login failed');
          }
        
        const data = await res.json();
        setCookie('accessToken', data.accessToken, { path: '/' }); // Set accessToken in cookies
        
    }
    catch(err){
        console.log(err)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
