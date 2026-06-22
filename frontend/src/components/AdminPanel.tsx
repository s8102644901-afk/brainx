import React, { useState } from "react";
import { Plus, Trash2, Pencil, Calendar, FileText, LogOut, Sparkles, Loader2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
  type: string;
  dateDisplay: string;
  date: Date;
  meta1Label: string;
  meta1Value: string;
  meta2Label: string;
  meta2Value: string;
  seatsLabel: string;
  ctaLabel: string;
  ctaProgram: string;
  ctaLocation: string;
  typeColor: string;
  borderColor: string;
  titleHover: string;
  summary?: string;
}

interface CaseFile {
  id: number;
  caseNumber: string;
  programName: string;
  headline: string;
  storyText: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  parentName: string;
  parentProfession: string;
  childProfile: string;
}

const formatEventDate = (dateVal: Date | string): string => {
  if (!dateVal) return "";
  const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
  if (isNaN(d.getTime())) return "";

  const fullMonths = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const month = fullMonths[d.getMonth()];
  const day = String(d.getDate()).padStart(2, '0');
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hourStr = String(hours).padStart(2, '0');

  return `${month} ${day}, ${hourStr}:${minutes} ${ampm} IST`;
};

const toDatetimeLocalString = (dateVal: Date | string): string => {
  if (!dateVal) return "";
  const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
  if (isNaN(d.getTime())) return "";

  const ten = (i: number) => (i < 10 ? '0' : '') + i;
  const YYYY = d.getFullYear();
  const MM = ten(d.getMonth() + 1);
  const DD = ten(d.getDate());
  const HH = ten(d.getHours());
  const II = ten(d.getMinutes());
  return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
};

const getDefaultSummary = (ctaProgram: string): string => {
  switch (ctaProgram) {
    case "parenting":
      return "Learn exact home-detox protocols to stop electronic screens from cannibalizing prefrontal attention spans, centering core neuro-focus.";
    case "dmit":
      return "An interactive live demonstration for parents and students to map Howard Gardner sensory modalities. Take a direct fingerprint baseline test live.";
    case "midbrain":
      return "Witness our certified blindfold reading practitioners demonstrate spatial vibration and color awareness, with clinical feedback.";
    case "value":
      return "Special active session. Learn de-addiction techniques, parenting skills, value systems, and core brain coordination.";
    default:
      return "Special active session. Learn de-addiction techniques, parenting skills, value systems, and core brain coordination.";
  }
};

interface AdminPanelProps {
  dynamicEvents: Event[];
  setDynamicEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  extraCaseFiles: CaseFile[];
  setExtraCaseFiles: React.Dispatch<React.SetStateAction<CaseFile[]>>;
  customerLogs: any[];
  setCustomerLogs: React.Dispatch<React.SetStateAction<any[]>>;
  onLogout: () => void;
}

export default function AdminPanel({
  dynamicEvents,
  setDynamicEvents,
  extraCaseFiles,
  setExtraCaseFiles,
  customerLogs,
  setCustomerLogs,
  onLogout,
}: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<"events" | "cases" | "analytics">("analytics");
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showAddCaseForm, setShowAddCaseForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [editingCaseId, setEditingCaseId] = useState<number | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [lastGeneratedTitle, setLastGeneratedTitle] = useState("");
  const [deleteConfirmState, setDeleteConfirmState] = useState<{
    isOpen: boolean;
    type: "event" | "case";
    id: number;
  }>({
    isOpen: false,
    type: "event",
    id: 0,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  // Analytics Filters
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredLogs = React.useMemo(() => {
    const result = customerLogs.filter((log) => {
      const matchName = filterName ? log.name.toLowerCase().includes(filterName.toLowerCase()) : true;
      let matchDate = true;
      if (filterDate) {
        // Log dates are ISO strings like "2026-06-05T14:50:13.000Z"
        // Filter date is YYYY-MM-DD format from the date input
        const logDateStr = new Date(log.date).toISOString().split('T')[0];
        matchDate = logDateStr === filterDate;
      }
      return matchName && matchDate;
    });
    // Sort descending by date (newest first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [customerLogs, filterName, filterDate]);

  React.useEffect(() => {
    if (adminTab === "analytics") {
      const fetchAnalytics = async () => {
        try {
          const csvUrl = "https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/export?format=csv";
          const response = await fetch(csvUrl);
          if (!response.ok) throw new Error("Failed to fetch CSV");
          
          const csvText = await response.text();
          const lines = csvText.split("\n");
          const fetchedLogs: any[] = [];
          
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const cols = line.split(",");
            if (cols.length >= 6) {
              const parentName = (cols[0] || "").trim();
              const phone = (cols[1] || "").trim();
              const protocol = (cols[2] || "Consultation").trim() || "Consultation";
              const age = (cols[3] || "").trim();
              const location = (cols[4] || "").trim();
              let timestamp = (cols[5] || "").trim();
              
              if (!parentName && !phone && !timestamp) continue;
              
              let isoDate = new Date().toISOString();
              try {
                if (timestamp) {
                   const nativeDate = new Date(timestamp);
                   if (!isNaN(nativeDate.getTime())) {
                       isoDate = nativeDate.toISOString();
                   } else {
                       const parts = timestamp.split(" ");
                       if (parts.length >= 1) {
                          const dateParts = parts[0].split("/");
                          if (dateParts.length === 3) {
                             const d = parseInt(dateParts[0]);
                             const m = parseInt(dateParts[1]);
                             const y = parseInt(dateParts[2]);
                             if (y > 2000) {
                                 const timeParts = parts[1] ? parts[1].split(":") : ["00", "00", "00"];
                                 isoDate = new Date(y, m-1, d, parseInt(timeParts[0]||"0"), parseInt(timeParts[1]||"0"), parseInt(timeParts[2]||"0")).toISOString();
                             }
                          }
                       }
                   }
                }
              } catch(e) {}
              
              fetchedLogs.push({
                id: `sheet_${i}`,
                type: protocol.toLowerCase().includes("midbrain") || protocol.toLowerCase().includes("dmit") ? "Consultation" : "Consultation",
                name: parentName || "Unknown",
                phone: phone,
                date: isoDate,
                extraDetails: `Protocol: ${protocol}, Age: ${age}, Location: ${location}`,
                isFromSheet: true
              });
            }
          }

          setCustomerLogs(prev => {
            const prevWithoutSheets = prev.filter(l => !l.id.startsWith("sheet_"));
            const merged = [...prevWithoutSheets, ...fetchedLogs];
            merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return merged;
          });
        } catch (err) {
          console.error("Failed to fetch sheets analytics:", err);
        }
      };
      
      fetchAnalytics();
    }
  }, [adminTab, setCustomerLogs]);

  const generateAISummary = async (titleToUse?: string) => {
    const title = titleToUse !== undefined ? titleToUse : newEvent.title;
    if (!title || title.trim().length < 5 || title === lastGeneratedTitle) return;

    setIsGeneratingSummary(true);
    setLastGeneratedTitle(title);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          type: newEvent.type,
          ctaProgram: newEvent.ctaProgram,
        }),
      });

      const data = await response.json();
      if (response.ok && data.summary) {
        setNewEvent((prev) => ({
          ...prev,
          summary: data.summary,
        }));
      }
    } catch (err) {
      console.error("AI Summary generation network error:", err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "Zoom Webinar",
    dateDisplay: "",
    date: "",
    meta1Label: "",
    meta1Value: "",
    meta2Label: "",
    meta2Value: "",
    seatsLabel: "Seats Available",
    ctaLabel: "Reserve Ticket",
    ctaProgram: "dmit",
    ctaLocation: "",
    summary: getDefaultSummary("dmit"),
  });

  // New Case Form State
  const [newCase, setNewCase] = useState({
    caseNumber: "",
    programName: "",
    headline: "",
    storyText: "",
    bullet1: "",
    bullet2: "",
    bullet3: "",
    parentName: "",
    parentProfession: "",
    childProfile: "",
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    const eventDate = new Date(newEvent.date);
    const dateDisplay = formatEventDate(newEvent.date);

    const typeColor = newEvent.type.includes("Webinar") 
      ? "bg-indigo-50 text-indigo-700 border-indigo-100" 
      : newEvent.type.includes("HQ") || newEvent.type.includes("Seminar")
        ? "bg-amber-100 text-amber-800 border-amber-200"
        : "bg-emerald-50 text-emerald-800 border-emerald-100";

    const borderColor = newEvent.type.includes("Webinar") 
      ? "from-indigo-505" 
      : newEvent.type.includes("HQ") || newEvent.type.includes("Seminar")
        ? "from-amber-505"
        : "from-emerald-500";

    const titleHover = newEvent.type.includes("Webinar") 
      ? "group-hover:text-indigo-650" 
      : newEvent.type.includes("HQ") || newEvent.type.includes("Seminar")
        ? "group-hover:text-amber-700"
        : "group-hover:text-emerald-700";

    if (editingEventId !== null) {
      setDynamicEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEventId
            ? {
                ...ev,
                title: newEvent.title,
                type: newEvent.type,
                dateDisplay,
                date: eventDate,
                meta1Label: newEvent.meta1Label,
                meta1Value: newEvent.meta1Value,
                meta2Label: newEvent.meta2Label,
                meta2Value: newEvent.meta2Value,
                seatsLabel: newEvent.seatsLabel,
                ctaLabel: newEvent.ctaLabel,
                ctaProgram: newEvent.ctaProgram,
                ctaLocation: newEvent.ctaLocation,
                typeColor,
                borderColor,
                titleHover,
                summary: newEvent.summary,
              }
            : ev
        )
      );
      setEditingEventId(null);
    } else {
      const createdEvent: Event = {
        id: Date.now(),
        title: newEvent.title,
        type: newEvent.type,
        dateDisplay,
        date: eventDate,
        meta1Label: newEvent.meta1Label,
        meta1Value: newEvent.meta1Value,
        meta2Label: newEvent.meta2Label,
        meta2Value: newEvent.meta2Value,
        seatsLabel: newEvent.seatsLabel,
        ctaLabel: newEvent.ctaLabel,
        ctaProgram: newEvent.ctaProgram,
        ctaLocation: newEvent.ctaLocation,
        typeColor,
        borderColor,
        titleHover,
        summary: newEvent.summary,
      };

      setDynamicEvents((prev) => [...prev, createdEvent]);
    }

    setShowAddEventForm(false);
    setLastGeneratedTitle("");
    setNewEvent({
      title: "",
      type: "Zoom Webinar",
      dateDisplay: "",
      date: "",
      meta1Label: "",
      meta1Value: "",
      meta2Label: "",
      meta2Value: "",
      seatsLabel: "Seats Available",
      ctaLabel: "Reserve Ticket",
      ctaProgram: "dmit",
      ctaLocation: "",
      summary: getDefaultSummary("dmit"),
    });
  };

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.headline || !newCase.parentName || !newCase.caseNumber) return;

    if (editingCaseId !== null) {
      setExtraCaseFiles((prev) =>
        prev.map((c) =>
          c.id === editingCaseId
            ? {
                ...c,
                caseNumber: newCase.caseNumber,
                programName: newCase.programName || "General Development",
                headline: newCase.headline,
                storyText: newCase.storyText,
                bullet1: newCase.bullet1,
                bullet2: newCase.bullet2,
                bullet3: newCase.bullet3,
                parentName: newCase.parentName,
                parentProfession: newCase.parentProfession,
                childProfile: newCase.childProfile,
              }
            : c
        )
      );
      setEditingCaseId(null);
    } else {
      const createdCase: CaseFile = {
        id: Date.now(),
        caseNumber: newCase.caseNumber,
        programName: newCase.programName || "General Development",
        headline: newCase.headline,
        storyText: newCase.storyText,
        bullet1: newCase.bullet1,
        bullet2: newCase.bullet2,
        bullet3: newCase.bullet3,
        parentName: newCase.parentName,
        parentProfession: newCase.parentProfession,
        childProfile: newCase.childProfile,
      };

      setExtraCaseFiles((prev) => [...prev, createdCase]);
    }

    setShowAddCaseForm(false);
    setNewCase({
      caseNumber: "",
      programName: "",
      headline: "",
      storyText: "",
      bullet1: "",
      bullet2: "",
      bullet3: "",
      parentName: "",
      parentProfession: "",
      childProfile: "",
    });
  };

  const handleEditEvent = (ev: Event) => {
    setEditingEventId(ev.id);
    setLastGeneratedTitle(ev.title || "");
    const dateVal = ev.date ? (ev.date instanceof Date ? ev.date : new Date(ev.date)) : null;
    const dateString = dateVal && !isNaN(dateVal.getTime()) ? toDatetimeLocalString(dateVal) : "";
    setNewEvent({
      title: ev.title,
      type: ev.type,
      dateDisplay: ev.dateDisplay,
      date: dateString,
      meta1Label: ev.meta1Label || "",
      meta1Value: ev.meta1Value || "",
      meta2Label: ev.meta2Label || "",
      meta2Value: ev.meta2Value || "",
      seatsLabel: ev.seatsLabel || "Seats Available",
      ctaLabel: ev.ctaLabel || "Reserve Ticket",
      ctaProgram: ev.ctaProgram || "dmit",
      ctaLocation: ev.ctaLocation || "",
      summary: ev.summary || "",
    });
    setShowAddEventForm(true);
  };

  const handleEditCase = (c: CaseFile) => {
    setEditingCaseId(c.id);
    setNewCase({
      caseNumber: c.caseNumber,
      programName: c.programName,
      headline: c.headline,
      storyText: c.storyText,
      bullet1: c.bullet1,
      bullet2: c.bullet2,
      bullet3: c.bullet3,
      parentName: c.parentName,
      parentProfession: c.parentProfession,
      childProfile: c.childProfile,
    });
    setShowAddCaseForm(true);
  };

  const handleDeleteEvent = (id: number) => {
    setDynamicEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleDeleteCase = (id: number) => {
    setExtraCaseFiles((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-10 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="space-y-1 relative z-10">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold block">
            System Operations
          </span>
          <h2 className="text-3xl font-display font-black tracking-tight">
            BrainX Control Centre
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Configure dynamic diagnostics registries and seminar sessions.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="px-5 py-3 bg-rose-500/10 border border-rose-500/35 hover:bg-rose-500/20 text-rose-300 font-mono font-bold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 relative z-10 hover:scale-[1.01]"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Session</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-3 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => setAdminTab("events")}
          className={`px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === "events"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
              : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Seminars & Webinars ({dynamicEvents.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setAdminTab("cases")}
          className={`px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === "cases"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
              : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Custom Case Chronicles ({extraCaseFiles.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setAdminTab("analytics")}
          className={`px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === "analytics"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
              : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Analytics & Logs ({customerLogs?.length || 0})</span>
        </button>
      </div>

      {/* MANAGING EVENTS TAB */}
      {adminTab === "events" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-black text-slate-900">
              Active Program Registrations
            </h3>
            <button
              type="button"
              onClick={() => {
                if (showAddEventForm && editingEventId !== null) {
                  setEditingEventId(null);
                  setLastGeneratedTitle("");
                  setNewEvent({
                    title: "",
                    type: "Zoom Webinar",
                    dateDisplay: "",
                    date: "",
                    meta1Label: "",
                    meta1Value: "",
                    meta2Label: "",
                    meta2Value: "",
                    seatsLabel: "Seats Available",
                    ctaLabel: "Reserve Ticket",
                    ctaProgram: "dmit",
                    ctaLocation: "",
                    summary: getDefaultSummary("dmit"),
                  });
                } else {
                  setShowAddEventForm(!showAddEventForm);
                  if (!showAddEventForm) {
                    setEditingEventId(null);
                    setLastGeneratedTitle("");
                    setNewEvent({
                      title: "",
                      type: "Zoom Webinar",
                      dateDisplay: "",
                      date: "",
                      meta1Label: "",
                      meta1Value: "",
                      meta2Label: "",
                      meta2Value: "",
                      seatsLabel: "Seats Available",
                      ctaLabel: "Reserve Ticket",
                      ctaProgram: "dmit",
                      ctaLocation: "",
                      summary: getDefaultSummary("dmit"),
                    });
                  }
                }
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Seminar Event</span>
            </button>
          </div>

          {showAddEventForm && (
            <form
              onSubmit={handleAddEvent}
              className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-3xl space-y-6 animate-fadeIn"
            >
              <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide">
                {editingEventId ? "Edit Event details" : "Publish New Event details"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brain Activation Workshop"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    onBlur={(e) => {
                      if (e.target.value && e.target.value.trim().length >= 5) {
                        generateAISummary(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-indigo-150 border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Event Medium / Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Zoom Webinar">Zoom Webinar</option>
                    <option value="Offline Seminar">Offline Seminar (Pune HQ)</option>
                    <option value="Intake Workshop">Intake Workshop (Ravet Center)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Event Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Parameter 1 Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Target Bracket"
                    value={newEvent.meta1Label}
                    onChange={(e) => setNewEvent({ ...newEvent, meta1Label: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Parameter 1 Value
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ages 4-12"
                    value={newEvent.meta1Value}
                    onChange={(e) => setNewEvent({ ...newEvent, meta1Value: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Parameter 2 Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Voucher Slots"
                    value={newEvent.meta2Label}
                    onChange={(e) => setNewEvent({ ...newEvent, meta2Label: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Parameter 2 Value
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 complimentary slots"
                    value={newEvent.meta2Value}
                    onChange={(e) => setNewEvent({ ...newEvent, meta2Value: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Seats Label Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12 Seats Left"
                    value={newEvent.seatsLabel}
                    onChange={(e) => setNewEvent({ ...newEvent, seatsLabel: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Claim Seat"
                    value={newEvent.ctaLabel}
                    onChange={(e) => setNewEvent({ ...newEvent, ctaLabel: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    CTA Target Program
                  </label>
                  <select
                    value={newEvent.ctaProgram}
                    onChange={(e) => {
                      const newProgram = e.target.value;
                      setNewEvent((prev) => {
                        const isDefault = !prev.summary || 
                          prev.summary === getDefaultSummary(prev.ctaProgram);
                        return {
                          ...prev,
                          ctaProgram: newProgram,
                          summary: isDefault ? getDefaultSummary(newProgram) : prev.summary
                        };
                      });
                    }}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="dmit">DMIT Mapping</option>
                    <option value="midbrain">Mid-Brain Activation</option>
                    <option value="parenting">Parenting Seminar</option>
                    <option value="value">Value Education</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    CTA Location default
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune (Ravet)"
                    value={newEvent.ctaLocation}
                    onChange={(e) => setNewEvent({ ...newEvent, ctaLocation: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                      Custom Summary (Optional)
                    </label>
                    {newEvent.title && newEvent.title.trim().length >= 5 && (
                      <button
                        type="button"
                        onClick={() => generateAISummary(newEvent.title)}
                        disabled={isGeneratingSummary}
                        className="text-[10px] font-mono text-indigo-650 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-50"
                      >
                        {isGeneratingSummary ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>AI Generating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Regenerate Summary</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="e.g. Learn exact de-escalation protocols for screen dependency..."
                    value={newEvent.summary}
                    onChange={(e) => setNewEvent({ ...newEvent, summary: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500 cursor-text animate-fadeIn"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-3 bg-indigo-600 text-white font-mono font-bold text-xs uppercase rounded-xl hover:bg-indigo-700 cursor-pointer shadow hover:shadow-md transition-all"
                >
                  {editingEventId ? "Update Event" : "Save Event"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddEventForm(false);
                    setEditingEventId(null);
                    setLastGeneratedTitle("");
                    setNewEvent({
                      title: "",
                      type: "Zoom Webinar",
                      dateDisplay: "",
                      date: "",
                      meta1Label: "",
                      meta1Value: "",
                      meta2Label: "",
                      meta2Value: "",
                      seatsLabel: "Seats Available",
                      ctaLabel: "Reserve Ticket",
                      ctaProgram: "dmit",
                      ctaLocation: "",
                      summary: getDefaultSummary("dmit"),
                    });
                  }}
                  className="px-5 py-3 bg-white border border-slate-200 text-slate-600 font-mono font-bold text-xs uppercase rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dynamicEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-indigo-50 text-indigo-700 border-indigo-100">
                      {ev.type}
                    </span>
                    <div className="flex gap-1.5 items-center">
                      <button
                        type="button"
                        onClick={() => handleEditEvent(ev)}
                        className="p-1 text-slate-350 hover:text-indigo-600 transition-colors cursor-pointer"
                        title="Edit Event"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmState({ isOpen: true, type: "event", id: ev.id })}
                        className="p-1 text-slate-350 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {ev.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <span>📅</span> {ev.dateDisplay}
                  </p>
                  {ev.summary && (
                    <p className="text-[11px] font-sans text-slate-600 leading-relaxed italic border-l-2 border-indigo-100 pl-2">
                      "{ev.summary}"
                    </p>
                  )}
                  
                  {ev.meta1Label && (
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[10px] font-mono text-slate-605">
                      <div className="flex justify-between">
                        <span>{ev.meta1Label}:</span>
                        <span className="text-indigo-700 font-bold">{ev.meta1Value}</span>
                      </div>
                      {ev.meta2Label && (
                        <div className="flex justify-between">
                          <span>{ev.meta2Label}:</span>
                          <span className="text-emerald-700 font-bold">{ev.meta2Value}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-slate-100 text-[9px] font-mono text-slate-400 flex justify-between uppercase">
                  <span>{ev.seatsLabel}</span>
                  <span className="text-indigo-550 font-bold">{ev.ctaProgram}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MANAGING CASES TAB */}
      {adminTab === "cases" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-black text-slate-900">
              Clinical Case Chronicles
            </h3>
            <button
              type="button"
              onClick={() => {
                if (showAddCaseForm && editingCaseId !== null) {
                  setEditingCaseId(null);
                  setNewCase({
                    caseNumber: "",
                    programName: "",
                    headline: "",
                    storyText: "",
                    bullet1: "",
                    bullet2: "",
                    bullet3: "",
                    parentName: "",
                    parentProfession: "",
                    childProfile: "",
                  });
                } else {
                  setShowAddCaseForm(!showAddCaseForm);
                  if (!showAddCaseForm) {
                    setEditingCaseId(null);
                    setNewCase({
                      caseNumber: "",
                      programName: "",
                      headline: "",
                      storyText: "",
                      bullet1: "",
                      bullet2: "",
                      bullet3: "",
                      parentName: "",
                      parentProfession: "",
                      childProfile: "",
                    });
                  }
                }
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Case File</span>
            </button>
          </div>

          {showAddCaseForm && (
            <form
              onSubmit={handleAddCase}
              className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-3xl space-y-6 animate-fadeIn"
            >
              <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide">
                {editingCaseId ? "Edit Case Dossier" : "Publish New Case Dossier"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Case Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11"
                    value={newCase.caseNumber}
                    onChange={(e) => setNewCase({ ...newCase, caseNumber: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Program Domain *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DMIT Mapping + Centre Brain Ignition"
                    value={newCase.programName}
                    onChange={(e) => setNewCase({ ...newCase, programName: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Case Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. From gaming addiction to chess champion..."
                    value={newCase.headline}
                    onChange={(e) => setNewCase({ ...newCase, headline: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Story Text / Narrative
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detail the case profile changes..."
                    value={newCase.storyText}
                    onChange={(e) => setNewCase({ ...newCase, storyText: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Parent Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. & Mrs. Kulkarni"
                    value={newCase.parentName}
                    onChange={(e) => setNewCase({ ...newCase, parentName: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Parent Profession & City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer (Pune)"
                    value={newCase.parentProfession}
                    onChange={(e) => setNewCase({ ...newCase, parentProfession: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Child Profile Summary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Arjun, Age 11 (Gaming addiction)"
                    value={newCase.childProfile}
                    onChange={(e) => setNewCase({ ...newCase, childProfile: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Result Bullet 1
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Focus span increased to 90 min"
                    value={newCase.bullet1}
                    onChange={(e) => setNewCase({ ...newCase, bullet1: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Result Bullet 2
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Voluntary screen de-addiction"
                    value={newCase.bullet2}
                    onChange={(e) => setNewCase({ ...newCase, bullet2: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    Result Bullet 3
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Improved emotional intelligence"
                    value={newCase.bullet3}
                    onChange={(e) => setNewCase({ ...newCase, bullet3: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-3 bg-indigo-600 text-white font-mono font-bold text-xs uppercase rounded-xl hover:bg-indigo-700 cursor-pointer shadow hover:shadow-md transition-all"
                >
                  {editingCaseId ? "Update Case File" : "Save Case File"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCaseForm(false);
                    setEditingCaseId(null);
                    setNewCase({
                      caseNumber: "",
                      programName: "",
                      headline: "",
                      storyText: "",
                      bullet1: "",
                      bullet2: "",
                      bullet3: "",
                      parentName: "",
                      parentProfession: "",
                      childProfile: "",
                    });
                  }}
                  className="px-5 py-3 bg-white border border-slate-200 text-slate-600 font-mono font-bold text-xs uppercase rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {extraCaseFiles.length === 0 && (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-3xl text-xs font-mono text-slate-400">
                No custom case dossiers configured yet.
              </div>
            )}
            {extraCaseFiles.map((c) => (
              <div
                key={c.id}
                className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden"
              >
                <div className="space-y-2 max-w-4xl">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[9px] font-mono text-indigo-700 font-bold uppercase bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      Case File #{c.caseNumber}
                    </span>
                    <span className="text-[9px] font-mono text-amber-700 font-bold uppercase bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                      {c.programName}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-905">
                    "{c.headline}"
                  </h4>
                  <p className="text-xs text-slate-500 font-sans italic">
                    "{c.storyText}"
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">
                    Patient: {c.childProfile} | Parents: {c.parentName} ({c.parentProfession})
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEditCase(c)}
                    className="px-3 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 font-mono font-bold text-[10px] uppercase rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 hover:scale-[1.01]"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmState({ isOpen: true, type: "case", id: c.id })}
                    className="px-3 py-2 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 font-mono font-bold text-[10px] uppercase rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 hover:scale-[1.01]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete File</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANALYTICS & LOGS TAB */}
      {adminTab === "analytics" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-black text-slate-900">
              Customer Analytics & Logs
            </h3>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all customer logs? This cannot be undone.")) {
                  setCustomerLogs([]);
                  localStorage.removeItem("brainx_customer_logs");
                }
              }}
              className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-mono font-bold text-xs uppercase rounded-xl cursor-pointer transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Logs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Total Leads</span>
              <span className="text-3xl font-display font-black text-indigo-600">{customerLogs?.length || 0}</span>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Bookings</span>
              <span className="text-3xl font-display font-black text-emerald-600">{customerLogs?.filter(l => l.type === "Booking").length || 0}</span>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Franchise & School</span>
              <span className="text-3xl font-display font-black text-amber-600">{customerLogs?.filter(l => l.type === "Franchise" || l.type === "School").length || 0}</span>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Consultations</span>
              <span className="text-3xl font-display font-black text-violet-600">{customerLogs?.filter(l => l.type === "Consultation").length || 0}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="Filter by Customer Name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-sans text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="flex-1 sm:max-w-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-sans text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-mono text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Type</th>
                    <th className="px-6 py-4 font-bold">Customer Name</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold">Extra Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {(!filteredLogs || filteredLogs.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-mono">
                        No customer logs found.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                          {new Date(log.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase font-mono ${
                            log.type === "Booking" ? "bg-emerald-100 text-emerald-700" :
                            log.type === "Franchise" ? "bg-amber-100 text-amber-700" :
                            log.type === "School" ? "bg-blue-100 text-blue-700" :
                            "bg-violet-100 text-violet-700"
                          }`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">{log.name}</td>
                        <td className="px-6 py-4 text-slate-600 font-mono">{log.phone}</td>
                        <td className="px-6 py-4 text-slate-500 text-[10px] max-w-xs truncate" title={log.extraDetails}>{log.extraDetails || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-sm w-full mx-4 shadow-2xl space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-black text-slate-950">
                Confirm Deletion
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                Are you sure you want to delete this summary? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmState({ isOpen: false, type: "event", id: 0 })}
                className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-mono font-bold text-xs uppercase rounded-xl hover:bg-slate-50 cursor-pointer text-center transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmState.type === "event") {
                    handleDeleteEvent(deleteConfirmState.id);
                  } else {
                    handleDeleteCase(deleteConfirmState.id);
                  }
                  setDeleteConfirmState({ isOpen: false, type: "event", id: 0 });
                }}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-xs uppercase rounded-xl cursor-pointer text-center shadow shadow-rose-600/10 hover:shadow-rose-600/20 transition-all animate-pulse-slow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
