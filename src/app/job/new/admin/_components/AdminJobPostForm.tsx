"use client";

import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface FormData {
  JobTitle: string;
  Team: string;
  Address: string;
  Location: string;
  JobType: string;
  JobDescription: string;
  Keywords: string;
  ApplicationURLrecommendedOrEmailAddress2: string;
  CompanyName: string;
  CompanyWebsite: string;
  Twitter: string;
  Linkedin: string;
  YourName: string;
  YourCompanyEmail: string;
  LogoURL: string;
}

export function AdminJobPostForm() {
  const [formData, setFormData] = useState<FormData>({
    JobTitle: "",
    Team: "Engineering",
    Address: "",
    Location: "Remote",
    JobType: "Fulltime",
    JobDescription: "",
    Keywords: "",
    ApplicationURLrecommendedOrEmailAddress2: "",
    CompanyName: "",
    CompanyWebsite: "",
    Twitter: "",
    Linkedin: "",
    YourName: "",
    YourCompanyEmail: "",
    LogoURL: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePaste = async (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) setImage(blob);
      }
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      return data.data.image.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "https://i.ibb.co/6bWJH3h/Company-logo.png";
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Required fields validation
    const requiredFields: (keyof FormData)[] = [
      "JobTitle",
      "Team",
      "Address",
      "Location",
      "JobType",
      "JobDescription",
      "Keywords",
      "ApplicationURLrecommendedOrEmailAddress2",
      "CompanyName",
      "CompanyWebsite",
      "YourName",
      "YourCompanyEmail",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (
      formData.YourCompanyEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.YourCompanyEmail)
    ) {
      newErrors.YourCompanyEmail = "Please enter a valid email address";
    }

    // URL validation
    if (
      formData.CompanyWebsite &&
      !/^https?:\/\/.*/.test(formData.CompanyWebsite)
    ) {
      newErrors.CompanyWebsite =
        "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = image
        ? await uploadImage(image)
        : "https://i.ibb.co/6bWJH3h/Company-logo.png";

      const response = await fetch("/api/admin/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          LogoURL: imageUrl,
          featured: isFeatured,
        }),
      });

      if (response.ok) {
        toast.success(
          "Job posted successfully! It will be live in a few minutes."
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Details Section */}
        <div className="col-span-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Details</h2>
        </div>

        {/* Job Title */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="JobTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Title *
          </label>
          <input
            type="text"
            id="JobTitle"
            name="JobTitle"
            value={formData.JobTitle}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.JobTitle ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.JobTitle ? "true" : undefined}
          />
          {errors.JobTitle && (
            <p className="mt-1 text-sm text-red-500">{errors.JobTitle}</p>
          )}
        </div>

        {/* Team */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="Team"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Team *
          </label>
          <select
            id="Team"
            name="Team"
            value={formData.Team}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.Team ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.Team ? "true" : undefined}
          >
            <option value="Engineering">Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Research">Research</option>
            <option value="Operations">Operations</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Other">Other</option>
          </select>
          {errors.Team && (
            <p className="mt-1 text-sm text-red-500">{errors.Team}</p>
          )}
        </div>

        {/* Location */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="Location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location Type *
          </label>
          <select
            id="Location"
            name="Location"
            value={formData.Location}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.Location ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.Location ? "true" : undefined}
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
          {errors.Location && (
            <p className="mt-1 text-sm text-red-500">{errors.Location}</p>
          )}
        </div>

        {/* Country */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="Country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country *
          </label>
          <input
            type="text"
            id="Country"
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.Address ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.Address ? "true" : undefined}
          />
          {errors.Address && (
            <p className="mt-1 text-sm text-red-500">{errors.Address}</p>
          )}
        </div>

        {/* Job Type */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="JobType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Type *
          </label>
          <select
            id="JobType"
            name="JobType"
            value={formData.JobType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.JobType ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.JobType ? "true" : undefined}
          >
            <option value="Fulltime">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Parttime">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.JobType && (
            <p className="mt-1 text-sm text-red-500">{errors.JobType}</p>
          )}
        </div>

        {/* Keywords/Skills */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="Keywords"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Keywords/Skills *
          </label>
          <input
            type="text"
            id="Keywords"
            name="Keywords"
            value={formData.Keywords}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.Keywords ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.Keywords ? "true" : undefined}
            placeholder="e.g., Python, PyTorch, TensorFlow"
          />
          {errors.Keywords && (
            <p className="mt-1 text-sm text-red-500">{errors.Keywords}</p>
          )}
        </div>

        {/* Job Description - Full Width */}
        <div className="col-span-full">
          <label
            htmlFor="JobDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Description *
          </label>
          <textarea
            id="JobDescription"
            name="JobDescription"
            value={formData.JobDescription}
            onChange={handleInputChange}
            rows={10}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.JobDescription ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.JobDescription ? "true" : undefined}
          />
          {errors.JobDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.JobDescription}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Markdown formatting is supported.{" "}
            <a
              href="https://markdownlivepreview.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple hover:text-purple-dark"
            >
              Preview your markdown here
            </a>
          </p>
        </div>

        {/* Application URL */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="ApplicationURLrecommendedOrEmailAddress2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Application URL or Email *
          </label>
          <input
            type="text"
            id="ApplicationURLrecommendedOrEmailAddress2"
            name="ApplicationURLrecommendedOrEmailAddress2"
            value={formData.ApplicationURLrecommendedOrEmailAddress2}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.ApplicationURLrecommendedOrEmailAddress2
                ? "border-red-500"
                : "border-gray-300"
            }`}
            data-error={
              errors.ApplicationURLrecommendedOrEmailAddress2
                ? "true"
                : undefined
            }
            placeholder="https://... or email@company.com"
          />
          {errors.ApplicationURLrecommendedOrEmailAddress2 && (
            <p className="mt-1 text-sm text-red-500">
              {errors.ApplicationURLrecommendedOrEmailAddress2}
            </p>
          )}
        </div>

        {/* Company Section */}
        <div className="col-span-full mt-8 mb-2">
          <h2 className="text-xl font-semibold mb-2">Company Details</h2>
        </div>

        {/* Company Name */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="CompanyName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Name *
          </label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            value={formData.CompanyName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.CompanyName ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.CompanyName ? "true" : undefined}
          />
          {errors.CompanyName && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyName}</p>
          )}
        </div>

        {/* Company Website */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="CompanyWebsite"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Website *
          </label>
          <input
            type="url"
            id="CompanyWebsite"
            name="CompanyWebsite"
            value={formData.CompanyWebsite}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.CompanyWebsite ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.CompanyWebsite ? "true" : undefined}
          />
          {errors.CompanyWebsite && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyWebsite}</p>
          )}
        </div>

        {/* Company Logo */}
        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo
          </label>
          <div
            className="mt-1 p-4 border-2 border-dashed rounded-md cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onPaste={handlePaste}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {image ? (
              <Image
                alt="Preview"
                src={URL.createObjectURL(image)}
                className="max-h-32 mx-auto"
              />
            ) : (
              <p className="text-center text-gray-500">
                Click to upload or paste an image
              </p>
            )}
          </div>
        </div>

        {/* Social Media */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="Twitter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Twitter Handle
          </label>
          <input
            type="text"
            id="Twitter"
            name="Twitter"
            value={formData.Twitter}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.Twitter ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.Twitter ? "true" : undefined}
            placeholder="@company"
          />
          {errors.Twitter && (
            <p className="mt-1 text-sm text-red-500">{errors.Twitter}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="Linkedin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            LinkedIn URL
          </label>
          <input
            type="url"
            id="Linkedin"
            name="Linkedin"
            value={formData.Linkedin}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.Linkedin ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.Linkedin ? "true" : undefined}
            placeholder="https://linkedin.com/company/..."
          />
          {errors.Linkedin && (
            <p className="mt-1 text-sm text-red-500">{errors.Linkedin}</p>
          )}
        </div>

        {/* Contact Section */}
        <div className="col-span-full mt-8 mb-2">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        </div>

        {/* Your Name */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="YourName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name *
          </label>
          <input
            type="text"
            id="YourName"
            name="YourName"
            value={formData.YourName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.YourName ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.YourName ? "true" : undefined}
          />
          {errors.YourName && (
            <p className="mt-1 text-sm text-red-500">{errors.YourName}</p>
          )}
        </div>

        {/* Your Email */}
        <div className="col-span-full md:col-span-1">
          <label
            htmlFor="YourCompanyEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Company Email *
          </label>
          <input
            type="email"
            id="YourCompanyEmail"
            name="YourCompanyEmail"
            value={formData.YourCompanyEmail}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple focus:border-purple ${
              errors.YourCompanyEmail ? "border-red-500" : "border-gray-300"
            }`}
            data-error={errors.YourCompanyEmail ? "true" : undefined}
          />
          {errors.YourCompanyEmail && (
            <p className="mt-1 text-sm text-red-500">
              {errors.YourCompanyEmail}
            </p>
          )}
        </div>

        {/* Featured Job Toggle */}
        <div className="col-span-full mt-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 text-purple focus:ring-purple border-gray-300 rounded"
            />
            <label
              htmlFor="featured"
              className="ml-2 block text-sm text-gray-900"
            >
              Featured Job (appears at the top of listings)
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full mt-8 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-md text-base font-medium flex items-center justify-center space-x-2 bg-purple text-white hover:bg-purple-dark transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Job Posting"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
