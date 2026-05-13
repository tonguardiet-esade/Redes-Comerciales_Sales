# Redes Comerciales.Sales

A modern, multi-language landing page and specialized toolset for **Redes Comerciales.Sales**. This platform offers a suite of interactive tools designed to boost sales and marketing efforts, from lead generation and sales automation to AI-assisted content creation.

## 🚀 Features

- **Multi-language Support**: Seamless switching between English, Spanish, Catalan, French, Italian, and German.
- **AI-Powered Tools**: Integration with Gemini AI for sales assistance and campaign generation.
- **Sales Toolkit**:
  - Sales Automation Tool
  - Webinar Planner
  - Data Room Management
  - Campaign Generator
  - Sales Academy
- **Responsive Design**: Polished UI built with Tailwind CSS and Motion for a premium user experience.
- **Authentication**: Secure login integration via Supabase.
- **Theme Support**: Dark and Light mode options.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **AI**: [Google Gemini Pro API (@google/genai)](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` folder.

## 📄 License

This project is licensed under the MIT License.
