import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
export const AuthPage = () =>{
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} =  useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() =>{
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        }
        catch (e) {
            console.log(e.message);
            console.log(error);
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        }
        catch (e){
            console.log(e.message);
            console.log(error);
        }
    }

    return(
        <div className="auth-window">
            <header>Авторизация</header>
            <div>
                <form className="form">
                    <div className="input-field">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id="email" name="email" onChange={changeHandler} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" name="password" onChange={changeHandler} />
                    </div>
                </form>
                <div className="row">
                    <div className="col">
                        <button className="waves-effect waves-light btn" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                    <div className="col">
                        <button className="waves-effect waves-light btn" onClick={loginHandler} disabled={loading}>Войти</button>    
                    </div>
                </div>
            </div>
        </div>
    )
}
