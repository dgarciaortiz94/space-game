import React from 'react';
import axios from 'axios';
import { element } from 'prop-types';

import { BellFill } from 'react-bootstrap-icons';
import { Check } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons';

import FriendForm from './friendForm';
import Friends from './friends';

class UserInterface extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: [],
            friends: [],
            friendRequests: [],
            players: [],
            showNotifications: false,
        }
    }


    componentDidMount() {
        this.getPlayers();
        this.getReceivedFriendRequests();
        this.getFriends();

        this.handleWebSocket();
    }


    getPlayers() {
        axios.get('http://192.168.1.35:81/player')
        .then(response => {
            this.setState({
                players: response.data,
            });
        })
        .catch(error => {
            console.log(error);
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
                            
                            <Friends friends={this.state.friends}></Friends>
                        </div>

                        <section className='section col-12 col-lg-9'>
                            <div className='players-container row'>
                                {this.state.players.map(player => (
                                    <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center' key={player.id}>
                                        <div className='player-card' data-value={player.id}>
                                            <img src={"http://192.168.1.35:81/media/images/"+player.img} className='img-fluid'></img>
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