import axios from 'axios';
import React from 'react';
import FriendForm from './friends/friendForm';
import FriendsList from './friends/friendsList';

class Friends extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            friends: this.props.friends,
        }
    }


    render () {
        return (
            <div>
                <FriendForm></FriendForm>
                <FriendsList friends={this.state.friends} setTargetUser={this.props.setTargetUser}></FriendsList>
            </div>
        )
    };

}

export default Friends;