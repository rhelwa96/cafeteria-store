import {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Space,Table,Button, Result } from 'antd';
import axios from 'axios';
import { useSignOut   } from 'react-auth-kit';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import PrintBill from './3_print_bill'
const print = () => window.print();
function Cafeteria() {
  let navigate = useNavigate(); 
  const [dataSourceActive,setDataSourceActive]  = useState([]);
  const [loading, setloading] = useState(true);
 // const [showAuthPage, setshowAuthPage] = useState(false);
  useEffect(() => {
    // if(jwt_decode(Cookies.get('_auth')).user_role==="cafeteria"){
    //   setshowAuthPage(jwt_decode(Cookies.get('_auth')).user_role) }
    getNewOrders()
    setInterval(getNewOrders, 20000);
  }, []);
  const signOut = useSignOut(); 
 
 
  const getNewOrders = async () => {
      axios.get(`http://${process.env.REACT_APP_API_URL}/orders`)
      .then(
      res => {
        setloading(false);
        setDataSourceActive(
          res.data.map(row => ({
            key:row.id,
            full_name: row.full_name,
            department: row.department,
            order_name:row.order_name,
            guest:row.guest,
            created_at:(new Date(row.created_at)).toString(),
      
          }))
        );
      }
    )
    .catch(err => console.log(err));
  };
 
  const updateOrderStatus=async(record)=>{
  await axios.patch(`http://${process.env.REACT_APP_API_URL}/orders/status/${record.key}`).then( getNewOrders)
 
  };
 
  const columns =[
    {
      title:"Name",
      dataIndex:"full_name",
      key:"Name"
    },     {
      title:"Department",
      dataIndex:"department",
      key:"department"
    },    
  
    {
      title: 'Order',
      dataIndex: 'order_name',
      key: 'order_name',
    },

    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
    
      render: (record) => (
        <Space size="middle">
          <a onClick={()=>updateOrderStatus(record)} style={{color:"green"}}>Done</a>
          {/* <a onClick={print(record)} style={{color:"blue"}}>Print</a> */}
         <PrintBill record={record}/>
 
        </Space>
        
      ),
    },
 
  ];
  return ( <> 

 {/* { showAuthPage ? (
        
         <>
          <Link style={{textAlign: "right",fontSize:"20px"}} onClick={() => signOut()} className="nav-item nav-link">Log Out  ?</Link>
      <h1>Active Orders</h1>
          <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          >
          </Table>
      
        </>
      ):(  <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
      )}   */}
               
         <Button style={{float: "right"}} type="primary" onClick={()=>navigate('/cafeteria/history')} >History</Button>
         <Link style={{textAlign: "right",fontSize:"20px"}} onClick={() => signOut()} className="nav-item nav-link">Log Out  ?</Link>
      <h1>Active Orders</h1>
 
          <Table
          loading={loading}
          columns={columns}
          dataSource={dataSourceActive}
          >
          </Table> 
 
      </>
  );
 }
export default Cafeteria;