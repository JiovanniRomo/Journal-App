import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    //Extraemos el loading para advertir al usuario que espere
    const { loading } = useSelector(state => state.ui);

    //Hacemos el manejo del form y le damos unos valores por defecto
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    //Extraemos cada valor para después asignarselo a sus inputs
    const { email, password } = formValues;

    //Esto por si inicia sesión con email y password
    const handleLogin = (e) => {
        e.preventDefault();

        //enviamos el email y password para verfificarlos con el auth
        dispatch(startLoginEmailPassword(email, password));
    }

    //Esto por si inicia sesión con su cuenta de google
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <label>
                    Email:
                    <input
                        type="text"
                        // placeholder="correo"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Contraseña:
                    <input
                        type="password"
                        // placeholder="Password"
                        name="password"
                        className="auth__input"
                        value={password}
                        onChange={handleInputChange}
                    />
                </label>


                {/* Como estamos esperando a recibir la información, 
                    nos aseguramos que el usuario no pueda volver a enviarla
                */}
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                {/* Hacemos un botón de navegación por si no tiene cuenta */}
                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
