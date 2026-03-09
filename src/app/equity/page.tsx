
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { ArrowLeft, Sparkles, Target, Users, TrendingUp, Globe } from 'lucide-react';
import Link from 'next/link';

const EQUITY_DATA = [
  { category: "Leadership", value: 28, color: "#3b82f6", label: "Global Women in Tech Leadership" },
  { category: "Engineering", value: 25, color: "#a855f7", label: "Women in Software Engineering" },
  { category: "CS Graduates", value: 19, color: "#f43f5e", label: "Women CS Degree Earners" },
  { category: "Startup Funding", value: 2.3, color: "#f59e0b", label: "VC Funding for Women-led Startups" },
];

const chartConfig = {
  value: {
    label: "Percentage (%)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function EquityPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="relative min-h-screen w-full bg-[#050508] text-white selection:bg-primary/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Constellation
        </Link>
        <div className="text-[9px] uppercase tracking-[0.8em] text-white/20 font-medium hidden md:block">
          The Equity Horizon · Deep Dive
        </div>
      </nav>

      <div className="relative z-10 pt-32 pb-32 px-6 max-w-6xl mx-auto">
        <header className="mb-24 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-3"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[1em] text-primary/60 font-bold italic">
              Manifesting the Future
            </p>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none italic">
              The Equity <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
                Horizon
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.7, duration: 1.2 }}
            className="max-w-xl text-sm md:text-base text-white/70 font-light leading-relaxed tracking-wide italic"
          >
            Gender equity is the deliberate act of building an ecosystem where innovation is untethered from bias. To look at the horizon is to recognize the gap, and to work toward closing it is to rewrite the source code of society.
          </motion.p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-8 md:p-10 space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white/90">The Representation Gap</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Global tech workforce percentage (%)</p>
            </div>

            <div className="h-[280px] w-full">
              <ChartContainer config={chartConfig}>
                <BarChart data={EQUITY_DATA} layout="vertical" margin={{ left: -10, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 700 }}
                    width={100}
                  />
                  <Tooltip 
                    content={<ChartTooltipContent hideLabel />}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                    {EQUITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <InsightCard 
               icon={<Target className="w-5 h-5 text-blue-400" />}
               title="2.3%"
               label="Funding Allocation"
               description="VC funding reaching women-led startups annually."
               delay={0.1}
             />
             <InsightCard 
               icon={<Users className="w-5 h-5 text-violet-400" />}
               title="50%"
               label="Mid-Career Drop"
               description="Women leaving tech roles at double the rate of men."
               delay={0.2}
             />
             <InsightCard 
               icon={<TrendingUp className="w-5 h-5 text-rose-400" />}
               title="19%"
               label="The Pipeline"
               description="Women among computer science degree earners globally."
               delay={0.3}
             />
             <InsightCard 
               icon={<Globe className="w-5 h-5 text-cyan-400" />}
               title="2030"
               label="Parity Goal"
               description="Estimated target for achieving leadership gender parity."
               delay={0.4}
             />
          </div>
        </section>

        <section className="mb-24">
          <Tabs defaultValue="legacy" className="w-full">
            <TabsList className="bg-transparent border-b border-white/10 w-full justify-start gap-8 rounded-none h-auto pb-3 overflow-x-auto no-scrollbar">
              <TabsTrigger value="legacy" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-none p-0 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">The Historical Root</TabsTrigger>
              <TabsTrigger value="barriers" className="data-[state=active]:bg-transparent data-[state=active]:text-violet-400 border-none p-0 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Structural Barriers</TabsTrigger>
              <TabsTrigger value="future" className="data-[state=active]:bg-transparent data-[state=active]:text-rose-400 border-none p-0 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">A New Architecture</TabsTrigger>
            </TabsList>
            
            <div className="mt-12">
              <TabsContent value="legacy" className="space-y-6 animate-in fade-in slide-in-from-bottom-3">
                <h4 className="text-xl font-bold uppercase italic tracking-tighter">Recognition as Restorative Justice</h4>
                <p className="max-w-2xl text-xs md:text-sm text-white/60 leading-relaxed font-light">
                  History often writes in a single voice. Women like Ada Lovelace and Grace Hopper were not outliers; they were the architects. Equity begins by restoring their names to the foundational code of computing history, shifting the narrative from "participation" to "authorship."
                </p>
              </TabsContent>
              <TabsContent value="barriers" className="space-y-6 animate-in fade-in slide-in-from-bottom-3">
                <h4 className="text-xl font-bold uppercase italic tracking-tighter">Beyond the Broken Rung</h4>
                <p className="max-w-2xl text-xs md:text-sm text-white/60 leading-relaxed font-light">
                  Bias is often built into the invisible architecture of organizations. From recruitment algorithms to exclusionary culture, equity requires a structural audit of how we define "talent" and "merit," ensuring that the path to leadership is a bridge, not a ladder with missing rungs.
                </p>
              </TabsContent>
              <TabsContent value="future" className="space-y-6 animate-in fade-in slide-in-from-bottom-3">
                <h4 className="text-xl font-bold uppercase italic tracking-tighter">Engineering Inclusion</h4>
                <p className="max-w-2xl text-xs md:text-sm text-white/60 leading-relaxed font-light">
                  The future of equity is decentralized and intentional. It involves mentorship networks, pay transparency, and the radical idea that a diverse mind produces more resilient code. We are not just building apps; we are engineering a more inclusive reality.
                </p>
              </TabsContent>
            </div>
          </Tabs>
        </section>

        <footer className="pt-24 border-t border-white/5 flex flex-col items-center text-center space-y-10">
           <Sparkles className="w-6 h-6 text-primary animate-pulse" />
           <div className="space-y-4">
             <h2 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter">Your Code, Your Legacy.</h2>
             <p className="text-[9px] uppercase tracking-[0.8em] text-white/30">Write a future where every star can shine.</p>
           </div>
           <Link href="/" className="px-10 py-3 rounded-full border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all text-[10px] uppercase tracking-[0.4em] font-bold">
             Return to Constellation
           </Link>
        </footer>
      </div>
    </main>
  );
}

function InsightCard({ icon, title, label, description, delay }: { icon: React.ReactNode, title: string, label: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="glass-morphism rounded-2xl p-5 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div className="space-y-0.5">
          <p className="text-[9px] uppercase tracking-widest text-white/40">{label}</p>
          <h4 className="text-2xl font-bold tracking-tighter italic">{title}</h4>
        </div>
      </div>
      <p className="text-[10px] text-white/50 leading-relaxed mt-3 font-light italic">
        {description}
      </p>
    </motion.div>
  );
}
