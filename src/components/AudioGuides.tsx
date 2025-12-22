import React from 'react';
import { Play } from 'lucide-react';
import { getAudioGuides, getPageContent, type Language } from '@/lib/content';

interface AudioGuidesProps {
    lang?: Language;
}

export default function AudioGuides({ lang = 'en' }: AudioGuidesProps) {
    const audioGuides = getAudioGuides(lang);
    const page = getPageContent('home', lang);
    const section = page.audioGuides;
    return (
        <section className="py-16 bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">{section.title}</h2>
                    <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{section.viewAllLabel}</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {audioGuides.map((guide, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                                <img src={guide.image} alt={guide.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md border border-white/10">
                                    {guide.duration}
                                </span>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {guide.title}
                            </h3>
                            <p className="text-white/70 text-sm">
                                {guide.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
