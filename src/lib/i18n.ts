export type Locale = 'en' | 'ha' | 'yo' | 'ig' | 'pcm';

export const dictionaries = {
    en: {
        dashboard: {
            welcome: "Hello",
            welcomeBack: "Welcome back to Toniq.",
            balance: "Available Balance",
            tokens: "Tokens",
            quickActions: "Quick Actions",
            recentActivity: "Recent Activity",
            tabs: {
                home: "Home",
                health: "Health",
                loans: "Loans",
                earn: "Earn",
                community: "Community"
            }
        },
        actions: {
            newClaim: "New Claim",
            findHospital: "Find Hospital",
            playEarn: "Play & Earn",
            getLoan: "Get Loan"
        },
        common: {
            loading: "Loading...",
            payNow: "Pay Now",
            extend: "Extend",
            active: "Active",
            inactive: "Inactive",
            settings: "Settings",
            language: "Language",
            selectLanguage: "Select Language"
        },
        onboarding: {
            createAccount: "Create Account",
            verifyIdentity: "Verify Identity",
            biometricCapture: "Biometric Capture",
            selectPlan: "Select Plan"
        },
        landing: {
            headline: "Health Insurance for Everyone",
            subheadline: "Instant coverage from ₦800/month. Earn tokens while staying healthy to pay for it.",
            cta: "Get Insured Now",
            noPaperwork: "No paperwork. Instant activation.",
            instantClaims: "Instant Claims",
            playToEarn: "Play-to-Earn",
            instantClaimsDesc: "Get paid in minutes, not weeks, thanks to AI verification.",
            playToEarnDesc: "Complete health quizzes and checkups to earn $HEALTH tokens."
        }
    },
    ha: {
        dashboard: {
            welcome: "Sannu",
            welcomeBack: "Barka da dawowa Toniq.",
            balance: "Ragowar Kuɗi",
            tokens: "Alamomi",
            quickActions: "Ayyukan Gaggawa",
            recentActivity: "Ayyukan Kwanan nan",
            tabs: {
                home: "Gida",
                health: "Lafiya",
                loans: "Lamuni",
                earn: "Nema",
                community: "Al'umma"
            }
        },
        actions: {
            newClaim: "Sabon Da'awa",
            findHospital: "Nemo Asibiti",
            playEarn: "Yi Wasa & Nema",
            getLoan: "Nemi Lamuni"
        },
        common: {
            loading: "Ana lodawa...",
            payNow: "Biya Yanzu",
            extend: "Tsawaita",
            active: "Mai Aiki",
            inactive: "Ba Mai Aiki",
            settings: "Saituna",
            language: "Harshe",
            selectLanguage: "Zaɓi Harshe"
        },
        onboarding: {
            createAccount: "Ƙirƙiri Asusun",
            verifyIdentity: "Tabbatar da Shaida",
            biometricCapture: "Daukar Biometric",
            selectPlan: "Zaɓi Tsari"
        },
        landing: {
            headline: "Inshorar Lafiya ga Kowa",
            subheadline: "Rufin gaggawa daga ₦800/wata. Nemi alamomi yayin da kake cikin koshin lafiya don biyan kuɗin sa.",
            cta: "Samun Inshora Yanzu",
            noPaperwork: "Babu takarda. Kunna nan take.",
            instantClaims: "Da'awar Gaggawa",
            playToEarn: "Yi Wasa don Nema",
            instantClaimsDesc: "Ana biyan ku a cikin mintuna, ba makonni ba, godiya ga tabbatarwar AI.",
            playToEarnDesc: "Kammala tambayoyin kiwon lafiya da dubawa don samun alamun $HEALTH."
        }
    },
    yo: {
        dashboard: {
            welcome: "Bawo",
            welcomeBack: "Kaabo pada si Toniq.",
            balance: "Iwontunwonsi",
            tokens: "Awọn ami",
            quickActions: "Awọn Igbesẹ Yara",
            recentActivity: "Iṣẹ Aipẹ",
            tabs: {
                home: "Ile",
                health: "Ilera",
                loans: "Awọn awin",
                earn: "Jo'gun",
                community: "Awon eniyan"
            }
        },
        actions: {
            newClaim: "Ibeere Tuntun",
            findHospital: "Wa Ile-iwosan",
            playEarn: "Gba & Jo'gun",
            getLoan: "Gba Awin"
        },
        common: {
            loading: "Nkojọpọ...",
            payNow: "Sanwo Bayi",
            extend: "Faagun",
            active: "Ti nṣiṣe lọwọ",
            inactive: "Aiṣiṣẹ",
            settings: "Eto",
            language: "Ede",
            selectLanguage: "Yan Ede"
        },
        onboarding: {
            createAccount: "Ṣẹda Akomora",
            verifyIdentity: "Daju Idanimọ",
            biometricCapture: "Yaworan Biometric",
            selectPlan: "Yan Eto"
        },
        landing: {
            headline: "Insuransi Ilera fun Gbogbo eniyan",
            subheadline: "Ideri lẹsẹkẹsẹ lati ₦800/oṣu. Jo'gun awọn ami lakoko ti o wa ni ilera lati sanwo fun.",
            cta: "Gba Iṣeduro Bayi",
            noPaperwork: "Ko si iwe. Iṣiṣẹ lẹsẹkẹsẹ.",
            instantClaims: "Awọn ibeere Lẹsẹkẹsẹ",
            playToEarn: "Mu ṣiṣẹ lati wolu",
            instantClaimsDesc: "Gba owo ni iṣẹju, kii ṣe awọn ọsẹ, ọpẹ si ijẹrisi AI.",
            playToEarnDesc: "Pari awọn ibeere ilera ati awọn ayẹwo lati jo'gun awọn ami $HEALTH."
        }
    },
    ig: {
        dashboard: {
            welcome: "Nnọọ",
            welcomeBack: "Nnọọ na Toniq.",
            balance: "Ego Foduru",
            tokens: "Tokens",
            quickActions: "Omeme Ngwa Ngwa",
            recentActivity: "Ihe Mere Nso A",
            tabs: {
                home: "Ụlọ",
                health: "Ahụike",
                loans: "Mbinye Ego",
                earn: "Kpata Ego",
                community: "Obodo"
            }
        },
        actions: {
            newClaim: "Nkwupụta Ọhụrụ",
            findHospital: "Chọta Ụlọ Ọgwụ",
            playEarn: "Gwuo & Kpata",
            getLoan: "Nara Mbinye"
        },
        common: {
            loading: "Na-ebu...",
            payNow: "Kwụọ Ụgwọ Ugbu A",
            extend: "Gbatwuo",
            active: "Na-arụ Ọrụ",
            inactive: "Anaghị Arụ Ọrụ",
            settings: "Ntọala",
            language: "Asụsụ",
            selectLanguage: "Họrọ Asụsụ"
        },
        onboarding: {
            createAccount: "Mepụta Akaụntụ",
            verifyIdentity: "Nyochaa Njirimara",
            biometricCapture: "Were Foto Biometric",
            selectPlan: "Họrọ Atụmatụ"
        },
        landing: {
            headline: "Mkpa Ahụike Maka Onye Ọ Bụla",
            subheadline: "Mkpuchi ozugbo site na ₦800/ọnwa. Kpata tokens mgbe ị na-adị mma iji kwụọ ụgwọ maka ya.",
            cta: "Nweta Inshọransị Ugbu A",
            noPaperwork: "Enweghị akwụkwọ. Ọrụ ozugbo.",
            instantClaims: "Nkwupụta Ozugbo",
            playToEarn: "Gwuo Iji Kpata",
            instantClaimsDesc: "A na-akwụ gị ụgwọ na nkeji, ọ bụghị izu, ekele maka nkwenye AI.",
            playToEarnDesc: "Mezuo ajụjụ ahụike na nyocha iji nweta tokens $HEALTH."
        }
    },
    pcm: {
        dashboard: {
            welcome: "How far",
            welcomeBack: "Welcome back to Toniq jare.",
            balance: "Ur Change",
            tokens: "Ur Coins",
            quickActions: "Sharp Sharp",
            recentActivity: "Wetin Sup Recently",
            tabs: {
                home: "House",
                health: "Body",
                loans: "Gbe Borro",
                earn: "Hustle",
                community: "Padi dem"
            }
        },
        actions: {
            newClaim: "Collect Money",
            findHospital: "Find Hospital",
            playEarn: "Play & Chop",
            getLoan: "Collect Loan"
        },
        common: {
            loading: "E dey load...",
            payNow: "Pay Sharp Sharp",
            extend: "Add Time",
            active: "E Dey Work",
            inactive: "E Don Die",
            settings: "Settings",
            language: "Language",
            selectLanguage: "Choose Language"
        },
        onboarding: {
            createAccount: "Open Account",
            verifyIdentity: "Who You Be?",
            biometricCapture: "Snap Ur Face",
            selectPlan: "Pick Ur Level"
        },
        landing: {
            headline: "Health Insurance for Everybody",
            subheadline: "Start from ₦800/month. Hustle tokens to pay if you no get cash.",
            cta: "Start Now",
            noPaperwork: "No long thing. Just start.",
            instantClaims: "Collect Your Money Fast",
            playToEarn: "Play & Chop Money",
            instantClaimsDesc: "We dey pay in minutes, no be weeks via AI magic.",
            playToEarnDesc: "Answer questions about body commot money."
        }
    }
};
