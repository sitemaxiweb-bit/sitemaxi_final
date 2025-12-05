import { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Pen, Type, RotateCcw } from 'lucide-react';

interface SignatureCaptureProps {
  onSignatureChange: (signatureData: string, signatureType: 'drawn' | 'typed') => void;
  typedName?: string;
}

export function SignatureCapture({ onSignatureChange, typedName = '' }: SignatureCaptureProps) {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [drawnSignature, setDrawnSignature] = useState<string>('');
  const [typedSignature, setTypedSignature] = useState<string>('');

  useEffect(() => {
    if (mode === 'type' && typedSignature) {
      generateTypedSignature(typedSignature);
    }
  }, [typedSignature, mode]);

  const handleClear = () => {
    if (mode === 'draw' && signatureRef.current) {
      signatureRef.current.clear();
      setDrawnSignature('');
    } else {
      setTypedSignature('');
    }
    setIsConfirmed(false);
    onSignatureChange('', mode);
  };

  const handleConfirm = () => {
    if (mode === 'draw' && signatureRef.current) {
      if (signatureRef.current.isEmpty()) {
        alert('Please provide a signature before confirming.');
        return;
      }
      const signatureData = signatureRef.current.toDataURL();
      setDrawnSignature(signatureData);
      setIsConfirmed(true);
      onSignatureChange(signatureData, 'drawn');
    } else if (mode === 'type' && typedSignature.trim()) {
      generateTypedSignature(typedSignature);
      setIsConfirmed(true);
    } else {
      alert('Please provide a signature before confirming.');
    }
  };

  const generateTypedSignature = (text: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.font = '48px "Brush Script MT", cursive';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 20, canvas.height / 2);

      const signatureData = canvas.toDataURL();
      onSignatureChange(signatureData, 'typed');
    }
  };

  const handleModeChange = (newMode: 'draw' | 'type') => {
    if (isConfirmed) {
      const confirmChange = window.confirm('Changing signature mode will reset your current signature. Continue?');
      if (!confirmChange) return;
    }
    setMode(newMode);
    setIsConfirmed(false);
    setDrawnSignature('');
    setTypedSignature('');
    onSignatureChange('', newMode);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="block text-sm font-semibold text-gray-900">
          Signature Method
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleModeChange('draw')}
            disabled={isConfirmed}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'draw'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${isConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Pen className="w-4 h-4" />
            Draw
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('type')}
            disabled={isConfirmed}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'type'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${isConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Type className="w-4 h-4" />
            Type
          </button>
        </div>
      </div>

      {mode === 'draw' ? (
        <div className="space-y-2">
          <div className={`border-2 border-gray-300 rounded-lg bg-white ${isConfirmed ? 'opacity-70' : ''}`}>
            {isConfirmed && drawnSignature ? (
              <div className="p-4">
                <img src={drawnSignature} alt="Signature" className="max-w-full h-auto" />
              </div>
            ) : (
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  className: 'w-full h-40 rounded-lg cursor-crosshair',
                  style: { touchAction: 'none' }
                }}
                backgroundColor="white"
              />
            )}
          </div>
          <p className="text-sm text-gray-600">
            {isConfirmed ? 'Signature confirmed' : 'Sign above using your mouse or touchscreen'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {isConfirmed ? (
            <div className="border-2 border-gray-300 rounded-lg bg-white p-8">
              <p className="text-5xl" style={{ fontFamily: '"Brush Script MT", cursive' }}>
                {typedSignature}
              </p>
            </div>
          ) : (
            <input
              type="text"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              placeholder="Type your full name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
          <p className="text-sm text-gray-600">
            {isConfirmed ? 'Signature confirmed' : 'Type your full name as it will appear as your signature'}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!isConfirmed ? (
          <>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Confirm Signature
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsConfirmed(false);
              handleClear();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Signature
          </button>
        )}
      </div>
    </div>
  );
}
