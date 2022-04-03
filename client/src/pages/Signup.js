import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import rsvp from '../assets/fur.png';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        phoneNumber:formState.phoneNumber
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
    <div className="container my-4 signupHeaderWrapper">
      <div>
  
      <Link to="/login" >    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></Link></div>
      <h2 className=" signUpTitle my-1">SIGN UP</h2>
    </div>

    <div className="container signupWrapper my-4">
    <img className="container rsvp-image mx-3" src={rsvp} alt="rsvp with us"></img>
      <form className=" mx-1" onSubmit={handleFormSubmit}>

        <div className="  my-1">
          <label htmlFor="firstName">FIRST NAME </label>
          <br />
          <input
          className="main-search-input-field"
            placeholder=""
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
            size="50"
          />
        </div>
        <div className="  my-2">
          <label htmlFor="lastName">LAST NAME</label> <br />
          <input
          className="main-search-input-field"
            placeholder=""
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
            size="50"
          />
        </div>
        <div className="  my-2">
          <label htmlFor="email">EMAIL</label> <br />
          <input
          className="main-search-input-field"
            placeholder=""
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            size="50"
          />
        </div>
        <div className="  my-2">
          <label htmlFor="pwd">PASSWORD </label> <br />
          <input
          className="main-search-input-field"
          size="50"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="  my-2">
          <label htmlFor="phoneNumber">ADD PHONE NUMBER </label> <br />
          <input
          className="main-search-input-field"
            placeholder="000-000-0000"
            name="phoneNumber"
            type="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
            size="50"
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Signup;
