import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

  const [formData, setFormData] = useState({
    //set default values
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  //Destructring Formdata values
  const {name, email, password, confirm_password} = formData
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => {state.auth})

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log('change')
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== password){
      toast.error('Password do not match')
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))

    }
    console.log('onSubmit')
  }

  useEffect( () => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <div>
      <section className="heading">
        <h1> <FaUser /> Register</h1>
        <p>Please Create An Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} action="">
          <div className="form-group">
            <input 
              type="text" 
              className="from-control" 
              id="name" 
              name="name"
              value={name}
              placeholder="Enter Your Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="confirm_password" 
              name="confirm_password"
              value={confirm_password}
              placeholder="Confirm Your Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>          
        </form>
      </section>
    </div>
  )
}

export default Register
