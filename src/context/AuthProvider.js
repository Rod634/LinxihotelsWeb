import {useState, createContext, useEffect} from 'react';
import { toast } from 'react-toastify';
export const AuthContext = createContext({});
const axios = require('axios');

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    useEffect(()=>{
        function loadUserAndToken(){
            const localUser = localStorage.getItem('userLogged');
            const localToken = localStorage.getItem('token');
            if(localUser){
                setUser(JSON.parse(localUser));
            }
            if(localToken){
                setToken(JSON.parse(localToken));
            }
        }
        loadUserAndToken();
    }, []);

    function setLocalUser(data){
        localStorage.setItem('userLogged', JSON.stringify(data));
    }

    function setLocaToken(data){
        localStorage.setItem('token', JSON.stringify(data));
    }

    function signUp(name, user, nationality, birth, addres, contact, number_id, issue_id, passport, email){

        axios.post('http://127.0.0.1:8000/customer/', {
            user: { username: user},
            name: name,
            nationality: nationality,
            birth_date: birth,
            address: addres,
            contact_number: parseInt(contact),
            number_id: parseInt(number_id),
            issue_id: issue_id,
            passport: parseInt(passport),
            email: email
        })
        .then(function (data) {
            getUserAndSet(user);
            toast.success('Usuario registrado!');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Ops.. Algo de errado aconteceu aqui!');
        })
    }

    function signIn(username, passwd){
        axios.post('http://127.0.0.1:8000/api/token/', {
            username: username,
            password: passwd
        })
        .then(function (data) {
            if(data.data.access != null){
                getUserAndSet(username);
                setLocaToken(data);
                toast.success(`Bem vindo de volta ${username}!`);
            }
        })
        .catch(function (err) {
            console.log(err);
            toast.error('Ops.. Algo de errado aconteceu aqui!');
        });
    }

    function signOut(){
        localStorage.removeItem('userLogged');
        localStorage.removeItem('token');
        setUser(null);
    }

    function getUserAndSet(user){
        axios.get('http://127.0.0.1:8000/customer/')
        .then(function (data) {
            data.data.map((d) => {
                if(d.user.username == user){
                    setUser(d);
                    setLocalUser(d);
                };
            })
        })
        .catch(function (error) {
            console.log(error);
        })    
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            signOut,
            setUser,
            setLocalUser
        }}>
            {children}
            </AuthContext.Provider>
    );
}