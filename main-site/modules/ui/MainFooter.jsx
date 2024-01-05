import React from 'react';

const footerLinks = [
    {
        category: 'Company',
        links: [
            { text: 'About', href: '#' },
            { text: 'Features', href: '#' },
            { text: 'Works', href: '#' },
            { text: 'Career', href: '#' },
        ],
    },
    {
        category: 'Help',
        links: [
            { text: 'Customer Support', href: '#' },
            { text: 'Delivery Details', href: '#' },
            { text: 'Terms & Conditions', href: '#' },
            { text: 'Privacy Policy', href: '#' },
        ],
    },
    {
        category: 'Resources',
        links: [
            { text: 'Free eBooks', href: '#' },
            { text: 'How to - Blog', href: '#' },
            { text: 'YouTube Playlist', href: '#' },
        ],
    },
    {
        category: 'Extra Links',
        links: [
            { text: 'Customer Support', href: '#' },
            { text: 'Delivery Details', href: '#' },
            { text: 'Terms & Conditions', href: '#' },
            { text: 'Privacy Policy', href: '#' },
        ],
    },
];

export default function MainFooter() {
    return (
        <main className="max-w-full bg-epassblue">
            <section className="py-10 mx-auto sm:pt-16 lg:pt-24 max-w-9xl">
                <div className="mx-auto max-w-9xl">
                    <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-0">
                        {footerLinks.map((category, index) => (
                            <div key={index}>
                                <p className="text-base font-medium text-gray-900">{category.category}</p>
                                <ul className="mt-5 space-y-3">
                                    {category.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                title={link.text}
                                                className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <hr className="mt-16 mb-10 border-gray-800" />
                    <div className="flex flex-wrap items-center justify-between">
                        <img
                            className="h-8 auto md:order-1"
                            src="/logo.svg"
                            alt=""
                        />
                        <ul className="flex items-center space-x-3 md:order-3">
                            {/* Social media icons */}
                            {[
                                { icon: 'facebook', title: 'Facebook' },
                                { icon: 'twitter', title: 'Twitter' },
                                { icon: 'instagram', title: 'Instagram' },
                                { icon: 'linkedin', title: 'LinkedIn' },
                            ].map((social, socialIndex) => (
                                <li key={socialIndex}>
                                    <a
                                        href="#"
                                        title={social.title}
                                        className="flex items-center justify-center text-white transition-all duration-200 bg-transparent border border-gray-700 rounded-full w-7 h-7 focus:bg-blue-600 hover:bg-blue-600 hover:border-blue-600 focus:border-blue-600"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            {/* Include your social media icons here */}
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="w-full mt-8 text-sm text-center text-gray-100 md:mt-0 md:w-auto md:order-2">
                            © Copyright 2023, All Rights Reserved by Epass System
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
