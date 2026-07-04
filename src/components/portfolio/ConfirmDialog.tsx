'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100000] flex items-start justify-center bg-black/90 backdrop-blur-md p-6 overflow-y-auto"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={onCancel}
        >
            <div
                className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl relative my-32 mx-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ minHeight: 'fit-content' }}
            >
                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-medium">{message}</p>

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 rounded-lg text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onCancel();
                        }}
                        className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
