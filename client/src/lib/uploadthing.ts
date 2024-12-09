import type { OurFileRouter } from "@/components/config/server-uploadthing";
import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: `${import.meta.env.VITE_BACKEND_API_URL}/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: `${import.meta.env.VITE_BACKEND_API_URL}/api/uploadthing`,
});

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>({
    url: `${import.meta.env.VITE_BACKEND_API_URL}/api/uploadthing`,
  });
