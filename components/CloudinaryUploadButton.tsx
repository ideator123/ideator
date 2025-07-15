"use client";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface Props {
  onUpload: (url: string) => void;
  uploadPreset: string;
}

export default function CloudinaryUploadButton({ onUpload, uploadPreset }: Props) {
  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1, folder: "ideator" }}
      onUpload={(results: CldUploadWidgetResults) => {
        if (results.event === "success") {
          const url = (results.info as any).secure_url as string;
          onUpload(url);
        }
      }}
    >
      {({ open }) => (
        <Button type="button" onClick={() => open?.()} className="bg-[#0a2449] text-[#efede7] w-full hover:bg-[#0a2449]/90">
          Upload Image
        </Button>
      )}
    </CldUploadWidget>
  );
} 