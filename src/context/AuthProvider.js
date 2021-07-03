import {useState, createContext, useEffect} from 'react';
import { toast } from 'react-toastify';
export const AuthContext = createContext({});
const axios = require('axios');

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        function loadUser(){
            const localUser = localStorage.getItem('userLogged');
            if(localUser){
                setUser(JSON.parse(localUser));
            }
        }
        loadUser();
    }, []);

    function setLocalUser(data){
        localStorage.setItem('userLogged', JSON.stringify(data));
    }

    async function signUp(name, nationality, birth, addres, contact, number_id, issue_id, passport, email){

        axios.post('http://127.0.0.1:8000/customer/', {
            name: name,
            nationality: nationality,
            birth_date: birth,
            address: addres,
            contact_number: contact,
            number_id: number_id,
            issue_id: issue_id,
            passport: passport,
            email: email
        })
        .then(function (data) {
            setUser(data);
            setLocalUser(data);
            toast.success('User Registered!');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Ops.. something wrong it happened here');
        })
    }

    async function signIn(username, passwd){
        axios.post('http://127.0.0.1:8000/api/token/', {
            username: username,
            password: passwd
        })
        .then(function (data) {
            console.log(data);
            // verificar se veio o token
            setUser(data);
            setLocalUser(data);
            toast.success(`Welcome back ${username}`);
        })
        .catch(function (err) {
            console.log(err);
            toast.error('Ops.. something wrong it happened here');
        });
    }

    async function signOut(){
        localStorage.removeItem('userLogged');
        setUser(null);
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