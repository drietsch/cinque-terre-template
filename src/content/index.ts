// Site configuration
import site from './site.json';

// Core content
import meta from './meta.json';
import navigation from './navigation.json';
import common from './common.json';

// Shared content
import villages from './shared/villages.json';
import stories from './shared/stories.json';
import accommodations from './shared/accommodations.json';
import dining from './shared/dining.json';
import experiences from './shared/experiences.json';
import events from './shared/events.json';
import logistics from './shared/logistics.json';
import team from './shared/team.json';
import itinerary from './shared/itinerary.json';

// Page content
import homePage from './pages/home.json';
import accommodationsPage from './pages/accommodations.json';
import culinaryPage from './pages/culinary.json';
import sightsPage from './pages/sights.json';
import itineraryPage from './pages/itinerary.json';
import teamPage from './pages/team.json';
import thingsToDoPage from './pages/thingsToDo.json';
import transportationPage from './pages/transportation.json';
import eventsPage from './pages/events.json';
import villagePage from './pages/village.json';
import weatherPage from './pages/weather.json';

// Combine all content into the same structure as the original content.json
const content = {
  site,
  en: {
    meta: meta.en,
    navigation: navigation.en,
    common: common.en,
    shared: {
      // From villages.json
      villages: villages.en.villages,
      // From stories.json
      featuredStories: stories.en.featuredStories,
      stories: stories.en.stories,
      trendingStories: stories.en.trendingStories,
      villageIntroStories: stories.en.villageIntroStories,
      villageAbout: stories.en.villageAbout,
      villageInsiderSecrets: stories.en.villageInsiderSecrets,
      // From accommodations.json
      stays: accommodations.en.stays,
      accommodations: accommodations.en.accommodations,
      // From dining.json
      eats: dining.en.eats,
      restaurants: dining.en.restaurants,
      // From experiences.json
      experiences: experiences.en.experiences,
      sights: experiences.en.sights,
      highlights: experiences.en.highlights,
      audioGuides: experiences.en.audioGuides,
      escapes: experiences.en.escapes,
      advice: experiences.en.advice,
      // From events.json
      events: events.en.events,
      // From logistics.json
      transportModes: logistics.en.transportModes,
      airports: logistics.en.airports,
      weatherWebcams: logistics.en.weatherWebcams,
      villageEssentials: logistics.en.villageEssentials,
      villageFAQs: logistics.en.villageFAQs,
      // From team.json
      team: team.en.team,
      // From itinerary.json
      itinerary: itinerary.en.itinerary,
      days: itinerary.en.days,
    },
    pages: {
      home: homePage.en,
      accommodations: accommodationsPage.en,
      culinary: culinaryPage.en,
      sights: sightsPage.en,
      itinerary: itineraryPage.en,
      team: teamPage.en,
      thingsToDo: thingsToDoPage.en,
      transportation: transportationPage.en,
      events: eventsPage.en,
      village: villagePage.en,
      weather: weatherPage.en,
    },
  },
  it: {
    meta: meta.it,
    navigation: navigation.it,
    common: common.it,
    // Italian doesn't have shared/pages content - falls back to English in content.ts
  },
  // French - falls back to English content
  fr: {
    meta: meta.en,
    navigation: navigation.en,
    common: common.en,
    shared: {
      villages: villages.en.villages,
      featuredStories: stories.en.featuredStories,
      stories: stories.en.stories,
      trendingStories: stories.en.trendingStories,
      villageIntroStories: stories.en.villageIntroStories,
      villageAbout: stories.en.villageAbout,
      villageInsiderSecrets: stories.en.villageInsiderSecrets,
      stays: accommodations.en.stays,
      accommodations: accommodations.en.accommodations,
      eats: dining.en.eats,
      restaurants: dining.en.restaurants,
      experiences: experiences.en.experiences,
      sights: experiences.en.sights,
      highlights: experiences.en.highlights,
      audioGuides: experiences.en.audioGuides,
      escapes: experiences.en.escapes,
      advice: experiences.en.advice,
      events: events.en.events,
      transportModes: logistics.en.transportModes,
      airports: logistics.en.airports,
      weatherWebcams: logistics.en.weatherWebcams,
      villageEssentials: logistics.en.villageEssentials,
      villageFAQs: logistics.en.villageFAQs,
      team: team.en.team,
      itinerary: itinerary.en.itinerary,
      days: itinerary.en.days,
    },
    pages: {
      home: homePage.en,
      accommodations: accommodationsPage.en,
      culinary: culinaryPage.en,
      sights: sightsPage.en,
      itinerary: itineraryPage.en,
      team: teamPage.en,
      thingsToDo: thingsToDoPage.en,
      transportation: transportationPage.en,
      events: eventsPage.en,
      village: villagePage.en,
      weather: weatherPage.en,
    },
  },
  // German - falls back to English content
  de: {
    meta: meta.en,
    navigation: navigation.en,
    common: common.en,
    shared: {
      villages: villages.en.villages,
      featuredStories: stories.en.featuredStories,
      stories: stories.en.stories,
      trendingStories: stories.en.trendingStories,
      villageIntroStories: stories.en.villageIntroStories,
      villageAbout: stories.en.villageAbout,
      villageInsiderSecrets: stories.en.villageInsiderSecrets,
      stays: accommodations.en.stays,
      accommodations: accommodations.en.accommodations,
      eats: dining.en.eats,
      restaurants: dining.en.restaurants,
      experiences: experiences.en.experiences,
      sights: experiences.en.sights,
      highlights: experiences.en.highlights,
      audioGuides: experiences.en.audioGuides,
      escapes: experiences.en.escapes,
      advice: experiences.en.advice,
      events: events.en.events,
      transportModes: logistics.en.transportModes,
      airports: logistics.en.airports,
      weatherWebcams: logistics.en.weatherWebcams,
      villageEssentials: logistics.en.villageEssentials,
      villageFAQs: logistics.en.villageFAQs,
      team: team.en.team,
      itinerary: itinerary.en.itinerary,
      days: itinerary.en.days,
    },
    pages: {
      home: homePage.en,
      accommodations: accommodationsPage.en,
      culinary: culinaryPage.en,
      sights: sightsPage.en,
      itinerary: itineraryPage.en,
      team: teamPage.en,
      thingsToDo: thingsToDoPage.en,
      transportation: transportationPage.en,
      events: eventsPage.en,
      village: villagePage.en,
      weather: weatherPage.en,
    },
  },
};

export default content;
