import axios from 'axios';
import React from 'react';

class FriendForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: "",
            users: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }


    // FUNCTIONS ----->
    handleChange = event => {
        this.setState({inputValue: event.target.value}, () => this.searchUsers(this.state.inputValue));
    }

    searchUsers(partOfUsername) {
        if (partOfUsername.length > 0) {
            axios.post('http://192.168.1.104:81/user/get-by-name', {
                "name": partOfUsername
            })
            .then(response => {
                this.setState({
                    users: response.data,
                });
            })
            .catch(error => {
                console.log(error.request.responseText);
            })
            .then(() => {
                // always executed
            });   
        } else {
            this.setState({
                users: [],
            });
        }
    }

    sendFriendRequest = event => {
        let id = event.target.parentNode.dataset.id;

        console.log(id); //PETICIÓN AJAX PARA AGREGAR AMIGO, Y SUBIR A GITHUB

        axios.post('http://192.168.1.104:81/friend-request/new', {
            "userTo": id
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.request);
        })
        .then(() => {
            // always executed
        });
    }


    render () {
        return (
            <div>
                <form className='mt-3'>
                    <input type="text" name="friend-username" value={this.state.inputValue} onChange={this.handleChange} className="form-control" placeholder='Amigo'></input>
                </form>
                
                <div className='users-list'>
                    {this.state.users.map(user => (
                        <div className='users-list__user d-flex justify-content-between align-items-center' key={user.id} data-id={user.id}>
                            <p className='m-0 text-dark'>{user.username}</p>
                            <p className='m-0 text-success users-list__add-friend' onClick={this.sendFriendRequest}>+</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    };

}

export default FriendForm;