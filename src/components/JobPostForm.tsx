"use client";

import { useState, useRef } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";

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
  ImageUrl: string;
}

export function JobPostForm() {
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
    ImageUrl: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPaid, setIsPaid] = useState(false);

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

  const handleSubmit = async () => {
    if (!isPaid) {
      alert("Please complete the payment first");
      return;
    }

    try {
      const imageUrl = image
        ? await uploadImage(image)
        : "https://i.ibb.co/6bWJH3h/Company-logo.png";

      const response = await fetch(
        "https://aimljobs-backend.vercel.app/v1/job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            ImageUrl: imageUrl,
            paypalOrderId: localStorage.getItem("lastPaypalOrderId"),
            featured: true,
          }),
        }
      );

      if (response.ok) {
        localStorage.removeItem("lastPaypalOrderId");
        alert("Job posted successfully!");
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post job. Please try again.");
    }
  };

   /* eslint-disable @typescript-eslint/no-explicit-any */
  const handlePayPalApprove = (data: any, actions: any) => {
     /* eslint-disable @typescript-eslint/no-explicit-any */
    return actions.order.capture().then(async (details: any) => {
      try {
        localStorage.setItem("lastPaypalOrderId", details.id);
        setIsPaid(true);
        console.log("Payment completed. Transaction ID:", details.id);
      } catch (error) {
        console.error("Payment error:", error);
        alert("Payment failed. Please try again or contact support.");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[60%] mx-auto mb-20">
      {/* Job Details Section */}
      <div className="col-span-2 mb-6">
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
      </div>

      {/* Job Title */}
      <div className="p-4">
        <label
          htmlFor="JobTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title *
        </label>
        <input
          type="text"
          id="JobTitle"
          name="JobTitle"
          value={formData.JobTitle}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      {/* Team */}
      <div className="p-4">
        <label
          htmlFor="Team"
          className="block text-sm font-medium text-gray-700"
        >
          Team *
        </label>
        <select
          id="Team"
          name="Team"
          value={formData.Team}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
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
      </div>

      {/* Location */}
      <div className="p-4">
        <label
          htmlFor="Location"
          className="block text-sm font-medium text-gray-700"
        >
          Location Type *
        </label>
        <select
          id="Location"
          name="Location"
          value={formData.Location}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        >
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>
      </div>

      {/* Country */}
      <div className="p-4">
        <label
          htmlFor="Country"
          className="block text-sm font-medium text-gray-700"
        >
          Country *
        </label>
        <input
          type="text"
          id="Country"
          name="Address"
          value={formData.Address}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      {/* Job Type */}
      <div className="p-4">
        <label
          htmlFor="JobType"
          className="block text-sm font-medium text-gray-700"
        >
          Job Type *
        </label>
        <select
          id="JobType"
          name="JobType"
          value={formData.JobType}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        >
          <option value="Fulltime">Full-time</option>
          <option value="Contract">Contract</option>
          <option value="Parttime">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Keywords/Skills */}
      <div className="p-4">
        <label
          htmlFor="Keywords"
          className="block text-sm font-medium text-gray-700"
        >
          Keywords/Skills *
        </label>
        <input
          type="text"
          id="Keywords"
          name="Keywords"
          value={formData.Keywords}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="e.g., Python, PyTorch, TensorFlow"
          required
        />
      </div>

      {/* Job Description */}
      <div className="col-span-2 p-4">
        <label
          htmlFor="JobDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description *
        </label>
        <textarea
          id="JobDescription"
          name="JobDescription"
          value={formData.JobDescription}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          rows={10}
          required
        />
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
      <div className="col-span-2 p-4">
        <label
          htmlFor="ApplicationURLrecommendedOrEmailAddress2"
          className="block text-sm font-medium text-gray-700"
        >
          Application URL or Email *
        </label>
        <input
          type="text"
          id="ApplicationURLrecommendedOrEmailAddress2"
          name="ApplicationURLrecommendedOrEmailAddress2"
          value={formData.ApplicationURLrecommendedOrEmailAddress2}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="https://... or email@company.com"
          required
        />
      </div>

      {/* Company Section */}
      <div className="col-span-2 mt-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Company Details</h2>
      </div>

      {/* Company Name */}
      <div className="p-4">
        <label
          htmlFor="CompanyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name *
        </label>
        <input
          type="text"
          id="CompanyName"
          name="CompanyName"
          value={formData.CompanyName}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      {/* Company Website */}
      <div className="p-4">
        <label
          htmlFor="CompanyWebsite"
          className="block text-sm font-medium text-gray-700"
        >
          Company Website *
        </label>
        <input
          type="url"
          id="CompanyWebsite"
          name="CompanyWebsite"
          value={formData.CompanyWebsite}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      {/* Company Logo */}
      <div className="p-4">
        <label className="block text-sm font-medium text-gray-700">
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
      <div className="p-4">
        <label
          htmlFor="Twitter"
          className="block text-sm font-medium text-gray-700"
        >
          Twitter Handle
        </label>
        <input
          type="text"
          id="Twitter"
          name="Twitter"
          value={formData.Twitter}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="@company"
        />
      </div>

      {/* LinkedIn */}
      <div className="p-4">
        <label
          htmlFor="Linkedin"
          className="block text-sm font-medium text-gray-700"
        >
          LinkedIn URL
        </label>
        <input
          type="url"
          id="Linkedin"
          name="Linkedin"
          value={formData.Linkedin}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="https://linkedin.com/company/..."
        />
      </div>

      {/* Contact Section */}
      <div className="col-span-2 mt-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      </div>

      {/* Your Name */}
      <div className="p-4">
        <label
          htmlFor="YourName"
          className="block text-sm font-medium text-gray-700"
        >
          Your Name *
        </label>
        <input
          type="text"
          id="YourName"
          name="YourName"
          value={formData.YourName}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      {/* Your Email */}
      <div className="p-4">
        <label
          htmlFor="YourCompanyEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Your Company Email *
        </label>
        <input
          type="email"
          id="YourCompanyEmail"
          name="YourCompanyEmail"
          value={formData.YourCompanyEmail}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      {/* Payment Section */}
      <div className="col-span-2 p-4 mt-8">
        <h2 className="text-xl font-semibold mb-4">Payment - $169</h2>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <p className="text-sm text-gray-600">
            Your job posting will be live for 30 days and includes:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
            <li>Featured placement on the homepage</li>
            <li>Included in our weekly newsletter</li>
            <li>Shared on our social media channels</li>
            <li>Access to our AI/ML talent pool</li>
          </ul>

          {!isPaid && (
            <div className="mt-6">
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: "169.00",
                            currency_code: "USD",
                          },
                          description: "Job Posting on AiMLJobs",
                        },
                      ],
                    });
                  }}
                  onApprove={handlePayPalApprove}
                />
              </PayPalScriptProvider>
            </div>
          )}

          {isPaid && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
              ✓ Payment completed successfully
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2 p-4">
        <button
          className={`w-full py-2 px-4 rounded-md ${
            isPaid
              ? "bg-purple text-white hover:bg-purple-dark"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isPaid}
        >
          {isPaid ? "Submit Job Posting" : "Complete Payment to Submit"}
        </button>
      </div>
    </div>
  );
}
