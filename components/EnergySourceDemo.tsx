import { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface PowerDataPoint {
    time: number;
    wind: number;
    solar: number;
    fossil: number;
}

const TRACE_DURATION = 4000; // 4 seconds in milliseconds

function EnergySourceDemo() {
    const [windSpeed, setWindSpeed] = useState(50); // 0-100
    const [hourOfDay, setHourOfDay] = useState(12); // 4-20 (4AM to 8PM)
    const [fossilBurning, setFossilBurning] = useState(2); // 0-5 discrete steps

    const [powerData, setPowerData] = useState<PowerDataPoint[]>([]);
    const startTimeRef = useRef<number>(Date.now());
    const animationFrameRef = useRef<number>();

    // Generate random star positions once and keep them consistent
    const stars = useMemo(() => {
        return Array.from({ length: 50 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 70,
            size: 1 + Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.5,
        }));
    }, []);

    // Calculate realistic power output for each source
    const calculatePower = () => {
        const currentTime = Date.now() - startTimeRef.current;

        const windPower = windSpeed;

        const hourRange = 20 - 4;
        const normalizedHour = (hourOfDay - 4) / hourRange;
        const sunIntensity = Math.max(0, Math.sin(normalizedHour * Math.PI));
        const solarPower = sunIntensity * 80;

        const fossilPower = fossilBurning * 20;

        return {
            time: currentTime,
            wind: windPower,
            solar: solarPower,
            fossil: fossilPower,
        };
    };

    // Animation loop to update power data
    useEffect(() => {
        const updateData = () => {
            const newDataPoint = calculatePower();

            setPowerData((prevData) => {
                const cutoffTime = newDataPoint.time - TRACE_DURATION;
                const filteredData = prevData.filter((d) => d.time > cutoffTime);
                return [...filteredData, newDataPoint];
            });

            animationFrameRef.current = requestAnimationFrame(updateData);
        };

        animationFrameRef.current = requestAnimationFrame(updateData);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [windSpeed, hourOfDay, fossilBurning]);

    // Calculate sun position based on hour of day
    const getSunPosition = () => {
        const hour = hourOfDay;
        const totalHours = 16;
        const x = 1 + ((hour - 4) / totalHours) * 100;

        const maxHeight = 30;
        const horizonHeight = 110;
        let y: number;

        if (hour < 6) {
            y = horizonHeight + (6 - hour) * 5;
        } else if (hour >= 19) {
            y = horizonHeight + (hour - 19) * 5;
        } else {
            const visibleHours = 12;
            const hourInArc = hour - 6;
            const normalizedTime = hourInArc / visibleHours;
            const peakTime = 6 / visibleHours;
            const heightRange = horizonHeight - maxHeight;
            y = maxHeight + heightRange * Math.pow((normalizedTime - peakTime) / peakTime, 2);

            if (hour === 6 || hour === 18) {
                y = 95;
            }
        }

        return { x: `${x}%`, y: `${y}%`, hour };
    };

    const sunPos = getSunPosition();
    const isDaytime = sunPos.hour >= 6 && sunPos.hour <= 18;

    // Calculate sky colors based on time of day
    const getSkyColors = () => {
        const hour = sunPos.hour;

        if (hour < 6 || hour >= 19) {
            return {
                gradient: 'linear-gradient(to bottom, #0f172a, #1e293b)',
                showStars: true,
                showSun: false
            };
        }

        if (hour >= 6 && hour <= 8) {
            const dawnProgress = (hour - 7) / 2;
            return {
                gradient: `linear-gradient(to bottom,
          hsl(${200 + dawnProgress * 10}, ${40 + dawnProgress * 30}%, ${40 + dawnProgress * 30}%),
          hsl(${30 - dawnProgress * 10}, ${70 - dawnProgress * 20}%, ${60 + dawnProgress * 10}%))`,
                showStars: hour < 8,
                showSun: true
            };
        }

        if (hour >= 8 && hour <= 16) {
            const noonProgress = 1 - Math.abs(hour - 12) / 3;
            return {
                gradient: `linear-gradient(to bottom,
          hsl(200, ${70 + noonProgress * 10}%, ${55 + noonProgress * 5}%),
          hsl(200, ${50 + noonProgress * 10}%, ${75 + noonProgress * 5}%))`,
                showStars: false,
                showSun: true
            };
        }

        if (hour >= 17 && hour <= 20) {
            const duskProgress = (hour - 17) / 2;
            return {
                gradient: `linear-gradient(to bottom,
          hsl(${210 - duskProgress * 10}, ${80 - duskProgress * 30}%, ${55 - duskProgress * 30}%),
          hsl(${30 + duskProgress * 10}, ${70 + duskProgress * 10}%, ${55 - duskProgress * 20}%))`,
                showStars: hour >= 18,
                showSun: true
            };
        }

        return {
            gradient: 'linear-gradient(to bottom, #3b82f6, #93c5fd)',
            showStars: false,
            showSun: true
        };
    };

    const skyColors = getSkyColors();

    return (
        <div style={{ width: '100%', maxWidth: '72rem', margin: '0 auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Graphics Scene */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '20rem',
                    background: skyColors.gradient,
                    borderRadius: '0.5rem',
                    border: '2px solid #94a3b8',
                    overflow: 'hidden'
                }}>
                    {/* Stars */}
                    {skyColors.showStars && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            {stars.map((star, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        left: `${star.x}%`,
                                        top: `${star.y}%`,
                                        width: `${star.size}px`,
                                        height: `${star.size}px`,
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        opacity: star.opacity
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Sun */}
                    {skyColors.showSun && (
                        <div style={{
                            position: 'absolute',
                            left: sunPos.x,
                            top: sunPos.y,
                            transform: 'translate(-50%, -50%)',
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '50%',
                            backgroundColor: isDaytime ? '#fbbf24' : '#e5e7eb',
                            boxShadow: isDaytime ? '0 0 20px #fbbf24' : '0 0 10px #e5e7eb'
                        }} />
                    )}

                    {/* Energy Sources */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                        padding: '0 2rem'
                    }}>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <WindmillGraphic windSpeed={windSpeed} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <SolarPanelGraphic />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <FossilPlantGraphic smokeLevel={fossilBurning} />
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                            Wind Speed: {windSpeed}%
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={windSpeed}
                            onChange={(e) => setWindSpeed(Number(e.target.value))}
                            style={{ width: '100%' }}
                            data-state="windSpeed"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                            Time of Day: {sunPos.hour > 12 ? sunPos.hour - 12 : sunPos.hour}:00 {sunPos.hour >= 12 ? 'PM' : 'AM'}
                        </label>
                        <input
                            type="range"
                            min="4"
                            max="20"
                            value={hourOfDay}
                            onChange={(e) => setHourOfDay(Number(e.target.value))}
                            style={{ width: '100%' }}
                            data-state="hourOfDay"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                            Fossil Fuel Burning: Level {fossilBurning}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="5"
                            value={fossilBurning}
                            onChange={(e) => setFossilBurning(Number(e.target.value))}
                            style={{ width: '100%' }}
                            data-state="fossilBurning"
                        />
                    </div>
                </div>

                {/* Live Power Output Graph */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '2px solid #94a3b8',
                    padding: '1.5rem'
                }}>
                    <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        marginBottom: '1rem'
                    }}>
                        Power Output (Megawatts)
                    </h3>
                    <PowerGraph data={powerData} traceDuration={TRACE_DURATION} />
                </div>
            </div>
        </div>
    );
}

// Windmill graphic component with spinning blades
function WindmillGraphic({ windSpeed }: { windSpeed: number }) {
    const [rotation, setRotation] = useState(0);
    const lastTimeRef = useRef<number>(Date.now());
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const animate = () => {
            const now = Date.now();
            const delta = now - lastTimeRef.current;
            lastTimeRef.current = now;

            const degreesPerSecond = windSpeed * 3.6;
            const rotationDelta = (degreesPerSecond * delta) / 1000;

            setRotation((prev) => (prev + rotationDelta) % 360);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [windSpeed]);

    return (
        <div style={{
            position: 'relative',
            width: '64px',
            height: '192px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {/* Tower */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '96px', // Tower height: 192px / 2 = 96px (increased from 64px)
                backgroundColor: '#94a3b8',
                zIndex: 1, // Behind the blades
            }} />

            {/* Blades */}
            <div style={{
                position: 'absolute',
                top: '64px', // Blade offset: (192 - 64) / 2 = 64px (increased from 32px)
                left: '50%',
                transform: 'translateX(-50%)',
                width: '64px',
                height: '64px',
                zIndex: 2, // In front of tower
            }}>
                {/* Rotating container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transform: `rotate(${rotation}deg)`,
                }}>
                    {/* Three blades at 0°, 120°, 240° */}
                    {[0, 120, 240].map((angle) => (
                        <div
                            key={angle}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '4px',
                                height: '32px',
                                backgroundColor: '#475569',
                                transformOrigin: 'top center',
                                transform: `translate(-50%, 0) rotate(${angle}deg)`,
                            }}
                        />
                    ))}

                    {/* Center hub (on top of everything) */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#334155',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 3, // On top of blades and tower
                    }} />
                </div>
            </div>
        </div>
    );
}

// Solar panel graphic
function SolarPanelGraphic() {
    return (
        <img
            src="../assets/images/solar_panel.png"
            alt="Solar Panels"
            style={{ height: '120px', width: 'auto' }}
        />
    );
}

// Fossil fuel plant with smoke overlay
function FossilPlantGraphic({ smokeLevel }: { smokeLevel: number }) {
    const baseOpacity = 0.3 + smokeLevel * 0.15; // More smoke = higher base opacity
    const numPuffs = Math.min(3 + smokeLevel * 2, 12); // More puffs at higher levels (5-12 puffs)
    const puffSpacing = Math.max(0.2, 0.6 - smokeLevel * 0.08); // Faster spawning at higher levels

    // Generate stable random positions for each puff (only recalculate when numPuffs changes)
    const puffOffsets = useMemo(() => {
        return Array.from({ length: numPuffs }, () => Math.random() * 12 - 6);
    }, [numPuffs]);

    return (
        <div style={{ position: 'relative' }}>
            {/* Plant image */}
            <img
                src="../assets/images/factory.png"
                alt="Fossil Fuel Plant"
                style={{ height: '120px', width: 'auto' }}
            />

            {/* Smoke coming from smokestack */}
            <div
                style={{
                    position: 'absolute',
                    left: '85%',
                    top: '-40px',
                    pointerEvents: 'none',
                    width: 0,
                    height: 0,
                }}
            >
                {smokeLevel > 0 && Array.from({ length: numPuffs }).map((_, i) => {
                    const puffDelay = i * puffSpacing;
                    const offsetX = puffOffsets[i];

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: `${offsetX}px`,
                                top: '20px',
                                width: '18px',
                                height: '18px',
                                backgroundColor: `rgba(80, 80, 80, ${baseOpacity})`,
                                borderRadius: '50%',
                                animation: `float 2.0s ease-in-out infinite`,
                                animationDelay: `${puffDelay}s`,
                                marginLeft: '-9px',
                                transition: 'background-color 0.3s ease',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// Power output graph component
function PowerGraph({ data, traceDuration }: { data: PowerDataPoint[]; traceDuration: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 20, right: 20, bottom: 40, left: 60 };
        const graphWidth = width - padding.left - padding.right;
        const graphHeight = height - padding.top - padding.bottom;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(padding.left, padding.top, graphWidth, graphHeight);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {
            const y = padding.top + graphHeight - (i * graphHeight / 5);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + graphWidth, y);
            ctx.stroke();

            ctx.fillStyle = '#64748b';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`${i * 20}`, padding.left - 10, y + 4);
        }

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + graphHeight);
        ctx.lineTo(padding.left + graphWidth, padding.top + graphHeight);
        ctx.stroke();

        ctx.save();
        ctx.translate(20, padding.top + graphHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Power Output (MW)', 0, 0);
        ctx.restore();

        ctx.fillStyle = '#475569';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Time', padding.left + graphWidth / 2, height - 10);

        if (data.length < 2) return;

        const maxPower = 100;
        const currentTime = data[data.length - 1].time;
        const timeRange = traceDuration;

        const drawTrace = (color: string, getValue: (d: PowerDataPoint) => number) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();

            let isFirst = true;
            for (const point of data) {
                const x = padding.left + ((point.time - (currentTime - timeRange)) / timeRange) * graphWidth;
                const y = padding.top + graphHeight - (getValue(point) / maxPower) * graphHeight;

                if (isFirst) {
                    ctx.moveTo(x, y);
                    isFirst = false;
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
        };

        drawTrace('#10b981', (d) => d.wind);
        drawTrace('#f59e0b', (d) => d.solar);
        drawTrace('#6366f1', (d) => d.fossil);

        const legendX = padding.left + graphWidth - 120;
        const legendY = padding.top + 10;
        const legendItems = [
            { label: 'Wind', color: '#10b981' },
            { label: 'Solar', color: '#f59e0b' },
            { label: 'Fossil Fuel', color: '#6366f1' },
        ];

        legendItems.forEach((item, i) => {
            const y = legendY + i * 20;

            ctx.fillStyle = item.color;
            ctx.fillRect(legendX, y, 12, 12);

            ctx.fillStyle = '#475569';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(item.label, legendX + 18, y + 10);
        });

    }, [data, traceDuration]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '320px' }}
        />
    );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-40px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Auto-mount when script loads
const mountPoint = document.getElementById('energy-source-demo');
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<EnergySourceDemo />);
}
