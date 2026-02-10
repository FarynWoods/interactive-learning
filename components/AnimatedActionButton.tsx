import { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

interface AnimatedActionButtonProps {
    buttonText: string;
    gifPath: string;
    duration: number;
}

function AnimatedActionButton({ buttonText, gifPath, duration }: AnimatedActionButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [staticImageUrl, setStaticImageUrl] = useState<string>('');
    const imgRef = useRef<HTMLImageElement>(null);

    // Extract first frame of GIF on mount
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                setStaticImageUrl(canvas.toDataURL());
            }
        };
        img.src = gifPath;
    }, [gifPath]);

    const handleClick = () => {
        setIsPlaying(true);

        // Force GIF to restart by reloading
        if (imgRef.current) {
            const currentSrc = imgRef.current.src;
            imgRef.current.src = '';
            imgRef.current.src = currentSrc;
        }

        // Reset after duration
        setTimeout(() => {
            setIsPlaying(false);
        }, duration);
    };

    return (
        <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '2rem',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                position: 'relative',
                overflow: 'visible'
            }}>
                {/* Button */}
                <button
                onClick={handleClick}
                disabled={isPlaying}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '2px solid #10b981',
                    backgroundColor: isPlaying ? '#d1d5db' : '#10b981',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: isPlaying ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    whiteSpace: 'nowrap',
                    minWidth: '200px'
                }}
                onMouseEnter={(e) => {
                    if (!isPlaying) {
                        e.currentTarget.style.backgroundColor = '#059669';
                        e.currentTarget.style.borderColor = '#059669';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isPlaying) {
                        e.currentTarget.style.backgroundColor = '#10b981';
                        e.currentTarget.style.borderColor = '#10b981';
                    }
                }}
            >
                {buttonText}
            </button>

            {/* Image/GIF */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isPlaying ? (
                    <img
                        ref={imgRef}
                        src={gifPath}
                        alt="Animation"
                        style={{
                            maxWidth: '200px',
                            height: 'auto',
                            imageRendering: 'pixelated'
                        }}
                    />
                ) : (
                    staticImageUrl && (
                        <img
                            src={staticImageUrl}
                            alt="Static frame"
                            style={{
                                maxWidth: '200px',
                                height: 'auto',
                                imageRendering: 'pixelated'
                            }}
                        />
                    )
                )}
            </div>
        </div>
    );
}

// Auto-mount all animated action buttons when script loads
const mountPoints = document.querySelectorAll('[id^="animated-action-button"]');
mountPoints.forEach((mountPoint) => {
    const root = createRoot(mountPoint);

    const buttonText = mountPoint.getAttribute('data-button-text');
    const gifPath = mountPoint.getAttribute('data-gif-path');
    const duration = parseInt(mountPoint.getAttribute('data-duration') || '3000');

    if (buttonText && gifPath) {
        root.render(
            <AnimatedActionButton
                buttonText={buttonText}
                gifPath={gifPath}
                duration={duration}
            />
        );
    }
});

export default AnimatedActionButton;
