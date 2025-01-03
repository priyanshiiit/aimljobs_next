"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fetchUnlistedJobs, updateJobSchedule, deleteJob } from "@/lib/api";
import { FiArrowUpRight, FiCalendar, FiCheck, FiX } from "react-icons/fi";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Job } from "@/types";

interface ScheduledJobsProps {
  refreshTrigger: number;
}

export function ScheduledJobs({ refreshTrigger }: ScheduledJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUnlistedJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching unlisted jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [refreshTrigger]);

  const handleScheduleUpdate = async (jobId: string, newDate: Date) => {
    try {
      await updateJobSchedule(jobId, newDate.toISOString());
      // Refresh the jobs list
      const data = await fetchUnlistedJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error updating job schedule:", error);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(jobId);
      // Refresh the jobs list
      const data = await fetchUnlistedJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
      </div>
    );
  }

  const now = new Date();

  const unscheduledJobs = jobs.filter((job) => !job.Timestamp);
  const scheduledJobs = jobs.filter((job) => {
    if (!job.Timestamp) return false;
    const jobDate = new Date(job.Timestamp);
    return jobDate > now;
  });

  return (
    <div className="space-y-8">
      {/* Scheduled Jobs Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Scheduled Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scheduledJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onSchedule={handleScheduleUpdate}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      </div>

      {/* Unscheduled Jobs Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Unscheduled Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {unscheduledJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onSchedule={handleScheduleUpdate}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface JobCardProps {
  job: Job;
  onSchedule: (jobId: string, date: Date) => void;
  onDelete: (jobId: string) => void;
}

function JobCard({ job, onSchedule, onDelete }: JobCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    job.Timestamp ? new Date(job.Timestamp) : null
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsEditing(true);
  };

  const handleScheduleConfirm = () => {
    if (selectedDate) {
      onSchedule(job._id, selectedDate);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={job.LogoURL || "/company-logo-placeholder.png"}
              alt={`${job.CompanyName} logo`}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {job.JobTitle}
            </h3>
            <p className="text-gray-600">{job.CompanyName}</p>
          </div>
          <Link
            href={job.ApplicationURLrecommendedOrEmailAddress2}
            className="text-purple hover:text-purple-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiArrowUpRight size={20} />
          </Link>
        </div>

        <div className="mt-4 space-y-4">
          {job.Timestamp && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="inline-block bg-purple-100 text-purple px-2 py-1 rounded-full text-xs">
                Scheduled for:{" "}
                {formatDistanceToNow(new Date(job.Timestamp), {
                  addSuffix: true,
                })}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
              {job.Location}
            </span>
            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
              {job.JobType}
            </span>
            {job.featured && (
              <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-grow flex items-center space-x-2">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholderText="Select date and time"
                customInput={
                  <button className="flex items-center space-x-2 text-purple">
                    <FiCalendar />
                    <span>Schedule</span>
                  </button>
                }
              />
              {isEditing && (
                <button
                  onClick={handleScheduleConfirm}
                  className="p-2 text-green-600 hover:text-green-800"
                  title="Confirm schedule"
                >
                  <FiCheck size={20} />
                </button>
              )}
            </div>
            <button
              onClick={() => onDelete(job._id)}
              className="p-2 text-red-600 hover:text-red-800"
              title="Delete job"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
