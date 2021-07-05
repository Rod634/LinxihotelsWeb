import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import {Link} from 'react-router-dom';
import './index.css'

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
        <div className="background">
            <form onSubmit={SignInHandle}>
                <h1>Login</h1>

                <label>Nome:</label>
                <input type="text" placeholder="joaozinho" onChange={(e)=>{setUsername(e.target.value)}}/>

                <label>Senha:</label>
                <input type="password" placeholder="****" onChange={(e)=>{setPasswd(e.target.value)}}/>

                <button type="submit">Logar</button>
                <Link className="cadastro" to="/signUp">Cadastro ?</Link>
            </form>
        </div>
    )
}