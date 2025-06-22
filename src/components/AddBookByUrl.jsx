import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchBooks } from '../api';

const UrlForm = styled.div`
  margin: ${({ theme }) => theme.spacing(3)} 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const UrlInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const ErrorText = styled.span`
  color: red;
  align-self: center;
`;

export default function AddBookByUrl({ onAdd }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    setError('');
    if (!url.trim()) return setError('أدخل رابط PDF');
    setLoading(true);
    try {
      // fetchBooks can take an array – we pass one URL
      const [book] = await fetchBooks([url.trim()]);
      onAdd(book);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UrlForm>
      <UrlInput
        type="url"
        placeholder="https://example.com/file.pdf"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <AddButton onClick={handleAdd} disabled={loading}>
        {loading ? 'جاري الإضافة…' : 'أضف بالرابط'}
      </AddButton>
      {error && <ErrorText>{error}</ErrorText>}
    </UrlForm>
  );
}
