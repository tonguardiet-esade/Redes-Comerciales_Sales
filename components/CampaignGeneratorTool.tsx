
import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  RefreshCcw, 
  Check, 
  Mail, 
  MessageSquare, 
  Phone, 
  Target, 
  Users, 
  Building2, 
  Briefcase, 
  Sparkles,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';
import { generateCampaign } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

const CampaignGeneratorTool: React.FC = () => {
  const [formData, setFormData] = useState({
    companyType: '',
    buyerPersona: '',
    sector: '',
    objective: '',
    channel: 'email',
    tone: 'profesional'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.companyType || !formData.buyerPersona || !formData.sector || !formData.objective) {
      alert('Por favor, rellena todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const data = await generateCampaign(formData);
      setResult(data);
    } catch (error) {
      alert('Ocurrió un error al generar la campaña. Por favor, inténtalo de nuevo.');
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

  const loadExample = () => {
    setFormData({
      companyType: 'Agencia de Marketing Digital',
      sector: 'Publicidad y Marketing',
      buyerPersona: 'Fundadores de Startups Tech en etapa Seed/Series A',
      objective: 'Conseguir 5 demos del nuevo servicio de SEO automatizado',
      channel: 'email',
      tone: 'cercano'
    });
  };

  const renderForm = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-end">
        <button
          onClick={loadExample}
          className="text-xs text-gray-400 hover:text-[#D93F34] flex items-center gap-1.5 transition-colors group"
        >
          <Sparkles className="w-3.5 h-3.5 group-hover:animate-pulse" />
          Probar con un ejemplo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Empresa *</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="companyType"
              value={formData.companyType}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: SaaS de RRHH"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Sector *</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: Tecnología"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Buyer Persona *</label>
        <div className="relative">
          <Users className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            name="buyerPersona"
            value={formData.buyerPersona}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
            placeholder="Ej: Directores de RRHH en empresas +100 empleados"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Objetivo de la Campaña *</label>
        <div className="relative">
          <Target className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
            placeholder="Ej: Concertar 10 reuniones en el mes"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Canal</label>
          <select
            name="channel"
            value={formData.channel}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all appearance-none"
          >
            <option className="text-black" value="email">Email</option>
            <option className="text-black" value="linkedin">LinkedIn</option>
            <option className="text-black" value="cold_calls">Llamadas en frío</option>
            <option className="text-black" value="multicultural">Multicanal</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tono</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all appearance-none"
          >
            <option className="text-black" value="profesional">Profesional</option>
            <option className="text-black" value="cercano">Cercano / Informal</option>
            <option className="text-black" value="autoritario">Autoritario / Directo</option>
            <option className="text-black" value="educativo">Educativo</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#D93F34]/20 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <>
            <RefreshCcw className="w-5 h-5 animate-spin" />
            Generando Estrategia...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Generar Campaña
          </>
        )}
      </button>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{result.campaignTitle}</h2>
          <p className="text-gray-400 mt-1">{result.strategicDescription}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setResult(null)}
            className="p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
            title="Nueva búsqueda"
          >
            <RefreshCcw className="w-5 h-5" />
            Reiniciar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Sequence & Strategy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-[#D93F34]" />
              Hoja de Ruta
            </h3>
            <div className="space-y-3">
              {result.sequence.map((step: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 relative group hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-[#D93F34] text-white text-xs font-bold rounded-full">
                      {step.step}
                    </span>
                    <h4 className="font-bold text-white text-sm leading-tight">{step.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#D93F34]/5 border border-[#D93F34]/20 rounded-2xl p-5">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-[#D93F34]" />
              CTAs Clave
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.recommendedCTAs.map((cta: string, idx: number) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/80"
                >
                  {cta}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: The Visual Mockup */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D93F34]" />
            Vista Previa de la Campaña
          </h3>
          
          {/* Email Mockup */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Email Client v2.0</div>
              <div className="w-10"></div>
            </div>
            
            <div className="p-0">
              <div className="p-6 bg-gray-50 border-b border-gray-100 space-y-3">
                <div className="flex items-center text-xs">
                  <span className="text-gray-400 w-14">De:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#1A3B66] flex items-center justify-center text-[8px] text-white font-bold">VC</div>
                    <span className="text-gray-700 font-semibold">Victor Campos <span className="text-gray-400 font-normal ml-1">victor@redescomerciales.sales</span></span>
                  </div>
                </div>
                <div className="flex items-center text-xs">
                  <span className="text-gray-400 w-14">Para:</span>
                  <span className="text-gray-700">Responsable de Decisiones</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="text-gray-400 w-14">Asunto:</span>
                  <span className="text-[#1A3B66] font-bold">{result.initialEmail.subject}</span>
                </div>
              </div>
              
              <div className="p-8 bg-white min-h-[300px]">
                <div className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed mb-12">
                  {result.initialEmail.body}
                </div>
                
                {/* Signature */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#D93F34]/10 text-[#D93F34]">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1A3B66]">Victor Campos</div>
                    <div className="text-[10px] text-gray-500 font-medium">Head of Sales | Redes Comerciales.Sales</div>
                    <div className="text-[10px] text-[#D93F34] mt-0.5">Transformando equipos en redes de ventas</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => copyToClipboard(`${result.initialEmail.subject}\n\n${result.initialEmail.body}`, 'full-campaign')}
                className="flex items-center gap-2 bg-[#1A3B66] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#2a4d7d] transition-all shadow-sm"
              >
                {copiedStates['full-campaign'] ? <Check className="w-3.5 h-3.5" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
                {copiedStates['full-campaign'] ? 'Copiado' : 'Copiar Campaña Completa'}
              </button>
            </div>
          </div>

          {/* Follow Ups Sidebar Mobile view style */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D93F34]" />
              Secuencia de Seguimiento
            </h4>
            <div className="space-y-4">
              {result.followUps.map((follow: any, idx: number) => (
                <div key={idx} className="relative pl-8 pb-4 last:pb-0 border-l border-white/10">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#D93F34] shadow-[0_0_10px_#D93F34]"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Día {follow.day}</span>
                    <button
                      onClick={() => copyToClipboard(follow.content, `follow-${idx}`)}
                      className="p-1 hover:text-white transition-colors"
                    >
                      {copiedStates[`follow-${idx}`] ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-gray-500" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
                    {follow.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderForm()}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            {renderResult()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampaignGeneratorTool;
