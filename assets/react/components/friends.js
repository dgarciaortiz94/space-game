import axios from 'axios';
import React from 'react';

class Friends extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            friends: this.props.friends,
        }
    }


    render () {
        return (
            <div className='friends-container'>
                {this.props.friends.map(friend => (
                    <a href={'http://192.168.1.41:81/game/'+sessionStorage.getItem("id")+'/'+friend.id} key={friend.id} target="__blank">
                        <div className='friend d-flex justify-content-between align-items-center'>
                            <p>{friend.username}</p>
                            <div className={friend.state}></div>
                        </div>
                    </a>
                ))}
            </div>
        )
    };

}

export default Friends;