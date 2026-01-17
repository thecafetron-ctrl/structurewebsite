'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { 
  ChevronRight, 
  Download,
  Printer,
  ChevronDown,
  Check,
  ArrowRight,
  Truck,
  FileText,
  Settings,
  BarChart3,
  Users,
  Clock,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Package,
  Globe,
  Layers,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Box,
  Route,
  ClipboardCheck,
  DollarSign,
  Warehouse,
  Calendar,
  MapPin,
  FileCheck,
  Cog
} from 'lucide-react'

// =============================================================================
// SVG GRAPHICS COMPONENTS - Custom logistics illustrations
// =============================================================================

function WorkflowDiagram() {
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto" fill="none">
      {/* Connection lines */}
      <path d="M150 100 L250 100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
      <path d="M350 100 L450 100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
      <path d="M550 100 L650 100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
      
      {/* Node 1 - Lead */}
      <circle cx="100" cy="100" r="45" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="2"/>
      <text x="100" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">LEAD</text>
      <text x="100" y="110" textAnchor="middle" fill="#94A3B8" fontSize="9">CAPTURE</text>
      
      {/* Node 2 - Quote */}
      <circle cx="300" cy="100" r="45" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="2"/>
      <text x="300" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">QUOTE</text>
      <text x="300" y="110" textAnchor="middle" fill="#94A3B8" fontSize="9">GENERATE</text>
      
      {/* Node 3 - Book */}
      <circle cx="500" cy="100" r="45" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="2"/>
      <text x="500" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">BOOK</text>
      <text x="500" y="110" textAnchor="middle" fill="#94A3B8" fontSize="9">SHIPMENT</text>
      
      {/* Node 4 - Deliver */}
      <circle cx="700" cy="100" r="45" fill="#1E3A5F" stroke="#22C55E" strokeWidth="2"/>
      <text x="700" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">DELIVER</text>
      <text x="700" y="110" textAnchor="middle" fill="#94A3B8" fontSize="9">& INVOICE</text>
      
      {/* Arrows */}
      <polygon points="245,100 255,95 255,105" fill="#3B82F6"/>
      <polygon points="445,100 455,95 455,105" fill="#3B82F6"/>
      <polygon points="645,100 655,95 655,105" fill="#22C55E"/>
    </svg>
  )
}

function ScaleComparisonGraphic() {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto" fill="none">
      {/* Left side - Manual */}
      <rect x="50" y="50" width="200" height="200" rx="12" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
      <text x="150" y="85" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="700">MANUAL PROCESS</text>
      
      {/* Stress indicators */}
      <circle cx="90" cy="130" r="20" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2"/>
      <text x="90" y="135" textAnchor="middle" fill="#fff" fontSize="20">😰</text>
      
      <circle cx="150" cy="130" r="20" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2"/>
      <text x="150" y="135" textAnchor="middle" fill="#fff" fontSize="20">📋</text>
      
      <circle cx="210" cy="130" r="20" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2"/>
      <text x="210" y="135" textAnchor="middle" fill="#fff" fontSize="20">⏰</text>
      
      <text x="150" y="180" textAnchor="middle" fill="#9CA3AF" fontSize="11">50 shipments = chaos</text>
      <text x="150" y="200" textAnchor="middle" fill="#9CA3AF" fontSize="11">Errors multiply</text>
      <text x="150" y="220" textAnchor="middle" fill="#9CA3AF" fontSize="11">Team burnout</text>
      
      {/* Arrow */}
      <path d="M270 150 L330 150" stroke="#6B7280" strokeWidth="3" markerEnd="url(#arrowhead)"/>
      <text x="300" y="130" textAnchor="middle" fill="#6B7280" fontSize="10">VS</text>
      
      {/* Right side - Automated */}
      <rect x="350" y="50" width="200" height="200" rx="12" fill="#1F2937" stroke="#22C55E" strokeWidth="2"/>
      <text x="450" y="85" textAnchor="middle" fill="#22C55E" fontSize="14" fontWeight="700">AI-AUTOMATED</text>
      
      {/* Success indicators */}
      <circle cx="390" cy="130" r="20" fill="#14532D" stroke="#22C55E" strokeWidth="2"/>
      <text x="390" y="135" textAnchor="middle" fill="#fff" fontSize="20">🚀</text>
      
      <circle cx="450" cy="130" r="20" fill="#14532D" stroke="#22C55E" strokeWidth="2"/>
      <text x="450" y="135" textAnchor="middle" fill="#fff" fontSize="20">✅</text>
      
      <circle cx="510" cy="130" r="20" fill="#14532D" stroke="#22C55E" strokeWidth="2"/>
      <text x="510" y="135" textAnchor="middle" fill="#fff" fontSize="20">📈</text>
      
      <text x="450" y="180" textAnchor="middle" fill="#9CA3AF" fontSize="11">500+ shipments = smooth</text>
      <text x="450" y="200" textAnchor="middle" fill="#9CA3AF" fontSize="11">Consistent accuracy</text>
      <text x="450" y="220" textAnchor="middle" fill="#9CA3AF" fontSize="11">Team focused on growth</text>
    </svg>
  )
}

function SystemLayersDiagram() {
  return (
    <svg viewBox="0 0 700 400" className="w-full h-auto" fill="none">
      {/* Layer 1 - Demand & Revenue */}
      <rect x="50" y="30" width="600" height="50" rx="8" fill="#1E3A8A" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
      <text x="75" y="60" fill="#60A5FA" fontSize="13" fontWeight="600">1. DEMAND &amp; REVENUE INTAKE</text>
      <text x="450" y="60" fill="#94A3B8" fontSize="11">Leads → Quotes → Bookings</text>
      
      {/* Layer 2 - Planning */}
      <rect x="50" y="95" width="600" height="50" rx="8" fill="#7C3AED" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2"/>
      <text x="75" y="125" fill="#A78BFA" fontSize="13" fontWeight="600">2. PLANNING &amp; OPTIMIZATION</text>
      <text x="450" y="125" fill="#94A3B8" fontSize="11">Routes → Loads → Resources</text>
      
      {/* Layer 3 - Execution */}
      <rect x="50" y="160" width="600" height="50" rx="8" fill="#059669" fillOpacity="0.2" stroke="#10B981" strokeWidth="2"/>
      <text x="75" y="190" fill="#34D399" fontSize="13" fontWeight="600">3. EXECUTION &amp; CUSTOMER</text>
      <text x="450" y="190" fill="#94A3B8" fontSize="11">Track &amp; Trace → Support</text>
      
      {/* Layer 4 - Documentation */}
      <rect x="50" y="225" width="600" height="50" rx="8" fill="#D97706" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2"/>
      <text x="75" y="255" fill="#FBBF24" fontSize="13" fontWeight="600">4. DOCUMENTATION &amp; COMPLIANCE</text>
      <text x="450" y="255" fill="#94A3B8" fontSize="11">Customs → Documents → Regulations</text>
      
      {/* Layer 5 - Financial */}
      <rect x="50" y="290" width="600" height="50" rx="8" fill="#DC2626" fillOpacity="0.2" stroke="#EF4444" strokeWidth="2"/>
      <text x="75" y="320" fill="#F87171" fontSize="13" fontWeight="600">5. FINANCIAL FLOW</text>
      <text x="450" y="320" fill="#94A3B8" fontSize="11">Billing → Payments → Accounting</text>
      
      {/* Layer 6 - Warehousing */}
      <rect x="50" y="355" width="600" height="50" rx="8" fill="#0891B2" fillOpacity="0.2" stroke="#06B6D4" strokeWidth="2"/>
      <text x="75" y="385" fill="#22D3EE" fontSize="13" fontWeight="600">6. WAREHOUSING &amp; FULFILLMENT</text>
      <text x="450" y="385" fill="#94A3B8" fontSize="11">Storage → Pick/Pack → Ship</text>
      
      {/* Central arrow showing data flow */}
      <path d="M35 55 L35 380" stroke="#6B7280" strokeWidth="2" strokeDasharray="4,4"/>
      <text x="20" y="220" fill="#6B7280" fontSize="10" transform="rotate(-90 20 220)">DATA FLOW</text>
    </svg>
  )
}

function TimelineDiagram() {
  return (
    <svg viewBox="0 0 800 180" className="w-full h-auto" fill="none">
      {/* Timeline line */}
      <line x1="50" y1="90" x2="750" y2="90" stroke="#374151" strokeWidth="3"/>
      
      {/* Week markers */}
      {[
        { x: 100, week: '1-2', label: 'Identify & Baseline', color: '#3B82F6' },
        { x: 220, week: '3-4', label: 'Choose & Prep', color: '#8B5CF6' },
        { x: 340, week: '5-6', label: 'Pilot & Train', color: '#F59E0B' },
        { x: 460, week: '7-8', label: 'Refine & Expand', color: '#10B981' },
        { x: 580, week: '9-10', label: 'Full Rollout', color: '#06B6D4' },
        { x: 700, week: '11-12', label: 'Measure ROI', color: '#22C55E' },
      ].map((item, i) => (
        <g key={i}>
          <circle cx={item.x} cy="90" r="20" fill="#111827" stroke={item.color} strokeWidth="3"/>
          <text x={item.x} y="95" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">{item.week}</text>
          <text x={item.x} y="130" textAnchor="middle" fill="#9CA3AF" fontSize="9">{item.label}</text>
          <text x={item.x} y="55" textAnchor="middle" fill={item.color} fontSize="10" fontWeight="600">WEEK</text>
        </g>
      ))}
      
      {/* Progress gradient */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="50%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#22C55E"/>
        </linearGradient>
      </defs>
      <line x1="50" y1="90" x2="750" y2="90" stroke="url(#progressGradient)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function ROIGraphic() {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto" fill="none">
      {/* Background grid */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1="80" y1={50 + i * 50} x2="550" y2={50 + i * 50} stroke="#1F2937" strokeWidth="1"/>
      ))}
      
      {/* Y-axis labels */}
      <text x="60" y="55" textAnchor="end" fill="#6B7280" fontSize="10">100%</text>
      <text x="60" y="105" textAnchor="end" fill="#6B7280" fontSize="10">75%</text>
      <text x="60" y="155" textAnchor="end" fill="#6B7280" fontSize="10">50%</text>
      <text x="60" y="205" textAnchor="end" fill="#6B7280" fontSize="10">25%</text>
      <text x="60" y="255" textAnchor="end" fill="#6B7280" fontSize="10">0%</text>
      
      {/* X-axis labels */}
      <text x="120" y="280" textAnchor="middle" fill="#6B7280" fontSize="10">Day 30</text>
      <text x="240" y="280" textAnchor="middle" fill="#6B7280" fontSize="10">Day 60</text>
      <text x="360" y="280" textAnchor="middle" fill="#6B7280" fontSize="10">Day 90</text>
      <text x="480" y="280" textAnchor="middle" fill="#6B7280" fontSize="10">Day 120</text>
      
      {/* ROI curve */}
      <path 
        d="M80 250 Q150 240 180 200 T280 150 T380 80 T520 50" 
        stroke="#22C55E" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Area under curve */}
      <path 
        d="M80 250 Q150 240 180 200 T280 150 T380 80 T520 50 L520 250 L80 250 Z" 
        fill="url(#roiGradient)"
        fillOpacity="0.3"
      />
      
      <defs>
        <linearGradient id="roiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22C55E"/>
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0"/>
        </linearGradient>
      </defs>
      
      {/* Data points */}
      <circle cx="180" cy="200" r="6" fill="#22C55E"/>
      <circle cx="280" cy="150" r="6" fill="#22C55E"/>
      <circle cx="380" cy="80" r="6" fill="#22C55E"/>
      <circle cx="520" cy="50" r="6" fill="#22C55E"/>
      
      {/* Labels */}
      <text x="180" y="185" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="600">+25%</text>
      <text x="280" y="135" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="600">+50%</text>
      <text x="380" y="65" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="600">+85%</text>
      <text x="520" y="35" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="600">+100%</text>
      
      {/* Title */}
      <text x="300" y="25" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">ROI TRAJECTORY</text>
    </svg>
  )
}

function AutomationReadinessChecklist() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto" fill="none">
      <rect x="20" y="20" width="560" height="360" rx="12" fill="#111827" stroke="#374151" strokeWidth="2"/>
      
      <text x="300" y="55" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700">AUTOMATION READINESS CHECKLIST</text>
      
      {[
        { y: 90, text: 'Workflows are documented and standardized', checked: true },
        { y: 130, text: 'Data is centralized in one system', checked: true },
        { y: 170, text: 'Clear business rules are defined', checked: true },
        { y: 210, text: 'Team is trained on current processes', checked: false },
        { y: 250, text: 'KPIs and metrics are tracked', checked: false },
        { y: 290, text: 'Integration points are identified', checked: true },
        { y: 330, text: 'Budget allocated for automation tools', checked: false },
      ].map((item, i) => (
        <g key={i}>
          <rect x="50" y={item.y - 15} width="24" height="24" rx="4" fill={item.checked ? '#22C55E' : '#374151'} stroke={item.checked ? '#22C55E' : '#6B7280'} strokeWidth="2"/>
          {item.checked && <path d={`M56 ${item.y} L62 ${item.y + 6} L72 ${item.y - 6}`} stroke="#fff" strokeWidth="2" fill="none"/>}
          <text x="90" y={item.y + 5} fill="#D1D5DB" fontSize="13">{item.text}</text>
        </g>
      ))}
      
      <text x="300" y="375" textAnchor="middle" fill="#6B7280" fontSize="11">Score: 4/7 items ready - Good foundation for automation</text>
    </svg>
  )
}

// =============================================================================
// COVER WORKFLOW DIAGRAM - Matches the provided cover design
// =============================================================================

function CoverWorkflowDiagram() {
  return (
    <svg viewBox="0 0 500 120" className="w-full max-w-md h-auto mx-auto" fill="none">
      {/* Top row: Location -> 90 DAYS -> Checklist */}
      <g>
        {/* Location pin */}
        <circle cx="60" cy="35" r="25" fill="transparent" stroke="#22D3EE" strokeWidth="1.5"/>
        <circle cx="60" cy="30" r="8" fill="transparent" stroke="#22D3EE" strokeWidth="1.5"/>
        <path d="M60 38 L60 48" stroke="#22D3EE" strokeWidth="1.5"/>
        
        {/* Arrow to 90 DAYS */}
        <path d="M90 35 L140 35" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4,4"/>
        <polygon points="138,31 146,35 138,39" fill="#22D3EE"/>
        
        {/* 90 DAYS text */}
        <text x="250" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="32" fontWeight="800" fontFamily="sans-serif">90</text>
        <text x="305" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="16" fontWeight="600" fontFamily="sans-serif">DAYS</text>
        
        {/* Arrow from 90 DAYS */}
        <path d="M340 35 L390 35" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4,4"/>
        <polygon points="388,31 396,35 388,39" fill="#22D3EE"/>
        
        {/* Checklist icon */}
        <rect x="410" y="15" width="35" height="40" rx="3" fill="transparent" stroke="#22D3EE" strokeWidth="1.5"/>
        <path d="M418 28 L423 33 L435 21" stroke="#22D3EE" strokeWidth="1.5" fill="none"/>
        <line x1="418" y1="40" x2="438" y2="40" stroke="#22D3EE" strokeWidth="1"/>
        <line x1="418" y1="47" x2="432" y2="47" stroke="#22D3EE" strokeWidth="1"/>
      </g>
      
      {/* Bottom row: Document -> Warehouse -> Truck */}
      <g>
        {/* Document icon */}
        <rect x="80" y="75" width="30" height="35" rx="2" fill="transparent" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="87" y1="85" x2="103" y2="85" stroke="#22D3EE" strokeWidth="1"/>
        <line x1="87" y1="92" x2="100" y2="92" stroke="#22D3EE" strokeWidth="1"/>
        <line x1="87" y1="99" x2="103" y2="99" stroke="#22D3EE" strokeWidth="1"/>
        
        {/* Arrow */}
        <path d="M120 92 L170 92" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4,4"/>
        <polygon points="168,88 176,92 168,96" fill="#22D3EE"/>
        
        {/* Warehouse icon */}
        <rect x="190" y="75" width="40" height="35" rx="2" fill="transparent" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="190" y1="85" x2="230" y2="85" stroke="#22D3EE" strokeWidth="1"/>
        <rect x="200" y="90" width="8" height="15" fill="transparent" stroke="#22D3EE" strokeWidth="1"/>
        <rect x="212" y="90" width="8" height="15" fill="transparent" stroke="#22D3EE" strokeWidth="1"/>
        
        {/* Arrow */}
        <path d="M240 92 L290 92" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4,4"/>
        <polygon points="288,88 296,92 288,96" fill="#22D3EE"/>
        
        {/* Package/Box icon */}
        <rect x="310" y="75" width="35" height="35" rx="2" fill="transparent" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="310" y1="92" x2="345" y2="92" stroke="#22D3EE" strokeWidth="1"/>
        <line x1="327" y1="75" x2="327" y2="110" stroke="#22D3EE" strokeWidth="1"/>
        
        {/* Arrow */}
        <path d="M355 92 L390 92" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4,4"/>
        
        {/* Truck icon */}
        <rect x="400" y="80" width="45" height="25" rx="2" fill="transparent" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3,3"/>
        <circle cx="412" cy="108" r="5" fill="transparent" stroke="#22D3EE" strokeWidth="1.5"/>
        <circle cx="435" cy="108" r="5" fill="transparent" stroke="#22D3EE" strokeWidth="1.5"/>
      </g>
    </svg>
  )
}

// =============================================================================
// TABLE OF CONTENTS DATA
// =============================================================================

const tableOfContents = [
  { id: 'cover', title: 'Cover', page: 1 },
  { id: 'introduction', title: 'Introduction - Why Freight Scale Breaks', page: 2 },
  { id: 'chapter1', title: 'Chapter 1: The Freight Operation as a Structured System', page: 4 },
  { id: 'chapter2', title: 'Chapter 2: Demand & Revenue Intake', page: 7 },
  { id: 'chapter3', title: 'Chapter 3: Planning & Optimization', page: 10 },
  { id: 'chapter4', title: 'Chapter 4: Execution & Customer Interaction', page: 13 },
  { id: 'chapter5', title: 'Chapter 5: Documentation & Compliance', page: 16 },
  { id: 'chapter6', title: 'Chapter 6: Financial Flow', page: 19 },
  { id: 'chapter7', title: 'Chapter 7: Warehousing & Fulfillment', page: 22 },
  { id: 'implementation', title: '90-Day Implementation Planner', page: 25 },
  { id: 'cta', title: 'Next Steps: Workflow Assessment', page: 28 },
]

// =============================================================================
// MAIN EBOOK COMPONENT
// =============================================================================

export default function PlaybookPage() {
  const [showTOC, setShowTOC] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setShowTOC(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .ebook-page { 
            page-break-after: always;
            padding: 40px !important;
            background: white !important;
          }
          .ebook-page:last-child { page-break-after: auto; }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
        
        .ebook-serif { font-family: 'Playfair Display', Georgia, serif; }
        .ebook-sans { font-family: 'Source Sans Pro', -apple-system, sans-serif; }
      `}</style>

      {/* Floating TOC Button */}
      <button
        onClick={() => setShowTOC(!showTOC)}
        className="no-print fixed bottom-6 right-6 z-50 bg-cyan-600 hover:bg-cyan-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Table of Contents"
      >
        <FileText className="w-6 h-6" />
      </button>

      {/* Floating Print Button */}
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-6 right-24 z-50 bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Print PDF"
      >
        <Printer className="w-6 h-6" />
      </button>

      {/* TOC Sidebar */}
      {showTOC && (
        <div className="no-print fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setShowTOC(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-6 ebook-serif">Table of Contents</h3>
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <span className="text-gray-300 group-hover:text-cyan-400 text-sm ebook-sans">{item.title}</span>
                  <span className="float-right text-gray-600 text-sm">{item.page}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Ebook Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto">
        
        {/* ==================== COVER PAGE ==================== */}
        <div id="cover" className="ebook-page min-h-screen flex flex-col relative overflow-hidden">
          {/* Cover background with cityscape effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#111] to-[#0a0a0a]">
            {/* Grid overlay for industrial feel */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}/>
            {/* Subtle cityscape silhouette effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800/20 to-transparent"/>
          </div>
          
          <div className="relative z-10 flex flex-col min-h-screen px-8 py-12 md:px-16 md:py-16">
            {/* Top badge */}
            <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-8 ebook-sans">
              Used by Fast-Growing Freight Operators
            </p>
            
            {/* Main title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight ebook-serif">
                THE <span className="text-white border-b-4 border-cyan-500">90-DAY</span>
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight ebook-serif mt-2">
                LOGISTICS SCALING
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight ebook-serif mt-2">
                PLAYBOOK
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 ebook-sans font-light leading-relaxed">
              How Logistics Companies Handle More Shipments With the Same Team by Automating Core Freight Workflows with AI
            </p>
            
            {/* Workflow diagram */}
            <div className="my-8">
              <CoverWorkflowDiagram />
            </div>
            
            {/* Key benefits */}
            <div className="space-y-4 mb-12 max-w-lg">
              {[
                'Automate freight workflows with AI',
                'Handle 2 to 3x volume without new headcount',
                'Designed for ops teams, not engineers'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300 ebook-sans">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Bottom tagline */}
            <div className="mt-auto pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm tracking-[0.2em] uppercase ebook-sans">
                Playbook &bull; Checklists &bull; Workflow Diagrams
              </p>
            </div>
          </div>
        </div>

        {/* ==================== INTRODUCTION ==================== */}
        <div id="introduction" className="ebook-page min-h-screen bg-white px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Introduction</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Why Freight Scale Breaks</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                As a freight operation grows, the very processes that once worked start to buckle under higher volumes. Teams find themselves working harder yet still falling behind—shipments get delayed, costs slip out of control, and customer service suffers. What&apos;s going wrong?
              </p>
              
              <p>
                In many cases, <strong>manual and ad-hoc workflows simply don&apos;t scale</strong>. If your staff are juggling spreadsheets, emails, and phone calls to manage each shipment, a surge in volume quickly leads to chaos. For example, booking a single load might involve five different tools and repeated data re-entry; during peak season this can spiral into major bottlenecks and errors.
              </p>

              <p>
                Another culprit is <strong>departmental silos</strong>. In a typical forwarder or 3PL, sales, operations, documentation, and accounting might use separate systems and processes. The result? Miscommunications like a sales-promised rate not reaching the ops team, or accounting chasing invoices for shipments that aren&apos;t even delivered yet.
              </p>

              <div className="bg-gray-100 border-l-4 border-cyan-500 p-6 my-8 rounded-r-lg">
                <p className="text-gray-800 italic">
                  &ldquo;Operations, sales, accounts, and documentation often work in silos. The result? Delays, miscommunication, and avoidable mistakes.&rdquo;
                </p>
              </div>

              <p>
                Importantly, <strong>throwing more people at the problem is not a sustainable solution</strong>. Recent years have shown that simply adding headcount can&apos;t solve the strain of modern logistics complexity. During the pandemic and other disruptions, logistics teams were &ldquo;being squeezed from all sides&rdquo;—new regulations, labor shortages, surging volumes—and these challenges exposed a common weak link across the industry: manual processes and heavy paperwork creating operational bottlenecks.
              </p>

              <p>
                In fact, a 2025 survey found <strong>82% of transport &amp; logistics companies</strong> said manual document processing has a heavy to extreme impact on efficiency, citing high error rates, lack of standardization, and slow processing as major hurdles.
              </p>

              <p>
                The bottom line is that freight operations often break at scale because <strong>processes are not built as a repeatable, structured system</strong>. Instead, they rely on people heroically intervening at every step—which works at 50 shipments a month, but not at 500 or 5,000.
              </p>

              <div className="my-10">
                <ScaleComparisonGraphic />
              </div>

              <p>
                That approach (and the focus of this playbook) is to <strong>re-engineer your freight operation as a structured, automated system</strong>. By structuring workflows and leveraging automation—especially AI for the repetitive, rule-based work—you can scale volume without linear growth in headcount or stress.
              </p>

              <p>
                In the following chapters, we&apos;ll break down how every part of a freight forwarding or 3PL business can be systematized and augmented with AI: from finding and quoting new business, to planning routes and loads, executing shipments and customer service, managing documentation and compliance, through billing and finances.
              </p>

              <p className="font-semibold text-gray-900">
                Each section will answer a critical question: How does this help a 3PL or forwarder handle more shipments with the same team?
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 1: STRUCTURED SYSTEM ==================== */}
        <div id="chapter1" className="ebook-page min-h-screen bg-gray-50 px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 1</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">The Freight Operation as a Structured System</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                In a scalable logistics business, <strong>process comes before AI</strong>. Think of your operation as a well-defined system of workflows—a kind of assembly line for freight. Each step should have clear inputs, standardized procedures, defined outputs, and an owner.
              </p>

              <p>
                This structure is the prerequisite for successful automation. As one best-practice guide notes, automation without clean, structured data leads to errors—always prioritize standardized inputs first. In other words, if your data is all over the place or your process varies person to person, deploying AI will just make bad processes run faster.
              </p>

              <div className="bg-cyan-50 border border-cyan-200 p-6 my-8 rounded-lg">
                <p className="text-cyan-800 font-semibold mb-2">Key Principle</p>
                <p className="text-cyan-700">
                  &ldquo;Cleaning data isn&apos;t sexy work, but it&apos;s crucial.&rdquo; Before deploying AI, ensure your data is accurate and your process is clean.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">The Six Functional Layers</h3>
              
              <p>Let&apos;s break the freight forwarding operation into functional layers that correspond to how work flows from sales to delivery:</p>

              <div className="my-10">
                <SystemLayersDiagram />
              </div>

              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Demand &amp; Revenue Intake</h4>
                    <p className="text-gray-600 text-sm">Capturing business from leads through customer bookings (sales, lead gen, quotations)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Planning &amp; Optimization</h4>
                    <p className="text-gray-600 text-sm">Planning shipments, routes, and loads, and allocating resources</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Execution &amp; Customer Interaction</h4>
                    <p className="text-gray-600 text-sm">Executing transport and interfacing with customers (track &amp; trace, issue handling, support)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Documentation &amp; Compliance</h4>
                    <p className="text-gray-600 text-sm">Handling all shipment documents, customs clearance, and regulatory compliance</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Financial Flow</h4>
                    <p className="text-gray-600 text-sm">Managing billing, payments, and accounting for shipments</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600 font-bold text-sm">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Warehousing &amp; Fulfillment</h4>
                    <p className="text-gray-600 text-sm">Storage, pick/pack, and fulfillment operations for 3PLs that offer these services</p>
                  </div>
                </div>
              </div>

              <p>
                Each of these can be seen as a sub-system of your logistics operation. In a scale-ready environment, each sub-system is well-structured internally and tightly connected to the others.
              </p>

              <p>
                For example, sales should seamlessly hand off a booked shipment to operations with all necessary data in one system (instead of an email that ops re-enters). Operations, in turn, should trigger documentation and billing automatically when key milestones are hit.
              </p>

              <div className="bg-gray-100 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>Warning Signs:</strong> If you still see things like duplicate data entry, manual status check calls, or spreadsheets as glue, those are signs of a system that won&apos;t scale.
                </p>
              </div>

              <p>
                But the payoff for doing this groundwork is huge. Once you have structured workflows, you can layer AI and automation to execute those workflows at high speed and volume. This is how you <strong>&ldquo;scale output without scaling headcount.&rdquo;</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 2: DEMAND & REVENUE ==================== */}
        <div id="chapter2" className="ebook-page min-h-screen bg-white px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 2</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Demand &amp; Revenue Intake</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                The first layer of a scalable freight operation is how you <strong>capture and convert business</strong>. This includes lead generation, sales outreach, and the quoting process that turns inquiries into booked shipments.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Lead Generation &amp; Sales</h3>

              <p>
                Traditional lead generation in logistics often relies on cold calling, trade shows, and word-of-mouth referrals. While these still work, they don&apos;t scale efficiently. Modern approaches leverage:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Intent data</strong> to identify companies actively looking for logistics services</li>
                <li><strong>Automated outreach sequences</strong> that nurture leads without manual follow-up</li>
                <li><strong>AI-powered lead scoring</strong> to prioritize high-value prospects</li>
                <li><strong>Digital marketing</strong> that attracts inbound inquiries</li>
              </ul>

              <div className="my-10">
                <WorkflowDiagram />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">The Quotation Bottleneck</h3>

              <p>
                For many freight forwarders, quoting is the biggest bottleneck in the sales process. A single quote might require:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Checking multiple carrier rate sheets</li>
                <li>Calculating accessorial charges</li>
                <li>Factoring in fuel surcharges and seasonal adjustments</li>
                <li>Reviewing customer-specific pricing agreements</li>
                <li>Manual data entry into quote templates</li>
              </ul>

              <p>
                This process can take 30 minutes to several hours per quote. When volume increases, the quoting team becomes overwhelmed, response times suffer, and you lose business to faster competitors.
              </p>

              <div className="bg-green-50 border border-green-200 p-6 my-8 rounded-lg">
                <p className="text-green-800 font-semibold mb-2">AI Solution</p>
                <p className="text-green-700">
                  AI-powered quoting tools can reduce quote generation time from hours to minutes by automatically pulling rates, calculating margins, and generating professional quote documents.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">How This Helps Scale</h3>

              <p>
                By automating lead capture and quoting, a 3PL or forwarder can:
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">3x</div>
                  <p className="text-gray-700 text-sm">More quotes generated per day with the same team</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">80%</div>
                  <p className="text-gray-700 text-sm">Reduction in quote response time</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">25%</div>
                  <p className="text-gray-700 text-sm">Improvement in quote-to-book conversion</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">Zero</div>
                  <p className="text-gray-700 text-sm">Manual data re-entry between systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 3: PLANNING & OPTIMIZATION ==================== */}
        <div id="chapter3" className="ebook-page min-h-screen bg-gray-50 px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 3</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Planning &amp; Optimization</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                Once a shipment is booked, it enters the planning phase. This is where you decide <strong>how to move freight efficiently</strong>—selecting carriers, optimizing routes, consolidating loads, and allocating resources.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">The Planning Challenge</h3>

              <p>
                Manual planning works when you have a handful of shipments. But as volume grows, the complexity explodes:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>More shipments mean more carrier options to evaluate</li>
                <li>Consolidation opportunities become harder to spot</li>
                <li>Resource constraints (drivers, equipment) become tighter</li>
                <li>Customer delivery windows create scheduling conflicts</li>
              </ul>

              <p>
                A planner who could handle 50 shipments per day might struggle with 100, even working overtime. The cognitive load of optimizing across multiple variables simply exceeds human capacity at scale.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">AI-Powered Capacity Sourcing</h3>

              <p>
                One of the most impactful applications of AI in logistics is <strong>intelligent capacity sourcing</strong>. Instead of manually calling carriers or checking load boards, AI tools can:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Automatically match shipments to available capacity</li>
                <li>Predict carrier acceptance rates based on historical data</li>
                <li>Optimize carrier selection for cost, service, and reliability</li>
                <li>Identify consolidation opportunities across shipments</li>
              </ul>

              <div className="bg-purple-50 border border-purple-200 p-6 my-8 rounded-lg">
                <p className="text-purple-800 font-semibold mb-2">Real Impact</p>
                <p className="text-purple-700">
                  Companies using AI-driven capacity sourcing report finding trucks 40% faster and reducing empty miles by identifying backhaul opportunities that humans would miss.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Route &amp; Load Optimization</h3>

              <p>
                Beyond carrier selection, AI excels at the mathematical optimization problems that define logistics efficiency:
              </p>

              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Route className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Route Optimization</h4>
                    <p className="text-gray-600 text-sm">Finding the most efficient path considering distance, traffic, delivery windows, and driver hours</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Package className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Load Building</h4>
                    <p className="text-gray-600 text-sm">Maximizing trailer utilization while respecting weight limits and delivery sequences</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Resource Allocation</h4>
                    <p className="text-gray-600 text-sm">Assigning drivers and equipment to maximize utilization and minimize idle time</p>
                  </div>
                </div>
              </div>

              <p>
                These optimizations compound. A 5% improvement in route efficiency plus a 10% improvement in load utilization can translate to significant cost savings and capacity gains.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 4: EXECUTION & CUSTOMER ==================== */}
        <div id="chapter4" className="ebook-page min-h-screen bg-white px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 4</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Execution &amp; Customer Interaction</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                Execution is where the rubber meets the road—literally. This layer covers the <strong>actual movement of freight</strong> and all the customer-facing interactions that happen along the way.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Track &amp; Trace at Scale</h3>

              <p>
                Customers expect real-time visibility into their shipments. But providing this manually is incredibly labor-intensive:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Calling carriers for status updates</li>
                <li>Logging into multiple carrier portals</li>
                <li>Manually updating your TMS</li>
                <li>Responding to customer &ldquo;where&apos;s my shipment?&rdquo; calls</li>
              </ul>

              <p>
                As shipment volume grows, customer service teams get buried in status inquiries. This reactive approach doesn&apos;t scale and leads to frustrated customers.
              </p>

              <div className="bg-green-50 border border-green-200 p-6 my-8 rounded-lg">
                <p className="text-green-800 font-semibold mb-2">The Automation Opportunity</p>
                <p className="text-green-700">
                  Automated tracking systems can pull status updates from carriers via API, update customers proactively, and only escalate exceptions to human agents. This shifts customer service from reactive to proactive.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">AI-Powered Customer Support</h3>

              <p>
                Beyond tracking, AI can handle a significant portion of customer interactions:
              </p>

              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Quote Responses</h4>
                    <p className="text-gray-600 text-sm">AI chatbots can provide instant spot quotes for common lanes</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Status Updates</h4>
                    <p className="text-gray-600 text-sm">Customers can check shipment status anytime without waiting for business hours</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Proactive Exception Alerts</h4>
                    <p className="text-gray-600 text-sm">Customers are notified of delays before they have to ask</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <FileText className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Document Retrieval</h4>
                    <p className="text-gray-600 text-sm">PODs, BOLs, and invoices available on-demand without staff involvement</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Exception Management</h3>

              <p>
                Not everything goes according to plan. Delays, damages, and delivery failures are inevitable in logistics. The key is <strong>how quickly and effectively you respond</strong>.
              </p>

              <p>
                AI-powered exception management can:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Detect potential issues before they become problems (predictive alerts)</li>
                <li>Automatically trigger contingency plans for common scenarios</li>
                <li>Route complex exceptions to the right specialist</li>
                <li>Track resolution times and identify systemic issues</li>
              </ul>

              <p>
                This means your team spends less time firefighting and more time on high-value activities like relationship building and process improvement.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 5: DOCUMENTATION ==================== */}
        <div id="chapter5" className="ebook-page min-h-screen bg-gray-50 px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 5</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Documentation &amp; Compliance</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                Documentation is often the most paper-intensive part of freight forwarding. International shipments especially require a mountain of documents: commercial invoices, packing lists, bills of lading, certificates of origin, customs declarations, and more.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">The Document Processing Burden</h3>

              <p>
                Manual document processing is slow, error-prone, and expensive. Common pain points include:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Re-keying data from customer documents into your systems</li>
                <li>Chasing missing or incorrect documents</li>
                <li>Ensuring compliance with constantly changing regulations</li>
                <li>Managing document versions and approvals</li>
                <li>Storing and retrieving documents for audits</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 p-6 my-8 rounded-lg">
                <p className="text-amber-800 font-semibold mb-2">Industry Reality</p>
                <p className="text-amber-700">
                  82% of transport &amp; logistics companies report that manual document processing has a &ldquo;heavy to extreme&rdquo; impact on their operational efficiency.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">AI in Customs Clearance</h3>

              <p>
                Customs clearance is particularly ripe for automation. AI-powered customs tools can:
              </p>

              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <FileCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Automated Classification</h4>
                    <p className="text-gray-600 text-sm">AI can suggest HS codes based on product descriptions, reducing classification errors</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <ClipboardCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Document Validation</h4>
                    <p className="text-gray-600 text-sm">Automatically check documents for completeness and consistency before submission</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Compliance Screening</h4>
                    <p className="text-gray-600 text-sm">Screen shipments against denied party lists and trade restrictions</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Globe className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Regulatory Updates</h4>
                    <p className="text-gray-600 text-sm">Stay current with changing trade regulations across different countries</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">OCR &amp; Intelligent Document Processing</h3>

              <p>
                Modern OCR (Optical Character Recognition) combined with AI can extract data from documents with high accuracy:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Extract shipper/consignee details from commercial invoices</li>
                <li>Pull line item details from packing lists</li>
                <li>Read and validate bill of lading information</li>
                <li>Cross-reference data across multiple documents</li>
              </ul>

              <p>
                This eliminates the manual data entry that consumes so much time in documentation teams, allowing them to focus on exceptions and complex cases.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 6: FINANCIAL FLOW ==================== */}
        <div id="chapter6" className="ebook-page min-h-screen bg-white px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 6</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Financial Flow</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                The financial layer of freight operations encompasses <strong>billing, invoicing, payments, and accounting</strong>. This is where many companies leak money through errors, delays, and inefficiencies.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">The Billing Challenge</h3>

              <p>
                Freight billing is notoriously complex. A single shipment might involve:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Base transportation charges</li>
                <li>Fuel surcharges (often fluctuating weekly)</li>
                <li>Accessorial charges (detention, liftgate, residential delivery, etc.)</li>
                <li>Customs duties and fees</li>
                <li>Insurance charges</li>
                <li>Customer-specific pricing agreements</li>
              </ul>

              <p>
                When billing is manual, errors are common. Undercharging means lost revenue; overcharging damages customer relationships. Either way, disputes consume time and resources.
              </p>

              <div className="my-10">
                <ROIGraphic />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Automated Invoice Processing</h3>

              <p>
                On the payables side, freight companies receive invoices from carriers, warehouses, and other vendors. Processing these manually is tedious and error-prone.
              </p>

              <p>
                AI-powered invoice processing can:
              </p>

              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <DollarSign className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Extract Invoice Data</h4>
                    <p className="text-gray-600 text-sm">Automatically read and categorize charges from carrier invoices</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Match to Shipments</h4>
                    <p className="text-gray-600 text-sm">Automatically match invoices to the corresponding shipments in your TMS</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Flag Discrepancies</h4>
                    <p className="text-gray-600 text-sm">Identify billing errors and overcharges before payment</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <TrendingUp className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Audit Continuously</h4>
                    <p className="text-gray-600 text-sm">Ongoing freight audit catches errors that manual spot-checks miss</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Cash Flow Impact</h3>

              <p>
                Faster, more accurate billing directly impacts cash flow:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Faster invoicing</strong> means faster payment (reducing DSO)</li>
                <li><strong>Fewer disputes</strong> means less time chasing payments</li>
                <li><strong>Accurate carrier payments</strong> maintains good relationships and avoids overpayment</li>
                <li><strong>Better visibility</strong> into profitability by lane, customer, and service type</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== CHAPTER 7: WAREHOUSING ==================== */}
        <div id="chapter7" className="ebook-page min-h-screen bg-gray-50 px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Chapter 7</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">Warehousing &amp; Fulfillment</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                For 3PLs that offer warehousing and fulfillment services, this layer represents a significant opportunity for automation and efficiency gains.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Warehouse Operations at Scale</h3>

              <p>
                Traditional warehouse operations rely heavily on manual labor for:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Receiving and put-away</li>
                <li>Inventory management and cycle counts</li>
                <li>Order picking and packing</li>
                <li>Shipping and manifesting</li>
              </ul>

              <p>
                As order volumes grow (especially with e-commerce), these manual processes become bottlenecks. Peak seasons can overwhelm warehouse capacity.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">AI &amp; Robotics in the Warehouse</h3>

              <p>
                Modern warehouses are increasingly leveraging technology to scale operations:
              </p>

              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Warehouse className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Warehouse Management Systems (WMS)</h4>
                    <p className="text-gray-600 text-sm">Optimize slotting, picking paths, and inventory placement</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Cog className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Autonomous Mobile Robots (AMRs)</h4>
                    <p className="text-gray-600 text-sm">Robots that assist with picking, transport goods, and reduce walking time</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <BarChart3 className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Demand Forecasting</h4>
                    <p className="text-gray-600 text-sm">AI predicts order volumes to optimize staffing and inventory positioning</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-white rounded-lg border border-gray-200">
                  <Layers className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Automated Sortation</h4>
                    <p className="text-gray-600 text-sm">Conveyor systems and sorters that route packages to the right destination</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 ebook-serif">Integration is Key</h3>

              <p>
                The biggest gains come from integrating warehouse operations with the rest of the supply chain:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Orders flow automatically from e-commerce platforms to WMS</li>
                <li>Inventory levels sync in real-time with sales channels</li>
                <li>Shipping labels and carrier selection happen automatically</li>
                <li>Tracking information flows back to customers without manual intervention</li>
              </ul>

              <p>
                This end-to-end automation is what allows 3PLs to handle massive order volumes during peak seasons without proportionally scaling their workforce.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== 90-DAY IMPLEMENTATION ==================== */}
        <div id="implementation" className="ebook-page min-h-screen bg-white px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-600 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Implementation Guide</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 ebook-serif">90-Day Implementation Planner</h2>
            
            <div className="prose prose-lg max-w-none ebook-sans text-gray-700 leading-relaxed space-y-6">
              <p>
                To organize an automation project, here&apos;s a simple template structure you can adapt. 90 days is a good target for a contained improvement.
              </p>

              <div className="my-10">
                <TimelineDiagram />
              </div>

              <div className="space-y-6 my-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 mb-2">Week 1-2: Discovery</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Identify target workflow &amp; baseline metrics</li>
                    <li>• Get team buy-in</li>
                    <li>• Evaluate tools/vendors</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-purple-900 mb-2">Week 3-4: Solution Design</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Choose solution</li>
                    <li>• Document future process</li>
                    <li>• Prep data (clean or integrate as needed)</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-amber-900 mb-2">Week 5-6: Pilot</h4>
                  <ul className="text-amber-800 text-sm space-y-1">
                    <li>• Implement pilot (small scale)</li>
                    <li>• Train pilot users</li>
                    <li>• Test and gather feedback</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-green-900 mb-2">Week 7-8: Refinement</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Refine configuration</li>
                    <li>• Expand pilot</li>
                    <li>• Measure interim results; troubleshoot issues</li>
                  </ul>
                </div>

                <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-cyan-900 mb-2">Week 9-10: Rollout</h4>
                  <ul className="text-cyan-800 text-sm space-y-1">
                    <li>• Roll out to all users/environments</li>
                    <li>• Monitor closely</li>
                    <li>• Address any scalability issues</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-emerald-900 mb-2">Week 11-12: Optimization</h4>
                  <ul className="text-emerald-800 text-sm space-y-1">
                    <li>• Full operation on new process</li>
                    <li>• Collect final metrics; compare to baseline</li>
                    <li>• Report ROI; celebrate success</li>
                    <li>• Decide next process to tackle</li>
                  </ul>
                </div>
              </div>

              <div className="my-10">
                <AutomationReadinessChecklist />
              </div>

              <p>
                <strong>Remember:</strong> Scaling is a journey, not a one-time fix. These tools are meant to be reused and updated. After completing one 90-day cycle, use the readiness checklist again for the next workflow, update your KPIs, and repeat.
              </p>

              <p>
                Over time, this becomes a playbook the whole organization recognizes: <strong>identify bottleneck → structure it → automate it → measure → repeat</strong>. That operational rhythm is what enables continuous scaling.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CALL TO ACTION ==================== */}
        <div id="cta" className="ebook-page min-h-screen bg-gradient-to-b from-gray-900 to-black px-8 py-16 md:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4 ebook-sans font-semibold">Next Steps</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 ebook-serif">Soft Call to Action</h2>
            
            <div className="prose prose-lg prose-invert max-w-none ebook-sans text-gray-300 leading-relaxed space-y-6">
              <p>
                Scaling your freight operation in 90 days is an ambitious goal, but as this playbook shows, it&apos;s achievable with the right approach. The strategies and examples we&apos;ve covered are drawn from real logistics teams that have broken through growth plateaus.
              </p>

              <p>
                The next step is to apply these principles to your own operation—and you don&apos;t have to do it alone.
              </p>

              <div className="bg-cyan-900/30 border border-cyan-700 p-8 my-10 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4 ebook-serif">Free Workflow Automation Assessment</h3>
                <p className="text-gray-300 mb-6">
                  If you&apos;re serious about handling more shipments with the same team, consider taking advantage of a free Workflow Automation Assessment. This is a low-pressure, advisory session where we help you:
                </p>
                
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">Evaluate your current workflows</strong> against the best practices in this playbook</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">Identify quick-win opportunities</strong> specific to your operation</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">Assess your automation readiness</strong> using checklists like the ones provided</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">Project the potential ROI</strong> of scaling enhancements</span>
                  </li>
                </ul>
              </div>

              <p>
                Our team of logistics process experts has helped numerous 3PLs and forwarders implement custom AI solutions and streamlined workflows. We bring an <strong>operator-first, non-hype approach</strong>—our goal is to find practical changes that make your day-to-day easier and your operation more scalable.
              </p>

              <p>
                What to expect from the assessment: We&apos;ll hop on a call and walk through one of your core processes together. Think of it like a diagnostic review. You&apos;ll come away with at least a couple of actionable recommendations—whether you choose to work with us further or not.
              </p>

              <div className="text-center mt-12">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Schedule Your Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="border-t border-gray-800 mt-16 pt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Your 90-day scaling journey can start today—with a conversation, a checklist, and a plan.
                </p>
                <p className="text-gray-400 mt-4 text-sm">
                  <strong>Remember:</strong> The goal is continuous improvement. Implementing the ideas in this eBook will set you on the path to scale, but don&apos;t stop there. Keep iterating, keep using data, and your logistics operation will become an ever-stronger engine driving your business forward.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
