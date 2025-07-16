import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ur" | "hi" | "ta" | "te" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    "as_salamu_alaikum": "As-Salamu Alaikum",
    "welcome_to_barakah": "Welcome to Barakah",
    "shariah_compliant": "Your trusted partner for Shariah-compliant investments and community engagement",
    "home": "Home",
    "invest": "Invest",
    "dashboard": "Dashboard",
    "community": "Community",
    "profile": "Profile",
    "prayer_times": "Prayer Times",
    "find_mosque": "Find Nearest Mosque",
    "quick_actions": "Quick Actions",
    "zakat": "Zakat",
    "forums": "Forums",
  },
  ur: {
    "as_salamu_alaikum": "السلام علیکم",
    "welcome_to_barakah": "برکت میں خوش آمدید",
    "shariah_compliant": "شرعی سرمایہ کاری اور کمیونٹی کی مشغولیت کے لیے آپ کا قابل اعتماد ساتھی",
    "home": "گھر",
    "invest": "سرمایہ کاری",
    "dashboard": "ڈیش بورڈ",
    "community": "کمیونٹی",
    "profile": "پروفائل",
    "prayer_times": "نماز کے اوقات",
    "find_mosque": "قریب ترین مسجد تلاش کریں",
    "quick_actions": "فوری اعمال",
    "zakat": "زکوٰۃ",
    "forums": "فورمز",
  },
  hi: {
    "as_salamu_alaikum": "अस-सलामु अलैकुम",
    "welcome_to_barakah": "बरकत में आपका स्वागत है",
    "shariah_compliant": "शरीयत-अनुपालन निवेश और सामुदायिक सहभागिता के लिए आपका विश्वसनीय साझीदार",
    "home": "होम",
    "invest": "निवेश",
    "dashboard": "डैशबोर्ड",
    "community": "समुदाय",
    "profile": "प्रोफ़ाइल",
    "prayer_times": "नमाज़ का समय",
    "find_mosque": "निकटतम मस्जिद खोजें",
    "quick_actions": "त्वरित कार्य",
    "zakat": "ज़कात",
    "forums": "फ़ोरम",
  },
  ta: {
    "as_salamu_alaikum": "அஸ்-ஸலாமு அலைக்கும்",
    "welcome_to_barakah": "பரகத்திற்கு வரவேற்கிறோம்",
    "shariah_compliant": "ஷரீயா-இணக்கமான முதலீடுகள் மற்றும் சமூக ஈடுபாட்டிற்கான உங்கள் நம்பகமான பங்குதாரர்",
    "home": "முகப்பு",
    "invest": "முதலீடு",
    "dashboard": "டாஷ்போர்டு",
    "community": "சமூகம்",
    "profile": "சுயவிவரம்",
    "prayer_times": "தொழுகை நேரங்கள்",
    "find_mosque": "அருகிலுள்ள மசூதியைக் கண்டறியுங்கள்",
    "quick_actions": "விரைவு செயல்கள்",
    "zakat": "ஜகாத்",
    "forums": "மன்றங்கள்",
  },
  te: {
    "as_salamu_alaikum": "అస్-సలామ్ అలైకుమ్",
    "welcome_to_barakah": "బరకత్‌కు స్వాగతం",
    "shariah_compliant": "షరియా-అనుకూల పెట్టుబడులు మరియు కమ్యూనిటీ ఎంగేజ్‌మెంట్ కోసం మీ విశ్వసనీయ భాగస్వామి",
    "home": "హోమ్",
    "invest": "పెట్టుబడి",
    "dashboard": "డాష్‌బోర్డ్",
    "community": "కమ్యూనిటీ",
    "profile": "ప్రొఫైల్",
    "prayer_times": "నమాజ్ సమయాలు",
    "find_mosque": "సమీప మసీదును కనుగొనండి",
    "quick_actions": "శీఘ్ర చర్యలు",
    "zakat": "జకాత్",
    "forums": "ఫోరమ్‌లు",
  },
  bn: {
    "as_salamu_alaikum": "আস-সালামু আলাইকুম",
    "welcome_to_barakah": "বরকতে স্বাগতম",
    "shariah_compliant": "শরিয়া-সামঞ্জস্যপূর্ণ বিনিয়োগ এবং কমিউনিটি এনগেজমেন্টের জন্য আপনার বিশ্বস্ত অংশীদার",
    "home": "হোম",
    "invest": "বিনিয়োগ",
    "dashboard": "ড্যাশবোর্ড",
    "community": "কমিউনিটি",
    "profile": "প্রোফাইল",
    "prayer_times": "নামাজের সময়",
    "find_mosque": "নিকটতম মসজিদ খুঁজুন",
    "quick_actions": "দ্রুত কর্ম",
    "zakat": "যাকাত",
    "forums": "ফোরাম",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const value = {
    language,
    setLanguage,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
