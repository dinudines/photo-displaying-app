import React, {useState} from 'react';
import { Button, TextField, FormControl } from '@material-ui/core';
import { Redirect } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false); 

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'test@test.com' && password === '1234') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 3000 )
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await login(email, password);
            setIsLoading(false);
            if (result) {
                console.log(" success", result);
                setIsLoginSuccess(true);
            } else {
                setError('Email or Password is incorrect');
            }
        } catch (e) {
            setError('Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        isLoginSuccess ? <Redirect to='/' /> :
        <div className='LoginPage'>
            { error && <div className='errorTxt'> {error} </div>}
            <form className='loginForm' onSubmit={onSubmit}>
                <FormControl fullWidth>
                    <TextField
                        required
                        id='email'
                        label='Email'
                        variant='outlined'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                     <TextField
                        required
                        id='password'
                        className='marginTop'
                        label='Password'
                        type='password'
                        variant='outlined'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button
                    className='marginTop'
                    variant='contained'
                    color='primary'
                    onClick={onSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}

export default LoginPage;