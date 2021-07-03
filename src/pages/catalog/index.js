import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Catalog (){

    const [rooms, setRooms] = useState({});

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/room/')
        .then(function (data) {
            setRooms(data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
    }, []);

    console.log(rooms)
    return (
        <div>
            Catalog
        </div>
    )
}