import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {
	const redirectUri = encodeURI("http://192.168.224.1:3000/auth");
	const authUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${redirectUri}&response_type=code&scope=public+write_likes`;
	
	const startAuthorization = () => window.location.assign(authUrl);

    return (
        <div className="App">
            <Container>
				<Row>
					<nav className="pull-right mt-3 mb-3">
						{
							isAuthenticated
								? <Button variant="secondary" onClick={() => setIsAuthenticated(false)}>Log out</Button>
								: <Button variant="secondary" onClick={startAuthorization}>Sign in</Button>
						}
					</nav>
				</Row>
				{children}
            </Container>
        </div>
    );
}

export default Layout;
