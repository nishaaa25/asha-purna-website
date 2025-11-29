"use client";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { useState, useEffect } from "react";
import CareerModal from "@/components/CareerModal";

export default function JobOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch career data on component mount
  useEffect(() => {
    fetchCareerData();
  }, []);

  const fetchCareerData = async () => {
    try {
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/career",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-version": "v1",
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();

      if (result._status && result._data) {
        setJobOpenings(result._data.getCareers || []);
        setPositions(result._data.getPositions || []);
        setQualifications(result._data.getQualifications || []);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowCareerModal(true);
  };

  return (
    <>
    <div className="w-full relative pb-15 md:pb-[70px] lg:pb-[100px] bg-cream-600 flex-center flex-col">
      <div className="w-full relative lg:w-8/12">
        <SectionHeader
            heading="Current"
          spanText="Openings"
          desc="Discover opportunities that align with your skills and aspirations. Join us in building the future of real estate."
        />
      </div>

        {/* JOB LISTINGS */}
        <div className="w-full px-[22px] md:px-12 lg:px-20 mt-6 md:mt-10">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-sm md:text-base">Loading job openings...</p>
            </div>
          ) : jobOpenings.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Job Title and Experience */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4 gap-2 md:gap-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
                      {job.title}
                    </h3>
                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-orange-100 text-orange-600 rounded-md text-xs md:text-sm font-medium whitespace-nowrap">
                      {job.experience}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-6 text-xs sm:text-sm lg:text-base text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate">{job.job_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="truncate">{job.number_of_vacancy} Vacancies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{job.location}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Skills Required</h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {job.career_skills && job.career_skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs md:text-sm"
                        >
                          {skill.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex justify-center sm:justify-end">
                    <button
                      onClick={() => handleApplyClick(job.id)}
                      className="w-full sm:w-auto px-6 py-2 md:py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm md:text-base rounded-md transition-colors cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 text-base md:text-lg">No job openings available at the moment.</p>
              <p className="text-gray-500 text-xs md:text-sm mt-2">Please check back later for new opportunities.</p>
            </div>
          )}
        </div>
    </div>

      {/* Career Application Modal */}
      {showCareerModal && (
        <CareerModal
          isOpen={showCareerModal}
          onClose={() => setShowCareerModal(false)}
          positions={positions}
          qualifications={qualifications}
          jobId={selectedJobId}
        />
      )}
    </>
  );
}
