import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Catalog (){

    const [rooms, setRooms] = useState([]);
    
     function loadRooms(){
        axios.get('http://127.0.0.1:8000/room/')
        .then(function (data) {
            setRooms(data.data);
        })
        .catch(function (error) {
            console.log(error);
        })    
    }

    useEffect(()=>{
        loadRooms()
    }, []);

    return (
        <div>
            <Link to="/signin">logar</Link>
            {rooms.length === 0 ? (
                <div>
                    <h1>Nenhum quarto disponivel</h1>
                </div>
            ) : 
                rooms.map((room) => {
                    console.log(room);
                    if(room.status != "Ocupado")
                    return (
                        <div>
                            <Link to={"/reservation/" + room.pk}>
                               <img src={room.image_url}/>
                               <p>{room.category} para {room.capacity} em {room.company.name}</p>
                            </Link>
                        </div>
                    )
                }, rooms)
            }
        </div>
    )
}