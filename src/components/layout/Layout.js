import React from "react";
import { Container, Row, Button } from "react-bootstrap";

const createAuthUri = () => {
	const redirectUri = encodeURI("http://192.168.224.1:3000/auth");
	const authUri = new URL("https://unsplash.com/oauth/authorize");
	authUri.searchParams.append("client_id", process.env.REACT_APP_UNSPLASH_ACCESS_KEY);
	authUri.searchParams.append("redirect_uri", redirectUri);
	authUri.searchParams.append("response_type", "code");
	authUri.searchParams.append("scope", "public+read_user+write_likes");
	return authUri;
}

const Layout = ({ children, isAuthenticated, logOut }) => {
	const startAuthorization = () => window.location.assign(createAuthUri());

    return (
        <div className="text-center">
            <Container>
				<Row>
					<nav className="pull-right mt-3 mb-3">
						{
							isAuthenticated
								? <Button variant="secondary" onClick={logOut}>Log out</Button>
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
