"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Props {
  onUpload: (url: string) => void;
  uploadPreset: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function CloudinaryUploadButton({ onUpload, uploadPreset }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [widget, setWidget] = useState<any>(null);
  
  console.log("CloudinaryUploadButton component rendered with preset:", uploadPreset);

  useEffect(() => {
    // Load Cloudinary widget script if not already loaded
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      script.onload = () => {
        console.log("📦 Cloudinary widget script loaded");
        initializeWidget();
      };
      document.head.appendChild(script);
    } else {
      initializeWidget();
    }
  }, [uploadPreset]);

  const initializeWidget = () => {
    if (!window.cloudinary) {
      console.error("❌ Cloudinary not available");
      return;
    }

    try {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dyvovgpwn',
          uploadPreset: uploadPreset,
          folder: 'ideator',
          sources: ['local', 'camera', 'url'],
          multiple: false,
          clientAllowedFormats: ['image'],
          maxFiles: 1,
        },
        (error: any, result: any) => {
          console.log("🎪 Cloudinary widget callback fired!");
          console.log("📊 Error:", error);
          console.log("📊 Result:", result);
          
          if (error) {
            console.error("🚨 Upload error:", error);
            return;
          }

          if (result && result.event === "success") {
            console.log("🎉 Upload successful!");
            console.log("📷 Image info:", result.info);
            console.log("🔗 Secure URL:", result.info.secure_url);
            
            if (result.info.secure_url) {
              onUpload(result.info.secure_url);
            }
          }

          // Log all events for debugging
          if (result && result.event) {
            console.log(`📡 Widget event: ${result.event}`, result);
          }
        }
      );
      
      setWidget(myWidget);
      console.log("✅ Cloudinary widget initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Cloudinary widget:", error);
    }
  };

  const openWidget = () => {
    console.log("🚀 Opening Cloudinary widget...");
    if (widget) {
      widget.open();
    } else {
      console.error("❌ Widget not initialized");
    }
  };

  // Fallback direct upload method (keep this as backup)
  const testDirectUpload = async (file: File) => {
    setIsLoading(true);
    console.log("🧪 Testing direct upload with fetch API...");
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'ideator');
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dyvovgpwn/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const result = await response.json();
      console.log("🧪 Direct upload result:", result);
      
      if (result.secure_url) {
        console.log("✅ Direct upload SUCCESS!", result.secure_url);
        onUpload(result.secure_url);
      } else {
        console.log("❌ Direct upload failed:", result);
      }
    } catch (error) {
      console.error("🧪 Direct upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button 
        type="button" 
        onClick={openWidget}
        className="bg-[#0a2449] text-[#efede7] w-full hover:bg-[#0a2449]/90"
      >
        Upload Image
      </Button>
      
      {/* Keep direct upload as fallback for testing */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            testDirectUpload(file);
          }
        }}
        style={{ display: 'none' }}
        id="direct-upload-fallback"
      />
      <Button
        type="button"
        onClick={() => document.getElementById('direct-upload-fallback')?.click()}
        disabled={isLoading}
        variant="outline"
        className="w-full text-xs"
      >
        {isLoading ? "Uploading..." : "Fallback: Direct Upload"}
      </Button>
    </div>
  );
} 