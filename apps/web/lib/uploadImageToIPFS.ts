import toast from "react-hot-toast";

/**
 * Upload matches dokan.gg: send the file as the raw request body with Content-Type
 * set to the file's MIME type so the IPFS gateway can serve the CID with correct type.
 */
export async function uploadImageToIPFS({ file }: { file: File }): Promise<string | null> {
  try {
    const res = await fetch("https://ipfs.near.social/add", {
      method: "POST",
      body: file,
      headers: {
        Accept: "application/json",
        "Content-Type": file.type || "application/octet-stream",
      },
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
