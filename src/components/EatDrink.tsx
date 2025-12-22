import React from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getEats, getPageContent, getCommon, type Language } from '@/lib/content';

interface EatDrinkProps {
    lang?: Language;
}

export default function EatDrink({ lang = 'en' }: EatDrinkProps) {
    const eats = getEats(lang);
    const page = getPageContent('home', lang);
    const section = page.eatDrink;
    const common = getCommon(lang);

    return (
        <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">{section.badge}</span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">{section.title}</h2>
                    </div>
                    <a href="#" className="hidden md:inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
                        {common.buttons.seeAllRestaurants} <span className="ml-1">→</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eats.map((place, index) => (
                        <div key={index} className="flex gap-4 group cursor-pointer bg-background p-4 rounded-xl border border-border/50 hover:border-border transition-colors shadow-sm hover:shadow-md">
                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                <img src={place.image} alt={place.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-medium">{place.type}</Badge>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <MapPin className="w-3 h-3 mr-0.5" />
                                        {place.village}
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors leading-tight">
                                    {place.name}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {place.blurb}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
                        {common.buttons.seeAllRestaurants} <span className="ml-1">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
