import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthProvider';

export default function Profile (){

    const { signOut} = useContext(AuthContext);

    return (
        <div>
            Profile
            <button onClick={ () => signOut() } >
               Sair
            </button>
        </div>
    )
}