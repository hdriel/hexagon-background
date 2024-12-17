import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.tsx';
import HexagonHover from './hexagon/Hexagon.hover';
import HexagonSpotlight from './hexagon/Hexagon.spotlight';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HexagonSpotlight>
            <App />
        </HexagonSpotlight>
    </StrictMode>
);
