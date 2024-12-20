import './App.css';
import './checkbox.css';
import './switch.css';
import './number.input.css';
import { useReducer, useState } from 'react';

function App({
    onChange,
}: {
    onChange: (
        state: { theme: 'dark' | 'light'; type: 'hover' | 'spotlight'; resize: boolean } & (
            | { size?: number; color?: string | boolean }
            | { filled?: number; color?: string | boolean }
        )
    ) => void;
}) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [type, setType] = useState<'hover' | 'spotlight'>('spotlight');
    const [resize, setResize] = useState<boolean>(true);

    const [hoverFields, updateHoverFields] = useReducer(
        (
            state: { filled?: boolean; color?: string | boolean },
            action: { filled?: boolean; color?: string | boolean }
        ) => {
            const newState = { ...state };
            if (action.filled !== undefined) {
                newState.filled = action.filled;
            }
            if (action.color !== undefined) {
                newState.color = action.color;
            }

            onChange({ ...newState, theme, type, resize });
            return newState;
        },
        {
            filled: false,
            color: undefined,
        }
    );

    const [spotlightFields, updateSpotlightFields] = useReducer(
        (state: { size: number; color?: string | boolean }, action: { size?: number; color?: string | boolean }) => {
            const newState = { ...state };
            if (action.size !== undefined) {
                newState.size = action.size;
            }
            if (action.color !== undefined) {
                newState.color = action.color;
            }

            onChange({ ...newState, theme, type, resize });
            return newState;
        },
        {
            size: 100,
            color: undefined,
        }
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const hoverFieldColorStyle: any = {
        '--color-off': hoverFields.color,
        '--color-on': hoverFields.color,
        '--color-hover': hoverFields.color,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spotlightFieldColorStyle: any = {
        '--color-off': spotlightFields.color,
        '--color-on': spotlightFields.color,
        '--color-hover': spotlightFields.color,
    };

    return (
        <div className="app">
            <h1>hexagon-background</h1>

            <div className="fieldsets">
                <fieldset style={{ display: 'flex', gap: '1em', flexDirection: 'column' }}>
                    <legend>General</legend>
                    <div className="field">
                        <span className="switch-label">Theme: {theme}</span>
                        <label className="switch">
                            <input
                                checked={theme === 'light'}
                                type="checkbox"
                                onChange={() => {
                                    setTheme((t) => {
                                        const newValue = t === 'light' ? 'dark' : 'light';
                                        onChange({
                                            ...{ ['hover']: hoverFields, ['spotlight']: spotlightFields }[type],
                                            theme: newValue,
                                            resize,
                                            type,
                                        });
                                        return newValue;
                                    });
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="field">
                        <span className="switch-label">Type: {type}</span>
                        <label className="switch">
                            <input
                                checked={type === 'hover'}
                                type="checkbox"
                                onChange={() => {
                                    setType((t) => {
                                        const newValue = t === 'hover' ? 'spotlight' : 'hover';
                                        onChange({
                                            ...{ ['hover']: hoverFields, ['spotlight']: spotlightFields }[type],
                                            theme,
                                            resize,
                                            type: newValue,
                                        });
                                        return newValue;
                                    });
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="field">
                        <span className="switch-label">Resize: </span>
                        <label className="switch">
                            <input
                                checked={resize}
                                type="checkbox"
                                onChange={() => {
                                    setResize((value) => {
                                        const newValue = !value;
                                        onChange({
                                            ...{ ['hover']: hoverFields, ['spotlight']: spotlightFields }[type],
                                            resize: newValue,
                                            theme,
                                            type,
                                        });

                                        return newValue;
                                    });
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </fieldset>

                <fieldset disabled={type === 'spotlight'} style={{ display: type === 'spotlight' ? 'none' : 'block' }}>
                    <legend>Hexagon Hover Props</legend>
                    <div className="card">
                        <div className="field">
                            <label className="container">
                                Filled
                                <input
                                    type="checkbox"
                                    checked={hoverFields.filled}
                                    onChange={(event) => updateHoverFields({ filled: event.target.checked })}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div className="field">
                            <label className="container">
                                Color
                                <input
                                    id="color"
                                    type="color"
                                    value={typeof hoverFields.color === 'string' ? hoverFields.color : ''}
                                    onChange={(event) => updateHoverFields({ color: event.target.value })}
                                />
                                <span className="checkmark round" style={hoverFieldColorStyle}></span>
                            </label>
                        </div>

                        <div className="field">
                            <label className="container">
                                Colorize
                                <input
                                    type="checkbox"
                                    checked={typeof hoverFields.color === 'boolean'}
                                    onChange={(event) => updateHoverFields({ color: event.target.checked })}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </fieldset>

                <fieldset disabled={type === 'hover'} style={{ display: type === 'hover' ? 'none' : 'block' }}>
                    <legend>Hexagon Spotlight Props</legend>
                    <div className="card">
                        <div className="field quantity">
                            <label className="field">
                                Size
                                <div className="input-number">
                                    <input
                                        type="number"
                                        value={spotlightFields.size}
                                        min={100}
                                        onChange={(event) =>
                                            updateSpotlightFields({ size: event.target.valueAsNumber })
                                        }
                                    />
                                    <div className="input-number-actions">
                                        <button
                                            onClick={() => updateSpotlightFields({ size: spotlightFields.size + 100 })}
                                        >
                                            <span>+</span>
                                        </button>
                                        <button
                                            onClick={() => updateSpotlightFields({ size: spotlightFields.size - 100 })}
                                        >
                                            <span>-</span>
                                        </button>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className="field">
                            <label className="container">
                                Color
                                <input
                                    id="color"
                                    type="color"
                                    value={typeof spotlightFields.color === 'string' ? spotlightFields.color : ''}
                                    onChange={(event) => updateSpotlightFields({ color: event.target.value })}
                                />
                                <span className="checkmark round" style={spotlightFieldColorStyle}></span>
                            </label>
                        </div>

                        <div className="field">
                            <label className="container">
                                Colorize
                                <input
                                    type="checkbox"
                                    checked={typeof spotlightFields.color === 'boolean'}
                                    onChange={(event) => updateSpotlightFields({ color: event.target.checked })}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}

export default App;
