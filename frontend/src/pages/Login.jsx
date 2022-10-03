import { FaSignInAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'

function Login() {

  const [formData , setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <section className="heading">
        <h1> <FaSignInAlt /> Login</h1>
        <p>Login And Start Setting Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className='form-control'
              name="email" 
              id="email" 
              placeholder='Enter Your Email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className='form-control'
              name="password" 
              id="password" 
              placeholder='Enter Your Password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-cotrol">
            <button type="submit" className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
