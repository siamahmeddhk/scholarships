import React from 'react';
import Banner from './Banner';
import TopScholarships from '../pages/TopScholarships';
import FeedbackSection from '../component/FeedbackSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <FeedbackSection></FeedbackSection>
        </div>
    );
};

export default Home;