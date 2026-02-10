import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface DemoStateQuizProps {
    demoId: string;
    question: string;
    validationRule: string;
    correctMessage: string;
    incorrectMessage: string;
}

function DemoStateQuiz({
    demoId,
    question,
    validationRule,
    correctMessage,
    incorrectMessage
}: DemoStateQuizProps) {
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        // Find the demo element and get its current state
        const demoElement = document.getElementById(demoId);
        if (!demoElement) {
            console.error(`Demo with id "${demoId}" not found`);
            return;
        }

        // Get the current slider/input values from the demo
        const windSlider = demoElement.querySelector('[data-state="windSpeed"]') as HTMLInputElement;
        const hourSlider = demoElement.querySelector('[data-state="hourOfDay"]') as HTMLInputElement;
        const fossilSlider = demoElement.querySelector('[data-state="fossilBurning"]') as HTMLInputElement;

        const state = {
            windSpeed: windSlider ? parseInt(windSlider.value) : 0,
            hourOfDay: hourSlider ? parseInt(hourSlider.value) : 0,
            fossilBurning: fossilSlider ? parseInt(fossilSlider.value) : 0,
        };

        // Validate based on the rule
        const correct = validateState(state, validationRule);
        setIsCorrect(correct);
        setSubmitted(true);
    };

    const handleRetry = () => {
        setSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <p style={{
                color: '#334155',
                marginBottom: '24px',
                fontSize: '16px',
                lineHeight: '1.6'
            }}>
                {question}
            </p>

            {!submitted && (
                <button
                    onClick={handleSubmit}
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '2px solid #3b82f6',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontSize: '15px',
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
                    Submit
                </button>
            )}

            {submitted && (
                <div>
                    <div style={{
                        border: '2px solid',
                        borderColor: isCorrect ? '#10b981' : '#ef4444',
                        backgroundColor: isCorrect ? '#d1fae5' : '#fee2e2',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '12px'
                    }}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isCorrect ? '#059669' : '#dc2626'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, marginTop: '2px' }}
                        >
                            {isCorrect ? (
                                <>
                                    <polyline points="20 6 9 17 4 12" />
                                </>
                            ) : (
                                <>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </>
                            )}
                        </svg>
                        <div style={{ color: isCorrect ? '#065f46' : '#991b1b' }}>
                            <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                                {isCorrect ? correctMessage : incorrectMessage}
                            </p>
                        </div>
                    </div>

                    {!isCorrect && (
                        <button
                            onClick={handleRetry}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '2px solid #64748b',
                                backgroundColor: 'transparent',
                                color: '#64748b',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
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
                            Try Again
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

function validateState(state: { windSpeed: number; hourOfDay: number; fossilBurning: number }, rule: string): boolean {
    // Parse validation rules
    if (rule === 'windSpeed:100') {
        return state.windSpeed === 100;
    } else if (rule === 'hourOfDay:12') {
        return state.hourOfDay === 12;
    } else if (rule === 'fossilBurning:5') {
        return state.fossilBurning === 5;
    } else if (rule.startsWith('windSpeed:')) {
        const target = parseInt(rule.split(':')[1]);
        return state.windSpeed === target;
    } else if (rule.startsWith('hourOfDay:')) {
        const target = parseInt(rule.split(':')[1]);
        return state.hourOfDay === target;
    } else if (rule.startsWith('fossilBurning:')) {
        const target = parseInt(rule.split(':')[1]);
        return state.fossilBurning === target;
    }
    return false;
}

// Auto-mount all demo state quizzes when script loads
const mountPoints = document.querySelectorAll('[id^="demo-state-quiz"]');
mountPoints.forEach((mountPoint) => {
    const root = createRoot(mountPoint);

    const demoId = mountPoint.getAttribute('data-demo-id');
    const question = mountPoint.getAttribute('data-question');
    const validationRule = mountPoint.getAttribute('data-validation-rule');
    const correctMessage = mountPoint.getAttribute('data-correct-message');
    const incorrectMessage = mountPoint.getAttribute('data-incorrect-message');

    if (demoId && question && validationRule && correctMessage && incorrectMessage) {
        root.render(
            <DemoStateQuiz
                demoId={demoId}
                question={question}
                validationRule={validationRule}
                correctMessage={correctMessage}
                incorrectMessage={incorrectMessage}
            />
        );
    }
});

export default DemoStateQuiz;
