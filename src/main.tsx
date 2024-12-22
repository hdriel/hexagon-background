import { type ReactNode, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App, { AppProps } from './components/App';
import { HexagonSpotlight, HexagonHover } from './hexagon';

const Main = (): ReactNode => {
    const [data, setData] = useState<Omit<AppProps, 'onChange'>>({
        theme: 'dark',
        radius: 100,
        resize: true,
        filled: false,
        type: 'hover',
        color: undefined,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Wrapper = { hover: HexagonHover, spotlight: HexagonSpotlight }[data.type] ?? HexagonHover;
    return (
        <Wrapper {...data}>
            <App key="app-data" onChange={(newState) => setData((state) => ({ ...state, ...newState }))} {...data} />
        </Wrapper>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>
);
