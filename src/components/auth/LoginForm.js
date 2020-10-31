import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, setUserId } from '../../store/actions/authentication';

const LoginForm = () => {
    const [email, setEmail] = useState('ryoung7986@gmail.com');
    const [password, setPassword] = useState('1234');
    const token = useSelector((state) => state.authentication.token);
    // const email = useSelector((state) => state.authentication.email);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (token) {
        return <Redirect to='/' />;
    }

    return (
        <main>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                />
                <button type='submit'>Login</button>
            </form>
        </main>
    );
};


export default LoginForm;








// const mapDispatchToProps = dispatch => {
//     return {
//         updateEmailValue: event => dispatch(updateEmailValue(event.target.value))
//     };
// };

// export default connect(null)(LoginForm);
