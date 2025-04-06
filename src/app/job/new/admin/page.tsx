"use client";

import { AdminJobPostForm } from "./_components/AdminJobPostForm";
import { AdminHeader } from "./_components/AdminHeader";
import { TabView } from "./_components/TabView";

export default function NewJobPage() {
  return (
    <div className="lg:max-w-5xl mx-auto mt-8 md:mt-12 md:px-6 xl:px-0">
      <AdminHeader />
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Job</h2>
      <AdminJobPostForm />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>
        <TabView />
      </div>
    </div>
  );
}
