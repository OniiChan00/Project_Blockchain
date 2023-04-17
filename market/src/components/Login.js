import Nav_Bar from './Nav_Bar'
import { useState, React } from 'react'
import axios from 'axios'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')

    const login = () => {
        axios.post('http://localhost:5000/login', {
            username: username,
            password: password
        }).then(res => {
            setData(res.data)
            console.log(res.data);
            if(res.data != 0){
                alert('Login Successful');
                sessionStorage.setItem('User_data', JSON.stringify(res.data[0]));
                window.location.href = 'http://localhost:3000/inventory/';
            }

        });
    };
    console.log(username);
    console.log(password);

  if(sessionStorage.getItem('User_data') != null){
    window.location.href = 'http://localhost:3000/inventory/';
  }
  else{
  return (
    <div>
        <div className='container'>
        <br/>
        <center><h1> Login </h1></center>
        <form>
            <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input type='text' className='form-control' id=''  onChange={e => setUsername(e.target.value)}/>
                <label className='form-label'>Password</label>
                <input type='password' className='form-control' id=''  onChange={e => setPassword(e.target.value)}/><br/>
                <button className='btn btn-primary' type="button" onClick={login}>Submit</button>
                <br/><br/><br/>
                <label className='form-label>'>Don't have an account?</label>
                <a href='http://localhost:3000/register/'>Register</a>
            </div>
        </form>
    </div>
    </div>
  )
}
}