
import React, { useState } from 'react';
import { 
  Bot, 
  Copy, 
  RefreshCcw, 
  Check, 
  MessageSquare, 
  Globe, 
  Target, 
  UserCircle, 
  Sparkles,
  ChevronRight,
  ClipboardCheck,
  Zap,
  Terminal
} from 'lucide-react';
import { generateAIAssistant } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

const AIAssistantTool: React.FC = () => {
  const [formData, setFormData] = useState({
    role: '',
    tone: 'profesional',
    language: 'español',
    objective: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadExample = () => {
    setFormData({
      role: 'Head of Growth para B2B SaaS',
      tone: 'persuasivo',
      language: 'español',
      objective: 'Crear una serie de posts de LinkedIn sobre los retos de la prospección automatizada en 2024'
    });
  };

  const handleGenerate = async () => {
    if (!formData.role || !formData.objective) {
      alert('Por favor, rellena todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const data = await generateAIAssistant(formData);
      setResult(data);
    } catch (error) {
      alert('Ocurrió un error al generar el asistente. Por favor, inténtalo de nuevo.');
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
          <label className="block text-sm font-medium text-gray-300 mb-1">Rol del Asistente *</label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: Copywriter Experto en SaaS"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Idioma</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all appearance-none"
            >
              <option className="text-black" value="español">Español</option>
              <option className="text-black" value="inglés">Inglés</option>
              <option className="text-black" value="catalán">Catalán</option>
              <option className="text-black" value="francés">Francés</option>
              <option className="text-black" value="alemán">Alemán</option>
              <option className="text-black" value="italiano">Italiano</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Objetivo del Asistente *</label>
        <div className="relative">
          <Target className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all resize-none"
            placeholder="Ej: Ayudar al equipo de ventas a redactar emails de seguimiento ultra-personalizados"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Tono de Comunicación</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['profesional', 'cercano', 'directo', 'creativo'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, tone: t }))}
              className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                formData.tone === t 
                  ? 'bg-[#D93F34] border-[#D93F34] text-white shadow-lg shadow-[#D93F34]/20' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {t.charAt(0) + t.slice(1)}
            </button>
          ))}
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
            Configurando Neuronas...
          </>
        ) : (
          <>
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Construir Asistente
          </>
        )}
      </button>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D93F34]/10 rounded-lg">
            <Zap className="w-6 h-6 text-[#D93F34]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{result.assistantName}</h2>
            <p className="text-gray-400 text-sm">Asistente listo para ser desplegado</p>
          </div>
        </div>
        <button
          onClick={() => setResult(null)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Redefinir"
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base Prompt */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#D93F34]" />
              Prompt de Configuración
            </h3>
            <button
              onClick={() => copyToClipboard(result.basePrompt, 'base-prompt')}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
            >
              {copiedStates['base-prompt'] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copiar Prompt
            </button>
          </div>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 font-mono text-xs leading-relaxed text-gray-300 max-h-[400px] overflow-y-auto custom-scrollbar">
            {result.basePrompt}
          </div>
        </div>

        {/* Sample Output & Usage */}
        <div className="space-y-6">
          {result.sampleContent && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-[#D93F34]/10 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D93F34]" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">Resultado del Tono {formData.tone}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(result.sampleContent, 'sample-content')}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedStates['sample-content'] ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="p-6 bg-[#050505]/40 italic text-sm text-gray-300 leading-relaxed border-b border-white/5">
                "{result.sampleContent}"
              </div>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-[#D93F34]" />
              Instrucciones de Uso
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {result.usageInstructions}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D93F34]" />
              Ejemplos de Interacción
            </h3>
            <div className="space-y-3">
              {result.examples.map((ex: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-[#D93F34] font-bold text-xs mt-1">Q:</span>
                    <p className="text-sm text-white font-medium">{ex.q}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 font-bold text-xs mt-1">A:</span>
                    <p className="text-sm text-gray-400 italic">"{ex.a}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#D93F34]/20 to-transparent border border-[#D93F34]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-white font-bold mb-1">Copia la configuración completa</h4>
          <p className="text-gray-400 text-xs">Copia el prompt y las instrucciones para configurar tu herramienta de IA favorita.</p>
        </div>
        <button
          onClick={() => copyToClipboard(`ASISTENTE: ${result.assistantName}\n\nPROMPT:\n${result.basePrompt}\n\nINSTRUCCIONES:\n${result.usageInstructions}`, 'full-assistant')}
          className="flex items-center gap-3 px-6 py-3 bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#D93F34]/20 whitespace-nowrap"
        >
          {copiedStates['full-assistant'] ? <ClipboardCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copiedStates['full-assistant'] ? '¡Copiado con éxito!' : 'Copiar Asistente Completo'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
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

export default AIAssistantTool;
