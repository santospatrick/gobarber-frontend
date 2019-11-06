import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

function Signin() {
    return (
        <>
            <img src={logo} alt="Logo" />

            <form action="">
                <input type="email" placeholder="Seu e-mail" />
                <input type="password" placeholder="Sua senha secreta" />

                <button type="submit">Acessar</button>
                <Link to="/signup">Criar conta gratuita</Link>
            </form>
        </>
    );
}

export default Signin;
