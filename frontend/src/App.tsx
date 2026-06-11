import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { 
  Dna, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Smartphone, 
  ChevronRight, 
  Award, 
  Hourglass, 
  Users, 
  Lock, 
  ChevronDown, 
  ArrowRight,
  BookOpen,
  Share2,
  LineChart,
  Cpu,
  UserCheck,
  MapPin,
  Building,
  GraduationCap,
  DollarSign,
  Search,
  MessageSquare,
  Briefcase,
  Plus,
  Image as ImageIcon,
  Linkedin,
  Youtube
} from "lucide-react";
import { PROGRAMS, TESTIMONIALS, SEO_POSTS, BRAND_ASSETS, STATISTICS } from "./data";
// @ts-ignore
import logoImage from "./assets/images/brainx_logo_1780642057674.jpg";
import AetheriaAssistant from "./components/AetheriaAssistant";
import CinematicBackground from "./components/CinematicBackground";
import BrainHologram from "./components/BrainHologram";
import BiometricInteractiveDashboard from "./components/BiometricInteractiveDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";


const getProgramPrice = (id: string) => {
  if (id === "dmit") return "₹6,000 (Including Counselling)";
  if (id === "midbrain") return "₹15,000 (3 Months Course)";
  return null;
};

const INDIAN_STATES_AND_UTS = [
  "Andaman & Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

// Custom premium pulsing official BrainX Logo component
export function BrainXLogo({ 
  className = "w-8 h-8", 
  active = false, 
  onDoubleClick, 
  style 
}: { 
  className?: string; 
  active?: boolean; 
  onDoubleClick?: () => void; 
  style?: any; 
}) {
  return (
    <img 
      src={logoImage} 
      alt="BrainX India Logo" 
      referrerPolicy="no-referrer"
      className={`${className} object-contain transition-all duration-300 ${active ? "scale-105 duration-500 animate-pulse" : ""}`}
      onDoubleClick={onDoubleClick}
      style={style}
    />
  );
}

const EVENTS = [
  {
    id: 1,
    title: "Value Education: Preparing Kids for the Generative-AI Wave",
    type: "Zoom Webinar",
    dateDisplay: "May 28, 10:00 AM UTC",
    date: new Date("2026-05-28T10:00:00Z"),
    meta1Label: "Framework Model",
    meta1Value: "Multiple Intelligences",
    meta2Label: "Complimentary Scans",
    meta2Value: "Included (+1 Free coupon)",
    seatsLabel: "14 Seats Left",
    ctaLabel: "Acquire Seat",
    ctaProgram: "parenting",
    ctaLocation: "",
    typeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    borderColor: "from-indigo-505",
    titleHover: "group-hover:text-indigo-600"
  },
  {
    id: 2,
    title: "Biometric Ridge Analysis & Dual-Lobe Development Bootcamp",
    type: "Ravet Center, Pune",
    dateDisplay: "June 02, 05:00 PM IST",
    date: new Date("2026-06-02T17:00:00+05:30"),
    meta1Label: "Target Age Bracket",
    meta1Value: "Ages 4 - 15",
    meta2Label: "Entry",
    meta2Value: "Complimentary",
    seatsLabel: "Direct Offline Access",
    ctaLabel: "Reserve scanner Ticket",
    ctaProgram: "dmit",
    ctaLocation: "Pune (Ravet)",
    typeColor: "bg-emerald-50 text-emerald-800 border-emerald-100",
    borderColor: "from-emerald-500",
    titleHover: "group-hover:text-emerald-700"
  },
  {
    id: 3,
    title: "Centre Brain Ignition & Alpha-Wave Sensory Calibration",
    type: "Ravet HQ, Pune",
    dateDisplay: "June 07, 11:30 AM IST",
    date: new Date("2026-06-07T11:30:00+05:30"),
    meta1Label: "Program Paradigm",
    meta1Value: "Alpha Wave Flow",
    meta2Label: "Value Workbook",
    meta2Value: "Free Copy Included",
    seatsLabel: "National Event",
    ctaLabel: "Acquire Entry Pass",
    ctaProgram: "midbrain",
    ctaLocation: "Pune (Ravet)",
    typeColor: "bg-amber-100 text-amber-800 border-amber-200",
    borderColor: "from-amber-505",
    titleHover: "group-hover:text-amber-700"
  }
];

export default function App() {
  // Pre-loading boot sequence states
  const [systemBooting, setSystemBooting] = useState<boolean>(true);
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [bootStage, setBootStage] = useState<string>("SYSTEM BOOTING...");

  // Navigation: Multi-page router state
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "programs" | "partners" | "stories" | "resources" | "gallery" | "contact" | "admin">("home");

  // Admin and Dynamic Content States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem("admin_token") === "session_token_brainx_admin_secure_gate_9281";
  });
  const [dynamicEvents, setDynamicEvents] = useState<any[]>(() => {
    const saved = localStorage.getItem("brainx_events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((ev: any) => ({ ...ev, date: new Date(ev.date) }));
      } catch (e) {
        console.error("Failed to parse events from localStorage:", e);
      }
    }
    return EVENTS;
  });
  const [extraCaseFiles, setExtraCaseFiles] = useState<any[]>(() => {
    const saved = localStorage.getItem("brainx_cases");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse case files from localStorage:", e);
      }
    }
    return [];
  });
  const [footerClickCount, setFooterClickCount] = useState(0);
  
  // Programs internal tab selection
  const [selectedProgramId, setSelectedProgramId] = useState<string>("dmit");

  // Interactive Dopamine Toxicity Calculator States
  const [screenTime, setScreenTime] = useState<number>(5); // hours
  const [restlessness, setRestlessness] = useState<number>(6); // 1-10
  const [concentration, setConcentration] = useState<number>(3); // 1-10
  const [brainFatigue, setBrainFatigue] = useState<number>(0);

  // Seat Reservation Form
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingLocation, setBookingLocation] = useState<string>("Pune");
  const [bookingProgram, setBookingProgram] = useState<string>("dmit");
  const [bookingChildAge, setBookingChildAge] = useState<string>("8");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState<boolean>(false);
  const [bookingResponse, setBookingResponse] = useState<string | null>(null);

  // Franchise Inquiry Lead Form
  const [franchiseName, setFranchiseName] = useState<string>("");
  const [franchisePhone, setFranchisePhone] = useState<string>("");
  const [franchiseCity, setFranchiseCity] = useState<string>("");
  const [franchiseState, setFranchiseState] = useState<string>("Maharashtra");
  const [franchiseInvestment, setFranchiseInvestment] = useState<number>(300000); // INR
  const [franchiseResponse, setFranchiseResponse] = useState<string | null>(null);
  const [isFranchiseSubmitting, setIsFranchiseSubmitting] = useState<boolean>(false);

  // School Collaboration Pitch Form
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolContactPerson, setSchoolContactPerson] = useState<string>("");
  const [schoolPhone, setSchoolPhone] = useState<string>("");
  const [schoolCity, setSchoolCity] = useState<string>("Pune");
  const [schoolStudentStrength, setSchoolStudentStrength] = useState<string>("500-1000");
  const [schoolResponse, setSchoolResponse] = useState<string | null>(null);
  const [isSchoolSubmitting, setIsSchoolSubmitting] = useState<boolean>(false);

  // Dedicated Contact & Consultation Form (Google Apps Script Web App Integration)
  const [parentName, setParentName] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [targetProtocol, setTargetProtocol] = useState<string>("dmit");
  const [childAge, setChildAge] = useState<string>("8");
  const [preferredLocation, setPreferredLocation] = useState<string>("Pune (Ravet)");
  const [isConsultationSubmitting, setIsConsultationSubmitting] = useState<boolean>(false);
  const [consultationSuccess, setConsultationSuccess] = useState<string | null>(null);
  const [consultationError, setConsultationError] = useState<string | null>(null);

  // FAQ Expand Grid Key-Value state
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Search blogs keyword
  const [blogKeyword, setBlogKeyword] = useState<string>("");

  // WhatsApp helper
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [waMessage, setWaMessage] = useState<string>("Hello BrainX India, I want to book a complimentary diagnostic DMIT mapping session for my child.");

  // Set up boot simulator, favicon and page title
  useEffect(() => {
    // 1. Set official logo as favicon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logoImage;
    document.title = "BrainX India | Unwind the Genius";

    // 2. Loading animation progress updates
    const stages = [
      "SYNAPTIC CHANNELS: INITIALIZING",
      "BIOMETRIC MAPPING ENGINE: CONNECTED",
      "HOWARD GARDNER ALGORITHMS: GATHERING",
      "FAMILY VALUE REGISTRIES: SYNCED",
      "COGNITIVE SOVEREIGNTY SYSTEM: ONLINE"
    ];
    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      setBootProgress(Math.min(100, count));
      
      const stageIdx = Math.floor((count / 101) * stages.length);
      if (stages[stageIdx]) {
        setBootStage(stages[stageIdx]);
      }
      
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSystemBooting(false);
        }, 500);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Recalculately toxicity score on slider inputs
  useEffect(() => {
    // Score models pediatric neural sensory indicators
    const baseScore = Math.min(100, Math.round(((screenTime * 10) + (restlessness * 4.5) + ((10 - concentration) * 4.8))));
    setBrainFatigue(baseScore);
  }, [screenTime, restlessness, concentration]);

  // Submit Seat Reservation
  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;

    setIsBookingSubmitting(true);
    setTimeout(() => {
      setIsBookingSubmitting(false);
      setBookingResponse(`RESERVATION COMMITTED: Seat locked for Parent ${bookingName} at our center near ${bookingLocation}. Our diagnostics coordinator will reach you on ${bookingPhone} within 4 business hours to complete the biometric protocols.`);
      // Reset
      setBookingName("");
      setBookingPhone("");
    }, 1000);
  };

  // Submit Franchise Query
  const handleFranchiseSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!franchiseName || !franchisePhone || !franchiseCity) return;

    setIsFranchiseSubmitting(true);
    setTimeout(() => {
      setIsFranchiseSubmitting(false);
      setFranchiseResponse(`FRANCHISE ALLOCATION INITIALISED: Thank you for your interest in joining India's fastest-growing cognitive brain science franchise network. A franchise executive has registered your application for ${franchiseCity}, ${franchiseState} (Planned investment: ${franchiseInvestment % 100000 === 0 ? `₹${franchiseInvestment / 100000} Lakhs` : `₹${(franchiseInvestment / 100000).toFixed(1)} Lakhs`}) and will coordinate business disclosure documents on WhatsApp within 12 hours.`);
      setFranchiseName("");
      setFranchisePhone("");
      setFranchiseCity("");
    }, 1100);
  };

  const ADMIN_SECURE_PATH = import.meta.env.VITE_ADMIN_SECURE_PATH || "/admin-secure-portal-3957";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  // Ref to guard against pushState re-triggering effects
  const isUpdatingUrl = useRef(false);
  const hasMountedRef = useRef(false);

  // On mount: check if URL matches admin path and set state accordingly
  // Also listen for browser back/forward navigation
  useEffect(() => {
    const checkPathAndRoute = () => {
      if (isUpdatingUrl.current) return;
      const path = window.location.pathname;
      if (path === ADMIN_SECURE_PATH) {
        setCurrentPage((prev) => (prev !== "admin" ? "admin" : prev));
      }
    };

    // Initial path check on mount only
    checkPathAndRoute();

    window.addEventListener("popstate", checkPathAndRoute);
    return () => window.removeEventListener("popstate", checkPathAndRoute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synchronize browser URL bar when currentPage changes (one-way: state → URL)
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    
    isUpdatingUrl.current = true;
    
    if (currentPage === "admin") {
      if (window.location.pathname !== ADMIN_SECURE_PATH) {
        window.history.pushState(null, "", ADMIN_SECURE_PATH);
      }
    } else {
      if (window.location.pathname === ADMIN_SECURE_PATH) {
        window.history.pushState(null, "", "/");
      }
    }
    
    // Reset guard after microtask to avoid blocking popstate
    Promise.resolve().then(() => {
      isUpdatingUrl.current = false;
    });
  }, [currentPage, ADMIN_SECURE_PATH]);

  // Sync dynamicEvents to localStorage (skip initial mount)
  const eventsInitialized = useRef(false);
  useEffect(() => {
    if (!eventsInitialized.current) {
      eventsInitialized.current = true;
      return;
    }
    localStorage.setItem("brainx_events", JSON.stringify(dynamicEvents));
  }, [dynamicEvents]);

  // Sync extraCaseFiles to localStorage (skip initial mount)
  const casesInitialized = useRef(false);
  useEffect(() => {
    if (!casesInitialized.current) {
      casesInitialized.current = true;
      return;
    }
    localStorage.setItem("brainx_cases", JSON.stringify(extraCaseFiles));
  }, [extraCaseFiles]);


  // Submit School Tie-up
  const handleSchoolSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!schoolName || !schoolContactPerson || !schoolPhone) return;

    setIsSchoolSubmitting(true);
    setTimeout(() => {
      setIsSchoolSubmitting(false);
      setSchoolResponse(`SCHOOL SYNERGY RECORDED: A formal proposal from BrainX India has been prepared for ${schoolName}. Our educational counselor will contact ${schoolContactPerson} on ${schoolPhone} to select a date for conducting our complimentary parent seminars and intelligence mapping tests.`);
      setSchoolName("");
      setSchoolContactPerson("");
      setSchoolPhone("");
    }, 1100);
  };

  // Submit Contact & Consultation to Google Apps Script Web App
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!parentName || !whatsappNumber) {
      setConsultationError("Parent Name and WhatsApp Number are required.");
      return;
    }

    setIsConsultationSubmitting(true);
    setConsultationSuccess(null);
    setConsultationError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-to-sheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName,
          whatsappNumber,
          targetProtocol,
          childAge,
          preferredLocation,
          spreadsheetId: "1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c",
          spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/edit?usp=sharing",
        }),
      });

      if (response.ok) {
        setConsultationSuccess(`RESERVATION COMMITTED: Thank you ${parentName}! Your seat for target protocol "${targetProtocol.toUpperCase()}" at our center near "${preferredLocation}" has been successfully requested. Our diagnostics scheduling department has logged this request and will reach out to you on ${whatsappNumber} within 4 business hours to complete the biometric protocols.`);
        // Clear the form after successful submission
        setParentName("");
        setWhatsappNumber("");
        setTargetProtocol("dmit");
        setChildAge("8");
        setPreferredLocation("Pune (Ravet)");
      } else {
        setConsultationError("Submission failed. The server returned a status: " + response.status);
      }
    } catch (err: any) {
      console.error("Form submission error:", err);
      setConsultationError("An error occurred during form submission: " + (err.message || String(err)) + ". Please check your connection.");
    } finally {
      setIsConsultationSubmitting(false);
    }
  };

  const triggerWhatsAppRedirect = () => {
    const encodedText = encodeURIComponent(waMessage);
    window.open(`https://wa.me/918888004111?text=${encodedText}`, "_blank");
  };

  // Quick helper to scroll to top after tab transition
  const handlePageChange = (page: "home" | "about" | "programs" | "partners" | "stories" | "resources" | "gallery" | "contact" | "admin") => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Preloader boot sequence */}
      {systemBooting && (
        <div className="fixed inset-0 z-[100] bg-[#F8FAFC] flex flex-col items-center justify-center font-mono text-xs text-slate-500 p-6 select-none">
          <div className="max-w-md w-full space-y-8 text-center animate-fadeIn">
            {/* Spinning glowing brain logo */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-ping opacity-45"></div>
              <div className="absolute inset-0 rounded-full border border-indigo-500/20 blur-md animate-pulse"></div>
              <BrainXLogo className="w-24 h-24" active />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold text-slate-900 tracking-wide uppercase">BrainX India</h1>
              <p className="text-[10px] text-indigo-600 tracking-widest uppercase font-bold">Pediatric Brain Science Portal</p>
            </div>

            {/* Glowing Loading Bar */}
            <div className="space-y-3">
              <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300/30 relative">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-75"
                  style={{ width: `${bootProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>{bootStage}</span>
                <span>{bootProgress}%</span>
              </div>
            </div>

            {/* Telemetry metadata footer */}
            <div className="border-t border-slate-200 pt-4 text-[9px] text-slate-500 flex justify-between uppercase">
              <span>Biometric Node: Active</span>
              <span>Integrity: Synced</span>
            </div>
          </div>
        </div>
      )}

      {/* Premium Cinematic Background System - hide on admin */}
      {currentPage !== "admin" && <CinematicBackground />}

      {currentPage !== "admin" && (
      <div id="site-header" className="fixed top-0 left-0 right-0 z-[9999] w-full">
        {/* FIXED ADVISORY STRIP */}
        <div className="sticky top-0 z-[1000] bg-indigo-900 px-4 py-3 text-center text-[11px] font-mono tracking-wider text-indigo-100 uppercase flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          <span>National Level Organization: Bridging Howard Gardner Biometric Science & Family Values Across India.</span>
        </div>

        {/* TOP PREMIUM NAVIGATION BRAND HEADER */}
        <nav id="global-header-nav" className="sticky top-0 z-[999] bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 transition-all duration-300 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            
            {/* Organisation Brand Logo Area */}
            <button 
              type="button"
              onClick={() => handlePageChange("home")}
              className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200 p-0 overflow-hidden group-hover:border-indigo-550 transition-all duration-300 shadow-sm">
                <BrainXLogo className="w-12 h-12" active />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-display font-bold tracking-tight uppercase text-slate-800">Brain<span className="text-indigo-600 font-extrabold">X</span></span>
                  <span className="text-[10px] font-mono tracking-widest bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase font-bold">India</span>
                </div>
                <span className="block text-[8px] tracking-widest font-sans text-indigo-600 uppercase font-bold">UNWIND THE GENIUS</span>
              </div>
            </button>

            {/* Core Multi-page Nav Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono uppercase tracking-wider text-slate-600">
              <button 
                type="button" 
                onClick={() => handlePageChange("home")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "home" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Home
              </button>
              <button 
                type="button" 
                onClick={() => handlePageChange("about")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "about" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Origins
              </button>
              <button 
                type="button" 
                onClick={() => handlePageChange("programs")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "programs" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Academies
              </button>
              <button 
                type="button" 
                onClick={() => handlePageChange("partners")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "partners" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Partnerships
              </button>
              <button 
                type="button" 
                onClick={() => handlePageChange("stories")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "stories" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Impact
              </button>
              <button 
                type="button" 
                onClick={() => handlePageChange("resources")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "resources" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Resources & Q&A
              </button>
              <button 
                type="button" 
                onClick={() => handlePageChange("gallery")} 
                className={`py-1 hover:text-indigo-600 transition-all cursor-pointer ${currentPage === "gallery" ? "text-indigo-600 border-b-2 border-indigo-600 font-bold" : ""}`}
              >
                Gallery
              </button>
              {isAdminLoggedIn && (
                <button type="button" onClick={() => handlePageChange("admin" as any)} className={`py-1 hover:text-rose-600 transition-all cursor-pointer text-rose-500 font-bold ${currentPage === "admin" ? "border-b-2 border-rose-500" : ""}`}>
                  Admin
                </button>
              )}
            </div>

            {/* Quick Consultation Booking Call & Social Media Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a 
                href="https://www.linkedin.com/in/sanju-nair-s-brainx-b292b4b9?utm_content=profile&utm_medium=member_android&utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-500 hover:text-[#0a66c2] hover:bg-slate-100 rounded-lg transition-all duration-350 hover:scale-105 flex items-center justify-center cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="http://www.youtube.com/@brainxmasters4159?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-500 hover:text-[#ff0000] hover:bg-slate-100 rounded-lg transition-all duration-350 hover:scale-105 flex items-center justify-center cursor-pointer"
                title="BrainX Masters YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <button 
                type="button"
                onClick={() => handlePageChange("contact")}
                className="px-4 py-2.5 sm:px-5 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5 hover:scale-[1.01]"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Diagnostic Audits</span>
                <span className="sm:hidden">Audits</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
      )}

      {/* RENDER PAGES CONDITIONALLY */}
      <main id="main-content-zone" className={`relative z-30 ${currentPage === "admin" ? "pt-0" : "pt-[140px]"}`}>
        
        {/* PAGE 1: HOME PAGE */}
        {currentPage === "home" && (
          <div className="animate-fadeIn">
                       {/* HERO - PREMIUM SCIENTIFIC & EMOTIONAL ADVENTURE */}
            <header className="max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-16 md:pt-14 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              
              {/* Ambient dynamic radial backdrop layout */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-500/8 to-indigo-500/4 blur-[130px] pointer-events-none -z-10"></div>
              
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="space-y-4">
                   {/* Main Headline */}
                   <h1 className="text-4xl sm:text-6xl font-display font-black leading-[1.08] tracking-tight text-[#0f172a]">
                     Preparing Minds <br/>
                     for the{" "}
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-905">
                       AI Future.
                     </span>
                   </h1>

                   {/* Subtitle Body Description */}
                   <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl">
                     Traditional schools train youth for repetitive roles. We build robust <span className="text-[#0f172a] font-bold underline decoration-indigo-500 decoration-2 underline-offset-2">cognitive sovereignty</span>. Our systems protect child focus buffers, isolate biological learning traits, and align developmental paths with deep moral family values.
                   </p>
                 </div>

                 {/* Premium Howard Gardner Highlight Card */}
                 <div id="gardner-hero-panel" className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex gap-4 items-start">
                   <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shrink-0 shadow-md">
                     <Brain className="w-6 h-6 text-white" />
                   </div>
                   <div className="space-y-1">
                     <span className="text-[11px] font-mono tracking-wider uppercase text-indigo-700 block font-bold">Multiple Intelligence Diagnostics</span>
                     <p className="text-xs text-[#475569] leading-relaxed">
                       We analyze intrinsic fingerprint dermal ridge concentration to mathematically isolate each child's prime intelligence quadrants (IQ/EQ), aligning learning traits accurately.
                     </p>
                   </div>
                 </div>

                 {/* Responsive Action Buttons with subtle transitions */}
                 <div className="flex flex-col sm:flex-row gap-4 pt-2">
                   <button 
                     type="button" 
                     onClick={() => handlePageChange("contact")}
                     className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-550 hover:to-indigo-650 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase shadow-[0_6px_22px_rgba(99,102,241,0.22)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.35)] transition-all cursor-pointer text-center duration-300 select-none"
                   >
                     Claim Diagnostic Scan Slot
                   </button>
                   <button 
                     type="button"
                     onClick={() => {
                       const element = document.getElementById("dr-vance-ai");
                       element?.scrollIntoView({ behavior: "smooth" });
                     }}
                     className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-850 hover:text-indigo-600 text-center rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm duration-350"
                   >
                     <span>Consult Dr. Vance AI</span>
                     <ArrowRight className="w-4 h-4 text-indigo-600" />
                   </button>
                 </div>

                 {/* High-credibility active portraits deck */}
                 <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80 max-w-sm">
                   <div className="flex -space-x-2">
                     <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=120&auto=format&fit=crop" alt="Indian child learning" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
                     <img src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=120&auto=format&fit=crop" alt="Indian child smiling" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
                     <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=120&auto=format&fit=crop" alt="Parent in seminar" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
                   </div>
                   <p className="text-[10px] font-mono text-[#475569] uppercase tracking-wider font-semibold">
                     Empowered 45,000+ Students & Parents India-Wide
                   </p>
                 </div>
              </div>

              {/* HERO RIGHT: CINEMATIC IMAGERY LAYERED WITH CALCULATOR */}
              <div className="lg:col-span-6 space-y-6 relative z-10 col-span-1">
                
                {/* 1. Holographic Child Learning & Brain Scanner Visualization */}
                <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-md border border-slate-200/85 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col items-center">
                  
                  {/* Tech overlay scanner tags */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-indigo-50 border border-indigo-100/60 text-[9px] text-indigo-700 font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span>Biometric SCANNER INTERACTION</span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-50 border border-amber-100 text-[8px] text-amber-700 font-mono font-bold px-2 py-0.5 rounded uppercase font-bold">
                    <span>Node Active</span>
                  </div>

                  {/* Centered Hologram Screen */}
                  <div className="w-full flex flex-col items-center justify-center pt-8 pb-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="w-[280px] h-[260px] flex items-center justify-center relative">
                      <BrainHologram className="w-full h-full" />
                      
                      {/* Circular radar sweep decoration */}
                      <div className="absolute w-[200px] h-[200px] border border-dashed border-indigo-500/10 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "35s" }}></div>
                    </div>
                  </div>

                  {/* Scan diagnostics status line */}
                  <div className="w-full text-center border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                    <span>FRONTLOBE RESOLUTION: OPTIMAL</span>
                    <span className="text-emerald-600 font-bold">&bull; COMPLIANT SECURED</span>
                  </div>
                </div>

                {/* 2. Glassmorphic Assessment Scoring Checklist Card */}
                <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                  
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-indigo-750 font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3" />
                        Diagnostic Screen Calibration
                      </span>
                      <h3 className="text-lg font-display font-black text-[#0f172a] mt-0.5">Estimate Sensory Overstimulation</h3>
                      <p className="text-[11px] text-[#475569] font-sans">Slide controls to estimate baseline prefrontal neural fatigue.</p>
                    </div>
                  </div>

                  {/* Interactive Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-[#475569]">Smart Screen Exposure Time</span>
                        <span className="text-indigo-600 font-bold">{screenTime} Hours/Day</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="12" 
                        value={screenTime} 
                        onChange={(e) => setScreenTime(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-[#475569]">Tantrums Scale</span>
                          <span className="text-violet-600 font-bold">{restlessness}/10</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={restlessness} 
                          onChange={(e) => setRestlessness(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded accent-violet-600 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-[#475569]">Study Focus Span</span>
                          <span className="text-amber-600 font-bold">{concentration} Min</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={concentration} 
                          onChange={(e) => setConcentration(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded accent-amber-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Generated Readouts display panel */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#475569] uppercase tracking-wide font-semibold">Prefrontal Fatigue Index</span>
                      <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold shadow-sm ${
                        brainFatigue > 65 ? "bg-rose-50 text-rose-700 border border-rose-200" : 
                        brainFatigue > 40 ? "bg-amber-50 text-amber-700 border border-amber-205" : 
                        "bg-emerald-50 text-emerald-700 border border-emerald-250"
                      }`}>
                        {brainFatigue > 65 ? "Critical Fatigue Cycle" : 
                         brainFatigue > 40 ? "Synaptic Friction Detected" : 
                         "Normal Alpha Status"}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-display font-black text-slate-900">{brainFatigue}</span>
                      <span className="text-xs font-mono text-slate-500 uppercase">/ 100 Sensory Density Units</span>
                    </div>

                    {/* Visual gradient meter */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-indigo-600 transition-all duration-300"
                        style={{ width: `${brainFatigue}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center pt-1.5">
                    <button 
                      type="button"
                      onClick={() => handlePageChange("contact")}
                      className="text-xs font-mono font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider underline cursor-pointer select-none"
                    >
                      Retrieve Custom Attention Recovery Pathway &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </header>

             {/* ACHIEVEMENTS NUMERICS - DENSE HIGH-TRUST BOARD */}
             <section className="bg-slate-50/80 border-y border-slate-200/60 backdrop-blur-sm shadow-sm">
               <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center [&>div:first-child]:hidden">
                   
                   <div className="space-y-1">
                     
                     
                   </div>
 
                   <div className="space-y-1">
                     <div className="text-3xl font-display font-black text-indigo-600">{STATISTICS.schoolsCollaborations}</div>
                     <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">{STATISTICS.schoolLabel}</p>
                   </div>
 
                   <div className="space-y-1">
                     <div className="text-3xl font-display font-black text-indigo-600">{STATISTICS.dmitTests}</div>
                     <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">{STATISTICS.dmitTestsLabel}</p>
                   </div>
 
                   <div className="space-y-1">
                     <div className="text-3xl font-display font-black text-indigo-600">{STATISTICS.studentsTrained}</div>
                     <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">{STATISTICS.studentsLabel}</p>
                   </div>
 
                   <div className="col-span-2 sm:col-span-1 space-y-1">
                     <div className="text-3xl font-display font-black text-amber-655">{STATISTICS.teachersEmpowered}</div>
                     <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">{STATISTICS.teachersLabel}</p>
                   </div>
 
                   <div className="col-span-2 sm:col-span-1 space-y-1">
                     <div className="text-3xl font-display font-black text-amber-655">{STATISTICS.parentsGuided}</div>
                     <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">{STATISTICS.parentsLabel}</p>
                   </div>
 
                 </div>
               </div>
             </section>

            {/* HI vs AI MATRIX */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Uniqueness Frameworks</span>
                <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900">HI (Human Intelligence) vs. Machine AI</h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  Why traditional repetitive tuitions prepare children for immediate career obsolescence, and how the BrainX biometric framework secures cognitive sovereignty.
                </p>
              </div>

              {/* Spectacular Interactive Graphical Dashboard */}
              <div className="mb-12">
                <BiometricInteractiveDashboard />
              </div>

              {/* Side-by-Side Graphical Card Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Left Card: Underpowered Standard Learning */}
                <div className="p-6 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm space-y-4 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-red-655 font-bold bg-red-50 px-2.5 py-1 rounded">Rote Repetitive Schooling</span>
                    <h4 className="text-base font-bold text-slate-900">Basic Memorization Tuitions</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Trains children to operate like mechanical compilers, executing predetermined templates. As standard Generative AI tools (like Gemini/ChatGPT) perform mathematical arithmetic, basic code syntax, and standard essay writing at near-zero marginal cost, these skills face immediate professional depreciation.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    <span>High risk of future professional displacement</span>
                  </div>
                </div>

                {/* Right Card: BrainX Fortified Sovereignty */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-emerald-50/20 border border-indigo-150/60 shadow-md space-y-4 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-emerald-505"></div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-700 font-bold bg-indigo-50 px-2.5 py-1 rounded">BrainX Sovereignty Path</span>
                    <h4 className="text-base font-bold text-indigo-950 flex items-center gap-1.5">
                      <span>Dermal Biometrics & Values Integration</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed animate-pulse">
                      Isolates the biological brain profile of each child to optimize their intrinsic multiple intelligence. We bypass memorization by fostering critical spatial modeling, high auditory synesthesia, creative system engineering, and absolute family integrity. This builds cognitive shielding that can never be replicated by machine neural models.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-indigo-100 flex items-center gap-2 text-[11px] text-indigo-700 font-mono font-bold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    <span>Guarantees absolute neural cognitive sovereignty</span>
                  </div>
                </div>
              </div>
            </section>

            {/* DEDICATED CONCERNS SECTION - EMOTIONAL ANCHORS & RESTORATIONAL IMAGERY */}
            <section className="bg-slate-50/90 py-24 border-y border-slate-200/60 backdrop-blur-sm relative">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#d97706] font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">Modern Crisis Checkpoint</span>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900">Is Screen Dopamine Replacing Core Genius?</h2>
                  <p className="text-sm text-slate-600">
                    With highly gamified screen feeds engineered specifically to capture young minds, today's child generations face unprecedented attention hazards:
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* LEFT COLUMN: CRISIS VS RECOVERY STORYTELLING VISUALS */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="relative rounded-3xl overflow-hidden border border-rose-200 group shadow-sm bg-white">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=500&auto=format&fit=crop" 
                        alt="Child overstimulated by a screen in background" 
                        className="w-full h-48 object-cover opacity-80 group-hover:scale-105 transition-transform duration-550"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="text-[9px] font-mono bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-extrabold uppercase tracking-widest">&bull; THE THREAT</span>
                        <h4 className="text-sm font-bold text-white mt-1">Hyper-stimulating digital loops thin prefrontal lobes</h4>
                      </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden border border-emerald-200 group shadow-md bg-white">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop" 
                        alt="Indian mother supporting daughter study happily" 
                        className="w-full h-80 object-cover opacity-95 group-hover:scale-105 transition-transform duration-550"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-5 left-5 z-20">
                        <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded font-extrabold uppercase tracking-widest">&bull; THE BRAINX ANSWER</span>
                        <h4 className="text-base font-bold text-white mt-1">Centre Brain Ignition & Value-Based Focus Restore Real Genius</h4>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: 3 INTENSE SCIENTIFIC REASONS */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 space-y-4 transition-all shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center font-black font-mono text-rose-600 border border-rose-100 shadow-sm">01</div>
                        <h4 className="text-xl font-bold text-slate-800">Prefrontal Grey Matter Overstimulation</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-16">
                        High-frequency visual swiping triggers extreme dopamine release. This process resets kids' natural neurological thresholds, rendering traditional classrooms, basic toys, and long-term focus tasks dull.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 space-y-4 transition-all shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center font-black font-mono text-indigo-600 border border-indigo-100 shadow-sm">02</div>
                        <h4 className="text-xl font-bold text-slate-800">Standard Rote Coaching Obsolescence</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-16">
                        Outdated coaching networks continue to force-train children into formulaic memorization. Our clinical Multiple Intelligence mapping determines raw innate traits, preventing severe early student burnout.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 space-y-4 transition-all shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center font-black font-mono text-amber-600 border border-amber-100 shadow-sm">03</div>
                        <h4 className="text-xl font-bold text-slate-800">Declining Interpersonal Empathy</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-16">
                        As children sink into solitary smart feeds, dialogue within households breaks down. Our custom VALUES Syllabus integrates real character check-ins directly with parenting milestones.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>            {/* PROGRAMS OVERVIEW PREVIEW */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold">Scientific Academies</span>
                  <h3 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-2">Our Core Programs</h3>
                </div>
                <button 
                  type="button"
                  onClick={() => handlePageChange("programs")}
                  className="text-xs font-mono text-[#d97706] hover:text-amber-700 flex items-center gap-1.5 focus:outline-none cursor-pointer font-bold uppercase tracking-wider"
                >
                  <span>Explore Program Timelines</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROGRAMS.map((p, idx) => {
                  // Specific highly polished images for programs list
                  const pImages = [
                    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&fit=crop", // DMIT
                    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400&fit=crop", // Midbrain
                    "https://images.unsplash.com/photo-1607511354148-356c3ee7eb5a?q=80&w=400&fit=crop", // Parenting
                    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=400&fit=crop"  // Values
                  ];
                  return (
                    <div key={p.id} className="rounded-3xl border border-slate-200/80 bg-white hover:border-indigo-500/50 transition-all overflow-hidden flex flex-col justify-between group h-full shadow-sm hover:shadow-md">
                      <div>
                        {/* Beautiful program card representative header photo */}
                        <div className="relative h-40 overflow-hidden shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
                          <img 
                            src={pImages[idx] || pImages[0]} 
                            alt={p.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="p-5 space-y-2">
                          <span className="text-[9px] font-mono bg-indigo-55 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded font-extrabold uppercase">{p.ageBracket}</span>
                          <h4 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{p.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.shortDescription}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="pt-4 border-t border-slate-100 space-y-2">
                          {getProgramPrice(p.id) && (
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-slate-405 font-bold uppercase">FEES / INVESTMENT:</span>
                              <span className="font-black text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-xs">{getProgramPrice(p.id)}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">{p.duration}</span>
                            <button 
                              type="button"
                              onClick={() => {
                                setSelectedProgramId(p.id);
                                handlePageChange("programs");
                              }}
                              className="text-xs font-mono font-bold text-amber-600 hover:text-amber-700 cursor-pointer uppercase tracking-wider flex items-center gap-1"
                            >
                              <span>Protocol</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* NATIONAL LEVEL LIVE SEMINARS & WEBINARS CALENDAR */}
            <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#d97706] uppercase tracking-widest font-bold block bg-amber-50 border border-amber-100 px-3 py-1 rounded-full w-max">&bull; HIGH-CONVERSION EVENTS</span>
                    <h3 className="text-3xl md:text-5xl font-display font-medium text-slate-900">Interactive Seminars & Webinars</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Claim complimentary seats for our professional national workshops. Includes fingerprint DMIT evaluation vouchers.
                    </p>
                  </div>
                  <div className="text-xs font-mono bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-indigo-700 flex items-center gap-2 font-bold shadow-sm">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    <span>14 Virtual & Offline Events Active Nearby</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dynamicEvents.map((ev) => (
                    <div key={ev.id} className="p-6 rounded-3xl bg-white hover:bg-slate-50/50 border border-slate-200/80 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md">
                      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${ev.borderColor || "from-indigo-500"} to-transparent`}></div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className={`px-2 py-0.5 rounded border uppercase font-bold ${ev.typeColor || "bg-indigo-55 text-indigo-700 border-indigo-100"}`}>{ev.type}</span>
                          <span className="text-slate-500 font-bold font-mono">{ev.dateDisplay}</span>
                        </div>
                        <h4 className={`text-lg font-bold text-slate-800 ${ev.titleHover || "group-hover:text-indigo-600"} transition-colors`}>{ev.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {ev.summary || (ev.id === 1 ? "Learn exact home-detox protocols to stop electronic screens from cannibalizing prefrontal attention spans, centering core neuro-focus." : ev.id === 2 ? "An interactive live demonstration for parents and students to map Howard Gardner sensory modalities. Take a direct fingerprint baseline test live." : ev.id === 3 ? "Witness our certified blindfold reading practitioners demonstrate spatial vibration and color awareness, with clinical feedback." : "Special active session. Learn de-addiction techniques, parenting skills, value systems, and core brain coordination.")}
                        </p>
                        
                        {(ev.meta1Label || ev.meta2Label) && (
                          <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1 text-slate-755 text-[11px] font-mono">
                            {ev.meta1Label && (
                              <div className="flex justify-between">
                                <span>{ev.meta1Label}:</span>
                                <span className="text-indigo-700 font-bold">{ev.meta1Value}</span>
                              </div>
                            )}
                            {ev.meta2Label && (
                              <div className="flex justify-between">
                                <span>{ev.meta2Label}:</span>
                                <span className="text-emerald-755 text-xs font-bold">{ev.meta2Value}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">{ev.seatsLabel || "Seats Available"}</span>
                        <button 
                          type="button"
                          onClick={() => {
                            if (ev.ctaLocation) setBookingLocation(ev.ctaLocation);
                            if (ev.ctaProgram) setBookingProgram(ev.ctaProgram);
                            handlePageChange("contact");
                          }}
                          className="text-xs font-mono font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-1 uppercase"
                        >
                          <span>{ev.ctaLabel || "Reserve Ticket"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* LIVE PARENT AI CHAT INTERACTIVITY */}
            <section id="dr-vance-ai" className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-white/[0.04]">
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">AI parent assistant system</span>
                <h3 className="text-3xl font-display font-medium text-white">BrainX AI Advisory Assistant</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Directly consult our secure parenting Assistant model. Explore prefrontal cortex exercises, fingerprint ridge connections, and home screen contracts immediately.
                </p>
              </div>

              <AetheriaAssistant />
            </section>            {/* SEAT BOOKING & COMPLIMENTARY VOUCHERS REGISTRATION */}
            <section className="bg-slate-50/70 py-20 border-y border-slate-200/80 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">&bull; Secure Intake Screening</span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900">Secure a Free Parent Counseling Slot</h2>
                <div className="flex justify-center">
                  <div className="hidden mt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    Synced to Sheet: <a href="https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/edit?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:text-emerald-800 font-bold">1_sTHRM4k...</a>
                  </div>
                </div>
                <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                  We register exactly 15 counseling sweepstake interviews weekly nationwide. Gain a professional 30-minute developmental baseline review, analyze screen toxicity patterns, and claim diagnostic scans.
                </p>

                {bookingResponse ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs text-left max-w-2xl mx-auto space-y-3 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <h5 className="font-bold text-sm text-slate-905">Biometric Diagnostic Seat Provisionally Secured!</h5>
                    <p className="leading-relaxed">{bookingResponse}</p>
                    <button 
                      type="button" 
                      onClick={() => setBookingResponse(null)}
                      className="text-[11px] underline text-indigo-600 block mt-2 hover:no-underline font-bold"
                    >
                      Book another student profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Parent Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Anand Deshpande" 
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">WhatsApp Active Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="e.g. +91 98200 12345" 
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Nearest Center Location</label>
                      <select 
                        value={bookingLocation}
                        onChange={(e) => setBookingLocation(e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                      >
                        <option value="Pune (Ravet)">Pune (Ravet Franchise)</option>
                        <option value="Pune (Kothrud)">Pune (Kothrud Franchise)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Target Program Domain</label>
                      <select 
                        value={bookingProgram}
                        onChange={(e) => setBookingProgram(e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                      >
                        <option value="dmit">DMIT Biometric Mapping Scan</option>
                        <option value="midbrain">Centre Brain Ignition Cohort</option>
                        <option value="parenting">Modern-Day Parenting Challenges Workshop</option>
                        <option value="value">Importance of Value Education Course</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 pt-4">
                      <button 
                        type="submit"
                        disabled={isBookingSubmitting}
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase font-extrabold tracking-wider transition-all cursor-pointer shadow-sm hover:shadow"
                      >
                        {isBookingSubmitting ? "Locking Seat Reservation..." : "Acquire Complimentary Vouchers"}
                      </button>
                    </div>
                  </form>
                )}

                <div className="flex justify-center items-center gap-6 text-[10px] font-mono text-slate-500 uppercase">
                  <span>✔ 128-bit Pediatric Privacy</span>
                  <span>✔ No forced marketing calls</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: ABOUT US */}
        {currentPage === "about" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-20 animate-fadeIn">
            
            {/* Split Header Copy with Cinematic Classroom backdrop */}
            <div id="origins-header-cols" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max block">BrainX India Origins</span>
                <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight">Redesigning Intelligence & Ethics.</h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                  We believe that education must prioritize spatial, logical, musical, and intrapersonal intelligences alongside critical moral systems. Our goal is to align childhood developmental paths with scientific biology.
                </p>
                <p className="text-xs text-slate-605 leading-relaxed font-sans">
                  By equipping franchise partners and over 165 school networks with advanced biometrics, we completely remove the toxic classroom standard of force-memorization, substituting it with deep personal development.
                </p>
              </div>

              {/* High-fidelity visual showing classroom collaboration with student diversity */}
              <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-200 group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700&auto=format&fit=crop" 
                  alt="Inclusive Indian classroom group learning session" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-5 left-5 z-20">
                  <span className="text-[9px] font-mono bg-indigo-600/90 text-white px-2 py-1 rounded font-extrabold uppercase">&bull; NATIONAL PEDAGOGY LEVEL</span>
                  <h4 className="text-base font-bold text-white mt-1">Holistic Academic Integration across India</h4>
                </div>
              </div>
            </div>

            {/* Howard Gardner block in about */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/95 p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-505/5 rounded-full blur-3xl -z-10"></div>
              
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono text-indigo-600 block font-bold uppercase">&bull; Clinical Base Framework</span>
                <h3 className="text-3xl font-display font-black text-slate-900">Howard Gardner Multiple Intelligence Theory</h3>
                <p className="text-sm text-slate-705 leading-relaxed font-sans">
                  Traditional curriculum systems focus strictly on language recall and basic calculus, labeling children who do not fit this linear mold as 'slow' or 'inattentive'. Dr Howard Gardner's cognitive matrices changed the landscape by proving that brain capabilities exist across eight distinct channels. 
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  BrainX India utilizes biometrics to map how these eight pathways occur in each child's neocortex. By identifying and aligning with their biological strengths, we restore focus, build lasting confidence, and support families under our holistic developmental curriculum.
                </p>
              </div>

              {/* Overlay graphics behind intelligence checkboxes */}
              <div className="lg:col-span-6 relative rounded-2xl bg-slate-50 border border-slate-200/60 grid grid-cols-2 gap-3 p-5 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200')] bg-cover opacity-5 pointer-events-none"></div>
                {[
                  "Linguistic Lobe Focus",
                  "Musical Auditory Intake",
                  "Visual Spatial Memory",
                  "Bodily-Kinesthetic Speed",
                  "Interpersonal Empathy",
                  "Intrapersonal Agency",
                  "Logical-Mathematical Flow",
                  "Naturalistic Core Sense"
                ].map((val, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-center flex items-center justify-center min-h-[44px]">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-widest">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impressive Statistics Counters Section */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max">&bull; Our National Footprint</span>
                <h3 className="text-3xl font-display font-black text-slate-900 mt-2">Verified Structural Accomplishments</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [&>div:first-child]:hidden">
                
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md space-y-2">
                  <div className="text-4xl font-display font-black text-indigo-600"></div>
                  <h5 className="text-sm font-semibold text-slate-800 uppercase font-mono">Pan-India Franchise Centers</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    With an active presence across major Indian capitals, our diagnostic franchise centers provide biometric analysis and activate midbrain coherence.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md space-y-2">
                  <div className="text-4xl font-display font-black text-indigo-600">{STATISTICS.schoolsCollaborations}</div>
                  <h5 className="text-sm font-semibold text-slate-800 uppercase font-mono">Pune School Partnerships</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Over 160 modern school collaborations rely exclusively on BrainX assessments, student camps, and teacher empowerment protocols to future-proof their classrooms.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md space-y-2">
                  <div className="text-4xl font-display font-black text-indigo-600">{STATISTICS.dmitTests}</div>
                  <h5 className="text-sm font-semibold text-slate-800 uppercase font-mono">DMIT Scanning Dossiers</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Over 80,000 fingertip scans completed, mapping raw prefrontal intelligence densities and providing precise, scientific parenting strategies.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md space-y-2">
                  <div className="text-4xl font-display font-black text-indigo-600">{STATISTICS.studentsTrained}</div>
                  <h5 className="text-sm font-semibold text-slate-800 uppercase font-mono">Active Students Empowered</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    45,000+ girls and boys have successfully finished our weekend midbrain labs and bootcamps, regaining their visual focus and calm.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md space-y-2">
                  <div className="text-4xl font-display font-black text-indigo-600">{STATISTICS.teachersEmpowered}</div>
                  <h5 className="text-sm font-semibold text-slate-800 uppercase font-mono">Empowered Certified Educators</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    15,000 school teachers trained on early child focus behaviors, non-punitive spatial stimulation, and Multiple Intelligence tracking.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md space-y-2">
                  <div className="text-4xl font-display font-black text-[#d97706]">{STATISTICS.parentsGuided}</div>
                  <h5 className="text-sm font-semibold text-slate-800 uppercase font-mono">High-EQ Families Guided</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Over 300,000 parent profiles guided globally. We provide actionable, screen-free detox steps and scientific parenting rules.
                  </p>
                </div>

              </div>
            </div>

            {/* Base Core Philosophy & Board of Advisors Grid Layout with portraits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Values Card */}
              <div className="flex flex-col justify-between bg-white/95 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm group overflow-hidden relative min-h-[380px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=300')] bg-cover opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] bg-amber-50 border border-amber-100 px-3 py-1 rounded-full w-max block font-bold">VALUE ETHICS MATRIX</span>
                  <h3 className="text-2xl font-display font-black text-slate-900">Value-Based Scientific Approach</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    We reject the premise that young minds should be taught like mechanical computing engines. Our integrated syllabus trains children to combine exceptional logical quotient with strong values: integrity, deep appreciation for family, self-command, and national commitment.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 font-mono text-xs text-[#d97706] leading-relaxed shadow-sm font-bold">
                  "Morality anchors our biological prefrontal development. Building high IQ without ethical calibration leaves children highly vulnerable to algorithmic screens."
                </div>
              </div>

              {/* Why Choose BrainX India Card (Replacing Advisor Card) */}
              <div className="flex flex-col justify-between bg-white border border-slate-200 shadow-sm p-8 md:p-10 rounded-3xl group overflow-hidden relative min-h-[380px]">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-indigo-650 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max block font-bold">CORE PARADIGM</span>
                  <h3 className="text-2xl font-display font-black text-slate-900">Why Choose BrainX India</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                    {[
                      "Scientific Child Development Approach",
                      "DMIT Assessment & Counselling",
                      "Centre Brain Ignition Program",
                      "Modern-Day Parenting Challenges",
                      "Importance of Value Education in Today's World",
                      "Holistic Child Growth Framework",
                      "Personalized Guidance for Parents",
                      "Future-Ready Learning Development"
                    ].map((val, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 mt-1.5 bg-indigo-600 rounded-full shrink-0"></span>
                        <span className="font-sans leading-relaxed">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Science & Value Coordination</span>
                  <button 
                    type="button"
                    onClick={() => handlePageChange("contact")}
                    className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer flex items-center gap-1 uppercase"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PAGE 3: PROGRAMS Overview & Deep-dives */}
        {currentPage === "programs" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 animate-fadeIn">
            
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max block">BrainX India Academies</span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900">Our 4 Core Protocols.</h2>
              <p className="text-sm sm:text-base text-slate-705">
                Click down to explore biological metrics, stage-by-stage timelines, and customized parenting baselines.
              </p>
            </div>

            {/* Program Selection Bar */}
            <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
              {PROGRAMS.map((p) => {
                const isSelected = selectedProgramId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProgramId(p.id)}
                    className={`px-4 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-indigo-600 text-white shadow" 
                        : "bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>

            {/* Display selected program */}
            {PROGRAMS.map((p) => {
              if (p.id !== selectedProgramId) return null;
              return (
                <div key={p.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left details pane */}
                  <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-mono text-[#d97706] font-bold">{p.ageBracket} &bull; {p.duration}</span>
                        <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">{p.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded font-bold uppercase">
                        Dominance: {p.cognitiveDominance}
                      </span>
                    </div>

                    <p className="text-sm text-slate-750 leading-relaxed">{p.longDescription}</p>

                    {/* Scientific Base info */}
                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
                      <span className="text-[10px] font-mono text-indigo-700 font-bold block uppercase tracking-wide">&bull; Scientific & Biological Base</span>
                      <p className="text-xs text-slate-700 leading-relaxed">{p.scientificBasis}</p>
                    </div>

                    {/* Outcomes checklist */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Verifiable Behavioral Outcomes</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {p.benefits.map((ben, bIdx) => (
                          <div key={bIdx} className="flex gap-2.5 items-start text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-605 shrink-0 mt-0.5" />
                            <span>{ben}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stage Timeline */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-mono uppercase tracking-wider text-slate-505 font-bold">Execution Timeline Sequence</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {p.stages.map((stg, sIdx) => (
                          <div key={sIdx} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1">
                            <span className="text-[10px] font-mono text-[#d97706] font-bold block">Phase {sIdx+1}: {stg.title}</span>
                            <p className="text-xs text-slate-600 leading-relaxed">{stg.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right CTA Booking pane */}
                  <div className="lg:col-span-4 space-y-6">
                    <div id="quick-assessment" className="p-6 rounded-3xl bg-white border border-slate-200 shadow space-y-4">
                      <span className="text-[9px] font-mono text-indigo-700 uppercase tracking-widest font-extrabold block">&bull; PNE ASSESSMENT SEAT</span>
                      <h4 className="text-lg font-display font-black text-slate-900">Provisional Direct Screening</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Enroll your son or daughter into this protocol at our nearest BrainX India center. Fill parent details below to unlock screening vouchers:
                      </p>

                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          setBookingProgram(p.id);
                          handleBookingSubmit(e);
                        }}
                        className="space-y-3.5"
                      >
                        <input 
                          type="text" 
                          required 
                          placeholder="Parent Full Name" 
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                        <input 
                          type="tel" 
                          required 
                          placeholder="WhatsApp Phone Number" 
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                        <button 
                          type="submit"
                          disabled={isBookingSubmitting}
                          className="w-full py-2.5 bg-[#d97706] hover:bg-amber-700 text-white font-mono text-xs uppercase tracking-wide font-extrabold rounded-lg hover:shadow transition-all cursor-pointer"
                        >
                          Confirm Academy Seat
                        </button>
                      </form>

                      {bookingResponse && (
                        <div className="p-3 bg-emerald-50 border border-emerald-250 text-[11px] text-emerald-800 rounded font-mono leading-relaxed">
                          {bookingResponse}
                        </div>
                      )}
                    </div>

                    {getProgramPrice(p.id) && (
                      <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 shadow-sm space-y-2">
                        <span className="text-[9px] font-mono text-emerald-800 uppercase tracking-widest font-black block">&bull; APPROVED SCIENTIFIC MATRIX PRICING</span>
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-display font-black text-slate-900">
                            {p.id === "dmit" ? "₹6,000" : "₹15,000"}
                          </span>
                          <span className="text-xs text-slate-500 font-mono font-bold">
                            {p.id === "dmit" ? "(Including Comprehensive Counseling)" : "(3 Months Intensive Course)"}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                          All biometrics scanned, verified 34-page report delivery, and interactive counselor support channels at our Pune Ravet HQ.
                        </p>
                      </div>
                    )}

                    {/* Program Specific FAQ */}
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Frequently Answered Queries</span>
                      <div className="space-y-3 divide-y divide-slate-100">
                        {p.faqs.map((faq, fIdx) => (
                          <div key={fIdx} className="pt-2">
                            <span className="text-xs font-bold text-slate-800 block font-mono">Q. {faq.question}</span>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}
              {/* PAGE 4: PARTNERSHIPS - FRANCHISE & SCHOOL COLLABORATIONS */}
        {currentPage === "partners" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16 animate-fadeIn">
            
            {/* Header branding copy */}
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-indigo-605 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max block">Synergies & Franchises</span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900">Join the Intelligence Revolution.</h2>
              <p className="text-base sm:text-lg text-slate-650 leading-relaxed">
                Whether you are an aspiring entrepreneur seeking a high-return brain-science franchise, or an elite school administrator looking to secure your student population in Pune or pan-India, we have custom collaboration paths.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Column: FRANCHISE VOUCHERS & DETAILS */}
              <div id="franchise" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-mono text-indigo-600 font-bold block uppercase">&bull; Interactive Franchise Opportunity</span>
                  <h3 className="text-2xl font-display font-black text-slate-900 mt-1.5">Launch a BrainX Center</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    BrainX India is the most credible name in multiple intelligence diagnostics and clinical child focus. We provide our franchise centers with high-definition fingertip scanners, proprietary mapping algorithms, validated training programs, and extensive masterclass content.
                  </p>
                  <div className="hidden mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded w-max animate-fadeIn">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    Synced to Sheet: <a href="https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/edit?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:text-emerald-800 font-bold">1_sTHRM4k...</a>
                  </div>
                </div>

                {/* Franchise fast requirements parameters */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                    <span className="block text-xs font-mono text-slate-400">REQUIREMENT</span>
                    <p className="text-[11px] font-bold text-slate-800 mt-1">300-500 Sq Ft</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                    <span className="block text-xs font-mono text-slate-400">BREAKEVEN</span>
                    <p className="text-[11px] font-bold text-slate-800 mt-1">3-6 Months</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                    <span className="block text-xs font-mono text-slate-400">ROYALTY</span>
                    <p className="text-[11px] font-bold text-emerald-700 mt-1">0% Plan</p>
                  </div>
                </div>

                {franchiseResponse ? (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-805 rounded-xl leading-relaxed space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                    <p>{franchiseResponse}</p>
                    <button 
                      type="button" 
                      onClick={() => setFranchiseResponse(null)}
                      className="text-[10px] underline hover:no-underline font-bold"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFranchiseSubmit} className="space-y-4 pt-4 border-t border-slate-100 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Rajesh Kumar" 
                        value={franchiseName}
                        onChange={(e) => setFranchiseName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-805 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">Active Phone *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="e.g. 98450 12345" 
                          value={franchisePhone}
                          onChange={(e) => setFranchisePhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-805 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">Planned City *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Pune" 
                          value={franchiseCity}
                          onChange={(e) => setFranchiseCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-805 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">Expected State</label>
                        <select 
                          value={franchiseState}
                          onChange={(e) => setFranchiseState(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                        >
                          {INDIAN_STATES_AND_UTS.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-emerald-700 block font-bold">Investment Sliders</label>
                        <input 
                          type="range" 
                          min="300000" 
                          max="1500000" 
                          step="50000"
                          value={franchiseInvestment}
                          onChange={(e) => setFranchiseInvestment(parseInt(e.target.value))}
                          className="w-full accent-emerald-650 cursor-pointer text-xs"
                        />
                        <div className="font-mono text-[10px] text-emerald-700 text-right mt-1 font-bold">
                          Budget: {franchiseInvestment % 100000 === 0 ? `₹${franchiseInvestment / 100000} Lakhs` : `₹${(franchiseInvestment / 100000).toFixed(1)} Lakhs`}
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isFranchiseSubmitting}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 font-mono font-bold uppercase tracking-wide rounded-lg text-white transition-all cursor-pointer shadow-sm shadow-indigo-600/10"
                    >
                      {isFranchiseSubmitting ? "Locking franchise application..." : "Download Franchise Prospectus Package"}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: ELITE SCHOOL PORTAL DETAILS & COLLABORATIVE FORM */}
              <div id="school-collaboration" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-mono text-indigo-600 font-bold block uppercase">&bull; Elite School Tie-Ups (160+ In Pune)</span>
                  <h3 className="text-2xl font-display font-black text-slate-900 mt-1.5">Empower Students & Teachers</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    BrainX India is the standard child diagnostics provider for Pune and nationwide. We partner with primary educational institutions to administer Multiple Intelligence biometrics, host focus enhancement bootcamps on campus, and run certified teacher coordination seminars.
                  </p>
                  <div className="hidden mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded w-max animate-fadeIn">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    Synced to Sheet: <a href="https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/edit?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:text-emerald-800 font-bold">1_sTHRM4k...</a>
                  </div>
                </div>

                {/* Listing school benefits */}
                <div className="space-y-2.5">
                  <div className="flex gap-2 items-center text-xs text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complimentary Student Diagnostic Baseline testing camps annually.</span>
                  </div>
                  <div className="flex gap-2 items-center text-xs text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Access to BrainX Character Ledgers & Ethics Syllabi for all grades.</span>
                  </div>
                  <div className="flex gap-2 items-center text-xs text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exclusive parenting seminars on screen dopamine detox conducted free.</span>
                  </div>
                </div>

                {schoolResponse ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-805 rounded-xl leading-relaxed space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <p>{schoolResponse}</p>
                    <button 
                      type="button" 
                      onClick={() => setSchoolResponse(null)}
                      className="text-[10px] underline hover:no-underline font-bold"
                    >
                      Submit another school inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSchoolSubmit} className="space-y-4 pt-4 border-t border-slate-100 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">School Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Pune Academic International School" 
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-805 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">Contact Coordinator *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Sister Maria D'souza" 
                          value={schoolContactPerson}
                          onChange={(e) => setSchoolContactPerson(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-855 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">Coordinator Phone *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="e.g. 98230 45678" 
                          value={schoolPhone}
                          onChange={(e) => setSchoolPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-855 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">City Location</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Pune" 
                          value={schoolCity}
                          onChange={(e) => setSchoolCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-855 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-505 block font-bold">Student Strength</label>
                        <select 
                          value={schoolStudentStrength}
                          onChange={(e) => setSchoolStudentStrength(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                        >
                          <option value="Under 500">Under 500 Students</option>
                          <option value="500-1000">500 - 1000 Students</option>
                          <option value="1000-2500">1000 - 2500 Students</option>
                          <option value="Above 2500">Above 2500 Students</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSchoolSubmitting}
                      className="w-full py-3 bg-[#10b981] hover:bg-emerald-600 font-mono font-bold uppercase tracking-wide rounded-lg text-white transition-all cursor-pointer shadow-sm shadow-emerald-500/10"
                    >
                      {isSchoolSubmitting ? "Submitting Request..." : "Request Cognitive Partnership Call"}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        )}

        {/* PAGE 5: SUCCESS STORIES */}
        {currentPage === "stories" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16 animate-fadeIn">
            
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max">Clinical Evidence Validation</span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900">Transformed Childhoods.</h2>
              <p className="text-base sm:text-lg text-slate-650 leading-relaxed">
                Review case profile progressions from active screen reliance to peak intellectual and moral focus, recorded across Pune and our pan-India network:
              </p>
            </div>

            {/* Testimonials loop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                  
                  <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Case File #{t.id}
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#d97706] font-bold uppercase">{t.programTaken}</span>
                    <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"{t.storyHeading}"</h4>
                    <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"{t.storyText}"</p>
                    
                    {/* Observed metrics lists */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                      <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                      <div className="space-y-1.5">
                        {t.resultsObserved.map((res, rIdx) => (
                          <div key={rIdx} className="flex gap-2 items-center text-xs text-slate-705">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">{t.parentName}</span>
                      <span className="text-slate-400 text-[10px] font-mono uppercase">{t.parentProfession}</span>
                    </div>
                    <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                      Profile: {t.childProfile}
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {/* Extended 8 Case Chronicles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case #3 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #3</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">DMIT Mapping + Modern-Day Parenting Seminar</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"From gaming addiction to national-level chess champion in 6 months."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"Our son Arjun spent 9 hours daily on gaming. Teachers warned us about severe attention deficits. The DMIT report revealed a dominant logical-mathematical intelligence that was completely suppressed. After BrainX redirected his brain energy toward strategic spatial games and chess, his performance became extraordinary. He stopped gaming entirely on his own — no force required."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>District-level chess championship winner within 5 months</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Self-regulated daily screen time reduced to under 45 minutes</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Improved family communication and emotional patience at home</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Mr. &amp; Mrs. Kulkarni</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Software Engineer &amp; School Vice Principal (Pune)</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Arjun, Age 11 (Gaming Addiction, Attention Deficit)
                  </span>
                </div>
              </div>

              {/* Case #4 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #4</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">Centre Brain Ignition + Value Education Bootcamp</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"My introverted daughter found her voice — and a stage."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"Priya refused to speak in class and cried before every exam. Her musical intelligence was extremely high but completely unrecognized by her school system. After the Centre Brain activation program, something shifted in her neurological confidence. She now leads her school choir and recently represented our state in a national cultural festival."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>State-level cultural performance representation achieved</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Complete elimination of pre-exam anxiety episodes</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Voluntary leadership of 24-member school choir group</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Mrs. Sunita Iyer</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Senior Bank Manager (Mumbai)</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Priya, Age 14 (Severe Stage Fright, Low Social Confidence)
                  </span>
                </div>
              </div>

              {/* Case #5 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #5</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">DMIT Mapping + Centre Brain Ignition</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"Diagnosed as slow learner — now top of his class in design thinking."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"Three different tutors told us Rohan had a learning disability. His DMIT scan revealed an extraordinarily high visual-spatial intelligence — not a deficit. His brain was simply misaligned with text-heavy teaching. After BrainX restructured his learning pathway, he independently built a working model of solar-powered irrigation for his school science exhibition and won first prize."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>National Science Exhibition 1st prize — independently completed project</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Reading comprehension improved by 3 grade levels in 4 months</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Renewed family trust and parent-child communication harmony restored</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Mr. Ashok &amp; Mrs. Meera Patil</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Civil Engineer &amp; Homemaker (Nashik)</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Rohan, Age 10 (Misdiagnosed Learning Difficulty)
                  </span>
                </div>
              </div>

              {/* Case #6 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #6</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">Value Education Bootcamp + Parenting Seminar</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"Our teenager stopped lying and hiding — and started leading family prayers."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"We were losing our son to Instagram reels and peer pressure. He became secretive, disrespectful, and academically disengaged. The BrainX Values Syllabus worked on his interpersonal EQ directly. Within weeks, he voluntarily began spending evenings helping his grandmother and started leading our family's evening prayers. We got our son back."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Zero mobile usage after 9PM — self-enforced without parental conflict</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Voluntary community service in local temple every Sunday</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>School teacher reported marked improvement in classroom integrity and honesty</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Mr. Vikram &amp; Mrs. Lata Joshi</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Chartered Accountant &amp; Yoga Instructor (Pune)</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Nikhil, Age 16 (Peer Pressure, Digital Dependency)
                  </span>
                </div>
              </div>

              {/* Case #7 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #7</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">DMIT Mapping + Centre Brain Ignition</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"Our 6-year-old now reads blindfolded and remembers everything she hears."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"Kavya, age 6, showed immense curiosity but was easily distracted by TV. We did a fingertip DMIT mapping to understand her sensory hierarchy and followed with Centre Brain Ignition focus training. The sound frequency coherence stimulated her spatial awareness. Today, Kavya can identify colors and cards completely blindfolded with astounding focus."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>94% blindfold color accuracy</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Reads 2 books/week independently</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Zero screen dependency</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Dr. Nitin &amp; Mrs. Swapna Rane</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Pediatrician &amp; Child Psychologist</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Kavya, Age 6 (Pune)
                  </span>
                </div>
              </div>

              {/* Case #8 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #8</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">Modern-Day Parenting Seminar + Value Education</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"We were arguing daily. BrainX gave us a family language we all understood."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans font-medium">"With two kids (Aryan, 12 and Mia, 8), our Pune home was a zone of constant digital bickering and screen defense. The Parenting Seminar showed us empirical dopamine models, while the kids did the Value Education course. Together, we established screen-free contracts. Building intrinsic motivation saved our family dynamics."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Daily family dinner restored</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Screen time reduced from 8hrs to 90min</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Elder child completed 30-day gratitude journal</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Mr. &amp; Mrs. Kapoor</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Business Owner &amp; HR Director</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Aryan (12) &amp; Mia (8) (Pune)
                  </span>
                </div>
              </div>

              {/* Case #9 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #9</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">DMIT Mapping + Value Education Bootcamp</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"A borderline student discovered entrepreneurial intelligence and launched a school canteen startup."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"Our 13-year-old son Sameer struggled with average rote-learning metrics, feeling uninspired. The DMIT assessment highlighted his high interpersonal, logical, and practical entrepreneurial intelligence quotients. Following the Value Education Bootcamp, he combined his ethics with business concepts, launching a green-tiffin delivery model at his school."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>School tiffin enterprise 60 daily orders</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Scores improved 45% to 72%</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Donates 10% earnings voluntarily</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Mrs. Fatima Shaikh</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">Nutritionist</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Sameer, Age 13 (Aurangabad)
                  </span>
                </div>
              </div>

              {/* Case #10 */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                <div className="absolute top-6 right-6 font-mono text-[9px] text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">Case File #10</div>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#d97706] font-bold uppercase">Centre Brain Ignition + DMIT Mapping</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"Our twins were identical — but their brains were completely different. BrainX helped us parent them individually."</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans">"Dev and Diya are identical twins, but raising them with the same parenting style led to massive sibling rivalry and friction. The DMIT mapping proved their neural pathways and learning styles were diametrically opposite. Adapting our parenting to fit their individual biology has completely resolved the competition and turned it into mutual support."</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Twin A state math olympiad qualifier</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Twin B school ecology award</span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-slate-705">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>Sibling rivalry fully resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Prof. &amp; Mrs. Venkataraman</span>
                    <span className="text-slate-400 text-[10px] font-mono uppercase">IIT Professionals &amp; Child Therapists</span>
                  </div>
                  <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-bold">
                    Profile: Twins Dev &amp; Diya, Age 9 (Bangalore)
                  </span>
                </div>
              </div>

              {extraCaseFiles.map((c) => (
                <div key={c.id} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all">
                  <div className="absolute top-6 right-6 font-mono text-[9px] text-[#b45309] uppercase tracking-widest bg-amber-50 border border-amber-200 px-2.5 py-1 rounded font-bold">
                    Case File #{c.caseNumber}
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#d97706] font-bold uppercase">{c.programName}</span>
                    <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">"{c.headline}"</h4>
                    <p className="text-xs text-slate-605 leading-relaxed italic font-sans">"{c.storyText}"</p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                      <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold">Observed Focus & Morality Markers</span>
                      <div className="space-y-1.5">
                        {[c.bullet1, c.bullet2, c.bullet3].filter(Boolean).map((b, i) => (
                          <div key={i} className="flex gap-2 items-center text-xs text-slate-705">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
                    <div>
                      <span className="font-bold text-slate-800 block">{c.parentName}</span>
                      <span className="text-slate-400 text-[10px] font-mono uppercase">{c.parentProfession}</span>
                    </div>
                    <span className="font-mono text-indigo-700 uppercase text-[10px] bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded font-bold">
                      Profile: {c.childProfile}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* National Survey quotes placeholder block */}
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
              <span className="text-xs font-mono text-indigo-700 block font-bold">&bull; 2026 PARENT SURVEY OVERVIEW</span>
              <p className="text-xs text-slate-705 leading-relaxed font-sans font-medium italic">
                "94.2% of surveyed Indian families reported immediate de-escalation of electronic screen dependency inside 4 weeks of incorporating our whole-brain sensory activation protocols."
              </p>
            </div>

          </div>
        )}

        {/* PAGE 6: RESOURCES, BLOG, FAQ */}
        {currentPage === "resources" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 animate-fadeIn">
            
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max">Blogs & Publications Hub</span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900">Knowledge for AI-Era Parents.</h2>
              <p className="text-sm text-slate-705">
                Explore developmental science, screens detox research, and customized Multiple Intelligence strategies.
              </p>
            </div>

            {/* Quick search input */}
            <div className="flex gap-2 max-w-md bg-white p-2.5 rounded-xl border border-slate-205 shadow-sm items-center">
              <Search className="w-4 h-4 text-slate-405 ml-2" />
              <input 
                type="text" 
                placeholder="Search parenting symptoms (e.g. ADD, screen, talent)..." 
                value={blogKeyword}
                onChange={(e) => setBlogKeyword(e.target.value)}
                className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none flex-1 py-1 cursor-text"
              />
              {blogKeyword && (
                <button 
                  type="button" 
                  onClick={() => setBlogKeyword("")}
                  className="text-[10px] font-mono text-slate-500 hover:text-indigo-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Blogs list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SEO_POSTS.filter(post => 
                post.title.toLowerCase().includes(blogKeyword.toLowerCase()) || 
                post.category.toLowerCase().includes(blogKeyword.toLowerCase()) ||
                post.keywords.some(k => k.toLowerCase().includes(blogKeyword.toLowerCase()))
              ).map((post) => (
                <div key={post.id} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow transition-all space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">{post.category}</span>
                    <span className="text-slate-500 font-bold">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-900">
                    {post.title}
                  </h3>

                  <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-200/60 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Parent PainPoint Address</span>
                    <p className="text-slate-700 font-mono font-medium">{post.parentPainPoint}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-[#d97706] block font-bold">Featured Article Highlights</span>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {post.outline.map((line, idx) => (
                        <p key={idx} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                          <span>{line}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.keywords.slice(0,2).map((kVal, kIdx) => (
                        <span key={kIdx} className="text-[8px] font-mono bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold border border-slate-200/50">
                          #{kVal}
                        </span>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handlePageChange("contact")}
                      className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition-all"
                    >
                      Retrieve Scans &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SEPARATE SEMINAR WEBINAR ANNOUNCEMENT BANNER */}
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-indigo-50 via-white to-sky-50 border border-indigo-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="text-xs font-mono text-[#d97706] block uppercase font-bold">&bull; Upcoming Virtual Masterclass</span>
                <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">The 'AI-Ready Child' Parenting Webinar</h4>
                <p className="text-xs text-slate-655 leading-relaxed font-sans font-medium">
                  Explore how conversational AI solves mock high-school tests in 1.4 seconds, showcasing why memorization-based learning is highly vulnerable in the AI era. Registration includes complimentary DMIT biometrics coupons.
                </p>
              </div>

              <div className="md:col-span-4 text-center md:text-right">
                <button 
                  type="button" 
                  onClick={() => handlePageChange("contact")}
                  className="px-6 py-3 bg-[#d97706] hover:bg-amber-700 text-white font-mono font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer inline-block shadow-sm"
                >
                  Reserve Webinar Entry Slot
                </button>
              </div>
            </div>

          </div>
        )}

        {/* PAGE 7: CLINICAL ACTIVITY GALLERY */}
        {currentPage === "gallery" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 animate-fadeIn">
            
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max">Interactive Activity Logs</span>
              <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 font-extrabold">Life Inside BrainX India.</h2>
              <p className="text-base sm:text-lg text-slate-705 leading-relaxed">
                Explore real interactive illustrations of our diagnostic sessions, multiple intelligence scans, parent de-escalation seminars, and certified student bootcamps conducted across Pune and pan-India franchise corridors:
              </p>
            </div>

            {/* High-fidelity Photo Gallery Grid with Double Gender Representation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Item 1 */}
              <div className="bg-white border border-slate-205 rounded-3xl overflow-hidden group hover:border-indigo-500/25 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full">
                <div className="aspect-[4/3] overflow-hidden relative shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=500&auto=format&fit=crop" 
                    alt="Biometric Ridge Scanner" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-mono font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                    Pune Central Lab
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-[#d97706] uppercase tracking-widest block font-bold">Biometric Diagnostic Scan</span>
                  <h5 className="text-base font-black text-slate-900 mt-1">Lobe Density Ridge Scanning</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    A clinical diagnostic specialist guides a young girl and her mother as they undergo high-resolution fingertip ridge scanning to construct her 34-page neurological dossier.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white border border-slate-205 rounded-3xl overflow-hidden group hover:border-indigo-500/25 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full">
                <div className="aspect-[4/3] overflow-hidden relative shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=500&auto=format&fit=crop" 
                    alt="Focused sensory activities" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-mono font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                    Ravet Academy
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-indigo-650 uppercase tracking-widest block font-bold">Weekend Activation Labs</span>
                  <h5 className="text-base font-black text-slate-900 mt-1">Centre Brain Ignition Cohort</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    A small class of boys and girls engaged inside our light-controlled sensory spaces, wearing comfortable blindfolds to practice non-visual spatial color and tracking games.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white border border-slate-205 rounded-3xl overflow-hidden group hover:border-indigo-500/25 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full">
                <div className="aspect-[4/3] overflow-hidden relative shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format&fit=crop" 
                    alt="Parent seminar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-mono font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                    Auditorium Live
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest block font-bold">Pune Campus Programs</span>
                  <h5 className="text-base font-black text-slate-900 mt-1">Elite School Counseling</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    Our certified instructors delivering a structured parent-education masterclass on screen detox to a full auditorium of school teachers and parents in Pune.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-white border border-slate-205 rounded-3xl overflow-hidden group hover:border-indigo-500/25 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full">
                <div className="aspect-[4/3] overflow-hidden relative shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop" 
                    alt="School student camp" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-mono font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                    Diagnostic camp
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest block font-bold">Cooperative Campuses</span>
                  <h5 className="text-base font-black text-slate-900 mt-1">Student Focus Bootcamps</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    Girls and boys sitting side-by-side studying with their teacher, practicing 90-second non-visual alpha focus rhythms to clear digital fatigue.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="bg-white border border-slate-205 rounded-3xl overflow-hidden group hover:border-indigo-500/25 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full">
                <div className="aspect-[4/3] overflow-hidden relative shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=500&auto=format&fit=crop" 
                    alt="Teacher training" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-mono font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                    Syllabus Workshop
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-[#d97706] uppercase tracking-widest block font-bold">Pediatric Training</span>
                  <h5 className="text-base font-black text-slate-900 mt-1">Teacher Integration Seminars</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    Certified school educators learning to map classroom interactions and evaluate spatial tasks without resorting to formulaic coaching pressure.
                  </p>
                </div>
              </div>

              {/* Item 6 */}
              <div className="bg-white border border-slate-205 rounded-3xl overflow-hidden group hover:border-indigo-500/25 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full">
                <div className="aspect-[4/3] overflow-hidden relative shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500&auto=format&fit=crop" 
                    alt="Family diagnostic counseling" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-mono font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                    Clinical Space
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-sky-700 uppercase tracking-widest block font-bold">1-on-1 Guidance</span>
                  <h5 className="text-base font-black text-slate-900 mt-1">Direct Family Counseling</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    A quiet, warm visual representing pediatric specialists reviewing biological reports with parents and outlining realistic family values boundaries.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PAGE 8: CONTACT US & APPOINTMENTS */}
        {currentPage === "contact" && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16 animate-fadeIn">
            
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-max block">Reach Our Offices</span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900">Contact & Consultation.</h2>
              <p className="text-base sm:text-lg text-slate-705 leading-relaxed">
                Gain instant clarity. Fill parent details below to reserve your complimentary counseling session, or visit our support channels directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Intake schedule form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="text-xl font-display font-black text-slate-900">Diagnostic Screening Scheduler</h3>
                    <p className="text-xs text-slate-500">Lock your student's scanning slot. All details protected securely.</p>
                    <div className="hidden mt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                      Synced to Sheet: <a href="https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/edit?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:text-emerald-800 font-bold">1_sTHRM4k...</a>
                    </div>
                  </div>
                </div>

                {consultationSuccess ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 rounded-xl leading-relaxed space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <h5 className="text-sm font-bold text-emerald-900">Screening Program Seat Reserved!</h5>
                    <p>{consultationSuccess}</p>
                    <button 
                      type="button" 
                      onClick={() => setConsultationSuccess(null)}
                      className="text-[10px] underline hover:no-underline font-bold text-indigo-600 block mt-2"
                    >
                      Book another student profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitForm} className="space-y-4 text-xs font-sans">
                    {consultationError && (
                      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl leading-relaxed space-y-1 font-mono">
                        <h5 className="text-sm font-bold text-rose-900">Submission Error</h5>
                        <p>{consultationError}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Parent Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Anand Deshpande" 
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
 
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-550 block font-bold">WhatsApp Active Phone *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="e.g. +91 98230 11111" 
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>
 
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1 col-span-2">
                        <label className="text-[10px] font-mono uppercase text-slate-550 block font-bold">Target Academy Protocols</label>
                        <select 
                          value={targetProtocol}
                          onChange={(e) => setTargetProtocol(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                        >
                          <option value="dmit">DMIT Cognitive Biometrics Scanning</option>
                          <option value="midbrain">Centre Brain Ignition Weekend Labs</option>
                          <option value="parenting">Modern-Day Parenting Challenges Seminar</option>
                          <option value="value">Importance of Value Education in Today's World Course</option>
                        </select>
                      </div>
 
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-550 block font-bold">Child Age</label>
                        <input 
                          type="number" 
                          required 
                          min="2" 
                          max="18" 
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>
 
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-550 block font-bold">Preferred Scan Center Location</label>
                      <select 
                        value={preferredLocation}
                        onChange={(e) => setPreferredLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                      >
                        <option value="Pune (Ravet)">Pune (Ravet Franchise)</option>
                        <option value="Pune (Kothrud)">Pune (Kothrud Franchise)</option>
                      </select>
                    </div>
 
                    <button 
                      type="submit"
                      disabled={isConsultationSubmitting}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      {isConsultationSubmitting ? "Locking provisional slot..." : "Secure Seat & Issue Vouchers"}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Support & office locations details */}
              <div className="lg:col-span-5 space-y-6 text-xs text-slate-600 leading-relaxed font-mono">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-display font-black text-sm">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <span>Corporation Core Offices</span>
                  </div>
                  <p className="font-sans font-medium text-slate-705">
                    <strong>BrainX India HQ:</strong> <br />
                    E/1401, Runal Gateway, Ravet, Pune
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-display font-black text-sm">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <span>Official Support Coordinates</span>
                  </div>
                  <div className="font-sans font-medium text-slate-705 space-y-2 text-xs">
                    <p>
                      <strong>Address:</strong><br />
                      E/1401, Runal Gateway,<br />
                      Ravet, Pune
                    </p>
                    <p>
                      <strong>Mobile:</strong> <a href="tel:+918888004111" className="hover:text-indigo-650 underline font-mono font-bold">+91 88880 04111</a>
                    </p>
                    <p>
                      <strong>WhatsApp:</strong> <a href="https://wa.me/918888004111" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline font-mono font-bold">+91 88880 04111</a>
                    </p>
                    <p>
                      <strong>Email:</strong> <a href="mailto:brainx2010@gmail.com" className="hover:text-indigo-650 underline font-mono font-bold">brainx2010@gmail.com</a>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <a 
                      href="tel:+918888004111" 
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold uppercase text-[10px] tracking-wider rounded text-center transition-all cursor-pointer shadow-sm"
                    >
                      Call Now
                    </a>
                    <a 
                      href="https://wa.me/918888004111" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 py-2 bg-[#10b981] hover:bg-emerald-600 text-white font-mono font-bold uppercase text-[10px] tracking-wider rounded text-center transition-all cursor-pointer shadow-sm"
                    >
                      WhatsApp Us
                    </a>
                    <a 
                      href="mailto:brainx2010@gmail.com" 
                      className="flex-1 py-2 bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 font-mono font-bold uppercase text-[10px] tracking-wider rounded text-center transition-all cursor-pointer shadow-sm"
                    >
                      Email Us
                    </a>
                  </div>
                </div>

                <div id="quick-redirect-wa" className="p-6 rounded-3xl bg-emerald-50 border border-emerald-150 shadow-sm space-y-4 text-center">
                  <h5 className="font-display font-black text-emerald-950">Instant WhatsApp Callback</h5>
                  <p className="text-xs font-sans font-medium text-emerald-800">
                    Prefer direct coordinate dialogue with an expert? Tap below to send pre-compiled mapping inputs directly:
                  </p>
                  <button 
                    type="button"
                    onClick={triggerWhatsAppRedirect}
                    className="px-4 py-2.5 bg-[#10b981] hover:bg-emerald-650 text-white font-extrabold text-xs uppercase font-mono tracking-wide transition-all cursor-pointer inline-block shadow-sm"
                  >
                    Send Instant WhatsApp
                  </button>
                </div>

              </div>

            </div>

            {/* DENSE ACCORDION-STYLE FAQ ARRAY CONTAINER */}
            <div className="space-y-6 max-w-4xl mx-auto pt-6 border-t border-slate-200">
              <div className="text-center">
                <span className="text-xs font-mono text-indigo-600 uppercase tracking-wider font-bold">Still Unsure?</span>
                <h3 className="text-3xl font-display font-black text-slate-900 mt-1">Frequently Answered Queries</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "How reliable is Dermatoglyphics Multiple Intelligence Testing (DMIT)?",
                    answer: "DMIT is built on dense genetic and neurological associations. Epidermal ridges (fingerprints) develop from the identical prenatal ectoderm layout during gestation weeks 13-21 in sync with cerebral cortex myelinations. Clinical studies globally confirm fingerprint densities as reliable, unchanging baselines mapping cognitive distribution quotients."
                  },
                  {
                    question: "What makes the BrainX Value Syllabus different from typical moral lectures?",
                    answer: "Lectures fail because they demand obedience without intrinsic motivation. The integrated BrainX Ethics syllabus uses interactive perspective scenario play, Integrity Quotient indicators, and family appreciation checklists to build healthy intrinsic prefrontal cortex paths, directing their high intelligence toward ethical values."
                  },
                  {
                    question: "Is Centre Brain Ignition suitable for children with severe attention issues?",
                    answer: "Absolutely. When children are constantly exposed to high-frequency mobile screen feeds, they develop passive Beta-dominant brainwaves. Our harmless neuro-acoustic setups coordinate hemispheres to naturally slide kids into calm, highly retentive Alpha (8-12 Hz) learning states, protecting attention spans."
                  },
                  {
                    question: "How do we connect as franchise partners with BrainX India?",
                    answer: "As an active franchise network across India, our system has extensive infrastructure templates. Partners receive high-resolution scan units, proprietary analytical codes, certified developmental guides, and Pune-corporate web leads. Submit our Franchise Intake form above to register interest."
                  }
                ].map((faq, idx) => {
                  const isOpen = activeFaqIndex === idx;
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <button
                        type="button"
                        onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 font-sans">
                          Q. {faq.question}
                        </span>
                        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-90 text-indigo-600" : ""}`} />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-5 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-3 bg-indigo-50/30">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* PAGE 9: ADMIN CONTROL PANEL / LOGIN */}
        {currentPage === "admin" && (
          isAdminLoggedIn ? (
            <AdminPanel
              dynamicEvents={dynamicEvents}
              setDynamicEvents={setDynamicEvents}
              extraCaseFiles={extraCaseFiles}
              setExtraCaseFiles={setExtraCaseFiles}
              onLogout={() => {
                setIsAdminLoggedIn(false);
                sessionStorage.removeItem("admin_token");
                handlePageChange("home");
              }}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={(token) => {
                setIsAdminLoggedIn(true);
                sessionStorage.setItem("admin_token", token);
              }}
              onCancel={() => {
                handlePageChange("home");
              }}
            />
          )
        )}

      </main>

      {/* FLOATING WHATSAPP FLOATER TRIGGERS - hide on admin */}
      {currentPage !== "admin" && (
      <div className="fixed bottom-6 right-6 z-50">
        {isWhatsAppOpen ? (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-3 max-w-xs animate-slideUp text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-[10px] text-emerald-600 uppercase font-bold">&bull; Direct Biometric Scan Booking</span>
              <button 
                type="button" 
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                &times;
              </button>
            </div>
            <textarea 
              rows={3}
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none text-[11px] font-mono text-slate-800 cursor-text"
            />
            <button 
              type="button"
              onClick={triggerWhatsAppRedirect}
              className="w-full py-2 bg-[#10b981] hover:bg-emerald-600 text-white font-semibold uppercase text-xs tracking-wider rounded text-center transition-all cursor-pointer block shadow-sm"
            >
              Send WhatsApp &rarr;
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsWhatsAppOpen(true)}
            className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-[0_4px_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center font-bold"
            title="Claim Diagnostic scan slots via WhatsApp"
          >
            <Smartphone className="w-6 h-6 animate-pulse" />
          </button>
        )}
      </div>
      )}

      {/* TRUSTED PROFESSIONAL FOOTER - hide on admin */}
      {currentPage !== "admin" && (
      <footer className="relative z-30 bg-slate-50 border-t border-slate-200 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-indigo-50 border border-indigo-100 p-1">
                <BrainXLogo 
                  className="w-8 h-8" 
                />
              </div>
              <div>
                <span className="text-base font-display font-black uppercase tracking-tight text-slate-900">Brain<span className="text-indigo-600">X</span> India</span>
                <span className="block text-[9px] font-sans text-indigo-600 uppercase tracking-widest font-black">Unwind the Genius</span>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans font-medium">
              Empowering pediatric intelligence based on biometric ridge density studies and Howard Gardner multiple intelligence theory.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.linkedin.com/in/sanju-nair-s-brainx-b292b4b9?utm_content=profile&utm_medium=member_android&utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white border border-slate-200 hover:border-[#0a66c2] hover:text-[#0a66c2] text-slate-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="http://www.youtube.com/@brainxmasters4159?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white border border-slate-200 hover:border-[#ff0000] hover:text-[#ff0000] text-slate-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-sm"
                title="BrainX Masters YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3 font-sans font-medium text-slate-600">
            <h5 className="font-display font-bold uppercase text-slate-900 text-xs">Quick Navigation</h5>
            <ul className="space-y-2">
              <li><button type="button" onClick={() => handlePageChange("home")} className="hover:text-indigo-600 text-left cursor-pointer">Home Base</button></li>
              <li><button type="button" onClick={() => handlePageChange("about")} className="hover:text-indigo-600 text-left cursor-pointer">Origins & Gardner Base</button></li>
              <li><button type="button" onClick={() => handlePageChange("programs")} className="hover:text-indigo-600 text-left cursor-pointer">Protocols Academies</button></li>
              <li><button type="button" onClick={() => handlePageChange("partners")} className="hover:text-indigo-600 text-left cursor-pointer">Franchise & Maharashtra School Synergies</button></li>
            </ul>
          </div>

          <div className="space-y-3 font-sans font-medium text-slate-600">
            <h5 className="font-display font-bold uppercase text-slate-900 text-xs">Programs & Tiers</h5>
            <ul className="space-y-2">
              <li><button type="button" onClick={() => { setSelectedProgramId("dmit"); handlePageChange("programs"); }} className="hover:text-indigo-600 text-left cursor-pointer">DMIT Fingerprint Mapping</button></li>
              <li><button type="button" onClick={() => { setSelectedProgramId("midbrain"); handlePageChange("programs"); }} className="hover:text-indigo-600 text-left cursor-pointer">Centre Brain Ignition</button></li>
              <li><button type="button" onClick={() => { setSelectedProgramId("parenting"); handlePageChange("programs"); }} className="hover:text-indigo-600 text-left cursor-pointer">Modern-Day Parenting Challenges</button></li>
              <li><button type="button" onClick={() => { setSelectedProgramId("value"); handlePageChange("programs"); }} className="hover:text-indigo-600 text-left cursor-pointer">Importance of Value Education Course</button></li>
            </ul>
          </div>

          <div className="space-y-4 font-sans font-medium text-slate-650">
            <h5 className="font-display font-bold uppercase text-slate-900 text-xs">Registered Address</h5>
            <p className="text-slate-600 leading-relaxed font-sans">
              Address:<br />
              E/1401, Runal Gateway,<br />
              Ravet, Pune
            </p>
            <div className="text-slate-600 space-y-1 font-mono text-[11px]">
              <div>
                <span className="font-sans font-bold">Mobile:</span>{" "}
                <a href="tel:+918888004111" className="hover:text-indigo-600 underline">
                  +91 88880 04111
                </a>
              </div>
              <div>
                <span className="font-sans font-bold">WhatsApp:</span>{" "}
                <a href="https://wa.me/918888004111" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline">
                  +91 88880 04111
                </a>
              </div>
              <div className="truncate">
                <span className="font-sans font-bold">Email:</span>{" "}
                <a href="mailto:brainx2010@gmail.com" className="hover:text-indigo-600 underline">
                  brainx2010@gmail.com
                </a>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a href="tel:+918888004111" className="px-2.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-center transition-all cursor-pointer">
                Call Now
              </a>
              <a href="https://wa.me/918888004111" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-center transition-all cursor-pointer">
                WhatsApp Us
              </a>
              <a href="mailto:brainx2010@gmail.com" className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-center transition-all cursor-pointer">
                Email Us
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-slate-200 mt-12 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-4">
          <span 
            className="hover:text-[#4f46e5] transition-colors select-none"
          >
            &copy; {new Date().getFullYear()} BrainX India National Level Organisation. All Rights Reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600">Pediatric Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Franchise Disclosures</a>
            <a href="#" className="hover:text-indigo-600">School Licensing agreement</a>
          </div>
        </div>
      </footer>
      )}

    </div>
  );
}
