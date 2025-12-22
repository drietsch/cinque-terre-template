import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, ChevronDown, MapPin, Utensils, Newspaper, Compass, Languages, ArrowRight, Sun } from 'lucide-react';
import { getNavigation, getMeta, getCommon, type Language } from '@/lib/content';

// Flag emoji map for language codes
const flagEmojis: Record<string, string> = {
    'GB': '🇬🇧',
    'IT': '🇮🇹',
    'FR': '🇫🇷',
    'DE': '🇩🇪'
};

// Icon map for nav items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    MapPin,
    Compass,
    Utensils,
    Newspaper
};

interface HeaderProps {
    lang?: Language;
    village?: string;
}

export default function Header({ lang = 'en', village = 'riomaggiore' }: HeaderProps) {
    const nav = getNavigation(lang);
    const meta = getMeta(lang);
    const common = getCommon(lang);

    // Helper to replace URL placeholders
    const resolveUrl = (url: string): string => {
        return url
            .replace(/{lang}/g, lang)
            .replace(/{village}/g, village);
    };

    // Helper to switch language in current URL
    const getLanguageSwitchUrl = (newLang: string): string => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            // Replace the language segment in the URL
            const segments = path.split('/').filter(Boolean);
            if (segments.length > 0 && ['en', 'it', 'fr', 'de'].includes(segments[0])) {
                segments[0] = newLang;
                return '/' + segments.join('/') + '/';
            }
            return `/${newLang}/`;
        }
        return `/${newLang}/`;
    };

    // Map flyout keys to actual data with resolved URLs
    const resolveLinks = (items: any[]) => items?.map(item => ({
        ...item,
        href: resolveUrl(item.href)
    })) || [];

    const flyoutData: Record<string, typeof nav.destinations> = {
        destinations: resolveLinks(nav.destinations),
        foodDrink: resolveLinks(nav.foodDrink),
        newsAdvice: resolveLinks(nav.newsAdvice)
    };

    // Build nav items with flyout data and resolved URLs
    const navItems = nav.navItems.map(item => ({
        ...item,
        href: resolveUrl(item.href),
        flyout: item.flyoutKey ? flyoutData[item.flyoutKey] : undefined,
        icon: iconMap[item.icon] || MapPin
    }));

    // Add emoji flags to languages
    const languages = nav.languages.map(l => ({
        ...l,
        flag: flagEmojis[l.flag] || '🏳️'
    }));

    const guides = resolveLinks(nav.guides);
    const destinations = resolveLinks(nav.destinations);
    const foodDrink = resolveLinks(nav.foodDrink);

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
                            {meta.location}
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
                                <span>{languages.find(l => l.code === lang)?.name || 'English'}</span>
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
                                        {languages.map((l) => (
                                            <a
                                                key={l.code}
                                                href={getLanguageSwitchUrl(l.code)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                                            >
                                                <span className="text-lg">{l.flag}</span>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{l.name}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">{l.code.toUpperCase()}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </el-popover>
                        </div>
                        <div className="h-3 w-px bg-border/60"></div>
                        <a href={resolveUrl('/{lang}/villages/{village}/weather/')} className="flex items-center gap-2 group/weather">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100/50 group-hover/weather:bg-amber-100 transition-colors">
                                <Sun className="h-3 w-3 text-amber-600" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover/weather:text-primary transition-colors">
                                {common.weather.temperature} • {common.weather.condition}
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
                                                            {item.flyoutKey && nav.flyoutLabels[item.flyoutKey as keyof typeof nav.flyoutLabels]?.badge || 'Explore'}
                                                        </h3>
                                                        <p className="font-serif text-3xl font-bold leading-tight">
                                                            {item.flyoutKey && nav.flyoutLabels[item.flyoutKey as keyof typeof nav.flyoutLabels]?.title || 'The soul of the coast'}
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
                                        <SheetTitle className="font-serif text-2xl font-bold">{nav.mobileMenu.title}</SheetTitle>
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
                                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{nav.mobileMenu.languageLabel}</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {languages.map((l) => (
                                                        <a key={l.code} href={getLanguageSwitchUrl(l.code)} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
                                                            <span className="text-xl">{l.flag}</span>
                                                            <span className="text-sm font-bold">{l.code.toUpperCase()}</span>
                                                        </a>
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
                        <a href={`/${lang}/`} className="flex flex-col items-center group">
                            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                                {meta.siteName}
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
                                                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{item.flyoutKey && nav.flyoutLabels[item.flyoutKey as keyof typeof nav.flyoutLabels]?.badge || 'Insights'}</h3>
                                                            <p className="font-serif text-2xl font-bold leading-tight">{item.flyoutKey && nav.flyoutLabels[item.flyoutKey as keyof typeof nav.flyoutLabels]?.title || 'Local knowledge, shared'}</p>
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
