import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studio: '',
    projectType: 'Luxury Residential',
    timeline: '1–2 Months',
    budgetTier: '$10k – $25k',
    deliverables: ['High-Res CGI Stills', '360° Interactive Tour'],
    message: ''
  });

  const availableDeliverables = [
    'High-Res CGI Stills',
    '360° Interactive Tour',
    '4K Cinematic Film',
    'Clay & Lighting Study',
    'Competition Rapid Package'
  ];

  const toggleDeliverable = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.includes(item)
        ? prev.deliverables.filter((d) => d !== item)
        : [...prev.deliverables, item]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="inquire" className="py-20 border-b border-zinc-800/80 bg-[#07080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info & Studio Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              Commission & Collaboration
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Initiate your architectural visualization.
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              We collaborate with architects, real estate developers, and design studios across the globe. Tell us about your project timeline, deliverables, and aesthetic goals.
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-850">
              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block font-mono">DIRECT INQUIRIES</span>
                  <a href="mailto:studio@aura-archviz.com" className="text-white hover:underline">
                    studio@aura-archviz.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block font-mono">STUDIO LOCATIONS</span>
                  <span className="text-white">New York · Zurich · Tokyo</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block font-mono">PRODUCTION RESPONSE</span>
                  <span className="text-white">Standard project quotation turnaround in 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#0e1015] border border-zinc-800 rounded-2xl shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Commission Request Received
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'Architect'}. Our senior visualization director will review your project parameters and respond within 24 hours with an initial estimate and calendar availability.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        Professional Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@studio-architecture.com"
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        Architecture Practice / Company
                      </label>
                      <input
                        type="text"
                        value={formData.studio}
                        onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                        placeholder="Studio Name"
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        Project Typology
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Luxury Residential">Luxury Residential</option>
                        <option value="Cultural / Museum">Cultural / Museum</option>
                        <option value="Commercial High-Rise">Commercial High-Rise</option>
                        <option value="Hospitality & Resort">Hospitality & Resort</option>
                        <option value="Masterplan & Urban">Masterplan & Urban</option>
                      </select>
                    </div>
                  </div>

                  {/* Deliverables Checkboxes */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Required Deliverables (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableDeliverables.map((item) => {
                        const isChecked = formData.deliverables.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => toggleDeliverable(item)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                              isChecked
                                ? 'bg-amber-400 text-black font-semibold'
                                : 'bg-black/40 text-zinc-400 border border-zinc-800 hover:text-white'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Project Overview & CAD/BIM File Readiness
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details on 3D geometry availability (Rhino, Revit, SketchUp, ArchiCAD), key camera angles, and intended delivery date..."
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Project Brief</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
