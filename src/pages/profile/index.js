import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../../components/Header';
import './index.css';

export default function Profile (){


    const { user} = useContext(AuthContext);
    const [name, setName] = useState(user.name);
    const [img, setImg] = useState(user.image_url);
    const [nationality, setNationality] = useState(user.name);
    const [birth, setBirth] = useState(user.birth_date);
    const [address, setAddress] = useState(user.address);
    const [contact, setContact] = useState(user.contact_number);
    const [number_id, setNumber_id] = useState(user.number_id);
    const [issue_id, setIssue_id] = useState(user.issue_id);
    const [passport, setPassport] = useState(user.passport);
    const [email, setEmail] = useState(user.email);
    
    function updateProfile(e) {
        e.preventDefault();
        axios.patch('https://rod634.pythonanywhere.com/customer/' + user.id + "/", {
            name: name,
            nationality: nationality,
            birth_date: birth,
            address: address,
            contact_number: parseInt(contact),
            number_id: parseInt(number_id),
            issue_id: issue_id,
            passport: parseInt(passport),
            image_url: img,
            email: email
        })
        .then(function (data) {
            toast.success('Usuario atualizado');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Ops.. Algo de errado aconteceu aqui!');
        })
    }

    return (
        <div className="profile_background">
            <Header/>
            <div className="profile_container">
                <div className="profile">
                    <img src={user.image_url}></img>
                    <h1>{user.name}</h1>
                </div>
                <form onSubmit={(e) => {updateProfile(e)}}>
                    
                    <label>Imagem de perfil:</label>
                    <input type="text" value={img} onChange={(e)=>{setImg(e.target.value)}}/>

                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>

                    <label>Nacionalidade:</label>
                    <input type="text" value={nationality} onChange={(e)=>{setNationality(e.target.value)}}/>

                    <label>Data de Nascimento:</label>
                    <input type="date" value={birth} onChange={(e)=>{setBirth(e.target.value)}}/>

                    <label>Endereço:</label>
                    <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>

                    <label>Telefone:</label>
                    <input type="telephone" value={contact} onChange={(e)=>{setContact(e.target.value)}}/>

                    <label>Rg:</label>
                    <input type="number" value={number_id} onChange={(e)=>{setNumber_id(e.target.value)}}/>

                    <label>Data de expedição:</label>
                    <input type="date" value={issue_id} onChange={(e)=>{setIssue_id(e.target.value)}}/>

                    <label>E-mail:</label>
                    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                    <label>Passport:</label>
                    <input type="number" value={passport} onChange={(e)=>{setPassport(e.target.value)}}/>

                    <button type="submit">atualizar</button>
                </form>
            </div>

            
        </div>
    )
}