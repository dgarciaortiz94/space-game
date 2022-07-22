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
                    <a href={'http://space-game.test/game/'+sessionStorage.getItem("id")+'/'+friend.id} target="__blank">
                        <div className='friend d-flex justify-content-between align-items-center' key={friend.id}>
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