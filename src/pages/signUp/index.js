import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import {Link} from 'react-router-dom';

export default function SignUp (){
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [nationality, setNationality] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [number_id, setNumber_id] = useState('');
    const [issue_id, setIssue_id] = useState('');
    const [passport, setPassport] = useState('');
    const [email, setEmail] = useState('');
    //const [passwd, setPasswd] = useState('');
    const {signUp} = useContext(AuthContext);

    function SignUpHandle(e){
        e.preventDefault();
        if(passport !== '' || (number_id !== '' && issue_id !== '')){
            signUp(name, user, nationality, birth, address, contact, number_id, issue_id, passport, email)
        }
    }

    return (
        <div className="card">
            <form onSubmit={SignUpHandle}>
                <h1>Cadastro</h1>

                <label>Username</label>
                <input type="text" placeholder="jose634" onChange={(e)=>{setUser(e.target.value)}}/>

                <label>Nome</label>
                <input type="text" placeholder="José da Silva" onChange={(e)=>{setName(e.target.value)}}/>

                <label>Nacionalidade</label>
                <input type="text" placeholder="Brasileiro" onChange={(e)=>{setNationality(e.target.value)}}/>

                <label>Data de Nascimento</label>
                <input type="date" placeholder="21/03/2000" onChange={(e)=>{setBirth(e.target.value)}}/>

                <label>Endereço</label>
                <input type="text" placeholder="Rua do marotinho" onChange={(e)=>{setAddress(e.target.value)}}/>

                <label>Telefone</label>
                <input type="telephone" placeholder="71987320486" onChange={(e)=>{setContact(e.target.value)}}/>

                <label>Rg</label>
                <input type="number" placeholder="13043" onChange={(e)=>{setNumber_id(e.target.value)}}/>

                <label>Data de expedição</label>
                <input type="date" placeholder="21/03/2000" onChange={(e)=>{setIssue_id(e.target.value)}}/>

                <label>E-mail</label>
                <input type="text" placeholder="email@domain.com" onChange={(e)=>{setEmail(e.target.value)}}/>

                <label>Passport</label>
                <input type="number" placeholder="1489646" onChange={(e)=>{setPassport(e.target.value)}}/>

                <button type="submit">Cadastrar</button>
            </form>
            
            <Link to="/">Eu já tenho uma conta!</Link>

        </div>
    )
}