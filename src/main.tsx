import { type ReactNode, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import { HexagonSpotlight, HexagonHover } from './hexagon';

const Main = (): ReactNode => {
    const [mode, setMode] = useState(0);
    const Wrapper = [HexagonSpotlight, HexagonHover][mode % 2];

    return (
        <Wrapper>
            <App onChange={() => setMode((m) => m + 1)} />
        </Wrapper>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>
);
