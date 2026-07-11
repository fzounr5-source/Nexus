import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Phone } from 'lucide-react';

export const VideoCallPage: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-primary-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Video Call</h1>
            <p className="text-sm text-gray-600">Connect with your investor in a secure mock meeting room.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCallActive((prev) => !prev)}
              className={`rounded-xl px-4 py-2 font-medium text-white transition ${isCallActive ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'}`}
            >
              {isCallActive ? <span className="flex items-center gap-2"><PhoneOff size={18} /> End Call</span> : <span className="flex items-center gap-2"><Phone size={18} /> Start Call</span>}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsVideoOn((prev) => !prev)}
              className={`rounded-xl border px-4 py-2 font-medium transition ${isVideoOn ? 'border-primary-200 bg-primary-50 text-primary-700' : 'border-gray-200 bg-gray-100 text-gray-600'}`}
            >
              {isVideoOn ? <span className="flex items-center gap-2"><Video size={18} /> Video On</span> : <span className="flex items-center gap-2"><VideoOff size={18} /> Video Off</span>}
            </button>
            <button
              onClick={() => setIsAudioOn((prev) => !prev)}
              className={`rounded-xl border px-4 py-2 font-medium transition ${isAudioOn ? 'border-primary-200 bg-primary-50 text-primary-700' : 'border-gray-200 bg-gray-100 text-gray-600'}`}
            >
              {isAudioOn ? <span className="flex items-center gap-2"><Mic size={18} /> Audio On</span> : <span className="flex items-center gap-2"><MicOff size={18} /> Audio Off</span>}
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-primary-100 p-6 text-center">
              <div>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary-700 shadow-sm">
                  <Video size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">You</h3>
                <p className="text-sm text-gray-600">Your camera preview</p>
              </div>
            </div>

            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-secondary-100 bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 text-center">
              <div>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white text-secondary-700 shadow-sm">
                  <Video size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Investor</h3>
                <p className="text-sm text-gray-600">Connected participant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
