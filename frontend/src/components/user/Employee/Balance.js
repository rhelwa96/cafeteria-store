import React, {useEffect, useState} from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'

function MyForm() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [items, setItems] = useState(0);
  useEffect( () => {
    fetchItems();
}, []); 

const fetchItems = async () => {
 
      await axios.get(`http://${process.env.REACT_APP_API_URL}/users/balance/${jwt_decode(Cookies.get('_auth')).id}`
      ,   { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('_auth')}`
    },}
      ).then(response => {
      const items = response.data;
       setItems(items.coalesce);
        }).catch(err => {
          // what now?
          console.log(err);
      });
};
 const current = new Date();
 const date = current.getDay()< 23 ?  `${ monthNames[current.getMonth()]}`  :  `${ monthNames[current.getMonth()+1]}`;
 console.log(current.getDay())
  return(
    <>
        <div
        style={{
        fontWeight:'bolder',
        fontSize:'20px',
        textAlign:'right',

        }}> 
        Total ({date}):
        </div>
        <div
        style={{       
        fontSize:'20px',
        textAlign:'right',
        fontWeight:'bolder'
        }}> 
        {items} L.E
        </div> 
    </>
   
    );
}

export default MyForm;

