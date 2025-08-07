import InstallButton from "@/components/install-button";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-[450px] relative">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Badge</h3>
          <h4 className="text-sm text-muted-foreground">
            A beautiful badge component
          </h4>
        </div>
        <InstallButton componentCode="badge" />
      </div>
      <div className="flex items-center justify-center min-h-[400px] relative">
        {/* <DataTable columns={columns} data={tableData} /> */}
      </div>
    </div>
  );
}
