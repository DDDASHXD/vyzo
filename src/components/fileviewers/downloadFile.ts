import { iFile } from "@/hooks/useFiles";

const downloadFile = async (currentFile: iFile, linkRef: any) => {
  if (!currentFile?.url || !currentFile?.name) return;

  try {
    const response = await fetch(currentFile.url);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    linkRef.current.href = url;
    linkRef.current.download = currentFile.name;
    linkRef.current.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed", error);
  }
};

export default downloadFile;
