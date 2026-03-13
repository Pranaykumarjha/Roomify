import { CheckCircle2, ImageIcon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router';
import { PROGRESS_INTERVAL_MS, PROGRESS_STEP, REDIRECT_DELAY_MS } from '../lib/constants';

interface AuthContext {
  isSignedIn: boolean;
}

interface UploadProps {
  onComplete: (data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isSignedIn } = useOutletContext<AuthContext>();

  const processFile = (files: FileList | null) => {
    if (!files || files.length === 0 || !isSignedIn) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setProgress(0);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + PROGRESS_STEP;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete(base64);
            }, REDIRECT_DELAY_MS);
            return 100;
          }
          return newProgress;
        });
      }, PROGRESS_INTERVAL_MS);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isSignedIn) return;
    const files = e.dataTransfer.files;
    processFile(files);
  };

  return (
    <div className='upload'>
      {!file ? (
        <div className={`dropzone ${isDragging ? 'isDragging' : ''}`}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDrop={handleDrop}>
          <input type="file" className="drop-input" accept='.jpeg,.jpg,.png'
            disabled={!isSignedIn} onChange={(e) => processFile(e.target.files)} />
          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <p>
              {isSignedIn ? (
                "Click to upload drag & drop"
              ) : ("Sign Up or Sign In with puter to upload")}
            </p>
            <p className="help">
              Maximum File size is 50mb.
            </p>
          </div>
        </div>
      ) :
        (
          <div className='upload-status'>
            <div className="status-content">
              <div className="status-icon">
                {progress  === 100 ? (
                  <CheckCircle2 className='check' />
                ) :
                  (
                    <ImageIcon className='image' />
                  )}
              </div>
              <h3>{file.name}</h3>
              <div className="progress">
                <div className="bar" style={{width : `${progress}%`}}/>
                <p className="status-text">
                  {progress < 100 ? 'Analyzing floor plan...' : 'Redirecting...'}
                </p>

              </div>

            </div>
          </div>
        )}
    </div>
  )
}

export default Upload
