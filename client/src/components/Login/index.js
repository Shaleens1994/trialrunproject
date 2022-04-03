import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';



function Login(){
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className=" container loginstyle my-1">
      <Link to="/signup">    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></Link>

      <h2 className=" my-1">Login</h2>
      <form onSubmit={handleFormSubmit} className="my-2">
        <div className=" loginInputDiv my-2">
          <label htmlFor="email">Email address: </label>
          <br />
          <input
            placeholder="ENTER EMAIL"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            size="50"
          />
        </div>
        <div className="loginInputDiv my-1">
          <label htmlFor="pwd">Password:</label><br />
          <input
            placeholder="ENTER PASSWORD"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            size="50"
            
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">INVALID USERNAME/PASSWORD</p>
          </div>
        ) : null}
        <div className="login-btn ">
          <button className="" type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
