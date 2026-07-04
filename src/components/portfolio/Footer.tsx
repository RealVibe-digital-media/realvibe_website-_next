import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    {/* Left Column: Brand Info */}
                    <div className="space-y-8">
                        <Link href="/portfolio" className="block w-fit">
                            <img src="/logo.png" alt="RealVibe" className="h-16 w-auto" />
                        </Link>

                        <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
                            Real Vibe is a creative <span className="text-pink-500">Digital Marketing Agency</span> that help brands survive in today's digital age.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold border-b-4 border-purple-500 inline-block pb-1">Follow us on</h3>
                            <div className="flex items-center gap-6">
                                {[
                                    { name: 'Instagram', icon: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22H7.75A5.75 5.75 0 0 1 2 16.25V7.75A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25V7.75A4.25 4.25 0 0 0 16.25 3.5H7.75ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.375-3.125a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z' },
                                    { name: 'Facebook', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z' },
                                    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                                    { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                                    { name: 'X', icon: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' }
                                ].map((social) => (
                                    <a key={social.name} href="#" className="text-pink-400 hover:text-white transition-colors transform hover:scale-110 duration-300">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Address & Partners */}
                    <div className="space-y-12 md:pl-12">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold border-b-4 border-purple-500 inline-block pb-1">Address</h3>
                            <p className="text-lg font-medium leading-relaxed">
                                303, 3rd Floor, JMD Galleria,<br />
                                Sector-48, Gurgaon-122018
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Meta Business Partner', img: '/partners/meta.png' },
                                { name: 'Google Partner', img: '/partners/google.png' },
                                { name: 'Envato Market', img: '/partners/envato.png' },
                                { name: 'Freepik Contributor', img: '/partners/freepik.png' }
                            ].map((partner) => (
                                <div key={partner.name} className="h-16 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/30 transition-colors p-2">
                                    <img
                                        src={partner.img}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} RealVibe. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
