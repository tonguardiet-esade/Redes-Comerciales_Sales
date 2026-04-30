-- IMPLEMENTACIÓN DE PERSISTENCIA SALESWIN HOME (SW-SalesWin_Home)
-- Esquema: SalesWin

-- 1. Crear el esquema si no existe
CREATE SCHEMA IF NOT EXISTS "SalesWin";

-- 2. Limpieza e Inicialización
DROP TABLE IF EXISTS "SalesWin"."SW-SalesWin_Home_projects";

-- 3. Creación de la Tabla Principal
CREATE TABLE "SalesWin"."SW-SalesWin_Home_projects" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL, -- Vínculo estricto con la Entidad (Auth)
    
    -- Metadatos de identificación
    project_name TEXT DEFAULT 'SalesWin Dashboard',
    current_step SMALLINT DEFAULT 1,

    -- Control Temporal
    last_modified TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),

    -- Contenedor de Datos Flexible (Configuraciones, Estado del Dashboard, etc.)
    project_data JSONB DEFAULT '{
        "settings": {
            "language": "es",
            "theme": "light"
        },
        "metadata": {
            "version": "1.0",
            "source": "SalesWin Home"
        }
    }'::jsonb
);

-- 4. Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE "SalesWin"."SW-SalesWin_Home_projects" ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Seguridad (CRUD Blindado por Schema)
-- Solo el propietario puede ver sus registros
CREATE POLICY "Lectura propia Home" 
ON "SalesWin"."SW-SalesWin_Home_projects" 
FOR SELECT 
USING (auth.uid() = user_id);

-- Solo el propietario puede crear registros para sí mismo
CREATE POLICY "Inserción propia Home" 
ON "SalesWin"."SW-SalesWin_Home_projects" 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Solo el propietario puede actualizar sus registros
CREATE POLICY "Actualización propia Home" 
ON "SalesWin"."SW-SalesWin_Home_projects" 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Solo el propietario puede borrar sus registros
CREATE POLICY "Borrado propio Home" 
ON "SalesWin"."SW-SalesWin_Home_projects" 
FOR DELETE 
USING (auth.uid() = user_id);

-- 6. Automatización de Tiempos
-- Requiere la extensión moddatetime (generalmente en public o extensions)
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at_home 
BEFORE UPDATE ON "SalesWin"."SW-SalesWin_Home_projects"
FOR EACH ROW EXECUTE PROCEDURE extensions.moddatetime (last_modified);