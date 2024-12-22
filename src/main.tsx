import { type ReactNode, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import { HexagonSpotlight, HexagonHover } from './hexagon';

const Main = (): ReactNode => {
    const [data, setData] = useState({} as any);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Wrapper = { hover: HexagonHover, spotlight: HexagonSpotlight }[data.type] ?? HexagonHover;
    return (
        <Wrapper {...data} size={data.size ? `${data.size}px` : ''}>
            <App key="app-data" onChange={setData} {...data} />
        </Wrapper>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>
);
