
import { GoogleGenAI } from "@google/genai";

// Lazy initialization: only create the client when actually needed.
// This prevents a missing GEMINI_API_KEY from breaking the entire app at load time.
let _ai: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (_ai) return _ai;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY no está configurada. Añádela en Vercel (Settings → Environment Variables) y vuelve a desplegar."
    );
  }
  _ai = new GoogleGenAI({ apiKey });
  return _ai;
}

export async function generateCampaign(params: {
  companyType: string;
  buyerPersona: string;
  sector: string;
  objective: string;
  channel: string;
  tone: string;
}) {
  const prompt = `
    Crea una herramienta interactiva de generación de campañas de marketing outbound.
    
    Teniendo en cuenta estos datos:
    - Tipo de empresa: ${params.companyType}
    - Buyer Persona: ${params.buyerPersona}
    - Sector: ${params.sector}
    - Objetivo de campaña: ${params.objective}
    - Canal: ${params.channel}
    - Tono de comunicación: ${params.tone}
    
    Genera automáticamente en formato JSON:
    1. Propuesta de campaña completa (título, descripción estratégica)
    2. Secuencia de mensajes (mínimo 3 pasos)
    3. Ejemplo de email inicial
    4. Mensajes de seguimiento (mínimo 2)
    5. CTA recomendados
    
    Responde ÚNICAMENTE con un objeto JSON válido que tenga esta estructura:
    {
      "campaignTitle": "...",
      "strategicDescription": "...",
      "sequence": [
        {"step": 1, "title": "...", "content": "..."},
        {"step": 2, "title": "...", "content": "..."},
        {"step": 3, "title": "...", "content": "..."}
      ],
      "initialEmail": {
        "subject": "...",
        "body": "..."
      },
      "followUps": [
        {"day": 3, "content": "..."},
        {"day": 7, "content": "..."}
      ],
      "recommendedCTAs": ["...", "...", "..."]
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar el contenido");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating campaign:", error);
    throw error;
  }
}

export async function generateAIAssistant(params: {
  role: string;
  tone: string;
  language: string;
  objective: string;
}) {
  const prompt = `
    Crea un asistente de IA personalizado para marketing.
    
    Datos del asistente:
    - Rol: ${params.role}
    - Tono: ${params.tone}
    - Idioma: ${params.language}
    - Objetivo: ${params.objective}
    
    Genera automáticamente en formato JSON:
    1. Prompt base del asistente listo para usar (instrucciones detalladas de comportamiento)
    2. Instrucciones de uso
    3. Ejemplos de preguntas y respuestas (mínimo 3)
    4. Un ejemplo de texto real (post, email o mensaje) generado por este asistente basado en el objetivo, usando el tono seleccionado.
    
    Responde ÚNICAMENTE con un objeto JSON válido que tenga esta estructura:
    {
      "assistantName": "...",
      "basePrompt": "...",
      "usageInstructions": "...",
      "sampleContent": "...",
      "examples": [
        {"q": "...", "a": "..."}
      ]
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar el asistente");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating assistant:", error);
    throw error;
  }
}

export async function generateSalesAutomation(params: {
  leadSource: string;
  businessType: string;
  salesCycle: string;
}) {
  const prompt = `
    Crea una herramienta para diseñar automatizaciones de ventas y seguimiento de leads.
    
    Datos:
    - Origen del lead: ${params.leadSource}
    - Tipo de negocio: ${params.businessType}
    - Duración del ciclo de venta: ${params.salesCycle}
    
    Genera automáticamente en formato JSON:
    1. Flujo de automatización completo (pasos lógicos tipo CRM)
    2. Secuencia de contactos (emails + LinkedIn)
    3. Tareas automatizadas recomendadas
    4. Triggers (disparadores de la automatización)
    5. Métricas a medir (KPIs)
    
    Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
    {
      "workflowTitle": "...",
      "triggers": ["...", "..."],
      "fullFlow": [
        {"step": 1, "action": "...", "description": "..."}
      ],
      "contactSequence": [
        {"day": 1, "channel": "Email/LinkedIn", "purpose": "..."}
      ],
      "automatedTasks": ["...", "..."],
      "keyMetrics": ["...", "..."]
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar la automatización");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating sales automation:", error);
    throw error;
  }
}

export async function generateWebinarPlan(params: {
  topic: string;
  audience: string;
  objective: string;
}) {
  const prompt = `
    Crea una planificación completa para un webinar de inbound marketing.
    
    Datos:
    - Tema: ${params.topic}
    - Público Objetivo: ${params.audience}
    - Objetivo: ${params.objective}
    
    Genera automáticamente en formato JSON:
    1. Título atractivo del webinar
    2. Descripción corta y persuasiva
    3. Estructura completa (agenda con tiempos)
    4. Guion resumido del presentador (puntos clave)
    5. Ideas de promoción (para email y redes sociales)
    6. CTA final sugerido
    7. Descripción visual del mockup de la landing page (elementos clave, layout)
    
    Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
    {
      "title": "...",
      "description": "...",
      "mockupDescription": "...",
      "agenda": [
        {"time": "00:00 - 05:00", "topic": "..."},
        {"time": "05:00 - 25:00", "topic": "..."},
        {"time": "25:00 - 40:00", "topic": "..."},
        {"time": "40:00 - 45:00", "topic": "..."}
      ],
      "hostScript": "...",
      "promotionIdeas": {
        "email": "...",
        "social": "..."
      },
      "finalCTA": "..."
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar el plan del webinar");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating webinar plan:", error);
    throw error;
  }
}

export async function generateSalesAcademyPlan(params: {
  level: string;
  salesType: string;
  sector: string;
}) {
  const prompt = `
    Crea una herramienta de formación en ventas personalizada.
    
    Datos del alumno:
    - Nivel: ${params.level}
    - Tipo de venta: ${params.salesType}
    - Sector: ${params.sector}
    
    Genera automáticamente en formato JSON:
    1. Plan de aprendizaje estructurado (mínimo 3 módulos)
    2. Scripts de ventas (ejemplos adaptados al sector)
    3. Ejercicios prácticos (paso a paso)
    4. Simulación de conversación con cliente (tú eres el cliente, dame un ejemplo de diálogo)
    5. Consejos personalizados
    
    Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
    {
      "academyTitle": "...",
      "learningPlan": [
        {"module": "...", "content": "..."}
      ],
      "salesScripts": [
        {"title": "...", "text": "..."}
      ],
      "exercises": [
        {"title": "...", "description": "..."}
      ],
      "simulation": {
        "scenario": "...",
        "dialogue": [
          {"speaker": "Cliente", "text": "..."},
          {"speaker": "Vendedor (Tú)", "text": "..."}
        ]
      },
      "expertTips": ["...", "..."]
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar la academia de ventas");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating sales academy plan:", error);
    throw error;
  }
}

export async function generateDataRoomPlan(params: {
  companyType: string;
  productService: string;
}) {
  const prompt = `
    Crea una herramienta para organizar un Data Room de ventas profesional.
    
    Datos:
    - Tipo de empresa: ${params.companyType}
    - Producto/Servicio: ${params.productService}
    
    Genera automáticamente en formato JSON:
    1. Estructura de carpetas recomendada (organizada jerárquicamente)
    2. Lista de documentos necesarios por carpeta (ej: PPT comercial, FAQs técnicas, Casos de éxito)
    3. Plantillas de contenido (breves descripciones de qué debe incluir cada documento clave)
    4. Guía de uso para el equipo comercial (cómo presentar esto al cliente)
    
    Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
    {
      "dataRoomTitle": "...",
      "folderStructure": [
        {
          "folderName": "...",
          "documents": [
            {"name": "...", "description": "..."}
          ]
        }
      ],
      "templates": [
        {"document": "...", "structure": "..."}
      ],
      "usageGuide": ["...", "..."]
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar el plan del Data Room");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating data room plan:", error);
    throw error;
  }
}
