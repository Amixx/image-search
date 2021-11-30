import React, { useEffect, useContext  } from "react";
import { useSearchParams, useNavigate  } from "react-router-dom";
import UserContext from "./context/UserContext";

function Auth() {
    const [ searchParams ] = useSearchParams();
    const code = searchParams.get("code");
    let navigate = useNavigate();

    const { setAccessToken } = useContext(UserContext);

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
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        }).then(res => res.json()).then(({ access_token }) => {
            setAccessToken(access_token);
            navigate("/", { replace: true });
        });
    }, [navigate, code, setAccessToken]);


    return <p className="text-center mt-5 mb-3">You are being authenticated, please hold on!</p>;
}

export default Auth;