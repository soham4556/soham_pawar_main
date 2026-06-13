import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

// ==========================================
// SVG Custom Icon Components for Estimator
// ==========================================
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

// ==========================================
// Recommended Project Preset Definitions
// ==========================================
const PRESETS = [
  {
    id: 'starter',
    name: 'Starter Landing',
    desc: 'High conversion 1-page modern landing page with clean animations and direct consultation forms.',
    pages: [
      { name: 'Home Landing Page', complexity: 'standard' },
      { name: 'Contact & Consult Form', complexity: 'standard' }
    ],
    integrations: ['seo']
  },
  {
    id: 'corporate',
    name: 'Corporate Portal',
    desc: 'Multi-page business website with service lists, dynamic blog posts, and automated n8n webhook notifications.',
    pages: [
      { name: 'Home Page', complexity: 'standard' },
      { name: 'About Us & Credentials', complexity: 'standard' },
      { name: 'Services Directory', complexity: 'dynamic' },
      { name: 'Blog & Insights CMS', complexity: 'dynamic' },
      { name: 'Contact Us Form', complexity: 'standard' }
    ],
    integrations: ['n8n', 'seo', 'database']
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce App',
    desc: 'B2B/B2C catalog index with shopping cart states, invoice generation, and Stripe/WhatsApp order integrations.',
    pages: [
      { name: 'Home Storefront', complexity: 'premium' },
      { name: 'Product Catalog Grid', complexity: 'dynamic' },
      { name: 'Shopping Cart & Checkout', complexity: 'dynamic' },
      { name: 'Client Account Dashboard', complexity: 'standard' }
    ],
    integrations: ['stripe', 'database', 'seo']
  },
  {
    id: 'saas',
    name: 'Enterprise SaaS System',
    desc: 'Full-stack application containing user authentication, client portal panels, custom databases, and AWS setups.',
    pages: [
      { name: 'Home Marketing Page', complexity: 'premium' },
      { name: 'User Authentication / Login', complexity: 'dynamic' },
      { name: 'Client Console / Dashboard', complexity: 'premium' },
      { name: 'Admin Management Panel', complexity: 'dynamic' },
      { name: 'Custom Rest API Module', complexity: 'dynamic' }
    ],
    integrations: ['database', 'n8n', 'stripe', 'aws', 'seo']
  },
  {
    id: 'school',
    name: 'School Website',
    desc: 'Informational portal for schools or academies with gallery grids, admissions inquiry form, and premium SEO.',
    pages: [
      { name: 'Home Portal', complexity: 'standard' },
      { name: 'About Academy', complexity: 'standard' },
      { name: 'Photo & Video Gallery', complexity: 'dynamic' },
      { name: 'Admissions Inquiry Form', complexity: 'standard' },
      { name: 'Contact Info Page', complexity: 'standard' }
    ],
    integrations: ['seo']
  },
  {
    id: 'erp',
    name: 'ERP System Portal',
    desc: 'Management system with student/employee logins, attendance trackers, payroll modules, and automated cloud databases.',
    pages: [
      { name: 'ERP Home Login', complexity: 'standard' },
      { name: 'Student/Staff Dashboard', complexity: 'premium' },
      { name: 'Attendance & Leave Tracker', complexity: 'dynamic' },
      { name: 'Payroll & Fee Module', complexity: 'premium' },
      { name: 'Admin Management Console', complexity: 'dynamic' }
    ],
    integrations: ['database', 'n8n', 'aws']
  }
];

// ==========================================
// Technology Database definitions
// ==========================================
const TECHS_DB = {
  frontend: [
    { id: 'nextjs', name: 'Next.js (React)', desc: 'Excellent for SEO, Server-Side Rendering & fast page loading.' },
    { id: 'react_spa', name: 'React (SPA)', desc: 'Great for interactive client portals & dashboards.' },
    { id: 'html_vanilla', name: 'Vanilla HTML5 / CSS3 / JS', desc: 'Lightweight, zero dependencies, simple landing pages.' },
    { id: 'vue', name: 'Vue.js', desc: 'Versatile and progressive framework for dynamic web apps.' }
  ],
  backend: [
    { id: 'nodejs', name: 'Node.js & Express', desc: 'Scalable, event-driven API backend with large ecosystem.' },
    { id: 'serverless', name: 'Serverless Functions', desc: 'Cost-efficient, auto-scaling API endpoints without managing servers.' },
    { id: 'fastapi', name: 'FastAPI (Python)', desc: 'High performance backend framework, perfect for AI/ML integrations.' },
    { id: 'laravel', name: 'Laravel (PHP)', desc: 'Feature-rich framework with built-in routing, auth, and ORM.' }
  ],
  database: [
    { id: 'postgresql', name: 'PostgreSQL (SQL)', desc: 'Reliable, powerful relational database with strict validation.' },
    { id: 'mongodb', name: 'MongoDB (NoSQL)', desc: 'Flexible document-based database for rapid schema changes.' },
    { id: 'supabase', name: 'Supabase (BaaS)', desc: 'Open-source Firebase alternative with PostgreSQL, Auth & Realtime.' },
    { id: 'firebase', name: 'Firebase (BaaS)', desc: 'Google NoSQL database with live syncing, auth, and simple hosting.' }
  ],
  hosting: [
    { id: 'vercel', name: 'Vercel / Netlify', desc: 'Automated global CDN hosting, perfect for Next.js & static sites.' },
    { id: 'aws_hosting', name: 'AWS Cloud Suite', desc: 'Secure, high-availability virtual machines, database cluster & CDN.' },
    { id: 'digitalocean', name: 'DigitalOcean Droplets', desc: 'Cost-friendly Virtual Private Servers (VPS) with root access.' }
  ]
};

// ==========================================
// Guided Recommendation Priorities
// ==========================================
const RECOMMENDATION_GOALS = [
  {
    id: 'seo_speed',
    label: '⚡ Ultra-Fast Load & SEO',
    desc: 'High speed, quick initial rendering, and excellent Google Search visibility.',
    techs: ['nextjs', 'vercel'],
    reason: 'Next.js pre-renders pages on the server, which helps search engine bots read and index content easily, while Vercel serves pages instantly from the nearest global server.',
    benefits: [
      'Increases Google search rankings (SEO)',
      'Sub-second page load times for dynamic content',
      'Better mobile performance on slow connections'
    ],
    solved: [
      'Eliminates slow client loading times',
      'Reduces page bounce rates (customers leaving due to delays)'
    ]
  },
  {
    id: 'user_auth',
    label: '🔒 Accounts & User Login',
    desc: 'Users can register, log in, manage profiles, and keep data private.',
    techs: ['nodejs', 'postgresql', 'supabase'],
    reason: 'Supabase and PostgreSQL provide secure user authentication schemes out-of-the-box with structured tables to store personal client data securely.',
    benefits: [
      'Secure password encryption & JWT tokens',
      'Reliable database relationships for user profiles',
      'OAuth integrations (Google, Apple, Github)'
    ],
    solved: [
      'Prevents unauthorized access to sensitive dashboards',
      'Avoids data loss/corruption under concurrent logins'
    ]
  },
  {
    id: 'low_cost',
    label: '💰 Low Cost & Easy Maintenance',
    desc: 'Minimize monthly bills. Zero or extremely low cost for small-to-medium traffic.',
    techs: ['react_spa', 'vercel', 'supabase'],
    reason: 'Static hosting (Vercel) combined with serverless backend-as-a-service (Supabase) offer huge free tiers, meaning you pay $0/month until you grow.',
    benefits: [
      'Almost zero monthly base maintenance costs',
      'No servers to update or manage manually',
      'Easy scale-up options when traffic grows'
    ],
    solved: [
      'Saves you from expensive $15-$50 AWS hosting bills for simple websites',
      'Eliminates server crash/downtime worries'
    ]
  },
  {
    id: 'payments',
    label: '💳 Payments & Subscriptions',
    desc: 'Secure credit card checkout, invoicing, and subscription/plans management.',
    techs: ['nextjs', 'nodejs', 'postgresql'],
    reason: 'Secure credit card payments via Stripe require API servers to verify payment signatures and save order histories securely in PostgreSQL.',
    benefits: [
      'Stripe PCI-DSS compliant secure credit card payments',
      'Automated PDF invoice generation and billing webhooks',
      'Supports monthly subscriptions or one-time payments'
    ],
    solved: [
      'Prevents payment fraud or fake orders',
      'Solves order tracking mismatch (when payment succeeds but order is not recorded)'
    ]
  },
  {
    id: 'automation',
    label: '🤖 AI & Smart Automation',
    desc: 'AI chatbots, automated emails, CRM syncing, and data analysis.',
    techs: ['fastapi', 'postgresql'],
    reason: 'FastAPI connects easily to python-based AI models or OpenAI API, and database integrations allow logging all AI interactions for refining models.',
    benefits: [
      'Automated lead routing to CRM (Slack/Google Sheets/Telegram)',
      '24/7 smart customer support replies using LLMs',
      'Automatic email summaries for incoming scope queries'
    ],
    solved: [
      'Saves hours of daily manual copywriting and copy-pasting client data',
      'Fixes delayed response times to hot website leads'
    ]
  },
  {
    id: 'realtime',
    label: '💬 Real-Time Live Sync',
    desc: 'Instant chats, real-time dashboards, collaborative documents.',
    techs: ['nodejs', 'postgresql', 'supabase'],
    reason: 'WebSockets or Supabase Realtime databases allow pushes to client browsers without manual page reloading.',
    benefits: [
      'Instant message delivery and UI state updates',
      'Live collaboration indicators (like Google Docs)',
      'Real-time data charts and notification badges'
    ],
    solved: [
      'Saves users from refreshing the page to check for new messages/updates',
      'Eliminates database polling, which slows down servers'
    ]
  }
];

// ==========================================
// Advanced Estimator Page Component
// ==========================================
export default function EstimatorPage() {
  const navigate = useNavigate();
  const [accentTheme, setAccentTheme] = useState(() => localStorage.getItem('accentTheme') || 'cyan');

  // Custom Page Map state (starts as corporate by default)
  const [pages, setPages] = useState([
    { name: 'Home Page', complexity: 'standard' },
    { name: 'About Us & Credentials', complexity: 'standard' },
    { name: 'Services Directory', complexity: 'dynamic' },
    { name: 'Blog & Insights CMS', complexity: 'dynamic' },
    { name: 'Contact Us Form', complexity: 'standard' }
  ]);

  // Selected integrations checklist state
  const [integrations, setIntegrations] = useState(['n8n', 'seo', 'database']);
  const [selectedPresetId, setSelectedPresetId] = useState('corporate');

  // Tech stack configuration state
  const [techMode, setTechMode] = useState('guided'); // 'guided' or 'expert'
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [customTechs, setCustomTechs] = useState([]);
  const [newCustomTech, setNewCustomTech] = useState('');

  // PDF generation and auto-attachment state
  const [pdfAttachment, setPdfAttachment] = useState(null);

  const generateScopePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Page styling settings
      const primaryColor = '#06b6d4'; // Cyan
      const textColor = '#0f172a';
      const secondaryTextColor = '#475569';
      
      // Draw Title and Header Block
      doc.setFillColor(15, 23, 42); // Navy Blue Banner Background
      doc.rect(0, 0, 210, 38, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('SOHAM PAWAR', 15, 17);
      
      doc.setFontSize(10);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(6, 182, 212); // Accent Cyan
      doc.text('SYSTEMS ARCHITECT & FULL-STACK ENGINEER', 15, 23);
      doc.setTextColor(255, 255, 255);
      doc.text(`DATE: ${new Date().toLocaleDateString('en-IN')}`, 150, 23);
      
      // Draw Divider line
      doc.setDrawColor(6, 182, 212);
      doc.setLineWidth(1);
      doc.line(0, 38, 210, 38);
      
      // Document Title
      doc.setTextColor(15, 23, 42);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('PROJECT SCOPE BRIEF', 15, 50);
      
      // Project Type Baseline
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('PROJECT CONFIGURATION TIER:', 15, 60);
      doc.setFont('Helvetica', 'normal');
      doc.text(selectedPresetId.toUpperCase() === 'CUSTOM' ? 'CUSTOM SPECIFICATION' : PRESETS.find(p => p.id === selectedPresetId)?.name || 'CUSTOM', 85, 60);

      // Section 1: Estimation Metrics
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 68, 180, 32, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(15, 68, 180, 32, 'D');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text('ESTIMATED WORKLOAD', 25, 78);
      doc.text('ESTIMATED TIMELINE', 85, 78);
      doc.text('BUDGET RANGE (INR)', 145, 78);
      
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(`${estimation.hours} Hours`, 25, 88);
      doc.text(`${estimation.weeks} Weeks`, 85, 88);
      doc.text(estimation.inr.replace(/₹/g, 'Rs. '), 145, 88);
      
      if (estimation.maintenance) {
        doc.setFontSize(8);
        doc.setTextColor(16, 185, 129); // Green
        doc.text('+ Rs. 2,000/mo maintenance', 145, 94);
      }

      // Page Architecture vs Tech Stack Dynamic Layout
      let yOffset = 112;
      if (pages.length > 0 || integrations.length > 0) {
        // --- PATH A Layout (Features/Pages based) ---
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text('1. CONFIGURED PAGES ARCHITECTURE', 15, yOffset);
        
        // Draw Table Header
        yOffset += 6;
        doc.setFillColor(241, 245, 249);
        doc.rect(15, yOffset, 180, 8, 'F');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text('PAGE NAME', 20, yOffset + 5);
        doc.text('COMPLEXITY TIER', 120, yOffset + 5);
        doc.text('BASE EFFORT', 165, yOffset + 5);
        
        doc.setFont('Helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        
        yOffset += 14;
        pages.forEach((p, index) => {
          doc.text(p.name, 20, yOffset);
          doc.text(p.complexity.toUpperCase(), 120, yOffset);
          doc.text(p.complexity === 'standard' ? '3 Hrs' : p.complexity === 'dynamic' ? '6 Hrs' : '10 Hrs', 165, yOffset);
          
          doc.setDrawColor(241, 245, 249);
          doc.setLineWidth(0.5);
          doc.line(15, yOffset + 3, 195, yOffset + 3);
          
          yOffset += 10;
        });

        // Section 3: Technical Integrations
        yOffset += 5;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text('2. TECHNICAL INTEGRATIONS', 15, yOffset);
        
        yOffset += 8;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        
        const activeIntegrations = integrations.map(i => {
          if (i === 'database') return 'Database Architecture (PostgreSQL/MongoDB)';
          if (i === 'n8n') return 'n8n Workflow Automation';
          if (i === 'stripe') return 'Stripe Payments Module';
          if (i === 'aws') return 'AWS Cloud Suite';
          if (i === 'seo') return 'Premium SEO Optimizations';
          if (i === 'branding') return 'Branding & Graphic Assets';
          if (i === 'hostinger') return 'Managed Hostinger VPS Setup';
          return i.toUpperCase();
        });

        if (activeIntegrations.length === 0) {
          doc.text('- None selected', 20, yOffset);
          yOffset += 8;
        } else {
          activeIntegrations.forEach(integrationName => {
            doc.text(`[x]  ${integrationName}`, 20, yOffset);
            yOffset += 7;
          });
        }

        // Section 4: Recommended Tech Stack (Dynamically mapped instead of blank)
        yOffset += 5;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('3. RECOMMENDED TECHNOLOGY STACK', 15, yOffset);
        
        yOffset += 8;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);

        let pathATechs = [];
        if (selectedPresetId === 'starter') {
          pathATechs = ['React (SPA)', 'Vercel / Netlify CDN', 'Premium SEO Optimizations'];
        } else if (selectedPresetId === 'corporate') {
          pathATechs = ['Next.js (React)', 'Node.js & Express API', 'PostgreSQL Database', 'n8n Workflow Automation', 'Vercel / Netlify CDN', 'Premium SEO Optimizations'];
        } else if (selectedPresetId === 'ecommerce') {
          pathATechs = ['Next.js (React)', 'Node.js & Express API', 'PostgreSQL Database', 'Stripe Payments Gateway', 'Vercel / Netlify CDN', 'Premium SEO Optimizations'];
        } else if (selectedPresetId === 'saas') {
          pathATechs = ['Next.js (React)', 'Node.js & Express API', 'PostgreSQL Database', 'Stripe Subscriptions', 'AWS Infrastructure Cloud Suite', 'Premium SEO Optimizations'];
        } else if (selectedPresetId === 'school') {
          pathATechs = ['React (SPA)', 'Vercel / Netlify CDN', 'Premium SEO Optimizations'];
        } else if (selectedPresetId === 'erp') {
          pathATechs = ['Next.js (React)', 'Node.js & Express API', 'PostgreSQL Database', 'n8n Workflow Automation', 'AWS Infrastructure Cloud Suite'];
        } else {
          // Custom scope path A techs fallback list
          pathATechs = ['React (SPA)'];
          if (integrations.includes('database')) pathATechs.push('PostgreSQL/MongoDB Database');
          if (integrations.includes('n8n')) pathATechs.push('n8n Workflow Automation');
          if (integrations.includes('stripe')) pathATechs.push('Stripe Payments Gateway');
          if (integrations.includes('aws')) pathATechs.push('AWS Infrastructure Cloud Suite');
          if (integrations.includes('seo')) pathATechs.push('Premium SEO Optimizations');
          if (integrations.includes('hostinger')) pathATechs.push('Managed Hostinger VPS Setup');
        }

        doc.text(pathATechs.join(', '), 20, yOffset, { maxWidth: 175 });
        yOffset += 14;
      } else {
        // --- PATH B Layout (Technology Stack based) ---
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text('1. CONFIGURED TECHNOLOGY STACK', 15, yOffset);
        
        yOffset += 8;
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);

        // List selected technologies
        let techNamesList = [];
        if (techMode === 'guided') {
          techNamesList = recommendedTechDetails.map(t => t.name);
        } else {
          const manualNames = selectedTechs.map(tId => {
            for (const cat of Object.values(TECHS_DB)) {
              const found = cat.find(x => x.id === tId);
              if (found) return found.name;
            }
            return tId.toUpperCase();
          });
          techNamesList = [...manualNames, ...customTechs];
        }

        if (techNamesList.length === 0) {
          doc.text('- None selected / Recommended', 20, yOffset);
          yOffset += 8;
        } else {
          doc.setFont('Helvetica', 'bold');
          doc.text('Selected Layer Components:', 20, yOffset);
          doc.setFont('Helvetica', 'normal');
          yOffset += 6;
          doc.text(techNamesList.join(', '), 20, yOffset, { maxWidth: 175 });
          yOffset += 14;
        }

        // Section 3: Guided Goals & Value Proposition (Benefits/Problems solved)
        if (selectedGoals.length > 0) {
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(12);
          doc.text('2. SYSTEM ARCHITECTURAL BENEFITS & SOLUTIONS', 15, yOffset);
          yOffset += 8;

          // Why this stack
          doc.setFontSize(9);
          doc.setFont('Helvetica', 'bold');
          doc.text('Business Context Justification:', 20, yOffset);
          doc.setFont('Helvetica', 'normal');
          yOffset += 5;
          doc.text(recommendedJustification, 20, yOffset, { maxWidth: 175 });
          yOffset += 18;

          // Benefits
          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(16, 185, 129); // Green
          doc.text('Key Benefits:', 20, yOffset);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(15, 23, 42);
          yOffset += 5;
          
          recommendedBenefits.slice(0, 4).forEach(benefit => {
            doc.text(`• ${benefit}`, 20, yOffset, { maxWidth: 175 });
            yOffset += 6;
          });
          yOffset += 6;

          // Problems Solved
          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(239, 68, 68); // Red
          doc.text('Problems Solved:', 20, yOffset);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(15, 23, 42);
          yOffset += 5;

          recommendedProblemsSolved.slice(0, 4).forEach(prob => {
            doc.text(`• ${prob}`, 20, yOffset, { maxWidth: 175 });
            yOffset += 6;
          });
          yOffset += 10;
        }
      }

      // Footer disclaimer & Call-to-action
      doc.setFillColor(15, 23, 42);
      doc.rect(15, 255, 180, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('SOHAM PAWAR DIGITAL SYSTEMS DEVELOPMENT • PUNE, MAHARASHTRA, INDIA', 22, 265);
      doc.text('Contact: sohampawar1030@gmail.com • +91 70308 06080', 55, 272);

      // Save to Data URI
      const dataUri = doc.output('datauristring');
      const sizeBytes = Math.round((dataUri.length - 22) * 3 / 4); // base64 size back to bytes approx
      
      setPdfAttachment({
        data: dataUri,
        name: 'project_brief.pdf',
        size: sizeBytes
      });

      addToast('Project brief PDF generated & attached successfully!', 'success');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      addToast('Error generating PDF brief. Please try again.', 'error');
    }
  };

  const toggleGoal = (id) => {
    // Clear top sections (Steps 1, 2, 3) to make them mutually exclusive
    setPages([]);
    setIntegrations([]);
    setSelectedPresetId('custom');

    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTech = (id) => {
    // Clear top sections (Steps 1, 2, 3) to make them mutually exclusive
    setPages([]);
    setIntegrations([]);
    setSelectedPresetId('custom');

    setSelectedTechs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addCustomTech = () => {
    if (!newCustomTech.trim()) return;

    // Clear top sections (Steps 1, 2, 3) to make them mutually exclusive
    setPages([]);
    setIntegrations([]);
    setSelectedPresetId('custom');

    if (!customTechs.includes(newCustomTech.trim())) {
      setCustomTechs([...customTechs, newCustomTech.trim()]);
    }
    setNewCustomTech('');
    addToast(`Added custom tech: ${newCustomTech.trim()}`, 'success');
  };

  const removeCustomTech = (name) => {
    setCustomTechs(customTechs.filter(x => x !== name));
  };

  // Dynamic list of recommended technology details based on selected goals
  const recommendedTechDetails = useMemo(() => {
    const techIds = new Set();
    selectedGoals.forEach(goalId => {
      const goal = RECOMMENDATION_GOALS.find(g => g.id === goalId);
      if (goal) {
        goal.techs.forEach(t => techIds.add(t));
      }
    });

    const details = [];
    techIds.forEach(id => {
      for (const cat of Object.values(TECHS_DB)) {
        const found = cat.find(x => x.id === id);
        if (found) {
          details.push(found);
          break;
        }
      }
    });
    return details;
  }, [selectedGoals]);

  // Derived recommendation benefits, problems solved, and why explanation
  const recommendedBenefits = useMemo(() => {
    const list = new Set();
    selectedGoals.forEach(goalId => {
      const goal = RECOMMENDATION_GOALS.find(g => g.id === goalId);
      if (goal) goal.benefits.forEach(b => list.add(b));
    });
    return Array.from(list);
  }, [selectedGoals]);

  const recommendedProblemsSolved = useMemo(() => {
    const list = new Set();
    selectedGoals.forEach(goalId => {
      const goal = RECOMMENDATION_GOALS.find(g => g.id === goalId);
      if (goal) goal.solved.forEach(s => list.add(s));
    });
    return Array.from(list);
  }, [selectedGoals]);

  const recommendedJustification = useMemo(() => {
    const explanations = [];
    selectedGoals.forEach(goalId => {
      const goal = RECOMMENDATION_GOALS.find(g => g.id === goalId);
      if (goal) explanations.push(goal.reason);
    });
    return explanations.join(' ');
  }, [selectedGoals]);

  // Sync recommended technologies to selectedTechs array in guided mode
  useEffect(() => {
    if (techMode === 'guided') {
      const techIds = new Set();
      selectedGoals.forEach(goalId => {
        const goal = RECOMMENDATION_GOALS.find(g => g.id === goalId);
        if (goal) {
          goal.techs.forEach(t => techIds.add(t));
        }
      });
      setSelectedTechs(Array.from(techIds));
    }
  }, [selectedGoals, techMode]);

  // Add Custom Page text field state
  const [newPageName, setNewPageName] = useState('');

  // Contact form inputs state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast notifier function
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Synchronize CSS variable settings with theme class
  useEffect(() => {
    localStorage.setItem('accentTheme', accentTheme);
  }, [accentTheme]);

  // Apply visual preset configurations
  const applyPreset = (preset) => {
    // Clear Step 4 selection (making Steps 1,2,3 mutually exclusive with Step 4)
    setSelectedGoals([]);
    setSelectedTechs([]);
    setCustomTechs([]);

    setSelectedPresetId(preset.id);
    setPages(preset.pages.map(p => ({ ...p })));
    setIntegrations([...preset.integrations]);
    addToast(`Preset applied: ${preset.name}`, 'success');
  };

  // Add custom page to checklist
  const addCustomPage = (e) => {
    e.preventDefault();
    if (!newPageName.trim()) return;

    // Clear Step 4 selection (making Steps 1,2,3 mutually exclusive with Step 4)
    setSelectedGoals([]);
    setSelectedTechs([]);
    setCustomTechs([]);

    setPages([...pages, { name: newPageName.trim(), complexity: 'standard' }]);
    setNewPageName('');
    setSelectedPresetId('custom');
    addToast('Custom page added to scope', 'success');
  };

  // Remove page from checklist
  const removePage = (index) => {
    // Clear Step 4 selection (making Steps 1,2,3 mutually exclusive with Step 4)
    setSelectedGoals([]);
    setSelectedTechs([]);
    setCustomTechs([]);

    setPages(pages.filter((_, i) => i !== index));
    setSelectedPresetId('custom');
  };

  // Modify individual page complexity level
  const updateComplexity = (index, complexity) => {
    // Clear Step 4 selection (making Steps 1,2,3 mutually exclusive with Step 4)
    setSelectedGoals([]);
    setSelectedTechs([]);
    setCustomTechs([]);

    const updated = [...pages];
    updated[index].complexity = complexity;
    setPages(updated);
    setSelectedPresetId('custom');
  };

  // Toggle custom integration modules
  const toggleIntegration = (id) => {
    // Clear Step 4 selection (making Steps 1,2,3 mutually exclusive with Step 4)
    setSelectedGoals([]);
    setSelectedTechs([]);
    setCustomTechs([]);

    setIntegrations(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setSelectedPresetId('custom');
  };

  // Dynamic cost & duration calculations based on custom scope settings
  const estimation = useMemo(() => {
    // Determine active techs for estimation calculation
    let activeTechs = [...selectedTechs];
    if (techMode === 'guided') {
      const techIds = new Set();
      selectedGoals.forEach(goalId => {
        const goal = RECOMMENDATION_GOALS.find(g => g.id === goalId);
        if (goal) {
          goal.techs.forEach(t => techIds.add(t));
        }
      });
      activeTechs = Array.from(techIds);
    }

    if (pages.length === 0 && integrations.length === 0 && activeTechs.length === 0 && customTechs.length === 0) {
      return {
        hours: 0,
        weeks: 0,
        usd: '$0',
        inr: '₹0',
        inrRange: { min: 0, max: 0 },
        usdRange: { min: 0, max: 0 },
        maintenance: false,
        breakdown: {
          label1: 'Layout & Page Design',
          val1: 0,
          label2: 'Interaction & Webhook setup',
          val2: 0,
          label3: 'Base Architecture & Coordination',
          val3: 0
        }
      };
    }

    // 1. Calculate realistic project duration hours & budgets
    let hours = 5; // Base setup coordination hours
    let inrMin = 3000;
    let maintenance = false;

    if (pages.length > 0 || integrations.length > 0) {
      // PATH A: Feature/Pages-based pricing
      pages.forEach(p => {
        if (p.complexity === 'standard') hours += 3;
        else if (p.complexity === 'dynamic') hours += 6;
        else if (p.complexity === 'premium') hours += 10;
      });
      if (integrations.includes('database')) hours += 5;
      if (integrations.includes('n8n')) hours += 4;
      if (integrations.includes('stripe')) hours += 5;
      if (integrations.includes('aws')) hours += 8;
      if (integrations.includes('seo')) hours += 3;
      if (integrations.includes('branding')) hours += 4;
      if (integrations.includes('hostinger')) hours += 6;

      if (selectedPresetId === 'starter') {
        inrMin = 10000;
      } else if (selectedPresetId === 'corporate') {
        inrMin = 15000;
      } else if (selectedPresetId === 'ecommerce') {
        inrMin = 20000;
      } else if (selectedPresetId === 'saas') {
        inrMin = 25000; // Under 20k to 30k (25k is perfect midpoint)
      } else if (selectedPresetId === 'school') {
        inrMin = 10000;
      } else if (selectedPresetId === 'erp') {
        inrMin = 20000;
        maintenance = true;
      } else {
        // Custom scope calculation
        inrMin = 4000; // Custom setup base cost
        pages.forEach(p => {
          if (p.complexity === 'standard') inrMin += 2000;
          else if (p.complexity === 'dynamic') inrMin += 3000;
          else if (p.complexity === 'premium') inrMin += 4000;
        });

        if (integrations.includes('database')) inrMin += 2000;
        if (integrations.includes('n8n')) inrMin += 1500;
        if (integrations.includes('stripe')) inrMin += 2000;
        if (integrations.includes('aws')) inrMin += 3000;
        if (integrations.includes('seo')) inrMin += 1000;
        if (integrations.includes('branding')) inrMin += 1500;
      }

      // Add optional Hostinger VPS hosting charge (+ ₹10,000)
      if (integrations.includes('hostinger')) {
        inrMin += 10000;
      }
    } else {
      // PATH B: Technology-based pricing (Step 4 only)
      inrMin = 5000; // Base Tech Stack configuration cost

      // Calculate cost & hours per technology
      activeTechs.forEach(tId => {
        if (tId === 'nextjs') {
          inrMin += 5000;
          hours += 15;
        } else if (tId === 'react_spa' || tId === 'vue') {
          inrMin += 4000;
          hours += 12;
        } else if (tId === 'html_vanilla') {
          inrMin += 2000;
          hours += 6;
        } else if (tId === 'nodejs') {
          inrMin += 4000;
          hours += 15;
        } else if (tId === 'fastapi') {
          inrMin += 5000;
          hours += 15;
        } else if (tId === 'laravel') {
          inrMin += 5000;
          hours += 18;
        } else if (tId === 'serverless') {
          inrMin += 3000;
          hours += 10;
        } else if (tId === 'postgresql' || tId === 'mongodb' || tId === 'supabase') {
          inrMin += 3000;
          hours += 10;
        } else if (tId === 'firebase') {
          inrMin += 2500;
          hours += 8;
        } else if (tId === 'vercel') {
          inrMin += 1500;
          hours += 4;
        } else if (tId === 'aws_hosting') {
          inrMin += 5000;
          hours += 18;
        } else if (tId === 'digitalocean') {
          inrMin += 3000;
          hours += 10;
        }
      });

      customTechs.forEach(() => {
        inrMin += 2000;
        hours += 6;
      });

      // Special ERP/SaaS stack validation check: if they select a complex stack that has AWS + Node + Postgres, we enable maintenance optionally or scale it
      if (activeTechs.includes('aws_hosting') && activeTechs.includes('postgresql')) {
        maintenance = true;
      }
    }

    const weeks = Math.max(1, Math.ceil(hours / 12)); // 12 hours/week pace

    // round to nearest 500
    inrMin = Math.round(inrMin / 500) * 500;
    let inrMax = Math.round((inrMin * 1.25) / 500) * 500;

    // Convert to USD (approx $1 = ₹80)
    let usdMin = Math.round((inrMin / 80) / 10) * 10;
    let usdMax = Math.round((inrMax / 80) / 10) * 10;

    if (usdMin === 0) usdMin = 50;
    if (usdMax === 0) usdMax = 80;

    // Calculate Breakdown percentages
    let breakdown = {
      label1: 'Layout & Page Design',
      val1: 0,
      label2: 'Interaction & Webhook setup',
      val2: 0,
      label3: 'Base Architecture & Coordination',
      val3: 0
    };

    if (pages.length > 0 || integrations.length > 0) {
      const designHours = pages.reduce((acc, p) => {
        if (p.complexity === 'standard') return acc + 3;
        if (p.complexity === 'dynamic') return acc + 6;
        if (p.complexity === 'premium') return acc + 10;
        return acc;
      }, 0);
      const integrationHours = integrations.reduce((acc, i) => {
        if (i === 'database') return acc + 5;
        if (i === 'n8n') return acc + 4;
        if (i === 'stripe') return acc + 5;
        if (i === 'aws') return acc + 8;
        if (i === 'seo') return acc + 3;
        if (i === 'branding') return acc + 4;
        if (i === 'hostinger') return acc + 6;
        return acc;
      }, 0);
      const baseHours = 5;

      const totalH = designHours + integrationHours + baseHours;
      breakdown = {
        label1: `Layout & Page Design (${pages.length} pages)`,
        val1: totalH > 0 ? Math.round((designHours / totalH) * 100) : 0,
        label2: 'Interaction & Webhook setup',
        val2: totalH > 0 ? Math.round((integrationHours / totalH) * 100) : 0,
        label3: 'Base Architecture & Coordination',
        val3: totalH > 0 ? Math.round((baseHours / totalH) * 100) : 0
      };
      
      const sum = breakdown.val1 + breakdown.val2 + breakdown.val3;
      if (sum > 0 && sum !== 100) {
        breakdown.val3 += (100 - sum);
      }
    } else {
      let frontendHours = 0;
      let backendHours = 0;
      let dbCloudHours = 0;

      activeTechs.forEach(tId => {
        if (tId === 'nextjs') frontendHours += 15;
        else if (tId === 'react_spa' || tId === 'vue') frontendHours += 12;
        else if (tId === 'html_vanilla') frontendHours += 6;
        
        else if (tId === 'nodejs' || tId === 'fastapi') backendHours += 15;
        else if (tId === 'laravel') backendHours += 18;
        else if (tId === 'serverless') backendHours += 10;
        
        else if (tId === 'postgresql' || tId === 'mongodb' || tId === 'supabase') dbCloudHours += 10;
        else if (tId === 'firebase') dbCloudHours += 8;
        else if (tId === 'vercel') dbCloudHours += 4;
        else if (tId === 'aws_hosting') dbCloudHours += 18;
        else if (tId === 'digitalocean') dbCloudHours += 10;
      });

      if (customTechs.length > 0) {
        dbCloudHours += customTechs.length * 6;
      }

      const baseHours = 5;
      const totalH = frontendHours + backendHours + dbCloudHours + baseHours;

      breakdown = {
        label1: 'Frontend & UI Engineering',
        val1: totalH > 0 ? Math.round((frontendHours / totalH) * 100) : 0,
        label2: 'Backend API & Business Logic',
        val2: totalH > 0 ? Math.round((backendHours / totalH) * 100) : 0,
        label3: 'Database & Cloud Deployment',
        val3: totalH > 0 ? Math.round(((dbCloudHours + baseHours) / totalH) * 100) : 0
      };

      const sum = breakdown.val1 + breakdown.val2 + breakdown.val3;
      if (sum > 0 && sum !== 100) {
        breakdown.val3 += (100 - sum);
      }
    }

    return {
      hours,
      weeks,
      usd: `$${usdMin.toLocaleString()} - $${usdMax.toLocaleString()}`,
      inr: `₹${inrMin.toLocaleString('en-IN')} - ₹${inrMax.toLocaleString('en-IN')}`,
      inrRange: { min: inrMin, max: inrMax },
      usdRange: { min: usdMin, max: usdMax },
      maintenance,
      breakdown
    };
  }, [pages, integrations, selectedPresetId, selectedTechs, customTechs, techMode, selectedGoals]);

  // Client-side validation checks
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Contact number is required';
    if (!formData.company.trim()) errors.company = 'Company / Project name is required';
    if (!formData.message.trim()) errors.message = 'Project overview description is required';
    return errors;
  };

  // Handle inquiry submissions
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast('Please correct the validation errors in the form.', 'error');
      return;
    }
    setFormErrors({});
    setFormSubmitting(true);

    // Build automated detailed project description to attach to email
    const pageScopeText = pages.map(p => `- ${p.name} (${p.complexity.toUpperCase()} complexity)`).join('\n');
    const integrationText = integrations.map(i => `- ${i.toUpperCase()}`).join('\n') || '- None';
    
    // Compile tech stack details
    let techStackDetailsText = '';
    if (techMode === 'guided') {
      const goalsText = selectedGoals.map(g => {
        const goal = RECOMMENDATION_GOALS.find(x => x.id === g);
        return goal ? goal.label : g;
      }).join(', ');
      
      const techNames = recommendedTechDetails.map(t => t.name).join(', ');
      techStackDetailsText = `
- Technology Stack Mode: Guided Recommendation
- Selected Business Goals: ${goalsText || 'None'}
- Recommended Technologies: ${techNames || 'None'}
`;
    } else {
      const manualTechNames = selectedTechs.map(tId => {
        for (const cat of Object.values(TECHS_DB)) {
          const found = cat.find(x => x.id === tId);
          if (found) return found.name;
        }
        return tId;
      });
      const allManualTechs = [...manualTechNames, ...customTechs].join(', ');
      techStackDetailsText = `
- Technology Stack Mode: Expert Manual Select
- Chosen Technologies: ${allManualTechs || 'None'}
`;
    }

    const compiledMessage = `
--- ESTIMATOR SCOPE ATTACHMENT ---
Calculated Scope Details:
- Base Workload: ${estimation.hours} Hours (~${estimation.weeks} Weeks)
- Estimated Budget Range: ${estimation.inr} / ${estimation.usd}

Requested Page Maps:
${pageScopeText}

Requested Technical Integrations:
${integrationText}

Requested Technology Stack:
${techStackDetailsText.trim()}
----------------------------------

User Message Details:
${formData.message}
`;

    const budgetTier = estimation.inrRange.min < 15000 ? 'under_10k' :
                       estimation.inrRange.min < 35000 ? '10k_25k' :
                       estimation.inrRange.min < 65000 ? '25k_50k' : 'over_50k';

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      budget: budgetTier,
      timeline: estimation.weeks <= 2 ? 'urgent' : estimation.weeks <= 4 ? '1month' : '2_3months',
      message: compiledMessage.trim(),
      fileData: pdfAttachment ? pdfAttachment.data : null,
      fileName: pdfAttachment ? pdfAttachment.name : null,
      fileSize: pdfAttachment ? pdfAttachment.size : 0
    };

    try {
      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (response.ok) {
        addToast('Scope estimation inquiry successfully sent!', 'success');
        setPdfAttachment(null); // Reset pdf attachment state on successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        console.error('API submission error:', result);
        addToast(result.error || 'Failed to dispatch inquiry. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Inquiry submission network error:', error);
      addToast('Network error. Failed to connect to serverless email function.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Form invalid validation flag for disabling submit button
  const isFormInvalid = !formData.name.trim() ||
                        !formData.email.trim() ||
                        !formData.phone.trim() ||
                        !formData.company.trim() ||
                        !formData.message.trim();

  return (
    <div className={`theme-${accentTheme}`}>
      <div className="grid-mesh"></div>
      <div className="glow-ambient"></div>
      <div className="glow-ambient-2"></div>

      {/* HEADER NAVBAR */}
      <header className="scrolled">
        <div className="nav-container">
          <Link to="/" className="logo-tech">
            SOHAM PAWAR
          </Link>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home Page</Link>
            <Link to="/estimator" className="nav-link active">Advanced Estimator</Link>
          </nav>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="theme-switcher-container">
              {['cyan', 'green', 'blue', 'gold'].map((themeName) => (
                <button
                  key={themeName}
                  className={`theme-dot-btn ${accentTheme === themeName ? 'active' : ''}`}
                  style={{
                    background: themeName === 'cyan' ? '#06b6d4' :
                                themeName === 'green' ? '#10b981' :
                                themeName === 'blue' ? '#3b82f6' : '#d4b28c'
                  }}
                  onClick={() => setAccentTheme(themeName)}
                  title={`Switch to ${themeName} theme`}
                  aria-label={`Switch to ${themeName} theme`}
                />
              ))}
            </div>
            <Link to="/" className="btn-tech btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <BackIcon /> Return
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="main-content-tech" style={{ padding: '8rem 2rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label-tech">custom system configurator</span>
          <h1 className="section-title-tech" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
            Interactive <span>Scope Estimator</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Customize your website pages, choose interaction complexities, and configure technical serverless integrations for an instant budget and timeline assessment.
          </p>
        </div>

        {/* Outer Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }} className="estimator-layout-outer">
          
          {/* Left panel: configurations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Step 1: Recommended Presets */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="step-num-pill">1</span> Select a Preset Base (Optional)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="estimator-presets-grid">
                {PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    className={`estimator-preset-card-btn ${selectedPresetId === preset.id ? 'active' : ''}`}
                    onClick={() => applyPreset(preset)}
                    style={{
                      textAlign: 'left',
                      background: 'rgba(0,0,0,0.15)',
                      border: selectedPresetId === preset.id ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'var(--transition-custom)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                      color: 'inherit'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontWeight: '600', fontSize: '1rem' }}>{preset.name}</span>
                      {selectedPresetId === preset.id && <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 'bold' }}>ACTIVE</span>}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Custom Page Map */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0 }}>
                  <span className="step-num-pill">2</span> Customize Pages Selection
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{pages.length} Pages Configured</span>
              </div>

              {/* Pages map list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {pages.map((page, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.75rem 1.25rem',
                      gap: '1rem'
                    }}
                    className="page-row-item"
                  >
                    <span style={{ fontWeight: '500', fontSize: '0.95rem', minWidth: '180px' }}>{page.name}</span>
                    
                    {/* Complexity toggles */}
                    <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '6px' }}>
                      {['standard', 'dynamic', 'premium'].map(c => (
                        <button
                          key={c}
                          className={`complexity-btn ${page.complexity === c ? 'active' : ''}`}
                          onClick={() => updateComplexity(idx, c)}
                          style={{
                            background: page.complexity === c ? 'var(--accent-cyan)' : 'transparent',
                            color: page.complexity === c ? 'var(--text-dark)' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {c === 'premium' ? 'Premium ⚡' : c}
                        </button>
                      ))}
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removePage(idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover-opacity-btn"
                      title="Remove page"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add custom page form */}
              <form onSubmit={addCustomPage} style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="e.g. Testimonials / BMI Calculator / Zodiac Chart"
                  className="form-input-tech"
                  style={{ flex: 1 }}
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-tech btn-outline"
                  style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0 1.5rem', whiteSpace: 'nowrap' }}
                >
                  <PlusIcon /> Add Page
                </button>
              </form>
            </div>

            {/* Step 3: Technical Modules Integrations */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="step-num-pill">3</span> Configure Technical Integrations
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="estimator-presets-grid">
                {[
                  { id: 'database', title: 'Database Architecture', desc: 'Secure database setup (Postgres/MongoDB) for data caching & storage.', hours: '15 Hrs' },
                  { id: 'n8n', title: 'n8n Workflow Automation', desc: 'Automate manual leads syncing, emails, and CRM integration routes.', hours: '10 Hrs' },
                  { id: 'stripe', title: 'Stripe Payments Module', desc: 'Integrate standard gateways for secure client card payments.', hours: '15 Hrs' },
                  { id: 'aws', title: 'AWS Cloud Deployment', desc: 'EC2 servers, private networks, RDS database, and S3 file configurations.', hours: '20 Hrs' },
                  { id: 'seo', title: 'Premium SEO Optimization', desc: 'Custom JSON-LD schema integrations, meta configuration, sitemaps.', hours: '8 Hrs' },
                  { id: 'branding', title: 'Custom Branding & Graphics', desc: 'Logo design, high fidelity color patterns, custom media assets.', hours: '12 Hrs' },
                  { id: 'hostinger', title: 'Hostinger VPS & DB Hosting', desc: 'Deploy database & backend securely on managed Hostinger VPS servers (Optional).', hours: '8 Hrs' }
                ].map(item => {
                  const isChecked = integrations.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleIntegration(item.id)}
                      className={`estimator-option-btn ${isChecked ? 'active' : ''}`}
                      style={{
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '1rem',
                        background: 'rgba(0,0,0,0.15)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: 'inherit',
                        width: '100%'
                      }}
                    >
                      <div
                        className="estimator-checkbox"
                        style={{
                          background: isChecked ? 'var(--accent-cyan)' : 'transparent',
                          borderColor: isChecked ? 'var(--accent-cyan)' : 'var(--border-color)',
                          color: isChecked ? 'var(--text-dark)' : 'transparent',
                          marginTop: '0.15rem'
                        }}
                      >
                        <CheckIcon />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item.title}</span>
                          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--accent-cyan)', background: 'var(--border-color-glow)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>+{item.hours}</span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', display: 'block' }}>{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Technology Stack Configuration (Optional) */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0 }}>
                  <span className="step-num-pill">4</span> Select Technology Stack (Optional)
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>Optional Config</span>
              </div>

              {/* Path Selection Alert Notice */}
              <div style={{
                background: 'rgba(6, 182, 212, 0.05)',
                border: '1px solid rgba(6, 182, 212, 0.15)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
              }}>
                <span>💡</span>
                <span><strong>Path Selection:</strong> You can either define your scope using Steps 1-3 (Pages &amp; Integrations) <strong>OR</strong> select a Technology Stack in Step 4. Selecting one will automatically clear the other to ensure accurate calculations.</span>
              </div>

              {/* Mode Switcher Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setTechMode('guided')}
                  style={{
                    flex: 1,
                    background: techMode === 'guided' ? 'var(--accent-cyan)' : 'transparent',
                    color: techMode === 'guided' ? 'var(--text-dark)' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  🧠 Guided Recommendation (Non-Tech Users)
                </button>
                <button
                  type="button"
                  onClick={() => setTechMode('expert')}
                  style={{
                    flex: 1,
                    background: techMode === 'expert' ? 'var(--accent-cyan)' : 'transparent',
                    color: techMode === 'expert' ? 'var(--text-dark)' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  ⚙️ Expert Manual Selection
                </button>
              </div>

              {/* Guided Recommendation Mode */}
              {techMode === 'guided' && (
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                    What are your main business goals and priorities for this project? Select all that apply:
                  </p>

                  {/* Goal Cards Checklist */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }} className="estimator-presets-grid">
                    {RECOMMENDATION_GOALS.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          className={`estimator-preset-card-btn ${isSelected ? 'active' : ''}`}
                          style={{
                            textAlign: 'left',
                            background: 'rgba(0,0,0,0.15)',
                            border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'var(--transition-custom)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                            color: 'inherit'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span style={{ fontWeight: '600', fontSize: '0.925rem' }}>{goal.label}</span>
                            <div
                              style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-color)',
                                background: isSelected ? 'var(--accent-cyan)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {isSelected && <CheckIcon />}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                            {goal.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Recommendation Panel */}
                  {selectedGoals.length > 0 ? (
                    <div style={{
                      background: 'rgba(6, 182, 212, 0.03)',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem'
                    }}>
                      {/* Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                        <span style={{ fontSize: '1.25rem' }}>💡</span>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600' }}>Recommended System Stack</h4>
                      </div>

                      {/* Stack Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {recommendedTechDetails.map((tech) => (
                          <span
                            key={tech.id}
                            style={{
                              background: 'var(--border-color-glow)',
                              color: 'var(--accent-cyan)',
                              border: '1px solid rgba(6, 182, 212, 0.3)',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              fontFamily: 'var(--mono)'
                            }}
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>

                      {/* Reason */}
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-white)', marginBottom: '0.25rem' }}>Why this stack matches your goals:</strong>
                        <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          {recommendedJustification}
                        </p>
                      </div>

                      {/* Two Columns: Benefits vs Problems Solved */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="estimator-presets-grid">
                        
                        {/* Benefits */}
                        <div style={{ background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '6px', padding: '1rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10B981', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            ✅ Key Benefits
                          </span>
                          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {recommendedBenefits.map((benefit, i) => (
                              <li key={i} style={{ lineHeight: '1.4' }}>{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Problems Solved */}
                        <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '6px', padding: '1rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#ef4444', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            🛡️ Problems Solved
                          </span>
                          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {recommendedProblemsSolved.map((prob, i) => (
                              <li key={i} style={{ lineHeight: '1.4' }}>{prob}</li>
                            ))}
                          </ul>
                        </div>

                      </div>

                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '2rem',
                      border: '1px dashed var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem'
                    }}>
                      Select one or more business priorities above to see your recommended tech stack benefits.
                    </div>
                  )}
                </div>
              )}

              {/* Expert Manual Mode */}
              {techMode === 'expert' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                    Directly toggle specific technologies or add custom tools to your system specification:
                  </p>

                  {/* Grids for categories */}
                  {Object.entries(TECHS_DB).map(([category, list]) => (
                    <div key={category} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
                      <span style={{
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--accent-cyan)',
                        fontFamily: 'var(--mono)',
                        display: 'block',
                        marginBottom: '0.75rem'
                      }}>
                        {category} Layer
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="estimator-presets-grid">
                        {list.map((tech) => {
                          const isChecked = selectedTechs.includes(tech.id);
                          return (
                            <button
                              key={tech.id}
                              type="button"
                              onClick={() => toggleTech(tech.id)}
                              className={`estimator-option-btn ${isChecked ? 'active' : ''}`}
                              style={{
                                padding: '0.75rem 1rem',
                                display: 'flex',
                                alignItems: 'start',
                                gap: '0.75rem',
                                background: 'rgba(0,0,0,0.12)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: 'inherit',
                                width: '100%'
                              }}
                            >
                              <div
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '3px',
                                  border: '1px solid var(--border-color)',
                                  background: isChecked ? 'var(--accent-cyan)' : 'transparent',
                                  color: isChecked ? 'var(--text-dark)' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginTop: '0.15rem',
                                  flexShrink: 0
                                }}
                              >
                                {isChecked && <CheckIcon />}
                              </div>
                              <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-white)' }}>{tech.name}</span>
                                <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', lineHeight: '1.3', display: 'block', marginTop: '0.15rem' }}>{tech.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Add Custom Tech Stack Option */}
                  <div>
                    <span style={{
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: 'var(--accent-cyan)',
                      fontFamily: 'var(--mono)',
                      display: 'block',
                      marginBottom: '0.5rem'
                    }}>
                      Add Other Custom Technology
                    </span>
                    
                    {/* List of custom technologies */}
                    {customTechs.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {customTechs.map((techName, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-color)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              color: 'var(--text-white)'
                            }}
                          >
                            <span>🛠️ {techName}</span>
                            <button
                              type="button"
                              onClick={() => removeCustomTech(techName)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                padding: 0
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="e.g. Docker, GraphQL, Kubernetes, Django"
                        className="form-input-tech"
                        style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                        value={newCustomTech}
                        onChange={(e) => setNewCustomTech(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomTech(); } }}
                      />
                      <button
                        type="button"
                        onClick={addCustomTech}
                        className="btn-tech btn-outline"
                        style={{ padding: '0 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      >
                        + Add Custom
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Summary Sticky Card & Form */}
          <div style={{ position: 'sticky', top: '7.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="estimator-sticky-panel">
            
            {/* Live calculations */}
            <div className="estimator-result-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>Project Scope Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>TOTAL BASE HOURS</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'var(--mono)', fontSize: '1.1rem' }}>{estimation.hours} Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ESTIMATED DURATION</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'var(--mono)', fontSize: '1.1rem' }}>{estimation.weeks} Weeks</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', display: 'block', marginBottom: '0.35rem' }}>BUDGET ASSESSMENT</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{estimation.inr}</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>~ {estimation.usd}</div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', display: 'block', marginBottom: '0.5rem' }}>CONFIGURED STACK</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {techMode === 'guided' && selectedGoals.length === 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Not configured</span>
                    )}
                    {techMode === 'guided' && recommendedTechDetails.map(t => (
                      <span key={t.id} style={{ background: 'var(--border-color-glow)', color: 'var(--accent-cyan)', fontSize: '0.725rem', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>
                        {t.name}
                      </span>
                    ))}
                    {techMode === 'expert' && selectedTechs.length === 0 && customTechs.length === 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Not configured</span>
                    )}
                    {techMode === 'expert' && selectedTechs.map(tId => {
                      let name = tId;
                      for (const cat of Object.values(TECHS_DB)) {
                        const found = cat.find(x => x.id === tId);
                        if (found) name = found.name;
                      }
                      return (
                        <span key={tId} style={{ background: 'var(--border-color-glow)', color: 'var(--accent-cyan)', fontSize: '0.725rem', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>
                          {name}
                        </span>
                      );
                    })}
                    {techMode === 'expert' && customTechs.map((tName, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-white)', fontSize: '0.725rem', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                        {tName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual cost itemized breakdown indicators */}
              <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', fontFamily: 'var(--mono)', marginBottom: '0.25rem' }}>Cost Allocation Breakdown</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{estimation.breakdown.label1}</span>
                  <span style={{ fontWeight: 'bold' }}>{estimation.breakdown.val1}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{estimation.breakdown.label2}</span>
                  <span style={{ fontWeight: 'bold' }}>{estimation.breakdown.val2}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{estimation.breakdown.label3}</span>
                  <span style={{ fontWeight: 'bold' }}>{estimation.breakdown.val3}%</span>
                </div>
              </div>

              {/* PDF Generator Button */}
              {estimation.hours > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={generateScopePDF}
                    className="btn-tech btn-outline"
                    style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.75rem', fontWeight: 'bold' }}
                  >
                    📄 Generate &amp; Attach PDF Brief
                  </button>
                  
                  {pdfAttachment && (
                    <div style={{
                      marginTop: '0.75rem',
                      background: 'rgba(16, 185, 129, 0.04)',
                      border: '1px dashed rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>📎</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10B981' }}>{pdfAttachment.name}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>({(pdfAttachment.size / 1024).toFixed(1)} KB) attached</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <a
                          href={pdfAttachment.data}
                          download={pdfAttachment.name}
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-white)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.725rem',
                            fontWeight: '600'
                          }}
                        >
                          Preview
                        </a>
                        <button
                          type="button"
                          onClick={() => setPdfAttachment(null)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            padding: '0 0.25rem',
                            lineHeight: '1'
                          }}
                          title="Remove attachment"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Consultation Request Form */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.25rem' }}>Submit Estimation Details</h3>
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-name">Full Name *</label>
                  <input
                    type="text"
                    id="client-name"
                    className="form-input-tech"
                    placeholder="Om Pawar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {formErrors.name && <div className="form-error-tech">{formErrors.name}</div>}
                </div>

                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-email">Email Address *</label>
                  <input
                    type="email"
                    id="client-email"
                    className="form-input-tech"
                    placeholder="om@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {formErrors.email && <div className="form-error-tech">{formErrors.email}</div>}
                </div>

                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-phone">Contact Number *</label>
                  <input
                    type="tel"
                    id="client-phone"
                    className="form-input-tech"
                    placeholder="+91 70308 06080"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {formErrors.phone && <div className="form-error-tech">{formErrors.phone}</div>}
                </div>

                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-company">Company / Project Name *</label>
                  <input
                    type="text"
                    id="client-company"
                    className="form-input-tech"
                    placeholder="e.g. Acme Agency"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                  {formErrors.company && <div className="form-error-tech">{formErrors.company}</div>}
                </div>

                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-message">Project Description &amp; Stack Requirements *</label>
                  <textarea
                    id="client-message"
                    className="form-textarea-tech"
                    style={{ height: '100px' }}
                    placeholder="Outline any specific feature requests or details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {formErrors.message && <div className="form-error-tech">{formErrors.message}</div>}
                </div>

                {pdfAttachment && (
                  <div style={{
                    marginBottom: '1rem',
                    background: 'rgba(16, 185, 129, 0.04)',
                    border: '1px dashed rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📎</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10B981' }}>{pdfAttachment.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>({(pdfAttachment.size / 1024).toFixed(1)} KB) attached to inquiry</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <a
                        href={pdfAttachment.data}
                        download={pdfAttachment.name}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-white)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.725rem',
                          fontWeight: '600'
                        }}
                      >
                        Preview
                      </a>
                      <button
                        type="button"
                        onClick={() => setPdfAttachment(null)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '1.1rem',
                          padding: '0 0.25rem',
                          lineHeight: '1'
                        }}
                        title="Remove attachment"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-tech btn-gradient"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                  disabled={formSubmitting || isFormInvalid}
                >
                  {formSubmitting ? 'DISPATCHING MEMO...' : 'SUBMIT PROJECT SCOPE'}
                </button>
              </form>
            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid-tech" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="footer-brand-col">
            <div className="logo-tech" style={{ fontSize: '1.25rem' }}>
              SOHAM PAWAR
            </div>
            <p className="footer-brand-desc">
              Creative Website Designer &amp; Full-Stack Developer. Building next-generation frontends, high-performance web applications, and premium digital designs.
            </p>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/sohampawar7030/" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/sohampawar7030" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="mailto:sohampawar1030@gmail.com" className="footer-social-btn" aria-label="Email">
                <MailIcon />
              </a>
              <a href="tel:+917030806080" className="footer-social-btn" aria-label="Phone">
                <PhoneIcon />
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-title-tech">Sitemap</h4>
            <ul className="footer-links-list">
              <li><Link to="/">About Me</Link></li>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/estimator">Estimator</Link></li>
              <li><Link to="/">Projects</Link></li>
              <li><Link to="/">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-title-tech">Capabilities</h4>
            <ul className="footer-links-list">
              <li><Link to="/">UI/UX &amp; Web Design</Link></li>
              <li><Link to="/">Fullstack Systems</Link></li>
              <li><Link to="/">AWS Infrastructure</Link></li>
              <li><Link to="/estimator">Scope Calculator</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-title-tech">Get In Touch</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <a href="mailto:sohampawar1030@gmail.com">sohampawar1030@gmail.com</a>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href="tel:+917030806080">+91 70308 06080</a>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-tech" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="footer-copy-tech">
            &copy; {new Date().getFullYear()} Soham Pawar. All rights reserved.
          </div>
        </div>
      </footer>

      {/* DYNAMIC TOAST HOLDER */}
      <div className="toast-tech-holder">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-tech ${t.type === 'error' ? 'error' : ''}`}>
            <span>{t.type === 'error' ? '⚠️' : '⚡'}</span>
            <span style={{ marginLeft: '0.5rem' }}>{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
