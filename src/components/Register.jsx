import React from 'react';
import { useState } from 'react';

function Register({ onRegister }) {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = userData;
        onRegister(email, password);
    }

    return (
        <div className="auth">
            <h2 className="auth__welcome">
                Регистрация
            </h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" required id="email" name="email" type="email" placeholder="email@mail.com" onChange={handleChange} />
                <input className="auth__input" required id="password" name="password" type="password" placeholder="••••••••••" onChange={handleChange} />
                <button type="submit" className="auth__btn">Зарегистрироваться</button>

            </form>
            <div className="auth__signin">
                <p className="auth__signin_text">Уже зарегистрированы? Войти</p>
            </div>
        </div>
    )
}

export default Register;