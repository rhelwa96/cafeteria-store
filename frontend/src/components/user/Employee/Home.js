import React from 'react';
import { Card, Col, Row  } from 'antd';
import Balance from './Balance'
const { Meta } = Card;

function Home() {
    return(
        <section>
            <Balance/>
            <h1>Welcome to Rowad Cafeteria</h1>
            <div className="container-fluid">
                
                <br/> <br/><br/> <br/>
              
                    <Row >
                        <Col span={5}>
                            <a href="/drinks">
                            <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" height={170} src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZmVpbmV8ZW58MHx8MHx8&w=1000&q=80" />}
                            >
                              
                            <Meta title="Drinks"/>
                            </Card>  </a>
                        </Col>
                        <a href="/foods">
                        <Col span={5}>
                            <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" height={170} src="https://static.toiimg.com/thumb/54714340.cms?width=1200&height=900" />}
                            >
                               
    
                                
                        <Meta title="Foods" />
                </Card></Col> </a></Row>
            </div>
            <br/> <br/><br/> <br/>
        </section>
    );
}

export default Home;