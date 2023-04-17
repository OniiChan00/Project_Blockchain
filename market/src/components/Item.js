import React from 'react'

export default function Item(props) {
    //console.log(props)

    return (
    <div className='container'>
        <div className='card'>
            <div className='card-body'>
                <center>
                <img className='card-img-top' style={{width:300}} src={props.props.image} alt='Card image cap'/>
                <h5 className='card-title'>{props.props.name}</h5>
                <p className='card-text'>Price: {props.props.price} ฿</p>
                <button className='btn btn-danger' onClick={() => {props.onItemClick(props.props)}}>sell</button>
                </center>
                
            </div>
        </div>         
    </div>
  )
}
