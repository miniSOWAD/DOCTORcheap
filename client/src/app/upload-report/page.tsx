import ReportUploadForm from '@/components/common/forms/ReportUploadForm';

export default function UploadReportPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Upload Report</h1>
      <ReportUploadForm />
    </div>
  );
}