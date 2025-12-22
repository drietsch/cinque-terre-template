import React from 'react';
import { Train, Map, Users, Briefcase, CloudSun } from 'lucide-react';
import { getAdvice, type Language } from '@/lib/content';

// Icon mapping for advice items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Train,
    Map,
    Users,
    Briefcase,
    CloudSun,
};

interface PracticalAdviceProps {
    lang?: Language;
}

export default function PracticalAdvice({ lang = 'en' }: PracticalAdviceProps) {
    const advice = getAdvice(lang);
    return (
        <section className="py-12 bg-primary/5 border-y border-primary/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {advice.map((item, index) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-background transition-colors cursor-pointer group">
                                {IconComponent && <IconComponent className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />}
                                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
