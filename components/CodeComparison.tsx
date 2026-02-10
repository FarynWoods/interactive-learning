import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface CodeComparisonProps {
    pseudocode: string;
    python: string;
    showBothOption?: boolean;
}

function CodeComparison({ pseudocode, python, showBothOption = true }: CodeComparisonProps) {
    const [view, setView] = useState<'pseudocode' | 'python' | 'both'>('pseudocode');

    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Toggle buttons */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                justifyContent: 'center'
            }}>
                <button
                    onClick={() => setView('pseudocode')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid',
                        borderColor: view === 'pseudocode' ? '#3b82f6' : '#e2e8f0',
                        backgroundColor: view === 'pseudocode' ? '#dbeafe' : 'white',
                        color: view === 'pseudocode' ? '#1e40af' : '#64748b',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (view !== 'pseudocode') {
                            e.currentTarget.style.borderColor = '#cbd5e1';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (view !== 'pseudocode') {
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }
                    }}
                >
                    Pseudocode
                </button>
                <button
                    onClick={() => setView('python')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid',
                        borderColor: view === 'python' ? '#3b82f6' : '#e2e8f0',
                        backgroundColor: view === 'python' ? '#dbeafe' : 'white',
                        color: view === 'python' ? '#1e40af' : '#64748b',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (view !== 'python') {
                            e.currentTarget.style.borderColor = '#cbd5e1';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (view !== 'python') {
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }
                    }}
                >
                    Python
                </button>
                {showBothOption && (
                    <button
                        onClick={() => setView('both')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '2px solid',
                            borderColor: view === 'both' ? '#3b82f6' : '#e2e8f0',
                            backgroundColor: view === 'both' ? '#dbeafe' : 'white',
                            color: view === 'both' ? '#1e40af' : '#64748b',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (view !== 'both') {
                                e.currentTarget.style.borderColor = '#cbd5e1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (view !== 'both') {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                            }
                        }}
                    >
                        Both
                    </button>
                )}
            </div>

            {/* Code display */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {(view === 'pseudocode' || view === 'both') && (
                    <div>
                        <h4 style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '0.5rem',
                            textAlign: 'center'
                        }}>
                            Pseudocode
                        </h4>
                        <pre style={{
                            backgroundColor: '#f8fafc',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem',
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            lineHeight: '1.6',
                            color: '#1e293b'
                        }}>
                            <code>{pseudocode}</code>
                        </pre>
                    </div>
                )}
                {(view === 'python' || view === 'both') && (
                    <div>
                        <h4 style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '0.5rem',
                            textAlign: 'center'
                        }}>
                            Python
                        </h4>
                        <pre style={{
                            backgroundColor: '#f8fafc',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem',
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            lineHeight: '1.6',
                            color: '#1e293b'
                        }}>
                            <code>{python}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

// Auto-mount all code comparisons when script loads
const mountPoints = document.querySelectorAll('[id^="code-comparison"]');
mountPoints.forEach((mountPoint) => {
    const root = createRoot(mountPoint);

    // Get code data from data attributes
    const pseudocodeData = mountPoint.getAttribute('data-pseudocode');
    const pythonData = mountPoint.getAttribute('data-python');
    const showBothOption = mountPoint.getAttribute('data-show-both-option') !== 'false';

    if (pseudocodeData && pythonData) {
        root.render(
            <CodeComparison
                pseudocode={pseudocodeData}
                python={pythonData}
                showBothOption={showBothOption}
            />
        );
    }
});

export default CodeComparison;
