import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

function Candle() {
    const [color, setColor] = useState('blue');
    const [height, setHeight] = useState(150); // 50-200px
    const [isLit, setIsLit] = useState(false);
    const lastTimeRef = useRef<number>(Date.now());
    const animationFrameRef = useRef<number | undefined>(undefined);

    // Gradually decrease height when lit
    useEffect(() => {
        if (!isLit) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            return;
        }

        const animate = () => {
            const now = Date.now();
            const delta = now - lastTimeRef.current;
            lastTimeRef.current = now;

            // Decrease height by 5px per second when lit
            const decreaseRate = 5; // px per second
            const decrease = (decreaseRate * delta) / 1000;

            setHeight((prev) => {
                const newHeight = prev - decrease;
                // Stop at minimum height
                if (newHeight <= 50) {
                    setIsLit(false); // Auto-extinguish when burned down
                    return 50;
                }
                return newHeight;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        lastTimeRef.current = Date.now();
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isLit]);

    const handleLight = () => {
        if (height > 50) {
            setIsLit(true);
        }
    };

    const handleBlowOut = () => {
        setIsLit(false);
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isLit) {
            setHeight(Number(e.target.value));
        }
    };

    const colorMap: { [key: string]: string } = {
        blue: '#3b82f6',
        green: '#10b981',
        purple: '#a855f7',
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '2px solid #94a3b8',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                {/* Main candle area with height slider and color dropdown */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '2rem',
                    width: '100%',
                    justifyContent: 'center',
                    minHeight: '280px'
                }}>
                    {/* Candle visualization */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '250px'
                    }}>
                        {/* Flame */}
                        {isLit && (
                            <div style={{
                                width: '20px',
                                height: '30px',
                                background: 'linear-gradient(to top, #f59e0b, #fbbf24, #fef3c7)',
                                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                position: 'relative',
                                animation: 'flicker 0.3s ease-in-out infinite alternate',
                                marginBottom: '5px'
                            }} />
                        )}

                        {/* Wick */}
                        <div style={{
                            width: '3px',
                            height: '10px',
                            backgroundColor: '#1f2937',
                            marginBottom: '-2px',
                            zIndex: 2
                        }} />

                        {/* Candle body */}
                        <div style={{
                            width: '60px',
                            height: `${height}px`,
                            backgroundColor: colorMap[color],
                            borderRadius: '4px 4px 8px 8px',
                            position: 'relative',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'background-color 0.3s ease'
                        }}>
                            {/* Wax drip effect */}
                            {isLit && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '20px',
                                    height: '8px',
                                    backgroundColor: colorMap[color],
                                    opacity: 0.7,
                                    borderRadius: '50%'
                                }} />
                            )}
                        </div>
                    </div>

                    {/* Height slider (vertical) */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '250px',
                        justifyContent: 'space-between'
                    }}>
                        <label style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#334155',
                            marginBottom: '0.5rem'
                        }}>
                            Height
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="200"
                            value={height}
                            onChange={handleHeightChange}
                            disabled={isLit}
                            orient="vertical"
                            style={{
                                writingMode: 'bt-lr',
                                WebkitAppearance: 'slider-vertical',
                                width: '8px',
                                height: '200px',
                                cursor: isLit ? 'not-allowed' : 'pointer',
                                opacity: isLit ? 0.5 : 1
                            }}
                        />
                        <span style={{
                            fontSize: '12px',
                            color: '#64748b',
                            marginTop: '0.5rem'
                        }}>
                            {Math.round(height)}px
                        </span>
                    </div>

                    {/* Color dropdown */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        alignSelf: 'center'
                    }}>
                        <label style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#334155'
                        }}>
                            Color
                        </label>
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '2px solid #e2e8f0',
                                backgroundColor: 'white',
                                fontSize: '14px',
                                cursor: 'pointer',
                                color: '#334155'
                            }}
                        >
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                        </select>
                    </div>
                </div>

                {/* Control buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={handleLight}
                        disabled={isLit || height <= 50}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: '2px solid #f59e0b',
                            backgroundColor: isLit || height <= 50 ? '#f3f4f6' : '#fef3c7',
                            color: isLit || height <= 50 ? '#9ca3af' : '#92400e',
                            fontSize: '15px',
                            fontWeight: 500,
                            cursor: isLit || height <= 50 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (!isLit && height > 50) {
                                e.currentTarget.style.backgroundColor = '#fde68a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLit && height > 50) {
                                e.currentTarget.style.backgroundColor = '#fef3c7';
                            }
                        }}
                    >
                        Light Candle
                    </button>

                    <button
                        onClick={handleBlowOut}
                        disabled={!isLit}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: '2px solid #3b82f6',
                            backgroundColor: !isLit ? '#f3f4f6' : '#dbeafe',
                            color: !isLit ? '#9ca3af' : '#1e40af',
                            fontSize: '15px',
                            fontWeight: 500,
                            cursor: !isLit ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (isLit) {
                                e.currentTarget.style.backgroundColor = '#bfdbfe';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (isLit) {
                                e.currentTarget.style.backgroundColor = '#dbeafe';
                            }
                        }}
                    >
                        Blow Out
                    </button>
                </div>

                {/* Status info */}
                <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    width: '100%',
                    fontSize: '14px',
                    color: '#334155'
                }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>Status:</strong> {isLit ? '🔥 Lit' : 'Unlit'}
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>Color:</strong> {color.charAt(0).toUpperCase() + color.slice(1)}
                    </p>
                    <p style={{ margin: '0' }}>
                        <strong>Height:</strong> {Math.round(height)}px
                    </p>
                    {isLit && (
                        <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', color: '#64748b' }}>
                            The candle is burning down...
                        </p>
                    )}
                    {!isLit && height > 50 && (
                        <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', color: '#64748b' }}>
                            You can adjust the height while the candle is unlit.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Add CSS animation for flame flicker
const style = document.createElement('style');
style.textContent = `
  @keyframes flicker {
    0% { transform: scaleY(1) scaleX(1); }
    100% { transform: scaleY(1.1) scaleX(0.95); }
  }
`;
document.head.appendChild(style);

// Auto-mount when script loads
const mountPoint = document.getElementById('candle');
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<Candle />);
}

export default Candle;
