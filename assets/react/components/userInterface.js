import React from 'react';
import axios from 'axios';
import { element } from 'prop-types';

import { BellFill } from 'react-bootstrap-icons';
import { Check } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons';

import FriendForm from './friends/friendForm';
import Friends from './friends';
import ChooseShip from './chooseShip';

class UserInterface extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: [],
            friends: [],
            friendRequests: [],
            ships: [],
            showNotifications: false,
            targetUser: "",
            chosenShip: "",
            asideOption: "",
        }
    }


    componentDidMount() {
        this.getReceivedFriendRequests();
        this.getFriends();
        this.getShips();

        this.handleWebSocket();
    }


    getShips() {
        axios.get('http://192.168.1.35:81/player')
        .then(response => {
            this.setState({
                ships: response.data,
            });
        })
        .catch(error => {
            console.log(error.request.responseText);
        })
    }

    getFriends() {
        axios.get('http://192.168.1.35:81/friend-request/get-friends/'+sessionStorage.getItem("id"))
        .then(response => {
            this.setState({friends: response.data.friends});
        })
        .catch(error => {
            console.log(error);
        })
    }


    getReceivedFriendRequests() {
        axios.get('http://192.168.1.35:81/friend-request/recived/'+sessionStorage.getItem("id"))
        .then(response => {
            this.setState({
                friendRequests: response.data.receivedFriendRequest
            })
        })
        .catch(error => {
            console.log(error.request.responseText);
        })
    }


    showNotifications() {
        if (this.state.showNotifications) {
            return (
                <div className='notification__friend-requests-box'>
                    {this.state.friendRequests.map(friendRequest => (
                        <div className='notification__friend-request d-flex justify-content-between align-items-center' key={friendRequest.id}>
                            <p className='m-0'>{friendRequest.sourceUser.username}</p>
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-sm btn-success mx-2' onClick={() => this.handleFriendRequest(friendRequest.id, true)}><Check /></button>
                                <button className='btn btn-sm btn-danger' onClick={() => this.handleFriendRequest(friendRequest.id, false)}><X /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }


    handleFriendRequest(friendRequest, value) {
        axios.post('http://192.168.1.35:81/friend-request/'+friendRequest+'/edit', {
            "value": value
        })
        .then(response => {
            this.setState({
                friends: response.data.friends,
                friendRequests: response.data.receivedFriendRequest
            });
        })
        .catch(error => {
            console.log(error.request.responseText);
        })
    }


    handleWebSocket() {
        var conn = new WebSocket('ws://192.168.1.35:8282/game');

        conn.onopen = e => { 
            console.log("Conexión establecida");
            conn.send(JSON.stringify({
                "action": "connection",
                "session": {
                    id: sessionStorage.getItem("id"),
                    username: sessionStorage.getItem("username"),
                    state: sessionStorage.getItem("state"),
                }
            })); 
        }

        conn.onmessage = e => { 
            let msg = JSON.parse(e.data);

            console.log(msg);

            switch (msg["action"]) {
                case 'connection':
                    let friends = this.state.friends;

                    friends.forEach(friend => {
                        if (friend.id == msg.session.id) friend.state = msg.session.state;

                        this.setState({friends: friends});
                    })

                    console.log(msg.session)
                    break;
                
                default:
                    console.log("No se recibió acción");
                    break;
            }
        };
    }

    setTargetUser = (targetUser) => {
        this.setState({targetUser: targetUser});
    }

    setChosenShip = (ship) => {
        this.setState({chosenShip: ship});
    }

    sectionDisplay = () => {
        if (this.state.targetUser != null) return <ChooseShip ships={this.state.ships} setChosenShip={this.setChosenShip} />;
    }

    setAsideOption() {
        let component = "";

        switch (this.state.asideOption) {
            case "Naves":
                component = <ChooseShip ships={this.state.ships} setChosenShip={this.setChosenShip} />;
                break;

            case "Naves":
                component = "";
                break;

            case "Amigos":
                component = <Friends friends={this.state.friends} setTargetUser={this.setTargetUser} />;
                break;
        
            default:
                component = "";
                break;
        }

        return component;
    }



    render () {
        return (
            <div className="user-interface">
                <header className="header">
                    <div className='container-fluid d-flex justify-content-between align-items-center p-3 px-5'>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <div className="nav-link" href="#">Home</div>
                                        </li>
                                        <li className="nav-item" onClick={() => {this.setState({asideOption: <ChooseShip ships={this.state.ships} setChosenShip={this.setChosenShip} />})}}>
                                            <div className="nav-link" href="#">Naves</div>
                                        </li>
                                        <li className="nav-item" onClick={() => {this.setState({asideOption: "Historial"})}}>
                                            <div className="nav-link" href="#">Historial</div>
                                        </li>
                                        <li className="nav-item" onClick={() => {this.setState({asideOption: <Friends friends={this.state.friends} setTargetUser={this.setTargetUser} />})}}>
                                            <div className="nav-link" href="#">Amigos</div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link" href="#">Cerrar sesión</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className='d-flex align-items-center'>
                            <p className='mb-0'>{sessionStorage.getItem("username")}</p>
                            <div className='notification' onClick={() => this.setState({showNotifications: !this.state.showNotifications})}>
                                <BellFill size={20} color="#FFD700"/>
                                <div className='notification__number'>{this.state.friendRequests.length}</div>
                            </div>
                            {this.showNotifications()}
                        </div>
                    </div>
                </header>

                <div className='container-fluid mt-4' style={{height: "85%"}}>
                    <div className='row' style={{height: "100%"}}>
                        <div className='aside col-12 col-lg-3'>
                            {this.state.asideOption}
                            {/* <ChooseShip ships={this.state.ships} setChosenShip={this.setChosenShip} ></ChooseShip> */}

                            {/* <FriendForm></FriendForm>
                            <Friends friends={this.state.friends} setTargetUser={this.setTargetUser}></Friends> */}

                            <form action={'http://192.168.1.35:81/game'} method='post' target='_blank'>
                                <input type="hidden" value={this.state.targetUser} name='target-user'></input>
                                <input type="hidden" value={this.state.chosenShip} name='chosenShip'></input>
                                <input type="submit" ></input>
                            </form>
                        </div>

                        <section className='section col-12 col-lg-9'>
                            <div className='row w-100 m-0'>
                                <div className='main-ship__box col-12 col-lg-9 d-flex align-items-center justify-content-center'>
                                    <img src={"http://192.168.1.35:81/media/images/millenary falcon/millenary falcon.gif"} className='main-ship__img'></img>
                                </div>
                                <div className='main-ship__statistics col-12 col-lg-3'>
                                    <p>Estadísticas</p>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            <div className='col-12 col-md-6'>
                                                <p>Vida</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>100</p>
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <p>Aceleración</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>0.2</p>
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <p>Velocidad máxima</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>10</p>
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <p>Velocidad de giro</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>5</p>
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <p>Defensa</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>60</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p>Ataque</p>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            <div className='col-12 col-md-6'>
                                                <p>Ataque normal</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>2</p>
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <p>Ataque especial</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>10</p>
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <p>Carga ataque especial</p>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <p>30</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {(this.state.targetUser != "") ? <ChooseShip ships={this.state.ships} setChosenShip={this.setChosenShip}></ChooseShip> : ""} */}
                            <div className='main-ship__name mt-4'>
                                <div>Millenary Falcon</div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    };

}

export default UserInterface;