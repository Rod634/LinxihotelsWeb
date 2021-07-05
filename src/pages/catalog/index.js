import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './index.css';

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
            <Header/>
            <div className="title_catalog">
                <h1>Quartos disponiveis</h1>
            </div>
            <section className="cards">
            {rooms.length === 0 ? (
                <div>
                    <h1>Nenhum quarto disponivel</h1>
                </div>
            ) : 
                rooms.map((room) => {
                    if(room.status != "Ocupado")
                    return (
                        
                        <Link className="card" to={"/reservation/" + room.id}>
                            <div className="card_image ">
                                <img src={room.image_url}/>
                                <div className="card_status">
                                    <p>{room.status}</p>
                                </div>
                            </div>
                            <div className="card_title">
                                <h1>{room.category}</h1>
                            </div>
                            <div className="card_info">
                                <p>Empresa: {room.company.name}</p>
                                <p className="card_platform">capacidade: {room.capacity}</p>
                            </div>
                        </Link>
                        
                    )
                }, rooms)
            }
            </section>
        </div>
    )
}