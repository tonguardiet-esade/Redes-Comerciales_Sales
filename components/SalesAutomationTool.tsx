
import React, { useState } from 'react';
import { 
  GitBranch, 
  Copy, 
  RefreshCcw, 
  Check, 
  Zap, 
  Inbox, 
  Clock, 
  BarChart3, 
  ListChecks, 
  Mail, 
  MessageSquare,
  ChevronRight,
  ClipboardCheck,
  MousePointerClick,
  Network
} from 'lucide-react';
import { generateSalesAutomation } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

const SalesAutomationTool: React.FC = () => {
  const [formData, setFormData] = useState({
    leadSource: '',
    businessType: '',
    salesCycle: '1-3 meses'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.leadSource || !formData.businessType) {
      alert('Por favor, rellena los campos iniciales.');
      return;
    }

    setLoading(true);
    try {
      const data = await generateSalesAutomation(formData);
      setResult(data);
    } catch (error) {
      alert('Error al diseñar el flujo. Inténtalo de nuevo.');
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
    <div className="space-y-6 max-w-2xl mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Origen del Lead *</label>
          <div className="relative">
            <Inbox className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="leadSource"
              value={formData.leadSource}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: LinkedIn Ads / Web Form"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Negocio *</label>
          <div className="relative">
            <Network className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: B2B Servicios / E-commerce"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Ciclo de Venta Estimado</label>
        <select
          name="salesCycle"
          value={formData.salesCycle}
          onChange={handleInputChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all appearance-none"
        >
          <option className="text-black" value="< 1 semana">&lt; 1 semana</option>
          <option className="text-black" value="> 1 semana">&gt; 1 semana</option>
          <option className="text-black" value="1-4 semanas">1 - 4 semanas</option>
          <option className="text-black" value="> 1 mes">&gt; 1 mes</option>
          <option className="text-black" value="1-3 meses">1 - 3 meses</option>
          <option className="text-black" value="> 3 meses">&gt; 3 meses</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#D93F34]/20 disabled:opacity-50 group"
      >
        {loading ? (
          <>
            <RefreshCcw className="w-5 h-5 animate-spin" />
            Diseñando Workflow...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Diseñar Automatización
          </>
        )}
      </button>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-[#D93F34]" />
            {result.workflowTitle}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {result.triggers.map((trigger: string, idx: number) => (
              <span key={idx} className="text-[10px] uppercase tracking-wider bg-[#D93F34]/10 text-[#D93F34] px-2 py-0.5 rounded border border-[#D93F34]/20">
                Trigger: {trigger}
              </span>
            ))}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workflow Map */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <ListChecks className="w-4 h-4" />
            Diseño del Flujo (CRM)
          </h3>
          <div className="space-y-0 relative">
            {result.fullFlow.map((step: any, idx: number) => (
              <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                {idx !== result.fullFlow.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-white/10"></div>
                )}
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#D93F34] rounded-full border-4 border-black flex items-center justify-center text-[10px] font-bold text-white">
                  {step.step}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                  <h4 className="text-white font-bold text-sm mb-1">{step.action}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts & Tasks */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Secuencia de Contacto
            </h3>
            <div className="space-y-3">
              {result.contactSequence.map((contact: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    {contact.channel.toLowerCase().includes('email') ? <Mail className="w-4 h-4 text-blue-400" /> : <MessageSquare className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-500">DÍA {contact.day}</span>
                      <span className="text-xs font-medium text-white">{contact.channel}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{contact.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h4 className="text-[10px] font-bold text-[#D93F34] uppercase tracking-widest mb-3">Tareas Auto</h4>
              <ul className="space-y-2">
                {result.automatedTasks.map((task: string, idx: number) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <div className="w-1 h-1 bg-[#D93F34] rounded-full mt-1.5 flex-shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h4 className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-3">Métricas KPI</h4>
              <ul className="space-y-2">
                {result.keyMetrics.map((metric: string, idx: number) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <BarChart3 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => copyToClipboard(JSON.stringify(result, null, 2), 'full-json')}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-white transition-colors"
        >
          {copiedStates['full-json'] ? <ClipboardCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copiar Estructura Completa
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            {renderForm()}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {renderResult()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalesAutomationTool;
