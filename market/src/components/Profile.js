import {React, useState} from 'react'
import axios from 'axios'


export default function Profile() {
    if(sessionStorage.getItem('User_data') == null) {
        window.location.href = 'http://localhost:3000/login/';
    }

    const {ethereum} = window;

    const user_data = sessionStorage.getItem('User_data');
    const [username, setUsername] = useState(JSON.parse(user_data).username)
    const [money, setMoney] = useState(JSON.parse(user_data).money)
    const [add, setAdd] = useState(0)
    const [hash, setHash] = useState('')
    const [block, setBlock] = useState([])
    const [data, setData] = useState([])

    
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

    function checkblocks() {
        axios.post('http://localhost:5000/checkblock', {
            hash: hash
        }).then(res => {
            // do boostrap 5 table for show data
            console.log(res.data);
            setBlock(<div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Block Number</th>
                            <th scope='col'>Timestamp</th>
                            <th scope='col'>Hash</th>
                            <th scope='col'>item</th>
                            <th scope='col'>seller</th>
                            <th scope='col'>buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{res.data.index}</td>
                            <td>{res.data.timestamp}</td>
                            <td>{res.data.hash}</td>
                            <td>{res.data.item}</td>
                            <td>{res.data.seller}</td>
                            <td>{res.data.buyer}</td>
                        </tr>
                    </tbody>
                </table>
            </div>)
          
        });
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
            <div className='d-flex justify-content-end'>
                <br/>
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
                <div className='container'>
                <br/>
                
                <div className='row'>
                <label className='form-label'>Check Hash</label><br/>
                <input type='text' className='form-control' onChange={e => setHash(e.target.value)}/><br/>
                </div>
                <br/>
                <button className='btn btn-primary' onClick={checkblocks}>Check</button><br/><br/>
                {block}
                </div>
            </div>
            
        </div>
    )
}
