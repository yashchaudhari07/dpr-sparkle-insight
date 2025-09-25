import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

interface UploadSectionProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  onNavigate: (section: string) => void;
}

const UploadSection = ({ onFilesUploaded, onNavigate }: UploadSectionProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'text/plain': '.txt',
    'application/rtf': '.rtf'
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-error" />;
    if (type.includes('word') || type.includes('document')) return <File className="h-8 w-8 text-primary" />;
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload with progress
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = file.progress + Math.random() * 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...file, progress: 100, status: 'completed' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const completedFiles = files.filter(file => file.status === 'completed');
  const hasFiles = files.length > 0;
  const allCompleted = completedFiles.length === files.length && files.length > 0;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins gradient-text mb-4">
            Upload DPR Documents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your DPR documents for AI-powered quality assessment and risk analysis. 
            Supports PDF, Word documents, and text files.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="glass glass-hover mb-8 animate-scale-in">
          <CardContent className="p-8">
            <div
              className={`upload-area p-12 rounded-xl text-center transition-all duration-300 ${
                isDragOver ? 'drag-over' : ''
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mb-6">
                <Upload className="h-16 w-16 mx-auto text-primary/70 mb-4 animate-float" />
                <h3 className="text-xl font-semibold font-poppins mb-2">
                  {isDragOver ? 'Drop your files here' : 'Upload DPR Documents'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <Button
                  variant="outline"
                  className="glass-hover border-primary/30 hover:border-primary/60"
                >
                  Choose Files
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Supported formats: PDF, DOC, DOCX, TXT, RTF</p>
                <p>Maximum file size: 10MB per file</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={Object.keys(acceptedTypes).join(',')}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* File List */}
        {hasFiles && (
          <Card className="glass glass-hover animate-slide-in-up">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold font-poppins mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Uploaded Files ({files.length})
              </h3>
              
              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center p-4 glass rounded-lg animate-scale-in">
                    <div className="mr-4">
                      {getFileIcon(file.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center space-x-2 ml-4">
                          {file.status === 'uploading' && (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          )}
                          {file.status === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                          {file.status === 'error' && (
                            <AlertCircle className="h-4 w-4 text-error" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="hover:bg-error/10 hover:text-error"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                      
                      <Progress 
                        value={file.progress} 
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {allCompleted && (
                <div className="mt-6 p-4 glass rounded-lg border border-success/30 animate-scale-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-2" />
                      <span className="font-medium text-success">
                        All files uploaded successfully!
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        onFilesUploaded(completedFiles);
                        onNavigate('analysis');
                      }}
                      className="bg-success hover:bg-success/90 text-success-foreground shadow-success/30 shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Start Analysis
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default UploadSection;