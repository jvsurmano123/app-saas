export default function MedicalRecordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {children}
    </div>
  );
} 