import { useState } from 'react';
import { Table,Modal, Button, Col, Row ,Typography } from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import Balance from './Balance'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {DeleteOutlined} from '@ant-design/icons';

function MyForm() {

  const navigate = useNavigate(); 
  const [count, setCount] = useState(0);

  // const [guest, setGuest] = useState(false);
  const [isEditing,setIsEditing]=useState(false);
  const [addingOrder,setaddingOrder]=useState(null);
  const { Text } = Typography;

  const [dataSource,setDataSource] = useState('');
 
const columnsCheckout =[
  {
    key:'id_chk',
    title:'#',
    dataIndex:'id'
  },
  {
    key:'drink_chk',
    title:'Drink',
    dataIndex:'drink'
  },    {
    key:'price_chk',
    title:'Price',
    dataIndex:'price'
  },   
  // {
  //   key:'guest_chk',
  //   title:'Guest',
  //   dataIndex:'Guest'
  // }, 
  {

    title:'Actions',
    render:(record)=>{
      return  (
        <>
           <DeleteOutlined onClick={()=>{
            onDeleteOrder(record)
          }}
           style={{ color: "red",marginLeft:12}} />
        </>
      );
    },
  },   
];
const onDeleteOrder=(record)=>{
  Modal.confirm({
    title:'Are you sure you want remove this item ?',
    okText:'Yes',
    okType:'danger',
    onOk:()=>{
      setDataSource((pre)=>{

        return pre.filter((order)=>order.count !== record.count);
      });
    }
  })
};
// const changeGuest = (e) => {
//    setGuest(e.target.checked);
// };
// const clearState = () => {
//   setGuest(false);
// };
const columns = [
   {
    title: 'Menu',
    dataIndex: 'name',
    key: 'menu',
  },
  {
    title: 'Price',
    dataIndex: 'Price',
    key: 'Price',
 
  },  
  {
    title: 'Add',
    key: 'operation',
  
 
    render:(record)=>{
        return  (
          <>
            <PlusCircleFilled onClick={()=>{
            onAddOrder(record)
          }}  style={{ fontSize: '22px', color: 'green' }} />
          </>
        );
      },
  },
];
const data = [];

data.push({
  key: 0,
  name: 'tea',
  Price: 2

});
data.push({
  key: 1,
  name: 'Nescafe',
  Price: 5
});
data.push({
  key: 2,
  name: 'Mocha',
  Price: 5
});
 
data.push({
  key: 3,
  name: 'Mint',
  Price: 5
});
data.push({
  key: 4,
  name: 'Green Tea',
  Price: 10
});

data.push({
  key: 5,
  name: 'Hot Choclate',
  Price: 10
});
data.push({
  key: 6,
  name: 'Mocca',
  Price: 15
 
});
data.push({
  key: 7,
  name: 'Turkish coffee',
  Price: 15,
});
 data.push({
  key: 8,
  name: 'Latte',
  Price: 15
});
const onAddOrder=(record)=>{
    setIsEditing(true);
    setaddingOrder({...record});
  }
  const onAddCheckout=(record,OrderNow)=>{
    const start = 8 * 60;
    const end =  17 * 60;
    const date = new Date(); 
    const now = date.getHours() * 60 + date.getMinutes();
   
    if(start <= now && now <= end)
      {
    let drink=record.addingOrder.name;
    let price=record.addingOrder.Price;
 
    let order_status="ACTIVE";
    let user_id=jwt_decode(Cookies.get('_auth')).id;
    // const Guest = guest ? 'Yes' : 'No'; 

 
    // if(guest)
    // {
    //   price =0;
    // }
    if(OrderNow)
    {

      axios
      .post(
        `http://${process.env.REACT_APP_API_URL}/orders/create`,
        {
          "user_id": user_id,
          "order_name":drink,
          "price":price,
          // "guest":Guest,
          "order_status":order_status
        }
      )
      .then((response)=>{ 
         navigate('/history')
      });

    }
    else{
      setCount(count+1)
        setDataSource([...dataSource, {count,drink,price,user_id,order_status}, ]);
        
    }
  }
  else{
    const MySwal = withReactContent(Swal); 

    MySwal.fire({
                    icon: 'warning',
                    title: 'Orders shall be accepted from 8AM to 5PM',
                  })	
 
  }
    resetEditing();
  
  }
  const onMultipleCheckout=()=>{

    axios
    .post(
      `http://${process.env.REACT_APP_API_URL}/orders/create/multiple`,
      dataSource.map(({drink,...rest})=> ({"order_name":drink,...rest,})))
    .then((response)=>{
      navigate('/history')
    });
 
    
  }
  const resetEditing=()=>{
    setIsEditing(false);
    setaddingOrder(null);
    // clearState();
   }
  return(
    <>
    
      <Balance/>
      <Table
      columns={columns}
      dataSource={data}
      bordered
      size="middle"
      // scroll={{
      //   x: 'calc(700px + 50%)',
      //   y: 400,
      // }}
      />
      <Table
      columns={columnsCheckout}
      dataSource={dataSource}
      bordered
      size="middle"
      summary={(pageData) => {
        let totalPrice = 0;
        pageData.forEach(({ price }) => {
          totalPrice += price;
          
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2} style={{fontWeight:'bolder',}}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text type="danger">{totalPrice} L.E</Text>
              </Table.Summary.Cell>
            
            </Table.Summary.Row>
    
          </>
        );
      }}
    />
    <Button type="primary" key="muliplecheckout" onClick={() =>onMultipleCheckout()} > Order Now</Button>
       
      <Modal
      open={isEditing}
      onCancel={()=>{
        resetEditing()
      }}
      footer={[
        <Button key="back" onClick={resetEditing}>
          Back
        </Button>,
        <Button type="primary"  onClick={() => onAddCheckout({addingOrder},false)} >
          Add
        </Button>,
        <Button type="primary"  onClick={() => onAddCheckout({addingOrder},true)} >
        Order Now
      </Button>,
 
      ]}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>   
            <label    
            style={{
              fontWeight:'bolder',
              fontSize:'20px'
              }}>{addingOrder?.name} </label>
          </Col>
 
          {/* <Col span={12}><Checkbox checked={guest} onChange={changeGuest}>Guest</Checkbox></Col> */}
          {/* <Col span={12}> <label>{addingOrder?.Price} </label></Col> */}
        </Row>
  
        
        
       
      </Modal>
    </>

  );
}

export default MyForm;