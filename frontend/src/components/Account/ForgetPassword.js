import React, {useState} from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReCAPTCHA from "react-google-recaptcha";
const App = () => {
const [gtoken,setGtoken]=useState("")
const MySwal = withReactContent(Swal);
const recaptchaRef = React.createRef();
const navigate = useNavigate(); 
  const onFinish = async(values) => {
    await axios.post(
        `http://${process.env.REACT_APP_API_URL}/users/forget-password`,
        {...values,"gtoken":gtoken}
    ).then( response => {
      if(response.data.status!="Please check your mail, you will receive Reset Password link")
      {
          recaptchaRef.current.reset()
          MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.status
            })	
      }
      else{
      MySwal.fire({ 
        icon: 'info',
        title: 'Reset Password',
        text: response.data.status,
      })
      navigate('/login')
    
    }
     
     })
  
    // alert(response.data.status);
    
  
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 
 
  return (
 
 
      <Row gutter={[32, 24]}   >
      <Col xs={{ span: 15}} lg={{ span: 10}} >
      
   <a href="/"><img src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png" height={100} /></a>
   <br/><br/><br/><br/>
 
            <Form
              layout="vertical"
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 8,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Enter your email in correct format',
                    type: 'email'
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                      name="captcha"
                    rules={[
                        {
                        required: true,
                        message: 'Please input the captcha you got!',
                        },
                    ]}
                    >
                       
             
                  <ReCAPTCHA 
                  ref={recaptchaRef} 
                  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY} 
                  onChange={gtoken=>setGtoken(gtoken)}
                  onExpired={e=>setGtoken("") }
                  />
        </Form.Item>
                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    
                    Reset
                </Button>                
                <p className='text-center'><a href='/login' className='text-right'>Go to Login Page</a></p>
                </Form.Item>
            </Form>

      </Col>
      <Col xs={{ span: 15 }} lg={{ span: 13}}>
      <div><img src="https://www.coalesse.com/wp-content/uploads/2019/05/Gray-Switch-Stool-Cafe-Environments-in-the-Workplace.jpg" width="100%"/></div>
              
      </Col>
  </Row>  
  
   
  );
};
export default App;