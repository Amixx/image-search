import { createContext } from "react";

const UserContext = createContext({
    accessToken: null,
    setAccessToken: () => {},
    userData: null,
    setUserData: () => {},
});

export default UserContext;