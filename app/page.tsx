"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  Cloud,
  Database,
  Brain,
  BarChart3,
  GraduationCap,
  Users,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  BookOpen,
  CheckCircle,
  Zap,
  Shield,
  Target,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "pl">("pl")

  // === FORM STATE (NEW) ===
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState("")
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null)

  const FORM_ENDPOINT = "https://formspree.io/f/xwpndprw"

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en")
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  // === SUBMIT HANDLER (NEW) ===
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    if (!name || !email || !description || !consent) {
      setStatus({
        ok: false,
        msg:
          language === "en"
            ? "Please fill required fields and accept consent."
            : "Uzupełnij wymagane pola i zaznacz zgodę.",
      })
      return
    }

    setSending(true)
    try {
      const formData = new FormData()
      // Formspree rozpoznaje standardowe klucze:
      formData.append("name", name)
      formData.append("email", email)
      formData.append("company", company)
      formData.append("category", category ?? "")
      formData.append("message", description) // klucz 'message' jest czytelny w panelu
      formData.append("consent", consent ? "yes" : "no")
      // honeypot opcjonalnie: formData.append("website", "")

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })

      if (res.ok) {
        setStatus({
          ok: true,
          msg: language === "en" ? "Message sent. Thank you!" : "Wiadomość wysłana. Dziękujemy!",
        })
        setName(""); setEmail(""); setCompany(""); setCategory(undefined); setDescription(""); setConsent(false)
      } else {
        const data = await res.json().catch(() => null)
        setStatus({
          ok: false,
          msg:
            data?.errors?.[0]?.message ??
            (language === "en" ? "Something went wrong." : "Coś poszło nie tak."),
        })
      }
    } catch {
      setStatus({ ok: false, msg: language === "en" ? "Server error." : "Błąd serwera." })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-orange-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-xl text-slate-800">ReSH</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-slate-600 hover:text-orange-600 transition-colors"
              >
                {language === "en" ? "Services" : "Usługi"}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-600 hover:text-orange-600 transition-colors"
              >
                {language === "en" ? "About" : "O nas"}
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-slate-600 hover:text-orange-600 transition-colors"
              >
                {language === "en" ? "Team" : "Zespół"}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-slate-600 hover:text-orange-600 transition-colors"
              >
                {language === "en" ? "Contact" : "Kontakt"}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 text-sm border border-orange-600 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
              >
                {language === "en" ? "PL" : "EN"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Requena
              </span>
              <br />
              <span className="text-slate-800">Software House</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {language === "en"
                ? "We create modern technology solutions for companies that want to grow through applications, data, automation, and AI."
                : "Tworzymy nowoczesne rozwiązania technologiczne dla firm, które chcą rozwijać się poprzez aplikacje, dane, automatyzację i AI."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-3 text-lg"
              >
                {language === "en" ? "Start Your Project" : "Rozpocznij swój projekt"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">
                  {language === "en" ? "Innovation First" : "Innowacja na pierwszym miejscu"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Cutting-edge solutions using the latest cloud and AI technologies"
                    : "Najnowocześniejsze rozwiązania wykorzystujące najnowsze technologie chmurowe i AI"}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">
                  {language === "en" ? "Trust & Security" : "Zaufanie i bezpieczeństwo"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "GDPR and HIPAA compliant solutions with enterprise-grade security"
                    : "Rozwiązania zgodne z GDPR i HIPAA z zabezpieczeniami klasy korporacyjnej"}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">
                  {language === "en" ? "Results Driven" : "Zorientowani na wyniki"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "End-to-end solutions that solve real business problems"
                    : "Kompleksowe rozwiązania, które rozwiązują rzeczywiste problemy biznesowe"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              {language === "en" ? "Our Services" : "Nasze usługi"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {language === "en"
                ? "We operate where processes become complex, and decisions require better insights, regardless of the industry."
                : "Działamy tam, gdzie procesy stają się złożone, a decyzje wymagają lepszego wglądu, niezależnie od branży."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cloud Data Engineering */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-800">
                    {language === "en"
                      ? "Cloud Data Engineering & Infrastructure"
                      : "Inżynieria i infrastruktura danych w chmurze"}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 text-base">
                  {language === "en"
                    ? "Designing and implementing modern data platforms"
                    : "Projektowanie i wdrażanie nowoczesnych platform danych"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Building scalable data architectures in the cloud (AWS, GCP, Azure)"
                        : "Budowanie skalowalnych architektur danych w chmurze (AWS, GCP, Azure)"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Setting up data lakes, data warehouses (Redshift, BigQuery)"
                        : "Konfiguracja jezior danych, hurtowni danych (Redshift, BigQuery)"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Real-time and batch ETL/ELT data pipelines"
                        : "Potoki danych ETL/ELT w czasie rzeczywistym i wsadowym"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "GDPR and HIPAA compliant data management strategies"
                        : "Strategie zarządzania danymi zgodne z GDPR i HIPAA"}
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToContact}
                  className="mt-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
                >
                  {language === "en"
                    ? "Let's talk about your data architecture"
                    : "Porozmawiajmy o Twojej architekturze danych"}
                </Button>
              </CardContent>
            </Card>

            {/* Applications & Automation */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-800">
                    {language === "en"
                      ? "Applications, Custom Software & Automation"
                      : "Aplikacje, oprogramowanie na zamówienie i automatyzacja"}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 text-base">
                  {language === "en"
                    ? "Solutions tailored to your business processes"
                    : "Rozwiązania dostosowane do Twoich procesów biznesowych"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Highly personalized and scalable desktop and web applications"
                        : "Wysoce spersonalizowane i skalowalne aplikacje desktopowe i webowe"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Automating operational tasks and processes"
                        : "Automatyzacja zadań i procesów operacyjnych"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Lightweight internal tools for team efficiency"
                        : "Lekkie narzędzia wewnętrzne dla efektywności zespołu"}
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToContact}
                  className="mt-6 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                >
                  {language === "en" ? "Develop a custom solution with us" : "Stwórz z nami rozwiązanie na miarę"}
                </Button>
              </CardContent>
            </Card>

            {/* AI & ML */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-zinc-50">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-zinc-600 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-800">
                    {language === "en"
                      ? "Artificial Intelligence & Machine Learning"
                      : "Sztuczna inteligencja i uczenie maszynowe"}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 text-base">
                  {language === "en" ? "From LLMs to predictive systems" : "Od LLM po systemy predykcyjne"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Generative AI and large language models for business use cases"
                        : "Generatywna sztuczna inteligencja i duże modele językowe dla zastosowań biznesowych"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "RAG systems with knowledge bases and semantic search"
                        : "Systemy RAG z bazami wiedzy i wyszukiwaniem semantycznym"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "AI agents for customer support and process automation"
                        : "Agenci AI do obsługi klienta i automatyzacji procesów"}
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToContact}
                  className="mt-6 bg-gradient-to-r from-slate-600 to-zinc-600 hover:from-slate-700 hover:to-zinc-700 text-white"
                >
                  {language === "en" ? "Replace manual work with AI Agent" : "Zastąp pracę ręczną agentem AI"}
                </Button>
              </CardContent>
            </Card>

            {/* Data Analytics */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-zinc-50 to-orange-50">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-zinc-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-800">
                    {language === "en"
                      ? "Data Analytics & Business Intelligence"
                      : "Analityka danych i Business Intelligence"}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 text-base">
                  {language === "en"
                    ? "Complete analytics environment for business and tech teams"
                    : "Kompletne środowisko analityczne dla zespołów biznesowych i technicznych"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Advanced dashboards in Power BI, Tableau, Looker"
                        : "Zaawansowane dashboardy w Power BI, Tableau, Looker"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "High-value business metrics and pattern analysis"
                        : "Wysokiej wartości metryki biznesowe i analiza wzorców"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === "en"
                        ? "Custom reports and ad-hoc analyses"
                        : "Raporty niestandardowe i analizy ad-hoc"}
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={scrollToContact}
                  className="mt-6 bg-gradient-to-r from-zinc-600 to-orange-600 hover:from-zinc-700 hover:to-orange-700 text-white"
                >
                  {language === "en" ? "Boost your company's efficiency" : "Zwiększ efektywność swojej firmy"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Training Section */}
          <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-orange-100 to-amber-100">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-slate-800">
                    {language === "en" ? "Training & Workshops" : "Szkolenia i warsztaty"}
                  </h3>
                  <p className="text-slate-600 text-lg">
                    {language === "en"
                      ? "We boost your team's competencies in AI"
                      : "Podnosimy kompetencje Twojego zespołu w zakresie AI"}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>
                        {language === "en"
                          ? "Training in generative AI, LLMs, RAG systems"
                          : "Szkolenia z generatywnej AI, LLM, systemów RAG"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>
                        {language === "en"
                          ? "Tailored programs for technical and non-technical teams"
                          : "Programy dostosowane do zespołów technicznych i nietechnicznych"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>
                        {language === "en"
                          ? "Hands-on workshops on AI integration"
                          : "Praktyczne warsztaty z integracji AI"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3"
                  >
                    {language === "en" ? "BOOK A CUSTOM TRAINING" : "ZAREZERWUJ SZKOLENIE"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why ReSH Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              {language === "en" ? "Why ReSH?" : "Dlaczego ReSH?"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Requena Software House combines expertise, innovation, and reliability"
                : "Requena Software House łączy wiedzę, innowacje i niezawodność"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800">
                  {language === "en" ? "Proven Expertise" : "Sprawdzona wiedza"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Successfully delivered and deployed verified applications for key industry enterprises."
                    : "Z powodzeniem dostarczyliśmy i wdrożyliśmy sprawdzone aplikacje dla kluczowych przedsiębiorstw z branży."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800">
                  {language === "en" ? "End-to-End Solutions" : "Kompleksowe rozwiązania"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "From data architecture to fully deployed applications"
                    : "Od architektury danych po w pełni wdrożone aplikacje"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-zinc-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800">
                  {language === "en" ? "Security & Compliance" : "Bezpieczeństwo i zgodność"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Top security standards with regulatory compliance"
                    : "Najwyższe standardy bezpieczeństwa i zgodność z przepisami"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800">
                  {language === "en" ? "Agile Methodology" : "Metodologia Agile"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Efficient Agile model trusted by leading companies"
                    : "Efektywny model Agile, któremu zaufały wiodące firmy"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800">
                  {language === "en" ? "Multi-Disciplinary" : "Wielodyscyplinarność"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Data, software engineering, and AI product design skills"
                    : "Umiejętności w zakresie danych, inżynierii oprogramowania i projektowania produktów AI"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800">
                  {language === "en" ? "Long-term Support" : "Długoterminowe wsparcie"}
                </h3>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Guaranteed security, compliance, and ongoing support"
                    : "Gwarantowane bezpieczeństwo, zgodność i bieżące wsparcie"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 space-y-4">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-3 mr-4"
            >
              {language === "en"
                ? "Build your algorithmic advantage with us"
                : "Zbuduj z nami swoją przewagę algorytmiczną"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 bg-transparent"
            >
              <Link href="https://www.elixaai.com" target="_blank" rel="noopener noreferrer">
                {language === "en" ? "Visit ElixaAI" : "Odwiedź ElixaAI"}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              {language === "en" ? "Our Team" : "Nasz zespół"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {language === "en"
                ? "A small, close-knit team combining technical, analytical, and creative skills—operating from Poland but working remotely with clients from the EU and USA."
                : "Mały, zgrany zespół łączący umiejętności techniczne, analityczne i kreatywne — działający z Polski, ale pracujący zdalnie z klientami z UE i USA."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">M</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-800">Michał</h3>
                <p className="text-orange-600 font-semibold mb-3">
                  {language === "en" ? "Backend Developer" : "Backend Developer"}
                </p>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Expert in architecture and integration of complex systems, design of scalable solutions, and management of databases and cloud infrastructure."
                    : "Ekspert w architekturze i integracji złożonych systemów, projektowaniu skalowalnych rozwiązań oraz zarządzaniu bazami danych i infrastrukturą chmurową."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex itemscenter justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">Ł</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-800">Łukasz</h3>
                <p className="text-amber-600 font-semibold mb-3">
                  {language === "en" ? "Frontend Developer" : "Frontend Developer"}
                </p>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Focuses on architecting front-end solutions that are fundamentally geared towards delivering fast, intuitive, and truly modern user experiences."
                    : "Skupia się na projektowaniu rozwiązań frontendowych, które są fundamentalnie nastawione na dostarczanie szybkich, intuicyjnych i rzeczywiście nowoczesnych doświadczeń użytkownika."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-zinc-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-800">Paweł</h3>
                <p className="text-slate-600 font-semibold mb-3">{language === "en" ? "Strategist" : "Strateg"}</p>
                <p className="text-slate-600">
                  {language === "en"
                    ? "Bridge between the data world and real client needs. Operates at the intersection of technology and culture."
                    : "Pomost między światem danych a rzeczywistymi potrzebami klienta. Działa na styku technologii i kultury."}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Together, we form ReSH – Requena Software House—a team that truly understands data and people."
                : "Razem tworzymy ReSH – Requena Software House – zespół, który naprawdę rozumie dane i ludzi."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              {language === "en" ? "Contact Us" : "Skontaktuj się z nami"}
            </h2>
            <p className="text-xl text-slate-600">
              {language === "en"
                ? "Let's discuss your project. We'll respond within 24 hours."
                : "Porozmawiajmy o Twoim projekcie. Odpowiemy w ciągu 24 godzin."}
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* FORM WITH onSubmit (NEW) */}
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      {language === "en" ? "Name" : "Imię"}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={language === "en" ? "Your name" : "Twoje imię"}
                      className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      {language === "en" ? "Email" : "Email"}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    {language === "en" ? "Company name / industry" : "Nazwa firmy / branża"}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder={language === "en" ? "Your company and industry" : "Twoja firma i branża"}
                    className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === "en" ? "Contact Category" : "Kategoria kontaktu"}
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-slate-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder={language === "en" ? "Select a category" : "Wybierz kategorię"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud-data">
                        {language === "en"
                          ? "Cloud Data Engineering & Infrastructure"
                          : "Inżynieria i infrastruktura danych w chmurze"}
                      </SelectItem>
                      <SelectItem value="applications">
                        {language === "en"
                          ? "Applications & Custom Software"
                          : "Aplikacje i oprogramowanie na zamówienie"}
                      </SelectItem>
                      <SelectItem value="ai-ml">
                        {language === "en" ? "Artificial Intelligence & ML" : "Sztuczna inteligencja i ML"}
                      </SelectItem>
                      <SelectItem value="data-analytics">
                        {language === "en"
                          ? "Data Analytics & Business Intelligence"
                          : "Analityka danych i Business Intelligence"}
                      </SelectItem>
                      <SelectItem value="training">
                        {language === "en" ? "Training & Workshops" : "Szkolenia i warsztaty"}
                      </SelectItem>
                      <SelectItem value="general">
                        {language === "en" ? "General Inquiry" : "Zapytanie ogólne"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                    {language === "en" ? "Description of your need / project" : "Opis Twojej potrzeby / projektu"}
                  </label>
                  <Textarea
                    id="description"
                    name="message" // klucz 'message' dla Formspree
                    placeholder={
                      language === "en"
                        ? "Tell us about your project requirements..."
                        : "Opowiedz nam o wymaganiach Twojego projektu..."
                    }
                    rows={6}
                    className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(Boolean(v))}
                    className="border-slate-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                  />
                  <label htmlFor="consent" className="text-sm text-slate-600">
                    {language === "en"
                      ? "I consent to the processing of personal data in accordance with the privacy policy."
                      : "Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z polityką prywatności."}
                  </label>
                </div>

                {status && (
                  <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>
                    {status.msg}
                  </p>
                )}

                <Button
                  size="lg"
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-3"
                >
                  {sending
                    ? (language === "en" ? "Sending..." : "Wysyłanie...")
                    : (language === "en" ? "Send Inquiry" : "Wyślij zapytanie")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-orange-600" />
                <span className="text-slate-600">michal.dobrzynski@requena.pl</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-5 w-5 text-orange-600" />
                <span className="text-slate-600">+48 574 143 447</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-5 w-5 text-orange-600" />
                <span className="text-slate-600">www.elixaai.com</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-slate-600 mb-4">
                {language === "en" ? "Stay up to date, follow us here:" : "Bądź na bieżąco, śledź nas tutaj:"}
              </p>
              <div className="flex justify-center space-x-6">
                <Link href="https://www.linkedin.com/company/requenash/" className="text-slate-400 hover:text-orange-600 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
{/*                 <Link href="#" className="text-slate-400 hover:text-orange-600 transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-orange-600 transition-colors">
                  <BookOpen className="h-6 w-6" /> 
                </Link>*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl">ReSH - Requena Software House</span>
          </div>
          <p className="text-slate-400">
            © 2024 Requena Software House. Building the future with data, AI, and innovation.
          </p>
        </div>
      </footer>
    </div>
  )
}
