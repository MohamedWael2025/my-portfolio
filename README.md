# Mohamed Wael's Portfolio

A comprehensive full-stack portfolio website showcasing 5 production-ready demo projects built with modern web technologies.

🌐 **Live Demo**: [itsmohamedwael.info](https://itsmohamedwael.info)

## 🚀 Features

### Main Portfolio
- Modern, responsive design with dark/light mode
- Animated hero section with typewriter effect
- Interactive project showcase
- Contact form with validation
- SEO optimized

### Demo Projects

1. **AI-Powered E-Commerce Platform**
   - Product catalog with search and filters
   - AI-powered recommendations using Hugging Face
   - Shopping cart with real-time updates
   - User authentication (JWT)
   - Checkout flow

2. **SaaS Task Manager**
   - Kanban board with drag-and-drop
   - Project and team management
   - Multiple views (Board, List, Calendar)
   - Real-time collaboration ready
   - Priority and status tracking

3. **AI Resume Analyzer**
   - Drag-and-drop file upload
   - AI-powered resume analysis
   - Scoring across multiple categories
   - Keyword extraction and suggestions
   - ATS compatibility check

4. **Admin Analytics Dashboard**
   - Interactive charts with Recharts
   - Revenue and visitor analytics
   - Real-time data visualization
   - Export functionality
   - Traffic source breakdown

5. **C++ Developer Tools Hub**
   - Code formatter (Google Style)
   - Static analyzer/linter
   - Complexity analysis
   - Online compiler simulation
   - Performance suggestions

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database ORM**: Prisma
- **MongoDB**: Mongoose
- **Authentication**: JWT (jose)

### AI Integration
- **Provider**: Hugging Face Inference API
- **Features**: 
  - Text generation & summarization
  - Sentiment analysis
  - Product recommendations
  - Resume analysis

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   ├── products/           # Product CRUD
│   │   │   ├── cart/               # Cart management
│   │   │   ├── tasks/              # Task management
│   │   │   ├── resume/             # Resume analysis
│   │   │   ├── cpp-tools/          # C++ tools API
│   │   │   ├── analytics/          # Analytics data
│   │   │   └── contact/            # Contact form
│   │   ├── ai-powered-ecommerce/   # E-commerce demo
│   │   ├── saas-task-manager/      # Task manager demo
│   │   ├── ai-resume-analyzer/     # Resume analyzer demo
│   │   ├── admin-dashboard/        # Analytics dashboard
│   │   ├── cpp-dev-tools/          # C++ tools demo
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   └── layout/                 # Layout components
│   └── lib/
│       ├── utils.ts                # Utility functions
│       ├── prisma.ts               # Database client
│       ├── mongodb.ts              # MongoDB connection
│       ├── huggingface.ts          # AI integration
│       └── auth.ts                 # Authentication helpers
├── prisma/
│   └── schema.prisma               # Database schema
├── public/                         # Static assets
└── ...config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- PostgreSQL (optional, for full database features)
- MongoDB (optional, for e-commerce features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**
   
   Edit `.env.local` with your values:
   ```env
   # Database (optional - demos work without it)
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
   MONGODB_URI="mongodb://localhost:27017/portfolio"

   # Authentication
   JWT_SECRET="your-super-secret-key-min-32-chars"

   # Hugging Face AI (optional - demos have fallback)
   HUGGINGFACE_API_KEY="hf_xxxxxxxxxxxxxxxxxxxxx"
   ```

5. **Database Setup (Optional)**
   
   If using PostgreSQL:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Run Development Server**
   ```bash
   npm run dev
   ```

7. **Open in Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### Hugging Face API (For AI Features)

1. Create account at [huggingface.co](https://huggingface.co)
2. Go to Settings → Access Tokens
3. Create new token with "Read" permissions
4. Add to `.env.local`:
   ```
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
   ```

**Note**: All demos work without API keys using mock data. API keys enable real AI features.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel (Recommended)
```bash
npx vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

### Environment Variables for Production

Set these in your deployment platform:
- `DATABASE_URL` - PostgreSQL connection string
- `MONGODB_URI` - MongoDB connection string  
- `JWT_SECRET` - Secure random string (32+ chars)
- `HUGGINGFACE_API_KEY` - Your HF API key
- `NEXTAUTH_URL` - Your production URL

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize colors:
```ts
theme: {
  extend: {
    colors: {
      primary: { ... },
      accent: { ... },
    }
  }
}
```

### Personal Information
Update your info in:
- `src/app/page.tsx` - Hero section, about, contact
- `src/app/layout.tsx` - Metadata
- `src/components/layout/navbar.tsx` - Logo
- `src/components/layout/footer.tsx` - Social links

## 📱 Contact

- **Email**: contact@itsmohamedwael.info
- **Phone**: +201212549545
- **Twitter**: [@its_mohamedwael](https://twitter.com/its_mohamedwael)
- **LinkedIn**: [Mohamed Wael](https://linkedin.com/in/mohamedwael)
- **GitHub**: [mohamedwael](https://github.com/mohamedwael)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Mohamed Wael

**Roles**: Software Engineer | Full-Stack Developer | Graphic Designer | C++ Programmer | AI Developer
