import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import {Link} from 'react-router-dom';

export default function SignIn (){

    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');
    const {signIn} = useContext(AuthContext);

    function SignInHandle(e){
        e.preventDefault();
        if(username !== '' && passwd !== ''){
            signIn(username , passwd);
        }
    }

    return (
        <div className="card">
            <form onSubmit={SignInHandle}>
                <h1>Login</h1>

                <label>Username</label>
                <input type="text" placeholder="joaozinho" onChange={(e)=>{setUsername(e.target.value)}}/>

                <label>Password</label>
                <input type="password" placeholder="****" onChange={(e)=>{setPasswd(e.target.value)}}/>

                <button type="submit">Logar</button>
            </form>
            
            <Link to="/signUp">Cadastro ?</Link>

        </div>
    )
}