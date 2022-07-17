import axios from 'axios';
import React from 'react';

class Friends extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            friends: [],
        }
    }


    componentDidMount() {
        this.getFriends();
    }


    getFriends() {
        axios.get('http://prueba.test/friend-request/get-friends/'+global.session.id)
        .then(response => {
            console.log(response.data.friends);

            this.setState({
                friends: response.data.friends,
            });
        })
        .catch(error => {
            console.log(error);
        })
    }


    render () {
        return (
            <div className='friends-container'>
                {this.state.friends.map(friend => (
                    <div className='friend d-flex justify-content-between align-items-center' key={friend.id}>
                        <p>{friend.username}</p>
                        <div className={friend.state}></div>
                    </div>
                ))}
            </div>
        )
    };

}

export default Friends;