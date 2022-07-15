import React from 'react';
import ReactDOMclient from 'react-dom/client';

import Canvas from '../components/canvas';
import UserInterface from '../components/userInterface';

const root = ReactDOMclient.createRoot(document.getElementById('main-container'));
root.render(<UserInterface />);