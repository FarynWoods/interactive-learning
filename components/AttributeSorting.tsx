import { useState } from 'react';
import { createRoot } from 'react-dom/client';

interface Attribute {
    id: string;
    text: string;
    correctCategory: 'all' | 'specific';
}

const attributes: Attribute[] = [
    { id: 'name', text: 'have a name', correctCategory: 'all' },
    { id: 'use', text: 'can be used', correctCategory: 'all' },
    { id: 'thrown', text: 'can be thrown', correctCategory: 'specific' },
    { id: 'speed', text: 'affect kart speed', correctCategory: 'specific' },
    { id: 'invincibility', text: 'grant invincibility', correctCategory: 'specific' },
];

function AttributeSorting() {
    const [leftItems, setLeftItems] = useState<string[]>(attributes.map(a => a.id));
    const [allItemsSlots, setAllItemsSlots] = useState<(string | null)[]>([null, null, null]);
    const [specificItemsSlots, setSpecificItemsSlots] = useState<(string | null)[]>([null, null, null]);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleDragStart = (e: React.DragEvent, itemId: string) => {
        setDraggedItem(itemId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDropLeft = (e: React.DragEvent) => {
        e.preventDefault();
        if (!draggedItem) return;

        // Remove from all slots
        setAllItemsSlots(prev => prev.map(id => id === draggedItem ? null : id));
        setSpecificItemsSlots(prev => prev.map(id => id === draggedItem ? null : id));

        // Add to left if not already there
        if (!leftItems.includes(draggedItem)) {
            setLeftItems(prev => [...prev, draggedItem]);
        }

        setDraggedItem(null);
    };

    const handleDropSlot = (e: React.DragEvent, category: 'all' | 'specific', slotIndex: number) => {
        e.preventDefault();
        if (!draggedItem) return;

        const slots = category === 'all' ? allItemsSlots : specificItemsSlots;
        const setSlots = category === 'all' ? setAllItemsSlots : setSpecificItemsSlots;

        // If slot is occupied, do nothing
        if (slots[slotIndex] !== null) {
            setDraggedItem(null);
            return;
        }

        // Remove from left items
        setLeftItems(prev => prev.filter(id => id !== draggedItem));

        // Remove from other category's slots
        if (category === 'all') {
            setSpecificItemsSlots(prev => prev.map(id => id === draggedItem ? null : id));
        } else {
            setAllItemsSlots(prev => prev.map(id => id === draggedItem ? null : id));
        }

        // Add to this slot
        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = draggedItem;
            return newSlots;
        });

        setDraggedItem(null);
    };

    const handleSubmit = () => {
        // Check if all items are placed (moved from left side)
        if (leftItems.length > 0) {
            return; // Don't submit if items are still on the left
        }

        // Check correctness
        const allCorrect = allItemsSlots.every(slotId => {
            if (slotId === null) return true;
            const attr = attributes.find(a => a.id === slotId);
            return attr?.correctCategory === 'all';
        });

        const specificCorrect = specificItemsSlots.every(slotId => {
            if (slotId === null) return true;
            const attr = attributes.find(a => a.id === slotId);
            return attr?.correctCategory === 'specific';
        });

        setIsCorrect(allCorrect && specificCorrect);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setLeftItems(attributes.map(a => a.id));
        setAllItemsSlots([null, null, null]);
        setSpecificItemsSlots([null, null, null]);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    const getAttributeById = (id: string) => attributes.find(a => a.id === id);

    const allItemsPlaced = leftItems.length === 0;

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
                padding: '1.5rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    minHeight: '400px'
                }}>
                    {/* Left side - Unsorted items */}
                    <div>
                        <h4 style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#334155',
                            marginBottom: '1rem'
                        }}>
                            Attributes
                        </h4>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDropLeft}
                            style={{
                                border: '2px dashed #cbd5e1',
                                borderRadius: '8px',
                                padding: '1rem',
                                minHeight: '350px',
                                backgroundColor: '#f8fafc',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            {leftItems.map(itemId => {
                                const attr = getAttributeById(itemId);
                                return (
                                    <div
                                        key={itemId}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, itemId)}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: 'white',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '6px',
                                            cursor: 'move',
                                            fontSize: '14px',
                                            color: '#1e293b',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#94a3b8';
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {attr?.text}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right side - Categories */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {/* All Items section */}
                        <div>
                            <h4 style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#334155',
                                marginBottom: '1rem'
                            }}>
                                All Items
                            </h4>
                            <div style={{
                                border: '2px solid #bfdbfe',
                                borderRadius: '8px',
                                padding: '1rem',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}>
                                {allItemsSlots.map((itemId, index) => (
                                    <div
                                        key={`all-${index}`}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDropSlot(e, 'all', index)}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: itemId ? 'white' : '#f8fafc',
                                            border: itemId ? '2px solid #3b82f6' : '2px dashed #cbd5e1',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            color: '#1e293b',
                                            minHeight: '44px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {itemId ? getAttributeById(itemId)?.text : ''}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Specific to certain items section */}
                        <div>
                            <h4 style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#334155',
                                marginBottom: '1rem'
                            }}>
                                Specific to certain items
                            </h4>
                            <div style={{
                                border: '2px solid #fcd34d',
                                borderRadius: '8px',
                                padding: '1rem',
                                backgroundColor: '#fefce8',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}>
                                {specificItemsSlots.map((itemId, index) => (
                                    <div
                                        key={`specific-${index}`}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDropSlot(e, 'specific', index)}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: itemId ? 'white' : '#f8fafc',
                                            border: itemId ? '2px solid #f59e0b' : '2px dashed #cbd5e1',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            color: '#1e293b',
                                            minHeight: '44px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {itemId ? getAttributeById(itemId)?.text : ''}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit button and feedback */}
                <div style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {!isSubmitted && (
                        <button
                            onClick={handleSubmit}
                            disabled={!allItemsPlaced}
                            style={{
                                padding: '12px 32px',
                                borderRadius: '8px',
                                border: '2px solid #3b82f6',
                                backgroundColor: allItemsPlaced ? '#3b82f6' : '#e5e7eb',
                                color: allItemsPlaced ? 'white' : '#9ca3af',
                                fontSize: '16px',
                                fontWeight: 500,
                                cursor: allItemsPlaced ? 'pointer' : 'not-allowed',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (allItemsPlaced) {
                                    e.currentTarget.style.backgroundColor = '#2563eb';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (allItemsPlaced) {
                                    e.currentTarget.style.backgroundColor = '#3b82f6';
                                }
                            }}
                        >
                            Check Answer
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
                                <p style={{ fontSize: '14px', opacity: 0.9 }}>
                                    {isCorrect
                                        ? ''
                                        : 'Try again! Think about which attributes apply to every single item versus which ones are specific to certain types of items.'}
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
        </div>
    );
}

// Auto-mount when script loads
const mountPoint = document.getElementById('attribute-sorting');
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<AttributeSorting />);
}

export default AttributeSorting;
