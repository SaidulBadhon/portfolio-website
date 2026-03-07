"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const isImageFile = (file: File) => file.type.startsWith("image/");
const isVideoFile = (file: File) => file.type.startsWith("video/");

type DropzoneProps = {
  accept?: string;
  multiple?: boolean;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  /** For single file: show existing URL as "current" and allow clear. */
  existingUrl?: string | null;
  /** Called when user clears and there was an existingUrl (so parent can clear stored URL). */
  onClearExisting?: () => void;
  /** Max file size in bytes (optional). */
  maxSize?: number;
  /** Show image/video previews (default true when accept suggests images or videos). */
  showPreview?: boolean;
};

export function Dropzone({
  accept = "*",
  multiple = false,
  value,
  onChange,
  label,
  description,
  disabled = false,
  className,
  existingUrl,
  onClearExisting,
  maxSize,
  showPreview = true,
}: DropzoneProps) {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = React.useState<Map<File, string>>(new Map());
  const inputRef = React.useRef<HTMLInputElement>(null);

  const files = React.useMemo(() => {
    if (value === null) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Create object URLs for image/video previews and revoke on cleanup
  React.useEffect(() => {
    const urls = new Map<File, string>();
    files.forEach((file) => {
      if (showPreview && (isImageFile(file) || isVideoFile(file))) {
        urls.set(file, URL.createObjectURL(file));
      }
    });
    setPreviewUrls((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return urls;
    });
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files, showPreview]);

  const validateFile = (file: File): string | null => {
    if (maxSize != null && file.size > maxSize) {
      const mb = (maxSize / (1024 * 1024)).toFixed(1);
      return `File must be smaller than ${mb}MB`;
    }
    return null;
  };

  const processFiles = (newFiles: FileList | null) => {
    if (!newFiles?.length) return;
    setError(null);
    const list = Array.from(newFiles);
    const valid: File[] = [];
    for (const file of list) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        break;
      }
      valid.push(file);
    }
    if (valid.length === 0) return;
    if (multiple) {
      onChange([...files, ...valid]);
    } else {
      onChange(valid[0]);
    }
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;
    processFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    if (multiple) {
      const next = files.filter((_, i) => i !== index);
      onChange(next.length ? next : null);
    } else {
      onChange(null);
    }
  };

  const clearAll = () => {
    if (existingUrl && onClearExisting) {
      onClearExisting();
    }
    onChange(null);
  };

  const hasValue = files.length > 0 || existingUrl;

  const renderPreview = (file: File, index: number) => {
    const previewUrl = previewUrls.get(file);
    const isImage = isImageFile(file);
    const isVideo = isVideoFile(file);

    if (showPreview && isImage && previewUrl) {
      return (
        <div
          key={`${file.name}-${index}`}
          className="relative group rounded-lg border border-input bg-muted/50 overflow-hidden aspect-square w-20 h-20 shrink-0"
        >
          <img
            src={previewUrl}
            alt={file.name}
            className="w-full h-full object-cover"
          />
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(index);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
              aria-label="Remove file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      );
    }

    if (showPreview && isVideo && previewUrl) {
      return (
        <div
          key={`${file.name}-${index}`}
          className="relative group rounded-lg border border-input bg-muted/50 overflow-hidden aspect-video w-24 h-20 shrink-0"
        >
          <video
            src={previewUrl}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              stroke="white"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(index);
              }}
              className="absolute top-1 right-1 flex items-center justify-center size-6 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Remove file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      );
    }

    // Fallback: name chip
    return (
      <span
        key={`${file.name}-${index}`}
        className="inline-flex items-center gap-1 rounded-md border bg-muted/50 px-2 py-1 text-xs"
      >
        <span className="truncate max-w-[140px]">{file.name}</span>
        {!disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile(index);
            }}
            className="p-0.5 hover:bg-muted-foreground/20 rounded"
            aria-label="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-input bg-muted/30 px-4 py-6 text-center transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-primary bg-muted/60",
          disabled && "pointer-events-none opacity-50",
          error && "border-destructive"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onInputChange}
          className="sr-only"
          aria-label={label}
        />
        {description && (
          <p className="text-muted-foreground text-sm mb-1">{description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {isDragActive ? "Drop files here…" : "Drag and drop or click to browse"}
        </p>
        {error && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
      {hasValue && (
        <div className="flex flex-wrap items-end gap-3">
          {existingUrl && !files.length && (
            <div className="relative group rounded-lg border border-input bg-muted/50 overflow-hidden aspect-square w-20 h-20 shrink-0">
              <img
                src={existingUrl}
                alt="Current"
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">
                  Current
                </span>
              )}
            </div>
          )}
          {files.map((file, i) => renderPreview(file, i))}
          {hasValue && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline self-center"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
