export const saveFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("https://image-uploader-five-rho.vercel.app/api/documents/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data && data.url;
};
