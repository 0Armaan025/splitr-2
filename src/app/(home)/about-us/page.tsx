import React from 'react';
import { BookOpen, Users, Target, Lightbulb, Rocket, TrendingUp, Award, Package, Coins, Heart } from 'lucide-react';

const AboutUsPage = () => {
  const stats = [
    { number: '98%', label: 'of children show creative potential by age 5', icon: Lightbulb },
    { number: '73%', label: 'lose creative confidence by age 12', icon: TrendingUp },
    { number: '1 in 3', label: 'children want to become authors', icon: BookOpen },
    { number: '85%', label: 'of creative skills develop before age 18', icon: Award },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Online Book Creation',
      description: 'Intuitive drag-and-drop editor for young authors to bring their stories to life',
    },
    {
      icon: Coins,
      title: 'Token System',
      description: 'Reward-based economy to encourage creativity and engagement',
    },
    {
      icon: Rocket,
      title: 'Campaign Creation',
      description: 'Launch crowdfunding campaigns to publish your dream book',
    },
    {
      icon: Package,
      title: 'Print & Digital',
      description: 'We handle everything - from creation to hard copy delivery',
    },
  ];

  const models = [
    {
      title: 'Freemium',
      description: 'Free access to basic creation tools, pay for premium features',
      color: 'bg-green-300',
    },
    {
      title: 'Premium',
      description: 'Unlock all features, unlimited tokens, and priority publishing',
      color: 'bg-purple-300',
    },
    {
      title: 'B2C',
      description: 'Direct-to-consumer book sales and subscriptions',
      color: 'bg-blue-300',
    },
    {
      title: 'B2B',
      description: 'Partnerships with schools, libraries, and educational institutions',
      color: 'bg-yellow-300',
    },
  ];

  const team = [
    {
      name: 'Armaan',
      role: 'Co-Founder',
      region: 'North Region',
      
    },
    {
      name: 'Arnav Bajaj',
      role: 'Co-Founder',
      region: 'North Region',
      
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 border-b-4 border-black py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-black text-white border-4 border-black font-black text-sm">
            UPES FOUNDERS CHALLENGE
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            UNLEASHING YOUNG<br />CREATIVITY
          </h1>
          <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto">
            Empowering the youth of today to break free from educational constraints 
            and express their creativity through storytelling
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Problem Statement */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-10 h-10" />
            <h2 className="text-4xl font-black">THE PROBLEM</h2>
          </div>
          <div className="bg-red-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <p className="text-xl font-bold leading-relaxed">
              Today's education system often <span className="bg-black text-white px-2">suppresses creativity</span> rather than nurturing it. 
              Children are confined to rigid curricula, standardized tests, and prescribed thinking patterns. 
              We believe every child has a story to tell, but the current system doesn't give them the platform to express it.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <h2 className="text-4xl font-black mb-8 text-center">THE DATA SPEAKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4" />
                <div className="text-5xl font-black mb-3">{stat.number}</div>
                <p className="font-bold text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <p className="font-bold text-center">
              <strong className="font-black">Source:</strong> Research from NASA, Adobe's State of Create Study, 
              National Education Association, and developmental psychology studies
            </p>
          </div>
        </div>

        {/* Our Solution */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-10 h-10" />
            <h2 className="text-4xl font-black">OUR SOLUTION</h2>
          </div>
          <div className="bg-green-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <p className="text-xl font-bold leading-relaxed mb-4">
              We're creating a <span className="bg-black text-white px-2">comprehensive platform</span> where young minds 
              can write, illustrate, and publish their own books - both digital and physical.
            </p>
            <p className="text-xl font-bold leading-relaxed">
              From the first word to the final delivery, we handle <span className="bg-black text-white px-2">everything</span> - 
              creation tools, printing, logistics, distribution, and monetization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6"
              >
                <feature.icon className="w-10 h-10 mb-4" />
                <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                <p className="font-bold">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Models */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-10 h-10" />
            <h2 className="text-4xl font-black">BUSINESS MODELS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className={`${model.color} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6`}
              >
                <h3 className="text-2xl font-black mb-3">{model.title}</h3>
                <p className="font-bold">{model.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-purple-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <p className="font-bold text-center">
              <strong className="font-black">Hybrid Approach:</strong> We combine all models to create multiple 
              revenue streams while keeping creativity accessible to everyone
            </p>
          </div>
        </div>

        {/* What We Handle */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-10 h-10" />
            <h2 className="text-4xl font-black">END-TO-END SERVICE</h2>
          </div>
          <div className="bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-black mb-4">WE HANDLE:</h3>
                <ul className="space-y-2 font-bold">
                  <li>✓ Digital book creation platform</li>
                  <li>✓ Professional printing services</li>
                  <li>✓ Quality control & editing support</li>
                  <li>✓ Logistics & shipping</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black mb-4 invisible md:visible">&nbsp;</h3>
                <ul className="space-y-2 font-bold">
                  <li>✓ Payment processing</li>
                  <li>✓ Marketing & distribution</li>
                  <li>✓ Campaign management</li>
                  <li>✓ Customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-10 h-10" />
            <h2 className="text-4xl font-black">MEET THE FOUNDERS OF "THE ASTRALS":</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-300 border-4 border-black mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black mb-2">{member.name}</h3>
                <p className="text-lg font-bold mb-1">{member.role}</p>
                <p className="font-bold text-gray-600 mb-3">{member.region}</p>
                
               
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-br from-pink-300 to-purple-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-black mb-6">OUR VISION</h2>
          <p className="text-xl font-bold leading-relaxed max-w-3xl mx-auto">
            To create a world where every child's voice is heard, every story is valued, 
            and creativity is celebrated - not confined. We're not just building a platform; 
            we're building a movement to <span className="bg-black text-white px-2">democratize publishing</span> and 
            empower the next generation of authors, one book at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;