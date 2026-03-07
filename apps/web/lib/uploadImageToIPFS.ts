import toast from "react-hot-toast";

/** Ensure the file has a name with extension so IPFS gateway can serve correct Content-Type. */
function fileWithName(file: File): File {
  if (file.name && file.name.includes(".")) return file;
  const ext = file.type === "image/png" ? "png" : file.type === "image/jpeg" || file.type === "image/jpg" ? "jpg" : file.type === "image/gif" ? "gif" : file.type === "image/webp" ? "webp" : "png";
  return new File([file], file.name || `image.${ext}`, { type: file.type });
}

export async function uploadImageToIPFS({ file }: { file: File }): Promise<string | null> {
  const formData = new FormData();
  const named = fileWithName(file);
  formData.append("file", named, named.name);

  try {
    const res = await fetch("https://ipfs.near.social/add", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = (await res.json()) as { cid?: string };
    if (!data?.cid) {
      throw new Error("No CID returned");
    }
    return `https://ipfs.near.social/ipfs/${data.cid}`;
  } catch (err) {
    console.error(err);
    toast.error("Error uploading file");
    return null;
  }
}

/** Upload any file (image or video) to IPFS. */
export async function uploadFileToIPFS({ file }: { file: File }): Promise<string | null> {
  return uploadImageToIPFS({ file });
}
