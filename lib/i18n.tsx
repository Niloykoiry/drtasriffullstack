"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applySectionOverrides,
  type EditableSection,
  type PublishedSectionOverrides,
} from "@/lib/content-translations";

const en = {
  brand: {
    name: "Dr. Tasrif Ahmed",
    role: "Oral & Maxillofacial Surgeon",
  },
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "specializations", label: "Specializations" },
    { id: "before-after", label: "Before & After" },
    { id: "gallery", label: "Gallery" },
    { id: "appointment", label: "Appointment" },
    { id: "contact", label: "Contact" },
  ],
  cta: "Book Appointment",
  close: "Close",
  hero: {
    badge: "Verified Professional BMDC no 6060 (BDS)",
    title: "Dr. Tasrif Ahmed",
    role: "Oral & Maxillofacial Surgeon",
    intro:
      "Compassionate care, advanced treatment, and better outcomes for your oral and facial health.",
    location: "Dhaka, Bangladesh",
    book: "Book an Appointment",
    watch: "Watch Introduction",
    scriptLine1: "Healthy Smiles",
    scriptLine2: "Better Lives",
    chips: ["Patient-First Care", "Precision. Function. Aesthetics."],
    scroll: "Scroll to explore",
  },
  about: {
    label: "About Me",
    heading: "Dedicated to Advanced Care and Better Outcomes",
    body: "I am a Oral & Maxillofacial Surgeon with a strong commitment to providing compassionate, evidence-based care. My goal is to help patients achieve better function, improved aesthetics, and a higher quality of life.",
    learnMore: "Learn More",
    cards: [
      {
        title: "Education",
        desc: "Qualifications and academic background ",
        points: [
          "AOCMF Fellowship in Oral & Maxillofacial–Head and Neck Oncology – Shanghai Ninth People's Hospital, Shanghai, China  (2026)",
          "Global Diploma in Oral Cancer – AOCMF & IAOO  (2024–25)",
          "Fellowship of College of Physicians & Surgeons (FCPS) – Oral and Maxillofacial Surgery, Bangladesh College of Physicians & Surgeons  (2024 – present)",
          "Master of Surgery (MS) in Oral and Maxillofacial Surgery – Dhaka Dental College Hospital / BSMMU  (July 2022)",
          "BDS – Dhaka Dental College, University of Dhaka  (January 2013)",
        ],
      },
      {
        title: "Experience",
        desc: "Professional experience and training ",
        points: [
          "Chief Consultant, Dr. Tasrif Ahmed's Oral Cancer & Facial Surgery Center, Dhaka  |  August 2023 – Present",
          "Assistant Registrar, Department of Oral and Maxillofacial Surgery, Dhaka Dental College Hospital  |  September 2022 – Present",
          "Assistant Cleft Surgeon – Smile Train Bangladesh (Dinajpur, Dhaka, Mymensingh, Netrokona)  (2016 – Present)",
          "Visiting Consultant (Craniofacial Trauma) – Popular Medical College Hospital, Dhaka  (July 2022 – Present)",
          "Visiting Consultant (Oral Oncology) – Ahsania Mission Cancer & General Hospital, Mirpur, Dhaka  (July 2022 – Present)",
          "Resident – Department of OMS, Dhaka Dental College Hospital  (June 2017 – August 2022)",
          "Dental Surgeon – Upazilla Health Complex, Kalmakanda, Netrokona  (June 2016 – May 2017)",
          "Postgraduate Trainee – Department of Conservative Dentistry & Endodontics, BSMMU, Dhaka  (July 2015 – December 2015)",
          "Postgraduate Trainee – Department of OMS, Dhaka Dental College Hospital  (July 2014 – July 2016)",
        ],
      },
      {
        title: "Approach",
        desc: "Patient-centered, ethical and modern treatment approach",
      },
    ],
    overlay: ["Science", "Skill", "Compassion"],
    modal: {
      title: "About Dr. Tasrif Ahmed",
      p1: "Dr. Tasrif Ahmed is a Oral & Maxillofacial Surgeon based in Dhaka, Bangladesh. He focuses on compassionate, evidence-based surgical care for conditions of the mouth, jaws and face.",
      p2: "AOCMF Fellow in Oral & Maxillofacial–Head and Neck Oncology, Shanghai Ninth People's Hospital (2026). Seeking an international observership with Prof. Dr. Swennen at AZ Sint-Jan Brugge to gain structured exposure to 3D cephalometric analysis, digital workflow integration, and advanced orthognathic surgical protocols — skills that are critically needed to develop a sustainable orthognathic programme in Bangladesh.",
      points: [
        "Patient-centered, ethical decision making",
        "Modern, evidence-based surgical techniques",
        "Focus on function, aesthetics and quality of life",
      ],
      note: "",
    },
  },
  spec: {
    label: "Specializations",
    heading: "Expert Care for Complex Conditions",
    sub: "Advanced surgical solutions for better function, form and quality of life.",
    viewDetails: "View details",
    // covers: "What it covers",
    // scopeNote: "Scope overview — placeholder content",
    cards: [
      {
        title: "Maxillofacial Surgery",
        desc: "Trauma, deformities, jaw surgery and reconstructive procedures.",
      },
      {
        title: "Oral Cancer Surgery",
        desc: "Diagnosis, surgical treatment and reconstruction.",
      },
      {
        title: "Dental Implants",
        desc: "Functional and aesthetic implant solutions.",
      },
      {
        title: "Facial Reconstruction",
        desc: "Restoring form and function after injury or surgery.",
      },
      {
        title: "Other Specialties",
        desc: "Cleft lip & palate, TMJ, oral and maxillofacial conditions.",
      },
    ],
    details: [
      {
        overview:
          "Maxillofacial surgery addresses injuries, deformities and conditions of the jaws, face and skull, with care planned around restoring function, appearance and comfort.",
        points: [
          "Facial trauma and fracture care",
          "Jaw correction (orthognathic) surgery",
          "Cyst and lesion management",
          "Reconstructive procedures",
        ],
      },
      {
        overview:
          "Oral cancer surgery focuses on early diagnosis, safe removal of disease and careful reconstruction to preserve speech, swallowing and appearance.",
        points: [
          "Oral cancer diagnosis and staging",
          "Tumor removal surgery",
          "Reconstruction and rehabilitation",
          "Long-term follow-up care",
        ],
      },
      {
        overview:
          "Dental implant surgery replaces missing teeth with titanium implants, restoring chewing function and natural aesthetics.",
        points: [
          "Single and multiple tooth replacement",
          "Implant-supported prosthetics",
          "Bone grafting when needed",
          "Aesthetic zone implants",
        ],
      },
      {
        overview:
          "Facial reconstruction restores form and function after injury, tumor surgery or congenital conditions, using modern reconstructive techniques.",
        points: [
          "Soft tissue and bone reconstruction",
          "Scar revision and refinement",
          "Post-trauma deformity correction",
          "Microvascular reconstructive options",
        ],
      },
      {
        overview:
          "A range of other Oral and Maxillofacial conditions are managed with the same patient-first approach.",
        points: [
          "Cleft lip & palate care",
          "Temporomandibular joint (TMJ) conditions",
          "Salivary gland disorders",
          "Oral infections and pain conditions",
        ],
      },
    ],
  },
  beforeAfter: {
    label: "Before & After",
    heading: "Surgical Transformations",
    sub: "Explore illustrative treatment goals and selected case comparisons. Individual results vary.",
    before: "Before",
    after: "After",
    drag: "Drag to compare",
    // note: "Individual treatment plans and outcomes vary.",
    seeMore: "See more surgeries",
    seeLess: "See fewer surgeries",
    cases: [
      {
        title: "Jaw Correction (Illustrative)",
        desc: "Illustration of a misaligned jaw before correction and the balanced, functional result surgery aims to achieve.",
      },
      {
        title: "Facial Profile Balance (Illustrative)",
        desc: "Illustration of chin and jaw imbalance before correction and the harmonious profile that treatment plans target.",
      },
      {
        title: "Facial Reconstruction (Demo)",
        desc: "A comparison illustrating facial reconstruction and fixation following complex facial injury.",
      },
      {
        title: "Facial Profile Surgery (Demo)",
        desc: "A profile comparison demonstrating changes associated with facial surgery.",
      },
    ],
  },
  gallery: {
    label: "Gallery",
    heading: "Visits, Workshops & Scholarships",
    sub: "Moments from hospital visits, hands-on training workshops and scholarship programs.",
    viewDetails: "View story",
    placeholderNote: "(placeholder content)",
    items: [
      {
        title: "Hospital Visit",
        meta: "Teaching Hospital, Dhaka (placeholder)",
        desc: "Observing multidisciplinary maxillofacial care workflows and patient pathways.",
        full: "Over the last few months, I watched countless surgeries, including complex reconstruction, orthognathic surgery, TMJ arthroscopy, VSP, patient-specific implants, microvascular surgery, and many emerging techniques and technologies at Ninth People’s Hospital, Shanghai. But looking back, the most important lessons I brought home were not techniques. One of my professors told me: “You are not here to gather skills. You are here to generate ideas.” That stayed with me. After more than a decade in surgery, my time in Shanghai made me rethink what it truly takes to become a surgeon. 1. Mentorship is irreplaceable. Surgery cannot be learned entirely from textbooks, YouTube, courses, or even fellowships. It is more like learning music from a great master. A mentor teaches what cannot always be written down: judgment, timing, tissue handling, discipline, and when to proceed or stop. I have been fortunate to learn from my mentor Associate Professor Dr. Abdullah Al Masud Sir  for more than 10 years, as well as from many other mentors. Shanghai made me appreciate the value of that mentorship even more. You do not simply visit a great center and suddenly “learn surgery.” You watch, assist, repeat, and gradually understand why a master performs the same step with the same meticulousness every day. Eventually, those lessons become part of your own surgical thinking. 2. There is no shortcut to surgical skill. Courses, technology, VSP, advanced instruments, and observing great surgeons can teach you a great deal—but nothing replaces repetition. What looks effortless in the hands of a master is often the result of performing the same fundamental steps thousands of times. Excellence is repetition refined over years. 3. Surgery demands sacrifice. I used to wonder whether I was sacrificing too much of my life and family time for surgery. Then I saw the extraordinary discipline and intensity with which surgeons in China work. If you genuinely want to master surgery, you must give a significant part of yourself to it—your time, concentration, energy, and years of your life. 4. Never let money become your reason for operating. A surgeon deserves fair compensation for years of training, responsibility, and work. But money should never become the indication for surgery. You operate because the patient needs it, because it is the right treatment, and because you have spent years mastering the craft required to perform it well. There is a unique satisfaction in practicing a craft you have spent years learning. The patient first. The craft second. Money should follow—never lead. 5. Find your inner “Chi.” Yes, like Kung Fu Panda. 😊 But I mean it. A surgeon needs inner calm. When you are at peace, you observe better. When you observe better, you understand better. And when you understand clearly, you execute better. Before controlling your hands, learn to control your mind. So yes, I returned from Shanghai having witnessed remarkable surgery and technology. But what I brought back was something more fundamental: Mentorship. Practice. Sacrifice. Inner calm. Purpose over money. Technology will change. Techniques will change. But these principles probably never will. — Dr. Tasrif Ahmed",
      },
      {
        title: "Surgical Workshop",
        meta: "Hands-on training program (placeholder)",
        desc: "Practical training in reconstructive techniques with visiting faculty.",
        full: "Participation in a hands-on surgical workshop focused on reconstructive techniques, including plate bending, flap planning and implant placement under the guidance of visiting faculty.",
      },
      {
        title: "Scholarship Program",
        meta: "Advanced training scholarship (placeholder)",
        desc: "Structured scholarship program with coursework and clinical observation.",
        full: "Selection into a structured scholarship program combining academic coursework, clinical observation and supervised practice in oral and maxillofacial surgery.",
      },
      {
        title: "Conference & Seminars",
        meta: "National & international forums (placeholder)",
        desc: "Academic sessions, case discussions and knowledge exchange.",
        full: "Attending national and international conferences and seminars, exchanging knowledge on oral cancer care, reconstruction and patient outcomes with peers and seniors.",
      },
    ],
  },
  appt: {
    label: "Book an Appointment",
    heading: "Schedule Your Consultation",
    body: "Please fill out the form and I will get back to you as soon as possible to confirm your appointment.",
    quick: "Quick response",
    privacy: "Patient privacy assured",
    name: "Full Name *",
    phone: "Phone Number *",
    email: "Email Address (optional)",
    date: "Preferred Date",
    reason: "Reason for Visit",
    reasons: [
      "Consultation",
      "Maxillofacial Surgery",
      "Oral Cancer Evaluation",
      "Dental Implants",
      "Other",
    ],
    submit: "Submit Request",
    success:
      "Thank you! Your request has been received. I will contact you soon to confirm your appointment.",
    urgent: "For urgent cases, please call directly.",
    hours: "Mon – Sat, 9:00 AM – 5:00 PM",
    hoursNote: "(Clinic Hours)",
    phoneValue: "+8801716-200358",
    emailValue: "dr.tasrif@gmail.com",
  },
  contact: {
    label: "Contact",
    heading: "Visit My Clinic",
    body: "Located in Dhaka, our clinic provides a comfortable, modern and safe environment for your treatment.",
    address: "Dhaka, Bangladesh",
    addressNote: "(196 Green Road, Dhaka, Bangladesh, 1205)",
    cardTitle: "Clinic Location",
    cardSub: "Dhaka, Bangladesh",
    viewMap: "View on Map",
    mapCity: "Dhaka",
  },
  footer: {
    copyright: "© 2026 Dr. Tasrif Ahmed. All rights reserved.",
    tagline: ["Precision", "Function", "Aesthetics."],
  },
  chat: {
    whatsapp: "Chat on WhatsApp",
    messenger: "Chat on Messenger",
  },
};

export type Dict = typeof en;

const bn: Dict = {
  brand: {
    name: "ডা. তাসরিফ আহমেদ",
    role: "ম্যাক্সিলোফেসিয়াল ও ওরাল ক্যান্সার সার্জন",
  },
  nav: [
    { id: "home", label: "হোম" },
    { id: "about", label: "পরিচিতি" },
    { id: "specializations", label: "বিশেষায়ন" },
    { id: "before-after", label: "আগে ও পরে" },
    { id: "gallery", label: "গ্যালারি" },
    { id: "appointment", label: "অ্যাপয়েন্টমেন্ট" },
    { id: "contact", label: "যোগাযোগ" },
  ],
  cta: "অ্যাপয়েন্টমেন্ট বুক করুন",
  close: "বন্ধ করুন",
  hero: {
    badge: "যাচাইকৃত বিশেষজ্ঞ",
    title: "ডা. তাসরিফ আহমেদ",
    role: "ম্যাক্সিলোফেসিয়াল ও ওরাল ক্যান্সার সার্জন",
    intro:
      "আপনার মুখ ও চোয়ালের স্বাস্থ্যের জন্য আন্তরিক সেবা, আধুনিক চিকিৎসা এবং উত্তম ফলাফল।",
    location: "ঢাকা, বাংলাদেশ",
    book: "অ্যাপয়েন্টমেন্ট বুক করুন",
    watch: "পরিচিতি ভিডিও দেখুন",
    scriptLine1: "সুস্থ হাসি",
    scriptLine2: "উজ্জ্বল জীবন",
    chips: ["রোগীকেন্দ্রিক সেবা", "যথার্থতা। কার্যকারিতা। নান্দনিকতা।"],
    scroll: "নিচে দেখুন",
  },
  about: {
    label: "আমার সম্পর্কে",
    heading: "উন্নত সেবা ও উত্তম ফলাফলের জন্য নিবেদিত",
    body: "আমি একজন ম্যাক্সিলোফেসিয়াল ও ওরাল ক্যান্সার সার্জন। আন্তরিক ও প্রমাণভিত্তিক সেবা প্রদানে আমি দৃঢ়ভাবে প্রতিশ্রুতিবদ্ধ। আমার লক্ষ্য রোগীদের উন্নত কার্যক্ষমতা, উন্নত সৌন্দর্য এবং উচ্চতর জীবনমান অর্জনে সহায়তা করা।",
    learnMore: "আরও জানুন",
    cards: [
      { title: "শিক্ষা", desc: "যোগ্যতা ও একাডেমিক পটভূমি (নমুনা তথ্য)" },
      { title: "অভিজ্ঞতা", desc: "পেশাগত অভিজ্ঞতা ও প্রশিক্ষণ (নমুনা তথ্য)" },
      { title: "পদ্ধতি", desc: "রোগীকেন্দ্রিক, নৈতিক ও আধুনিক চিকিৎসা পদ্ধতি" },
    ],
    overlay: ["বিজ্ঞান", "দক্ষতা", "সমবেদনা"],
    modal: {
      title: "ডা. তাসরিফ আহমেদ সম্পর্কে",
      p1: "ডা. তাসরিফ আহমেদ ঢাকা, বাংলাদেশ-ভিত্তিক একজন ম্যাক্সিলোফেসিয়াল ও ওরাল ক্যান্সার সার্জন। তিনি মুখ, চোয়াল ও মুখমণ্ডলের রোগে আন্তরিক ও প্রমাণভিত্তিক সার্জিকাল সেবায় কেন্দ্রীত।",
      p2: "তাঁর চিকিৎসায় যত্নশীল নির্ণয়, স্পষ্ট যোগাযোগ ও ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা গুরুত্ব পায়, যেন প্রতিটি রোগী নিজের চিকিৎসার বিকল্পগুলো বুঝতে পারেন এবং পুরো যত্নের সময় নিজেকে সহায়তা অনুভব করেন।",
      points: [
        "রোগীকেন্দ্রিক ও নৈতিক সিদ্ধান্ত",
        "আধুনিক, প্রমাণভিত্তিক সার্জিকাল পদ্ধতি",
        "কার্যক্ষমতা, সৌন্দর্য ও জীবনমানের প্রতি গুরুত্ব",
      ],
      note: "বিস্তারিত যোগ্যতা ও অভিজ্ঞতা শীঘ্রই যুক্ত হবে (নমুনা তথ্য)।",
    },
  },
  spec: {
    label: "বিশেষায়ন",
    heading: "জটিল রোগে বিশেষজ্ঞ সেবা",
    sub: "উন্নত কার্যক্ষমতা, গঠন ও জীবনমানের জন্য আধুনিক সার্জিকাল সমাধান।",
    viewDetails: "বিস্তারিত দেখুন",
    // covers: "যা অন্তর্ভুক্ত",
    // scopeNote: "পরিসর সারসংক্ষেপ — নমুনা তথ্য",
    cards: [
      {
        title: "ম্যাক্সিলোফেসিয়াল সার্জারি",
        desc: "আঘাত, বিকৃতি, চোয়ালের সার্জারি ও পুনর্গঠনমূলক প্রক্রিয়া।",
      },
      {
        title: "ওরাল ক্যান্সার সার্জারি",
        desc: "নির্ণয়, সার্জিকাল চিকিৎসা ও পুনর্গঠন।",
      },
      {
        title: "ডেন্টাল ইমপ্লান্ট",
        desc: "কার্যকর ও নান্দনিক ইমপ্লান্ট সমাধান।",
      },
      {
        title: "ফেসিয়াল রিকনস্ট্রাকশন",
        desc: "আঘাত বা সার্জারির পর গঠন ও কার্যক্ষমতা পুনরুদ্ধার।",
      },
      {
        title: "অন্যান্য বিশেষায়ন",
        desc: "ক্লেফট লিপ ও প্যালেট, TMJ, মুখ ও চোয়ালের বিভিন্ন রোগ।",
      },
    ],
    details: [
      {
        overview:
          "ম্যাক্সিলোফেসিয়াল সার্জারি চোয়াল, মুখ ও খুলির আঘাত, বিকৃতি ও রোগের চিকিৎসা করে; কার্যক্ষমতা, গঠন ও আরাম ফিরিয়ে আনাই লক্ষ্য।",
        points: [
          "মুখের আঘাত ও ফ্র্যাকচার চিকিৎসা",
          "চোয়াল সংশোধন (অর্থোগনাথিক) সার্জারি",
          "সিস্ট ও লেশন ব্যবস্থাপনা",
          "পুনর্গঠনমূলক প্রক্রিয়া",
        ],
      },
      {
        overview:
          "ওরাল ক্যান্সার সার্জারিতে দ্রুত নির্ণয়, রোগের নিরাপদ অপসরণ এবং বাক্‌স্বর, গিলন ও গঠন ঠিক রাখতে যত্নশীল পুনর্গঠন গুরুত্ব পায়।",
        points: [
          "ওরাল ক্যান্সার নির্ণয় ও স্টেজিং",
          "টিউমার অপসারণ সার্জারি",
          "পুনর্গঠন ও পুনর্বাসন",
          "দীর্ঘমেয়াদি ফলো-আপ সেবা",
        ],
      },
      {
        overview:
          "ডেন্টাল ইমপ্লান্ট সার্জারি টাইটানিয়াম ইমপ্লান্ট দিয়ে অনুপস্থিত দাঁত প্রতিস্থাপন করে চর্বণ ও নান্দনিকতা ফিরিয়ে আনে।",
        points: [
          "একক ও একাধিক দাঁত প্রতিস্থাপন",
          "ইমপ্লান্ট-সমর্থিত প্রস্থেটিক্স",
          "প্রয়োজনে বোন গ্রাফটিং",
          "সৌন্দর্য অঞ্চলের ইমপ্লান্ট",
        ],
      },
      {
        overview:
          "ফেসিয়াল রিকনস্ট্রাকশন আঘাত, টিউমার সার্জারি বা জন্মগত অবস্থার পর গঠন ও কার্যক্ষমতা পুনরুদ্ধার করে।",
        points: [
          "সফট টিস্যু ও অস্থি পুনর্গঠন",
          "দাগ সংশোধন ও উন্নয়ন",
          "আঘাত-পরবর্তী বিকৃতি সংশোধন",
          "মাইক্রোভাসকুলার পুনর্গঠন বিকল্প",
        ],
      },
      {
        overview:
          "অন্যান্য মুখ ও চোয়ালের রোগও একই রোগীকেন্দ্রিক পদ্ধতিতে চিকিৎসা করা হয়।",
        points: [
          "ক্লেফট লিপ ও প্যালেট সেবা",
          "টেম্পোরোম্যান্ডিবুলার জয়েন্ট (TMJ) রোগ",
          "লালাগ্রন্থির রোগ",
          "মুখের সংক্রমণ ও ব্যথার অবস্থা",
        ],
      },
    ],
  },
  beforeAfter: {
    label: "আগে ও পরে",
    heading: "সার্জিকাল রূপান্তর",
    sub: "চিকিৎসার লক্ষ্য বোঝাতে চিত্রায়ন ও নির্বাচিত কেস তুলনা দেখুন। প্রত্যেকের ফলাফল ভিন্ন হতে পারে।",
    before: "আগে",
    after: "পরে",
    drag: "তুলনা করতে টানুন",
    // note: "চিকিৎসা পরিকল্পনা ও ফলাফল ব্যক্তিভেদে ভিন্ন।",
    seeMore: "আরও সার্জারি দেখুন",
    seeLess: "কম সার্জারি দেখুন",
    cases: [
      {
        title: "চোয়াল সংশোধন (চিত্রায়ন)",
        desc: "সংশোধনের আগে বেমানান চোয়াল এবং সার্জারির কাঙ্ক্ষিত ভারসাম্যপূর্ণ ফলাফলের চিত্রায়ন।",
      },
      {
        title: "ফেসিয়াল প্রোফাইল ভারসাম্য (চিত্রায়ন)",
        desc: "সংশোধনের আগে থুতনি ও চোয়ালের অসামঞ্জস্য এবং চিকিৎসার কাঙ্ক্ষিত সুসংগত প্রোফাইলের চিত্রায়ন।",
      },
      {
        title: "মুখমণ্ডল পুনর্গঠন (নমুনা)",
        desc: "জটিল মুখমণ্ডলের আঘাতের পর পুনর্গঠন ও ফিক্সেশনের একটি তুলনামূলক চিত্র।",
      },
      {
        title: "ফেসিয়াল প্রোফাইল সার্জারি (নমুনা)",
        desc: "ফেসিয়াল সার্জারির সাথে সম্পর্কিত পরিবর্তন দেখানো একটি প্রোফাইল তুলনা।",
      },
    ],
  },
  gallery: {
    label: "গ্যালারি",
    heading: "পরিদর্শন, কর্মশালা ও স্কলারশিপ",
    sub: "হাসপাতাল পরিদর্শন, হাতে-কলমে প্রশিক্ষণ কর্মশালা ও স্কলারশিপ প্রোগ্রামের মুহূর্তগুলো।",
    viewDetails: "গল্প দেখুন",
    placeholderNote: "(নমুনা তথ্য)",
    items: [
      {
        title: "হাসপাতাল পরিদর্শন",
        meta: "টিচিং হাসপাতাল, ঢাকা (নমুনা)",
        desc: "মাল্টিডিসিপ্লিনারি ম্যাক্সিলোফেসিয়াল সেবা প্রবাহ ও রোগী পথ পর্যবেক্ষণ।",
        full: "ঢাকার একটি স্বনামধন্য টিচিং হাসপাতাল পরিদর্শন; কীভাবে মাল্টিডিসিপ্লিনারি টিম ম্যাক্সিলোফেসিয়াল সেবা পরিকল্পনা ও প্রদান করে — নির্ণয় ও সার্জিকাল পরিকল্পনা থেকে সুস্থতা ও ফলো-আপ পর্যন্ত — তা পর্যবেক্ষণ।",
      },
      {
        title: "সার্জিকাল কর্মশালা",
        meta: "হাতে-কলমে প্রশিক্ষণ কর্মশালা (নমুনা)",
        desc: "ভিজিটিং ফ্যাকাল্টির সাথে পুনর্গঠন কৌশলে ব্যবহারিক প্রশিক্ষণ।",
        full: "পুনর্গঠন কৌশল কেন্দ্রিক হাতে-কলমে সার্জিকাল কর্মশালায় অংশগ্রহণ; ভিজিটিং ফ্যাকাল্টির তত্ত্বাবধানে প্লেট বেন্ডিং, ফ্ল্যাপ পরিকল্পনা ও ইমপ্লান্ট স্থাপন অনুশীলন।",
      },
      {
        title: "স্কলারশিপ প্রোগ্রাম",
        meta: "উন্নত প্রশিক্ষণ স্কলারশিপ (নমুনা)",
        desc: "কোর্সওয়ার্ক ও ক্লিনিকাল পর্যবেক্ষণসহ কাঠামোবদ্ধ স্কলারশিপ প্রোগ্রাম।",
        full: "একাডেমিক কোর্সওয়ার্ক, ক্লিনিকাল পর্যবেক্ষণ ও তত্ত্বাবধানে অনুশীলন সমন্বিত কাঠামোবদ্ধ স্কলারশিপ প্রোগ্রামে অন্তর্ভুক্তি।",
      },
      {
        title: "সম্মেলন ও সেমিনার",
        meta: "জাতীয় ও আন্তর্জাতিক ফোরাম (নমুনা)",
        desc: "একাডেমিক অধিবেশন, কেস আলোচনা ও জ্ঞান বিনিময়।",
        full: "জাতীয় ও আন্তর্জাতিক সম্মেলন ও সেমিনারে অংশগ্রহণ; ওরাল ক্যান্সার সেবা, পুনর্গঠন ও রোগীর ফলাফল নিয়ে সহকর্মীদের সাথে জ্ঞান বিনিময়।",
      },
    ],
  },
  appt: {
    label: "অ্যাপয়েন্টমেন্ট বুক করুন",
    heading: "পরামর্শের সময় নির্ধারণ করুন",
    body: "ফর্মটি পূরণ করুন; আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করতে আমি যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।",
    quick: "দ্রুত সাড়া",
    privacy: "রোগীর গোপনীয়তার নিশ্চয়তা",
    name: "পূর্ণ নাম *",
    phone: "ফোন নম্বর *",
    email: "ইমেইল ঠিকানা (ঐচ্ছিক)",
    date: "পছন্দের তারিখ",
    reason: "আগমনের কারণ",
    reasons: [
      "পরামর্শ",
      "ম্যাক্সিলোফেসিয়াল সার্জারি",
      "ওরাল ক্যান্সার মূল্যায়ন",
      "ডেন্টাল ইমপ্লান্ট",
      "অন্যান্য",
    ],
    submit: "অনুরোধ পাঠান",
    success:
      "ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে। অ্যাপয়েন্টমেন্ট নিশ্চিত করতে আমি শীঘ্রই যোগাযোগ করব।",
    urgent: "জরুরি ক্ষেত্রে সরাসরি কল করুন।",
    hours: "সোম – শনি, সকাল ৯:০০ – বিকাল ৫:০০",
    hoursNote: "(ক্লিনিক সময়)",
    phoneValue: "+8801716-200358",
    emailValue: "dr.tasrif@gmail.com",
  },
  contact: {
    label: "যোগাযোগ",
    heading: "আমাদের ক্লিনিকে আসুন",
    body: "ঢাকায় অবস্থিত আমাদের ক্লিনিক আপনার চিকিৎসার জন্য আরামদায়ক, আধুনিক ও নিরাপদ পরিবেশ প্রদান করে।",
    address: "ঢাকা, বাংলাদেশ",
    addressNote: "(ক্লিনিক ঠিকানা নমুনা)",
    cardTitle: "ক্লিনিকের অবস্থান",
    cardSub: "ঢাকা, বাংলাদেশ",
    viewMap: "মানচিত্রে দেখুন",
    mapCity: "ঢাকা",
  },
  footer: {
    copyright: "© ২০২৫ ডা. তাসরিফ আহমেদ। সর্বস্বত্ব সংরক্ষিত।",
    tagline: ["উত্তম সেবা", "উজ্জ্বল হাসি", "উজ্জ্বল ভবিষ্যৎ"],
  },
  chat: {
    whatsapp: "হোয়াটসঅ্যাপে মেসেজ করুন",
    messenger: "মেসেঞ্জারে মেসেজ করুন",
  },
};

export type Lang = "en" | "bn";

const dicts: Record<Lang, Dict> = { en, bn };

export function getDefaultDictionary(language: Lang): Dict {
  return dicts[language];
}

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  getDictionary: (language: Lang) => Dict;
}>({
  lang: "en",
  setLang: () => {},
  t: en,
  getDictionary: () => en,
});

function mergeDictionary(
  dictionary: Dict,
  language: Lang,
  overrides: PublishedSectionOverrides,
): Dict {
  const merged = { ...dictionary };
  const sections = Object.entries(overrides) as [
    EditableSection,
    NonNullable<PublishedSectionOverrides[EditableSection]>,
  ][];

  for (const [section, values] of sections) {
    const baseSection =
      section === "base"
        ? { cta: merged.cta, close: merged.close }
        : merged[section];
    const updated = applySectionOverrides(baseSection, values[language]);

    if (section === "base" && updated && typeof updated === "object") {
      Object.assign(merged, updated);
    } else if (section !== "base") {
      Object.assign(merged, { [section]: updated });
    }
  }

  return merged;
}

export function LanguageProvider({
  children,
  initialOverrides = {},
}: {
  children: ReactNode;
  initialOverrides?: PublishedSectionOverrides;
}) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const getDictionary = (language: Lang) =>
    mergeDictionary(dicts[language], language, initialOverrides);
  const value = useMemo(
    () => ({ lang, setLang, t: getDictionary(lang), getDictionary }),
    [lang, initialOverrides],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
