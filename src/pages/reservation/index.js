import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../../components/Header'
import './index.css';

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
        await axios.get('https://rod634.pythonanywhere.com/service/')
        .then(function(data){
            setService(data.data);
        })
        .catch(function(err){
            console.log(err);
        })
    }

    async function loadRoom(){
        await axios.get(`https://rod634.pythonanywhere.com/room/${id}/`)
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
        await axios.get('https://rod634.pythonanywhere.com/reservation/', getHeader())
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
    
    function makeReservation(e) {
        e.preventDefault();

        var filter = getFilteredReservation();

        if(cardCode !== null && cardNumber !== null){
            if(filter.length === 0){
                axios.post('https://rod634.pythonanywhere.com/reservation/', getParams(), getHeader())
                .then(function (data) {
                    toast.success('Seu quarto foi reservado!');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Ops... algo de errado aconteceu!');
                })
            }else{
                axios.patch('https://rod634.pythonanywhere.com/reservation/' + filter[0].id  + '/', getParams(), getHeader())
                .then(function (data) {
                    toast.success('Sua Reserva foi ajustada!');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Ops... algo de errado aconteceu!');
                })
            }
        }else{
            toast.error('Voc?? precisa informar os dados do cart??o!');
        }
    }
    
    function serviceHandle(e){
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setServiceId(value);
    }
  
    return (
        <div>
            <Header />
            {room != null ? (
                
                <div className="container">
                    
                    <div className="card_room">
                        <div className="title">
                            <h1>{room.category + ' ' + room.number + ' em ' + room.company.name}</h1>
                        </div>

                        <div className="card_img">
                            <img src={room.image_url}/>
                        </div>
                    </div>
                
                    <div className="card_form">
                        <form onSubmit={(e)=>{makeReservation(e)}}>
                            <h1>Reserva</h1>

                            <label>Quantidade de pessoas</label>
                            <input type="text" placeholder="1" value={peopleCount} onChange={(e)=>{setPeopleCount(e.target.value)}}/>
                            
                            <label>Data de ocupa????o</label>
                            <input type="date" placeholder="07/07/2021" value={ocupation} onChange={(e)=>{setOcupation(e.target.value)}}/>

                            <label>Data de saida</label>
                            <input type="date" placeholder="08/07/2021" value={leave} onChange={(e)=>{setLeave(e.target.value)}}/>

                            <label>Numero do cart??o</label>
                            <input type="number" placeholder="insira o numero do cart??o" value={cardNumber} onChange={(e)=>{setCardNumber(e.target.value)}}/>

                            <label>C??digo do cart??o</label>
                            <input type="number" placeholder="insira o c??digo do cart??o" value={cardCode} onChange={(e)=>{setCardCode(e.target.value)}}/>

                            <label>Servi??os</label>
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