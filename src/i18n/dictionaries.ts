import type { Locale } from "@/types/project";

export const dictionaries = {
  en:{
    nav:{home:"Home",about:"About",projects:"Projects",skills:"Skills",contact:"Contact",resume:"Resume"},
    hero:{eyebrow:"SOFTWARE DEVELOPER",title:"I build software that solves real problems.",body:"I design and build reliable Web, Mobile and Desktop software with a strong focus on usability, performance and maintainable engineering.",primary:"View my work",secondary:"Contact me"},
    sections:{featured:"Featured projects",featuredBody:"A selection of product-focused work across web, mobile and desktop.",services:"What I build",about:"About",skills:"Technologies",contact:"Have a project in mind?",contactBody:"Let's build something useful, fast and maintainable."},
    aboutBody:"I focus on turning product ideas into clean, dependable software across multiple platforms.",
    services:[["Web Applications","Fast, responsive and scalable products for the web."],["Mobile Applications","Polished Android and iOS experiences built around real workflows."],["Desktop Software","Reliable desktop tools and business systems for everyday work."]],
    projectsPage:{eyebrow:"PROJECT ARCHIVE",title:"Selected work & experiments.",body:"Product work across web, mobile, desktop and backend systems."},
    caseStudy:{eyebrow:"CASE STUDY",overview:"Overview",problem:"Problem",solution:"Solution",myRole:"My role",keyFeatures:"Key features",architecture:"Architecture",challenges:"Challenges",liveDemo:"Live demo"},
    misc:{based:"Based in",focus:"Focus",available:"Available for",viewCase:"View case study",allProjects:"All projects",featured:"Featured",email:"Email"}
  },
  az:{
    nav:{home:"Ana səhifə",about:"Haqqımda",projects:"Layihələr",skills:"Bacarıqlar",contact:"Əlaqə",resume:"CV"},
    hero:{eyebrow:"PROQRAM TƏMİNATI TƏRTİBATÇISI",title:"Real problemləri həll edən proqramlar hazırlayıram.",body:"İstifadə rahatlığına, sürətə və düzgün mühəndisliyə fokuslanaraq Web, Mobile və Desktop proqramlar hazırlayıram.",primary:"Layihələrə bax",secondary:"Əlaqə saxla"},
    sections:{featured:"Seçilmiş layihələr",featuredBody:"Web, mobil və desktop platformalar üçün hazırladığım seçilmiş işlər.",services:"Nələr hazırlayıram",about:"Haqqımda",skills:"Texnologiyalar",contact:"Layihən var?",contactBody:"Gəlin sürətli, faydalı və dayanıqlı bir məhsul quraq."},
    aboutBody:"Məhsul ideyalarını müxtəlif platformalarda təmiz, etibarlı və rahat idarə olunan proqramlara çevirməyə fokuslanıram.",
    services:[["Web tətbiqləri","Sürətli, responsiv və miqyaslana bilən web məhsulları."],["Mobil tətbiqlər","Android və iOS üçün real iş axınlarına uyğun tətbiqlər."],["Desktop proqramlar","Etibarlı desktop alətləri və biznes sistemləri."]],
    projectsPage:{eyebrow:"LAYİHƏ ARXİVİ",title:"Seçilmiş işlər və layihələr.",body:"Web, mobil, desktop və backend sistemləri üzrə hazırladığım layihələr."},
    caseStudy:{eyebrow:"LAYİHƏ TƏHLİLİ",overview:"Ümumi baxış",problem:"Problem",solution:"Həll",myRole:"Mənim rolum",keyFeatures:"Əsas funksiyalar",architecture:"Arxitektura",challenges:"Çətinliklər",liveDemo:"Canlı demo"},
    misc:{based:"Yerləşmə",focus:"İstiqamət",available:"Açığam",viewCase:"Ətraflı bax",allProjects:"Bütün layihələr",featured:"Seçilmiş",email:"Email"}
  },
  ka:{
    nav:{home:"მთავარი",about:"ჩემ შესახებ",projects:"პროექტები",skills:"ტექნოლოგიები",contact:"კონტაქტი",resume:"რეზიუმე"},
    hero:{eyebrow:"SOFTWARE DEVELOPER",title:"ვქმნი პროგრამულ პროდუქტებს, რომლებიც რეალურ პრობლემებს წყვეტს.",body:"ვქმნი სწრაფ, სანდო და მარტივად გამოსაყენებელ Web, Mobile და Desktop პროგრამულ პროდუქტებს.",primary:"პროექტების ნახვა",secondary:"დამიკავშირდი"},
    sections:{featured:"რჩეული პროექტები",featuredBody:"შერჩეული ნამუშევრები web, mobile და desktop პლატფორმებისთვის.",services:"რას ვქმნი",about:"ჩემ შესახებ",skills:"ტექნოლოგიები",contact:"გაქვს პროექტის იდეა?",contactBody:"ერთად შევქმნათ სწრაფი, სასარგებლო და საიმედო პროდუქტი."},
    aboutBody:"ვაქცევ პროდუქტის იდეებს სუფთა, საიმედო და მარტივად მოსავლელ პროგრამულ პროდუქტებად სხვადასხვა პლატფორმისთვის.",
    services:[["Web აპლიკაციები","სწრაფი, responsive და მასშტაბირებადი web პროდუქტები."],["Mobile აპლიკაციები","Android და iOS პროდუქტები რეალურ სამუშაო პროცესებზე მორგებული."],["Desktop პროგრამები","სანდო desktop ინსტრუმენტები და ბიზნეს სისტემები."]],
    projectsPage:{eyebrow:"პროექტების არქივი",title:"რჩეული ნამუშევრები და პროექტები.",body:"Web, mobile, desktop და backend სისტემებზე შექმნილი პროდუქტები."},
    caseStudy:{eyebrow:"პროექტის მიმოხილვა",overview:"მიმოხილვა",problem:"პრობლემა",solution:"გადაწყვეტა",myRole:"ჩემი როლი",keyFeatures:"ძირითადი ფუნქციები",architecture:"არქიტექტურა",challenges:"გამოწვევები",liveDemo:"Live demo"},
    misc:{based:"მდებარეობა",focus:"ფოკუსი",available:"ხელმისაწვდომი",viewCase:"ქეისის ნახვა",allProjects:"ყველა პროექტი",featured:"რჩეული",email:"Email"}
  }
} as const;

export function getDictionary(locale:Locale){ return dictionaries[locale]; }
