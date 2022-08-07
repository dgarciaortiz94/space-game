import axios from 'axios';
import React from 'react';

class FriendsList extends React.Component {

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
                    <div key={friend.id}>
                        <div className='friend d-flex justify-content-between align-items-center'>
                            <p onClick={() => this.props.setTargetUser(friend.id)}>{friend.username}</p>
                            <div className={friend.state}></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    };

}

export default FriendsList;