import React from 'react';
 
class Canvas extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <canvas width={600} height={300} className='canvas-game'>
                
            </canvas>
        );
    }
}

export default Canvas;