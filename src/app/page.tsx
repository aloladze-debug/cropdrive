'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation, getCurrentLanguage } from '@/i18n';
import { useAuth } from '@/lib/auth';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';
import OnboardingModal from '@/components/OnboardingModal';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ms'>('en');
  const { language, t } = useTranslation(currentLanguage);
  const [activeSection, setActiveSection] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const lang = getCurrentLanguage();
    setCurrentLanguage(lang);
    
    // Show onboarding modal on first visit (if not logged in)
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && !user) {
      setShowOnboarding(true);
    }
  }, [user]);

  // Listen for language changes
  useEffect(() => {
    const handleStorageChange = () => {
      const lang = getCurrentLanguage();
      setCurrentLanguage(lang);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
    router.push('/register');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen with Image Carousel Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Carousel with Overlay */}
        <div className="absolute inset-0">
          {/* Carousel Container */}
          <div className="absolute inset-0">
            {[
              'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070',
              'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070',
              'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070',
              'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070',
              'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2070'
            ].map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: index === 0 ? 1 : 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [1.1, 1, 1, 1.1],
                }}
                transition={{
                  duration: 15,
                  delay: index * 5,
                  repeat: Infinity,
                  repeatDelay: 12,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={image}
                  alt={`Palm Oil Plantation ${index + 1}`}
              className="w-full h-full object-cover"
            />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/75 to-green-900/85"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Side Navigation */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col items-center space-y-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setActiveSection(num)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSection === num ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute left-8 bottom-12 z-20 hidden lg:block">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-white text-xs uppercase tracking-widest transform -rotate-90 origin-center mb-12">
              {language === 'ms' ? 'Sosial' : 'Social'}
            </p>
            <div className="h-16 w-px bg-white/30"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Dynamic Label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-block text-yellow-400 text-sm font-bold tracking-widest uppercase px-6 py-2 border-2 border-yellow-400/50 rounded-full backdrop-blur-md bg-white/10 shadow-lg">
                {language === 'ms' ? 'Pertanian Pintar AI' : 'AI-Powered Agriculture'}
              </span>
            </motion.div>

            {/* Main Quote with Enhanced Typewriter Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight min-h-[320px] md:min-h-[280px] font-['Inter',_sans-serif] drop-shadow-2xl tracking-tight"
              style={{ textShadow: '0 8px 32px rgba(0,0,0,0.6)', letterSpacing: '-0.03em' }}
            >
              <TypeAnimation
                sequence={language === 'en' ? [
                  'Revolutionize',
                  800,
                  'Revolutionize Your',
                  600,
                  'Revolutionize Your Palm Oil',
                  500,
                  'Revolutionize Your Palm Oil Operations',
                  3000,
                  'Transform',
                  800,
                  'Transform Plantation',
                  600,
                  'Transform Plantation Management',
                  500,
                  'Transform Plantation Management with AI',
                  3000,
                  'Data-Driven',
                  800,
                  'Data-Driven Precision',
                  600,
                  'Data-Driven Precision Agriculture',
                  500,
                  'Data-Driven Precision Agriculture for Malaysia',
                  3000,
                  'MPOB Certified',
                  800,
                  'MPOB Certified AI',
                  600,
                  'MPOB Certified AI Analysis',
                  500,
                  'MPOB Certified AI Analysis in 30 Seconds',
                  3000,
                  'Maximize Yield',
                  800,
                  'Maximize Yield Maximize Profits',
                  600,
                  'Maximize Yield Maximize Profits Sustainably',
                  3000,
                  'Join 10,000+',
                  800,
                  'Join 10,000+ Smart Farmers',
                  600,
                  'Join 10,000+ Smart Farmers Nationwide',
                  3000,
                ] : [
                  'Revolusi',
                  800,
                  'Revolusi Kelapa Sawit',
                  600,
                  'Revolusi Kelapa Sawit Anda',
                  3000,
                  'Transformasi',
                  800,
                  'Transformasi Pengurusan',
                  600,
                  'Transformasi Pengurusan Ladang dengan AI',
                  3000,
                  'Pertanian Presisi',
                  800,
                  'Pertanian Presisi Berdata',
                  600,
                  'Pertanian Presisi Berdata untuk Malaysia',
                  3000,
                  'Analisis AI',
                  800,
                  'Analisis AI Bertauliah MPOB',
                  600,
                  'Analisis AI Bertauliah MPOB dalam 30 Saat',
                  3000,
                  'Maksimum Hasil',
                  800,
                  'Maksimum Hasil Maksimum Untung',
                  600,
                  'Maksimum Hasil Maksimum Untung Lestari',
                  3000,
                  'Sertai 10,000+',
                  800,
                  'Sertai 10,000+ Petani Pintar',
                  600,
                  'Sertai 10,000+ Petani Pintar Seluruh Negara',
                  3000,
                ]}
                wrapper="span"
                speed={80}
                deletionSpeed={60}
                repeat={Infinity}
                cursor={true}
                className="inline-block bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent font-black"
                style={{ 
                  whiteSpace: 'pre-line', 
                  display: 'inline',
                  textShadow: '0 0 60px rgba(250, 204, 21, 0.5), 0 0 100px rgba(250, 204, 21, 0.3)',
                  fontWeight: '900',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                }}
              />
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/features">
                <button className="group relative inline-flex items-center justify-center px-10 py-5 text-green-900 text-lg font-black tracking-wider uppercase bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 rounded-full shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105">
                  <span className="relative z-10">
                    {language === 'ms' ? 'Terokai Sekarang' : 'Explore Now'}
                  </span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              <Link href="/how-it-works">
                <button className="group relative inline-flex items-center justify-center px-10 py-5 text-white text-lg font-bold tracking-wider uppercase border-2 border-white/80 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 rounded-full backdrop-blur-sm">
                  <span className="relative z-10">
                    {language === 'ms' ? 'Lihat Bagaimana' : 'See How It Works'}
                  </span>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Pattern - Right Side */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden xl:block">
          <svg width="200" height="600" viewBox="0 0 200 600" fill="none" className="opacity-20">
            <path d="M100 50L100 550M50 100L150 100M50 200L150 200M50 300L150 300M50 400L150 400M50 500L150 500" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-yellow-400" />
            <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <circle cx="100" cy="200" r="20" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <circle cx="100" cy="300" r="20" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <circle cx="100" cy="400" r="20" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
            <circle cx="100" cy="500" r="20" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
          </svg>
        </div>

        {/* Animated Mouse Scroll Indicator - Centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-16 left-0 right-0 z-20 flex justify-center"
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-white text-xs uppercase tracking-[0.2em] font-bold text-center">
              {language === 'ms' ? 'Tatal ke Bawah' : 'Scroll Down'}
            </p>
            
            {/* Animated Mouse */}
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex items-center justify-center"
            >
              <div className="w-7 h-11 border-[2.5px] border-white/70 rounded-full p-1 backdrop-blur-sm bg-white/10 flex items-start justify-center">
                <motion.div
                  animate={{ 
                    y: [0, 12, 0],
                    opacity: [1, 0, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-2 bg-yellow-400 rounded-full mt-1"
                />
              </div>
            </motion.div>

            {/* Animated Arrow */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center"
            >
              <svg 
                className="w-6 h-6 text-yellow-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright Footer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
          <p className="text-white/60 text-xs text-center">
            © 2025 CROPDRIVE OP ADVISOR™. {language === 'ms' ? 'TANDA DAGANGAN DAN JENAMA ADALAH HAK MILIK PEMILIKNYA' : 'TRADEMARKS AND BRANDS ARE THE PROPERTY OF THEIR RESPECTIVE OWNERS'}
          </p>
        </div>
      </section>

      {/* Image Carousel Section - 5 Images */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Inter',_sans-serif] tracking-tight">
              {language === 'ms' ? 'Mengapa Memilih CropDrive?' : 'Why Choose CropDrive?'}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'ms' 
                ? 'Teknologi AI terkini untuk pertanian kelapa sawit yang lebih pintar'
                : 'Cutting-edge AI technology for smarter palm oil farming'
              }
            </p>
          </motion.div>

          {/* 5-Image Carousel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
                title: language === 'ms' ? 'Analisis 30 Saat' : '30-Second Analysis',
                desc: language === 'ms' ? 'AI menganalisis laporan makmal anda dalam masa nyata' : 'AI analyzes your lab reports in real-time'
              },
              {
                image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
                title: language === 'ms' ? 'Standard MPOB' : 'MPOB Standards',
                desc: language === 'ms' ? 'Semua cadangan berdasarkan panduan MPOB' : 'All recommendations based on MPOB guidelines'
              },
              {
                image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
                title: language === 'ms' ? 'ROI 150-300%' : '150-300% ROI',
                desc: language === 'ms' ? 'Pulangan pelaburan terbukti dalam 3-5 tahun' : 'Proven return on investment in 3-5 years'
              },
              {
                image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
                title: language === 'ms' ? 'Multi-Ladang' : 'Multi-Farm',
                desc: language === 'ms' ? 'Urus berbilang ladang dari satu papan pemuka' : 'Manage multiple farms from one dashboard'
              },
              {
                image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800',
                title: language === 'ms' ? 'Laporan PDF' : 'PDF Reports',
                desc: language === 'ms' ? 'Eksport laporan profesional untuk mesyuarat' : 'Export professional reports for meetings'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -15, rotateY: 5 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-400/60 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="overflow-hidden">
                    <motion.img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-800/60 to-transparent"></div>
                  <motion.div 
                    className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-green-900 font-black text-xl">{index + 1}</span>
                  </motion.div>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-green-50/30">
                  <h3 className="text-xl font-black text-gray-900 mb-2 font-['Inter',_sans-serif] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '10-30%', label: language === 'ms' ? 'Peningkatan Hasil' : 'Yield Increase' },
              { number: '80%', label: language === 'ms' ? 'Penjimatan Masa' : 'Time Savings' },
              { number: '20-30%', label: language === 'ms' ? 'Kurang Pembaziran' : 'Less Waste' },
              { number: 'RM 5-10K', label: language === 'ms' ? 'Jimat/Tahun' : 'Savings/Year' },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300">
                <p className="text-4xl font-black text-yellow-400 mb-2">{stat.number}</p>
                <p className="text-white/90 text-sm font-semibold uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CropDrive Introduction Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AGS AI ASSISTANT
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-green-700 mb-4">
              {language === 'ms' 
                ? 'Smart Farming Intelligence untuk Ladang Kelapa Sawit'
                : 'Smart Farming Intelligence for Palm Oil Plantations'
              }
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6 leading-relaxed">
              {language === 'ms'
                ? 'Pakar pertanian peribadi anda yang menganalisis laporan ujian tanah dan daun menggunakan kecerdasan buatan. Ia membaca keputusan makmal anda, membandingkannya dengan piawaian MPOB, dan memberikan cadangan terperinci untuk meningkatkan kesihatan dan produktiviti ladang anda.'
                : 'Your personal farming expert that analyzes soil and leaf test reports using artificial intelligence. It reads your lab results, compares them to MPOB standards, and provides detailed recommendations to improve your plantation\'s health and productivity.'
              }
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-lg text-green-600 font-semibold bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
              <span className="text-gray-700">{language === 'ms' ? 'Proses Mudah:' : 'Simple Process:'}</span>
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">1</span>
                <span>{language === 'ms' ? 'Muat Naik Laporan' : 'Upload Report'}</span>
              </div>
              <span className="text-yellow-500">→</span>
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">2</span>
                <span>{language === 'ms' ? 'AI Menganalisis' : 'AI Analyzes'}</span>
              </div>
              <span className="text-yellow-500">→</span>
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">3</span>
                <span>{language === 'ms' ? 'Terima Cadangan' : 'Get Recommendations'}</span>
              </div>
            </div>
          </motion.div>

          {/* Who Is It For */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'ms' ? 'Untuk Siapa?' : 'Who Is It For?'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: '👨‍🌾', label: language === 'ms' ? 'Pengurus Ladang' : 'Farm Managers' },
                { icon: '👷', label: language === 'ms' ? 'Penyelia Estet' : 'Estate Supervisors' },
                { icon: '🔬', label: language === 'ms' ? 'Agronomis' : 'Agronomists' },
                { icon: '💼', label: language === 'ms' ? 'Pemilik Ladang' : 'Plantation Owners' },
                { icon: '🚚', label: language === 'ms' ? 'Pembekal Baja' : 'Fertilizer Suppliers' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              The <span className="text-red-600">Challenge</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 text-center">
              Soil and leaf test results are difficult to interpret without expert support. This often leads to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '💸', text: 'Wasted fertilizer' },
                { icon: '📈', text: 'Higher costs' },
                { icon: '🌾', text: 'Missed yield potential' },
                { icon: '🏜️', text: 'Long-term soil degradation' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 bg-red-50 p-6 rounded-xl border-l-4 border-red-500"
                >
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-lg font-semibold text-gray-900">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              How We <span className="text-green-700">Help</span>
            </h2>
            <p className="text-2xl font-semibold text-green-700 mb-8 text-center">
              CropDrive™ AI Agronomist:
            </p>
            <div className="space-y-6">
              {[
                { icon: '🔍', text: 'Interprets test data' },
                { icon: '🎯', text: 'Provides field-specific recommendations' },
                { icon: '🌱', text: 'Designs soil health improvement strategies' },
                { icon: '💰', text: 'Links every step to clear economic and return-on-investment values' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500"
                >
                  <span className="text-4xl flex-shrink-0">{item.icon}</span>
                  <span className="text-lg font-medium text-gray-900 pt-2">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              {language === 'ms' ? 'Manfaat Utama & Nilai' : 'Key Benefits & Value'}
            </h2>
            
            {/* Time & Cost Savings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Time Savings */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">⏱️</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ms' ? 'Penjimatan Masa' : 'Time Savings'}
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="font-semibold">{language === 'ms' ? '30 saat analisis vs berjam-jam kerja manual' : '30 seconds analysis vs hours of manual work'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Cadangan segera vs menunggu perunding' : 'Instant recommendations vs waiting for consultants'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Penjanaan laporan automatik' : 'Automated report generation'}</span>
                  </li>
                </ul>
              </motion.div>

              {/* Cost Savings */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500"
              >
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">💰</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ms' ? 'Penjimatan Kos' : 'Cost Savings'}
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="font-semibold">{language === 'ms' ? 'Kurangkan yuran perunding (RM 5K-10K/tahun)' : 'Reduce consultant fees (RM 5K-10K/year)'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Optimumkan perbelanjaan baja (20-30% kurang pembaziran)' : 'Optimize fertilizer spending (20-30% reduction in waste)'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Cegah kerugian hasil (10-20% perlindungan)' : 'Prevent yield losses (10-20% protection)'}</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Revenue & ROI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-white p-10 rounded-2xl shadow-xl border-4 border-yellow-400 mb-12"
            >
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">📈</span>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {language === 'ms' ? 'Peningkatan Pendapatan & ROI' : 'Revenue Increase & ROI'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-4xl font-black text-green-700 mb-2">10-30%</p>
                  <p className="text-gray-700 font-semibold">{language === 'ms' ? 'Peningkatan Hasil' : 'Yield Improvement'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-4xl font-black text-green-700 mb-2">18-24</p>
                  <p className="text-gray-700 font-semibold">{language === 'ms' ? 'Bulan Pulang Modal' : 'Months Payback'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-4xl font-black text-green-700 mb-2">150-300%</p>
                  <p className="text-gray-700 font-semibold">{language === 'ms' ? 'ROI dalam 3-5 Tahun' : 'ROI in 3-5 Years'}</p>
                </div>
              </div>
            </motion.div>

            {/* Accuracy & Accessibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-500"
              >
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">🎯</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ms' ? 'Ketepatan' : 'Accuracy'}
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'AI tidak pernah membuat kesilapan pengiraan' : 'AI never makes calculation errors'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Pertimbangkan interaksi nutrien' : 'Considers nutrient interactions'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Analisis berkualiti konsisten setiap kali' : 'Consistent quality analysis every time'}</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg border-l-4 border-orange-500"
              >
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">📱</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ms' ? 'Kebolehcapaian' : 'Accessibility'}
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Berfungsi pada mana-mana peranti' : 'Works on any device'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Tiada latihan khusus diperlukan' : 'No specialized training required'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{language === 'ms' ? 'Tersedia 24/7' : 'Available 24/7'}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Technology Behind CropDrive Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(30deg, #0ea5e9 12%, transparent 12.5%, transparent 87%, #0ea5e9 87.5%, #0ea5e9), linear-gradient(150deg, #0ea5e9 12%, transparent 12.5%, transparent 87%, #0ea5e9 87.5%, #0ea5e9)',
            backgroundSize: '40px 70px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-['Inter',_sans-serif] tracking-tight">
              {language === 'ms' ? 'Kuasa AI di Sebalik Kejayaan Anda' : 'The AI Power Behind Your Success'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === 'ms' 
                ? 'Kami menggabungkan pengalaman agronomi tropika dengan kecerdasan buatan untuk memberikan cadangan yang tepat dan boleh dipercayai'
                : 'We combine tropical agronomy expertise with artificial intelligence to deliver precise and reliable recommendations'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: language === 'ms' ? 'Pembelajaran Mesin' : 'Machine Learning',
                desc: language === 'ms' ? 'AI kami belajar dari beribu-ribu analisis ladang untuk memberikan cadangan yang lebih baik setiap hari' : 'Our AI learns from thousands of farm analyses to provide better recommendations every day',
                color: 'from-blue-500 to-cyan-500',
                number: '01'
              },
              {
                title: language === 'ms' ? 'Analisis Data' : 'Data Analytics',
                desc: language === 'ms' ? 'Pemprosesan data kompleks dalam masa nyata untuk insight yang actionable' : 'Complex data processing in real-time for actionable insights',
                color: 'from-green-500 to-emerald-500',
                number: '02'
              },
              {
                title: language === 'ms' ? 'Ramalan Tepat' : 'Precise Predictions',
                desc: language === 'ms' ? 'Model ramalan canggih untuk jangkaan hasil dan ROI yang tepat' : 'Advanced prediction models for accurate yield and ROI forecasts',
                color: 'from-yellow-500 to-orange-500',
                number: '03'
              },
              {
                title: language === 'ms' ? 'Sains Tanah' : 'Soil Science',
                desc: language === 'ms' ? 'Berdasarkan penyelidikan MPOB dan best practices global' : 'Based on MPOB research and global best practices',
                color: 'from-purple-500 to-pink-500',
                number: '04'
              }
            ].map((tech, index) => (
                <motion.div
                  key={index}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -15, rotateY: 5 }}
                className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20 hover:border-yellow-400 transition-all duration-500 shadow-2xl group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${tech.color} rounded-bl-full transform translate-x-8 -translate-y-8`}></div>
                </div>
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-white font-black text-3xl">{tech.number}</span>
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-4 font-['Inter',_sans-serif] tracking-tight relative z-10">{tech.title}</h3>
                <p className="text-gray-300 leading-relaxed font-medium relative z-10">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* How It Works - Step by Step Process */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 font-['Inter',_sans-serif] tracking-tight">
              {language === 'ms' ? 'Bagaimana Ia Berfungsi' : 'How It Works'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ms' 
                ? 'Dari laporan makmal ke hasil yang lebih baik dalam 4 langkah mudah'
                : 'From lab reports to better yields in 4 easy steps'
              }
            </p>
          </motion.div>

          <div className="space-y-32">
            {[
              {
                step: '01',
                title: language === 'ms' ? 'Muat Naik Laporan Anda' : 'Upload Your Report',
                desc: language === 'ms' ? 'Ambil gambar atau muat naik laporan analisis tanah/daun anda. AI kami boleh membaca pelbagai format laporan makmal' : 'Take a photo or upload your soil/leaf analysis report. Our AI can read multiple lab report formats',
                image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800',
                features: [
                  language === 'ms' ? 'Sokongan pelbagai format' : 'Multiple format support',
                  language === 'ms' ? 'Upload mudah' : 'Easy upload',
                  language === 'ms' ? 'Selamat & terenkripsi' : 'Secure & encrypted'
                ]
              },
              {
                step: '02',
                title: language === 'ms' ? 'AI Menganalisis Data' : 'AI Analyzes Data',
                desc: language === 'ms' ? 'Teknologi AI kami memproses data anda dalam 30 saat, membandingkan dengan standard MPOB dan membuat analisis mendalam' : 'Our AI technology processes your data in 30 seconds, comparing with MPOB standards and performing deep analysis',
                image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
                features: [
                  language === 'ms' ? 'Analisis 30 saat' : '30-second analysis',
                  language === 'ms' ? 'Standard MPOB' : 'MPOB standards',
                  language === 'ms' ? 'Perbandingan mendalam' : 'Deep comparison'
                ]
              },
              {
                step: '03',
                title: language === 'ms' ? 'Terima Cadangan' : 'Receive Recommendations',
                desc: language === 'ms' ? 'Dapatkan cadangan baja terperinci dengan 3 pilihan bajet, status kesihatan tanah berkod warna, dan ramalan 5 tahun' : 'Get detailed fertilizer recommendations with 3 budget options, color-coded soil health status, and 5-year forecasts',
                image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
                features: [
                  language === 'ms' ? '3 pilihan bajet' : '3 budget options',
                  language === 'ms' ? 'Status berkod warna' : 'Color-coded status',
                  language === 'ms' ? 'Ramalan jangka panjang' : 'Long-term forecasts'
                ]
              },
              {
                step: '04',
                title: language === 'ms' ? 'Implementasi & Jejak' : 'Implement & Track',
                desc: language === 'ms' ? 'Laksanakan cadangan dan jejak kemajuan anda dari semasa ke semasa. Lihat peningkatan hasil dan ROI dalam papan pemuka anda' : 'Implement recommendations and track your progress over time. See yield improvements and ROI in your dashboard',
                image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
                features: [
                  language === 'ms' ? 'Penjejakan masa nyata' : 'Real-time tracking',
                  language === 'ms' ? 'Sejarah data' : 'Data history',
                  language === 'ms' ? 'Laporan kemajuan' : 'Progress reports'
                ]
              }
            ].map((step, index) => (
                <motion.div
                  key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Image Side */}
                <div className="flex-1 relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img 
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                    <div className="absolute top-6 left-6 w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-3xl font-black text-green-900">{step.step}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <h3 className="text-4xl font-black text-gray-900 mb-6 font-['Inter',_sans-serif] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {step.desc}
                  </p>
                  <ul className="space-y-3">
                    {step.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-700"
                      >
                        <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 font-['Inter',_sans-serif] tracking-tight">
              {language === 'ms' ? 'Kisah Kejayaan' : 'Success Stories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ms' 
                ? 'Dengar daripada petani yang telah meningkatkan hasil mereka dengan CropDrive'
                : 'Hear from farmers who have increased their yields with CropDrive'
              }
            </p>
                </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmad bin Hassan',
                location: 'Johor',
                farm: '50 hektar',
                result: language === 'ms' ? '+35% hasil dalam 2 tahun' : '+35% yield in 2 years',
                quote: language === 'ms' 
                  ? 'CropDrive telah mengubah cara saya menguruskan ladang. Sekarang saya tahu apa yang tanah saya perlukan.'
                  : 'CropDrive has transformed how I manage my farm. Now I know exactly what my soil needs.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
              },
              {
                name: 'Siti Aminah',
                location: 'Pahang',
                farm: '120 hektar',
                result: language === 'ms' ? 'Jimat RM80k setahun' : 'Saved RM80k per year',
                quote: language === 'ms' 
                  ? 'Cadangan baja yang tepat menjimatkan banyak wang. ROI saya meningkat dengan ketara.'
                  : 'Precise fertilizer recommendations save so much money. My ROI has improved significantly.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
              },
              {
                name: 'Rajesh Kumar',
                location: 'Perak',
                farm: '200 hektar',
                result: language === 'ms' ? '150% ROI dalam 3 tahun' : '150% ROI in 3 years',
                quote: language === 'ms' 
                  ? 'Multi-farm management memudahkan pengurusan kesemua ladang saya dari satu tempat.'
                  : 'Multi-farm management makes it easy to manage all my farms from one place.',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.location} • {testimonial.farm}</p>
                    </div>
                  </div>
                  <div className="mb-4 p-4 bg-green-50 rounded-xl">
                    <p className="text-green-700 font-bold text-lg">{testimonial.result}</p>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
            </div>
          </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              What We <span className="text-yellow-600">Offer</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We interpret lab results, provide clear fertilization strategies, and deliver long-term investment plans with soil health restoration tailored to each farm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tailored Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tailored Solutions for <span className="text-green-700">Key Audiences</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Farmers & Estates',
                desc: 'Turn raw test results into clear advisory reports, adding value through practical improvement strategies.',
                number: '01'
              },
              {
                title: 'Soil & Leaf Testing Labs',
                desc: 'Strengthen farmer cooperatives by adding agronomy services that make advanced tools accessible to smallholders with limited resources.',
                number: '02'
              },
              {
                title: 'NGOs & Development Programs',
                desc: 'Save man-time with fertilization plans delivered in minutes instead of days, ensuring consistency across estates.',
                number: '03'
              },
              {
                title: 'Plantations & Agri-businesses',
                desc: 'Boost your fertilizer sales by linking products to tailored field recommendations that deliver clear value to farmers.',
                number: '04'
              },
              {
                title: 'Fertilizer Suppliers',
                desc: 'Enhance product adoption through integrated, data-driven recommendations.',
                number: '05'
              },
              {
                title: 'Public, Research & Certification Bodies',
                desc: 'Use farm-level data to track adoption, verify impact, and support extension, training, policy, and long-term sustainability.',
                number: '06'
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-200 hover:border-yellow-400 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200 to-yellow-200 opacity-20 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl mb-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white font-black text-xl">{solution.number}</span>
                </motion.div>
                <h3 className="text-xl font-black text-gray-900 mb-3 font-['Inter',_sans-serif] tracking-tight">{solution.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{solution.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Turn Lab Results Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Turn Lab Test Results Into <span className="text-yellow-400">Real Yield Gains</span>
            </h2>
            <p className="text-2xl mb-12">
              Faster, clearer, and reliable decisions backed by science and AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* For Organizations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-yellow-400"
            >
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">For Organizations</h3>
              <ul className="space-y-4">
                {[
                  'Streamline operations with instant, expert-level insights',
                  'Scale support for large networks or programs',
                  'Measure and report on sustainability metrics',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* For Farmers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-yellow-400"
            >
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">For Farmers</h3>
              <ul className="space-y-4">
                {[
                  'Simple, actionable plans from complex data',
                  'Cost savings and yield boosts tailored to your fields',
                  'Long-term soil health for future seasons',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-xl italic mb-8">
              Results Backed by Wide Experience
            </p>
            <p className="text-lg max-w-3xl mx-auto">
              Our AI draws from proven agronomic expertise to deliver trusted outcomes in tropical agriculture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'ms' ? 'Sedia untuk Transformasi Ladang Anda?' : 'Ready to Transform Your Farm?'}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {language === 'ms'
                ? 'Sertai ribuan petani Malaysia yang sudah menggunakan AI untuk hasil yang lebih baik.'
                : 'Join thousands of Malaysian farmers already using AI for better yields.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-light-green text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  {language === 'ms' ? 'Mulakan Sekarang' : 'Get Started Now'}
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                  {language === 'ms' ? 'Ketahui Lebih Lanjut' : 'Learn More'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
          language={language}
        />
      )}
    </div>
  );
}
