import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface ReflectionQuizProps {
    question: string;
    options: string[];
    explanations: string[];
    onComplete?: () => void;
    alreadyAnswered?: boolean;
}

function ReflectionQuiz({
    question,
    options,
    explanations,
    onComplete,
    alreadyAnswered = false
}: ReflectionQuizProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCompleted, setIsCompleted] = useState(alreadyAnswered);

    const handleSelectAnswer = (index: number) => {
        if (isCompleted) return;

        setSelectedAnswer(index);

        // For reflection questions, any answer completes the question
        setIsCompleted(true);
        if (onComplete) onComplete();
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

            <div style={{ marginBottom: '24px' }}>
                {options.map((option, index) => {
                    const isCurrentlySelected = selectedAnswer === index;

                    let buttonStyle: React.CSSProperties = {
                        width: '100%',
                        padding: '16px',
                        textAlign: 'left',
                        border: '2px solid',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        cursor: isCompleted ? 'not-allowed' : 'pointer',
                        fontSize: '15px',
                        backgroundColor: '#fff',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    };

                    if (isCompleted && isCurrentlySelected) {
                        // Selected answer - show in cyan
                        buttonStyle.borderColor = '#06b6d4';
                        buttonStyle.backgroundColor = '#ecfeff';
                    } else if (isCompleted) {
                        // Other options when completed - show faded
                        buttonStyle.borderColor = '#e2e8f0';
                        buttonStyle.opacity = 0.6;
                    } else {
                        // Not yet answered - show normal with hover effect
                        buttonStyle.borderColor = '#e2e8f0';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            style={buttonStyle}
                            disabled={isCompleted}
                            onMouseEnter={(e) => {
                                if (!isCompleted) {
                                    e.currentTarget.style.borderColor = '#cbd5e1';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isCompleted) {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                }
                            }}
                        >
                            <span style={{ color: '#1e293b' }}>{option}</span>
                            {isCompleted && isCurrentlySelected && (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0891b2"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>

            {isCompleted && selectedAnswer !== null && (
                <div style={{
                    border: '2px solid #a5f3fc',
                    backgroundColor: '#ecfeff',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    gap: '12px'
                }}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                    </svg>
                    <div style={{ color: '#164e63' }}>
                        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{explanations[selectedAnswer]}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Auto-mount when script loads
const mountPoint = document.getElementById('reflection-quiz');
if (mountPoint) {
    const root = createRoot(mountPoint);

    // Get quiz data from data attributes
    const questionData = mountPoint.getAttribute('data-question');
    const optionsData = mountPoint.getAttribute('data-options');
    const explanationsData = mountPoint.getAttribute('data-explanations');

    if (questionData && optionsData && explanationsData) {
        root.render(
            <ReflectionQuiz
                question={questionData}
                options={JSON.parse(optionsData)}
                explanations={JSON.parse(explanationsData)}
            />
        );
    }
}

export default ReflectionQuiz;
