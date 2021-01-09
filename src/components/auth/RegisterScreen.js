import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    //Extraemos el mensage de error para mostrarlo si aglo sucede
    const { msgError } = useSelector(state => state.ui);

    //Establecemos el manejo del form y unos valores por defecto
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    //Extraemos los names de cada input para asignarlos a sus respectivas cajas
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        //Si el formualio es correcto, realizamos el registo
        //ANALIZAR: startRegisterWithEmailPasswordName
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    const isFormValid = () => {
        //validación del formulario
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false;
        } else if (!validator.isEmail(email)) {
            //si no es un email, establecemos un error
            dispatch(setError('Email is not valid'))
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false
        }

        //Como todo esta bien, removemos el error y retornamos true para decir que todo paso
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    //En caso de que el error sea diferente a null, lo mostramos
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError}
                        </div>
                    )
                }


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>


                {/* Hacemos un enlace de navegación por si ya tiene cuenta */}
                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
