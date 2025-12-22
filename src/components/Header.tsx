import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, ChevronDown, MapPin, Utensils, Newspaper, Compass, Languages, ArrowRight, Sun } from 'lucide-react';

const languages = [
    { name: 'English', code: 'EN', flag: '🇬🇧' },
    { name: 'Italiano', code: 'IT', flag: '🇮🇹' },
    { name: 'Français', code: 'FR', flag: '🇫🇷' },
    { name: 'Deutsch', code: 'DE', flag: '🇩🇪' },
];

const destinations = [
    { name: 'Riomaggiore', href: '/village', description: 'The vertical village of stone and light' },
    { name: 'Manarola', href: '#', description: 'A symphony of vineyards and sea' },
    { name: 'Vernazza', href: '#', description: 'The noble harbor of the coast' },
    { name: 'Corniglia', href: '#', description: 'The quiet balcony over the Mediterranean' },
    { name: 'Monterosso', href: '#', description: 'The golden sands and lemon groves' },
];

const guides = [
    { name: 'The Salt & Stone Path', href: '/itinerary', description: 'A curated 4-day journey' },
    { name: 'The Art of Presence', href: '/things-to-do', description: 'Engaging with the village rhythm' },
    { name: 'Where to Wake Up', href: '/accommodations', description: 'Curated accommodations' },
];

const foodDrink = [
    { name: 'The Culinary Story', href: '/culinary', description: 'Riomaggiore\'s relationship with food and place' },
    { name: 'Village Rhythms', href: '/events', description: 'Traditional events and seasonal celebrations' },
    { name: 'Restaurants', href: '/culinary', description: 'A curated collection of local dining' },
    { name: 'Wine Bars', href: '#', description: 'Local wines and aperitivo culture' },
    { name: 'Cafés & Bakeries', href: '#', description: 'Morning coffee and fresh focaccia' },
];

const newsAdvice = [
    { name: 'Arrival & Orientation', href: '/transportation', description: 'How to reach the village with calm and clarity' },
    { name: 'The Dispatch (Blog)', href: '/blog', description: 'Stories and insights from the coast' },
    { name: 'The Team', href: '/team', description: 'Meet the voices behind the perspective' },
    { name: 'Travel Tips', href: '/blog', description: 'Essential advice for your visit' },
    { name: 'Latest News', href: '/blog', description: 'Updates from the Cinque Terre' },
    { name: 'Weather & Conditions', href: '/weather', description: 'Live atmosphere and forecasts' },
];

const navItems = [
    { name: 'Destinations', href: '/village', flyout: destinations, icon: MapPin },
    { name: 'Itinerary', href: '/itinerary', icon: Compass },
    { name: 'Sights', href: '/sights', icon: MapPin },
    { name: 'Food & Drink', href: '#', flyout: foodDrink, icon: Utensils },
    { name: 'News & Advice', href: '/blog', flyout: newsAdvice, icon: Newspaper },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'
                }`}
        >
            {/* Top Utility Bar */}
            <div className={`border-b border-border/40 transition-all duration-500 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
                <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            Est. 2024 • Riomaggiore, Italy
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="relative">
                            <button
                                popoverTarget="menu-language"
                                className="inline-flex items-center gap-x-1.5 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Languages className="h-3 w-3" />
                                <span>English</span>
                                <ChevronDown className="h-2 w-2 opacity-50" />
                            </button>

                            <el-popover
                                id="menu-language"
                                anchor="bottom"
                                popover="auto"
                                className="w-48 overflow-visible bg-transparent transition transition-discrete [--anchor-gap:theme(spacing.2)] backdrop:bg-transparent open:flex data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:duration-200 data-[state=open]:ease-out data-[state=closed]:duration-150 data-[state=closed]:ease-in"
                            >
                                <div className="w-full overflow-hidden rounded-xl bg-card border border-border text-sm shadow-lg">
                                    <div className="p-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{lang.name}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">{lang.code}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </el-popover>
                        </div>
                        <div className="h-3 w-px bg-border/60"></div>
                        <a href="/weather" className="flex items-center gap-2 group/weather">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100/50 group-hover/weather:bg-amber-100 transition-colors">
                                <Sun className="h-3 w-3 text-amber-600" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover/weather:text-primary transition-colors">
                                18°C • Sunny
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="container mx-auto px-4 lg:px-8">
                <nav className="flex items-center justify-between py-4 lg:py-6">
                    {/* Left: Desktop Navigation */}
                    <div className="flex-1 hidden lg:flex items-center gap-x-8">
                        {navItems.slice(0, 2).map((item) => (
                            <div key={item.name} className="relative group">
                                <button
                                    popoverTarget={`menu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground hover:text-primary transition-all duration-300 flex items-center gap-1"
                                >
                                    {item.name}
                                    {item.flyout && <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" />}
                                </button>

                                {item.flyout && (
                                    <el-popover
                                        id={`menu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        anchor="bottom"
                                        popover="auto"
                                        className="w-screen max-w-4xl overflow-visible bg-transparent px-4 transition transition-discrete [--anchor-gap:theme(spacing.6)] backdrop:bg-transparent open:flex data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0 data-[state=open]:duration-300 data-[state=open]:ease-out data-[state=closed]:duration-200 data-[state=closed]:ease-in"
                                    >
                                        <div className="w-full overflow-hidden rounded-3xl bg-card border border-border shadow-2xl p-10">
                                            <div className="grid grid-cols-12 gap-16">
                                                <div className="col-span-4 space-y-8">
                                                    <div className="space-y-3">
                                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                                                            {item.name === 'Destinations' ? 'The Collection' : 'Explore'}
                                                        </h3>
                                                        <p className="font-serif text-3xl font-bold leading-tight">
                                                            {item.name === 'Destinations' ? 'The Five Villages' : 'The soul of the coast'}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-6">
                                                        {(item.name === 'Destinations' ? guides : (item.flyout || []).slice(0, 3)).map((subItem) => (
                                                            <a key={subItem.name} href={subItem.href} className="group/item block space-y-1.5">
                                                                <div className="flex items-center gap-2 font-bold text-foreground group-hover/item:text-primary transition-colors">
                                                                    {subItem.name}
                                                                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                                                </div>
                                                                <p className="text-xs text-muted-foreground leading-relaxed">{subItem.description}</p>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-8 border-l border-border/40 pl-16">
                                                    {(item.name === 'Destinations' ? (item.flyout || []) : (item.flyout || []).slice(3, 7)).map((subItem: any) => (
                                                        <a key={subItem.name} href={subItem.href} className="group/link block space-y-2">
                                                            <div className="flex items-baseline justify-between border-b border-border/40 pb-2 group-hover/link:border-primary/40 transition-colors">
                                                                <h4 className="font-serif text-xl font-bold text-foreground group-hover/link:text-primary transition-colors">{subItem.name}</h4>
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-0 group-hover/link:opacity-100 transition-all translate-x-2 group-hover/link:translate-x-0">View Guide</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{subItem.description}</p>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </el-popover>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden flex-1">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="p-2 -ml-2 text-foreground">
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:max-w-md p-0">
                                <div className="h-full flex flex-col">
                                    <div className="p-6 border-b border-border/40 flex items-center justify-between">
                                        <SheetTitle className="font-serif text-2xl font-bold">Menu</SheetTitle>
                                    </div>
                                    <nav className="flex-1 overflow-y-auto p-6 space-y-8">
                                        {navItems.map((item) => (
                                            <div key={item.name} className="space-y-4">
                                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{item.name}</h3>
                                                <div className="grid gap-4">
                                                    {(item.name === 'Destinations'
                                                        ? [...guides, ...(item.flyout || [])]
                                                        : (item.flyout || [])
                                                    ).map((subItem) => (
                                                        <a key={subItem.name} href={subItem.href} className="flex flex-col gap-1 group">
                                                            <span className="font-serif text-xl font-bold group-hover:text-primary transition-colors">{subItem.name}</span>
                                                            <span className="text-sm text-muted-foreground">{subItem.description}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-8 border-t border-border/40 space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Language</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {languages.map((lang) => (
                                                        <button key={lang.code} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
                                                            <span className="text-xl">{lang.flag}</span>
                                                            <span className="text-sm font-bold">{lang.code}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex-shrink-0 px-4">
                        <a href="/" className="flex flex-col items-center group">
                            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                                Cinque Terre Dispatch
                            </span>
                            <div className="h-px w-0 group-hover:w-full bg-primary transition-all duration-500"></div>
                        </a>
                    </div>

                    {/* Right: Desktop Navigation & Actions */}
                    <div className="flex-1 flex items-center justify-end gap-x-8">
                        <div className="hidden lg:flex items-center gap-x-8">
                            {navItems.slice(2).map((item) => (
                                <div key={item.name} className="relative group">
                                    <button
                                        popoverTarget={`menu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground hover:text-primary transition-all duration-300 flex items-center gap-1"
                                    >
                                        {item.name}
                                        {item.flyout && <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" />}
                                    </button>

                                    {item.flyout && (
                                        <el-popover
                                            id={`menu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            anchor="bottom"
                                            popover="auto"
                                            className="w-screen max-w-4xl overflow-visible bg-transparent px-4 transition transition-discrete [--anchor-gap:theme(spacing.6)] backdrop:bg-transparent open:flex data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0 data-[state=open]:duration-300 data-[state=open]:ease-out data-[state=closed]:duration-200 data-[state=closed]:ease-in"
                                        >
                                            <div className="w-full overflow-hidden rounded-3xl bg-card border border-border shadow-2xl p-8">
                                                <div className="grid grid-cols-12 gap-12">
                                                    <div className="col-span-4 space-y-6">
                                                        <div className="space-y-2">
                                                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Insights</h3>
                                                            <p className="font-serif text-2xl font-bold leading-tight">Local knowledge, shared</p>
                                                        </div>
                                                        <div className="space-y-4">
                                                            {(item.flyout || []).slice(0, 3).map((subItem) => (
                                                                <a key={subItem.name} href={subItem.href} className="group/item block space-y-1">
                                                                    <div className="flex items-center gap-2 font-semibold text-foreground group-hover/item:text-primary transition-colors">
                                                                        {subItem.name}
                                                                        <ArrowRight className="h-3 w-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground line-clamp-1">{subItem.description}</p>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-8 grid grid-cols-1 gap-4">
                                                        {(item.flyout || []).slice(3, 6).map((subItem) => (
                                                            <a key={subItem.name} href={subItem.href} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors group/row">
                                                                <div className="space-y-1">
                                                                    <div className="font-semibold text-foreground group-hover/row:text-primary transition-colors">{subItem.name}</div>
                                                                    <p className="text-xs text-muted-foreground">{subItem.description}</p>
                                                                </div>
                                                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/row:text-primary group-hover/row:translate-x-1 transition-all" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </el-popover>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
