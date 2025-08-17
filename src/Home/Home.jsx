// import React from 'react';
// import Banner from './Banner';
// import TopScholarships from '../pages/TopScholarships';
// import FeedbackSection from '../component/FeedbackSection';

// const Home = () => {
//     return (
//         <div>
//             <Banner></Banner>
//             <TopScholarships></TopScholarships>
//             <FeedbackSection></FeedbackSection>
//         </div>
//     );
// };

// export default Home;








import React from 'react';
import Banner from './Banner';
import TopScholarships from '../pages/TopScholarships';
import FeedbackSection from '../component/FeedbackSection';
import ScholarshipStats from '../component/ScholarshipStats'; // ✅ Import the new component
import ModeratorsShowcase from './ModeratorsShowcase';
import Feedback from './Feedback';
import PartnersUniversities from './PartnersUniversities';
import BestFeatures from '../component/Best';


const Home = () => {
    const statsData = {
        scholarships: 120,     // Replace with dynamic value later
        applications: 350,    // Replace with backend data
        approved: 255,         // Replace with backend data
    };

    return (
        <div>
            <Banner />
            <TopScholarships />
            <ScholarshipStats stats={statsData} />  {/* ✅ Added here */}
            <PartnersUniversities></PartnersUniversities>
            <ModeratorsShowcase></ModeratorsShowcase>
            <Feedback></Feedback>
            <FeedbackSection />
          
        </div>
    );
};

export default Home;
