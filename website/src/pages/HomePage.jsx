import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

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
// Score Circle Helper Component for Lighthouse Metrics
// ==========================================
const ScoreCircle = ({ score, label }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Lighthouse styling standard: green for >= 90, orange for 50-89, red for < 50
  let strokeColor = "#EF4444";
  if (score >= 90) strokeColor = "#10B981";
  else if (score >= 50) strokeColor = "#F59E0B";

  return (
    <div className="score-circle-container">
      <div className="score-circle-wrapper">
        <svg className="score-circle-svg" width="56" height="56" viewBox="0 0 56 56">
          <circle className="score-circle-bg" cx="28" cy="28" r={radius} strokeWidth="3.5" fill="transparent" />
          <circle
            className="score-circle-fg"
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="3.5"
            stroke={strokeColor}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 28 28)"
          />
        </svg>
        <span className="score-value" style={{ color: strokeColor }}>{score}</span>
      </div>
      <span className="score-label">{label}</span>
    </div>
  );
};

// ==========================================
// Project Details Data Provider Helper Function
// ==========================================
function getProjectDetails(project) {
  if (!project) return null;

  const customDetails = {
    creovix: {
      features: [
        "Dynamic, interactive dark-mode theme structure with particle transitions",
        "Integrated automated scheduling webhook triggers routing to internal calendar",
        "Responsive grid cards showcasing custom SaaS and IT offerings",
        "Production-grade optimization achieving <1s Time to First Byte (TTFB)"
      ],
      research: "Analyzed the UX architecture of 12 top-tier digital transformation and AI consultancy platforms. Identified that enterprise IT buyers prioritize immediate verification of services, technical competency stack, and quick scheduler hooks over long bios.",
      problemsSolved: [
        "Client struggled to capture enterprise scheduler leads automatically, losing ~20% prospects. Solved via webhook triggers and Calendly routing.",
        "High bounce rates on low-speed connections. Solved by optimizing media, script bundles, and routing DNS via CDN."
      ],
      clientOutcome: "The client experienced a 45% increase in high-quality business inquiries within the first 30 days. The premium design was cited as a major trust builder by two new enterprise clients.",
      satisfaction: 100,
      workflow: [
        { phase: "Phase 1: Discovery & Architecture", desc: "Identified core services, client personas, and required conversion checkpoints." },
        { phase: "Phase 2: Figma Wireframing", desc: "Created pixel-perfect interactive wireframes using custom branding colors." },
        { phase: "Phase 3: Development & Integration", desc: "Coded standard-compliant frontend components in React and connected Lead pipelines." },
        { phase: "Phase 4: CDN Deployment & QA", desc: "Deployed to Vercel global edge network, configured DNS, and executed cross-device speed audits." }
      ],
      scores: { perf: 99, access: 100, best: 98, seo: 100 },
      flow: ["React Client UI", "Formspree API Router", "Vercel Serverless Edge", "Email Scheduler Webhook", "Client CRM Logs"],
      snippet: `// Contact Webhook Dispatcher
export async function submitInquiry(data) {
  const response = await fetch("https://formspree.io/f/creovix_agency_id", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientName: data.name,
      email: data.email,
      inquiryScope: data.serviceType,
      details: data.message,
      timestamp: new Date().toISOString()
    })
  });
  return response.ok;
}`,
      lessons: "Learned the importance of decoupling heavy scheduler configurations (like Calendly iframe initialization) to lazy-loaded states, keeping initial client load time extremely fast and improving mobile scores."
    },
    wedner: {
      features: [
        "Progressive image loading engine with skeleton screens to eliminate Layout Shift",
        "Dynamic event inquiry wizard with instant price scale and date validation",
        "Fluid scrolling grid showcasing high-res corporate event photos",
        "Direct email notification dispatcher running on SMTP servers"
      ],
      research: "Audited leading visual portfolios and event planners. Found that users decide to stay on an event page based on the first three photos they see. Implemented a zero-CLS image loading structure to ensure instant high-quality visuals.",
      problemsSolved: [
        "Large media files caused slow load times and 40% user drop-off on mobile. Solved by progressive WebP compression and lazy-loading.",
        "Ambiguous booking requests generated junk leads. Solved by implementing an interactive budget & scale validation form."
      ],
      clientOutcome: "Client secured three major corporate bookings directly through the new portal. Bounce rates dropped by 50% on mobile devices.",
      satisfaction: 98,
      workflow: [
        { phase: "Phase 1: Visual Design Strategy", desc: "Defined modern fonts and custom margins suitable for a premium events brand." },
        { phase: "Phase 2: Gallery Engineering", desc: "Built a responsive CSS grid gallery with progressive loading states." },
        { phase: "Phase 3: Form Programming", desc: "Coded dynamic budget validation states and SMTP integrations." },
        { phase: "Phase 4: Launch & Analytics", desc: "Deployed on Hostinger and trained client administrators on lead management." }
      ],
      scores: { perf: 98, access: 98, best: 100, seo: 96 },
      flow: ["Browser Slider UI", "Progressive WebP Loader", "SMTP Mail Dispatcher", "Agency Event Dashboard"],
      snippet: `// Progressive Image Skeleton Loader
export function ProgressiveImage({ src, placeholderSrc, alt }) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImgSrc(src);
  }, [src]);
  return <img src={imgSrc} alt={alt} className={imgSrc === placeholderSrc ? "blurring" : "loaded"} />;
}`,
      lessons: "Understood layouts shifts (CLS) caused by dynamically sizing photo matrices. Solved by implementing exact image aspect-ratio placeholders, resolving layout issues and providing a premium customer experience."
    },
    kidspride: {
      features: [
        "Real-time Notice Board with visual category tags (Urgent, Admissions, Events)",
        "Parent Admission Query portal with validation checks for mobile formats",
        "Lightweight mobile-first UI tailored for parents using budget smartphones",
        "Static site rendering fallback to minimize host billing costs"
      ],
      research: "Conducted UX feedback surveys with parents. Discovered that 85% of parent portal access is done via low-bandwidth mobile networks on budget phones. The design was customized to be ultra-lightweight (under 120KB total transfer size).",
      problemsSolved: [
        "Parents missed urgent school updates because of disorganized layouts. Solved with a prominent, category-filtered notice board.",
        "School office was overwhelmed with manual paperwork for inquiries. Solved by digitizing the inquiry workflow."
      ],
      clientOutcome: "The school collected 120+ structured admissions inquiries in the first fortnight, saving school staff over 20 hours of manual data entry.",
      satisfaction: 96,
      workflow: [
        { phase: "Phase 1: Parent Persona Mapping", desc: "Identified high-priority information required by parents (fees, admissions, alerts)." },
        { phase: "Phase 2: Accessible Layout Design", desc: "Used high-contrast colors and large touch targets for easy mobile tapping." },
        { phase: "Phase 3: Notice Portal Coding", desc: "Built notice board logic that highlights new entries and sorts them by urgency." },
        { phase: "Phase 4: Host Setup & Launch", desc: "Optimized all code and deployed to static hosting to ensure zero monthly server costs." }
      ],
      scores: { perf: 96, access: 100, best: 95, seo: 100 },
      flow: ["Parent Portal", "Notice Urgency Classifier", "Form Validation Routing", "Shared Hosting SMTP Log"],
      snippet: `// Parent Notice Filter Hook
export function filterNotices(notices, filterType) {
  if (filterType === 'all') return notices;
  return notices.filter(notice => {
    if (filterType === 'urgent') return notice.isUrgent === true;
    return notice.category === filterType;
  });
}`,
      lessons: "Creating lightweight frontends suitable for low-end parent devices was highly educational. Learnt to minimize external UI package dependencies by using simple, native CSS animations."
    },
    agricoz: {
      features: [
        "Dynamic WhatsApp link builder integrating selected quantities and product specifications",
        "Categorized product catalog with instant filter search tools",
        "High-detail catalog item spec sheets with visual call-to-action indicators",
        "Responsive design adapting flawlessly to regional languages and browsers"
      ],
      research: "Interviewed B2B buyers and rural suppliers. Found that typical multi-step shopping carts and checkouts are abandoned. B2B buyers prefer initiating contact immediately via WhatsApp with product specifications.",
      problemsSolved: [
        "Buyers abandoned traditional cart checkouts (90% drop-off). Solved by replacing checkout with direct WhatsApp integration.",
        "Suppliers wasted time asking buyers which product model they wanted. Solved with a auto-generated detailed WhatsApp message."
      ],
      clientOutcome: "B2B product inquiries doubled. The sales team closed orders 30% faster due to pre-filled product details in messages.",
      satisfaction: 95,
      workflow: [
        { phase: "Phase 1: B2B Pipeline Design", desc: "Mapped the user path from product lookup to direct WhatsApp chat initiation." },
        { phase: "Phase 2: Catalog Architecture", desc: "Designed and implemented product lists with instant filter pills." },
        { phase: "Phase 3: Link API Integration", desc: "Coded dynamic WhatsApp redirect triggers parsing model details and counts." },
        { phase: "Phase 4: Mobile Testing", desc: "Tested on budget Android browsers to confirm layout and redirect stability." }
      ],
      scores: { perf: 97, access: 98, best: 96, seo: 98 },
      flow: ["Product Grid UI", "Local Specs Parser", "WhatsApp API Redirect Linker", "Direct Dealer Chat"],
      snippet: `// Whatsapp Link Pre-population API
export function constructWhatsAppLink(item, qty, phone) {
  const message = \`Hello Agricoz, I am interested in purchasing:\\n\\n*Product:* \${item.title}\\n*Specs:* \${item.specs}\\n*Quantity:* \${qty} units.\\n\\nPlease confirm availability.\`;
  return \`https://api.whatsapp.com/send?phone=\${phone}&text=\${encodeURIComponent(message)}\`;
}`,
      lessons: "Discovered that simple client-side features like direct WhatsApp links convert B2B buyers significantly better than complex e-commerce checkouts for regional and rural businesses."
    },
    kiranbody: {
      features: [
        "Interactive BMI Calculator returning customized nutritional and fitness recommendations",
        "Categorized fitness program lists with difficulty level badges",
        "Direct schedule integration linking clients directly to trainer calendars",
        "Premium dark and light theme styles matching fitness brand guidelines"
      ],
      research: "Audited online fitness portals and gym-member behaviors. Found that clients are 70% more likely to book a trial class if they can calculate their fitness level and see a clear program schedule on the home page.",
      problemsSolved: [
        "Potential clients didn't know which program difficulty was right for them. Solved with interactive BMI calculator recommendation engine.",
        "Gym trainers spent hours coordinating session timings. Solved by embedding digital booking slots."
      ],
      clientOutcome: "The gym saw a 35% increase in fitness program enrollments and a 25% decrease in class scheduling conflicts.",
      satisfaction: 97,
      workflow: [
        { phase: "Phase 1: Core Fitness Strategy", desc: "Identified target user groups and mapped fitness program taxonomies." },
        { phase: "Phase 2: Calculator Algorithms", desc: "Programmed mathematical BMI formulas and mapped fitness outcome text mappings." },
        { phase: "Phase 3: UI & Typography", desc: "Applied athletic branding fonts and high-performance visual cards." },
        { phase: "Phase 4: QA & Deployment", desc: "Verified calculator precision and completed hosting setup." }
      ],
      scores: { perf: 99, access: 99, best: 98, seo: 100 },
      flow: ["Workout Directory", "BMI Calculator Controller", "Dynamic Advice Matrix", "Booking Calendar API"],
      snippet: `// BMI Advisor Engine
export function calculateBMIStatus(weightKg, heightCm) {
  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);
  if (bmi < 18.5) return { score: bmi, status: "Underweight", tip: "Focus on caloric surplus and strength workouts." };
  if (bmi < 25) return { score: bmi, status: "Normal", tip: "Maintain active schedule and balanced proteins." };
  return { score: bmi, status: "Overweight", tip: "Incorporate HIIT and cardio training guidelines." };
}`,
      lessons: "Building interactive tools like calculators creates immediate user engagement. Using client-side state rather than server computations kept the tool responsive."
    },
    prepright: {
      features: [
        "Categorized exam mock test bundles catalog with specific syllabus breakdowns",
        "Custom syllabus accordion widget displaying detailed course topics",
        "Automated student registration form writing entries to coordinator channels",
        "Clean distraction-free interface matching academic styling guidelines"
      ],
      research: "Analyzed competition in student coaching domains. Discovered that students prioritize seeing clear syllabus coverage, course schedule details, and exam pattern information before registering.",
      problemsSolved: [
        "Students were confused about syllabus details. Solved with interactive accordion widgets showing course breakdowns.",
        "Manual coordinator recording led to registration errors. Solved with automated registration routing."
      ],
      clientOutcome: "Helped the academy onboard 80+ student registrations in the first quarter of going live. Coordinator overhead decreased by 40%.",
      satisfaction: 99,
      workflow: [
        { phase: "Phase 1: Syllabus Structuring", desc: "Organized exam topics, test details, and schedules into hierarchy models." },
        { phase: "Phase 2: Accordion Component", desc: "Built custom React accordion panels with smooth height transitions." },
        { phase: "Phase 3: Form Pipeline", desc: "Coded secure input validation and automated database notifications." },
        { phase: "Phase 4: Launch & Audit", desc: "Conducted speed optimization audits and deployed live site." }
      ],
      scores: { perf: 97, access: 96, best: 100, seo: 98 },
      flow: ["Course Index", "Accordion Height Engine", "Registration Hook", "Google Sheets Sync API"],
      snippet: `// Smooth Height Transition Accordion Hook
export function AccordionPanel({ title, content, isOpen }) {
  const ref = useRef(null);
  return (
    <div className="accordion-wrapper" style={{ height: isOpen ? ref.current?.scrollHeight : 0 }}>
      <div ref={ref} className="accordion-content">{content}</div>
    </div>
  );
}`,
      lessons: "Learnt that organizing layout topics into collapsible sub-blocks decreases student mental fatigue, which in turn leads to a higher conversion rate for coaching program mock exams."
    }
  };

  if (customDetails[project.id]) {
    return customDetails[project.id];
  }

  // Industry-specific generator templates
  const industryTemplates = {
    tech: {
      features: (p) => [
        "Interactive control panel UI displaying live system telemetry metrics",
        "Secure API endpoints protected by JWT role-based authentication rules",
        "Distraction-free high-density grid layouts optimized for technical diagnostics",
        "Automated cron jobs syncing inventory records with external databases"
      ],
      research: (p) => `Audited competitive administrative interfaces in the Tech space. Confirmed that technical administrators prioritize high data-density and rapid filtering over complex visual illustrations. Structured the ${p.title} layouts accordingly.`,
      problemsSolved: (p) => [
        `Users experienced UI lag when rendering large datasets. Solved by implementing virtualized lists and caching.`,
        `Scattered server metrics made troubleshooting slow. Consolidated server logs and metrics into one dashboard.`
      ],
      clientOutcome: (p) => `Optimized server monitoring workloads by 40% and decreased troubleshooting latency for technical teams.`,
      flow: (p) => ["Admin Panel UI", "REST API Router", "RBAC Auth Middleware", "AWS Telemetry Store"],
      snippet: (p) => `// Dynamic metrics compiler for ${p.id}
export function compileTelemetryLogs(logs) {
  return logs.filter(l => l.status === 'ERROR' || l.severity > 3)
             .map(l => ({ time: l.timestamp, tag: l.serviceCode }));
}`,
      lessons: (p) => `Discovered that virtualizing heavy lists is critical for retaining high Lighthouse performance scores during rapid data updates.`
    },
    education: {
      features: (p) => [
        "Interactive course curriculum directory with collapsible accordion sheets",
        "Parent and student query submission form with instant contact relays",
        "Student evaluation quiz engine supporting persistent timer states",
        "Dynamic report scorecard compilation with downloadable PDF exports"
      ],
      research: (p) => `Surveyed student and parent engagement metrics. Discovered that simplified progress indicators and clean, collapsible course directories directly increase study session times. Engineered ${p.title} to support this.`,
      problemsSolved: (p) => [
        `Students lost exam timer state during unexpected page refreshes. Implemented browser sessionStorage persistence.`,
        `Administrative coordinators spent hours manually recording enrollment sheets. Automated the pipeline to Google Sheets.`
      ],
      clientOutcome: (p) => `Academy coordinator overhead was reduced by 30%, with course registration requests increasing by 40% in the first fortnight.`,
      flow: (p) => ["Student Dashboard UI", "Course Accordion Panel", "Session Timer Engine", "Google Sheets Sync API"],
      snippet: (p) => `// Persistent timer state hook for ${p.id}
export function usePersistentQuizTimer(durationSeconds) {
  const [seconds, setSeconds] = useState(() => {
    const saved = sessionStorage.getItem('active_quiz_seconds');
    return saved ? parseInt(saved, 10) : durationSeconds;
  });
  return { seconds, save: (s) => sessionStorage.setItem('active_quiz_seconds', s) };
}`,
      lessons: (p) => `Understood that client-side session storage caching is an efficient, zero-latency way to secure student evaluation progress.`
    },
    healthcare: {
      features: (p) => [
        "Interactive calendar scheduler showing doctor slot availabilities",
        "HIPAA-compliant registration form with patient data input sanitation",
        "Real-time medical inventory monitoring sheets with status alerts",
        "Clinical specialist filter grids listing qualifications and departments"
      ],
      research: (p) => `Analyzed WCAG AAA accessibility standards for patient portals. Seniors require double-spaced typographic settings and high-contrast touch points. Designed the ${p.title} layouts to support senior usability.`,
      problemsSolved: (p) => [
        `Patients waited long in registration lines. Coded patient pre-intake digital forms to process info beforehand.`,
        `Double-booking schedulers caused operational delays. Programmed automated appointment slot overlap checking.`
      ],
      clientOutcome: (p) => `Front-desk receptionist workloads decreased by 35% with clinic appointment scheduling accuracy rising to 99%.`,
      flow: (p) => ["Patient Booking UI", "Calendar Grid Validator", "Sanitization Gateway", "Clinic CRM Logs"],
      snippet: (p) => `// Secure healthcare form input sanitizer for ${p.id}
export function sanitizeClinicalInput(text) {
  return text.trim()
             .replace(/[<>]/g, '')
             .substring(0, 400);
}`,
      lessons: (p) => `Adhering to strict input sanitization on forms is essential for patient data safety and preventing malicious injection scripts.`
    },
    realestate: {
      features: (p) => [
        "Property catalog search panel with active price and location filters",
        "Interactive layout plan overlays with zero-CLS image loading scales",
        "Contractor materials cost estimation calculators with dynamic values",
        "Direct real estate broker call routes linking to WhatsApp pipelines"
      ],
      research: (p) => `Reviewed user search patterns on high-volume listing directories. Identified that buyers require fast location filtration and instant specification grids without page reloads. Applied high-performance search queries to ${p.title}.`,
      problemsSolved: (p) => [
        `High phone call volumes to answer basic size and material questions. Solved by rendering specification grids.`,
        `Leads were lost due to delayed email responses. Integrated direct WhatsApp redirect hooks routing to local agents.`
      ],
      clientOutcome: (p) => `Qualified property inquiries rose by 50% with customer service call times dropping by 4 hours daily.`,
      flow: (p) => ["Property Listing UI", "Local search filter", "WhatsApp Redirect API", "Broker Lead Logs"],
      snippet: (p) => `// Dynamic property matrix filter for ${p.id}
export function filterPropertyArchive(items, priceLimit) {
  return items.filter(item => item.price <= priceLimit && item.isAvailable);
}`,
      lessons: (p) => `Optimizing layout shift configurations (CLS) for high-resolution floor plans prevents page jumping, providing a premium user experience.`
    },
    b2b: {
      features: (p) => [
        "Wholesale catalog index with Minimum Order Quantity (MOQ) indicator badges",
        "Automated WhatsApp buy inquiry link builder parsing selected amounts",
        "Technical product specifications grid with responsive CSS rows",
        "Business query contact portal routing requests to client notifications"
      ],
      research: (p) => `Surveyed B2B purchasing workflows. Found that standard retail checkouts drop B2B buyer inquiries. Commercial clients prefer initiating immediate contact via WhatsApp with pre-filled specs. Structured ${p.title} to optimize this conversion loop.`,
      problemsSolved: (p) => [
        `B2B clients abandoned shopping checkouts. Solved by replacing checkout with single-click WhatsApp order generation.`,
        `Suppliers spent hours clarifying product model requests. Coded links that write product specs in chat.`
      ],
      clientOutcome: (p) => `Wholesale product inquiries doubled. Order processing times were reduced by 30% due to clear specifications in chat messages.`,
      flow: (p) => ["Wholesale Grid UI", "MOQ Quantity Parser", "WhatsApp API Redirect", "Supplier Sales Chat"],
      snippet: (p) => `// B2B purchase inquiry constructor for ${p.id}
export function constructB2BWhatsAppUrl(item, quantity) {
  const rawText = \`Hello, I would like to inquire about: \\nProduct: \${item.title}\\nQuantity: \${quantity} units\`;
  return \`https://wa.me/917030806080?text=\${encodeURIComponent(rawText)}\`;
}`,
      lessons: (p) => `Discovered that simple client-side features like direct WhatsApp links convert B2B buyers significantly better than complex e-commerce checkouts for regional and rural businesses.`
    },
    lifestyle: {
      features: (p) => [
        "Progressive image rendering engine with skeleton aspect-ratio placeholders",
        "Interactive service grids displaying detailed rates and slot selectors",
        "Online calendar scheduler booking available trial slots dynamically",
        "Premium dark and light theme styles matching brand guidelines"
      ],
      research: (p) => `Reviewed conversion statistics on premium lifestyle and booking portals. Discovered that visitors decide to book a session within 5 seconds of visual inspection. Implemented a zero-CLS image loading structure to ensure instant high-quality visuals for ${p.title}.`,
      problemsSolved: (p) => [
        `Large media files caused slow load times and mobile user drop-offs. Optimized asset delivery with progressive WebP loads.`,
        `Ambiguous booking requests generated junk leads. Solved by implementing an interactive budget & scale validation form.`
      ],
      clientOutcome: (p) => `Client secured three major corporate bookings directly through the new portal. Bounce rates dropped by 50% on mobile devices.`,
      flow: (p) => ["Lifestyle Showcase UI", "Progressive WebP Loader", "SMTP Mail Dispatcher", "Agency Event Dashboard"],
      snippet: (p) => `// Progressive Image Skeleton Loader for ${p.id}
export function ProgressiveImage({ src, placeholderSrc, alt }) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImgSrc(src);
  }, [src]);
  return <img src={imgSrc} alt={alt} className={imgSrc === placeholderSrc ? "blurring" : "loaded"} />;
}`,
      lessons: (p) => `Understood layouts shifts (CLS) caused by dynamically sizing photo matrices. Solved by implementing exact image aspect-ratio placeholders, resolving layout issues and providing a premium customer experience.`
    },
    fintech: {
      features: (p) => [
        "Cryptographic ledger transaction tables with filterable columns",
        "Interactive compound interest & ROI calculator tools",
        "High-security login flows and session validation simulations",
        "Multi-currency support and real-time exchange rate mock displays"
      ],
      research: (p) => `Researched financial compliance standards and visual security cues. Studied user trust factors on landing pages to implement reassuring UI layouts for ${p.title}.`,
      problemsSolved: (p) => [
        `Complex investment returns calculations confused prospective clients. Built a user-friendly calculator.`,
        `Lack of clean visual transaction history led to customer service inquiries. Implemented searchable table logs.`
      ],
      clientOutcome: (p) => `Boosted financial plan calculations by clients by 150%, resulting in higher inquiries for account opening.`,
      flow: (p) => ["Cryptographic Transaction Grid", "Secure Session Router", "Double-Entry Ledger Sync", "Payment Gateway Webhook"],
      snippet: (p) => `// SECURE TRANSACTION LEDGER ENCRYPTION for ${p.id}
export async function hashTransactionPayload(payload) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}`,
      lessons: (p) => `Learned security design criteria regarding client-side data hashing and session validation configurations for premium financial applications.`
    },
    automotive: {
      features: (p) => [
        "Interactive vehicle detailing configurator with layered options",
        "GPS coordinate fleet tracker grids with responsive maps",
        "Automated repair catalog filter cards listing spec sheets",
        "Direct workshop booking calendars with service slot alerts"
      ],
      research: (p) => `Audited fleet operations portals and vehicle dealerships. Discovered that customers prioritize finding specific vehicle model parameters and repair schedules within 2 clicks. Styled ${p.title} to optimize data layouts.`,
      problemsSolved: (p) => [
        `High call volumes regarding standard auto specs and customizations. Built specification sheets with visual details.`,
        `Workshop schedule delays caused by manual coordination. Programmed slot reservation workflows.`
      ],
      clientOutcome: (p) => `Increased workshop booking inquiries by 40% and improved fleet tracking visibility for transport operators.`,
      flow: (p) => ["Vehicle Configurator UI", "Specs Filter Engine", "GPS Fleet Monitor", "Workshop Booking Logs"],
      snippet: (p) => `// Auto chassis layer visual controller for ${p.id}
export function renderChassisLayers(model, options) {
  return [
    { type: 'chassis', src: \`/assets/automotive/\${model}_base.png\` },
    { type: 'color', src: \`/assets/automotive/\${model}_\${options.color}.png\` }
  ];
}`,
      lessons: (p) => `Learned to manage overlapping layered image assets efficiently on mobile viewports to provide a realistic detailing configurator.`
    }
  };

  const ind = project.industry || "general";
  const template = industryTemplates[ind] || industryTemplates.tech;

  const features = template.features(project);
  const research = template.research(project);
  const problemsSolved = template.problemsSolved(project);
  const clientOutcome = template.clientOutcome(project);
  const flow = template.flow(project);
  const snippet = template.snippet(project);
  const lessons = template.lessons(project);

  const satisfaction = 97;
  const scores = { perf: 98, access: 98, best: 97, seo: 100 };
  const workflow = [
    { phase: "Phase 1: Discovery & Architecture", desc: `Scoped the requirements and user journeys for the ${project.title} platform.` },
    { phase: "Phase 2: Figma Wireframing", desc: "Designed high-fidelity dark-themed prototypes matching brand typography." },
    { phase: "Phase 3: Development & Custom Coding", desc: `Coded responsive components using ${project.stack.join(', ')}.` },
    { phase: "Phase 4: Deployment & Optimization", desc: "Deployed to edge network with lazy-loaded assets and verified Lighthouse vitals." }
  ];

  return {
    features,
    research,
    problemsSolved,
    clientOutcome,
    satisfaction,
    workflow,
    scores,
    flow,
    snippet,
    lessons
  };
}

// ==========================================
// Main Business App Component
// ==========================================
export default function HomePage() {
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
  const [projectFilter, setProjectFilter] = useState('featured');
  const [selectedProject, setSelectedProject] = useState(null);
  const details = selectedProject ? getProjectDetails(selectedProject) : null;
  const [showSnippet, setShowSnippet] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState(null);

  useEffect(() => {
    setShowSnippet(false);
  }, [selectedProject]);



  // Testimonials State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(null);



  // Work history states removed


  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [attachedFile, setAttachedFile] = useState(null);
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
      const sections = ['about', 'skills', 'work', 'testimonials', 'faq', 'estimator', 'contact'];
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
      threshold: 0.01,
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
      title: 'Creative UI/UX & Web Design',
      desc: 'Crafting bespoke layouts, wireframes, color harmonies, and responsive web pages that captivate visitors and deliver smooth user experiences.',
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
    glassmorphism_style: {
      title: 'GlassmorphismUtility.css',
      lang: 'css',
      code: `/* Premium glassmorphism card styled with backdrop filters and fine borders */
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-panel:hover {
  border-color: rgba(6, 182, 212, 0.35); /* Cyan Glow boundary */
}`
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
      industry: 'tech',
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
      industry: 'lifestyle',
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
      industry: 'education',
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
      industry: 'b2b',
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
      industry: 'automotive',
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
      industry: 'education',
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
      industry: 'tech',
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
      industry: 'tech',
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
      industry: 'tech',
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
      industry: 'education',
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
      industry: 'realestate',
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
      id: 'pixelframe_photo',
      category: 'template',
      industry: 'lifestyle',
      title: 'PixelFrame — Professional Photography & Studio',
      urlMock: 'pixelframe-photo.mock',
      shortDesc: 'A premium visual showcase for professional photography portfolios with integrated booking and client galleries.',
      description: 'A visual-heavy studio template displaying high-res photography categories, client testimonial sliders, and direct session booking widgets.',
      clientBrief: 'Built to project high-end creative visual credentials and handle customer inquiries for wedding, corporate, and product photo shoots.',
      challenges: 'Optimizing high-resolution portfolio grids to load fast without any layout shifts (CLS) on mobile devices.',
      contribution: 'Creator. Coded progressive image loader skeletons, styled interactive hover galleries, and integrated reservation forms.',
      stack: ['React', 'Progressive Image Loading', 'Custom CSS Galleries', 'Vercel Staging'],
      url: null
    },
    {
      id: 'orfit_pharma',
      category: 'template',
      industry: 'b2b',
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
      industry: 'tech',
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
      industry: 'education',
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
      industry: 'tech',
      title: 'Intellect CRM — SaaS Sales Portal',
      urlMock: 'intellect-crm-saas.mock',
      shortDesc: 'A high-performance pipeline manager mockup featuring drag-and-drop lead boards, automated follow-up trackers, and income forecasting.',
      description: 'A sales-focused SaaS CRM dashboard mockup showing drag-and-drop deals pipelines, client interaction timelines, and revenue projections.',
      clientBrief: 'A sample pipeline manager layout designed to track client engagement.',
      challenges: 'Scripting fluid horizontal scroll boards for sales stages that look clean on mobile web screens.',
      contribution: 'Built deal card custom animations, lead funnel calculators, and configured flexible dashboard layout options.',
      stack: ['React', 'Vanilla CSS', 'Global State Context'],
      url: null
    },
    {
      id: 'healthbridge',
      category: 'template',
      industry: 'healthcare',
      title: 'HealthBridge — Telemedicine Portal',
      urlMock: 'healthbridge-telehealth.mock',
      shortDesc: 'A HIPAA-compliant telehealth layout showcasing appointment schedules, video channels, and encrypted patient records.',
      description: 'A digital healthcare portal template designed for patient intake, live video consultations booking, and secure medical history archives.',
      clientBrief: 'Needs a sample security framework demonstrating remote doctor allocation modules.',
      challenges: 'Ensuring responsive layout layouts for patient portals on legacy tablet viewports.',
      contribution: 'Integrated mock WebRTC channels, designed patient intake forms, and coded dashboard statistics.',
      stack: ['React', 'CSS Flexbox', 'WebRTC Mock API'],
      url: null
    },
    {
      id: 'propvibe',
      category: 'template',
      industry: 'realestate',
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
      industry: 'fintech',
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
      industry: 'lifestyle',
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
      industry: 'automotive',
      title: 'AutoSpec — Vehicle Configurator',
      urlMock: 'autospec-configurator.mock',
      shortDesc: '3D vehicle layout customization interface showcasing model variations, color schemes, and pricing matrices.',
      description: 'A custom vehicle detailing template designed to let customers preview chassis styles, alloy wheels, and interior configs.',
      clientBrief: 'Dynamic layout focusing on visual customizers and pre-filled dealer quote request relays.',
      challenges: 'Developing clean visual state changes when swapping chassis assets dynamically.',
      contribution: 'Designed selection menus, configured image overlay layers, and integrated lead submission.',
      stack: ['React', 'CSS Grid', 'Overlay Configizer Engine'],
      url: null
    },
    {
      id: 'hrflow',
      category: 'template',
      industry: 'tech',
      title: 'HRFlow — Talent Pipeline Tracker',
      urlMock: 'hrflow-recruitment.mock',
      shortDesc: 'A kanban-based recruiting board displaying candidate stages, automated interview calendars, and evaluator notes.',
      description: 'A modern applicant tracking system template featuring candidate resume indexing, drag-and-drop recruitment stages, and scorecards.',
      clientBrief: 'A productivity-first platform designed to decrease time-to-hire through clear candidate status highlights.',
      challenges: 'Scripting fluid candidate stage drag actions without causing HTML rerenders.',
      contribution: 'Coded the kanban column layout, designed evaluators scoring grids, and configured sidebar routing.',
      stack: ['React', 'CSS Transitions', 'Kanban Board Logic'],
      url: null
    },
    {
      id: 'voltgrid',
      category: 'template',
      industry: 'b2b',
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
      industry: 'b2b',
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
      industry: 'b2b',
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
      industry: 'automotive',
      title: 'AeroSpace — Hangar Slot Booker',
      urlMock: 'aerospace-aviation.mock',
      shortDesc: 'Aviation operations dashboard booking hangar spaces, maintenance slots, and fuel dispatch logs.',
      description: 'A high-performance aviation logistics blueprint supporting hangar reservation calendars, maintenance queue trackers, and pilot schedules.',
      clientBrief: 'Dynamic, dark-themed control board optimizing slot usage and scheduling visibility.',
      challenges: 'Aligning time slots and availability charts for private hangars without collision.',
      contribution: 'Built hourly scheduling grids, designed pilot log input forms, and configured theme metrics.',
      stack: ['React', 'CSS Grid Layouts', 'Aviation Icon Set'],
      url: null
    },
    {
      id: 'paygate',
      category: 'template',
      industry: 'fintech',
      title: 'PayGate — Merchant API Portal',
      urlMock: 'paygate-gateway.mock',
      shortDesc: 'Payment gateway developer integration panel with sandbox testing metrics and token creation UI.',
      description: 'An API key portal configuration showing dynamic payload tests, billing status, and Webhook logs details.',
      clientBrief: 'Created to outline standard checkout layouts and card validation models for B2B services.',
      challenges: 'Creating secure key tokens previews and transaction rate-limit charts visual styling.',
      contribution: 'Designed payment interface, built API sandbox selectors, and formatted response tables.',
      stack: ['React', 'API Console Layout', 'TailwindCSS Mock', 'Chart.js'],
      url: null
    },
    {
      id: 'cryptoflow',
      category: 'template',
      industry: 'fintech',
      title: 'CryptoFlow — DeFi Wallet Interface',
      urlMock: 'cryptoflow-defi.mock',
      shortDesc: 'DeFi portfolio tracker template visualizing real-time token balances, gas fees, and swap routes.',
      description: 'A glowing web wallet dashboard concept showing currency charts, liquidity pools, and transaction lists.',
      clientBrief: 'Built to showcase high contrast dark-themed cryptocurrency trading boards.',
      challenges: 'Structuring multiple exchange rate tables onto responsive mobile layouts.',
      contribution: 'Designed glassmorphism backgrounds, styled token list icons, and coded pool metrics.',
      stack: ['React', 'Web3 Mock', 'ApexCharts', 'Glassmorphic Panels'],
      url: null
    },
    {
      id: 'lendup',
      category: 'template',
      industry: 'fintech',
      title: 'LendUp — Microfinance Ledger',
      urlMock: 'lendup-finance.mock',
      shortDesc: 'Loan application workflow layout with automatic credit scorecard estimates.',
      description: 'A simple lending ledger layout helping students and microbusinesses estimate EMI terms and submit application forms.',
      clientBrief: 'Focused on accessibility for rural users needing simple calculator controls.',
      challenges: 'Preventing rounding errors and keeping EMI inputs synced dynamically.',
      contribution: 'Coded calculator logic, formatted loan comparison tables, and configured lead triggers.',
      stack: ['HTML5', 'CSS Grid', 'LocalState', 'Calculator Math'],
      url: null
    },
    {
      id: 'cardcraft',
      category: 'template',
      industry: 'fintech',
      title: 'CardCraft — Digital Banking Wallet',
      urlMock: 'cardcraft-app.mock',
      shortDesc: 'Virtual credit card management dashboard with fluid card flip animations and transaction lists.',
      description: 'A mock mobile banking screen listing debit cards, transaction categories, and monthly limits.',
      clientBrief: 'A template demonstrating fluid mobile-first css transitions and card toggles.',
      challenges: 'Styling the double-sided card layout to flip smoothly without layout shifts.',
      contribution: 'Coded 3D card flip animations, designed transactions grid, and styled limits dials.',
      stack: ['React', 'CSS 3D Transforms', 'Transaction Logs'],
      url: null
    },
    {
      id: 'carepulse',
      category: 'template',
      industry: 'healthcare',
      title: 'CarePulse — Patient Intake Portal',
      urlMock: 'carepulse-portal.mock',
      shortDesc: 'Digital clinical registration template with responsive medical history intake checklists.',
      description: 'A streamlined healthcare registration screen automating patient data collection before telehealth visits.',
      clientBrief: 'Designed to satisfy high-readability rules for patients on legacy tablet devices.',
      challenges: 'Structuring dense intake fields into distinct step layouts without page reloads.',
      contribution: 'Built forms validation flow, formatted history checkboxes, and styled help panels.',
      stack: ['React', 'Form Handlers', 'CSS Variables', 'Accessible Inputs'],
      url: null
    },
    {
      id: 'dentalglow',
      category: 'template',
      industry: 'healthcare',
      title: 'DentalGlow — Clinic Scheduling Tool',
      urlMock: 'dentalglow-booking.mock',
      shortDesc: 'Interactive dental appointment calendar UI with automatic email reminder relays.',
      description: 'A B2C scheduling portal template booking dentist slots, displaying treatment costs, and sending confirmation memos.',
      clientBrief: 'Needs a highly visible booking calendar designed for rapid scheduling operations.',
      challenges: 'Configuring calendar slot collision rules in native React state.',
      contribution: 'Integrated mock booking grids, styled calendar headers, and connected webhook form.',
      stack: ['React', 'Calendar Mock', 'CSS Grid Layouts', 'Form Handlers'],
      url: null
    },
    {
      id: 'medstock',
      category: 'template',
      industry: 'healthcare',
      title: 'MedStock — Pharmacy Supply Grid',
      urlMock: 'medstock-pharmacy.mock',
      shortDesc: 'A bulk medicine supply catalog template showing expiration logs and order forms.',
      description: 'A medical inventory portal concept designed for local clinics to audit drug supplies and reorder stock.',
      clientBrief: 'Simple, high contrast tabular design focusing on search performance.',
      challenges: 'Filtering large list datasets dynamically without delaying UI frames.',
      contribution: 'Built client-side search query logic, styled status badges, and formatted export buttons.',
      stack: ['HTML5', 'CSS Flexbox', 'Vanilla JS', 'JSON Search'],
      url: null
    },
    {
      id: 'neuroscan',
      category: 'template',
      industry: 'healthcare',
      title: 'NeuroScan — Diagnostic MRI Catalog',
      urlMock: 'neuroscan-records.mock',
      shortDesc: 'Healthcare imaging center dashboard listing MRI records and download indicators.',
      description: 'A medical archive template indexing doctor scan prescriptions, technician notes, and imaging links.',
      clientBrief: 'A secure layout concept demonstrating clinic diagnostic listings.',
      challenges: 'Ensuring medical codes and terms remain legible on narrow screens.',
      contribution: 'Formatted specifications tables, styled diagnostic status badges, and built download hooks.',
      stack: ['React', 'PDF Generator Engine', 'Flexbox Tables'],
      url: null
    },
    {
      id: 'urbandweller',
      category: 'template',
      industry: 'realestate',
      title: 'UrbanDweller — Apartment Finder',
      urlMock: 'urbandweller.mock',
      shortDesc: 'Premium rental apartment index featuring dynamic rent range filters and agent booking.',
      description: 'A real estate directory concept presenting layout images, rental specifications, and direct tour booking form fields.',
      clientBrief: 'Clean lifestyle aesthetics designed to increase tenant leads.',
      challenges: 'Styling range sliders and map overlays to look clean on modern viewports.',
      contribution: 'Coded range filtration sliders, formatted map card details, and structured booking forms.',
      stack: ['React', 'Range Filters', 'Leaflet Mock', 'Vanilla CSS'],
      url: null
    },
    {
      id: 'landmark',
      category: 'template',
      industry: 'realestate',
      title: 'LandMark — Commercial Space Hub',
      urlMock: 'landmark-offices.mock',
      shortDesc: 'B2B commercial office spaces directory showcasing layout schematics and floorplans.',
      description: 'An office directory concept listing available rental space dimensions, parking limits, and rental pricing tiers.',
      clientBrief: 'Professional B2B presentation of commercial real estate holdings.',
      challenges: 'Formatting complex floor specification grids for mobile columns.',
      contribution: 'Formatted floorplans grids, designed inquiry forms, and configured search categories.',
      stack: ['HTML5', 'CSS Flexbox', 'Responsive Tables'],
      url: null
    },
    {
      id: 'villavista',
      category: 'template',
      industry: 'realestate',
      title: 'VillaVista — Luxury Vacation Finder',
      urlMock: 'villavista-resorts.mock',
      shortDesc: 'Bespoke resort villas portfolio showcasing interactive photo galleries and booking.',
      description: 'A premium travel portfolio showing luxury villas, guest limit options, and calendar selections.',
      clientBrief: 'Vibrant, high-end presentation showing credentials to luxury travelers.',
      challenges: 'Optimizing custom image carousel loops to transition smoothly.',
      contribution: 'Coded photo carousel slider, styled booking overlays, and managed responsiveness.',
      stack: ['React', 'Carousel Slider', 'CSS Variables'],
      url: null
    },
    {
      id: 'buildflow',
      category: 'template',
      industry: 'realestate',
      title: 'BuildFlow — Contractor Bidding Ledger',
      urlMock: 'buildflow-bids.mock',
      shortDesc: 'Construction contractor bid catalog listing material cost calculations and milestones.',
      description: 'A B2B bidding interface helping general contractors list safety metrics, equipment rosters, and request project quotes.',
      clientBrief: 'Autoritative design built to establish contract trust.',
      challenges: 'Keeping cost calculations dynamic when material amounts update.',
      contribution: 'Coded material cost calculators, styled project milestones lists, and built forms.',
      stack: ['React', 'State Context', 'SVG Charts'],
      url: null
    },
    {
      id: 'autofleet',
      category: 'template',
      industry: 'automotive',
      title: 'AutoFleet — GPS Tracking Panel',
      urlMock: 'autofleet-gps.mock',
      shortDesc: 'Commercial fleet monitoring system template tracking vehicle fuel levels and locations.',
      description: 'An IoT fleet dashboard concept showing mock geo-coordinates, dispatch statuses, and vehicle metrics.',
      clientBrief: 'Heavy data visualization console for dispatch operators.',
      challenges: 'Simulating live truck status updates without lag.',
      contribution: 'Designed mock maps panel, coded status tickers, and styled charts.',
      stack: ['React', 'Leaflet Maps Mock', 'Flexbox', 'WebSockets Mock'],
      url: null
    },
    {
      id: 'carstream',
      category: 'template',
      industry: 'automotive',
      title: 'CarStream — Dealership Inventory',
      urlMock: 'carstream-dealers.mock',
      shortDesc: 'Car dealer catalog showing vehicle technical specs and financing quote forms.',
      description: 'An automotive sales inventory screen displaying car models, lease terms, and monthly calculators.',
      clientBrief: 'A lead generation site designed to capture lease inquires.',
      challenges: 'Designing dynamic payment estimations tables for mobile columns.',
      contribution: 'Coded finance calculator logic, styled filter sidebar, and built form routes.',
      stack: ['HTML5', 'CSS Grid', 'Finance Calculator', 'Search Filters'],
      url: null
    },
    {
      id: 'hangarone',
      category: 'template',
      industry: 'automotive',
      title: 'HangarOne — Aviation Logistic Hub',
      urlMock: 'hangarone-aviation.mock',
      shortDesc: 'Aviation charter scheduling template booking private flights and hangar spaces.',
      description: 'A private aviation operations screen managing flight schedules, pilot logs, and booking requests.',
      clientBrief: 'Sleek dark design built for luxury private jet services.',
      challenges: 'Styling flight scheduling timelines to fit neatly on tablets.',
      contribution: 'Designed flight timelines, styled status badges, and configured inputs.',
      stack: ['React', 'Aviation Icons', 'CSS Variables'],
      url: null
    },
    {
      id: 'logiroute',
      category: 'template',
      industry: 'automotive',
      title: 'LogiRoute — Cargo Booking Ledger',
      urlMock: 'logiroute-cargo.mock',
      shortDesc: 'Supply chain route scheduler booking truck shipments and tracking cargo weights.',
      description: 'A B2B logistics planning portal concept scheduling truck coordinates, freight categories, and order lists.',
      clientBrief: 'Clean grid presentation built for transport operators.',
      challenges: 'Validating bulk cargo load inputs to prevent exceeding route limit warnings.',
      contribution: 'Coded cargo limit checks, styled weight cards, and formatted routes.',
      stack: ['HTML5', 'CSS Grid', 'Custom Form Validation'],
      url: null
    },
    {
      id: 'skillstream',
      category: 'template',
      industry: 'education',
      title: 'SkillStream — Online Academy LMS',
      urlMock: 'skillstream-academy.mock',
      shortDesc: 'Video course platform template with lesson completion meters and student charts.',
      description: 'An educational dashboard layout presenting syllabus modules, video playback widgets, and lesson trackers.',
      clientBrief: 'Clean user interface designed for tutoring centers.',
      challenges: 'Synchronizing student lesson completion markers across session reloads.',
      contribution: 'Coded course lesson progress markers, designed media controls, and styled menus.',
      stack: ['React', 'HTML5 Media API', 'Local Storage'],
      url: null
    },
    {
      id: 'gradely',
      category: 'template',
      industry: 'education',
      title: 'Gradely — School Grade Ledger',
      urlMock: 'gradely-school.mock',
      shortDesc: 'Academic report card portal template with class average calculators and grade lists.',
      description: 'A school dashboard screen displaying report lists, student information card mockups, and average marks.',
      clientBrief: 'High contrast design focusing on grading grid readability.',
      challenges: 'Calculating class GPA stats and displaying grade charts dynamically.',
      contribution: 'Coded grade average calculations, formatted tables, and styled charts.',
      stack: ['HTML5', 'CSS Flexbox', 'JavaScript Calculator'],
      url: null
    },
    {
      id: 'b2bstore',
      category: 'template',
      industry: 'b2b',
      title: 'B2BStore — Wholesale Apparel Index',
      urlMock: 'b2bstore-apparel.mock',
      shortDesc: 'Wholesale inventory catalog linking bulk product details with order form paths.',
      description: 'A B2B clothing distribution catalog showing minimum order quantity (MOQ) metrics and WhatsApp forms.',
      clientBrief: 'Designed to bypass checkouts and send bulk purchase orders straight to WhatsApp.',
      challenges: 'Styling product cards with dynamic bulk discount indicators.',
      contribution: 'Coded catalog filter buttons, structured bulk order sheets, and styled cards.',
      stack: ['React', 'Bulk Discount Logic', 'Custom CSS'],
      url: null
    },
    {
      id: 'securegate',
      category: 'template',
      industry: 'tech',
      title: 'SecureGate — DevSecOps Dashboard',
      urlMock: 'securegate-firewall.mock',
      shortDesc: 'Cloud firewall security monitor tracking live origin IP blocks and quality gates.',
      description: 'A developer operations console showing origin request charts, threat alert lists, and server settings.',
      clientBrief: 'Density-heavy security board built for DevOps engineers.',
      challenges: 'Formatting high-density threat tables to remain legible.',
      contribution: 'Coded threat warnings logic, designed metrics widgets, and styled tables.',
      stack: ['React', 'SVG Charts', 'Server Logs Mock'],
      url: null
    },
    // --- 4 NEW PROJECTS TO REACH EXACTLY 50 ---
    {
      id: 'sppu_college',
      category: 'template',
      industry: 'education',
      title: 'SPPU Commerce & Science College Portal',
      urlMock: 'sppu-college.edu.in',
      shortDesc: 'Integrated academic administration portal staging student portals, syllabus catalogs, and admissions inquiries.',
      description: 'A professional college management portal template tailored for SPPU affiliates to organize departmental course catalogs, administrative notice alerts, and pre-admission registrations.',
      clientBrief: 'Built to structure student academic databases and streamline course inquiries for local administrative coordinators.',
      challenges: 'Designing dynamic responsive accordions for complex departmental curriculums and fee structures.',
      contribution: 'Creator. Built student registration form routes, styled collapsible course catalogs, and managed edge deployment.',
      stack: ['React', 'CSS Grid', 'College Info Forms', 'Vercel Deployment'],
      url: null
    },
    {
      id: 'sanjeevani_hospital',
      category: 'template',
      industry: 'healthcare',
      title: 'Sanjeevani Multi-Specialty Hospital Website',
      urlMock: 'sanjeevani-hospital.org.in',
      shortDesc: 'Clinical portal blueprint featuring patient intake, doctor search directories, and direct appointment bookings.',
      description: 'A modern medical consultation website template containing dynamic doctor availability slots calendars, clean HIPAA-compliant pre-intake forms, and service catalogs.',
      clientBrief: 'Created to outline clean clinical schedules and patient registrations to reduce front-desk hospital coordination delay.',
      challenges: 'Configuring legibility for senior citizen patients on mobile web browsers while keeping load time low.',
      contribution: 'Creator. Coded booking calendar UI validation grids, structured patient data sanitation logic, and styled department listings.',
      stack: ['React', 'Calendar Schedules UI', 'Data Sanitizer', 'Vercel Hosting'],
      url: null
    },
    {
      id: 'shringar_salon',
      category: 'template',
      industry: 'lifestyle',
      title: 'Shringar Premium Beauty Parlor & Spa',
      urlMock: 'shringar-beauty.in',
      shortDesc: 'High-end parlor business showcase with interactive service catalogs and service booking pipelines.',
      description: 'An elegant visual catalog website blueprint displaying beauty and spa service descriptions, customized pricing grids, and dynamic session schedulers.',
      clientBrief: 'Designed to establish strong local brand visuals and capture customer slot requests directly.',
      challenges: 'Loading high-quality beauty portfolio photography smoothly without causing layout shifts.',
      contribution: 'Creator. Designed luxury glassmorphic card grids, built calendar booking validation flows, and optimized WebP media delivery.',
      stack: ['HTML5', 'Custom CSS Grid', 'Vanilla JS', 'Progressive Media Loader'],
      url: null
    },
    {
      id: 'maratha_barber',
      category: 'template',
      industry: 'lifestyle',
      title: 'Royal Maratha Barber Shop Booking System',
      urlMock: 'marathabarbershop.in',
      shortDesc: 'Bespoke grooming salon catalog with real-time slot selection and service inquiry routers.',
      description: 'A client-focused barber shop website template organizing custom haircuts catalogs, hair treatment rates tables, and calendar-based booking grids.',
      clientBrief: 'Created to provide Pune customers with an elegant slot booking experience to eliminate shop waiting lines.',
      challenges: 'Preventing duplicate booking selections in local state operations on tablet viewports.',
      contribution: 'Creator. Built appointment scheduler widgets, configured responsive price tables, and handled DNS setup.',
      stack: ['React', 'Slot Selector Logic', 'Responsive Pricing Tables', 'Vercel Staging'],
      url: null
    }
  ];

  // Featured Web Development & Design Projects
  const featuredWebProjects = [
    {
      title: 'Interactive SaaS Analytics Dashboard',
      badge: 'SaaS App',
      tech: ['React.js', 'Vanilla CSS', 'Chart.js / SVG', 'Local State', 'Responsive Grid'],
      desc: 'A premium visual console designed for high-density business analytics. Features dynamic data filters, responsive grid charts, automated system status checkers, and seamless dark mode theme switching.'
    },
    {
      title: 'Modern Real Estate Marketplace',
      badge: 'Web Application',
      tech: ['HTML5 / CSS3', 'JavaScript', 'Custom Gallery', 'Interactive Map API', 'Booking Pipeline'],
      desc: 'A visual-centric property listing and search platform. Deployed with smooth image carousel layouts, filtering criteria, and direct agent connection flows via customized forms.'
    },
    {
      title: 'Creative Portfolio & Booking Engine',
      badge: 'UI/UX Concept',
      tech: ['React', 'Backdrop Blur', 'CSS Variables', 'SMTP Webhook', 'Glow Borders'],
      desc: 'An ultra-modern portfolio website template for freelancers and agency creators, utilizing premium glassmorphism layouts, theme switchers, and integrated project estimators.'
    },
    {
      title: 'Agribusiness B2B Catalog Portal',
      badge: 'B2B Web Portal',
      tech: ['HTML5', 'CSS Grid', 'WhatsApp API', 'Product Filters', 'SEO Optimized'],
      desc: 'A robust agricultural product catalog connecting bulk buyers with local suppliers. Features single-click checkout routes that package orders directly into WhatsApp messages.'
    },
    {
      title: 'Online Academy LMS Dashboard',
      badge: 'EdTech Portal',
      tech: ['React', 'HTML5 Media', 'Session Storage', 'Progress Trackers', 'PDF Engine'],
      desc: 'A comprehensive student learning portal supporting mock exams with persistent browser-state session timers, interactive grade spreadsheets, and downloadable PDF reports.'
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

  // Career datasets removed as requested by user
  const careerData = [];

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



  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Filtered projects selector
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'featured') {
      const seenIndustries = new Set();
      const featuredList = [];
      const liveProjects = projectsData.filter((p) => p.category === 'live');
      
      liveProjects.forEach((p) => {
        if (!seenIndustries.has(p.industry)) {
          seenIndustries.add(p.industry);
          featuredList.push(p);
        }
      });
      return featuredList;
    }

    const list = projectFilter === 'all' 
      ? projectsData 
      : projectsData.filter((p) => p.industry === projectFilter);
    return [...list].sort((a, b) => {
      if (a.category === 'live' && b.category === 'template') return -1;
      if (a.category === 'template' && b.category === 'live') return 1;
      return 0;
    });
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
    if (!formData.phone.trim()) {
      errs.phone = 'Contact number is required';
    } else if (!/^\+?[0-9\s\-]{10,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid contact number';
    }
    if (!formData.company.trim()) {
      errs.company = 'Company or Project Name is required';
    }
    if (!formData.message.trim()) errs.message = 'Please type a project summary';
    if (attachedFile && attachedFile.type !== 'application/pdf') {
      errs.file = 'Please upload a PDF file only';
    }
    return errs;
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      addToast(errs.file || 'Please correct the validation errors.', 'error');
      return;
    }
    setFormErrors({});
    setFormSubmitting(true);
    
    try {
      let fileData = null;
      if (attachedFile) {
        fileData = await convertFileToBase64(attachedFile);
      }

      const payload = {
        ...formData,
        fileName: attachedFile ? attachedFile.name : null,
        fileSize: attachedFile ? attachedFile.size : null,
        fileData: fileData
      };

      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        addToast('Inquiry successfully dispatched! Confirmation email sent.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          timeline: '',
          message: ''
        });
        setAttachedFile(null);
        const fileInput = document.getElementById('client-file');
        if (fileInput) fileInput.value = '';
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

  const isFormInvalid = !formData.name.trim() ||
                        !formData.email.trim() ||
                        !formData.phone.trim() ||
                        !formData.company.trim() ||
                        !formData.budget ||
                        !formData.timeline ||
                        !formData.message.trim();

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
              <p className="splash-subtitle-large">Creative Web Design &amp; Development</p>
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
            <a href="#work" className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}>Projects</a>
            <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}>Feedback</a>
            <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}>FAQ</a>
            <a href="#estimator" className={`nav-link ${activeSection === 'estimator' ? 'active' : ''}`}>Estimator</a>
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

            <Link to="/estimator" className="btn-tech btn-outline" style={{ padding: '0.55rem 1.15rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              Get Quote
            </Link>
            <a href="#contact" className="btn-tech btn-gradient" style={{ padding: '0.55rem 1.15rem', fontSize: '0.8rem' }}>Hire Me</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="reveal-on-scroll" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-layout">
          <div className="hero-left">
            <div className="section-label">Creative Web Design &amp; Development</div>
            <h1 className="hero-heading">
              Designing <span>Creative</span> Websites &amp; Digital Experiences.
            </h1>
            <p className="hero-desc">
              High-performance web applications, custom UI/UX design, and clean frontend code built for business growth. Creative designer executing projects with complete professional detailing.
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
                <div className="metric-lbl">Years Design &amp; Dev Experience</div>
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
                I am a <strong>Creative Website Designer</strong> and <strong>Full-Stack Developer</strong> based in Pune, India. 
                I specialize in designing beautiful user interfaces, crafting responsive frontends, and deploying high-performance web applications.
              </p>
              <div className="about-bio-highlight">
                "Crafting beautiful, modern, and user-centric digital experiences."
              </div>
              <p>
                Having graduated in Engineering from Savitribai Phule Pune University, 
                I combine technical programming logic with creative UI/UX design principles to build responsive websites that help brands grow and convert visitors.
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
                  <div className="about-fact-icon">🎨</div>
                  <div className="about-fact-content">
                    <span className="about-fact-lbl">Specialization</span>
                    <span className="about-fact-val">UI/UX &amp; Web Development</span>
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
        <h2 className="section-title">Custom Web Tools &amp; <span>Interactive</span> Builds</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {featuredWebProjects.map((proj, idx) => (
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

      {/* CLIENT PROJECTS SHOWCASE */}
      <section id="work" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">case studies</div>
        <h2 className="section-title">Production <span>Client Portfolios</span></h2>

        {/* Filter controls */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            className={`palette-btn ${projectFilter === 'featured' ? 'active' : ''}`}
            onClick={() => setProjectFilter('featured')}
          >
            ⭐ Featured Works
          </button>
          <button
            className={`palette-btn ${projectFilter === 'all' ? 'active' : ''}`}
            onClick={() => setProjectFilter('all')}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'tech' ? 'active' : ''}`}
            onClick={() => setProjectFilter('tech')}
          >
            Tech &amp; SaaS ({projectsData.filter(p => p.industry === 'tech').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'education' ? 'active' : ''}`}
            onClick={() => setProjectFilter('education')}
          >
            Education ({projectsData.filter(p => p.industry === 'education').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'b2b' ? 'active' : ''}`}
            onClick={() => setProjectFilter('b2b')}
          >
            B2B &amp; Industrial ({projectsData.filter(p => p.industry === 'b2b').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'lifestyle' ? 'active' : ''}`}
            onClick={() => setProjectFilter('lifestyle')}
          >
            Lifestyle &amp; Booking ({projectsData.filter(p => p.industry === 'lifestyle').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'fintech' ? 'active' : ''}`}
            onClick={() => setProjectFilter('fintech')}
          >
            Fintech &amp; Wealth ({projectsData.filter(p => p.industry === 'fintech').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'healthcare' ? 'active' : ''}`}
            onClick={() => setProjectFilter('healthcare')}
          >
            Healthcare ({projectsData.filter(p => p.industry === 'healthcare').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'realestate' ? 'active' : ''}`}
            onClick={() => setProjectFilter('realestate')}
          >
            Real Estate ({projectsData.filter(p => p.industry === 'realestate').length})
          </button>
          <button
            className={`palette-btn ${projectFilter === 'automotive' ? 'active' : ''}`}
            onClick={() => setProjectFilter('automotive')}
          >
            Automotive &amp; Transport ({projectsData.filter(p => p.industry === 'automotive').length})
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

      {/* TIMELINE EXPERIENCE SECTION REMOVED */}

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

      {/* PROJECT SCOPE ESTIMATOR SECTION */}
      <section id="estimator" className="reveal-on-scroll" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8rem' }}>
        <div className="section-label">interactive estimator</div>
        <h2 className="section-title">Calculate Your <span>Project Scope</span></h2>
        <div className="estimator-layout" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '3rem 2rem', backdropFilter: 'blur(10px)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 auto', maxWidth: '650px' }}>
            Ready to design and build a custom system? Use our new, highly advanced Project Scope Estimator. Select custom pages, adjust layout complexities, add cloud features or webhooks, and review a live dynamic cost breakdown.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/estimator" className="btn-tech btn-gradient" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', fontWeight: '600' }}>
              Launch Advanced Estimator &rarr;
            </Link>
          </div>
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
              <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Want to calculate a detailed dynamic scope first?</span>
                <Link
                  to="/estimator"
                  className="btn-tech btn-outline"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem' }}
                >
                  ⚙️ Project Estimator &rarr;
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '0.5rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                  <span style={{ padding: '0 0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or write custom details</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>
              </div>

              <div className="form-row-tech">
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
              </div>

              <div className="form-row-tech">
                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-phone">Contact Number *</label>
                  <input
                    type="tel"
                    id="client-phone"
                    className="form-input-tech"
                    placeholder="+91 98765 43210"
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
                    placeholder="e.g. Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                  {formErrors.company && <div className="form-error-tech">{formErrors.company}</div>}
                </div>
              </div>

              <div className="form-row-tech">
                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-budget">Estimated Budget Range *</label>
                  <select
                    id="client-budget"
                    className="form-input-tech"
                    style={{ background: 'var(--bg-navy)', color: 'var(--text-primary)' }}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Select budget range...</option>
                    <option value="under_10k">Under ₹10,000</option>
                    <option value="10k_25k">₹10,000 - ₹25,000</option>
                    <option value="25k_50k">₹25,000 - ₹50,000</option>
                    <option value="over_50k">₹50,000+ (Custom SaaS / System)</option>
                  </select>
                </div>
                <div className="form-group-tech">
                  <label className="form-label-tech" htmlFor="client-timeline">Project Timeline *</label>
                  <select
                    id="client-timeline"
                    className="form-input-tech"
                    style={{ background: 'var(--bg-navy)', color: 'var(--text-primary)' }}
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="">Select timeline...</option>
                    <option value="urgent">Urgent (&lt; 2 weeks)</option>
                    <option value="1month">1 Month</option>
                    <option value="2_3months">2-3 Months</option>
                    <option value="flexible">Flexible / Long-term</option>
                  </select>
                </div>
              </div>

              <div className="form-row-tech">
                <div className="form-group-tech" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label-tech" htmlFor="client-file">Attach Project Brief (Optional, PDF only)</label>
                  <input
                    type="file"
                    id="client-file"
                    accept=".pdf,application/pdf"
                    className="form-input-tech"
                    style={{ paddingTop: '0.45rem' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFile(e.target.files[0]);
                      } else {
                        setAttachedFile(null);
                      }
                    }}
                  />
                  {formErrors.file && <div className="form-error-tech">{formErrors.file}</div>}
                </div>
              </div>

              <div className="form-group-tech" style={{ marginTop: '1rem' }}>
                <label className="form-label-tech" htmlFor="client-message">Project Description &amp; Stack Requirements *</label>
                <textarea
                  id="client-message"
                  className="form-textarea-tech"
                  placeholder="Summarize your website requirements, desired features, and references..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                {formErrors.message && <div className="form-error-tech">{formErrors.message}</div>}
              </div>

              <button
                type="submit"
                className="btn-tech btn-gradient"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                disabled={formSubmitting || isFormInvalid}
              >
                {formSubmitting ? 'DISPATCHING MEMO...' : 'SUBMIT PROJECT ENQUIRY'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* COLLABORATION PROCESS & PHILOSOPHY */}
      <section id="collaboration-process" className="section-tech" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div className="section-header-tech">
          <span className="section-label-tech">Collaboration Workflow</span>
          <h2 className="section-title-tech">My Client Commitment &amp; <span>Working Process</span></h2>
          <p className="section-desc-tech" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            Building websites is about trust and long-term support. Here is exactly how we will connect, design, and maintain your project.
          </p>
        </div>

        <div className="collaboration-grid">
          <div className="collaboration-card">
            <div className="collab-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <span className="collab-step-num">01</span>
            <h3 className="collab-card-title">Direct Inquiry &amp; 24h Response</h3>
            <p className="collab-card-desc">
              Submit your inquiry using the contact form above. I personally review every query and will connect back within <strong>24 hours</strong> to discuss.
            </p>
          </div>

          <div className="collaboration-card">
            <div className="collab-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <span className="collab-step-num">02</span>
            <h3 className="collab-card-title">Review Completed Work First</h3>
            <p className="collab-card-desc">
              Before we initiate collaboration, inspect my fully-delivered client websites and active blueprint designs. Make sure my work matches your standards.
            </p>
          </div>

          <div className="collaboration-card">
            <div className="collab-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            <span className="collab-step-num">03</span>
            <h3 className="collab-card-title">50% Advance &amp; On-Time Delivery</h3>
            <p className="collab-card-desc">
              A standard 50% advance payment is required to initiate development. In return, I guarantee that your project milestones will be delivered exactly on schedule.
            </p>
          </div>

          <div className="collaboration-card">
            <div className="collab-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <span className="collab-step-num">04</span>
            <h3 className="collab-card-title">Flexible Time Meetings</h3>
            <p className="collab-card-desc">
              We align requirements with <strong>2 feedback meetings</strong> scheduled completely at your convenience. I will code every layout detail exactly how you specify.
            </p>
          </div>

          <div className="collaboration-card">
            <div className="collab-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <span className="collab-step-num">05</span>
            <h3 className="collab-card-title">Always Available Support</h3>
            <p className="collab-card-desc">
              Our relationship doesn't end after deployment. If your site ever goes down or displays an error, call me immediately. I will support you completely.
            </p>
          </div>

          <div className="collaboration-card">
            <div className="collab-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <span className="collab-step-num">06</span>
            <h3 className="collab-card-title">Proactive Code Upgrades</h3>
            <p className="collab-card-desc">
              If modern web standards or design libraries become outdated, I will proactively message you to propose upgrades. Implementing them will have separate, fair charges.
            </p>
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

          {/* Sitemap Column */}
          <div className="footer-links-col">
            <h4 className="footer-title-tech">Sitemap</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About Me</a></li>
              <li><a href="#skills">Services</a></li>
              <li><a href="#work">Projects</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#estimator">Estimator</a></li>
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className="footer-links-col">
            <h4 className="footer-title-tech">Capabilities</h4>
            <ul className="footer-links-list">
              <li><a href="#skills">UI/UX &amp; Web Design</a></li>
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
          <div className="footer-legal-links">
            <button onClick={() => setActiveLegalPage('privacy')} className="footer-legal-link">Privacy Policy</button>
            <button onClick={() => setActiveLegalPage('terms')} className="footer-legal-link">Terms of Service</button>
            <button onClick={() => setActiveLegalPage('refund')} className="footer-legal-link">Refund Policy</button>
            <button onClick={() => setActiveLegalPage('agreement')} className="footer-legal-link">Client Agreement</button>
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
      {selectedProject && details && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              ✕
            </button>
            <div className="modal-body-tech">
              {/* Header block */}
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <span className={`project-type-badge ${selectedProject.category === 'live' ? 'type-badge-live' : 'type-badge-template'}`}>
                  {selectedProject.category === 'live' ? 'Active Production Release' : 'System Architecture Blueprint'}
                </span>
                <h3 className="modal-title-tech" style={{ marginTop: '0.75rem' }}>{selectedProject.title}</h3>
                {selectedProject.url && (
                  <a href={selectedProject.url} target="_blank" rel="noreferrer" className="modal-url-link">
                    <ExternalLinkIcon /> Open Live Production Link ({selectedProject.urlMock})
                  </a>
                )}
              </div>

              {/* Quick Stats Grid */}
              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <span className="modal-stat-label">Industry Sector</span>
                  <span className="modal-stat-val" style={{ textTransform: 'capitalize' }}>
                    {selectedProject.industry === 'realestate' ? 'Real Estate' : selectedProject.industry === 'automotive' ? 'Automotive' : selectedProject.industry}
                  </span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">
                    {selectedProject.category === 'live' ? 'Client Satisfaction' : 'Blueprint Feasibility'}
                  </span>
                  <span className="modal-stat-val" style={{ color: 'var(--accent-cyan)' }}>
                    {details.satisfaction}%
                  </span>
                  <div className="modal-stat-progress-bg">
                    <div className="modal-stat-progress-bar" style={{ width: `${details.satisfaction}%` }}></div>
                  </div>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">Core Platform</span>
                  <span className="modal-stat-val">{selectedProject.stack[0]}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="modal-stat-label">Architecture Scope</span>
                  <span className="modal-stat-val">{selectedProject.stack.length} Core Modules</span>
                </div>
              </div>

              {/* Lighthouse Performance Scorecard Panel */}
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <h4 className="modal-col-lbl" style={{ marginBottom: '1.25rem' }}>Lighthouse Audit &amp; Web Vitals</h4>
                <div className="modal-scorecard-grid">
                  <ScoreCircle score={details.scores.perf} label="Performance" />
                  <ScoreCircle score={details.scores.access} label="Accessibility" />
                  <ScoreCircle score={details.scores.best} label="Best Practices" />
                  <ScoreCircle score={details.scores.seo} label="SEO" />
                </div>
              </div>

              {/* Main Content Layout Grid */}
              <div className="modal-grid-cols">
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h4 className="modal-col-lbl">Overview &amp; Purpose</h4>
                    <p className="modal-col-val">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h4 className="modal-col-lbl">Client Brief</h4>
                    <p className="modal-col-val">{selectedProject.clientBrief}</p>
                  </div>
                  <div>
                    <h4 className="modal-col-lbl">Technical Challenges</h4>
                    <p className="modal-col-val">{selectedProject.challenges}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h4 className="modal-col-lbl">Deep User Research &amp; Strategy</h4>
                    <p className="modal-col-val" style={{ fontStyle: 'italic', borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '0.75rem' }}>
                      "{details.research}"
                    </p>
                  </div>
                  <div>
                    <h4 className="modal-col-lbl">Client Problems Solved</h4>
                    <div className="modal-problems-list">
                      {details.problemsSolved.map((prob, idx) => (
                        <div key={idx} className="modal-problem-card">
                          <span className="problem-card-icon">✓</span>
                          <p className="modal-problem-text">{prob}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Module Architecture Flow Chart Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <h4 className="modal-col-lbl" style={{ marginBottom: '1.25rem' }}>Visual Module Architecture Flow</h4>
                <div className="modal-arch-flow">
                  {details.flow.map((node, idx) => (
                    <React.Fragment key={idx}>
                      <div className="arch-node-pill">
                        <span className="arch-node-dot"></span>
                        {node}
                      </div>
                      {idx < details.flow.length - 1 && (
                        <div className="flow-arrow">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Features List Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <h4 className="modal-col-lbl" style={{ marginBottom: '1rem' }}>Key Features &amp; Implementation Details</h4>
                <ul className="modal-features-list">
                  {details.features.map((feat, idx) => (
                    <li key={idx} className="modal-feature-item">
                      <span className="feature-item-dot"></span>
                      <span className="modal-col-val">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workflow Roadmap Timeline Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.75rem 0', margin: '1.75rem 0' }}>
                <h4 className="modal-col-lbl" style={{ marginBottom: '1.5rem' }}>Development Execution Roadmap &amp; Workflow</h4>
                <div className="modal-workflow-timeline">
                  {details.workflow.map((step, idx) => (
                    <div key={idx} className="modal-workflow-step">
                      <div className="workflow-step-left">
                        <div className="workflow-step-num">{idx + 1}</div>
                        {idx < details.workflow.length - 1 && <div className="workflow-step-line"></div>}
                      </div>
                      <div className="workflow-step-right">
                        <h5 className="workflow-step-title">{step.phase}</h5>
                        <p className="workflow-step-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Outcome Banner */}
              <div className="modal-outcome-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="outcome-banner-pulse"></span>
                  <h4 className="modal-col-lbl" style={{ color: 'var(--accent-cyan)', margin: 0 }}>
                    {selectedProject.category === 'live' ? 'Production Outcome & Business Impact' : 'Blueprint Architecture Execution Feasibility'}
                  </h4>
                </div>
                <p className="modal-col-val" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                  {details.clientOutcome}
                </p>
              </div>

              {/* Developer Key Takeaways Banner */}
              <div className="modal-takeaways-block" style={{ marginTop: '1.5rem', background: 'rgba(124, 58, 237, 0.03)', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line></svg>
                  <h4 className="modal-col-lbl" style={{ color: '#7c3aed', margin: 0 }}>Developer Key Takeaways &amp; Engineering Growth</h4>
                </div>
                <p className="modal-col-val" style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                  {details.lessons}
                </p>
              </div>

              {/* Interactive Collapsible Code Snippet Drawer */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <button 
                  className="code-toggle-btn" 
                  onClick={() => setShowSnippet(!showSnippet)}
                  style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                    <CodeIcon /> {showSnippet ? 'Hide Implementation Code' : 'View Core Architecture Code'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{showSnippet ? '▲' : '▼'}</span>
                </button>
                
                {showSnippet && (
                  <div className="code-snippet-drawer animate-fade-in" style={{ marginTop: '1rem' }}>
                    <div className="code-terminal-header">
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <div className="browser-dot" style={{ background: '#EF4444' }}></div>
                        <div className="browser-dot" style={{ background: '#F59E0B' }}></div>
                        <div className="browser-dot" style={{ background: '#10B981' }}></div>
                      </div>
                      <span className="code-terminal-filename">{selectedProject.id}_core_module.js</span>
                    </div>
                    <pre className="code-terminal-body" style={{ margin: 0, overflowX: 'auto', padding: '1.25rem', background: '#0f172a', borderRadius: '0 0 10px 10px' }}>
                      <code style={{ fontFamily: 'var(--mono)', fontSize: '0.825rem', color: '#f8fafc', lineBreak: 'anywhere' }}>{details.snippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Execution & Stack Pills */}
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h4 className="modal-col-lbl">Execution &amp; Core Contributions</h4>
                <p className="modal-col-val" style={{ marginBottom: '1.25rem' }}>{selectedProject.contribution}</p>
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

      {/* LEGAL POLICY MODAL */}
      {activeLegalPage && (
        <div className="modal-backdrop" onClick={() => setActiveLegalPage(null)}>
          <div className="modal-card legal-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setActiveLegalPage(null)} aria-label="Close modal">
              ✕
            </button>
            <div className="modal-body-tech">
              {activeLegalPage === 'privacy' && (
                <div>
                  <h3 className="modal-title-tech">Privacy Policy</h3>
                  <p className="modal-col-val" style={{ margin: '1rem 0' }}>
                    Soham Pawar values your privacy. This policy explains what information is collected when using this portfolio website and how it is managed.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Information Collection</h4>
                  <p className="modal-col-val">
                    We collect personal details (such as Name, Email address, and message description) that you voluntarily submit through the project inquiry contact forms.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Data Usage</h4>
                  <p className="modal-col-val">
                    Any information submitted is used solely to respond to your inquiries and coordinate web design or development activities. Your information is never sold, traded, or shared with third-party advertising companies.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Cookies &amp; Tracking</h4>
                  <p className="modal-col-val">
                    This website does not run tracking scripts or cookies. All logs and calculator widgets run completely client-side in your local browser environment.
                  </p>
                </div>
              )}

              {activeLegalPage === 'terms' && (
                <div>
                  <h3 className="modal-title-tech">Terms of Service</h3>
                  <p className="modal-col-val" style={{ margin: '1rem 0' }}>
                    Welcome to Soham Pawar's portfolio website. By accessing or using this portal, you agree to comply with the terms of service outlined below.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Service Offerings</h4>
                  <p className="modal-col-val">
                    I provide freelance web design, UI/UX wireframing, frontend development, and custom backend API integration services on a project-by-project contract basis.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Intellectual Property Transfer</h4>
                  <p className="modal-col-val">
                    Upon receipt of the final project payment, the complete source code, graphics, and design assets are fully transferred to the client. I retain the right to showcase the completed work in my portfolio website unless explicitly agreed otherwise.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Liability Limits</h4>
                  <p className="modal-col-val">
                    While I verify all website builds for speed, security, and stability, I am not liable for any business loss, database corruption, or security breaches resulting from host server providers or client-side adjustments.
                  </p>
                </div>
              )}

              {activeLegalPage === 'refund' && (
                <div>
                  <h3 className="modal-title-tech">Refund Policy</h3>
                  <p className="modal-col-val" style={{ margin: '1rem 0' }}>
                    I believe in transparency and trust. The payment and refund terms are structured to protect both client resources and development labor.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>50% Advance Commitment</h4>
                  <p className="modal-col-val">
                    As per my working process guidelines, a standard 50% advance payment is required to initiate development. This advance payment is non-refundable once custom research, layout wireframing, or programming begins.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>On-Time Delivery Guarantee</h4>
                  <p className="modal-col-val">
                    If I fail to deliver the project milestones within our agreed-upon schedule due to my own delays, you are entitled to a full refund of any milestone payments beyond the initial advance.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Cancellation Terms</h4>
                  <p className="modal-col-val">
                    Clients can cancel the project at any stage. Any payments made for milestones that have not yet been started will be fully refunded to the client within 7 business days.
                  </p>
                </div>
              )}

              {activeLegalPage === 'agreement' && (
                <div>
                  <h3 className="modal-title-tech">Client Agreement</h3>
                  <p className="modal-col-val" style={{ margin: '1rem 0' }}>
                    This agreement defines the operational responsibilities and support commitment between Soham Pawar (Developer) and the Client.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Communication Protocols</h4>
                  <p className="modal-col-val">
                    We coordinate project requirements through 2 scheduled design/feedback meetings conducted completely at your convenience. I build the visual assets and code features exactly as per these alignments.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Lifetime Bug &amp; Downtime Support</h4>
                  <p className="modal-col-val">
                    Our relationship is not limited to project completion. If your site experiences server downtime or code errors in the future, you can contact me directly. I am always available to troubleshoot and keep your portal active.
                  </p>
                  <h4 className="modal-col-lbl" style={{ marginTop: '1.5rem' }}>Upgrades &amp; Outdated Tech</h4>
                  <p className="modal-col-val">
                    If website packages, frameworks, or styling models become outdated, I will proactively message you to propose modern updates. Implementing these optional changes will carry separate, fair charges.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
