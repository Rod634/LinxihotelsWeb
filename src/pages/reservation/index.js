import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Reservation (props){

    const id = props.match.params.id;
    const [room, setRoom] = useState();
    const [company, setCompany] = useState();
    const [user, setUser] = useState();
    const [service, setService] = useState([]);
    const [serviceId, setServiceId] = useState([]);
    const [peopleCount, setPeopleCount] = useState();
    const [ocupation, setOcupation] = useState();
    const [leave, setLeave] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [cardCode, setCardCode] = useState();

    useEffect(()=>{
        getUser();
        loadRoom();
        loadServices();
    }, []);

    function getUser(){
        const localUser = localStorage.getItem('userLogged');
        setUser(localUser);
    }

    async function loadServices(){
        await axios.get('http://127.0.0.1:8000/service/')
        .then(function(data){
            setService(data.data);
        })
        .catch(function(err){
            console.log(err);
        })
    }

    async function loadRoom(){
        await axios.get(`http://127.0.0.1:8000/room/${id}/`)
        .then(function (data) {
            setRoom(data.data);
            setCompany(data.company);
        })
        .catch(function (error) {
            console.log(error);
        })    
    }

    function getHeader() {
        const token = localStorage.getItem('token');
        return { headers : {Authorization: token.access } }
    }

    function getServices(){
     //filtrar todos os serviços pelos ids selecionados
    }

    function getParams(){
        return {
            "customer": user,
            "company": company,
            "room": room,
            "service": service,
            "people_count": peopleCount,
            "ocupation_date": ocupation,
            "leave_date": leave,
            "card_number": parseInt(cardNumber) ,
            "card_code": parseInt(cardCode)
        }
    }

    function makeReservation() {
        if(cardCode !== null && cardNumber !== null){

            const headers = getHeader();
            const params = getParams();

            axios.post('http://127.0.0.1:8000/customer/', params, headers)
            .then(function (data) {
                
            })
            .catch((err) => {
                console.log(err);
               
            })
        }else{
            toast.error('Você precisa informar os dados do cartão!');
        }
    }
    
    function serviceHandle(e){
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setServiceId(value);
    }
  
    return (
        <div>
            {room != null ? (
                <div>
                    <div>
                        <img src={room.image_url}/>
                        <p>{room.category + " " + room.number + " - " + room.company.name} </p>
                    </div>
                
                    <div>
                        <form onSubmit={makeReservation}>
                            <h1>Reserva</h1>

                            <label>Quantidade de pessoas</label>
                            <input type="text" placeholder="1" onChange={(e)=>{setPeopleCount(e.target.value)}}/>

                            <label>Data de ocupação</label>
                            <input type="date" placeholder="07/07/2021" onChange={(e)=>{setOcupation(e.target.value)}}/>

                            <label>Data de saida</label>
                            <input type="date" placeholder="08/07/2021" onChange={(e)=>{setLeave(e.target.value)}}/>

                            <label>Numero do cartão</label>
                            <input type="number" placeholder="insira o numero do cartão" onChange={(e)=>{setCardNumber(e.target.value)}}/>

                            <label>Código do cartão</label>
                            <input type="number" placeholder="insira o código do cartão" onChange={(e)=>{setCardCode(e.target.value)}}/>

                            <label>Serviços</label>
                            <select onChange={(e)=>{serviceHandle(e)}} multiple>
                                {
                                    service.map((service) => {
                                        if(service.company.some(s => s.pk === room.company.pk)){
                                            return (
                                                <option value={service.pk}>{service.description + " R$" + service.price}</option>
                                            )
                                        }
                                    }, service)
                                }
                            </select>
                            <button type="submit">Reservar!</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>

                </div>
            )}
        </div>
    )
}