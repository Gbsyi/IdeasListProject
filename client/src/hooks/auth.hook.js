import { useState, useCallback, useEffect } from "react"

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id)=>{
        setToken(jwtToken);
        setUserId(id);
        console.log("Login", jwtToken, id);
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, []);
    
    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName); 
    }, []);

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName));
        console.log("Check", !!data, !!data.token);
        if(data && data.token){
            login(data.token, data.userId);
        }
    }, [login])


    return { login, logout, token, userId };
}