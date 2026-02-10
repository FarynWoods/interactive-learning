import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface InteractiveCodeRunnerProps {
    codeTemplate: string;
    outputTemplate: string;
    choices: string[];
    choiceLabel: string;
}

function InteractiveCodeRunner({ codeTemplate, outputTemplate, choices, choiceLabel }: InteractiveCodeRunnerProps) {
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [hasRun, setHasRun] = useState(false);

    const handleChoiceSelect = (choice: string) => {
        setSelectedChoice(choice);
        setHasRun(false);
    };

    const handleRun = () => {
        setHasRun(true);
    };

    const handleRetry = () => {
        setSelectedChoice(null);
        setHasRun(false);
    };

    // Replace placeholder with selected choice
    const getCode = () => {
        if (!selectedChoice) return codeTemplate;
        // Replace all placeholders with the selected choice
        return codeTemplate.replace(/<[^>]+>/g, selectedChoice);
    };

    const getOutput = () => {
        if (!selectedChoice) return outputTemplate;

        // Handle different output patterns based on choice
        if (selectedChoice === 'forward') {
            return outputTemplate
                .replace(/<in front of\/behind>/g, 'in front of')
                .replace(/<direction>/g, 'forward');
        } else if (selectedChoice === 'backward') {
            return outputTemplate
                .replace(/<in front of\/behind>/g, 'behind')
                .replace(/<direction>/g, 'backward');
        }

        // For other cases, just replace all placeholders with the choice
        return outputTemplate.replace(/<[^>]+>/g, selectedChoice);
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Code display - always visible */}
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
                    <code>{getCode()}</code>
                </pre>
            </div>

            {/* Choice buttons */}
            {!selectedChoice && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#64748b',
                        fontWeight: 500
                    }}>
                        {choiceLabel}
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '12px'
                    }}>
                        {choices.map((choice) => (
                            <button
                                key={choice}
                                onClick={() => handleChoiceSelect(choice)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    border: '2px solid #3b82f6',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2563eb';
                                    e.currentTarget.style.borderColor = '#2563eb';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#3b82f6';
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                }}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Run button */}
            {selectedChoice && !hasRun && (
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

            {/* Output display */}
            {hasRun && (
                <div style={{
                    backgroundColor: '#0f172a',
                    border: '2px solid #334155',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginTop: '1rem'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '0.5rem',
                        color: '#64748b',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
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
                        color: '#e2e8f0',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        backgroundColor: '#0f172a',
                        padding: '0.5rem'
                    }}>
                        {getOutput()}
                    </pre>
                </div>
            )}

            {/* Retry button */}
            {hasRun && (
                <button
                    onClick={handleRetry}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: '2px solid #64748b',
                        backgroundColor: 'transparent',
                        color: '#64748b',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        margin: '1rem auto 0'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.borderColor = '#475569';
                        e.currentTarget.style.color = '#475569';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = '#64748b';
                        e.currentTarget.style.color = '#64748b';
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Try Again
                </button>
            )}
        </div>
    );
}

// Auto-mount all interactive code runners when script loads
const mountPoints = document.querySelectorAll('[id^="interactive-code-runner"]');
mountPoints.forEach((mountPoint) => {
    const root = createRoot(mountPoint);

    // Get data from data attributes
    const codeTemplate = mountPoint.getAttribute('data-code-template');
    const outputTemplate = mountPoint.getAttribute('data-output-template');
    const choicesData = mountPoint.getAttribute('data-choices');
    const choiceLabel = mountPoint.getAttribute('data-choice-label');

    if (codeTemplate && outputTemplate && choicesData && choiceLabel) {
        root.render(
            <InteractiveCodeRunner
                codeTemplate={codeTemplate}
                outputTemplate={outputTemplate}
                choices={JSON.parse(choicesData)}
                choiceLabel={choiceLabel}
            />
        );
    }
});

export default InteractiveCodeRunner;
