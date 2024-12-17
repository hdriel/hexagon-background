import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.tsx';
import HexagonHover from './hexagon';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HexagonHover>
            <App />
        </HexagonHover>
    </StrictMode>
);
