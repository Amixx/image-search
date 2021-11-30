import { createContext } from "react";

const UserContext = createContext({
    accessToken: null,
    setAccessToken: () => {},
    isAuthenticated: () => {},
});

export default UserContext;