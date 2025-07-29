import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ScholarshipDetails = () => {
  const { id } = useParams();

  // Helper to extract username from email if needed
  const userNameFromEmail = (email) => {
    if (!email) return "Anonymous";
    return email.split("@")[0];
  };

  // Fetch scholarship details
  const {
    data: scholarship,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://s-server-two.vercel.app/scholarships/${id}`
      );
      return res.data;
    },
  });

  // Fetch reviews
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://s-server-two.vercel.app/reviews?scholarshipId=${id}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center text-lg">Loading scholarship...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600">Error loading scholarship</p>
    );

  const renderStars = (rating) => {
    return (
      <span className="text-yellow-500 text-lg">
        {"★".repeat(rating) + "☆".repeat(5 - rating)}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4">
        {scholarship.scholarshipName}
      </h1>
      <h2 className="text-xl font-semibold text-center mb-6">
        {scholarship.universityName}
      </h2>

      {/* University Image */}
      {scholarship.universityImage && (
        <div className="flex justify-center mb-6">
          <img
            src={scholarship.universityImage}
            alt="University Logo"
            className="w-40 rounded-md shadow"
          />
        </div>
      )}

      {/* Scholarship Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div>
          <p>
            <b>Country:</b> {scholarship.universityCountry}
          </p>
          <p>
            <b>City:</b> {scholarship.universityCity}
          </p>
          <p>
            <b>World Rank:</b> #{scholarship.universityWorldRank}
          </p>
          <p>
            <b>Subject Category:</b> {scholarship.subjectCategory}
          </p>
          <p>
            <b>Degree:</b> {scholarship.degree}
          </p>
          <p>
            <b>Scholarship Type:</b> {scholarship.scholarshipCategory}
          </p>
        </div>

        <div>
          <p>
            <b>Tuition Fees:</b> ${scholarship.tuitionFees}
          </p>
          <p>
            <b>Application Fees:</b> ${scholarship.applicationFees}
          </p>
          <p>
            <b>Service Charge:</b> ${scholarship.serviceCharge}
          </p>
          <p>
            <b>Stipend:</b> {scholarship.stipend || "N/A"}
          </p>
          <p>
            <b>Deadline:</b>{" "}
            {new Date(scholarship.applicationDeadline).toLocaleDateString()}
          </p>
          <p>
            <b>Posted On:</b> {new Date(scholarship.postDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Description */}
      {scholarship.scholarshipDescription && (
        <p className="mt-6 text-gray-700 leading-relaxed">
          {scholarship.scholarshipDescription}
        </p>
      )}

      {/* Apply Button */}
      <div className="mt-8 text-center">
        <Link to={`/apply/${scholarship._id}`}>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-lg">
            Apply for this Scholarship
          </button>
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">User Reviews</h2>

        {reviewsLoading && <p className="text-center">Loading reviews...</p>}
        {reviewsError && (
          <p className="text-center text-red-600">Error loading reviews</p>
        )}
        {!reviewsLoading && !reviewsError && reviews.length === 0 && (
          <p className="text-gray-600 text-center">No reviews yet.</p>
        )}

        {!reviewsLoading && !reviewsError && reviews.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full max-w-2xl"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="border p-6 rounded-xl shadow-md bg-white flex flex-col items-center text-center">
                  <img
                    src={review.reviewerImage || "https://via.placeholder.com/80"}
                    alt={review.userEmail || "Reviewer"}
                    className="w-16 h-16 rounded-full mb-3 border"
                  />
                  <p className="font-bold text-lg">
                    {userNameFromEmail(review.userEmail)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-2">{renderStars(review.rating)}</div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
