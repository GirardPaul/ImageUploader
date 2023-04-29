export const saveFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("http://localhost:3000/api/documents/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data && data.url;
};
