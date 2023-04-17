import {React, useState} from 'react'
import axios from 'axios'


export default function Profile() {
    if(sessionStorage.getItem('User_data') == null) {
        window.location.href = 'http://localhost:3000/login/';
    }
    const user_data = sessionStorage.getItem('User_data');
    const [username, setUsername] = useState(JSON.parse(user_data).username)
    const [money, setMoney] = useState(JSON.parse(user_data).money)
    const [add, setAdd] = useState(0)

    function addMoney(value) {
        
        setMoney(parseFloat(money) + parseFloat(value));
        axios.post('http://localhost:5000/updateMoney', {
            username: username,
            money: money
        }).then(res => {
            console.log(res.data);
        });


        //update session storage
        let user = JSON.parse(user_data);
        user.money = money;
        sessionStorage.setItem('User_data', JSON.stringify(user));
    }
    
    function logout() {
        sessionStorage.removeItem('User_data');
        window.location.href = '/login';
    }


    
    return (
        <div>
            <div className='container'>
                <br/>
                <center>
                    <h1>Profile</h1>
                </center>
                <div className='d-flex justify-content-end'>
            <button type='button' className='btn btn-danger' onClick={logout}>logout</button>
            </div>
                <br/>
                <div className='row'>
                        <label className='form-label'>Username</label>
                        <input type='text' className='form-control' id=''
                            value={username}
                            disabled/>
                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control' id='' value='********' disabled/>
                        <label className='form-label'>Money</label>
                        <input type='text' className='form-control' id=''
                            value={money}
                            disabled/>
                </div>
                <br/>
                <button className='btn btn-primary' onClick={()=> {addMoney(100)}}>add 100</button> &nbsp;
                <button className='btn btn-danger' onClick={()=> {addMoney(500)}}>add 500</button>&nbsp;
                <button className='btn btn-dark' onClick={()=> {addMoney(1000)}}>add 1000</button>&nbsp;
            </div>
        </div>
    )
}
