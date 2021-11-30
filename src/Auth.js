import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate  } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Layout from './Layout';

function App() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    let navigate = useNavigate();


    useEffect(() => {
        const redirectUri = encodeURI("http://192.168.224.1:3000/auth");
        const payload = {
            client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            client_secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
            redirect_uri: redirectUri,
            code,
            grant_type: "authorization_code",
        }

        fetch("https://unsplash.com/oauth/token", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        }).then(res => res.json()).then(({ access_token }) => {
            localStorage.setItem("accessToken", access_token);
            navigate("/", { replace: true });
        });
    }, [navigate, code]);


    return (
        <Layout>
            <Row className="mt-5 mb-3">
                <Col>
                    <p>You are being authenticated, please hold on!</p>
                </Col>
            </Row>
        </Layout>
    );
}

export default App;
