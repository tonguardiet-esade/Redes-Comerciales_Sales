
import React, { useState } from 'react';
import { 
  FolderLock, 
  Copy, 
  RefreshCcw, 
  Check, 
  Folder, 
  FileText, 
  BookOpen, 
  Info, 
  ChevronRight, 
  ChevronDown,
  ClipboardCheck,
  Building2,
  Package,
  Layers
} from 'lucide-react';
import { generateDataRoomPlan } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

const DataRoomTool: React.FC = () => {
  const [formData, setFormData] = useState({
    companyType: '',
    productService: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.companyType || !formData.productService) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const data = await generateDataRoomPlan(formData);
      setResult(data);
      // Expand all by default
      const initialExpanded: Record<string, boolean> = {};
      data.folderStructure.forEach((f: any) => {
        initialExpanded[f.folderName] = true;
      });
      setExpandedFolders(initialExpanded);
    } catch (error) {
      alert('Error al organizar el Data Room. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (name: string) => {
    setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const renderForm = () => (
    <div className="space-y-6 max-w-xl mx-auto py-8">
      <div className="grid grid-cols-1 gap-6">
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
              placeholder="Ej: Startup B2B SaaS, Consultoría de IT"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Producto o Servicio *</label>
          <div className="relative">
            <Package className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="productService"
              value={formData.productService}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D93F34] transition-all"
              placeholder="Ej: Software de gestión de proyectos, Auditoría financiera"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#D93F34]/20 disabled:opacity-50"
      >
        {loading ? (
          <>
            <RefreshCcw className="w-5 h-5 animate-spin" />
            Estructurando Datos...
          </>
        ) : (
          <>
            <Layers className="w-5 h-5" />
            Generar Estructura Data Room
          </>
        )}
      </button>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D93F34]/10 rounded-lg">
            <FolderLock className="w-6 h-6 text-[#D93F34]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{result.dataRoomTitle}</h2>
            <p className="text-gray-400 text-sm">Repositorio estructurado para el equipo comercial</p>
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
        {/* Repository View */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Estructura de Carpetas
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
            {result.folderStructure.map((folder: any, idx: number) => (
              <div key={idx} className="group">
                <button 
                  onClick={() => toggleFolder(folder.folderName)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder className={`w-5 h-5 ${expandedFolders[folder.folderName] ? 'text-[#D93F34]' : 'text-gray-500'}`} />
                    <span className="text-sm font-bold text-white">{folder.folderName}</span>
                  </div>
                  {expandedFolders[folder.folderName] ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                </button>
                <AnimatePresence>
                  {expandedFolders[folder.folderName] && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-black/20"
                    >
                      <div className="p-4 space-y-3 ml-8 border-l border-white/10">
                        {folder.documents.map((doc: any, dIdx: number) => (
                          <div key={dIdx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-300 font-medium">{doc.name}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 ml-5">{doc.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Content & Guide */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D93F34]" />
              Plantillas de Contenido
            </h3>
            <div className="space-y-4">
              {result.templates.map((tpl: any, idx: number) => (
                <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <h4 className="text-white text-xs font-bold mb-1">{tpl.document}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed italic">{tpl.structure}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#D93F34]/5 border border-[#D93F34]/20 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-[#D93F34] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Guía para el Equipo Sales
            </h3>
            <ul className="space-y-3">
              {result.usageGuide.map((guide: string, idx: number) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#D93F34] rounded-full mt-1.5 flex-shrink-0" />
                  {guide}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-transparent p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-white font-bold text-sm">¿Deseas exportar la estructura?</h4>
          <p className="text-gray-500 text-xs mt-1">Copia la lista completa de carpetas y documentos para tu equipo.</p>
        </div>
        <button
          onClick={() => copyToClipboard(JSON.stringify(result.folderStructure, null, 2), 'export-room')}
          className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all border border-white/10"
        >
          {copiedStates['export-room'] ? <ClipboardCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedStates['export-room'] ? '¡Copiado!' : 'Copiar Estructura JSON'}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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

export default DataRoomTool;
