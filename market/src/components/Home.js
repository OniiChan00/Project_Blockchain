import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav_Bar from "./Nav_Bar";
import "./all.css";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/market_ex");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = (item) => {
    const date = new Date(item.date_sale);
 
    //เอาตัว Z ออก  2023-04-18T08:40:50.000Z

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  
    return (
      <tr key={item.itemid} >
        <td>{item.itemid}</td>
        <td>
          <img src={item.image} alt={item.item_name} style={{ maxWidth: "100px" }} />
        </td>
        <td>{item.item_name}</td>
        <td>{item.price}</td>
        <td>{formattedDate}</td>
        <td>{item.seller}</td>
        <td style={{ textAlign: "right" }}>
          <button className='btn btn-dark'> buy </button></td>
      </tr>
    );
  };


  return (
    <div className="container">

      <br />
      <center>
        <h1 style={{ fontFamily: "Alkatra" }}>Market Exchange</h1>
      </center>
      <br />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Date Sale</th>
            <th>Seller</th>
            
            <th style={{ textAlign: "right" }}>Buy</th>
          </tr>
        </thead>
        <tbody>{items.map((item) => renderItem(item))}</tbody>
      </table>
    </div>
  );
}
