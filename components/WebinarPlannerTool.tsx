
import React, { useState } from 'react';
import { 
  Video, 
  Copy, 
  RefreshCcw, 
  Check, 
  Calendar, 
  Users, 
  Target, 
  FileText, 
  Layout, 
  Megaphone, 
  MousePointer2,
  ChevronRight,
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  Monitor,
  PlayCircle,
  Layers,
  Presentation
} from 'lucide-react';
import { generateWebinarPlan } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

const WebinarPlannerTool: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: '',
    audience: '',
    objective: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadExample = () => {
    setFormData({
      topic: 'Optimización de Embudo de Ventas B2B con IA',
      audience: 'Gerentes de Ventas y Fundadores de Startups',
      objective: 'Posicionarnos como expertos en automatización y conseguir llamadas de consultoría'
    });
  };

  const handleGenerate = async () => {
    if (!formData.topic || !formData.audience || !formData.objective) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const data = await generateWebinarPlan(formData);
      setResult(data);
      setStep(2);
    } catch (error) {
      alert('Error al generar el plan. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6 max-w-xl mx-auto py-8">
      <div className="flex justify-end mb-2">
        <button
          onClick={loadExample}
          className="text-xs text-gray-400 hover:text-[#D93F34] flex items-center gap-1.5 transition-colors group"
        >
          <Sparkles className="w-3.5 h-3.5 group-hover:animate-pulse" />
          Probar con un ejemplo
        </button>
      </div>
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Define tu Webinar</h3>
        <p className="text-gray-400 text-sm">Cuéntanos sobre qué quieres hablar y a quién te diriges.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tema del Webinar *</label>
          <div className="relative">
            <Video className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: Cómo duplicar tu tasa de apertura de emails"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Público Objetivo *</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: Directores comerciales de PYMEs tecnológicas"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Objetivo del Webinar *</label>
          <div className="relative">
            <Target className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all resize-none"
              placeholder="Ej: Generar leads cualificados y ofrecer una demo de nuestro software al final"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#D93F34]/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <RefreshCcw className="w-5 h-5 animate-spin" />
            Planificando...
          </>
        ) : (
          <>
            Generar Plan de Webinar
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setStep(1); setResult(null); }}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white line-clamp-1">{result.title}</h2>
            <p className="text-gray-400 text-xs">{result.description}</p>
          </div>
        </div>
        <button
          onClick={() => { setStep(1); setResult(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Nueva planificación
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Mockup Section */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[#D93F34]" />
            Visualización de Landing Page
          </h3>

          <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Browser Header */}
            <div className="bg-[#1A1A1A] px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#D93F34]/40" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto bg-black/40 px-3 py-1 rounded text-[8px] text-white/30 font-mono">webinar.redescomerciales.sales/register</div>
            </div>

            {/* Landing Content Mockup */}
            <div className="p-8 space-y-12 bg-gradient-to-b from-[#0F172A] to-black min-h-[500px]">
              {/* Hero Area */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="inline-block px-3 py-1 bg-[#D93F34]/10 border border-[#D93F34]/20 rounded-full text-[10px] font-bold text-[#D93F34] uppercase tracking-widest">
                  Live Online Workshop
                </span>
                <h1 className="text-2xl font-black text-white leading-tight">
                  {result.title}
                </h1>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Video/Visual Box */}
              <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D93F34]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <PlayCircle className="w-16 h-16 text-[#D93F34]/80" />
                <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#D93F34]" />
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-3 gap-4">
                {['Directo Exclusivo', 'Networking Elite', 'Material Extra'].map((text, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">{text}</div>
                    <div className="h-1 w-8 bg-[#D93F34]/40 mx-auto rounded-full" />
                  </div>
                ))}
              </div>

              {/* Floating Registration Form Placeholder */}
              <div className="absolute top-[40%] right-8 w-48 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl space-y-3 hidden xl:block shadow-2xl">
                <div className="h-4 bg-white/20 rounded w-2/3" />
                <div className="h-8 bg-white/5 rounded w-full" />
                <div className="h-8 bg-white/5 rounded w-full" />
                <div className="h-8 bg-[#D93F34] rounded w-full" />
              </div>
            </div>

            {/* CTA Overlap */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
               <button className="px-8 py-3 bg-[#D93F34] text-white rounded-full font-bold text-xs shadow-xl shadow-[#D93F34]/30 hover:scale-105 transition-transform">
                  Registrarme Ahora
               </button>
               <span className="text-[8px] text-gray-500 font-medium italic">"{result.finalCTA}"</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
              <Presentation className="w-4 h-4 text-[#D93F34]" />
              Guion Estratégico
            </h4>
            <div className="text-xs text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed italic whitespace-pre-wrap">
              {result.hostScript}
            </div>
          </div>
        </div>

        {/* Workflow & Promotion Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#D93F34]" />
              Cronograma Detallado
            </h3>
            <div className="space-y-4">
              {result.agenda.map((item: any, idx: number) => (
                <div key={idx} className="relative pl-6 pb-6 last:pb-0 border-l border-white/10">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#D93F34]/40 group-hover:bg-[#D93F34] transition-colors" />
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono text-[#D93F34] font-bold">{item.time}</span>
                    <h4 className="text-xs text-white font-bold">{item.topic}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Megaphone className="w-5 h-5 text-[#D93F34]" />
              Propagación y Redes
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Estrategia Email</span>
                  <button onClick={() => copyToClipboard(result.promotionIdeas.email, 'promo-email')} className="text-gray-500 hover:text-white">
                    {copiedStates['promo-email'] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 bg-black/40 p-4 rounded-xl border border-white/5">{result.promotionIdeas.email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Fomento Social</span>
                  <button onClick={() => copyToClipboard(result.promotionIdeas.social, 'promo-social')} className="text-gray-500 hover:text-white">
                    {copiedStates['promo-social'] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 bg-black/40 p-4 rounded-xl border border-white/5">{result.promotionIdeas.social}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#D93F34]/5 border border-[#D93F34]/20 rounded-2xl p-6">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4 text-[#D93F34]" />
              Detalle Visual (Mockup)
            </h4>
            <p className="text-xs text-gray-400 italic">
              {result.mockupDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-2">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {renderStep1()}
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
          >
            {renderStep2()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebinarPlannerTool;
