import React, { useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import UserContext from "../../UserContext";

const createAuthUri = () => {
	const redirectUri = encodeURI("http://192.168.224.1:3000/auth");
	let authUri = new URL("https://unsplash.com/oauth/authorize");
	authUri.searchParams.append("client_id", process.env.REACT_APP_UNSPLASH_ACCESS_KEY);
	authUri.searchParams.append("redirect_uri", redirectUri);
	authUri.searchParams.append("response_type", "code");
	authUri += "&scope=public+write_likes"; // so that '+' does not get encoded
	return authUri;
}

const Layout = ({ children }) => {
    const { setAccessToken, isAuthenticated } = useContext(UserContext);

	const startAuthentication = () => window.location.assign(createAuthUri());
	const logOut = () => setAccessToken(null);

    return (
        <div className="text-center">
            <Container>
				<Row>
					<nav className="pull-right mt-3 mb-3">
						{
							isAuthenticated()
								? <Button variant="secondary" onClick={logOut}>Log out</Button>
								: <Button variant="secondary" onClick={startAuthentication}>Sign in</Button>
						}
					</nav>
				</Row>
				{children}
            </Container>
        </div>
    );
}

export default Layout;
