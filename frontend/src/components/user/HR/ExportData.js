import { useState,useEffect } from "react";
import {DatePicker,Form,Button, Result } from 'antd';
import axios from 'axios';
import { CSVLink } from "react-csv";
import { useSignOut   } from 'react-auth-kit';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
function ExportData() {
  const [item,setItem]  = useState([]);
  const [datefromto_filename, setDatefromto_filename] = useState([]);
  const [showAuthPage, setshowAuthPage] = useState(true);
  useEffect(() => {
   // setshowAuthPage(jwt_decode(Cookies.get('_auth')).user_role==="Human Resource") 
  }, []);
  const signOut = useSignOut(); 

const fetchItems = async (datefrom1,dateto1) => {
  if(datefrom1 !=null && dateto1 != null)
  {
 
  const resp=await axios.get(`http://${process.env.REACT_APP_API_URL}/users/balance/${datefrom1}/${dateto1}`
  , { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('_auth')}`
},});
  setItem(resp.data);
  }
};

  const onChange = (date) => {
    if (date) {
      setDatefromto_filename(`${ date[0].$D}_${ date[0].$M+1}_${ date[0].$y}_to_${ date[1].$D}_${ date[1].$M+1}_${ date[1].$y}`)
      fetchItems(`${ date[0].$y}-${ date[0].$M+1}-${ date[0].$D}`,`${ date[1].$y}-${ date[1].$M+1}-${ date[1].$D}`)
    } 
  };

  return ( <> 
 { showAuthPage ? (
        
         <>
          <Link style={{textAlign: "right",fontSize:"20px"}} onClick={() => signOut()} className="nav-item nav-link">Log Out  ?</Link>
 
 
          <h2>Export Sheet</h2>
          <Form.Item label="Date" hasFeedback >
          <DatePicker.RangePicker
              onChange={onChange}
            />
          </Form.Item>
          <CSVLink className="btn btn-success mb-3" data={item} onClick={fetchItems}   filename={`EmployeeBalance_Cafeteria_${datefromto_filename}.csv`} >
              Download Excel
              
          </CSVLink></>
      ):(  <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" href="/">Back Home</Button>}
      />
      )}  
      </>
  );
 }
 

export default ExportData;