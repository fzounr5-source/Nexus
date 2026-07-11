import React, { useRef, useState } from 'react';
import { Upload, FileText, PenTool, CheckCircle2, Clock3, BadgeCheck } from 'lucide-react';

type StatusType = 'Draft' | 'In Review' | 'Signed';

const statusStyles: Record<StatusType, string> = {
  Draft: 'bg-gray-100 text-gray-700',
  'In Review': 'bg-amber-100 text-amber-700',
  Signed: 'bg-green-100 text-green-700',
};

export const DocumentChamberPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [status, setStatus] = useState<StatusType>('Draft');
  const [isDrawing, setIsDrawing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Document Chamber</h1>
              <p className="text-sm text-gray-600">Upload documents, review them, and capture a signature for your deals.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 font-medium text-white transition hover:bg-primary-700">
                <Upload size={18} />
                Upload PDF
                <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Document Preview</h2>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}>
                {status}
              </span>
            </div>

            {previewUrl ? (
              <div className="min-h-[420px] rounded-xl border border-gray-200 bg-gray-50 p-3">
                <iframe src={previewUrl} title="PDF Preview" className="h-[400px] w-full rounded-lg" />
              </div>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
                <FileText size={48} className="mb-3 text-gray-400" />
                <p className="text-gray-600">Upload a PDF to preview it here.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Document Status</h2>
              <div className="flex flex-wrap gap-3">
                {(['Draft', 'In Review', 'Signed'] as StatusType[]).map((value) => (
                  <button
                    key={value}
                    onClick={() => setStatus(value)}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${status === value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <PenTool size={18} className="text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">Mock E-Signature</h2>
              </div>

              <canvas
                ref={canvasRef}
                width={320}
                height={140}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full rounded-xl border border-gray-300 bg-white"
              />

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setStatus('Signed')}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
                >
                  <CheckCircle2 size={18} /> Sign Document
                </button>
                <button
                  onClick={clearSignature}
                  className="rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
