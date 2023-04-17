import React, {useEffect, useState} from 'react'
import Nav_Bar from './Nav_Bar'
import Item from './Item';
import './all.css'
import axios from 'axios';

export default function Inventory() {
    if (sessionStorage.getItem('User_data') == null) {
        window.location.href = 'http://localhost:3000/login/';
    } 
        const user_data = sessionStorage.getItem('User_data');
        const [username, setUser] = useState(JSON.parse(user_data).username);
        const [data, setData] = useState([]);
 
        // axios call to get data from database
        const fetchdata = async () => {
            axios.post('http://localhost:5000/inventory', {username: username}).then(res => {
                setData(res.data);

                // console.log(res.data);
            });
        };

        useEffect(() => {
            fetchdata();
            console.log(data);
        }, []);


        function onClicksellitem(props) { // change json property
            props.sold = 1;
            // change to json
            let updated = JSON.stringify(data);
            console.log(updated);

            // update item
            axios.post('http://localhost:5000/updateInventory', {
                username: username,
                inventory: updated
            }).then(res => {
                fetchdata();
            });
        }

        function onClickCancel(props){
            var result = window.confirm("Want to delete?");
            if (result) {
            props.sold = 0;
            // change to json
            let updated = JSON.stringify(data);
            console.log(updated);
            // update item
            axios.post('http://localhost:5000/updateInventory', {
                username: username,
                inventory: updated
            }).then(res => {
                fetchdata();
            });
        }
            else{
                return;
            }
        }

        const displayItem = data.map((item, index) => {
            return <Item props={item}
                onItemClick={onClicksellitem} 
                onItemCancel={onClickCancel}
                />        
        });

        return (
            <div className='container'>
                <br/>
                <center>
                    <h1 style={{fontFamily:'Alkatra'}}>Inventory</h1>
                </center>

                <br/>
                <div className='app-grid'>
                    {displayItem}</div>

            </div>
        )
    }


