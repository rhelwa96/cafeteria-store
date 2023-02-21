import React, {useEffect, useState} from 'react';
import Balance from './Balance'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import Countdown from "react-countdown";
function History() {
    useEffect( () => {
      fetchItems(); 
    }, []);

    const [items, setItems] = useState([]);
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <span>
            {minutes}:{seconds}
          </span>
        );
      }
    };
    const fetchItems = async () => {
  
            await axios.get(`http://${process.env.REACT_APP_API_URL}/orders/history/${jwt_decode(Cookies.get('_auth')).id}`)
            .then(response => {const items = response.data; setItems(items);   
            })
            .catch(err => console.log(err));;  
    };

    return(
        <section>
            <Balance/>
            {
            items.map(item => (
                <div className="container-fluid p-3 w-50">
                    <div className="card-deck">
                        <div className="card" key={item.id}>
                            <div className="card-body p-1">
                                <h6 className="card-title">{item.order_name}</h6>
                                <p className="card-text">Total: {item.price} L.E</p>
                                <p className="card-text"><i>on { (new Date(item.created_at)).toString()}</i></p>
    
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </section>
    );
}

export default History;