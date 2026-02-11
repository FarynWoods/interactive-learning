import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface CodeOptionQuizProps {
    question: string;
    options: string[];
    correctAnswer: number;
    explanations: string[];
}

function CodeOptionQuiz({ question, options, correctAnswer, explanations }: CodeOptionQuizProps) {
    const [currentOption, setCurrentOption] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handlePrevious = () => {
        setCurrentOption((prev) => (prev - 1 + options.length) % options.length);
    };

    const handleNext = () => {
        setCurrentOption((prev) => (prev + 1) % options.length);
    };

    const handleSubmit = () => {
        const correct = currentOption === correctAnswer;
        setIsCorrect(correct);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setCurrentOption(0);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Question */}
            <p style={{
                color: '#334155',
                marginBottom: '1.5rem',
                fontSize: '16px',
                lineHeight: '1.6',
                fontWeight: 500
            }} dangerouslySetInnerHTML={{ __html: question }}>
            </p>

            {/* Navigation buttons */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <button
                    onClick={handlePrevious}
                    disabled={isSubmitted}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid #cbd5e1',
                        backgroundColor: isSubmitted ? '#f3f4f6' : 'white',
                        color: isSubmitted ? '#9ca3af' : '#334155',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: isSubmitted ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitted) {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitted) {
                            e.currentTarget.style.backgroundColor = 'white';
                        }
                    }}
                >
                    ← Previous
                </button>
                <span style={{
                    fontSize: '14px',
                    color: '#64748b',
                    fontWeight: 500
                }}>
                    Option {currentOption + 1} of {options.length}
                </span>
                <button
                    onClick={handleNext}
                    disabled={isSubmitted}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid #cbd5e1',
                        backgroundColor: isSubmitted ? '#f3f4f6' : 'white',
                        color: isSubmitted ? '#9ca3af' : '#334155',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: isSubmitted ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitted) {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitted) {
                            e.currentTarget.style.backgroundColor = 'white';
                        }
                    }}
                >
                    Next →
                </button>
            </div>

            {/* Code display */}
            <div style={{
                backgroundColor: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                minHeight: '150px'
            }}>
                <pre style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#1e293b',
                    whiteSpace: 'pre-wrap'
                }}>
                    <code>{options[currentOption]}</code>
                </pre>
            </div>

            {/* Submit and Reset buttons */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                {!isSubmitted && (
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '12px 32px',
                            borderRadius: '8px',
                            border: '2px solid #3b82f6',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#3b82f6';
                        }}
                    >
                        Submit Answer
                    </button>
                )}

                {isSubmitted && (
                    <div style={{
                        border: `2px solid ${isCorrect ? '#bbf7d0' : '#fed7aa'}`,
                        backgroundColor: isCorrect ? '#f0fdf4' : '#fffbeb',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                        width: '100%'
                    }}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isCorrect ? '#16a34a' : '#ea580c'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, marginTop: '2px' }}
                        >
                            {isCorrect ? (
                                <>
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </>
                            ) : (
                                <>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </>
                            )}
                        </svg>
                        <div style={{ color: isCorrect ? '#14532d' : '#78350f' }}>
                            <p style={{ marginBottom: '4px', fontWeight: '500' }}>
                                {isCorrect ? 'Correct! Well done!' : 'Not quite right.'}
                            </p>
                            <p style={{ fontSize: '14px', opacity: 0.9 }} dangerouslySetInnerHTML={{ __html: explanations[currentOption] }}>
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleReset}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: '2px solid #64748b',
                        backgroundColor: 'white',
                        color: '#334155',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                    }}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

// Auto-mount all code option quizzes when script loads
const mountPoints = document.querySelectorAll('[id^="code-option-quiz"]');
mountPoints.forEach((mountPoint) => {
    const root = createRoot(mountPoint);

    // Get quiz data from data attributes
    const questionData = mountPoint.getAttribute('data-question');
    const optionsData = mountPoint.getAttribute('data-options');
    const correctAnswerData = mountPoint.getAttribute('data-correct-answer');
    const explanationsData = mountPoint.getAttribute('data-explanations');

    if (questionData && optionsData && correctAnswerData && explanationsData) {
        root.render(
            <CodeOptionQuiz
                question={questionData}
                options={JSON.parse(optionsData)}
                correctAnswer={parseInt(correctAnswerData, 10)}
                explanations={JSON.parse(explanationsData)}
            />
        );
    }
});

export default CodeOptionQuiz;
