import React, { useState } from "react";
import { Plus, Trash2, Calendar, FileText, LogOut } from "lucide-react";

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

interface AdminPanelProps {
  dynamicEvents: Event[];
  setDynamicEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  extraCaseFiles: CaseFile[];
  setExtraCaseFiles: React.Dispatch<React.SetStateAction<CaseFile[]>>;
  onLogout: () => void;
}

export default function AdminPanel({
  dynamicEvents,
  setDynamicEvents,
  extraCaseFiles,
  setExtraCaseFiles,
  onLogout,
}: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<"events" | "cases">("events");
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showAddCaseForm, setShowAddCaseForm] = useState(false);

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
    if (!newEvent.title || !newEvent.dateDisplay) return;

    const eventDate = newEvent.date ? new Date(newEvent.date) : new Date();

    const createdEvent: Event = {
      id: Date.now(),
      title: newEvent.title,
      type: newEvent.type,
      dateDisplay: newEvent.dateDisplay,
      date: eventDate,
      meta1Label: newEvent.meta1Label,
      meta1Value: newEvent.meta1Value,
      meta2Label: newEvent.meta2Label,
      meta2Value: newEvent.meta2Value,
      seatsLabel: newEvent.seatsLabel,
      ctaLabel: newEvent.ctaLabel,
      ctaProgram: newEvent.ctaProgram,
      ctaLocation: newEvent.ctaLocation,
      typeColor: newEvent.type.includes("Webinar") 
        ? "bg-indigo-50 text-indigo-700 border-indigo-100" 
        : "bg-emerald-50 text-emerald-800 border-emerald-100",
      borderColor: newEvent.type.includes("Webinar") ? "from-indigo-505" : "from-emerald-500",
      titleHover: newEvent.type.includes("Webinar") ? "group-hover:text-indigo-650" : "group-hover:text-emerald-700",
    };

    setDynamicEvents((prev) => [...prev, createdEvent]);
    setShowAddEventForm(false);
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
    });
  };

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.headline || !newCase.parentName || !newCase.caseNumber) return;

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
              onClick={() => setShowAddEventForm(!showAddEventForm)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-755 hover:bg-indigo-700 text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow hover:shadow-lg transition-all"
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
                Publish New Event details
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
                    Date & Time Display *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. June 15, 11:00 AM IST"
                    value={newEvent.dateDisplay}
                    onChange={(e) => setNewEvent({ ...newEvent, dateDisplay: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                    ISO Date (For expiry sorting)
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-indigo-500"
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
                    onChange={(e) => setNewEvent({ ...newEvent, ctaProgram: e.target.value })}
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
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-3 bg-indigo-650 bg-indigo-600 text-white font-mono font-bold text-xs uppercase rounded-xl hover:bg-indigo-755 cursor-pointer shadow hover:shadow-md transition-all"
                >
                  Save Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEventForm(false)}
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
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-1 text-slate-350 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {ev.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <span>📅</span> {ev.dateDisplay}
                  </p>
                  
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
              onClick={() => setShowAddCaseForm(!showAddCaseForm)}
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
                Publish New Case Dossier
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
                  Save Case File
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCaseForm(false)}
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
                <button
                  type="button"
                  onClick={() => handleDeleteCase(c.id)}
                  className="px-3 py-2 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 font-mono font-bold text-[10px] uppercase rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 hover:scale-[1.01]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete File</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
