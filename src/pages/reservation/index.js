import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Reservation (props){

    const id = props.match.params.id;

    const [room, setRoom] = useState();
    const [reservations, setReservations] = useState();
    const [company, setCompany] = useState();
    const [service, setService] = useState([]);
    const [serviceId, setServiceId] = useState([]);
    const [peopleCount, setPeopleCount] = useState();
    const [ocupation, setOcupation] = useState();
    const [leave, setLeave] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [cardCode, setCardCode] = useState();

    useEffect(()=>{
        loadRoom();
        loadServices();
        loadReservations();
    }, []);

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
            setCompany(data.data.company);
        })
        .catch(function (error) {
            console.log(error);
        })    
    }

    function getHeader() {
        const token = JSON.parse(localStorage.getItem('token'));
        return { headers : {Authorization: "Bearer " + token.data.access } }
    }

    function getUserId(){
        const user = JSON.parse(localStorage.getItem('userLogged'));
        return user.id;
    }

    function getParams(){

        return {
            "people_count": parseInt(peopleCount),
            "ocupation_date": ocupation,
            "leave_date": leave,
            "card_number": parseInt(cardNumber) ,
            "card_code": parseInt(cardCode),
            "status": "Pendente",
            "customer": getUserId(),
            "company": company.id,
            "room": room.id,
            "service": serviceId
        }
    }

    async function loadReservations(){
        await axios.get('http://127.0.0.1:8000/reservation/', getHeader())
        .then(function (data) {
            var reservationList = data.data;
            setReservations(reservationList);
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    function getFilteredReservation(){
        var filteredReservation = reservations.filter((r) => {
            return r.customer == getUserId() && r.room == id;
        })

        return filteredReservation;
    }
    
    console.log(reservations)

    function makeReservation(e) {
        e.preventDefault();

        var filter = getFilteredReservation();

        if(cardCode !== null && cardNumber !== null){
            if(filter.length === 0){
                axios.post('http://127.0.0.1:8000/reservation/', getParams(), getHeader())
                .then(function (data) {
                    toast.success('Seu quarto foi reservado!');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Ops... algo de errado aconteceu!');
                })
            }else{
                axios.patch('http://127.0.0.1:8000/reservation/' + filter[0].id  + '/', getParams(), getHeader())
                .then(function (data) {
                    toast.success('Sua Reserva foi ajustada!');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Ops... algo de errado aconteceu!');
                })
            }
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
                        <form onSubmit={(e)=>{makeReservation(e)}}>
                            <h1>Reserva</h1>

                            <label>Quantidade de pessoas</label>
                            <input type="text" placeholder="1" value={peopleCount} onChange={(e)=>{setPeopleCount(e.target.value)}}/>
                            
                            <label>Data de ocupação</label>
                            <input type="date" placeholder="07/07/2021" value={ocupation} onChange={(e)=>{setOcupation(e.target.value)}}/>

                            <label>Data de saida</label>
                            <input type="date" placeholder="08/07/2021" value={leave} onChange={(e)=>{setLeave(e.target.value)}}/>

                            <label>Numero do cartão</label>
                            <input type="number" placeholder="insira o numero do cartão" value={cardNumber} onChange={(e)=>{setCardNumber(e.target.value)}}/>

                            <label>Código do cartão</label>
                            <input type="number" placeholder="insira o código do cartão" value={cardCode} onChange={(e)=>{setCardCode(e.target.value)}}/>

                            <label>Serviços</label>
                            <select onChange={(e)=>{serviceHandle(e)}} multiple>
                                {
                                    service.map((service) => {
                                        if(service.company.some(s => s.id === room.company.id)){
                                            return (
                                                <option value={service.id}>{service.description + " R$" + service.price}</option>
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