'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  X, 
  Zap, 
  TrendingUp, 
  Clock, 
  Shield, 
  BarChart3,
  Download,
  Mail,
  Package,
  Settings,
  Check,
  Truck,
  FileText,
  ArrowRight
} from 'lucide-react'

// =============================================================================
// EBOOK CONFIG
// =============================================================================
const EBOOK_CONFIG = {
  title: "The 90-Day Logistics Scaling Playbook",
  subtitle: "How Logistics Companies Handle More Shipments With the Same Team by Automating Core Freight Workflows with AI",
  coverImage: "/playbook-cover.png",
  ctaText: "Get Your Free Playbook",
  
  stats: [
    { value: "82%", label: "of logistics companies say manual processes hurt efficiency" },
    { value: "2-3x", label: "volume increase possible with same team" },
    { value: "90", label: "days to transform your operation" },
  ],
  
  benefits: [
    {
      icon: TrendingUp,
      title: "Scale Without Adding Headcount",
      description: "Handle 2-3x more shipments with your existing team"
    },
    {
      icon: Zap, 
      title: "Eliminate Manual Bottlenecks",
      description: "Automate quoting, documentation, and billing"
    },
    {
      icon: Clock,
      title: "90-Day Implementation Plan",
      description: "Week-by-week roadmap to transform your operation"
    },
    {
      icon: Shield,
      title: "Reduce Errors & Rework",
      description: "AI-powered validation and compliance checks"
    },
    {
      icon: BarChart3,
      title: "Measure Real ROI",
      description: "Track metrics and prove automation value"
    },
    {
      icon: Settings,
      title: "Designed for Ops Teams",
      description: "Practical guidance, not technical jargon"
    }
  ],
  
  chapters: [
    { number: 1, title: "Why Freight Scale Breaks", icon: Truck },
    { number: 2, title: "The Freight Operation as a System", icon: Settings },
    { number: 3, title: "Demand & Revenue Intake", icon: TrendingUp },
    { number: 4, title: "Planning & Optimization", icon: BarChart3 },
    { number: 5, title: "Execution & Customer Interaction", icon: Zap },
    { number: 6, title: "Documentation & Compliance", icon: FileText },
    { number: 7, title: "Financial Flow", icon: Package },
    { number: 8, title: "90-Day Implementation Planner", icon: Clock },
  ],
  
  includes: [
    "Automation Readiness Checklist",
    "90-Day Implementation Timeline",
    "ROI Calculator Framework",
    "Workflow Diagrams & Templates",
  ],
  
  faqs: [
    {
      question: "Is this playbook really free?",
      answer: "Yes, completely free. We believe in providing value upfront to help the logistics industry embrace automation."
    },
    {
      question: "Who is this playbook for?",
      answer: "Operations leaders, logistics managers, and executives at 3PLs and freight forwarders who want to scale without proportionally growing their team."
    },
    {
      question: "Do I need technical skills?",
      answer: "No. The playbook is written for operations professionals, not engineers. We focus on process improvement and tool selection."
    },
    {
      question: "How will I receive the playbook?",
      answer: "After submitting the form, you'll receive the playbook as a PDF directly to your email inbox within minutes."
    }
  ],
  
  form: {
    roleOptions: [
      "C-Level Executive",
      "VP / Director of Operations",
      "Operations Manager",
      "Logistics Manager",
      "Supply Chain Lead",
      "IT / Technology Lead",
      "Consultant",
      "Other"
    ],
    companySizeOptions: [
      "1-10 employees",
      "11-50 employees",
      "51-200 employees",
      "201-500 employees",
      "500+ employees"
    ]
  }
}

// =============================================================================
// ANIMATED BACKGROUND
// =============================================================================
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div 
        className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-pulse"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      />
      <div 
        className="absolute -bottom-40 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// WORKFLOW DIAGRAM SVG
// =============================================================================
function WorkflowDiagram() {
  return (
    <svg viewBox="0 0 400 80" className="w-full max-w-md h-auto opacity-60" fill="none">
      {/* Animated path */}
      <path 
        d="M20 40 H80 M100 40 H160 M180 40 H240 M260 40 H320 M340 40 H380" 
        stroke="url(#gradient)" 
        strokeWidth="2" 
        strokeDasharray="8,4"
        className="animate-dash"
      />
      
      {/* Icons */}
      <g className="animate-pulse" style={{ animationDelay: '0s' }}>
        <circle cx="40" cy="40" r="18" fill="#0a0a0a" stroke="#22D3EE" strokeWidth="1.5"/>
        <path d="M32 44 L40 36 L48 44 M40 36 V48" stroke="#22D3EE" strokeWidth="1.5" fill="none"/>
      </g>
      
      <g className="animate-pulse" style={{ animationDelay: '0.5s' }}>
        <circle cx="140" cy="40" r="18" fill="#0a0a0a" stroke="#22D3EE" strokeWidth="1.5"/>
        <rect x="132" y="32" width="16" height="16" rx="2" stroke="#22D3EE" strokeWidth="1.5" fill="none"/>
      </g>
      
      <g className="animate-pulse" style={{ animationDelay: '1s' }}>
        <circle cx="240" cy="40" r="18" fill="#0a0a0a" stroke="#22D3EE" strokeWidth="1.5"/>
        <path d="M232 40 L240 32 L248 40 L240 48 Z" stroke="#22D3EE" strokeWidth="1.5" fill="none"/>
      </g>
      
      <g className="animate-pulse" style={{ animationDelay: '1.5s' }}>
        <circle cx="340" cy="40" r="18" fill="#0a0a0a" stroke="#22D3EE" strokeWidth="1.5"/>
        <path d="M332 40 L338 46 L350 34" stroke="#22D3EE" strokeWidth="2" fill="none"/>
      </g>
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3"/>
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="1"/>
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// =============================================================================
// FORM MODAL
// =============================================================================
interface FormData {
  fullName: string
  email: string
  company: string
  role: string
  companySize: string
  phone: string
  consent: boolean
  honeypot: string
}

function FormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    role: '',
    companySize: '',
    phone: '',
    consent: false,
    honeypot: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus()
      document.body.style.overflow = 'hidden'
      }
      return () => {
        document.body.style.overflow = ''
      }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.role) newErrors.role = 'Please select your role'
    if (!formData.companySize) newErrors.companySize = 'Please select company size'
    if (!formData.consent) newErrors.consent = 'You must agree to receive the playbook'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.honeypot) {
      setIsSuccess(true)
      return
    }
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/ebook-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          companySize: formData.companySize,
          phone: formData.phone || null,
        }),
      })

      setIsSubmitting(false)
      setIsSuccess(true)
      
      if (!response.ok) {
        console.error('Ebook form submission response:', response.status)
      }
    } catch (err) {
      console.error('Ebook form submission error:', err)
    setIsSubmitting(false)
    setIsSuccess(true)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            
        <div className="p-6">
              {isSuccess ? (
            <div className="text-center py-8 animate-fadeIn">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center animate-bounce-slow">
                <Mail className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Check Your Email!</h3>
              <p className="text-gray-400 mb-2">
                We&apos;ve sent the playbook PDF to:
              </p>
              <p className="text-cyan-400 font-medium mb-6">{formData.email}</p>
              <p className="text-gray-500 text-sm mb-6">
                It should arrive within the next few minutes.<br/>
                Don&apos;t forget to check your spam folder!
                  </p>
                  <button
                    onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-cyan-400 transition-all"
                  >
                Got It!
                  </button>
                  </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Get Your Free Playbook
                    </h2>
                <p className="text-gray-400 text-sm">
                  Enter your details and we&apos;ll send the PDF to your inbox.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => handleInputChange('honeypot', e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 pointer-events-none h-0 w-0"
                />
                
                <div className="animate-slideIn" style={{ animationDelay: '0ms' }}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all`}
                        placeholder="John Smith"
                      />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                    </div>
                    
                <div className="animate-slideIn" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all`}
                        placeholder="john@company.com"
                      />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>
                    
                <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Company *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.company ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all`}
                        placeholder="Acme Logistics"
                      />
                  {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
                    </div>
                    
                <div className="grid grid-cols-2 gap-3 animate-slideIn" style={{ animationDelay: '150ms' }}>
                      <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Role *
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                      className={`w-full px-3 py-3 bg-white/5 border ${errors.role ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:border-cyan-500 text-sm transition-all`}
                        >
                      <option value="" className="bg-gray-900">Select</option>
                          {EBOOK_CONFIG.form.roleOptions.map(role => (
                        <option key={role} value={role} className="bg-gray-900">{role}</option>
                          ))}
                        </select>
                    {errors.role && <p className="mt-1 text-sm text-red-400">{errors.role}</p>}
                      </div>
                      
                      <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company Size *
                        </label>
                        <select
                          value={formData.companySize}
                          onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className={`w-full px-3 py-3 bg-white/5 border ${errors.companySize ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:border-cyan-500 text-sm transition-all`}
                        >
                      <option value="" className="bg-gray-900">Select</option>
                          {EBOOK_CONFIG.form.companySizeOptions.map(size => (
                        <option key={size} value={size} className="bg-gray-900">{size}</option>
                          ))}
                        </select>
                    {errors.companySize && <p className="mt-1 text-sm text-red-400">{errors.companySize}</p>}
                      </div>
                    </div>
                    
                <div className="animate-slideIn" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                        Phone <span className="text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    
                <div className="flex items-start gap-3 animate-slideIn" style={{ animationDelay: '250ms' }}>
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => handleInputChange('consent', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50"
                      />
                  <label htmlFor="consent" className="text-sm text-gray-400">
                    I agree to receive the playbook and occasional updates. *
                      </label>
                    </div>
                {errors.consent && <p className="text-sm text-red-400">{errors.consent}</p>}
                    
                <button
                      type="submit"
                      disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 animate-slideIn"
                  style={{ animationDelay: '300ms' }}
                    >
                      {isSubmitting ? (
                        <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                      Send Me The Playbook
                        </>
                      )}
                </button>
                  </form>
                </>
              )}
            </div>
        </div>
      </div>
  )
}

// =============================================================================
// FAQ ITEM
// =============================================================================
function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void 
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="text-white font-medium pr-4 text-sm sm:text-base group-hover:text-cyan-400 transition-colors">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pb-4 text-gray-400 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function EbookPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1143785747172079');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1143785747172079&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-dash { animation: dash 2s linear infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>

      <AnimatedBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 py-3 px-4 sm:py-4 sm:px-6 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
                src="/logo-white.svg" 
                alt="STRUCTURE" 
              width={32}
              height={32}
              className="w-8 h-8 transition-transform group-hover:scale-110"
              />
            <span className="text-base font-bold tracking-tight hidden sm:block">STRUCTURE</span>
          </Link>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
          >
            Get Playbook
          </button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-16 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Text Content - Always above on mobile */}
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
              Free Playbook for Freight Operators
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              <span className="text-white">The </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">90-Day</span>
              <span className="text-white"> Logistics</span>
              <br className="hidden sm:block" />
              <span className="text-white"> Scaling Playbook</span>
              </h1>
              
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                {EBOOK_CONFIG.subtitle}
              </p>
              
            {/* Workflow Diagram */}
            <div className="mb-8">
              <WorkflowDiagram />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                  onClick={() => setIsModalOpen(true)}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  {EBOOK_CONFIG.ctaText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Instant PDF delivery to your inbox</span>
            </div>
          </div>
          
          {/* Book Cover */}
          <div className={`flex justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/60 blur-2xl rounded-full" />
                
                {/* Book Image */}
                <div className="relative rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                  <Image
                    src="/playbook-cover.png"
                    alt="The 90-Day Logistics Scaling Playbook"
                    width={400}
                    height={520}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
                </div>
              </div>
              
              {/* Trust indicators */}
          <div className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400/50" />
                  <span>Instant delivery</span>
                </div>
                <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400/50" />
                  <span>100% free</span>
                </div>
                <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400/50" />
              <span>Built for freight teams</span>
                </div>
              </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {EBOOK_CONFIG.stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              What You&apos;ll Learn
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Practical strategies to transform your freight operation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {EBOOK_CONFIG.benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="group p-5 sm:p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-cyan-500/30 hover:from-cyan-500/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* What's Inside Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              What&apos;s Inside
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Everything you need to scale your freight operation
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            {EBOOK_CONFIG.chapters.map((chapter) => {
              const Icon = chapter.icon
              return (
                <div
                key={chapter.number}
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400/60 text-xs font-medium">Chapter {chapter.number}</span>
                    </div>
                    <h3 className="text-white text-sm sm:text-base font-medium group-hover:text-cyan-400 transition-colors">
                    {chapter.title}
                  </h3>
                </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              )
            })}
          </div>
          
          {/* What's included */}
          <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-cyan-400" />
              Also Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EBOOK_CONFIG.includes.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300 group">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-sm group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Problem/Solution Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Why Freight Operations Break at Scale
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-red-500/5 to-red-500/0 border border-red-500/20 hover:border-red-500/40 transition-colors">
              <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                <X className="w-5 h-5" />
                The Reality Today
              </h3>
              <ul className="space-y-3">
                {[
                  "Staff juggling spreadsheets and emails",
                  "Multiple tools to book a single load",
                  "Departmental silos causing errors",
                  "Team burnout during peak seasons"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-green-500/0 border border-green-500/20 hover:border-green-500/40 transition-colors">
              <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                After the Playbook
              </h3>
              <ul className="space-y-3">
                {[
                  "Structured workflows with clear handoffs",
                  "AI handles repetitive work",
                  "Single source of truth",
                  "Team focused on growth"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="border-t border-white/10">
            {EBOOK_CONFIG.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Scale Your Freight Operation?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8">
            Get the playbook that helps logistics companies handle 2-3x more volume without adding headcount.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="group px-10 py-5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 mx-auto shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            {EBOOK_CONFIG.ctaText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <p className="mt-6 text-gray-500 text-sm">
            No spam. No credit card. PDF sent directly to your inbox.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
            <Image 
              src="/logo-white.svg" 
              alt="STRUCTURE" 
              width={24}
              height={24}
              className="w-6 h-6 opacity-50"
            />
            <span className="text-sm">© 2025 Structure AI</span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
      
      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
