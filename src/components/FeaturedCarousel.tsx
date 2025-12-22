import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { getFeaturedStories, getPageContent, type Language } from '@/lib/content';

interface FeaturedCarouselProps {
    lang?: Language;
}

export default function FeaturedCarousel({ lang = 'en' }: FeaturedCarouselProps) {
    const featuredStories = getFeaturedStories(lang);
    const page = getPageContent('home', lang);
    const section = page.featuredCarousel;
    return (
        <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">{section.title}</h2>
                    <a href="#" className="text-sm font-medium hover:underline">{section.viewAllLabel}</a>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {featuredStories.map((story) => (
                            <CarouselItem key={story.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="group cursor-pointer">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white border-none shadow-sm">
                                            {story.category}
                                        </Badge>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                                        {story.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                        {story.dek}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-secondary overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.author}`} alt={story.author} />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">{story.author}</span>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
