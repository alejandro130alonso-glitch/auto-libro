# 📚 Auto-Libro

Aplicación web para la **generación automática de libros** mediante IA, usando una escaleta literaria profesional como guía narrativa.

## 🚀 Instalación

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📋 Flujo del proceso

1. **Wizard** (`/wizard`) → Completa los 8 pasos para construir tu escaleta
2. **Escaleta** (`/escaleta`) → Revisa la estructura narrativa completa
3. **Generar** (`/generate`) → La IA genera el libro capítulo a capítulo
4. **Leer** (`/book`) → Lee el libro generado con navegación por capítulos
5. **Exportar** (`/export`) → Descarga el libro y la escaleta en formato DOCX

## 🤖 Configuración de APIs de IA

La aplicación soporta tres proveedores. Las claves se configuran en el **Paso 8 del wizard** y se guardan solo en tu navegador (localStorage).

### OpenAI (GPT-4, GPT-4o)
1. Ve a [platform.openai.com](https://platform.openai.com/api-keys)
2. Crea una API key
3. Cópiala en el wizard (comienza con `sk-`)

### Google Gemini
1. Ve a [makersuite.google.com](https://makersuite.google.com/app/apikey)
2. Crea una API key
3. Cópiala en el wizard (comienza con `AIza`)

### Anthropic Claude
1. Ve a [console.anthropic.com](https://console.anthropic.com/)
2. Crea una API key
3. Cópiala en el wizard (comienza con `sk-ant-`)

## 📖 Estructura de la Escaleta

| Paso | Sección | Descripción |
|------|---------|-------------|
| 1 | **ADN del Libro** | Mundo, motor, centros emocional e ideológico, final |
| 2 | **Personajes** | Arcos, funciones narrativas, voces |
| 3 | **Actos** | Estructura en bloques, tonos, funciones |
| 4 | **Capítulos** | Función dramática, giro, cliffhanger por capítulo |
| 5 | **Semillas** | Elementos narrativos que se siembran y cobran |
| 6 | **Antagonista** | Aprendizaje adaptativo del sistema enemigo |
| 7 | **Líneas Rojas** | Restricciones y checklist de redacción |
| 8 | **Config IA** | Proveedor, modelo, palabras/capítulo, tono |

## 🛠️ Tecnologías

- **Next.js 14+** con App Router
- **TypeScript** estricto
- **Tailwind CSS**
- **docx** — Generación de archivos Word
- **file-saver** — Descarga en el navegador
- APIs REST directas a OpenAI, Google Gemini y Anthropic Claude

## 🔒 Privacidad

Todo se guarda en **localStorage** de tu navegador. No hay base de datos ni servidor de almacenamiento. Las API keys nunca salen de tu dispositivo excepto para llamar directamente a las APIs de IA.
