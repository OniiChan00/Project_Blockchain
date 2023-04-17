import React, { useEffect,useState } from 'react'
import Nav_Bar from './Nav_Bar'
import Item from './Item';
import './all.css'
import axios from 'axios';

export default function Inventory() {
    const user_data = sessionStorage.getItem('User_data');
    const [username, setUser] = useState(JSON.parse(user_data).username);
    const [data, setData] = useState([]);
    console.log(username);
    //axios call to get data from database
    const fetchdata = async() => {
        axios.post('http://localhost:5000/inventory', {
                username: username
        }).then(res => {
            setData(res.data);
            //console.log(res.data);
        });
    };

    useEffect(() => {
        fetchdata();
    }, []);


    function onClicksellitem(props){
        console.log(props);
    }

    const displayItem = data.map((item,index) =>{
        return <Item props={item} onItemClick={onClicksellitem}/>
    });



    
    
    return (
        <div>
            <center><h1>Inventory</h1></center>
            <br/>
            <br/>
            <div className='app-grid'>{displayItem}  </div>
            
        </div>
    )
}

