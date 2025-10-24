'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [ascii, setAscii] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create form data to send to backend
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);

    // Send to API route
    const res = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setAscii(data.ascii);
    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">🖼️ Upload Image to ASCII</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="border p-2 mb-4"
      />

      {loading ? (
        <p>Converting...</p>
      ) : ascii ? (
        <pre className="bg-white text-black p-4 overflow-auto max-w-full max-h-[70vh] whitespace-pre border border-gray-300">
          {ascii}
        </pre>
      ) : null}
    </main>
  );
}
