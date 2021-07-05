import React, {useContext} from 'react';
import '../assets/header.css'
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

export default function Header (){

    const { signOut, user} = useContext(AuthContext);
    

    return (
        <header>
            <h1>LinxiHotels</h1>
            {user != null ? (
                <div className="menu">
                    <Link className="link-header" to="/profile">Perfil</Link>
                    <Link className="link-header" onClick={ () => signOut() }>Sair</Link>
                </div>
            ) : (
                <div className="menu">
                    <Link className="link-header" to="/signIn">Login</Link>
                    <Link className="link-header" to="/signUp">Cadastro</Link>
                </div>
            )}
            
        </header>
    )
}