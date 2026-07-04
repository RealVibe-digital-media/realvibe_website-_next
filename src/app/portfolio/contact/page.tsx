'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';

const SERVICES = [
    'Digital Strategy',
    'Creative Design',
    'Web Development',
    'Video Production',
    'Social Media Marketing',
    'Other'
];

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        service: '',
        message: ''
    });

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.contact-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.contact-desc', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .from('.contact-form', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4');

    }, { scope: containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/portfolio/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully! We\'ll be in touch.');
                setFormData({ name: '', mobile: '', service: '', message: '' });
            } else {
                toast.error(data.error || 'Something went wrong.');
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white overflow-hidden relative" ref={containerRef}>
            <AnimatedBackground />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="contact-title text-5xl md:text-7xl font-bold mb-6 font-['Outfit']">
                        Let's Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                            Something Amazing
                        </span>
                    </h1>
                    <p className="contact-desc text-xl text-gray-400 max-w-2xl mx-auto font-['Inter']">
                        Ready to elevate your brand? Tell us about your project and let's make magic happen.
                    </p>
                </div>

                <div className="contact-form bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="mobile" className="text-sm font-medium text-gray-400 ml-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    required
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="service" className="text-sm font-medium text-gray-400 ml-1">Service Interested In</label>
                            <div className="relative">
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-6 pr-14 py-4 text-white appearance-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer"
                                >
                                    <option value="" disabled className="bg-black text-gray-500">Select a service</option>
                                    {SERVICES.map(service => (
                                        <option key={service} value={service} className="bg-black text-white">
                                            {service}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                                placeholder="Tell us about your project goals..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>
            </div>

        </main>
    );
}
