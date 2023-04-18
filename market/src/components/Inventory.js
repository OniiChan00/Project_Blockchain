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


        function onClicksellitem(props) {
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
            // get the current date and time
            const currentDate = new Date();
            // format the date in yyyy-mm-dd format
            currentDate.setHours(currentDate.getHours() + 7);
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            // insert to market_ex
            axios.post('http://localhost:5000/market_ex_insert', {
            image: props.image,
            itemid: props.itemid,
            itempos: props.itempos,
            item_name: props.name,
            price: props.price,
            date_sale: formattedDate,
            seller: username
            }).then(res => {
                fetchdata();
            });
        }
        function onClickCancel(props){
            var result = window.confirm("Want to delete?");
            if (result) {
              // make an API call to delete the item from market_ex table
              axios.post('http://localhost:5000/deleteItem', {
                itemid: props.itemid
              }).then(res => {
                console.log(res.data);
                fetchdata();
              });
              
              // set sold status to 0 in the inventory table
              props.sold = 0;
              let updated = JSON.stringify(data);
              console.log(updated);
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