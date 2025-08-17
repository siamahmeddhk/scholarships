// import React from "react";
// import Marquee from "react-fast-marquee";

// const universityLogos = [
//   {
//     name: "Harvard University",
//     logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
//   },
//   {
//     name: "MIT",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
//   },
//   {
//     name: "Stanford University",
//     logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal_2003.svg",
//   },
//   {
//     name: "University of Oxford",
//     logo: "https://upload.wikimedia.org/wikipedia/en/d/d5/Oxford_University_Circlet.svg",
//   },
//   {
//     name: "University of Cambridge",
//     logo: "https://upload.wikimedia.org/wikipedia/en/0/0a/University_of_Cambridge_coat_of_arms.svg",
//   },
//   {
//     name: "Yale University",
//     logo: "https://upload.wikimedia.org/wikipedia/en/4/42/Yale_University_Shield_1.svg",
//   },
//   {
//     name: "University of Toronto",
//     logo: "https://upload.wikimedia.org/wikipedia/en/7/74/University_of_Toronto_coat_of_arms.svg",
//   },
//   {
//     name: "ETH Zurich",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/ETH_Zurich_Logo.svg",
//   },
//   {
//     name: "National University of Singapore",
//     logo: "https://upload.wikimedia.org/wikipedia/en/2/28/NUS_coat_of_arms.svg",
//   },
//   {
//     name: "University of Melbourne",
//     logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/University_of_Melbourne_coat_of_arms.svg",
//   },
// ];

// const UniversitiesShowcase = () => {
//   return (
//     <section className="py-10 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         🌍 Our Partner Universities
//       </h2>
//       <Marquee pauseOnHover gradient={false} speed={40}>
//         {universityLogos.map((uni, idx) => (
//           <div key={idx} className="mx-10 flex flex-col items-center">
//             <img
//               src={uni.logo}
//               alt={uni.name}
//               className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
//             />
//             <p className="text-sm mt-2 text-gray-600">{uni.name}</p>
//           </div>
//         ))}
//       </Marquee>
//     </section>
//   );
// };

// export default UniversitiesShowcase;




import React from "react";

// Embedded SVG logos as components
const HarvardLogo = () => (
  <svg viewBox="0 0 100 120" className="w-full h-full">
    <rect width="100" height="120" fill="#A41034" rx="5"/>
    <text x="50" y="40" textAnchor="middle" fill="white" fontSize="10" fontFamily="serif" fontWeight="bold">HARVARD</text>
    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="6" fontFamily="serif">VERITAS</text>
    <rect x="20" y="65" width="60" height="2" fill="white"/>
    <rect x="25" y="75" width="50" height="1" fill="white"/>
  </svg>
);

const MITLogo = () => (
  <svg viewBox="0 0 120 60" className="w-full h-full">
    <rect width="120" height="60" fill="#750014" rx="3"/>
    <text x="60" y="35" textAnchor="middle" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="bold">MIT</text>
  </svg>
);

const StanfordLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="45" fill="#8C1515"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2"/>
    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif" fontWeight="bold">STANFORD</text>
  </svg>
);

const OxfordLogo = () => (
  <svg viewBox="0 0 80 100" className="w-full h-full">
    <rect width="80" height="100" fill="#002147" rx="5"/>
    <circle cx="40" cy="35" r="20" fill="none" stroke="#FFD700" strokeWidth="2"/>
    <text x="40" y="65" textAnchor="middle" fill="#FFD700" fontSize="8" fontFamily="serif" fontWeight="bold">OXFORD</text>
  </svg>
);

const CambridgeLogo = () => (
  <svg viewBox="0 0 80 100" className="w-full h-full">
    <rect width="80" height="100" fill="#A3C1AD" rx="5"/>
    <rect x="10" y="20" width="60" height="40" fill="#003366" rx="3"/>
    <text x="40" y="70" textAnchor="middle" fill="#003366" fontSize="7" fontFamily="serif" fontWeight="bold">CAMBRIDGE</text>
  </svg>
);

const YaleLogo = () => (
  <svg viewBox="0 0 80 100" className="w-full h-full">
    <rect width="80" height="100" fill="#00356B" rx="5"/>
    <text x="40" y="45" textAnchor="middle" fill="white" fontSize="12" fontFamily="serif" fontWeight="bold">Y</text>
    <text x="40" y="65" textAnchor="middle" fill="white" fontSize="6" fontFamily="serif">LUX ET VERITAS</text>
  </svg>
);

const TorontoLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="45" fill="#002A5C"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2"/>
    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif" fontWeight="bold">TORONTO</text>
  </svg>
);

const ETHLogo = () => (
  <svg viewBox="0 0 120 60" className="w-full h-full">
    <rect width="120" height="60" fill="#1F407A" rx="3"/>
    <text x="60" y="35" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">ETH ZURICH</text>
  </svg>
);

const NUSLogo = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    <rect width="100" height="80" fill="#003D7A" rx="5"/>
    <text x="50" y="35" textAnchor="middle" fill="#FFD700" fontSize="10" fontFamily="sans-serif" fontWeight="bold">NUS</text>
    <text x="50" y="50" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">SINGAPORE</text>
  </svg>
);

const MelbourneLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect width="100" height="100" fill="#012A58" rx="5"/>
    <rect x="20" y="30" width="60" height="30" fill="#006A96" rx="3"/>
    <text x="50" y="75" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif">MELBOURNE</text>
  </svg>
);

const universityLogos = [
  {
    name: "Harvard University",
    logo: <HarvardLogo />,
  },
  {
    name: "MIT",
    logo: <MITLogo />,
  },
  {
    name: "Stanford University", 
    logo: <StanfordLogo />,
  },
  {
    name: "University of Oxford",
    logo: <OxfordLogo />,
  },
  {
    name: "University of Cambridge",
    logo: <CambridgeLogo />,
  },
  {
    name: "Yale University",
    logo: <YaleLogo />,
  },
  {
    name: "University of Toronto",
    logo: <TorontoLogo />,
  },
  {
    name: "ETH Zurich",
    logo: <ETHLogo />,
  },
  {
    name: "National University of Singapore",
    logo: <NUSLogo />,
  },
  {
    name: "University of Melbourne",
    logo: <MelbourneLogo />,
  },
];

const UniversitiesShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            🌍 Our Partner Universities
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Collaborating with world-renowned institutions to advance education and research
          </p>
        </div>
        
        {/* First row - left to right */}
        <div className="mb-8">
          <div className="flex animate-scroll-left">
            {[...universityLogos, ...universityLogos].map((uni, idx) => (
              <div key={idx} className="flex-shrink-0 mx-8 flex flex-col items-center group">
                <div className="w-20 h-16 mb-3 grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 hover:shadow-lg rounded-lg overflow-hidden bg-white p-2">
                  {uni.logo}
                </div>
                <p className="text-sm font-medium text-slate-700 text-center leading-tight max-w-24 group-hover:text-blue-600 transition-colors duration-300">
                  {uni.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - right to left */}
        <div>
          <div className="flex animate-scroll-right">
            {[...universityLogos.slice().reverse(), ...universityLogos.slice().reverse()].map((uni, idx) => (
              <div key={idx} className="flex-shrink-0 mx-8 flex flex-col items-center group">
                <div className="w-20 h-16 mb-3 grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 hover:shadow-lg rounded-lg overflow-hidden bg-white p-2">
                  {uni.logo}
                </div>
                <p className="text-sm font-medium text-slate-700 text-center leading-tight max-w-24 group-hover:text-blue-600 transition-colors duration-300">
                  {uni.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
          width: fit-content;
        }
        
        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
          width: fit-content;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default UniversitiesShowcase;