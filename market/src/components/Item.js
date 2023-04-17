import React from 'react'

export default function Item(props) {
    //console.log(props)
    console.log(props)
    return (
    <div className='container'>
        <div className='card'>
            <div className='card-body'>
                <center>
                <img className='card-img-top' style={{width:250}} src={props.props.image} alt='Card image cap'/>
                <h5 className='card-title'>{props.props.name}</h5>
                <p className='card-text'>Price: {props.props.price} ฿</p>
                {
                    props.props.sold === 1 ? <button className='btn btn-dark' onClick={() => {props.onItemClick(props.props)}} disabled>sell</button>  : <button className='btn btn-danger' onClick={() => {props.onItemClick(props.props)}} >sell</button>
                    
                }
                &nbsp;
                  {
                    props.props.sold === 1 ? <button className='btn btn-danger' onClick={() => {props.onItemCancel(props.props)}} >cancel</button> : <button className='btn btn-dark' onClick={() => {props.onItemCancel(props.props)}} disabled>cancel</button>
                    
                 }
                </center>
                
            </div>
        </div>         
    </div>
  )
}
