# TeamSynapse - AI Portfolio Website

A stunning, modern portfolio website for a student tech team working on offline LLM solutions for farmers in rural India. Built with **Next.js 16**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS** for maximum performance and visual impact.

## ✨ What Makes This Version Special

This is a **completely rebuilt version** using modern web technologies:

🎯 **Next.js 16 (Turbopack)** - Lightning-fast builds and hot reload
🎨 **React Three Fiber** - Stunning 3D graphics with Three.js
🎭 **Framer Motion** - Silky smooth animations and transitions
⚡ **Tailwind CSS** - Modern, utility-first styling
🚀 **TypeScript** - Type-safe development
📦 **Component-Based** - Clean, maintainable architecture

## 🌟 Features

### 🎨 Design & Animations
- **3D Neural Network Hero**: Interactive 3D particle system with animated spheres
- **Glassmorphism UI**: Beautiful frosted glass effects throughout
- **Gradient Magic**: Smooth transitions between blue, purple, and cyan
- **Micro-Interactions**: Hover effects, scale transforms, and 3D card tilts
- **Scroll Animations**: Elements fade and slide in as you scroll
- **Responsive Design**: Perfect on all devices from mobile to 4K displays

### 🔥 Advanced Visual Effects
- **3D Self-Attention Network**: Rotating neural network with 1000+ animated particles
- **Holographic Cards**: 3D perspective transforms on team cards
- **Gradient Blob Backgrounds**: Animated floating orbs
- **Particle Systems**: WebGL-powered particle effects
- **Auto-Rotating Camera**: Smooth orbital controls
- **Ripple Effects**: Interactive button animations
- **Success Modals**: Animated form submission feedback

### 📱 Sections

#### Hero
- Full-screen 3D animated neural network background
- Gradient text with glow effects
- Animated CTA button
- Smooth scroll indicator

#### About
- 6 animated feature cards with glassmorphism
- Interactive transformer architecture diagram
- Scroll-triggered animations
- Hover scale effects

#### Projects
- 6 project cards with unique gradient colors
- Rotating icons on hover
- Animated "Learn More" buttons
- Glassmorphic design

#### Team
- 6 team member cards with 3D tilt effects
- Holographic overlay animations
- Animated gradient borders
- Social media links

#### Contact
- Interactive form with real-time validation
- Animated input focus effects
- Success modal with particle effects
- Social media links

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/IntrosWorld/TeamSynapse.git
cd TeamSynapse
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
TeamSynapse/
├── app/
│   ├── globals.css         # Global styles with Tailwind
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page with all sections
├── components/
│   ├── Hero.tsx            # 3D hero section with Three.js
│   ├── Navbar.tsx          # Responsive navigation
│   ├── About.tsx           # About section with features
│   ├── Projects.tsx        # Project cards
│   ├── Team.tsx            # Team members with 3D effects
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer component
├── old_static_site/        # Original HTML/CSS/JS version (backup)
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Update Team Members
Edit `/components/Team.tsx`:
```typescript
const teamMembers = [
  { id: 1, name: 'Your Name', role: 'Your Role', color: 'from-blue-500 to-cyan-500' },
  // Add more members...
]
```

### Update Projects
Edit `/components/Projects.tsx`:
```typescript
const projects = [
  {
    icon: '🤖',
    title: 'Your Project',
    description: 'Your description...',
    color: 'from-blue-500 to-cyan-500',
  },
]
```

### Customize Colors
Edit `/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      accent: {
        blue: '#00d4ff',
        purple: '#8b5cf6',
        cyan: '#06b6d4',
      },
    },
  },
}
```

### Modify 3D Scene
Edit `/components/Hero.tsx` to adjust:
- Particle count (default: 1000)
- Camera position
- Sphere distortion
- Rotation speed
- Colors and lighting

## 🔧 Tech Stack

### Core
- **Next.js 16** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety

### Animations & 3D
- **Framer Motion** - Advanced animations
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for R3F
- **Three.js** - 3D graphics library

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **PostCSS** - CSS transformations
- **Autoprefixer** - Browser compatibility

## ⚡ Performance

- **Server Components**: Optimized rendering with RSC
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js image optimization
- **Turbopack**: 700x faster than Webpack
- **60 FPS**: Smooth animations throughout
- **WebGL**: Hardware-accelerated 3D graphics
- **Suspense**: Lazy loading for 3D components

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## 🎯 Browser Support

- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile Browsers**: iOS 14+, Android 90+

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Three.js Errors
If you see WebGL errors, ensure your browser supports WebGL 2.0:
```
chrome://gpu/
```

### Build Errors
Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Port Already in Use
Change the port:
```bash
PORT=3001 npm run dev
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or collaboration:
- **Email**: contact@teamsynapse.tech
- **GitHub**: [TeamSynapse](https://github.com/IntrosWorld/TeamSynapse)
- **Website**: [teamsynapse.tech](https://teamsynapse.tech)

---

## 🎉 What Changed from Previous Version?

### Before (Static HTML/CSS/JS)
- ✅ Pure HTML/CSS/JS
- ✅ 2D Canvas animations
- ✅ No build process
- ❌ Limited animations
- ❌ No component reusability
- ❌ Manual state management

### Now (Next.js + React)
- ✅ **React components** for better organization
- ✅ **3D animations** with Three.js
- ✅ **Framer Motion** for advanced animations
- ✅ **TypeScript** for type safety
- ✅ **Hot reload** for instant development
- ✅ **Code splitting** for better performance
- ✅ **Server-side rendering** for SEO
- ✅ **Better performance** with Turbopack

The old static version is saved in `old_static_site/` folder.

---

**Built with ❤️ by TeamSynapse - Empowering rural communities through AI technology**

*Powered by Next.js, React Three Fiber, Framer Motion, and Tailwind CSS*
