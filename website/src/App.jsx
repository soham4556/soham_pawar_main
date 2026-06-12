import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// SVG Custom Icon Components (Vite/React 19 Safe)
// ==========================================
const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const CloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
);
const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
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
// Interactive Dashboard Widget Component
// ==========================================
function DashboardWidget() {
  const [activeTab, setActiveTab] = useState('health');
  const [cpuLoad, setCpuLoad] = useState(24);
  const [dbQueries, setDbQueries] = useState(142);
  const [logs, setLogs] = useState([
    { time: '12:15:02', text: 'n8n Scheduler triggered: checking database states', type: 'info' },
    { time: '12:15:04', text: 'Inquiry dispatcher task routed on AWS Lambda', type: 'info' },
    { time: '12:15:07', text: 'Database cache sync complete. Latency 8ms', type: 'success' },
    { time: '12:15:10', text: 'Connection pooling active: 14 open pools', type: 'info' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 10) - 5;
        const next = prev + delta;
        return Math.max(10, Math.min(85, next));
      });
      setDbQueries((prev) => prev + Math.floor(Math.random() * 4));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const endpoints = ['/api/v1/projects', '/api/v1/leads', '/webhook/n8n-trigger', '/auth/login'];
      const methods = ['GET', 'POST', 'GET', 'POST'];
      const idx = Math.floor(Math.random() * endpoints.length);
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLog = {
        time: timeStr,
        text: `API Dispatcher: ${methods[idx]} ${endpoints[idx]} - 200 OK`,
        type: idx % 2 === 0 ? 'success' : 'info'
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 10)]);
    }, 4000);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="dashboard-widget">
      <div className="dashboard-header">
        <div className="dashboard-title-row">
          <div className="status-dot"></div>
          <span className="status-lbl">PRODUCTION SYSTEMS: ACTIVE</span>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <div className="browser-dot" style={{ background: '#EF4444' }}></div>
          <div className="browser-dot" style={{ background: '#F59E0B' }}></div>
          <div className="browser-dot" style={{ background: '#10B981' }}></div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button className={`dashboard-tab ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>Server Health</button>
        <button className={`dashboard-tab ${activeTab === 'api' ? 'active' : ''}`} onClick={() => setActiveTab('api')}>Live API Logs</button>
        <button className={`dashboard-tab ${activeTab === 'db' ? 'active' : ''}`} onClick={() => setActiveTab('db')}>Database Stats</button>
      </div>

      <div className="dashboard-body">
        {activeTab === 'health' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div className="health-row">
                <span>CPU Load (AWS EC2)</span>
                <span className="text-cyan" style={{ fontFamily: 'var(--mono)' }}>{cpuLoad}%</span>
              </div>
              <div className="health-bar-bg">
                <div className="health-bar-fg" style={{ width: `${cpuLoad}%` }}></div>
              </div>
            </div>
            <div>
              <div className="health-row">
                <span>Memory Allocation</span>
                <span style={{ color: '#8b5cf6', fontFamily: 'var(--mono)' }}>64.2%</span>
              </div>
              <div className="health-bar-bg">
                <div className="health-bar-fg" style={{ width: '64.2%', background: 'var(--accent-purple)' }}></div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>AWS RDS SUITE</span>
                <div style={{ fontWeight: 'bold', color: '#10B981', marginTop: '0.15rem' }}>ONLINE</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>N8N SCHEDULER</span>
                <div style={{ fontWeight: 'bold', color: '#10B981', marginTop: '0.15rem' }}>ACTIVE</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div style={{ maxHeight: '280px', overflowY: 'hidden' }}>
            {logs.map((log, idx) => (
              <div key={idx} className="dashboard-log-line">
                <span className="log-time">[{log.time}]</span>
                <span className={log.type === 'success' ? 'log-success' : 'log-info'}>
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'db' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Database Reads</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{dbQueries}</span>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Avg Query Latency</span>
              <span style={{ fontWeight: 'bold', color: '#10B981' }}>8.4ms</span>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Active DB Pools</span>
              <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>14 Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Connection Status</span>
              <span style={{ fontWeight: 'bold', color: '#10B981' }}>Synced</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Main Business App Component
// ==========================================
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [accentTheme, setAccentTheme] = useState('cyan');

  // Handle welcome splash preloader auto-dismiss and scroll lock
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  useEffect(() => {
    // Automatically trigger fade out after 2.8 seconds
    const fadeTimer = setTimeout(() => {
      setSplashFade(true);
    }, 2800);

    // Completely remove splash screen after fade animation completes (total 3.6 seconds)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleEnterSite = () => {
    setSplashFade(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 800);
  };

  // Selected technology detail state
  const [selectedTech, setSelectedTech] = useState('react');

  // Interactive AWS visualizer state
  const [activeAwsNode, setActiveAwsNode] = useState('ec2');

  // Interactive code snippets state
  const [activeSnippet, setActiveSnippet] = useState('n8n_webhook');

  // Project grids filtering states
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scope Estimator State
  const [estServices, setEstServices] = useState(['frontend', 'backend']);
  const [estScale, setEstScale] = useState(2); // 1 = Small, 2 = Medium, 3 = SaaS

  // Testimonials State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(null);



  // Work history states
  const [expandedWork, setExpandedWork] = useState('payivva');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Scroll spy listeners
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 40);
      const sections = ['about', 'skills', 'estimator', 'work', 'testimonials', 'experience', 'faq', 'contact'];
      let current = 'hero';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard events listeners (Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse movement glow tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer scroll reveal observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Services datasets
  const servicesData = [
    {
      title: 'AI & Workflow Automation',
      desc: 'Integrating cognitive LLMs (OpenAI, Claude) and automating business pipelines using n8n to sync leads, databases, and client dashboards.',
      icon: <ZapIcon />
    },
    {
      title: 'Fullstack Systems Development',
      desc: 'Architecting robust interfaces (React, Next.js) and clean web servers (Python/Django) containing fully structured database systems.',
      icon: <CodeIcon />
    },
    {
      title: 'AWS Cloud Infrastructure',
      desc: 'AWS Certified Cloud Practitioner designing compute nodes, secure storage (S3), relational tables, and zero-downtime CI/CD pipelines.',
      icon: <CloudIcon />
    }
  ];

  // Tech stack dataset
  const techStackData = {
    react: {
      name: 'React.js & Next.js',
      level: 'Expert / 2+ Years',
      desc: 'Building responsive user interfaces, modular dashboards, session caching states, and progressive image assets loaders.',
      projects: ['Creovix Website', 'PrepRight Platform', 'Apex Store', 'Urban Pro ERP']
    },
    python: {
      name: 'Python & Django/FastAPI',
      level: 'Expert / 2+ Years',
      desc: 'Developing secure REST APIs, JWT authentication controllers, custom ORM query configurations, and background scripts.',
      projects: ['Brain Tumor Classifier', 'Infosys automation scripts', 'Elite Software DB system']
    },
    n8n: {
      name: 'n8n Workflow Automation',
      level: 'Advanced / 1.5+ Years',
      desc: 'Creating serverless automation webhook connectors, dynamic leads dispatch nodes, database cron synchronization, and SMTP relays.',
      projects: ['Creovix consult dispatcher', 'Apex backend triggers']
    },
    aws: {
      name: 'AWS Cloud Suite',
      level: 'Certified Practitioner / 1+ Years',
      desc: 'Configuring secure public/private subnets, Route 53 DNS records, S3 bucket storage policies, EC2 hosts, and PostgreSQL RDS instances.',
      projects: ['Elite Software AWS EC2 deployment', 'Kiran Body S3 asset server']
    }
  };

  // AWS Visualizer database
  const awsNodeData = {
    dns: {
      name: 'AWS Route 53',
      pattern: 'Latency-based DNS configurations with active health check failovers.',
      role: 'Routes clients to nearest public endpoint servers, resolving DNS queries in under 15ms.'
    },
    proxy: {
      name: 'Nginx Reverse Proxy',
      pattern: 'Deployed within a Public Subnet, acting as secure gatekeeper filtering origins.',
      role: 'Intercepts HTTP traffic, terminates SSL configurations, and routes REST query payloads to backend servers.'
    },
    ec2: {
      name: 'AWS EC2 Instance',
      pattern: 'CORS policies, restrictive security groups config, and isolated docker containers.',
      role: 'Runs production Python/Django endpoints and staging React dashboards with automated Jenkins triggers.'
    },
    rds: {
      name: 'AWS RDS Database',
      pattern: 'Multi-AZ Postgres database cluster restricted to traffic from the app security groups.',
      role: 'Stores secure student mock exams (PrepRight), client inquiries catalog, and B2B products registers.'
    },
    s3: {
      name: 'AWS S3 Storage',
      pattern: 'Strict private access policies, CORS overrides, and CloudFront caching configs.',
      role: 'Serves Kids Pride school notice documents and high-resolution event layout images.'
    }
  };

  // Code Kitchen Snippets
  const codeSnippets = {
    n8n_webhook: {
      title: 'n8n_webhook_forwarder.js',
      lang: 'javascript',
      code: `// Relays validated form data from React endpoint to client email CRM
const lead = {
  name: input.name,
  email: input.email,
  message: input.message,
  timestamp: new Date().toISOString()
};
if (!lead.email.includes('@')) {
  throw new Error('Invalid email payload structure');
}
return lead;`
    },
    django_middleware: {
      title: 'django_api_auth.py',
      lang: 'python',
      code: `# Restricts API access to authorized domain origins and validates JWT auth headers
from django.http import JsonResponse
class APIAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        if request.path.startswith('/api/v1/'):
            auth = request.headers.get('Authorization')
            if not auth or not auth.startswith('Bearer '):
                return JsonResponse({'error': 'Unauthorized JWT payload'}, status=401)
        return self.get_response(request)`
    },
    react_timer: {
      title: 'useExamTimer.js',
      lang: 'javascript',
      code: `// Maintains quiz timers across session reloads and handles auto-grading triggers
import { useState, useEffect } from 'react';
export function useExamTimer(initialSeconds, onTimeUp) {
  const [seconds, setSeconds] = useState(() => {
    const saved = sessionStorage.getItem('quiz_seconds');
    return saved ? parseInt(saved, 10) : initialSeconds;
  });
  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        sessionStorage.setItem('quiz_seconds', next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);
  return seconds;
}`
    }
  };

  // Projects database with browser mockup assets
  const projectsData = [
    {
      id: 'creovix',
      category: 'live',
      title: 'Creovix — AI IT Company',
      urlMock: 'creovix.me',
      shortDesc: 'A premium corporate web platform showcasing IT and AI consultation services, featuring integrated webhook scheduling pipelines.',
      description: 'Creovix is a premium IT consulting firm specializing in AI automation systems. Soham built their online presence from scratch, featuring deep-tech design aesthetics, modular service categories, and client inquiry automation.',
      clientBrief: 'The client required a high-fidelity web presence that immediately conveyed technical mastery to enterprise leads, incorporating automated lead collection routes.',
      challenges: 'Optimizing layout loading speeds and asset delivery for users accessing the portal on variable bandwidth connections.',
      contribution: 'Lead Fullstack Developer. Managed wireframing, frontend development in React, configured serverless email notification triggers, and completed DNS routing.',
      stack: ['React', 'JavaScript', 'CSS Grid', 'Vercel hosting', 'FormSpree Integration'],
      url: 'https://www.creovix.me/'
    },
    {
      id: 'wedner',
      category: 'live',
      title: 'Wedner Events & Production',
      urlMock: 'wednereventsandproduction.com',
      shortDesc: 'High-end visual showcase and business booking pipeline for a prominent events management production agency.',
      description: 'Wedner Events is a high-profile production agency in Pune. The platform hosts high-resolution photo galleries and provides booking flows for corporate and luxury events.',
      clientBrief: 'Required an elegant, visual-heavy portal to show credentials and handle corporate event queries efficiently.',
      challenges: 'Serving large, high-resolution media galleries without causing visual layout shifts (CLS) or load latency.',
      contribution: 'Freelance Developer. Engineered progressive image loading, visual slider controllers, responsive galleries, and integrated client lead notification routers.',
      stack: ['JavaScript', 'HTML5', 'Custom CSS', 'Hostinger deployment', 'SMTP Routing'],
      url: 'https://wednereventsandproduction.com/'
    },
    {
      id: 'kidspride',
      category: 'live',
      title: 'Kids Pride School Portal',
      urlMock: 'kids-pride.vercel.app',
      shortDesc: 'Operational web portal serving parents and administrators with real-time academic notice listings and inquiry validation.',
      description: 'A comprehensive educational website for Kids Pride School. It organizes administrative announcements, curriculum structures, and parent inquiry workflows.',
      clientBrief: 'The school needed an accessible, fast website that parents could navigate easily on budget mobile devices.',
      challenges: 'Structuring an intuitive UI suitable for less tech-savvy users while keeping server maintenance fees extremely low.',
      contribution: 'Freelance Engineer. Programmed parent notice boards, integrated validated application inquiry forms, and handled shared hosting configuration.',
      stack: ['HTML5', 'Vanilla CSS', 'JavaScript', 'Shared Web Hosting'],
      url: 'https://kids-pride.vercel.app/'
    },
    {
      id: 'agricoz',
      category: 'live',
      title: 'Agricoz — B2B Catalog',
      urlMock: 'agricoz.in',
      shortDesc: 'Direct B2B product index connecting agricultural suppliers with buyers, utilizing direct WhatsApp API routing.',
      description: 'An online B2B catalog showing agricultural machinery components, feeds, and products, integrating direct communication loops.',
      clientBrief: 'The client wanted to bypass standard web e-commerce checkouts and route all buying discussions directly to WhatsApp.',
      challenges: 'Constructing product detail sheets that dynamically link quantities and specifications into a single-click pre-populated WhatsApp message.',
      contribution: 'Freelance Developer. Built dynamic catalog filters, connected WhatsApp message builders, and optimized mobile loading times.',
      stack: ['Responsive Web Design', 'JavaScript', 'WhatsApp API Integration'],
      url: 'https://agricoz.in/'
    },
    {
      id: 'kiranbody',
      category: 'live',
      title: 'Kiran Body Builders',
      urlMock: 'kiranbodybuilder.com',
      shortDesc: 'Corporate portfolio and heavy vehicle chassis customization gallery representing fabrication services.',
      description: 'Kiran Body Builders is a commercial vehicle customization workshop. The platform serves as a visual proof-of-work portfolio for corporate transport clients.',
      clientBrief: 'A rugged and highly visible portfolio showing completed dump truck, oil tanker, and container custom builds.',
      challenges: 'Designing a solid, grid-based layout that functions perfectly across tablet devices used on-site by workshops.',
      contribution: 'Freelance Developer. Built categorization filters for build types, styled typography hierarchies, and configured search optimizations.',
      stack: ['HTML5', 'CSS Flexbox', 'Vanilla JavaScript', 'Google Maps API'],
      url: 'https://kiranbodybuilder.com/'
    },
    {
      id: 'prepright',
      category: 'live',
      title: 'PrepRight — Learning Platform',
      urlMock: 'preppright.com',
      shortDesc: 'Quiz engine dashboard structuring mock evaluations, dynamic score charts, and student performance monitors.',
      description: 'PrepRight is an educational tool facilitating Mock tests. It incorporates interactive timers, auto-grading engines, and student results visualization panels.',
      clientBrief: 'An evaluation system with visual scorecharts so students could diagnose weak areas.',
      challenges: 'Securing mock exam timers and preventing state loss if a student refreshes their browser mid-test.',
      contribution: 'Freelance Engineer. Coded client-side session-persistence, built SVG scorechart graphs, and created downloadable PDF scorecard evaluations.',
      stack: ['React', 'Local Session Cache', 'SVG Charting', 'Dynamic PDF Generator'],
      url: 'https://preppright.com/'
    },
    {
      id: 'apex_store',
      category: 'template',
      title: 'Apex — E-commerce Store',
      urlMock: 'apex-blueprint.mock',
      shortDesc: 'A state-managed e-commerce concept demonstrating cart management, fluid grids, and invoice rendering.',
      description: 'An enterprise e-commerce template featuring fluid cart sliders, dynamic catalog pricing, and clean billing invoices.',
      clientBrief: 'Built as an internal high-fidelity template showing e-commerce state mechanisms.',
      challenges: 'Synchronizing item counts, options (sizes, colors), and prices across separate checkout headers.',
      contribution: 'Creator. Built global context store for managing cart state, simulated API product search, and coded smooth hover effects.',
      stack: ['React', 'Global Context', 'CSS Transitions', 'Mock Gateway API'],
      url: null
    },
    {
      id: 'urbanpro',
      category: 'template',
      title: 'Urban Pro — ERP Dashboard',
      urlMock: 'urbanpro-erp.mock',
      shortDesc: 'Enterprise layout panel demonstrating live server monitors, pipeline updates, and density lists.',
      description: 'An ERP dashboard concept with visual analytics panels showing sales pipelines, user management metrics, and live server logs.',
      clientBrief: 'Demonstrates ability to design density-heavy dashboard screens that remain legible.',
      challenges: 'Formatting high-density data tables and metrics summaries for mobile viewport sizes.',
      contribution: 'Creator. Coded sidebar routing, optimized SVG charts, built search list queries, and managed CSS custom themes.',
      stack: ['React', 'SVG Charts', 'Flex-wrap Layouts', 'CSS Themes'],
      url: null
    },
    {
      id: 'apex_it_consulting',
      category: 'template',
      title: 'Apex Systems — Enterprise IT Portal',
      urlMock: 'apex-it-consulting.mock',
      shortDesc: 'A B2B consulting portal template showcasing IT infrastructure capabilities, system audits, and automated scheduling workflows.',
      description: 'An enterprise-grade corporate IT consulting template presenting modular services, hardware/network architecture planning, and webhook-based lead capture integrations.',
      clientBrief: 'Built to structure professional information and consulting options for corporate IT and network scaling contracts.',
      challenges: 'Ensuring fast load delivery, maintaining lightweight components, and scripting reliable webhook leads routing.',
      contribution: 'Lead Architect. Developed fully responsive grid schemes, connected automated form endpoints, and coded interactive components.',
      stack: ['React', 'Vanilla CSS', 'Formspree Webhooks', 'Vercel Deployment'],
      url: 'https://payivva-technologies-and-opc.vercel.app/'
    },
    {
      id: 'edverse_edge',
      category: 'template',
      title: 'Edverse Edge — Learning Management System',
      urlMock: 'edverseedge-blueprint.mock',
      shortDesc: 'A modern online academy dashboard template featuring student tracking, interactive courses catalogs, and mock test models.',
      description: 'An educational LMS dashboard staging platform built to showcase course catalog layouts, active student tracking metrics, and mock evaluation structures.',
      clientBrief: 'Designed to represent a dynamic portal template for tutoring centers and training academies looking to digitalize curriculum structures.',
      challenges: 'Configuring legibility and high contrast scales for student users while keeping code delivery extremely fast.',
      contribution: 'Creator. Built responsive dashboard sidebar navigation, structured catalog grids, and styled scorecard components.',
      stack: ['React', 'CSS Flexbox', 'Vercel Staging', 'State Management'],
      url: 'https://edversseedge.vercel.app/'
    },
    {
      id: 'vd_mahale',
      category: 'template',
      title: 'VD Mahale — Engineering & Construction Showcase',
      urlMock: 'vd-mahale-construction.mock',
      shortDesc: 'A professional heavy industries B2B template highlighting safety records, site portfolios, and service quote triggers.',
      description: 'A robust corporate showcase template custom built for civil engineering and general contracting firms to highlight safety metrics, equipment rosters, and completed site visual archives.',
      clientBrief: 'Designed to build strong B2B credibility for construction firms, allowing potential clients to request quotes on major contracting projects.',
      challenges: 'Displaying high-resolution site photography without shifting grid alignments on varying viewport sizes.',
      contribution: 'Creator. Deployed responsive visual gallery sliders, coded grid structures, and integrated localized client contact pipelines.',
      stack: ['HTML5', 'Custom CSS Grid', 'Vanilla JS', 'Vercel Deployment'],
      url: 'https://vd-mahale-construction.vercel.app/'
    },
    {
      id: 'divine_cosmos',
      category: 'template',
      title: 'Divine Cosmos — Astrology Consulting Platform',
      urlMock: 'astrology-cosmos.mock',
      shortDesc: 'A modern astrological counseling showcase template featuring dynamic celestial grids, scheduling, and spiritual logs.',
      description: 'A premium spiritual counseling and horoscope staging platform template containing interactive scheduling layouts, birth chart estimators, and zodiac readings logs.',
      clientBrief: 'Built to combine custom aesthetic gradients and glowing borders with standard business consultation workflows.',
      challenges: 'Styling complex glow shadows and backdrop-filter glass layers to look clean and premium on older browsers.',
      contribution: 'Creator. Styled modern glow aesthetics, integrated customized responsive scheduling grids, and managed asset deployments.',
      stack: ['React', 'Vibrant Gradients', 'Form Handlers', 'Vercel Hosting'],
      url: 'https://astology-new.vercel.app/'
    },
    {
      id: 'orfit_pharma',
      category: 'template',
      title: 'Orfit Pharmaceuticals — B2B Medical Portal',
      urlMock: 'orfit-pharmaceuticals.mock',
      shortDesc: 'A healthcare distributor catalog template presenting regulatory certifications, medicine listings, and supply quote requests.',
      description: 'A structured B2B medical supply catalog staging template designed for pharmaceuticals manufacturers and distributors to catalog regulatory compliances and gather purchase orders.',
      clientBrief: 'Created to outline a secure clinical catalog framework allowing medical suppliers to list specifications and process logistics inquiries.',
      challenges: 'Structuring complex chemical lists and safety compliance tables into responsive mobile panels.',
      contribution: 'Creator. Formatted extensive specifications grids, styled regulatory certificate showcases, and configured secure business lead paths.',
      stack: ['React', 'B2B Catalog Filters', 'Vanilla CSS', 'Vercel hosting'],
      url: 'https://payivva-orfitpharmaceuticals.vercel.app/'
    },
    {
      id: 'nova_erp',
      category: 'template',
      title: 'Nova ERP — Supply Chain & Logistics Portal',
      urlMock: 'nova-logistics-erp.mock',
      shortDesc: 'An enterprise dashboard template for tracking real-time fleet operations, inventory cycles, and supplier invoices.',
      description: 'An enterprise supply chain ERP dashboard template showing fleet tracking metrics, warehouse stock allocations, and direct purchase orders management.',
      clientBrief: 'Demonstrates high-density data visualizations for managing large-scale transport logistics.',
      challenges: 'Rendering real-time geo-coordinates of trucks and synchronizing multi-warehouse inventory quantities.',
      contribution: 'Designed interactive maps integration, coded the custom grid table layouts, and styled status charts.',
      stack: ['React', 'CSS Flexbox', 'Leaflet Map Mock', 'Recharts SVG'],
      url: null
    },
    {
      id: 'horizon_lms',
      category: 'template',
      title: 'Horizon LMS — Academic Portal',
      urlMock: 'horizon-lms-portal.mock',
      shortDesc: 'An online course portal template for universities, hosting video playback layers, assignment submission slots, and grading charts.',
      description: 'A modern university educational platform template designed for course syllabus indexing, student grade books, and interactive lecture modules.',
      clientBrief: 'A clean layout with high contrast readability for academic environments.',
      challenges: 'Styling robust data grids for class performance indexes that scale nicely on student mobile viewports.',
      contribution: 'Built video progress bar controls, assignment drag-and-drop file upload interface layout, and global dark mode styles.',
      stack: ['React', 'CSS Variables', 'HTML5 Media API'],
      url: null
    },
    {
      id: 'intellect_crm',
      category: 'template',
      title: 'Intellect CRM — SaaS Sales Portal',
      urlMock: 'intellect-crm-saas.mock',
      shortDesc: 'A high-performance pipeline manager mockup featuring drag-and-drop lead boards, automated follow-up trackers, and income forecasting.',
      description: 'A sales-focused SaaS CRM dashboard mockup showing drag-and-drop deals pipelines, client interaction timelines, and revenue projections.',
      clientBrief: 'A smooth UX focusing on pipeline velocity and customer relationship status trackers.',
      challenges: 'Scripting fluid horizontal scroll boards for sales stages that look clean on mobile web screens.',
      contribution: 'Built deal card custom animations, lead funnel calculators, and configured flexible dashboard layout options.',
      stack: ['React', 'Vanilla CSS', 'Global State Context'],
      url: null
    },
    {
      id: 'healthbridge',
      category: 'template',
      title: 'HealthBridge — Telemedicine Portal',
      urlMock: 'healthbridge-telehealth.mock',
      shortDesc: 'A HIPAA-compliant telehealth layout showcasing appointment schedules, video channels, and encrypted patient records.',
      description: 'A digital healthcare portal template designed for patient intake, live video consultations booking, and secure medical history archives.',
      clientBrief: 'Needs a calm, trust-inspiring design with robust security indicators for medical patients.',
      challenges: 'Ensuring responsive layout layouts for patient portals on legacy tablet viewports.',
      contribution: 'Integrated mock WebRTC channels, designed patient intake forms, and coded dashboard statistics.',
      stack: ['React', 'CSS Flexbox', 'WebRTC Mock API'],
      url: null
    },
    {
      id: 'propvibe',
      category: 'template',
      title: 'PropVibe — Real Estate Listing Ledger',
      urlMock: 'propvibe-realestate.mock',
      shortDesc: 'Interactive property finder featuring geo-location map listings, virtual tour players, and direct agent booking.',
      description: 'A premium property catalog template showcasing apartment units, virtual layout viewer integrations, and agent contact leads.',
      clientBrief: 'A visual-centric portal showing listings in high fidelity to decrease transaction drop-off.',
      challenges: 'Optimizing progressive loading of large 360-degree virtual tour components.',
      contribution: 'Coded listing filters, integrated location maps, and built scheduling forms.',
      stack: ['React', 'CSS Grid', 'Google Maps Mock API'],
      url: null
    },
    {
      id: 'finglow',
      category: 'template',
      title: 'FinGlow — Personal Wealth Ledger',
      urlMock: 'finglow-fintech.mock',
      shortDesc: 'Interactive asset manager depicting multi-bank account balances, stock market charts, and automated monthly budgets.',
      description: 'A clean personal finance tracking dashboard template displaying savings metrics, live expense lists, and asset trends.',
      clientBrief: 'High contrast design focusing on legible charts and rapid expense logging fields.',
      challenges: 'Formatting responsive currency datasets and configuring smooth SVG transition lines.',
      contribution: 'Built custom SVG charts, expense calculator state, and styled theme variables.',
      stack: ['React', 'SVG Charting', 'Local Cache State'],
      url: null
    },
    {
      id: 'resortly',
      category: 'template',
      title: 'Resortly — Hotel Booking Engine',
      urlMock: 'resortly-booking.mock',
      shortDesc: 'An elegant resort booking workflow showing room catalogs, check-in calendars, and dynamic pricing filters.',
      description: 'A high-end travel booking interface blueprint supporting calendar room selections, billing calculators, and customer query routes.',
      clientBrief: 'Luxury aesthetic conveying absolute premium quality for high-end boutique resorts.',
      challenges: 'Handling room availability state calculations without delays or overlap.',
      contribution: 'Designed clean calendar layouts, coded room filtering systems, and structured inquiry pipelines.',
      stack: ['React', 'Vanilla CSS', 'Date Picker Mock'],
      url: null
    },
    {
      id: 'autospec',
      category: 'template',
      title: 'AutoSpec — Vehicle Configurator',
      urlMock: 'autospec-configurator.mock',
      shortDesc: '3D vehicle layout customization interface showcasing model variations, color schemes, and pricing matrices.',
      description: 'A custom vehicle detailing template designed to let customers preview chassis styles, alloy wheels, and interior configs.',
      clientBrief: 'Dynamic layout focusing on visual customizers and pre-filled dealer quote request relays.',
      challenges: 'Developing clean visual state changes when swapping chassis assets dynamically.',
      contribution: 'Designed selection menus, configured image overlay layers, and integrated lead submission.',
      stack: ['React', 'CSS Grid', 'Overlay Customizer Engine'],
      url: null
    },
    {
      id: 'hrflow',
      category: 'template',
      title: 'HRFlow — Talent Pipeline Tracker',
      urlMock: 'hrflow-recruitment.mock',
      shortDesc: 'A kanban-based recruiting board displaying candidate stages, automated interview calendars, and evaluator notes.',
      description: 'A modern applicant tracking system template featuring candidate resume indexing, drag-and-drop recruitment stages, and scorecards.',
      clientBrief: 'A productivity-first platform designed to decrease time-to-hire through clear candidate status highlights.',
      challenges: 'Scripting smooth candidate stage drag actions without causing full-page rerenders.',
      contribution: 'Coded the kanban column layout, designed evaluators scoring grids, and configured sidebar routing.',
      stack: ['React', 'CSS Transitions', 'Kanban Board Logic'],
      url: null
    },
    {
      id: 'voltgrid',
      category: 'template',
      title: 'VoltGrid — Utility Load Monitor',
      urlMock: 'voltgrid-energy.mock',
      shortDesc: 'Industrial dashboard detailing real-time solar battery grid levels, load distributions, and carbon offset logs.',
      description: 'An IoT energy monitoring interface template displaying real-time power analytics, grid health alerts, and battery status metrics.',
      clientBrief: 'A density-focused industrial console showing critical metrics for grid engineers.',
      challenges: 'Structuring large metric panels to fit cleanly on site laptops and tablet screens.',
      contribution: 'Coded grid alert system notifications, customized energy load line charts, and structured metric lists.',
      stack: ['React', 'SVG Gauges', 'CSS Flexbox'],
      url: null
    },
    {
      id: 'legiscribe',
      category: 'template',
      title: 'Legiscribe — Case Manager Portal',
      urlMock: 'legiscribe-legal.mock',
      shortDesc: 'A legal dashboard template displaying active litigation timelines, client billing logs, and automated document templates.',
      description: 'A professional law firm case organizer blueprint showing ongoing hearing dates, document filing statuses, and hourly client invoices.',
      clientBrief: 'Corporate, authoritative design focusing on document accessibility and secure case milestones.',
      challenges: 'Ensuring responsive and legible multi-page text grids for dense legal documents.',
      contribution: 'Coded litigation calendars, configured invoice calculators, and styled table layouts.',
      stack: ['React', 'CSS Custom Variables', 'Invoice Generator Engine'],
      url: null
    },
    {
      id: 'feedly',
      category: 'template',
      title: 'Feedly — Agribusiness Catalog',
      urlMock: 'feedly-agri.mock',
      shortDesc: 'Agri-bulk products index managing crop inventories, bulk trading catalogs, and logistic shipping logs.',
      description: 'A specialized agricultural supply chain template displaying seed inventories, warehouse listings, and wholesale merchant queries.',
      clientBrief: 'Simple, high contrast layout targeting rural suppliers and urban logistics teams.',
      challenges: 'Formatting complex bulk cargo grids and price conversions for mobile viewports.',
      contribution: 'Designed bulk pricing calculators, configured crop catalog selectors, and integrated query systems.',
      stack: ['React', 'CSS Grid', 'Form Handlers'],
      url: null
    },
    {
      id: 'aerospace',
      category: 'template',
      title: 'AeroSpace — Hangar Slot Booker',
      urlMock: 'aerospace-aviation.mock',
      shortDesc: 'Aviation operations dashboard booking hangar spaces, maintenance slots, and fuel dispatch logs.',
      description: 'A high-performance aviation logistics blueprint supporting hangar reservation calendars, maintenance queue trackers, and pilot schedules.',
      clientBrief: 'Dynamic, dark-themed control board optimizing slot usage and scheduling visibility.',
      challenges: 'Aligning time slots and availability charts for private hangars without collision.',
      contribution: 'Built hourly scheduling grids, designed pilot log input forms, and configured theme metrics.',
      stack: ['React', 'CSS Grid Layouts', 'Aviation Icon Set'],
      url: null
    }
  ];

  // AI & Tech custom projects
  const aiProjects = [
    {
      title: 'Brain Tumor Detection System',
      badge: 'AI Classifier',
      tech: ['98% Accuracy', 'Python', 'YOLO v8', 'OpenCV', 'Streamlit', 'SQLite', 'Linux'],
      desc: 'Developed an automated computer vision system that classifies and detects brain tumors from MRI scan uploads. Achieved a 98% validation accuracy rate, integrating a Streamlit dashboard that lets doctors load images and download structured PDF reports of diagnostic findings.'
    },
    {
      title: 'Automated DevSecOps Pipeline',
      badge: 'DevOps & Cloud',
      tech: ['Jenkins', 'Docker', 'SonarQube', 'Trivy Scanner', 'GitHub Webhooks', 'Linux Systems'],
      desc: 'Architected an end-to-end automated deployment pipeline. Integrating security checks (Trivy image scanning, SonarQube quality gates) to analyze code quality and potential vulnerabilities before building Docker containers and deploying them to staging instances with rollback capabilities.'
    },
    {
      title: 'RAG Customer Support AI Chatbot',
      badge: 'AI Chatbot / NLP',
      tech: ['95% Query Accuracy', 'Python', 'LangChain', 'OpenAI GPT-4', 'Pinecone Vector DB', 'FastAPI', 'React'],
      desc: 'Problem Solved: The client faced massive support queues and high overhead handling repetitive product queries on their B2B platform. Client Benefit: Engineered a Retrieval-Augmented Generation (RAG) chatbot that answers customer questions using vector search documentation. Cut queue wait times by 70% and saved $40k/year in operations.'
    },
    {
      title: 'Automated Lead Qualification WhatsApp Bot',
      badge: 'AI Chatbot / Integration',
      tech: ['WhatsApp Business API', 'Claude 3.5 Sonnet', 'n8n Workflows', 'PostgreSQL', 'FastAPI'],
      desc: 'Problem Solved: Sales teams spent 15+ hours weekly manually qualifying leads and booking consultation calls across varying timezones. Client Benefit: Deployed an interactive conversational bot that screens intent, filters spam, and schedules Calendly slots. Boosted sales conversion rates by 22% and reduced response delay to under 2 minutes.'
    },
    {
      title: 'Conversational Shopping AI Guide',
      badge: 'AI Chatbot / Recommender',
      tech: ['Vector Search', 'Shopify Admin API', 'FastAPI', 'Dialogflow', 'Python'],
      desc: 'Problem Solved: E-commerce visitors struggled to find relevant components in a vast catalog of 50,000+ items, raising bounce rates. Client Benefit: Programmed a chat assistant that interprets natural language specifications (e.g., "show me high-torque motors under $200") to recommend exact matches. Increased Average Order Value by 18%.'
    },
    {
      title: 'Multi-Lingual Legal Intake Voicebot',
      badge: 'AI Chatbot / Translation',
      tech: ['Whisper API', 'HuggingFace', 'Transformers', 'LangChain', 'FastAPI', 'AWS Lambda'],
      desc: 'Problem Solved: A consulting firm faced massive administrative backlogs transcribing and translating client intake reports across multiple Indian regional languages. Client Benefit: Designed a voice-and-text chatbot that translates, summarizes, and routes legal intake messages. Reduced processing latency from 4 days to 5 minutes.'
    },
    {
      title: 'Predictive Sales Forecast Engine',
      badge: 'Predictive Analytics',
      tech: ['92% Trend Accuracy', 'Python', 'Scikit-Learn', 'Pandas', 'FB Prophet', 'PostgreSQL'],
      desc: 'Engineered a machine learning pipeline that forecasts quarterly product demand and sales volumes for retail distributors. Analyzed historical transaction records to generate seasonal trend insights and inventory restocking alerts.'
    }
  ];

  // Process timeline datasets
  const processSteps = [
    { num: '01', title: 'Scope & Architect', desc: 'Analyzing business bottlenecks, drafting database wireframes, and scoping cloud limits.' },
    { num: '02', title: 'System Blueprint', desc: 'Structuring REST APIs schemas, n8n workflow routes, and database models configurations.' },
    { num: '03', title: 'Fullstack Build', desc: 'Coded high-performance React UI frontends integrated with secure Python backend engines.' },
    { num: '04', title: 'AWS Cloud Staging', desc: 'Deploying secure sandbox environments on AWS EC2 or RDS instances for live client evaluations.' },
    { num: '05', title: 'Handoff & Monitor', desc: 'Setting up DNS, SSL parameters, complete code handover, and post-launch server status monitors.' }
  ];

  // Career datasets
  const careerData = [
    {
      id: 'payivva',
      date: '2025 — Present',
      role: 'Associate AI/ML Engineer',
      company: 'Payivva Technologies & OPC Pvt. Ltd. — Pune',
      bullets: [
        'Architecting custom AI-driven business portals and automating workflows using n8n and API integrations.',
        'Connecting Large Language Models (LLMs) to production frontends with secure context boundaries.',
        'Building client-facing responsive websites, managing full-cycle delivery from mockups to final cloud deployment.',
        'Designing secure hardware and networking topologies, integrating smart surveillance systems for enterprise clients.'
      ]
    },
    {
      id: 'infosys',
      date: 'Sep 2024 — Feb 2025',
      role: 'AI Intern',
      company: 'Infosys Springboard',
      bullets: [
        'Automated document indexing pipelines and NLP text-processing workflows utilizing Python scripting.',
        'Configured asynchronous backend request runners, speeding up text analysis tasks by 35%.',
        'Refined prompt parameters and evaluation strategies to enhance model response formatting.'
      ]
    },
    {
      id: 'elite',
      date: 'Jan 2023 — Mar 2023',
      role: 'Python & Django Intern',
      company: 'Elite Software — Pune',
      bullets: [
        'Contributed to customer database modules and REST API endpoints using Python and Django.',
        'Configured test servers on AWS EC2, implementing S3 bucket connections and setting up staging databases on RDS.'
      ]
    },
    {
      id: 'education',
      date: '2021 — 2025',
      role: 'B.E. — Artificial Intelligence & Machine Learning',
      company: 'Savitribai Phule Pune University · Pune',
      bullets: [
        'Graduated with a CGPA of 8.06/10.',
        'Completed projects in computer vision (Object Detection) and neural network classifiers.'
      ]
    }
  ];

  // Certifications datasets
  const certificationsList = [
    { title: 'AWS Certified Cloud Practitioner (CLF-C02)', org: 'Amazon Web Services · 2025', icon: '☁️' },
    { title: 'AWS re/Start Graduate', org: 'Amazon Web Services · 2025', icon: '🚀' },
    { title: 'Full Stack Web Development (MERN Stack)', org: 'Kiran Academy Pune · 2025', icon: '⚛️' },
    { title: 'Artificial Intelligence Primer', org: 'Infosys · 2024', icon: '🤖' },
    { title: 'Essential Google Cloud Infrastructure', org: 'Google Cloud · 2023', icon: '🌐' }
  ];

  // Testimonials database
  const testimonials = [
    {
      quote: "Soham delivered our AI corporate portal on-time, fully responsive. His understanding of n8n webhook routing and lead collection workflows is top-tier.",
      author: "Siddharth Kumar",
      company: "CEO, Creovix"
    },
    {
      quote: "Outstanding visual catalog presentation. Soham optimized our media galleries to load progressively, resolving layout shift delays completely.",
      author: "Ganesh Shinde",
      company: "Director, Wedner Events"
    },
    {
      quote: "The quiz grading algorithm and score session persistence Soham programmed is extremely stable. High standard of client communication.",
      author: "Ankit Singh",
      company: "Director, PrepRight Education"
    },
    {
      quote: "Soham built our B2B catalog integration template. It has made product sourcing requests incredibly fast and doubled client conversations.",
      author: "Pratik Magar",
      company: "Founder, Agricoz"
    },
    {
      quote: "Excellent work on our heavy vehicles customization showcase. The responsive portfolio layout runs perfectly on tablet devices, highlighting our fabrication works.",
      author: "Kiran Kadam",
      company: "Owner, Kiran Body Builders"
    },
    {
      quote: "Our parent notices portal is very easy to use. Soham created a secure, low-maintenance staging platform that loads instantly on budget mobile devices.",
      author: "Sangita Mam",
      company: "Principal, Kids Pride School"
    }
  ];

  // FAQ database
  const faqList = [
    {
      q: "Do you provide post-launch support?",
      a: "Yes. I offer 30 days of complimentary support for bug fixes and layout calibrations, and offer ongoing monthly maintenance retainers to keep systems updated."
    },
    {
      q: "How do you handle project payments?",
      a: "Projects are typically billed on milestone achievements (e.g. Prototype delivery, Backend setup, AWS Staging, and Production Handoff). Use the Scope Estimator tool below for baseline budgets!"
    },
    {
      q: "Can you integrate AI modules into existing websites?",
      a: "Yes. I can integrate n8n, OpenAI/Claude API modules, vector databases, and custom text processing systems into your legacy web systems."
    },
    {
      q: "Are you available for international contracts?",
      a: "Yes. I collaborate remotely with international clients and structure communication milestones via Zoom, Slack, or Telegram."
    }
  ];

  // Scope Estimator computations
  const estimatorResults = useMemo(() => {
    let baseHours = estScale === 1 ? 30 : estScale === 2 ? 70 : 150;
    if (estServices.includes('frontend')) baseHours += 20;
    if (estServices.includes('backend')) baseHours += 30;
    if (estServices.includes('n8n')) baseHours += 15;
    if (estServices.includes('aws')) baseHours += 25;

    const weeks = Math.ceil(baseHours / 20);
    const usdMin = baseHours * 20;
    const usdMax = baseHours * 30;
    const inrMin = baseHours * 1500;
    const inrMax = baseHours * 2500;

    return {
      hours: baseHours,
      weeks,
      usd: `${usdMin.toLocaleString()} - $${usdMax.toLocaleString()}`,
      inr: `₹${inrMin.toLocaleString('en-IN')} - ₹${inrMax.toLocaleString('en-IN')}`
    };
  }, [estServices, estScale]);

  const toggleEstService = (id) => {
    setEstServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Filtered projects selector
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return projectsData;
    return projectsData.filter((p) => p.category === projectFilter);
  }, [projectFilter]);



  // Form Validations & Submissions
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Your name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) errs.message = 'Please type a project summary';
    return errs;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      addToast('Please correct the validation errors.', 'error');
      return;
    }
    setFormErrors({});
    setFormSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        addToast('Inquiry successfully dispatched! Confirmation email sent.', 'success');
        setFormData({ name: '', email: '', message: '' });
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

  return (
    <div className={`theme-${accentTheme}`}>
      {showSplash && (
        <div className={`splash-screen-overlay ${splashFade ? 'fade-out' : ''}`}>
          <div className="splash-container">
            <div className="splash-banner-wrapper-large">
              <img src="/abc.jfif" alt="Soham Pawar Welcome Banner" className="splash-banner-img-large" />
            </div>
            <div className="splash-controls-large">
              <h2 className="splash-title-large">Soham Pawar <span>Portfolio</span></h2>
              <p className="splash-subtitle-large">Systems, Automation &amp; AI Solutions</p>
              <div className="splash-loader-bar">
                <div className="splash-loader-progress"></div>
              </div>
              <button className="btn-tech btn-gradient splash-enter-btn" onClick={handleEnterSite}>
                Enter Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cursor-glow"></div>
      <div className="grid-mesh"></div>
      <div className="glow-ambient"></div>
      <div className="glow-ambient-2"></div>

      {/* HEADER & NAVIGATION */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <a href="#root" className="logo-tech">
            SOHAM PAWAR
          </a>
          <nav className="nav-links">
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Me</a>
            <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Services</a>
            <a href="#estimator" className={`nav-link ${activeSection === 'estimator' ? 'active' : ''}`}>Estimator</a>
            <a href="#work" className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}>Projects</a>
            <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}>Feedback</a>
            <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Journey</a>
            <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}>FAQ</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
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

            <a href="#contact" className="btn-tech btn-gradient" style={{ padding: '0.55rem 1.15rem', fontSize: '0.8rem' }}>Hire Me</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="reveal-on-scroll" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-layout">
          <div className="hero-left">
            <div className="section-label">AI &amp; Systems Integration</div>
            <h1 className="hero-heading">
              Building <span>Intelligent</span> Automation &amp; Scale.
            </h1>
            <p className="hero-desc">
              High-performance web applications, serverless architectures, and n8n workflows built for business efficiency. AWS certified developer executing tasks with complete professional detailing.
            </p>
            <div className="hero-btns">
              <a href="#work" className="btn-tech btn-gradient">Explore Client Projects</a>
              <a href="#contact" className="btn-tech btn-secondary">Get Free Consultation</a>
            </div>
            <div className="hero-metrics">
              <div className="metric-card">
                <div className="metric-val">6<span>+</span></div>
                <div className="metric-lbl">Live Systems Released</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">2<span>+</span></div>
                <div className="metric-lbl">Years Industry Experience</div>
              </div>
              <div className="metric-card">
                <div className="metric-val">AWS</div>
                <div className="metric-lbl">Cloud Practitioner Certified</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <DashboardWidget />
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">about me</div>
        <h2 className="section-title">Professional <span>Profile &amp; Banner</span></h2>
        
        <div className="about-layout">
          {/* LinkedIn Banner Mockup */}
          <div className="about-banner-wrapper">
            <div className="browser-header-mock" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="browser-dots">
                <div className="browser-dot" style={{ background: '#EF4444' }}></div>
                <div className="browser-dot" style={{ background: '#F59E0B' }}></div>
                <div className="browser-dot" style={{ background: '#10B981' }}></div>
              </div>
              <div className="browser-url-bar" style={{ width: '400px' }}>
                linkedin.com/in/soham-pawar
              </div>
              <div style={{ width: '25px' }}></div>
            </div>
            <img 
              src="/logo.jpg" 
              alt="Soham Pawar LinkedIn Banner" 
              className="about-banner-img"
            />
          </div>

          {/* Details Row */}
          <div className="about-details-grid">
            {/* Bio Card */}
            <div className="about-bio-card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-white)' }}>
                Who is Soham Pawar?
              </h3>
              <p>
                I am an <strong>Associate AI/ML Engineer</strong> and <strong>AWS Certified Cloud Practitioner</strong> based in Pune, India. 
                I specialize in designing and executing end-to-end fullstack systems, automating enterprise business pipelines, and deploying containerized applications to secure cloud architectures.
              </p>
              <div className="about-bio-highlight">
                "Building intelligent solutions with Artificial Intelligence and Machine Learning."
              </div>
              <p>
                Having graduated with a Bachelor of Engineering (B.E.) in AI &amp; Machine Learning from Savitribai Phule Pune University, 
                I combine classical systems engineering with modern generative AI toolsets, helping organizations automate workflows and scale operations.
              </p>
            </div>

            {/* Quick Contact & Facts Card */}
            <div className="about-facts-card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-white)' }}>
                Key Details
              </h3>
              <div className="about-facts-list">
                {/* Email */}
                <a href="mailto:sohampawar1030@gmail.com" className="about-fact-item">
                  <div className="about-fact-icon">✉️</div>
                  <div className="about-fact-content">
                    <span className="about-fact-lbl">Email Address</span>
                    <span className="about-fact-val">sohampawar1030@gmail.com</span>
                  </div>
                </a>

                {/* Phone */}
                <a href="tel:+917030806080" className="about-fact-item">
                  <div className="about-fact-icon">📞</div>
                  <div className="about-fact-content">
                    <span className="about-fact-lbl">Phone &amp; Telegram</span>
                    <span className="about-fact-val">+91 70308 06080</span>
                  </div>
                </a>

                {/* Location */}
                <div className="about-fact-item">
                  <div className="about-fact-icon">📍</div>
                  <div className="about-fact-content">
                    <span className="about-fact-lbl">Location</span>
                    <span className="about-fact-val">Pune, Maharashtra, India</span>
                  </div>
                </div>

                {/* Role */}
                <div className="about-fact-item">
                  <div className="about-fact-icon">🤖</div>
                  <div className="about-fact-content">
                    <span className="about-fact-lbl">Specialization</span>
                    <span className="about-fact-val">AI/ML &amp; Systems Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="skills" className="reveal-on-scroll">
        <div className="section-label">capabilities</div>
        <h2 className="section-title">What I Do For <span>Your Business</span></h2>
        <div className="services-grid" style={{ marginBottom: '4rem' }}>
          {servicesData.map((s, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon-box">
                {s.icon}
              </div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Skill Stack Selector */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          <div className="section-label">interactive tools</div>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Select Stacks for <span>Expertise Profiles</span></h3>
          <div className="tech-selector-grid">
            {Object.keys(techStackData).map((key) => (
              <button
                key={key}
                className={`tech-selector-btn ${selectedTech === key ? 'active' : ''}`}
                onClick={() => setSelectedTech(key)}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="tech-detail-card">
            <div className="tech-detail-main">
              <span className="preview-badge" style={{ background: 'var(--accent-cyan)', color: 'var(--text-dark)', fontWeight: 'bold' }}>
                {techStackData[selectedTech].level}
              </span>
              <h3>{techStackData[selectedTech].name}</h3>
              <p>{techStackData[selectedTech].desc}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Integrated Projects</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {techStackData[selectedTech].projects.map((proj, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-cyan)', marginRight: '0.5rem' }}>✓</span> {proj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED TECH SPECIALIZATION BUILDS */}
      <section className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">featured builds</div>
        <h2 className="section-title">Systems &amp; <span>Machine Learning</span> Builds</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {aiProjects.map((proj, idx) => (
            <div
              key={idx}
              className="service-card"
              style={{
                border: '1px solid rgba(6, 182, 212, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px -15px rgba(6, 182, 212, 0.1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="project-type-badge type-badge-live">{proj.badge}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></div>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', opacity: 0.5 }}></div>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {proj.desc}
                </p>
              </div>
              <div className="project-stack-row" style={{ marginBottom: 0 }}>
                {proj.tech.map((t, ti) => (
                  <span key={ti} className="stack-pill-mini">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE AWS ARCHITECTURE VISUALIZER */}
      <section className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">cloud configuration</div>
        <h2 className="section-title">Interactive <span>AWS Cloud Topologies</span></h2>
        <div className="aws-visualizer-grid">
          <div>
            <div className="aws-canvas-mock">
              <svg className="aws-line-svg">
                {/* Connecting lines between nodes */}
                <line x1="15%" y1="50%" x2="40%" y2="50%" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="40%" y1="50%" x2="68%" y2="50%" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <line x1="68%" y1="50%" x2="90%" y2="25%" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <line x1="68%" y1="50%" x2="90%" y2="75%" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              </svg>

              <button
                className={`aws-node-box ${activeAwsNode === 'dns' ? 'active' : ''}`}
                style={{ position: 'absolute', left: '5%', top: '35%' }}
                onClick={() => setActiveAwsNode('dns')}
              >
                <div className="aws-node-icon">🌐</div>
                <span className="aws-node-lbl">Route 53</span>
              </button>

              <button
                className={`aws-node-box ${activeAwsNode === 'proxy' ? 'active' : ''}`}
                style={{ position: 'absolute', left: '30%', top: '35%' }}
                onClick={() => setActiveAwsNode('proxy')}
              >
                <div className="aws-node-icon">🛡️</div>
                <span className="aws-node-lbl">Nginx Proxy</span>
              </button>

              <button
                className={`aws-node-box ${activeAwsNode === 'ec2' ? 'active' : ''}`}
                style={{ position: 'absolute', left: '55%', top: '35%' }}
                onClick={() => setActiveAwsNode('ec2')}
              >
                <div className="aws-node-icon">💻</div>
                <span className="aws-node-lbl">EC2 Server</span>
              </button>

              <button
                className={`aws-node-box ${activeAwsNode === 'storage' ? 'active' : ''}`}
                style={{ position: 'absolute', right: '5%', top: '10%' }}
                onClick={() => setActiveAwsNode('storage')}
              >
                <div className="aws-node-icon">🗂️</div>
                <span className="aws-node-lbl">S3 Bucket</span>
              </button>

              <button
                className={`aws-node-box ${activeAwsNode === 'rds' ? 'active' : ''}`}
                style={{ position: 'absolute', right: '5%', bottom: '10%' }}
                onClick={() => setActiveAwsNode('rds')}
              >
                <div className="aws-node-icon">🗄️</div>
                <span className="aws-node-lbl">RDS Postgres</span>
              </button>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem 2rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>AWS Component Specifications</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-white)' }}>{awsNodeData[activeAwsNode].name}</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Configuration pattern</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{awsNodeData[activeAwsNode].pattern}</p>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Deployment role</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{awsNodeData[activeAwsNode].role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SCOPE ESTIMATOR SECTION */}
      <section id="estimator" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">interactive estimator</div>
        <h2 className="section-title">Calculate Your <span>Project Scope</span></h2>
        <div className="estimator-layout">
          <div>
            <h3 className="estimator-title">Select Services Needed</h3>
            <div className="estimator-options-grid">
              <button
                className={`estimator-option-btn ${estServices.includes('frontend') ? 'active' : ''}`}
                onClick={() => toggleEstService('frontend')}
              >
                <div className="estimator-checkbox">✓</div>
                <div>
                  <div style={{ fontWeight: '600' }}>Frontend Web Layout</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>React.js / Responsive CSS</span>
                </div>
              </button>
              <button
                className={`estimator-option-btn ${estServices.includes('backend') ? 'active' : ''}`}
                onClick={() => toggleEstService('backend')}
              >
                <div className="estimator-checkbox">✓</div>
                <div>
                  <div style={{ fontWeight: '600' }}>Backend REST APIs</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Python / Django Servers</span>
                </div>
              </button>
              <button
                className={`estimator-option-btn ${estServices.includes('n8n') ? 'active' : ''}`}
                onClick={() => toggleEstService('n8n')}
              >
                <div className="estimator-checkbox">✓</div>
                <div>
                  <div style={{ fontWeight: '600' }}>n8n AI Workflows</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Automations / Lead routers</span>
                </div>
              </button>
              <button
                className={`estimator-option-btn ${estServices.includes('aws') ? 'active' : ''}`}
                onClick={() => toggleEstService('aws')}
              >
                <div className="estimator-checkbox">✓</div>
                <div>
                  <div style={{ fontWeight: '600' }}>AWS Cloud Infrastructure</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>EC2 / RDS DB deployments</span>
                </div>
              </button>
            </div>

            <div className="estimator-slider-wrap">
              <div className="slider-labels-row">
                <span>Select Project Size</span>
                <span className="text-cyan" style={{ fontWeight: '600' }}>
                  {estScale === 1 ? 'Small Business Landing / Portal' : estScale === 2 ? 'Medium Application / Web System' : 'Enterprise SaaS / High Density Dashboards'}
                </span>
              </div>
              <input
                type="range"
                className="estimator-slider"
                min="1"
                max="3"
                value={estScale}
                onChange={(e) => setEstScale(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="estimator-result-card">
            <div className="estimator-stat-row">
              <div className="estimator-stat-lbl">Estimated Duration</div>
              <div className="estimator-stat-val">{estimatorResults.weeks} Weeks <span>({estimatorResults.hours} Hours)</span></div>
            </div>
            <div className="estimator-stat-row">
              <div className="estimator-stat-lbl">Budget Assessment</div>
              <div className="estimator-stat-val" style={{ color: 'var(--accent-cyan)' }}>
                {estimatorResults.inr} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.35rem' }}> / {estimatorResults.usd}</span>
              </div>
            </div>
            <a href="#contact" className="btn-tech btn-gradient" style={{ justifyContent: 'center' }}>
              Confirm Estimate &amp; Start &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CLIENT PROJECTS SHOWCASE */}
      <section id="work" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">case studies</div>
        <h2 className="section-title">Production <span>Client Portfolios</span></h2>

        {/* Filter controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            className={`palette-btn ${projectFilter === 'all' ? 'active' : ''}`}
            style={{ borderColor: projectFilter === 'all' ? 'var(--accent-cyan)' : '' }}
            onClick={() => setProjectFilter('all')}
          >
            All Work
          </button>
          <button
            className={`palette-btn ${projectFilter === 'live' ? 'active' : ''}`}
            style={{ borderColor: projectFilter === 'live' ? 'var(--accent-cyan)' : '' }}
            onClick={() => setProjectFilter('live')}
          >
            Live Releases ({projectsData.filter(p => p.category === 'live').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'template' ? 'active' : ''}`}
            style={{ borderColor: projectFilter === 'template' ? 'var(--accent-cyan)' : '' }}
            onClick={() => setProjectFilter('template')}
          >
            System Blueprints
          </button>
        </div>

        {/* Visual Browser Mock Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card-visual">
              <div className="browser-header-mock">
                <div className="browser-dots">
                  <div className="browser-dot"></div>
                  <div className="browser-dot"></div>
                  <div className="browser-dot"></div>
                </div>
                <div className="browser-url-bar">
                  {project.urlMock || 'concept-system.localhost'}
                </div>
                <div style={{ width: '25px' }}></div>
              </div>
              <div className="project-body-visual">
                <div>
                  <div className="project-meta-row">
                    <span className={`project-type-badge ${project.category === 'live' ? 'type-badge-live' : 'type-badge-template'}`}>
                      {project.category === 'live' ? '● Active Release' : 'Architecture Blueprint'}
                    </span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.category === 'live' ? '#10B981' : '#F59E0B' }}></div>
                  </div>
                  <h3 className="project-title-visual">{project.title}</h3>
                  <p className="project-desc-visual">{project.shortDesc}</p>
                </div>
                <div>
                  <div className="project-stack-row">
                    {project.stack.map((tag, tIdx) => (
                      <span key={tIdx} className="stack-pill-mini">{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions-visual">
                    <button className="action-btn-link" onClick={() => setSelectedProject(project)}>
                      Architecture Details &rarr;
                    </button>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer" className="action-btn-link" style={{ color: 'var(--accent-cyan)' }}>
                        <ExternalLinkIcon /> Live Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW I WORK PROCESS Timelines */}
      <section className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">client pipeline</div>
        <h2 className="section-title">Development <span>Process Workflow</span></h2>
        <div className="process-flow">
          {processSteps.map((step) => (
            <div key={step.num} className="process-step-card">
              <div className="process-step-num">{step.num}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT TESTIMONIALS SLIDER SECTION */}
      <section id="testimonials" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">testimonials</div>
        <h2 className="section-title">Proven Client <span>Satisfaction</span></h2>
        <div className="testimonial-card-slide">
          <p className="testimonial-quote">
            {testimonials[activeTestimonial].quote}
          </p>
          <div className="testimonial-author-row">
            <div className="author-info">
              <h4>{testimonials[activeTestimonial].author}</h4>
              <span>{testimonials[activeTestimonial].company}</span>
            </div>
            <div className="slider-controls">
              <button className="slider-arrow-btn" onClick={prevTestimonial} aria-label="Previous Testimonial">⟵</button>
              <button className="slider-arrow-btn" onClick={nextTestimonial} aria-label="Next Testimonial">⟶</button>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE EXPERIENCE SECTION */}
      <section id="experience" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">journey</div>
        <h2 className="section-title">Professional <span>Timeline Ledger</span></h2>
        <div className="experience-timeline-visual">
          {careerData.map((item) => {
            const isExpanded = expandedWork === item.id;
            return (
              <div key={item.id} className="timeline-card-item">
                <div className="timeline-node-dot"></div>
                <div className="timeline-date-visual">{item.date}</div>
                <div className="timeline-content-card">
                  <div className="timeline-header-visual">
                    <div>
                      <h3 className="timeline-role-txt">{item.role}</h3>
                      <div className="timeline-company-txt">{item.company}</div>
                    </div>
                    <button
                      className="palette-btn"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderColor: isExpanded ? 'var(--accent-cyan)' : '' }}
                      onClick={() => setExpandedWork(isExpanded ? null : item.id)}
                    >
                      {isExpanded ? 'Hide Details [—]' : 'Expand Details [+]'}
                    </button>
                  </div>
                  {isExpanded && (
                    <ul className="timeline-bullets-list" style={{ marginTop: '1.5rem', animation: 'modalSlide 0.25s ease-out' }}>
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">credentials</div>
        <h2 className="section-title">Certifications &amp; <span>Accreditations</span></h2>
        <div className="certs-grid-tech">
          {certificationsList.map((c, idx) => (
            <div key={idx} className="cert-card-tech">
              <div className="cert-icon-tech">{c.icon}</div>
              <div className="cert-info-tech">
                <h4>{c.title}</h4>
                <span>{c.org}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNICAL SNIPPETS SECTION ("SOHAM'S CODE KITCHEN") */}
      <section className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">developer authority</div>
        <h2 className="section-title">Soham's <span>Code Kitchen</span></h2>
        <div className="snippets-grid">
          <div className="snippets-menu">
            {Object.keys(codeSnippets).map((key) => (
              <button
                key={key}
                className={`snippet-menu-item ${activeSnippet === key ? 'active' : ''}`}
                onClick={() => setActiveSnippet(key)}
              >
                {codeSnippets[key].title}
              </button>
            ))}
          </div>
          <div className="snippets-body">
            <pre className="snippet-code-pre">
              <code>{codeSnippets[activeSnippet].code}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">faq</div>
        <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
        <div className="faq-accordion-container">
          {faqList.map((faq, idx) => {
            const isFaqExpanded = expandedFaq === idx;
            return (
              <div key={idx} className={`faq-card-item ${isFaqExpanded ? 'active' : ''}`}>
                <button
                  className="faq-header-trigger"
                  onClick={() => setExpandedFaq(isFaqExpanded ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span>{isFaqExpanded ? '—' : '+'}</span>
                </button>
                {isFaqExpanded && (
                  <div className="faq-body-content" style={{ animation: 'modalSlide 0.2s ease-out' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT EDITORIAL SECTION */}
      <section id="contact" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">consultation</div>
        <h2 className="section-title">Let's Build <span>Your System</span></h2>
        <div className="contact-section-grid">
          <div className="contact-left-tech">
            <p className="contact-sub-lead">
              Looking for a systems developer to automate integrations, architect custom databases, or deploy client portals? Drop an inquiry below and get a technical roadmap.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="contact-row-tech">
                <div className="contact-row-icon-tech">
                  <MailIcon />
                </div>
                <div className="contact-row-info-tech">
                  <span className="contact-row-lbl-tech">Direct Email</span>
                  <a href="mailto:sohampawar1030@gmail.com" className="contact-row-val-tech">sohampawar1030@gmail.com</a>
                </div>
              </div>
              <div className="contact-row-tech">
                <div className="contact-row-icon-tech">
                  <PhoneIcon />
                </div>
                <div className="contact-row-info-tech">
                  <span className="contact-row-lbl-tech">Telegram &amp; Phone</span>
                  <a href="tel:+917030806080" className="contact-row-val-tech">+91 70308 06080</a>
                </div>
              </div>
              <div className="contact-row-tech">
                <div className="contact-row-icon-tech">
                  <GithubIcon />
                </div>
                <div className="contact-row-info-tech">
                  <span className="contact-row-lbl-tech">Github Registry</span>
                  <a href="https://github.com/sohampawar7030" target="_blank" rel="noreferrer" className="contact-row-val-tech">github.com/sohampawar7030</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="contact-form-tech" onSubmit={handleContactSubmit}>
              <div className="form-group-tech">
                <label className="form-label-tech" htmlFor="client-name">Full Name</label>
                <input
                  type="text"
                  id="client-name"
                  className="form-input-tech"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {formErrors.name && <div className="form-error-tech">{formErrors.name}</div>}
              </div>
              <div className="form-group-tech">
                <label className="form-label-tech" htmlFor="client-email">Email Address</label>
                <input
                  type="email"
                  id="client-email"
                  className="form-input-tech"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formErrors.email && <div className="form-error-tech">{formErrors.email}</div>}
              </div>
              <div className="form-group-tech">
                <label className="form-label-tech" htmlFor="client-message">Project Description</label>
                <textarea
                  id="client-message"
                  className="form-textarea-tech"
                  placeholder="Summarize your requirements and tech stacks needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                {formErrors.message && <div className="form-error-tech">{formErrors.message}</div>}
              </div>
              <button
                type="submit"
                className="btn-tech btn-gradient"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={formSubmitting}
              >
                {formSubmitting ? 'DISPATCHING MEMO...' : 'SUBMIT PROJECT ENQUIRY'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid-tech">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="logo-tech" style={{ fontSize: '1.25rem' }}>
              SOHAM PAWAR
            </div>
            <p className="footer-brand-desc">
              Systems Architect &amp; Associate AI/ML Engineer. Building next-generation automations, intelligent pipelines, and cloud-native solutions.
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

          {/* Sitemap Column */}
          <div className="footer-links-col">
            <h4 className="footer-title-tech">Sitemap</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About Me</a></li>
              <li><a href="#skills">Services</a></li>
              <li><a href="#estimator">Estimator</a></li>
              <li><a href="#work">Projects</a></li>
              <li><a href="#experience">Journey</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className="footer-links-col">
            <h4 className="footer-title-tech">Capabilities</h4>
            <ul className="footer-links-list">
              <li><a href="#skills">AI &amp; Workflows</a></li>
              <li><a href="#skills">Fullstack Systems</a></li>
              <li><a href="#skills">AWS Infrastructure</a></li>
              <li><a href="#estimator">Scope Calculator</a></li>
            </ul>
          </div>

          {/* Contact Column */}
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

        {/* Bottom Bar */}
        <div className="footer-bottom-tech">
          <div className="footer-copy-tech">
            &copy; {new Date().getFullYear()} Soham Pawar. All rights reserved.
          </div>
        </div>
      </footer>

      {/* DYNAMIC SUCCESS TOASTS */}
      <div className="toast-tech-holder">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-tech ${t.type === 'error' ? 'error' : ''}`}>
            <span>{t.type === 'error' ? '⚠️' : '⚡'}</span>
            <span style={{ marginLeft: '0.5rem' }}>{t.message}</span>
          </div>
        ))}
      </div>

      {/* PROJECT DETAILED ARCHITECTURE MODAL */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              ✕
            </button>
            <div className="modal-body-tech">
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <span className={`project-type-badge ${selectedProject.category === 'live' ? 'type-badge-live' : 'type-badge-template'}`}>
                  {selectedProject.category === 'live' ? 'Active System' : 'Blueprint Architecture'}
                </span>
                <h3 className="modal-title-tech" style={{ marginTop: '0.75rem' }}>{selectedProject.title}</h3>
                {selectedProject.url && (
                  <a href={selectedProject.url} target="_blank" rel="noreferrer" className="modal-url-link">
                    <ExternalLinkIcon /> Open Live Production Link ({selectedProject.urlMock})
                  </a>
                )}
              </div>

              <div className="modal-grid-cols">
                <div>
                  <h4 className="modal-col-lbl">Overview &amp; Purpose</h4>
                  <p className="modal-col-val">{selectedProject.description}</p>
                </div>
                <div>
                  <h4 className="modal-col-lbl">Client Brief</h4>
                  <p className="modal-col-val">{selectedProject.clientBrief}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0', margin: '1.5rem 0' }}>
                <h4 className="modal-col-lbl">Technical Challenges</h4>
                <p className="modal-col-val">{selectedProject.challenges}</p>
              </div>

              <div>
                <h4 className="modal-col-lbl">Execution &amp; Core Contributions</h4>
                <p className="modal-col-val" style={{ marginBottom: '1.5rem' }}>{selectedProject.contribution}</p>
                <div className="modal-stack-pills">
                  {selectedProject.stack.map((item, idx) => (
                    <span key={idx} className="stack-pill-mini" style={{ color: 'var(--accent-cyan)', borderColor: 'var(--border-color-glow)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
