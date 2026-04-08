# 📚 Auto-Libro

Aplicación web completa para la **generación automática de libros mediante IA**. El sistema guía al usuario paso a paso a través de un wizard para construir una escaleta literaria profesional, y luego genera el libro completo capítulo por capítulo usando OpenAI, Google Gemini o Anthropic Claude.

---

## ✨ Características principales

- **Wizard de 8 pasos** para construir una escaleta literaria profesional completa
- **Soporte multi-proveedor de IA**: OpenAI, Google Gemini y Anthropic Claude
- **Generación capítulo a capítulo** con progreso en tiempo real
- **Vista de lectura** del libro generado con navegación por capítulos
- **Exportación DOCX** del libro completo y de la escaleta por separado
- **Persistencia en localStorage**: sin base de datos, todo guardado en el navegador
- **Sin backend propio**: las API keys se configuran en la app y nunca se almacenan en servidor
- Interfaz completamente en **español**
- Diseño **responsive** (mobile-friendly)

---

## 🚀 Instalación y uso

### Requisitos previos

- Node.js 18.17+ 
- npm 9+

### Instalación

```bash
git clone https://github.com/alejandro130alonso-glitch/auto-libro.git
cd auto-libro
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

---

## 🔑 Configuración de API Keys

Las API keys **no se almacenan en el servidor**. Se configuran directamente en el paso 8 del wizard y se guardan solo en el localStorage de tu navegador.

### OpenAI
1. Ve a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Crea una nueva API key
3. Introdúcela en el wizard (Paso 8 - Configuración de IA)
4. Modelos disponibles: `gpt-4o`, `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`

### Google Gemini
1. Ve a [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Crea una API key
3. Introdúcela en el wizard
4. Modelos disponibles: `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-pro`

### Anthropic Claude
1. Ve a [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Crea una API key
3. Introdúcela en el wizard
4. Modelos disponibles: `claude-3-opus-20240229`, `claude-3-sonnet-20240229`, `claude-3-haiku-20240307`

---

## 📖 Flujo completo de la aplicación

```
/ (Landing) → /wizard (8 pasos) → /escaleta (vista y edición) → /generate (generación IA) → /book (lectura) → /export (descarga DOCX)
```

### Los 8 pasos del Wizard

| Paso | Sección | Qué se configura |
|------|---------|------------------|
| 1 | ADN del Libro | Mundo, motor, centro emocional/ideológico, final obligatorio |
| 2 | Personajes y Arcos | Protagonista, antagonista y más personajes con sus arcos |
| 3 | Estructura de Actos | Número de actos, tono, función narrativa, notas editoriales |
| 4 | Capítulos por Acto | Distribución de capítulos, función dramática, giros, cliffhangers |
| 5 | Semillas y Payoffs | Elementos narrativos con siembra y cobro planificados |
| 6 | Aprendizaje Antagonista | Cómo evoluciona la respuesta del antagonista en cada tramo |
| 7 | Líneas Rojas y Checklist | Restricciones de continuidad y reglas de redacción |
| 8 | Configuración de IA | Proveedor, API key, modelo, longitud, idioma y tono |

---

## 🏗️ Estructura de la escaleta

La escaleta está basada en un modelo de escritura profesional real con:

- **ADN del libro**: El núcleo narrativo (mundo, motor, emociones, ideología, final)
- **Arcos de personajes**: Quién es cada personaje y cómo cambia
- **Estructura de actos**: La macrostructura del libro
- **Escaleta por capítulos**: Cada capítulo con función dramática y giro
- **Semillas y payoffs**: Planificación de recursos narrativos
- **Aprendizaje del antagonista**: Cómo el "enemigo" se adapta al protagonista
- **Líneas rojas**: Lo que NUNCA debe ocurrir en la novela
- **Checklist de redacción**: Reglas que cada capítulo debe cumplir

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 14 (App Router) | Framework principal |
| TypeScript | Tipado estricto |
| Tailwind CSS | Estilos |
| `docx` | Generación de archivos .docx |
| `file-saver` | Descargas en el navegador |
| localStorage | Persistencia de datos |
| Fetch nativo | Llamadas a APIs de IA |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Layout con navegación
│   ├── wizard/page.tsx             # Wizard multi-paso (8 pasos)
│   ├── escaleta/page.tsx           # Vista completa de la escaleta
│   ├── generate/page.tsx           # Generación con progreso en tiempo real
│   ├── book/page.tsx               # Vista de lectura del libro
│   ├── export/page.tsx             # Exportación DOCX
│   └── api/
│       ├── generate-chapter/       # API proxy para generación de capítulos
│       └── generate-escaleta/      # API para resumen de escaleta
├── components/
│   ├── wizard/                     # 8 componentes de pasos del wizard
│   ├── Navigation.tsx
│   ├── ProgressBar.tsx
│   ├── EscaletaView.tsx
│   └── BookReader.tsx
├── lib/
│   ├── ai-providers/               # Adaptadores OpenAI, Gemini, Claude
│   ├── prompts/                    # Constructores de prompts
│   ├── docx-generator.ts           # Generación de DOCX
│   ├── storage.ts                  # Utilidades de localStorage
│   └── types.ts                    # Tipos TypeScript
└── hooks/
    ├── useWizardState.ts           # Estado persistente del wizard
    └── useBookGeneration.ts        # Lógica de generación del libro
```

---

## 📄 Licencia

MIT — Libre para uso personal y comercial.
