import {Button,Form,Input,Row,Col} from 'antd';
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

 
  const App = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate(); 
    const [Email, setEmail] = useState();
     
    useEffect(() => {
        setEmail(jwt_decode(token).email)
      }, []);
    const [form] = Form.useForm();
    const {token} = useParams();
    console.log(jwt_decode(token).email);
 
    const onFinish = async(values) => {
            const response =await axios.patch(
               `http://${process.env.REACT_APP_API_URL}/users/reset-password`,
                {"password_digest": values.password,
                "id":jwt_decode(token).id
                }
            )
            .then(response=>{
              if(response.status)
              {
                MySwal.fire({
                  icon: 'success',
                  title: 'Password Changed Successfully'
                })
                navigate('/login');
              }

              
            })
           
      };
 
  
 
    return (
      <Row gutter={[32, 24]}   >
      <Col xs={{ span: 15}} lg={{ span: 10}} >
      <a href="/"><img src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png" height={100} /></a>
         <br/><br/><br/><br/>
       
                 <Form
        form={form}
        name="register"
        onFinish={onFinish}
  
      >
        <h1>{Email}</h1>
 
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
  
    <Button type="primary" htmlType="submit">
            Update Password
          </Button>
    
      </Form>

      </Col>
      <Col xs={{ span: 15 }} lg={{ span: 13}}>
      <div><img src="https://www.coalesse.com/wp-content/uploads/2019/05/Gray-Switch-Stool-Cafe-Environments-in-the-Workplace.jpg" width="100%"/></div>
              
      </Col>
  </Row>  
  
   
    );
  };
  export default App;