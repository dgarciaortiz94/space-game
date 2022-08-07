import axios from 'axios';
import React from 'react';

class ChooseShip extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ships: this.props.ships,
        }
    }


    render () {
        return (
            <div className='ships-container'>
                {this.props.ships.map(ship => (
                    <div className='ship-card' key={ship.id} data-value={ship.id} onClick={() => this.props.setChosenShip(ship.id)}>
                        <img src={"http://192.168.1.35:81/media/images/"+ship.img} className='img-fluid ship-img'></img>
                        <p>{ship.name}</p>
                    </div>
                ))}
            </div>
        )
    };

}

export default ChooseShip;