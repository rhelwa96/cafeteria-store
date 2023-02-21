import React, { useState } from 'react';
import {useSignIn} from 'react-auth-kit'
import { Button, Row, Col, Form, Input, FormItem} from 'antd';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
 
const App = () => {
const signIn=useSignIn();
const navigate = useNavigate(); 
const recaptchaRef = React.createRef();
const [gtoken,setGtoken]=useState("")
  const onFinish = async(values) => {
    const MySwal = withReactContent(Swal);
    await axios.post(
        `http://${process.env.REACT_APP_API_URL}/users/authenticate`,
        {
            "email": values.email.toLowerCase(),
            "password_digest":values.password_digest,
            "gtoken":gtoken
          }
 
    ) .then(response => {
        if(response.data.status!=null)
        {
            recaptchaRef.current.reset()
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.status,
                footer: '<a href="/forget-password">Forget Password</a>'
              })	
        }
        else{
            if(signIn({
                token:response.data.token,
                expiresIn: 3600,
                tokenType:"Bearer",
                authState:{
                    email:  values.email.toLowerCase() //To convert Lower Case
                }
            })){
                setTimeout(function() {
                    if(jwt_decode(response.data.token).user_role==="cafeteria")
                    {
                        navigate("/cafeteria");
                    } else{
                         navigate("/drinks");
                    }
   
                }, 1500);
                MySwal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }
    })
    .catch(err => console.log(err));  
  

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 
  return (
    <Row gutter={[32, 24]}   >
        <Col xs={{ span: 15}} lg={{ span: 10}} >
        <div>

        <a href="/"><img src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png"  height={100}/></a>
        <br/><br/>
            <h1 style={{'textAlign':'left','fontSize':'30px'}}>Login Page</h1><br/><br/>
           
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{
                    span: 12,
                    }}
                    wrapperCol={{
                    span: 12,
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
                    label="Password"
                    name="password_digest"
                    rules={[
                        {
                        required: true,
                        message: 'Please enter your password',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
                    <p className='text-center'>
                    <a href='/forget-password' >  Forget Password </a>
        </p>
                    {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}
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
                        Login
                    </Button>
                    </Form.Item>
                </Form>
        </div>



        </Col>
        <Col xs={{ span: 15 }} lg={{ span: 13}}>
        <div><img src="https://www.coalesse.com/wp-content/uploads/2019/05/Gray-Switch-Stool-Cafe-Environments-in-the-Workplace.jpg" width="100%"/></div>
                
        </Col>
    </Row>  
   
  );
};
export default App;