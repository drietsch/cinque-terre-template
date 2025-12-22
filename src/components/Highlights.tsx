import React from 'react';
import { Mountain, Ship, Umbrella, Camera, Sunset, Map, Calendar, Users } from 'lucide-react';
import { getHighlights, getPageContent, type Language } from '@/lib/content';

// Icon mapping for highlights items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Mountain,
    Ship,
    Umbrella,
    Camera,
    Sunset,
    Map,
    Calendar,
    Users,
};

interface HighlightsProps {
    lang?: Language;
}

export default function Highlights({ lang = 'en' }: HighlightsProps) {
    const highlights = getHighlights(lang);
    const page = getPageContent('home', lang);
    const section = page.highlights;
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">{section.badge}</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">{section.title}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {highlights.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                            </div>
                            <h3 className="font-serif text-lg font-bold mb-2">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
