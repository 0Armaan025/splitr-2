'use client';
import React, { useState } from 'react';
import { Coins, Sparkles, BookOpen, Image, Zap, TrendingUp, ArrowRight, Clock, Award, PersonStandingIcon } from 'lucide-react';

const TokensBankPage = () => {
  const [userTokens] = useState(2500);

  const tokenUses = [
    {
      icon: BookOpen,
      title: 'Create Books',
      description: 'Use tokens to create and publish new books',
      cost: '100 tokens per book',
      color: 'bg-yellow-300',
    },
    
    {
      icon: Sparkles,
      title: 'Premium Templates',
      description: 'Access exclusive layouts and designs',
      cost: '50 tokens per template',
      color: 'bg-purple-300',
    },
    {
      icon: Zap,
      title: 'AI Assistance',
      description: 'Get AI help with writing and editing',
      cost: '25 tokens per request',
      color: 'bg-green-300',
    },
    {
      icon: PersonStandingIcon,
      title: 'Campaigns',
      description: 'Create campaigns to get your book noticed',
      cost: 'x tokens depending on campaign type',
      color: 'bg-green-300',
    },
  ];

  const recentActivity = [
    { action: 'Created "Adventure Tales"', tokens: -100, time: '2 hours ago' },
    
    { action: 'Purchased tokens', tokens: +1000, time: '1 day ago' },
    { action: 'Used Premium Template', tokens: -50, time: '2 days ago' },
  ];

  const achievements = [
    { title: 'First Book', reward: '100 tokens', unlocked: true },
    { title: 'Published 5 Books', reward: '500 tokens', unlocked: false },
    { title: 'Added 50 Images', reward: '250 tokens', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-4 bg-yellow-300 inline-block px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            TOKENS BANK
          </h1>
          <p className="text-lg font-bold mt-4">Manage your tokens and unlock creative features</p>
        </div>

        {/* Token Balance Card */}
        <div className="mb-8 bg-gradient-to-br from-yellow-300 to-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase mb-2">Your Balance</p>
              <div className="flex items-center gap-3">
                <Coins className="w-12 h-12" />
                <h2 className="text-6xl font-black">{userTokens.toLocaleString()}</h2>
                <span className="text-2xl font-black">TOKENS</span>
              </div>
            </div>
            <a
              href="/#pricing"
              className="flex items-center gap-2 px-6 py-4 bg-black text-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              GET MORE TOKENS
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Token Uses */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              WHAT YOU CAN DO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tokenUses.map((use, index) => (
                <div
                  key={index}
                  className={`${use.color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1`}
                >
                  <use.icon className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-black mb-2">{use.title}</h3>
                  <p className="font-bold mb-3 text-sm">{use.description}</p>
                  <div className="inline-block px-3 py-1 bg-white border-2 border-black font-black text-xs">
                    {use.cost}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
              <Clock className="w-8 h-8" />
              ACTIVITY
            </h2>
            <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="pb-4 border-b-2 border-black last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm flex-1">{activity.action}</p>
                      <span className={`font-black text-sm ${activity.tokens > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.tokens > 0 ? '+' : ''}{activity.tokens}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-600">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
            <Award className="w-8 h-8" />
            EARN MORE TOKENS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 ${
                  achievement.unlocked ? 'bg-green-300' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Award className={`w-8 h-8 ${achievement.unlocked ? '' : 'opacity-30'}`} />
                  {achievement.unlocked && (
                    <span className="px-2 py-1 bg-black text-white text-xs font-black">
                      UNLOCKED
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black mb-2">{achievement.title}</h3>
                <div className="inline-block px-3 py-1 bg-white border-2 border-black font-black text-xs">
                  {achievement.reward}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-black mb-2">NEED MORE TOKENS?</h3>
              <p className="font-bold mb-4">
                Purchase token packages to unlock unlimited creativity. Create more books, add stunning images, 
                and access premium features without limits!
              </p>
              <a
                href="/#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                VIEW PRICING
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensBankPage;