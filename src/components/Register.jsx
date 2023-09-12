import React from 'react';

function Register() {

    const handleRegister = () => {
        console.log('handleRegister');
    };

    return (
        <div className="auth">
            <h2 className="auth__welcome">
                Регистрация
            </h2>
            <form className="auth__form" onSubmit={handleRegister}>
                <input className="auth__input" required id="email" name="email" type="email" placeholder="email@mail.com"  />
                <input className="auth__input" required id="password" name="password" type="password" placeholder="••••••••••"  />
                <button type="submit" className="auth__btn">Зарегистрироваться</button>

            </form>
            <div className="auth__signin">
                <p className="auth__signin_text">Уже зарегистрированы?</p>
            </div>
        </div>
    )
}

export default Register;