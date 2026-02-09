import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

function JevonsParadox() {
    const [efficiency, setEfficiency] = useState(50); // 0-100
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Calculate overall usage based on efficiency (Jevons Paradox relationship)
    const calculateUsage = (eff: number) => {
        // As efficiency increases, usage increases (paradox)
        // Using a simple linear relationship for demonstration
        return eff * 0.8 + 10; // Returns value between 10-90
    };

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
        const padding = { top: 40, right: 40, bottom: 60, left: 70 };
        const graphWidth = width - padding.left - padding.right;
        const graphHeight = height - padding.top - padding.bottom;

        ctx.clearRect(0, 0, width, height);

        // Background
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(padding.left, padding.top, graphWidth, graphHeight);

        // Grid lines
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (i * graphHeight / 5);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + graphWidth, y);
            ctx.stroke();

            const x = padding.left + (i * graphWidth / 5);
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, padding.top + graphHeight);
            ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + graphHeight);
        ctx.lineTo(padding.left + graphWidth, padding.top + graphHeight);
        ctx.stroke();

        // Y-axis label
        ctx.save();
        ctx.translate(20, padding.top + graphHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Overall Energy Use', 0, 0);
        ctx.restore();

        // X-axis label
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Energy Efficiency', padding.left + graphWidth / 2, height - 20);

        // Y-axis ticks
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + graphHeight - (i * graphHeight / 5);
            const value = i * 20;
            ctx.fillText(`${value}`, padding.left - 10, y + 4);
        }

        // X-axis ticks
        ctx.textAlign = 'center';
        for (let i = 0; i <= 5; i++) {
            const x = padding.left + (i * graphWidth / 5);
            const value = i * 20;
            ctx.fillText(`${value}`, x, padding.top + graphHeight + 20);
        }

        // Draw the full curve (showing the Jevons Paradox relationship)
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let eff = 0; eff <= 100; eff++) {
            const usage = calculateUsage(eff);
            const x = padding.left + (eff / 100) * graphWidth;
            const y = padding.top + graphHeight - (usage / 100) * graphHeight;

            if (eff === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Draw the traced line (from 0 to current efficiency)
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let eff = 0; eff <= efficiency; eff++) {
            const usage = calculateUsage(eff);
            const x = padding.left + (eff / 100) * graphWidth;
            const y = padding.top + graphHeight - (usage / 100) * graphHeight;

            if (eff === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Draw current point
        const currentUsage = calculateUsage(efficiency);
        const currentX = padding.left + (efficiency / 100) * graphWidth;
        const currentY = padding.top + graphHeight - (currentUsage / 100) * graphHeight;

        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
        ctx.fill();

        // Draw dotted lines to axes
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        // Vertical line to x-axis
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(currentX, padding.top + graphHeight);
        ctx.stroke();

        // Horizontal line to y-axis
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(padding.left, currentY);
        ctx.stroke();

        ctx.setLineDash([]);

    }, [efficiency]);

    const currentUsage = calculateUsage(efficiency);

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '2px solid #94a3b8',
                padding: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1rem'
            }}>
                <label style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#334155'
                }}>
                    Energy Efficiency: {efficiency.toFixed(0)}%
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{
                backgroundColor: '#f1f5f9',
                borderRadius: '0.5rem',
                padding: '1rem',
                fontSize: '14px',
                color: '#334155'
            }}>
                <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Current Energy Efficiency:</strong> {efficiency.toFixed(0)}%
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Overall Energy Use:</strong> {currentUsage.toFixed(1)} units
                </p>
            </div>
        </div>
    );
}

// Auto-mount when script loads
const mountPoint = document.getElementById('jevons-paradox');
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<JevonsParadox />);
}

export default JevonsParadox;
