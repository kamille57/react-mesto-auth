import React from 'react';

function Login() {


    return (
        <div className="auth">
            <h2 className="auth__welcome">Вход</h2>
            <form className="auth__form" >
                <input className="auth__input" required id="username" name="username" type="text" placeholder="Email"  />
                <input className="auth__input" required id="password" name="password" type="password" placeholder="Пароль"  />
                <button type="submit" className="auth__btn">Войти</button>
            </form>
        </div>
    );
}

export default Login;