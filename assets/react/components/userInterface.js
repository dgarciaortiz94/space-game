import React from 'react';
import axios from 'axios';
import { element } from 'prop-types';

import { BellFill } from 'react-bootstrap-icons';
import { Check } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons';

import FriendForm from './friendForm';

class UserInterface extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            friendRequests: [],
            friends: [],
            players: [],
            showNotifications: false,
        }
    }

    componentDidMount() {
        this.getSession();

        this.getPlayers();
    }

    getFriends() {
        axios.get('http://prueba.test/friend-request/get-friends/'+global.session.id)
        .then(response => {
            this.setState({
                friends: response.data.friends,
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    getPlayers() {
        axios.get('http://prueba.test/player')
        .then(response => {
            this.setState({
                players: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    getSession() {
        axios.get('http://prueba.test/user/session/get-session')
        .then(response => {
            global.session = response.data.session;

            this.getReceivedFriendRequests();
            this.getFriends();

            this.handleWebSocket();
        })
        .catch(error => {
            console.log(error.request.responseText);
        })
    }

    getReceivedFriendRequests() {
        axios.get('http://prueba.test/friend-request/recived/'+global.session.id)
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
        axios.post('http://prueba.test/friend-request/'+friendRequest+'/edit', {
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
        var conn = new WebSocket('ws://localhost:8080/game');

        conn.onopen = e => { 
            console.log("Conexión establecida");
            conn.send(JSON.stringify({
                "session": global.session
            })); 
        }

        document.getElementById("main-container").addEventListener("click", () => {
            conn.send(JSON.stringify({
                "chat": {
                    "user": 2,
                    "message": "saludos al 2"
                }
            })); 
        })

        conn.onmessage = e => { 
            let data = JSON.parse(e.data);

            console.log(data.connected);

            if (data.connected != null) {
                let friends = this.state.friends;

                friends.forEach(friend => {
                    if (friend.id == data.connected.id) friend.state = data.connected.state;

                    this.setState({friends: friends});
                })
            }
        };
    }


    render () {
        return (
            <div className="user-interface">
                <header className="header bg-info">
                    <div className='container-fluid d-flex justify-content-between align-items-center p-3 px-5'>
                        <p>Aqui el logo</p>
                        <div className='d-flex align-items-center'>
                            <p>Aqui user</p>
                            <div className='notification' onClick={() => this.setState({showNotifications: !this.state.showNotifications})}>
                                <BellFill size={20} color="#FFD700"/>
                                <div className='notification__number'>{this.state.friendRequests.length}</div>
                            </div>
                            {this.showNotifications()}
                        </div>
                    </div>
                </header>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='aside col-3'>
                            <FriendForm></FriendForm>

                            <div className='friends-container'>
                                {this.state.friends.map(friend => (
                                    <div className='friend d-flex justify-content-between align-items-center' key={friend.id}>
                                        <p>{friend.username}</p>
                                        <div className={friend.state}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <section className='section col-12 col-lg-9'>
                            <div className='players-container row'>
                                {this.state.players.map(player => (
                                    <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center' key={player.id}>
                                        <div className='player-card' data-value={player.id}>
                                            <img src={"http://prueba.test/media/images/"+player.img} className='img-fluid'></img>
                                            <p>{player.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                <footer className='footer bg-info'>
                    <p>Footer</p>
                </footer>
            </div>
        )
    };

}

export default UserInterface;