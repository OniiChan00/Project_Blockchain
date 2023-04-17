import Nav_Bar from './Nav_Bar'
import {useState, React} from 'react'
import axios from 'axios'

export default function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()


    const register = () => {
        if (username  === '' || password === '') {
            setError (
                <div className='alert alert-danger' role='alert'>Please fill in all fields</div>
            )
        } else {
            axios.post('http://localhost:5000/register', {
                username: username,
                password: password
            }).then(res => {
                console.log(res.data)
                if (res.data === 23000) {
                    // return username already exists
                    setError (
                        <div className='alert alert-danger' role='alert'>Username already exists</div>
                    )
                    ;
                }
                else{
                    setError (<div className='alert alert-success' role='alert'>Successfully registered</div>)
                    window.location.href = 'http://localhost:3000/login/'
                }

            });
        }

    };
    console.log(username);
    console.log(password);

    return (
        <div>
            <div className='container'>
                <br/>
                <center>
                    <h1>
                        Register
                    </h1>
                </center>
                <form>
                    <div className='mb-3'>
                        {error}
                        <label className='form-label'>Username</label>
                        <input type='text' className='form-control'
                            onChange={
                                e => setUsername(e.target.value)
                            }/>
                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control'
                            onChange={
                                e => setPassword(e.target.value)
                            }/><br/>
                        <button className='btn btn-primary' type="button"
                            onClick={register}>Submit</button>
                    </div>
                </form>
                <label className='form-label>'>already have an account?</label>
                <a href='http://localhost:3000/login/'>Login</a>
            </div>
        </div>
    )
}
