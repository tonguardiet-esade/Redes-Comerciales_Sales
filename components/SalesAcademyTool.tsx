
import React, { useState } from 'react';
import { 
  GraduationCap, 
  Copy, 
  RefreshCcw, 
  Check, 
  BookOpen, 
  FileText, 
  PlayCircle, 
  MessageSquare, 
  Lightbulb,
  ChevronRight,
  ClipboardCheck,
  TrendingUp,
  BrainCircuit,
  Award
} from 'lucide-react';
import { generateSalesAcademyPlan } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

const SalesAcademyTool: React.FC = () => {
  const [formData, setFormData] = useState({
    level: 'Intermedio',
    salesType: '',
    sector: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.salesType || !formData.sector) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const data = await generateSalesAcademyPlan(formData);
      setResult(data);
    } catch (error) {
      alert('Ocurrió un error al diseñar tu plan de formación.');
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

  const renderForm = () => (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nivel de Ventas</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all appearance-none"
          >
            <option className="text-black" value="Básico">Básico - Recién llegado</option>
            <option className="text-black" value="Intermedio">Intermedio - Con experiencia</option>
            <option className="text-black" value="Avanzado">Avanzado - Senior / Manager</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Venta *</label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="salesType"
              value={formData.salesType}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: Consultiva, B2B, SaaS, Retail"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Sector *</label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
            placeholder="Ej: Real Estate, Finanzas, Tecnología, Pharma"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#D93F34]/20 disabled:opacity-50"
      >
        {loading ? (
          <>
            <BrainCircuit className="w-5 h-5 animate-spin" />
            Generando Academia...
          </>
        ) : (
          <>
            <GraduationCap className="w-5 h-5" />
            Empezar Formación
          </>
        )}
      </button>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D93F34]/10 rounded-lg">
            <Award className="w-6 h-6 text-[#D93F34]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{result.academyTitle}</h2>
            <p className="text-gray-400 text-sm">Ruta de aprendizaje personalizada: {formData.level}</p>
          </div>
        </div>
        <button
          onClick={() => setResult(null)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Regenerar"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D93F34]" />
              <h3 className="font-bold text-white text-lg">Módulos de Aprendizaje</h3>
            </div>
            <div className="p-6 space-y-4">
              {result.learningPlan.map((m: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D93F34]/10 rounded-full flex items-center justify-center text-[#D93F34] font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{m.module}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#D93F34]" />
                Ejercicios Prácticos
              </h3>
              <div className="space-y-4">
                {result.exercises.map((ex: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs font-bold text-[#D93F34] uppercase">{ex.title}</p>
                    <p className="text-sm text-gray-300 italic">"{ex.description}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#D93F34]" />
                Consejos Expertos
              </h3>
              <ul className="space-y-2">
                {result.expertTips.map((tip: string, idx: number) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#D93F34] rounded-full mt-1.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar: Scripts & Simulation */}
        <div className="space-y-6">
          <div className="bg-[#D93F34]/5 border border-[#D93F34]/20 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D93F34]" />
              Scripts Destacados
            </h3>
            <div className="space-y-4">
              {result.salesScripts.map((s: any, idx: number) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{s.title}</p>
                    <button onClick={() => copyToClipboard(s.text, `script-${idx}`)} className="text-gray-500 hover:text-white">
                      {copiedStates[`script-${idx}`] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg text-xs text-gray-300 italic border border-white/5">
                    {s.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <MessageSquare className="w-24 h-24 text-white" />
             </div>
             <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#D93F34]" />
                Simulación
             </h3>
             <p className="text-[10px] text-gray-500 mb-4">{result.simulation.scenario}</p>
             <div className="space-y-3">
                {result.simulation.dialogue.map((d: any, idx: number) => (
                   <div key={idx} className={`p-2 rounded-lg text-xs ${d.speaker === 'Cliente' ? 'bg-white/5 text-gray-300 mr-4' : 'bg-[#D93F34]/10 text-white ml-4 border-l-2 border-[#D93F34]'}`}>
                      <span className="font-bold block text-[9px] uppercase opacity-50 mb-0.5">{d.speaker}</span>
                      {d.text}
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-white/5 to-transparent p-6 rounded-2xl flex items-center justify-between">
         <p className="text-sm text-gray-400">¿Necesitas practicar más? Puedes regenerar la lección para nuevos escenarios.</p>
         <button
            onClick={() => setResult(null)}
            className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
         >
            Nuevos Parámetros
         </button>
      </div>
    </div>
  );

  return (
    <div className="py-2">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            {renderForm()}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
          >
            {renderResult()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalesAcademyTool;
