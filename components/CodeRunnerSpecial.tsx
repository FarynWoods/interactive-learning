import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface CodeRunnerSpecialProps {
    code: string;
    output: string;
}

function CodeRunnerSpecial({ code, output }: CodeRunnerSpecialProps) {
    const [hasRun, setHasRun] = useState(false);

    const handleRun = () => {
        setHasRun(true);
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Code display */}
            <div style={{
                backgroundColor: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
            }}>
                <pre style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#1e293b',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
                }}>
                    <code>{code}</code>
                </pre>
            </div>

            {/* Run button */}
            {!hasRun && (
                <button
                    onClick={handleRun}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: '2px solid #10b981',
                        backgroundColor: '#10b981',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        margin: '0 auto'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#059669';
                        e.currentTarget.style.borderColor = '#059669';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#10b981';
                        e.currentTarget.style.borderColor = '#10b981';
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Run Code
                </button>
            )}

            {/* Output display with rainbow background */}
            {hasRun && (
                <div style={{
                    backgroundImage: 'url(../assets/images/rainbow-background.gif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid #fbbf24',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginTop: '1rem',
                    position: 'relative'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '0.5rem',
                        color: '#1e293b',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textShadow: '0 0 4px rgba(255,255,255,0.8)'
                    }}>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="4 17 10 11 4 5" />
                            <line x1="12" y1="19" x2="20" y2="19" />
                        </svg>
                        Output
                    </div>
                    <pre style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#1e293b',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        fontWeight: 600,
                        textShadow: '0 0 4px rgba(255,255,255,0.8)'
                    }}>
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
}

// Auto-mount all code runners when script loads
const mountPoints = document.querySelectorAll('[id^="code-runner-special"]');
mountPoints.forEach((mountPoint) => {
    const root = createRoot(mountPoint);

    // Get code and output from data attributes
    const codeData = mountPoint.getAttribute('data-code');
    const outputData = mountPoint.getAttribute('data-output');

    if (codeData && outputData) {
        root.render(
            <CodeRunnerSpecial
                code={codeData}
                output={outputData}
            />
        );
    }
});

export default CodeRunnerSpecial;
