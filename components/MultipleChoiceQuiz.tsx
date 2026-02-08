import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface MultipleChoiceQuizProps {
    question: string;
    options: string[];
    correctAnswer: number;
    explanations: string[];
    onComplete?: () => void;
    alreadyAnswered?: boolean;
}

function MultipleChoiceQuiz({
    question,
    options,
    correctAnswer,
    explanations,
    onComplete,
    alreadyAnswered = false
}: MultipleChoiceQuizProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [wrongAttempts, setWrongAttempts] = useState<Set<number>>(new Set());
    const [isCompleted, setIsCompleted] = useState(alreadyAnswered);

    const handleSelectAnswer = (index: number) => {
        if (isCompleted) return;

        setSelectedAnswer(index);

        if (index === correctAnswer) {
            // Correct answer!
            setIsCompleted(true);
            if (onComplete) onComplete();
        } else {
            // Wrong answer - mark it and allow retry
            setWrongAttempts(new Set([...wrongAttempts, index]));
        }
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
                    const isCorrectOption = index === correctAnswer;
                    const wasWrongAttempt = wrongAttempts.has(index);

                    let buttonStyle: React.CSSProperties = {
                        width: '100%',
                        padding: '16px',
                        textAlign: 'left',
                        border: '2px solid',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        cursor: isCompleted || wasWrongAttempt ? 'not-allowed' : 'pointer',
                        fontSize: '15px',
                        backgroundColor: '#fff',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    };

                    if (isCompleted && isCorrectOption) {
                        buttonStyle.borderColor = '#10b981';
                        buttonStyle.backgroundColor = '#f0fdf4';
                    } else if (wasWrongAttempt) {
                        buttonStyle.borderColor = '#ef4444';
                        buttonStyle.backgroundColor = '#fef2f2';
                    } else {
                        buttonStyle.borderColor = '#e2e8f0';
                        if (!isCompleted) {
                            buttonStyle.opacity = 1;
                        } else {
                            buttonStyle.opacity = 0.6;
                        }
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            style={buttonStyle}
                            disabled={isCompleted || wasWrongAttempt}
                            onMouseEnter={(e) => {
                                if (!isCompleted && !wasWrongAttempt) {
                                    e.currentTarget.style.borderColor = '#cbd5e1';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isCompleted && !wasWrongAttempt) {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                }
                            }}
                        >
                            <span style={{ color: '#1e293b' }}>{option}</span>
                            {isCompleted && isCorrectOption && (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            )}
                            {wasWrongAttempt && (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>

            {wrongAttempts.size > 0 && !isCompleted && selectedAnswer !== null && (
                <div style={{
                    border: '2px solid #fed7aa',
                    backgroundColor: '#fffbeb',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                    display: 'flex',
                    gap: '12px'
                }}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ea580c"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div style={{ color: '#78350f' }}>
                        <p style={{ marginBottom: '4px', fontWeight: '500' }}>Not quite right. Try again!</p>
                        <p style={{ fontSize: '14px', opacity: 0.9 }}>{explanations[selectedAnswer]}</p>
                    </div>
                </div>
            )}

            {isCompleted && selectedAnswer !== null && (
                <div style={{
                    border: '2px solid #bbf7d0',
                    backgroundColor: '#f0fdf4',
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
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div style={{ color: '#14532d' }}>
                        <p style={{ marginBottom: '4px', fontWeight: '500' }}>Correct! Well done!</p>
                        <p style={{ fontSize: '14px', opacity: 0.9 }}>{explanations[selectedAnswer]}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Auto-mount when script loads
const mountPoint = document.getElementById('multiple-choice-quiz');
if (mountPoint) {
    const root = createRoot(mountPoint);

    // Get quiz data from data attributes
    const questionData = mountPoint.getAttribute('data-question');
    const optionsData = mountPoint.getAttribute('data-options');
    const correctAnswerData = mountPoint.getAttribute('data-correct-answer');
    const explanationsData = mountPoint.getAttribute('data-explanations');

    if (questionData && optionsData && correctAnswerData && explanationsData) {
        root.render(
            <MultipleChoiceQuiz
                question={questionData}
                options={JSON.parse(optionsData)}
                correctAnswer={parseInt(correctAnswerData, 10)}
                explanations={JSON.parse(explanationsData)}
            />
        );
    }
}

export default MultipleChoiceQuiz;
