"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FiArrowUpRight, FiCalendar, FiCheck, FiX } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Job } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AdminJobCardProps {
  job: Job;
  onSchedule: (jobId: string, date: Date) => void;
  onDelete: (jobId: string) => void;
}

export function AdminJobCard({ job, onSchedule, onDelete }: AdminJobCardProps) {
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
            <Link
              href={job.CompanyWebsite}
              className="text-gray-600 hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.CompanyName}
            </Link>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/job/new/admin/edit/${job._id}`}
              className="text-blue-600 hover:text-blue-800"
              title="Edit job"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaRegEdit size={20} />
            </Link>
            <Link
              href={job.ApplicationURLrecommendedOrEmailAddress2}
              className="text-purple hover:text-purple-dark"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit application URL"
            >
              <FiArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {job.Timestamp && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="inline-block bg-purple-100 text-purple px-2 py-1 rounded-full text-xs">
                {new Date(job.Timestamp) > new Date()
                  ? `Scheduled for: ${formatDistanceToNow(
                      new Date(job.Timestamp),
                      { addSuffix: true }
                    )}`
                  : `Published: ${formatDistanceToNow(new Date(job.Timestamp), {
                      addSuffix: true,
                    })}`}
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
