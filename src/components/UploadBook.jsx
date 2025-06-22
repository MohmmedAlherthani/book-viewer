import React, { useState } from "react";
import styled from "styled-components";
import { uploadBook } from "../api";

const UploadContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(3)} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;
const FileInput = styled.input`
  flex: 1;
`;
const UploadButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const ErrorText = styled.span`
  color: red;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export default function UploadBook({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    setFile(e.target.files[0] || null);
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        const book = await uploadBook(base64, file.name);
        onUpload(book);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <UploadContainer>
      <FileInput
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <UploadButton onClick={handleUpload} disabled={!file || loading}>
        {loading ? "جاري الرفع…" : "رفع ومعالجة"}
      </UploadButton>
      {error && <ErrorText>{error}</ErrorText>}
    </UploadContainer>
  );
}
