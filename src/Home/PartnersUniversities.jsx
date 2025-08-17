// // import React from "react";
// // import Marquee from "react-fast-marquee";

// // const universityLogos = [
// //   {
// //     name: "Harvard University",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
// //   },
// //   {
// //     name: "MIT",
// //     logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
// //   },
// //   {
// //     name: "Stanford University",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal_2003.svg",
// //   },
// //   {
// //     name: "University of Oxford",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/d/d5/Oxford_University_Circlet.svg",
// //   },
// //   {
// //     name: "University of Cambridge",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/0/0a/University_of_Cambridge_coat_of_arms.svg",
// //   },
// //   {
// //     name: "Yale University",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/4/42/Yale_University_Shield_1.svg",
// //   },
// //   {
// //     name: "University of Toronto",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/7/74/University_of_Toronto_coat_of_arms.svg",
// //   },
// //   {
// //     name: "ETH Zurich",
// //     logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/ETH_Zurich_Logo.svg",
// //   },
// //   {
// //     name: "National University of Singapore",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/2/28/NUS_coat_of_arms.svg",
// //   },
// //   {
// //     name: "University of Melbourne",
// //     logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/University_of_Melbourne_coat_of_arms.svg",
// //   },
// // ];

// // const UniversitiesShowcase = () => {
// //   return (
// //     <section className="py-10 bg-gray-50">
// //       <h2 className="text-3xl font-bold text-center mb-6">
// //         🌍 Our Partner Universities
// //       </h2>
// //       <Marquee pauseOnHover gradient={false} speed={40}>
// //         {universityLogos.map((uni, idx) => (
// //           <div key={idx} className="mx-10 flex flex-col items-center">
// //             <img
// //               src={uni.logo}
// //               alt={uni.name}
// //               className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
// //             />
// //             <p className="text-sm mt-2 text-gray-600">{uni.name}</p>
// //           </div>
// //         ))}
// //       </Marquee>
// //     </section>
// //   );
// // };

// // export default UniversitiesShowcase;





// import React from "react";
// import Marquee from "react-fast-marquee";

// const universities = [
//   "Harvard University",
//   "Massachusetts Institute of Technology",
//   "Stanford University",
//   "University of Oxford",
//   "University of Cambridge",
//   "Yale University",
//   "University of Toronto",
//   "ETH Zurich",
//   "National University of Singapore",
//   "University of Melbourne",
//   "University of Tokyo",
//   "Imperial College London",
//   "University of Chicago",
//   "UCL",
//   "Columbia University"
// ];

// const UniversitiesShowcase = () => {
//   return (
//     <section className="py-12 bg-white border-t border-b border-gray-100">
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl font-medium text-center text-gray-700 mb-8 tracking-wider">
//           PARTNER INSTITUTIONS
//         </h2>
        
//         <div className="relative overflow-hidden">
//           <Marquee 
//             pauseOnHover 
//             gradient={false} 
//             speed={50}
//             className="py-2"
//           >
//             {universities.map((uni, idx) => (
//               <div key={idx} className="flex items-center">
//                 <span className="mx-8 text-lg font-light text-gray-600 tracking-wide">
//                   {uni.toUpperCase()}
//                 </span>
//                 <span className="text-gray-300">•</span>
//               </div>
//             ))}
//           </Marquee>
//         </div>
        
//         <div className="mt-2 text-center">
//           <p className="text-xs text-gray-400 tracking-widest">
//             GLOBAL ACADEMIC NETWORK
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UniversitiesShowcase;


// https://i.ibb.co.com/Wpc9vk1Y/sh.png
// https://i.ibb.co.com/67ZfN1p7/so.png
// https://i.ibb.co.com/vvxyBsDM/sc.png
// https://i.ibb.co.com/Q3yZS7L9/sy.png
// https://i.ibb.co.com/4wxP6FLV/sz.jpg


import React from "react";
import Marquee from "react-fast-marquee";

const universityPartners = [
  {
    name: "Harvard University",
    logo: "https://i.ibb.co.com/Wpc9vk1Y/sh.png",
    shortName: "HARVARD"
  },
  {
    name: "Massachusetts Institute of Technology",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    shortName: "MIT"
  },
  {
    name: "Stanford University",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal_2003.svg",
    shortName: "STANFORD"
  },
  {
    name: "University of Oxford",
    logo: "https://i.ibb.co.com/67ZfN1p7/so.png",
    shortName: "OXFORD"
  },
  {
    name: "University of Cambridge",
    logo: "https://i.ibb.co.com/vvxyBsDM/sc.png",
    shortName: "CAMBRIDGE"
  },
  {
    name: "Yale University",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/42/Yale_University_Shield_1.svg",
    shortName: "YALE"
  },
  {
    name: "ETH Zurich",
    logo: "https://i.ibb.co.com/4wxP6FLV/sz.jpg",
    shortName: "ETH ZURICH"
  }
];

const UniversityLogo = ({ logo, name }) => (
  <div className="relative w-16 h-16 flex items-center justify-center mx-4">
    <img 
      src={logo} 
      alt={name}
      className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%' y='50%' font-family='sans-serif' font-size='14' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3E" + 
        name.split(' ').map(word => word[0]).join('').toUpperCase() + "%3C/text%3E%3C/svg%3E";
      }}
    />
  </div>
);

const UniversitiesShowcase = () => {
  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl  font-bold text-center text-gray-800 mb-2 tracking-wider">
          OUR GLOBAL PARTNERS
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8 tracking-widest">
          WORLD-CLASS ACADEMIC INSTITUTIONS
        </p>

        <div className="relative">
          <Marquee 
            pauseOnHover 
            gradient={false} 
            speed={40}
            className="py-6"
          >
            {universityPartners.map((uni, idx) => (
              <div key={idx} className="flex flex-col items-center mx-8 group">
                <UniversityLogo logo={uni.logo} name={uni.name} />
                <span className="mt-3 text-xs font-medium text-gray-600 tracking-wider group-hover:text-gray-900 transition-colors">
                  {uni.shortName}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesShowcase;