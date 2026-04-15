export const supportedLanguages = ["en", "ro"];
export const defaultLanguage = "ro";

export const translations = {
  en: {
    nav: {
      links: [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/pricing", label: "Pricing" },
        { href: "/conditions", label: "Conditions" },
        { href: "/contact", label: "Contact" },
      ],
      languageLabel: "Language",
    },
    notFound: {
      badge: "Oops…",
      title: "Page not found",
      description:
        "Sorry, the page you are looking for does not exist or was moved. If you followed a link, let us know and we will fix it.",
      hint: "If you were looking for something specific, head back to Home or use the top menu.",
      homeCta: "Back to Home",
      contactCta: "Contact",
    },
    home: {
      company: {
        badge: "Synaptica Cluj",
        titleStart: "Revolutionize your",
        titleHighlight: "mental health",
        titleEnd: "",
        subtitle: "The Synaptica Cluj experience: where technology meets empathy",
        description:
          "At Synaptica Cluj, we combine cutting-edge technology with an empathetic and personalized approach to offer you fast and effective solutions for your mental health. Our advanced brainmapping, together with neurofeedback and photobiomodulation therapy, helps you overcome psychological and emotional challenges with remarkable efficiency. Our results remain stable over time, and our dedicated team is here to support you at every step of your journey toward optimal mental health.",
        imageAlt: "The Synaptica Cluj team and the technology used in the clinic",
      },
      neuro: {
        badge: "Neurofeedback",
        titleStart: "Brain training for",
        titleHighlight: "peak performance.",
        subtitle:
          "Real-time EEG feedback supports the brain to regulate its activity naturally, favoring balance, mental clarity, and optimal functioning.",
        description:
          "Sensors monitor brain activity, identify inefficient patterns, and send gentle visual and auditory signals that guide the brain toward an optimal functional rhythm.",
        points: [
          "Positive signals strengthen the desired brain activity, while micro-pauses indicate when adjustments are needed.",
          "The process supports neuronal flexibility, emotional balance, and cognitive resilience.",
          "The approach is adaptable and effective regardless of the initial level of functioning.",
          "The methodology uses the NeurOptimal® system, supporting cerebral self-regulation and performance optimization at the highest level."
        ],
        primaryCta: "Discover neurofeedback",
        secondaryCta: "See conditions",
      },
      badge: "brainmapping",
      titleStart: "Understanding the brain with",
      titleHighlight: "precision and intelligence.",
      titleEnd: "",
      description:
        "We transform brain signals into actionable data, identifying neural imbalances and supporting personalized therapy plans through advanced brainmapping and intelligent analysis.",
      seoIntro:
        "Synaptica Cluj is a clinic focused on brain health, combining EEG brainmapping, neurofeedback, and guided programs that support mental balance, cognitive clarity, and emotional resilience. We work with clients who want measurable progress, from improved sleep and focus to better stress regulation and overall wellbeing. Every journey starts with an evaluation that helps us understand how the brain functions and where personalized support can bring the most value.",
      seoDetail:
        "Our services integrate modern technology with a human, supportive approach. The brainmapping stage offers a clear snapshot of activity patterns, while neurofeedback sessions help the brain self-regulate through gentle, real-time signals. We tailor recommendations to each person, explain the process clearly, and follow progress over time. If you are looking for a structured path to improve performance, restore balance, or support long-term mental health, Synaptica Cluj provides a calm environment, experienced specialists, and solutions designed around your goals.",
      primaryCta: "See services",
      secondaryCta: "Find out the prices",
      statSpeedLabel: "Process duration",
      statSpeedValue: "4-7 weeks",
      statSpeedNote: "Brainmapping and personalized protocol",
      statQualityLabel: "Personalized brain training",
      statQualityValue: "Conditions addressed",
      statTags: ["Lack of sleep", "Anxiety"],
      statMoreLabel: "more",
      flowLabel: "process",
      flowTitle: "From assessment to cognitive balance",
      flowYear: "",
      phases: [
        {
          title: "Cerebral assessment",
          sprint: "Brainmapping",
          progress: 30,
        },
        {
          title: "Personalized intervention",
          sprint: "Guided protocol",
          progress: 60,
        },
        {
          title: "Monitoring and adjustment",
          sprint: "Continuous optimization",
          progress: 100,
        },
      ],
      kitTitle: "Launch kit",
      kitStatus: "On track",
      kitTags: ["Landing pages", "Beautiful animations", "SEO-ready"],
      quickNavBadge: "Quick navigation",
      quickNavTitle: "Everything you need, one click away",
      quickNavCta: "Have a question? Let's talk →",
      quickLinkDiscover: "Discover",
      quickLinks: [
        {
          title: "Services",
          href: "/services",
          description: "iSyncMe® therapy, EEG Brainmapping, and NeurOptimal® Neurofeedback – personalized, science-driven solutions designed to optimize brain function, mental clarity, and emotional balance.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "Explore services"
        },
        {
          title: "Pricing",
          href: "/pricing",
          description: "Clear pricing for individual sessions and integrated programs, designed for continuity, measurable results, and an efficient investment in your neurological wellbeing.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "View pricing"
        },
        {
          title: "Conditions",
          href: "/conditions",
          description:
            "Discover the main conditions and challenges that can be addressed through neurofeedback and brainmapping, together with modern approaches for emotional balance, mental clarity, and optimal performance.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "See conditions"
        },
        {
          title: "Contact",
          href: "/contact",
          description: "Schedule an evaluation or talk with us about the best solution for your needs. We offer personalized guidance, advanced technology, and genuine care.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "Get in touch"
        },
      ],
    },
    services: {
      pageTitle: "Services",
      intro: "Premium programs for brain health, with medical technology and personalized care.",
      ctaPrimary: "Schedule a session",
      ctaSecondary: "Contact us",
      includesTitle: "What the service includes",
      stepsTitle: "Key steps",
      sections: [
        {
          key: "isync",
          badge: "iSyncMe® helmet therapy",
          title: "Brainmapping and protocol guided by artificial intelligence",
          highlight: "EEG precision, interpretation, adaptive protocol",
          details: [
            "iSyncMe® helmet therapy is an advanced approach to evaluating and supporting brain function, based on high-precision EEG technology and AI-assisted analysis. The system captures the brain’s electrical activity and transforms it into a detailed map of neuronal functioning, offering an objective perspective on how the brain processes information.",
            "The process begins with a brainmapping scan that analyzes brain activity across different areas and frequencies. The data obtained are compared with normative databases and interpreted to identify functional patterns, imbalances, or areas needing additional support. This stage offers a clear and personalized understanding of brain activity.",
            "Based on the results obtained, the interpretation of the brainmapping follows, an essential stage in defining the intervention direction. The analysis does not stop at isolated values; it looks at the global coherence of brain activity and how the different regions interact with each other.",
            "The next step is creating a personalized protocol, adapted to individual needs. The protocol is guided by artificial intelligence and aims to support self-regulation and optimize brain activity in a progressive and safe way. The intervention is structured yet flexible, adjusted according to the brain’s response along the way.",
            "The entire process includes continuous monitoring and periodic adjustments to ensure consistency and efficiency in the medium and long term. This approach allows dynamic adaptation of the protocol, depending on each person’s evolution.",
          ],
          bullets: [
            "EEG brainmapping for detailed evaluation",
            "Interpretation aligned with personal objectives",
            "AI-guided personalized protocol for progressive support",
            "Continuous monitoring and protocol adjustments",
          ],
          steps: ["Scan", "Interpretation", "Personalized protocol", "Monitoring"],
        },
        {
          key: "neuro",
          badge: "Neurofeedback with NeurOptimal®",
          title: "Dynamic brain training for balance and performance",
          highlight: "Real-time EEG feedback, effortless self-regulation",
          details: [
            "Neurofeedback with NeurOptimal® is an advanced, non-invasive brain training system that works through real-time EEG feedback. The technology continuously monitors brain activity and provides subtle audio cues, allowing the brain to observe its own variations and self-regulate naturally.",
            "Unlike directed or rigid approaches, NeurOptimal® uses a dynamic system that responds in real time to changes in brain activity. The brain receives feedback exactly at the moments of variation, which facilitates awareness and automatic adjustment of its internal rhythms.",
            "The training does not require conscious effort, mental exercises, or voluntary control. The brain is allowed to find its own balance in a natural and safe way. This approach supports neuronal flexibility, adaptability, and resilience, regardless of the starting point.",
            "NeurOptimal® is used both for optimizing cognitive and emotional performance and for supporting overall wellbeing. The system suits people of all ages and is appreciated for its gentle yet effective character.",
            "Each session is a learning process for the brain, contributing to the development of more stable, more balanced, and more coherent functioning over time."
          ],
          bullets: [
            "Real-time EEG feedback for self-regulation",
            "Non-invasive training, no mental effort required",
            "Develops flexibility, balance, and resilience",
            "Supports cognitive performance, emotional balance, and general wellbeing",
          ],
          steps: ["Dynamic monitoring", "Subtle feedback", "Self-regulation learning", "Sustained balance"],
        },
      ],
    },
    conditions: {
      badge: "Conditions",
      title: "Areas where we intervene through brain training",
      description:
        "Through advanced brain training technologies, EEG brainmapping, and neurofeedback, we support self-regulation and optimization of brain functioning in various cognitive and emotional contexts. The approach is personalized and oriented toward balance, neuronal flexibility, and cognitive performance, aiming to support the brain’s optimal functioning in the medium and long term.",
      contactCta: "Contact us",
      servicesCta: "Services",
      items: [
        {
          title: "ADHD",
          body:
            "If you want to improve your attention, manage your impulses better, and have better control over your level of mental energy, brain training can be the ideal solution to support you in daily life.",
        },
        {
          title: "Alzheimer’s",
          body:
            "If you want to protect your memory, reduce brain inflammation, and maintain mental clarity, brain training can contribute to supporting long-term cognitive health.",
        },
        {
          title: "Autism",
          body:
            "For those who want to improve neuronal connectivity, support social communication, and optimize cognitive functions, brain training can bring significant improvements in quality of life.",
        },
        {
          title: "Dementia",
          body:
            "To stimulate cognitive functions, maintain thinking abilities, and slow down memory loss, brain training can be an effective and natural solution.",
        },
        {
          title: "Sleep issues",
          body:
            "For restful sleep, reducing stress, and balancing the body’s natural rhythms, brain training can become a beneficial solution for a healthy lifestyle.",
        },
        {
          title: "Anxiety",
          body:
            "To reduce stress and balance the nervous system, brain training can support a state of calm and clarity.",
        },
        {
          title: "Depression",
          body:
            "To improve mood, reduce emotional stress, and increase energy levels, brain training can contribute significantly to your wellbeing.",
        },
        {
          title: "Focus",
          body:
            "If you want to improve your mental clarity, stimulate neuroplasticity, and maintain focus on your goals, brain training can be the right solution.",
        },
      ],
    },
    pricing: {
      badge: "Pricing",
      title: "Solutions for every step of your transformation",
      benefitsTitle: "Benefits:",
      descriptionTitle: "Description:",
      description:
        "We offer personalized and transparent packages, designed to deliver the best experience and efficient results. Discover clear and accessible rates for every stage of your journey toward balance and healing.",
      groups: [
        {
          title: "iSyncMe® pricing",
          items: [
            {
              label: "Brainmapping",
              price: [{ label: "", price: "3000 RON" }],
              description:
                "Brainmapping is an advanced assessment of brain activity performed using high-precision EEG technology, providing a clear and objective overview of how the brain functions. This detailed analysis identifies neural imbalances, dysfunctional patterns, and areas that require support or optimization.\n\nBy integrating artificial intelligence and advanced brain analysis algorithms, brainmapping transforms complex EEG data into clear, actionable insights. These insights form the foundation for a fully personalized therapy plan, precisely tailored to the individual’s unique brain profile.\n\nBrainmapping can be used both at the beginning of the therapeutic journey, to guide targeted neurotherapy, and at later stages, to objectively measure progress and results. It is an essential tool for individuals seeking clarity, accuracy, and a science-based approach to cognitive, emotional, and neurological optimization.",
              benefits: [
                "Provides a clear, detailed overview of brain activity",
                "Identifies neural imbalances and dysfunctional brain patterns",
                "Enables personalized, data-driven therapy plans",
                "Objectively monitors therapeutic progress and outcomes over time",
                "Supports improved cognitive performance and mental clarity",
                "Helps manage stress, anxiety, and emotional imbalances",
                "Non-invasive, safe, and science-backed neurotechnology",
              ]
            },
            {
              label: "iSyncMe® Therapy",
              price: [{ label: "1 session", price: "400 RON" }],
              extraPrices: [{ label: "20 sessions package", price: "6000 RON" }],
              description:
                "The iSyncMe® therapy is a cutting-edge neurotherapy solution that goes beyond traditional approaches to brain health. Harnessing the power of advanced photobiomodulation (PBM) and real-time EEG guidance, this therapy supports the brain’s natural ability to rebalance itself, improve neural communication, and promote overall mental and emotional regeneration. \n\nUsing near-infrared light technology combined with precise brainwave feedback, iSyncMe® targets key neural pathways to enhance cognitive performance, emotional resilience, and daily functioning. By integrating science-driven neurostimulation with personalized protocols, iSyncMe® delivers a transformative experience designed to elevate mental clarity, energy, and wellbeing for individuals seeking optimal brain performance and recovery.",
              benefits: [
                "Deep neuronal regeneration and revitalization through targeted light-based neurotherapy",
                "Enhanced cognitive function, including sharper memory and quicker information processing",
                "Improved emotional balance and reduced stress responses through brainwave optimization",
                "Increased mental clarity, focus, and sustained energy throughout the day",
                "Support for recovery after neurological events such as stroke or trauma",
                "Non-invasive, science-based approach using AI-guided EEG and advanced photobiomodulation",
                "Personalized neurotherapy protocols tailored to your unique brain patterns",
                "Boosted resilience to daily mental fatigue and cognitive decline",
              ]

            },
            {
              label: "iSyncMe® Therapy and Final Brainmapping",
              price: [{ label: "20 sessions package \nfinal brainmapping", price: "7500 RON" }],
              extraPrices: [{ label: "", price: "" }],
              description:
                "The Complete Brain Optimization Package is designed for clients who want maximum results with optimized investment.\nThis exclusive package combines a full series of iSyncMe® neurotherapy sessions with a Final Brainmapping assessment, delivering both deep therapeutic impact and clear, measurable outcomes. Instead of purchasing services individually at a considerably higher total cost, this bundled program offers exceptional value while maintaining the highest technological standards.\n\nThroughout the therapy, brain activity is progressively rebalanced and supported through advanced neurotechnology. At the end of the program, the final brain mapping provides a detailed, objective overview of the neurological improvements achieved, offering clarity, validation, and confidence in the results.\nThis package is ideal for those seeking long-term transformation, not just short-term relief.",
              benefits: [
                "All-in-one neurotherapy solution with optimized pricing",
                "Substantial cost advantage compared to individual services",
                "Continuous brain rebalancing through a structured therapy plan",
                "Final brain mapping to clearly measure progress and results",
                "Improved cognitive performance and mental clarity",
                "Emotional balance, stress reduction, and increased resilience",
                "Enhanced energy, focus, and overall neurological wellbeing",
                "Premium experience designed for committed clients",
              ],
            },
          ],
        },
        {
          title: "Neurofeedback pricing",
          items: [
            {
              label: "Neurofeedback",
              price: [{ label: "1 session", price: "300 RON" }],
              extraPrices: [{ label: "20 sessions package", price: "5,000 RON" }],
              description:
                "Neurofeedback with NeurOptimal® is an advanced form of brain training that uses dynamic neurofeedback technology to optimize the brain’s natural functioning in a non-invasive, safe, and fully individualized way. Unlike traditional neurofeedback approaches that rely on fixed protocols, the NeurOptimal® system does not attempt to force the brain into a predefined state. Instead, it provides real-time feedback on brain activity, allowing the brain to self-regulate and optimize itself naturally.\n\nBy continuously monitoring brainwaves and delivering subtle feedback signals that reflect moment-to-moment neural activity, NeurOptimal® supports internal self-regulation processes and neurological flexibility. This leads to improved mental clarity, emotional balance, and adaptability to daily challenges. The technology is suitable for people of all ages who seek optimal brain performance, enhanced focus, stress management, and overall mental wellbeing.",
              benefits: [
                "Non-invasive brain training that supports the brain’s natural self-regulation",
                "Operates in real time, adapting to each individual’s unique brain patterns",
                "Supports mental clarity, focus, and overall cognitive performance",
                "Promotes emotional balance and improved stress management",
                "May improve sleep quality and increase energy levels",
                "Enhances brain resilience to mental fatigue and overload",
                "Safe, comfortable technology requiring no conscious effort from the client",
                "Suitable for all ages and life stages, without the need for a medical diagnosis",
              ]
            },
          ],
        },
      ],
    },
    contact: {
      badge: "Contact",
      title: "Synaptica Cluj",
      description:
        "We are here to respond with empathy and promptness. If you have questions about our services or want to book an appointment, the Synaptica Cluj team offers personalized support, based on advanced technology and genuine care.",
      callCta: "Call us",
      emailCta: "Write to us",
      phoneLabel: "Phone",
      phone: "0755062039",
      emailLabel: "Email",
      email: "contacts@synaptica-cluj.ro",
      addressLabel: "Address",
      address: "Str. Robert Koch Nr. 7, Cluj-Napoca 400347",
      scheduleLabel: "Opening hours",
      scheduleLine1: "Monday – Friday: 10:00–18:00",
      scheduleLine2: "Saturday and Sunday: closed",
      socials: {
        instagram: "https://www.instagram.com/synapticacluj/",
        facebook: "https://www.facebook.com/synapticacluj/",
        tiktok: "https://www.tiktok.com/@synapticacluj",
      },
      mapTitle: "Map to Synaptica Cluj",
      form: {
        title: "Write your message",
        subtitle: "Leave your details and we will contact you shortly.",
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        consent: {
          prefix: "By submitting this message, you confirm you have read and agree to the",
          gdpr: "GDPR policy",
          and: "and the",
          terms: "terms & conditions",
          suffix: "regarding how we process and protect your data.",
        },
        consentError: "Please accept the GDPR and Terms & Conditions to send the message.",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent. We will get back to you soon.",
        error: "We couldn't send the message right now. Please try again.",
        recaptchaNotConfigured: "reCAPTCHA is not configured.",
        recaptchaUnavailable: "reCAPTCHA is currently unavailable.",
        recaptchaValidationFailed: "reCAPTCHA validation failed.",
        validation: {
          required: "Please complete this field.",
          typeMismatch: "Please enter a valid value.",
          tooShort: "The value is too short.",
          tooLong: "The value is too long.",
          patternMismatch: "Please match the requested format.",
          name: {
            required: "Please enter your name.",
            tooShort: "Name must contain between 3 and 25 characters.",
            tooLong: "Name must contain between 3 and 25 characters.",
            patternMismatch: "Name must contain only letters and be between 3 and 25 characters.",
          },
          email: {
            required: "Please enter your email address.",
            typeMismatch: "Please enter a valid email address.",
          },
          phone: {
            tooShort: "Phone number must contain between 9 and 13 digits.",
            tooLong: "Phone number must contain between 9 and 13 digits.",
            patternMismatch: "Phone number must contain only digits and be between 9 and 13 characters.",
          },
          message: {
            required: "Please enter your message.",
          },
        },
      },
      links: {
        gdpr: "GDPR",
        terms: "Terms & Conditions",
        cookies: "Cookie Policy",
        useful: "Useful links",
        home: "Home",
        pricing: "Pricing",
        conditions: "Conditions",
        contact: "Contact",
        rights: "All rights reserved.",
        maintainedBy: "Maintained by",
      },
    },
    legal: {
      links: {
        legalInfo: "Legal information",
        gdpr: "GDPR",
        terms: "Terms & Conditions",
        cookies: "Cookie Policy",
        useful: "Useful links",
        home: "Home",
        services: "Services",
        pricing: "Pricing",
        conditions: "Conditions",
        contact: "Contact",
        rights: "All rights reserved.",
        maintainedBy: "Maintained by",
      },
      gdpr: {
        badge: "GDPR",
        title: "Privacy Policy on Processing Personal Data",
        updated: "Last updated: 24.06.2025",
        intro:
          "This Privacy Policy describes how Synaptica Cluj collects, uses, stores, and protects your personal data in accordance with the General Data Protection Regulation (GDPR). By using our website and brainmapping and neurofeedback services, you agree to this policy.",
        sections: [
          {
            title: "1. Data collected",
            bullets: ["First and last name", "Phone number", "Email address"],
          },
          {
            title: "2. Purpose of processing",
            bullets: [
              "Managing appointment requests for neurofeedback or brainmapping evaluations and sessions",
              "Communicating with users to confirm, modify, or cancel appointments",
              "Providing personalized recommendations based on data voluntarily provided",
            ],
          },
          {
            title: "3. Legal basis",
            bullets: [
              "Explicit consent provided in contact or appointment forms",
              "Performance of a contract for the requested services",
            ],
          },
          {
            title: "4. Storage duration",
            body:
              "Data will be stored for an indefinite period, with the option to delete upon user request via an email sent to contacts@synaptica-cluj.ro.",
          },
          {
            title: "5. User rights",
            bullets: [
              "Right of access",
              "Right to rectification",
              "Right to erasure (\"right to be forgotten\")",
              "Right to restriction of processing",
              "Right to data portability",
              "Right to object",
              "Right to lodge a complaint with ANSPDCP",
            ],
          },
          {
            title: "6. Sharing with third parties",
            bullets: [
              "Google LLC – for traffic and performance analytics (Google Analytics)",
              "Amazon Web Services – for secure hosting of data and the web platform",
            ],
          },
          {
            title: "7. Security",
            bullets: ["Encrypted connections (SSL)", "Internal authentication and access control", "Limiting data access to authorized staff only"],
          },
          {
            title: "8. Cookies",
            body:
              "Our site uses cookies for functionality, analysis, and personalized experience. For details, see the Cookie Policy.",
          },
          {
            title: "9. Changes",
            body: "We reserve the right to update the policy periodically. Any changes will be displayed on this page.",
          },
          {
            title: "10. Contact",
            body: "For any questions or requests regarding data protection, you can write to: contacts@synaptica-cluj.ro",
          },
        ],
      },
      terms: {
        badge: "Terms & Conditions",
        title: "Terms and Conditions",
        updated: "Last updated: 24.06.2025",
        intro:
          "By accessing the Synaptica Cluj website and using the services offered (such as brainmapping and neurofeedback), you confirm that you have read, understood, and accepted these terms and conditions. If you do not agree with these terms, please do not use the site.",
        sections: [
          {
            title: "1. Definitions",
            bullets: [
              "\"Site\": the online platform synaptica-cluj.ro",
              "\"Services\": evaluations through brainmapping, neurofeedback, technological consultations supporting mental health",
              "\"User\": any person who accesses the site or uses the services offered by Synaptica Cluj",
            ],
          },
          {
            title: "2. Use of the site",
            body:
              "The site is intended for users over 18 years old. By completing forms or requesting an appointment, you confirm that you have the legal capacity to enter into contracts and that you provide true and complete information.",
          },
          {
            title: "3. User obligations",
            bullets: [
              "Provide truthful and up-to-date information",
              "Do not use the site for abusive, illegal, or misleading purposes",
              "Respect Synaptica Cluj’s copyright and trademarks on published content",
            ],
          },
          {
            title: "4. Intellectual property rights",
            body:
              "All materials on the site — texts, images, graphics, technologies, logos, software components — are the property of Synaptica Cluj or its partners and may not be reproduced or used without written consent.",
          },
          {
            title: "5. Limitation of liability",
            body:
              "The information presented is for informational purposes and does not replace medical consultation. Synaptica Cluj is not responsible for losses or damages caused by misinterpretation or improper use of the information on the site.",
          },
          {
            title: "6. Changes to the terms",
            body:
              "We reserve the right to modify these terms at any time. Any update will be displayed on this page. Continued use of the site constitutes acceptance of the new terms.",
          },
          {
            title: "7. Governing law",
            body:
              "This document is governed by Romanian law. Any disputes will be resolved by the competent courts in Romania.",
          },
          {
            title: "8. Contact",
            body: "For questions or clarifications regarding these terms, you can contact us at: contacts@synaptica-cluj.ro",
          },
        ],
      },
      cookies: {
        badge: "Cookie Policy",
        title: "Cookie Policy",
        updated: "Last updated: 24.06.2025",
        intro:
          "This policy explains how the Synaptica Cluj site uses cookies to improve user experience, optimize performance, and offer personalized functionality. By using this site, you agree to the use of cookies as described below.",
        banner: {
          title: "We use cookies",
          description:
            "We rely on cookies to ensure the site works properly, analyze traffic, and personalize your experience. By continuing, you agree to the Cookie Policy.",
          link: "See the Cookie Policy",
          accept: "Accept cookies",
        },
        sections: [
          {
            title: "1. What are cookies?",
            body:
              "Cookies are small text files stored on your device when you visit a website. They help recognize the device and provide a faster, more personalized online experience.",
          },
          {
            title: "2. Types of cookies used",
            bullets: [
              "Essential cookies: necessary for basic site functionality",
              "Performance cookies: help analyze how visitors interact with the site (e.g., Google Analytics)",
              "Functionality cookies: remember user preferences such as language or display settings",
              "Marketing cookies: allow relevant content to be shown based on online behavior",
            ],
          },
          {
            title: "3. How we use cookies",
            bullets: [
              "To ensure correct platform operation",
              "To monitor site performance",
              "To adapt content to user needs",
              "To optimize interaction with site visitors",
            ],
          },
          {
            title: "4. Managing preferences",
            body:
              "You can control and customize cookie usage from your browser settings. Note that disabling essential cookies may affect proper site functionality.\nFor more information, visit www.allaboutcookies.org.",
          },
          {
            title: "5. Changes to the policy",
            body:
              "We reserve the right to update this policy periodically. Any changes will be displayed on this page and will take effect from the date of publication.",
          },
          {
            title: "6. Contact",
            body: "For questions or requests related to this policy, contact us at: contacts@synaptica-cluj.ro",
          },
        ],
      },
    },
  },
  ro: {
    nav: {
      links: [
        { href: "/", label: "Home" },
        { href: "/services", label: "Servicii" },
        { href: "/pricing", label: "Preturi" },
        { href: "/conditions", label: "Afectiuni" },
        { href: "/contact", label: "Contact" },
      ],
      languageLabel: "Limba",
    },
    notFound: {
      badge: "Ups…",
      title: "Pagina nu a fost gasita",
      description:
        "Ne pare rau, pagina pe care o cauti nu exista sau a fost mutata. Daca ai urmat un link, spune-ne si il corectam.",
      hint: "Daca ai cautat o pagina anume, poti reveni la Home sau folosi meniul de sus.",
      homeCta: "Home",
      contactCta: "Contact",
    },
    home: {
      company: {
        badge: "Synaptica Cluj",
        titleStart: "Revoluționează-ți",
        titleHighlight: "sănătatea mentală",
        titleEnd: "",
        subtitle: "Experiența Synaptica Cluj: unde tehnologia întâlnește empatia",
        description:
          "La Synaptica Cluj, combinăm tehnologia de vârf cu o abordare empatică și personalizată pentru a-ți oferi soluții rapide și eficiente pentru sănătatea ta mentală. Brainmapping-ul nostru avansat, împreună cu terapia de neurofeedback și fotobiomodulare, te ajută să depășești provocările psihice și emoționale cu o eficiență remarcabilă. Rezultatele noastre sunt stabile în timp, iar echipa noastră dedicată este aici pentru a te sprijini în fiecare pas al călătoriei tale către o sănătate mentală optimă.",
        imageAlt: "Echipa Synaptica Cluj și tehnologia utilizată",
      },
      neuro: {
        badge: "Neurofeedback",
        titleStart: "Antrenament cerebral pentru",
        titleHighlight: "performanta de varf.",
        subtitle: "Feedback-ul EEG în timp real sprijină creierul să își regleze activitatea în mod natural, favorizând echilibrul, claritatea mentală și funcționarea optimă.",
        description:
          "Senzorii monitorizează activitatea cerebrală, identifică tiparele ineficiente și transmit semnale vizuale și auditive blânde, care ghidează creierul către un ritm funcțional optim.",
        points: [
          "Semnalele pozitive consolidează activitatea cerebrală dorită, iar micro-pauzele indică necesitatea ajustărilor.",
          "Procesul susține flexibilitatea neuronală, echilibrul emoțional și reziliența cognitivă.",
          "Abordarea este adaptabilă și eficientă indiferent de nivelul inițial de funcționare.",
          "Metodologia utilizează sistemul NeurOptimal®, susținând autoreglarea cerebrală și optimizarea performanței la cel mai înalt nivel."
        ],
        primaryCta: "Descopera neurofeedback",
        secondaryCta: "Vezi afectiuni",
      },
      badge: "brainmapping",
      titleStart: "Înțelegerea creierului cu",
      titleHighlight: "precizie și inteligență.",
      titleEnd: "",
      description:
        "Transformăm semnalele cerebrale în date aplicabile, identificând dezechilibrele neuronale și susținând planuri de terapie personalizate prin brainmapping avansat și analiză inteligentă.",
      seoIntro:
        "Synaptica Cluj este o clinica dedicata sanatatii cerebrale, care combina brainmapping EEG, neurofeedback si programe ghidate pentru echilibru mental, claritate cognitiva si rezilienta emotionala. Lucram cu persoane care isi doresc progres masurabil, de la somn mai bun si concentrare crescuta pana la reglarea stresului si stare generala de bine. Fiecare parcurs incepe cu o evaluare care arata cum functioneaza creierul si unde sprijinul personalizat aduce cea mai mare valoare.",
      seoDetail:
        "Serviciile noastre imbina tehnologia moderna cu o abordare umana si empatica. Etapa de brainmapping ofera o imagine clara a tiparelor de activitate, iar sedintele de neurofeedback ajuta creierul sa se autoregleze prin semnale blande, in timp real. Adaptam recomandarile pentru fiecare persoana, explicam procesul pe intelesul tuturor si urmarim evolutia in timp. Daca vrei o ruta structurata pentru performanta, echilibru si sanatate mentala pe termen lung, Synaptica Cluj iti ofera un mediu calm, specialisti dedicati si solutii gandite pentru obiectivele tale.",
      primaryCta: "Vezi servicii",
      secondaryCta: "Afla prețurile",
      statSpeedLabel: "Durata procesului",
      statSpeedValue: "4-7 saptamani",
      statSpeedNote: "Brainmapping și protocol personalizat",
      statQualityLabel: "Antrenamente cerebrale personalizate",
      statQualityValue: "Afectiuni adresate",
      statTags: ["Lipsa Somnului", "Anxietate"],
      statMoreLabel: "mai mult",
      flowLabel: "proces",
      flowTitle: "De la evaluare la echilibru cognitiv",
      flowYear: "",
      phases: [
        { title: "Evaluare cerebrală", sprint: "Brainmapping", progress: 30 },
        { title: "Intervenție personalizată", sprint: "Protocol ghidat", progress: 60 },
        { title: "Monitorizare și ajustare", sprint: "Optimizare continuă", progress: 100 },
      ],
      kitTitle: "Kit de lansare",
      kitStatus: "On track",
      kitTags: ["Landing pages", "Animatii frumoase", "SEO-ready"],
      quickNavBadge: "Navigare rapida",
      quickNavTitle: "Tot ce ai nevoie, la un click distanta",
      quickNavCta: "Ai o intrebare? Hai sa vorbim →",
      quickLinkDiscover: "Descopera",
      quickLinks: [
        {
          title: "Servicii",
          href: "/services",
          description: "Terapie cu casca iSyncMe®, Brainmapping EEG și Neurofeedback cu NeurOptimal® – soluții personalizate, bazate pe știință, pentru optimizarea funcționării creierului, claritate mentală și echilibru emoțional.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "Descoperă serviciile"
        },
        {
          title: "Preturi",
          href: "/pricing",
          description: "Preturi clare pentru ședințe individuale și programe integrate, concepute pentru continuitate, rezultate măsurabile și o investiție eficientă în sănătatea ta neurologică.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "Vezi prețurile"
        },
        {
          title: "Afectiuni",
          href: "/conditions",
          description:
            "Descoperă principalele afecțiuni și dificultăți care pot fi abordate prin neurofeedback și brainmapping, alături de soluții moderne pentru echilibru emoțional, claritate mentală și performanță optimă.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "Vezi afectiunile"
        },
        {
          title: "Contact",
          href: "/contact",
          description: "Programează o evaluare sau discută cu noi despre cea mai potrivită soluție pentru nevoile tale. Oferim ghidare personalizată, tehnologie avansată și grijă autentică.",
          accent: "from-[#cdb360]/35 to-[#9f8a3f]/15",
          buttonName: "Ia legătura cu noi"
        },
      ],
    },
    services: {
      pageTitle: "Servicii",
      intro: "Programe premium pentru sanatatea creierului, cu tehnologie medicala si ingrijire personalizata.",
      ctaPrimary: "Programeaza o sesiune",
      ctaSecondary: "Contacteaza-ne",
      includesTitle: "Ce include serviciul",
      stepsTitle: "Etape cheie",
      sections: [
        {
          key: "isync",
          badge: "Terapie cu casca iSyncMe®",
          title: "Brainmapping si protocol ghidat de inteligenta artificiala",
          highlight: "EEG de precizie, interpretare, protocol adaptiv",
          details: [
            "Terapia cu casca iSyncMe® reprezintă o abordare avansată de evaluare și susținere a funcționării cerebrale, bazată pe tehnologie EEG de înaltă precizie și analiză asistată de inteligență artificială. Sistemul captează activitatea electrică a creierului și o transformă într-o hartă detaliată a funcționării neuronale, oferind o perspectivă obiectivă asupra modului în care creierul procesează informația.",
            "Procesul începe cu o scanare cerebrală de tip brainmapping, care analizează activitatea cerebrală în diferite zone și frecvențe. Datele obținute sunt comparate cu baze de date normative și sunt interpretate pentru a identifica tipare funcționale, dezechilibre sau zone care necesită susținere suplimentară. Această etapă oferă o înțelegere clară și personalizată a activității cerebrale.",
            "Pe baza rezultatelor obținute, are loc interpretarea brainmapping-ului, etapă esențială în definirea direcției de intervenție. Analiza nu se rezumă la valori izolate, ci urmărește coerența globală a activității cerebrale și modul în care diferitele regiuni interacționează între ele.",
            "Următorul pas este crearea unui protocol personalizat, adaptat nevoilor individuale. Protocolul este ghidat de inteligență artificială și are rolul de a susține autoreglarea și optimizarea activității cerebrale într-un mod progresiv și sigur. Intervenția este structurată, dar flexibilă, fiind ajustată în funcție de răspunsul creierului pe parcurs.",
            "Întregul proces include monitorizare continuă și ajustări periodice, pentru a asigura consistență și eficiență pe termen mediu și lung. Această abordare permite o adaptare dinamică a protocolului, în funcție de evoluția fiecărei persoane.",
          ],
          bullets: [
            "Brainmapping EEG pentru evaluare detaliata",
            "Interpretare aliniata obiectivelor personale",
            "Protocol personalizat ghidat de AI pentru sustinere progresiva",
            "Monitorizare continua si ajustari ale protocolului",
          ],
          steps: ["Scanare", "Interpretare", "Protocol personalizat", "Monitorizare"],
        },
        {
          key: "neuro",
          badge: "Neurofeedback cu NeurOptimal®",
          title: "Antrenament cerebral dinamic pentru echilibru si performanta",
          highlight: "Feedback EEG in timp real, autoreglare fara efort",
          details: [
            "Neurofeedback-ul cu NeurOptimal® este un sistem avansat de antrenament cerebral, non-invaziv, care funcționează prin feedback EEG în timp real. Tehnologia monitorizează continuu activitatea creierului și oferă semnale audio subtile, permițând creierului să își observe propriile variații și să se autoregleze natural.",
            "Spre deosebire de abordările direcționate sau rigide, NeurOptimal® utilizează un sistem dinamic, care răspunde în timp real la schimbările activității cerebrale. Creierul primește feedback exact în momentele de variație, ceea ce facilitează conștientizarea și ajustarea automată a ritmurilor sale interne.",
            "Antrenamentul nu presupune efort conștient, exerciții mentale sau control voluntar. Creierul este lăsat să își găsească propriul echilibru, într-un mod natural și sigur. Această abordare susține flexibilitatea neuronală, capacitatea de adaptare și reziliența, indiferent de punctul de start.",
            "NeurOptimal® este utilizat atât pentru optimizarea performanței cognitive și emoționale, cât și pentru susținerea stării generale de bine. Sistemul este potrivit pentru persoane de toate vârstele și este apreciat pentru caracterul său blând, dar eficient.",
            "Fiecare sesiune reprezintă un proces de învățare pentru creier, contribuind la dezvoltarea unei funcționări mai stabile, mai echilibrate și mai coerente în timp."
          ],
          bullets: [
            "Feedback EEG in timp real pentru autoreglare",
            "Antrenament non-invaziv, fara efort mental",
            "Dezvolta flexibilitatea, echilibrul si rezilienta",
            "Sustine performanta cognitiva, emotionala si starea generala",
          ],
          steps: ["Monitorizare dinamica", "Feedback subtil", "Invatare de autoreglare", "Echilibru sustinut"],
        },
      ],
    },
    conditions: {
      badge: "Afectiuni",
      title: "Zone în care intervenim prin antrenament cerebral",
      description:
        "Prin tehnologii avansate de antrenament cerebral, brainmapping EEG și neurofeedback, susținem autoreglarea și optimizarea funcționării creierului în diverse contexte cognitive și emoționale. Abordarea este personalizată și orientată către echilibru, flexibilitate neuronală și performanță cognitivă, având ca obiectiv susținerea funcționării optime a creierului pe termen mediu și lung.",
      contactCta: "Contacteaza-ne",
      servicesCta: "Servicii",
      items: [
        {
          title: "ADHD",
          body:
            "Daca doresti sa iti imbunatatesti atentia, sa iti gestionezi mai bine impulsurile si sa ai un control mai bun asupra nivelului de energie mentala, antrenamentele cerebrale pot fi solutia ideala pentru a te sustine in viata de zi cu zi.",
        },
        {
          title: "Alzheimer",
          body:
            "Daca vrei sa iti protejezi memoria, sa reduci inflamatia cerebrala si sa iti mentii claritatea mentala, antrenamentele cerebrale pot contribui la sustinerea sanatatii cognitive pe termen lung.",
        },
        {
          title: "Autism",
          body:
            "Pentru cei care doresc sa imbunatateasca conectivitatea neuronala, sa sustina comunicarea sociala si sa optimizeze functiile cognitive, antrenamentele cerebrale pot aduce imbunatatiri semnificative in calitatea vietii.",
        },
        {
          title: "Dementa",
          body:
            "Pentru a stimula functiile cognitive, a mentine abilitatile de gandire si a incetini pierderea memoriei, antrenamentele cerebrale pot fi o solutie eficienta si naturala.",
        },
        {
          title: "Lipsa Somnului",
          body:
            "Pentru un somn odihnitor, reducerea stresului si echilibrarea ritmurilor naturale ale corpului, antrenamentele cerebrale pot deveni o solutie benefica pentru un stil de viata sanatos.",
        },
        {
          title: "Anxietate",
          body:
            "Pentru reducerea stresului si echilibrarea sistemului nervos, antrenamentele cerebrale pot sustine o stare de calm si claritate.",
        },
        {
          title: "Depresie",
          body:
            "Pentru imbunatatirea starii de spirit, reducerea stresului emotional si cresterea nivelului de energie, antrenamentele cerebrale pot contribui semnificativ la starea ta de bine.",
        },
        {
          title: "Puterea de concentrare",
          body:
            "Daca iti doresti sa iti imbunatatesti claritatea mentala, sa stimulezi neuroplasticitatea si sa iti mentii focalizarea pe obiective, antrenamentele cerebrale pot fi solutia potrivita.",
        },
      ],
    },
    pricing: {
      badge: "Prețuri",
      title: "Solutii dedicate fiecarui pas al transformarii tale",
      benefitsTitle: "Beneficii:",
      descriptionTitle: "Descriere:",
      description:
        "Oferim pachete personalizate si transparente, concepute sa aduca cea mai buna experienta si rezultate eficiente. Descopera preturi clare si accesibile pentru fiecare etapa a calatoriei tale spre echilibru si vindecare.",
      groups: [
        {
          title: "Prețuri iSyncMe®",
          items: [
            {
              label: "Brainmapping",
              price: [{ label: "", price: "3000 RON" }],
              description:
                "Brainmapping-ul este o evaluare avansată a activității cerebrale, realizată cu ajutorul tehnologiei EEG de înaltă precizie, care oferă o imagine detaliată și obiectivă a modului în care funcționează creierul. Această analiză permite identificarea dezechilibrelor neuronale, a tiparelor disfuncționale și a zonelor care necesită susținere sau optimizare.\n\nPrin integrarea inteligenței artificiale și a algoritmilor de analiză cerebrală, brainmapping-ul transformă datele brute în informații clare și ușor de interpretat, constituind baza unui plan terapeutic personalizat. Evaluarea poate fi utilizată atât înainte de terapie, pentru a ghida intervenția, cât și ulterior, pentru a măsura obiectiv progresul și rezultatele obținute.\n\nBrainmapping-ul este un instrument esențial pentru persoanele care își doresc claritate, precizie și o abordare științifică în optimizarea performanței cognitive, emoționale și neurologice.",
              benefits: [
                "Oferă o imagine clară și detaliată a activității cerebrale",
                "Identifică dezechilibrele neuronale și tiparele disfuncționale",
                "Permite crearea unor planuri terapeutice personalizate, bazate pe date reale",
                "Monitorizează obiectiv progresul și eficiența terapiei în timp",
                "Contribuie la îmbunătățirea performanței cognitive și a clarității mentale",
                "Sprijină gestionarea stresului, anxietății și a dezechilibrelor emoționale",
                "Tehnologie non-invazivă, sigură și susținută științific",
              ]

            },
            {
              label: "Terapie cu casca iSyncMe®",
              price: [{ label: "1 ședinta", price: "400 RON" }],
              extraPrices: [{ label: "pachet 20 ședinte", price: "6000 RON" }],
              description:
                "Terapia iSyncMe® este o soluție de neuroterapie de ultimă generație, care depășește abordările tradiționale privind sănătatea creierului. Valorificând puterea fotobiomodulării avansate (PBM) și a ghidajului EEG în timp real, această terapie susține capacitatea naturală a creierului de a se reechilibra, de a îmbunătăți comunicarea neuronală și de a stimula regenerarea mentală și emoțională.\n\nPrin utilizarea tehnologiei cu lumină în spectru infraroșu, combinată cu feedback precis al undelor cerebrale, iSyncMe® acționează asupra circuitelor neuronale cheie, contribuind la creșterea performanței cognitive, a rezilienței emoționale și a funcționării zilnice. Prin integrarea neurostimulării bazate pe știință cu protocoale personalizate, iSyncMe® oferă o experiență transformatoare, concepută pentru a amplifica claritatea mentală, nivelul de energie și starea generală de bine, pentru persoanele care își doresc performanță cerebrală optimă și susținerea proceselor de recuperare.",
              benefits: [
                "Regenerare neuronală profundă și revitalizare prin neuroterapie ghidată cu lumină",
                "Îmbunătățirea funcțiilor cognitive, inclusiv memorie mai clară și procesare mai rapidă a informațiilor",
                "Echilibru emoțional îmbunătățit și reducerea răspunsului la stres prin optimizarea undelor cerebrale",
                "Claritate mentală crescută, focus mai bun și energie susținută pe parcursul zilei",
                "Susținerea proceselor de recuperare după evenimente neurologice precum AVC sau traumatisme",
                "Abordare non-invazivă, bazată pe știință, utilizând EEG ghidat de inteligență artificială și fotobiomodulare avansată",
                "Protocoale de neuroterapie personalizate, adaptate tiparului unic de activitate cerebrală",
                "Creșterea rezilienței la oboseala mentală zilnică și la declinul cognitiv",
              ]

            },
            {
              label: "Terapie cu casca iSyncMe® și Brainmapping final",
              price: [{ label: 'pachet 20 ședinte\nbrainmapping final', price: "7500 RON" }],
              extraPrices: [{ label: "", price: "" }],
              description:
                "Pachetul Complet de Optimizare Cerebrală este conceput pentru clienții care își doresc rezultate maxime, cu o investiție optimizată.\nAcest pachet exclusiv combină o serie completă de sesiuni de neuroterapie iSyncMe® cu o evaluare finală de tip Brainmapping, oferind atât un impact terapeutic profund, cât și rezultate clare, măsurabile. În locul achiziționării serviciilor individuale, la un cost total semnificativ mai ridicat, acest program integrat oferă o valoare excepțională, menținând cele mai înalte standarde clinice și tehnologice.\n\nPe parcursul terapiei, activitatea cerebrală este reechilibrată progresiv și susținută prin neurotehnologie avansată. La finalul programului, brainmapping-ul final oferă o imagine detaliată și obiectivă asupra îmbunătățirilor neurologice obținute, aducând claritate, validare și încredere în rezultate.\nAcest pachet este ideal pentru cei care caută o transformare pe termen lung, nu doar o ameliorare temporară.",
              benefits: [
                "Soluție completă de neuroterapie, într-un singur pachet, cu preț optimizat",
                "Avantaj financiar semnificativ comparativ cu serviciile achiziționate individual",
                "Reechilibrare cerebrală continuă printr-un plan terapeutic structurat",
                "Brainmapping final pentru măsurarea clară a progresului și a rezultatelor",
                "Îmbunătățirea performanței cognitive și a clarității mentale",
                "Echilibru emoțional, reducerea stresului și creșterea rezilienței",
                "Nivel crescut de energie, focus și stare generală de bine neurologică",
                "Experiență premium, dedicată clienților implicați și consecvenți",
              ],

            },
          ],
        },
        {
          title: "Preturi Neurofeedback",
          items: [
            {
              label: "Neurofeedback", price: [{ label: "1 sedinta", price: "300 RON" }],
              extraPrices: [{ label: "pachet 20 ședinte", price: "5000 RON" }],
              description:
                "Neurofeedback cu NeurOptimal® este o formă avansată de antrenament cerebral, care folosește tehnologie de neurofeedback dinamică pentru a optimiza funcționarea naturală a creierului într-un mod **non-invaziv, sigur și adaptat fiecărei persoane**. Spre deosebire de neurofeedback-ul tradițional cu protocoale fixe, sistemul NeurOptimal® nu încearcă să „forțeze” creierul într-o anumită stare, ci îi oferă feedback în timp real despre propria activitate neuronală, astfel încât acesta să se autoregleze și să se optimizeze eficient. :contentReference[oaicite:1]{index=1}\n\nPrin monitorizarea undelor cerebrale și furnizarea de semnale subtile care reflectă activitatea creierului, NeurOptimal® stimulează procesele interne de autoreglare și flexibilitate neurologică, favorizând claritatea mentală, echilibrul emoțional și adaptabilitatea la provocările cotidiene. Această tehnologie este potrivită pentru persoane de orice vârstă care își doresc performanță optimă a creierului, îmbunătățirea concentrației sau suport pentru gestionarea stresului și sănătății mentale.",
              benefits: [
                "Antrenament cerebral non-invaziv care susține autoreglarea naturală a creierului",
                "Funcționează în timp real, adaptându-se la tiparele unice de activitate neuronală",
                "Sprijină claritatea mentală, concentrarea și performanța cognitivă generală",
                "Contribuie la echilibrul emoțional și la capacitatea de gestionare a stresului",
                "Poate îmbunătăți calitatea somnului și nivelul de energie",
                "Întărește reziliența creierului la oboseala mentală și suprasolicitare",
                "Tehnologie sigură și confortabilă, fără efort conștient din partea clientului",
                "Potrivită pentru toate vârstele și stadiile vieții, fără diagnostic medical prealabil",
              ]


            },

          ],
        },
      ],
    },
    contact: {
      badge: "Contact",
      title: "Synaptica Cluj",
      description:
        "Suntem aici pentru a-ți răspunde cu empatie și promptitudine. Dacă ai întrebări despre serviciile noastre sau dorești să faci o programare, echipa Synaptica Cluj îți oferă suport personalizat, bazat pe tehnologie avansată și grijă autentică.",
      callCta: "Sună-ne",
      emailCta: "Scrie-ne",
      phoneLabel: "Telefon",
      phone: "0755062039",
      emailLabel: "Email",
      email: "contacts@synaptica-cluj.ro",
      addressLabel: "Adresă",
      address: "Str. Robert Koch Nr. 7, Cluj-Napoca 400347",
      scheduleLabel: "Orar",
      scheduleLine1: "Luni – Vineri: 10:00–18:00",
      scheduleLine2: "Sâmbătă și duminică: închis",
      socials: {
        instagram: "https://www.instagram.com/synapticacluj/",
        facebook: "https://www.facebook.com/synapticacluj/",
        tiktok: "https://www.tiktok.com/@synapticacluj",
      },
      mapTitle: "Hartă către Synaptica Cluj",
      form: {
        title: "Scrie mesajul tău",
        subtitle: "Lasă-ne detaliile și revenim în scurt timp.",
        name: "Nume",
        email: "Email",
        phone: "Telefon",
        message: "Mesaj",
        consent: {
          prefix: "Prin trimiterea acestui mesaj confirmați că ați citit și sunteți de acord cu",
          gdpr: "politica GDPR",
          and: "și cu",
          terms: "termenii și condițiile",
          suffix: "privind modul în care prelucrăm și protejăm datele dumneavoastră.",
        },
        consentError: "Te rugăm să bifezi acordul GDPR și Termeni și Condiții înainte de a trimite mesajul.",
        submit: "Trimite mesajul",
        sending: "Se trimite...",
        success: "Mesaj trimis. Revenim în curând.",
        error: "Mesajul nu a putut fi trimis acum. Te rugăm să încerci din nou.",
        recaptchaNotConfigured: "reCAPTCHA nu este configurat.",
        recaptchaUnavailable: "reCAPTCHA nu este disponibil momentan.",
        recaptchaValidationFailed: "Validarea reCAPTCHA a eșuat.",
        validation: {
          required: "Te rugăm să completezi acest câmp.",
          typeMismatch: "Te rugăm să introduci o valoare validă.",
          tooShort: "Valoarea introdusă este prea scurtă.",
          tooLong: "Valoarea introdusă este prea lungă.",
          patternMismatch: "Te rugăm să respecți formatul cerut.",
          name: {
            required: "Te rugăm să introduci numele.",
            tooShort: "Numele trebuie să conțină între 3 și 25 de caractere.",
            tooLong: "Numele trebuie să conțină între 3 și 25 de caractere.",
            patternMismatch: "Numele trebuie să conțină doar litere și să aibă între 3 și 25 de caractere.",
          },
          email: {
            required: "Te rugăm să introduci adresa de email.",
            typeMismatch: "Te rugăm să introduci o adresă de email validă.",
          },
          phone: {
            tooShort: "Numărul de telefon trebuie să conțină între 9 și 13 cifre.",
            tooLong: "Numărul de telefon trebuie să conțină între 9 și 13 cifre.",
            patternMismatch: "Numărul de telefon trebuie să conțină doar cifre și să aibă între 9 și 13 caractere.",
          },
          message: {
            required: "Te rugăm să introduci mesajul.",
          },
        },
      },
      links: {
        gdpr: "GDPR",
        terms: "Termeni și Condiții",
        cookies: "Politica de Cookie-uri",
        useful: "Link-uri utile",
        home: "Home",
        services: "Servicii",
        pricing: "Preturi",
        conditions: "Afectiuni",
        contact: "Contact",
        rights: "Toate drepturile rezervate.",
        maintainedBy: "Maintained by",
      },
    },
    legal: {
      links: {
        legalInfo: "Informații legale",
        gdpr: "GDPR",
        terms: "Termeni și Condiții",
        cookies: "Politica de Cookie-uri",
        useful: "Link-uri utile",
        home: "Home",
        services: "Servicii",
        pricing: "Preturi",
        conditions: "Afectiuni",
        contact: "Contact",
        rights: "Toate drepturile rezervate.",
        maintainedBy: "Maintained by",
      },
      gdpr: {
        badge: "GDPR",
        title: "Politica de Confidențialitate privind Prelucrarea Datelor cu Caracter Personal",
        updated: "Ultima actualizare: 24.06.2025",
        intro:
          "Această Politică de Confidențialitate descrie modul în care Synaptica Cluj colectează, utilizează, stochează și protejează datele dumneavoastră cu caracter personal, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR). Prin utilizarea site-ului nostru și a serviciilor de brainmapping și neurofeedback, vă exprimați acordul cu privire la această politică.",
        sections: [
          {
            title: "1. Datele colectate",
            bullets: ["Nume și prenume", "Număr de telefon", "Adresa de e-mail"],
          },
          {
            title: "2. Scopul prelucrării datelor",
            bullets: [
              "Gestionarea solicitărilor de programare pentru evaluări și sesiuni de neurofeedback sau brainmapping",
              "Comunicarea cu utilizatorii pentru confirmarea, modificarea sau anularea programărilor",
              "Furnizarea unor recomandări personalizate pe baza datelor oferite voluntar",
            ],
          },
          {
            title: "3. Temeiul legal",
            bullets: [
              "Consimțământul explicit oferit în formularele de contact sau programare",
              "Executarea unui contract de prestare a serviciilor solicitate",
            ],
          },
          {
            title: "4. Durata stocării",
            body:
              "Datele vor fi stocate pe durată nedeterminată, cu posibilitatea de ștergere la cererea utilizatorului, printr-un e-mail trimis la contacts@synaptica-cluj.ro.",
          },
          {
            title: "5. Drepturile utilizatorului",
            bullets: [
              "Dreptul de acces",
              "Dreptul la rectificare",
              "Dreptul la ștergere („dreptul de a fi uitat”)",
              "Dreptul la restricționare a prelucrării",
              "Dreptul la portabilitate",
              "Dreptul de opoziție",
              "Dreptul de a depune o plângere la ANSPDCP",
            ],
          },
          {
            title: "6. Partajarea cu terți",
            bullets: [
              "Google LLC – pentru analize de trafic și performanță (Google Analytics)",
              "Amazon Web Services – pentru găzduirea securizată a datelor și platformei web",
            ],
          },
          {
            title: "7. Securitate",
            bullets: ["Conexiuni criptate (SSL)", "Autentificare și control de acces intern", "Limitarea accesului la date doar personalului autorizat"],
          },
          {
            title: "8. Cookie-uri",
            body:
              "Site-ul nostru utilizează cookie-uri pentru funcționalitate, analiză și experiență personalizată. Pentru detalii, consultați Politica de Confidențialitate.",
          },
          {
            title: "9. Modificări",
            body: "Ne rezervăm dreptul de a actualiza politica periodic. Orice modificare va fi afișată pe această pagină.",
          },
          {
            title: "10. Contact",
            body: "Pentru orice întrebări sau solicitări legate de protecția datelor, ne poți scrie la: contacts@synaptica-cluj.ro",
          },
        ],
      },
      terms: {
        badge: "Termeni și Condiții",
        title: "Termeni și Condiții",
        updated: "Ultima actualizare: 24.06.2025",
        intro:
          "Prin accesarea site-ului Synaptica Cluj și utilizarea serviciilor oferite (precum brainmapping și neurofeedback), confirmați că ați citit, înțeles și acceptat acești termeni și condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul.",
        sections: [
          {
            title: "1. Definiții",
            bullets: [
              "„Site-ul”: platforma online synaptica-cluj.ro",
              "„Servicii”: evaluări prin brainmapping, neurofeedback, consultații tehnologice de susținere a sănătății mentale",
              "„Utilizator”: orice persoană care accesează site-ul sau utilizează serviciile oferite de Synaptica Cluj",
            ],
          },
          {
            title: "2. Utilizarea site-ului",
            body:
              "Site-ul este destinat utilizatorilor de peste 18 ani. Prin completarea formularelor sau solicitarea unei programări, confirmați că aveți capacitatea legală de a încheia contracte și furnizați informații reale și complete.",
          },
          {
            title: "3. Obligațiile utilizatorului",
            bullets: [
              "Să furnizeze informații veridice și actualizate",
              "Să nu utilizeze site-ul în scopuri abuzive, ilegale sau înșelătoare",
              "Să respecte drepturile de autor și marca Synaptica Cluj asupra conținutului publicat",
            ],
          },
          {
            title: "4. Drepturi de proprietate intelectuală",
            body:
              "Toate materialele de pe site — texte, imagini, grafice, tehnologii, sigle, componente software — sunt proprietatea Synaptica Cluj sau a partenerilor săi și nu pot fi reproduse sau utilizate fără acordul scris.",
          },
          {
            title: "5. Limitarea răspunderii",
            body:
              "Informațiile prezentate au scop informativ și nu înlocuiesc consultul medical. Synaptica Cluj nu este responsabil pentru pierderi sau daune cauzate de interpretarea sau utilizarea necorespunzătoare a informațiilor de pe site.",
          },
          {
            title: "6. Modificări ale termenilor",
            body:
              "Ne rezervăm dreptul de a modifica acești termeni în orice moment. Orice actualizare va fi afișată pe această pagină. Continuarea utilizării site-ului reprezintă acceptul dumneavoastră față de noile condiții.",
          },
          {
            title: "7. Legea aplicabilă",
            body:
              "Prezentul document este guvernat de legislația română. Eventualele litigii vor fi soluționate de instanțele competente din România.",
          },
          {
            title: "8. Contact",
            body: "Pentru întrebări sau clarificări privind acești termeni, ne puteți contacta la: contacts@synaptica-cluj.ro",
          },
        ],
      },
      cookies: {
        badge: "Politica Cookie",
        title: "Politica privind Cookie-urile",
        updated: "Ultima actualizare: 24.06.2025",
        intro:
          "Această politică explică modul în care site-ul Synaptica Cluj utilizează cookie-uri pentru a îmbunătăți experiența utilizatorilor, a optimiza performanța și a oferi funcționalități personalizate. Prin utilizarea acestui site, vă exprimați acordul privind utilizarea cookie-urilor conform celor descrise mai jos.",
        banner: {
          title: "Folosim cookie-uri",
          description:
            "Folosim cookie-uri pentru funcționalitate, analiză și o experiență personalizată. Continuarea navigării înseamnă acordul tău cu Politica de Confidențialitate.",
          link: "Vezi Politica de cookie-uri",
          accept: "Accept cookie-urile",
        },
        sections: [
          {
            title: "1. Ce sunt cookie-urile?",
            body:
              "Cookie-urile sunt fișiere text de mici dimensiuni, stocate pe dispozitivul dumneavoastră atunci când vizitați un site web. Ele ajută la recunoașterea dispozitivului și la oferirea unei experiențe online mai rapide și mai personalizate.",
          },
          {
            title: "2. Tipuri de cookie-uri utilizate",
            bullets: [
              "Cookie-uri esențiale: necesare pentru funcționarea de bază a site-ului",
              "Cookie-uri de performanță: ne ajută să analizăm modul în care vizitatorii interacționează cu site-ul (de ex. Google Analytics)",
              "Cookie-uri de funcționalitate: rețin preferințele utilizatorului, cum ar fi limba sau setările de afișare",
              "Cookie-uri de marketing: permit afișarea de conținut relevant în funcție de comportamentul online",
            ],
          },
          {
            title: "3. Cum folosim cookie-urile?",
            bullets: [
              "Pentru a asigura funcționarea corectă a platformei",
              "Pentru a monitoriza performanța site-ului",
              "Pentru a adapta conținutul la nevoile utilizatorilor",
              "Pentru a optimiza interacțiunea cu vizitatorii platformei",
            ],
          },
          {
            title: "4. Gestionarea preferințelor",
            body:
              "Puteți controla și personaliza utilizarea cookie-urilor din setările browserului dumneavoastră. Rețineți că dezactivarea cookie-urilor esențiale poate afecta funcționarea corectă a site-ului.\nPentru mai multe informații, vizitați www.allaboutcookies.org.",
          },
          {
            title: "5. Modificări ale politicii",
            body:
              "Ne rezervăm dreptul de a actualiza periodic această politică. Orice modificare va fi afișată pe această pagină și va intra în vigoare de la data publicării.",
          },
          {
            title: "6. Contact",
            body: "Pentru întrebări sau solicitări legate de această politică, ne puteți contacta la: contacts@synaptica-cluj.ro",
          },
        ],
      },
    },
  },
};
