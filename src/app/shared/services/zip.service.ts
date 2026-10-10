import { Injectable } from '@angular/core';
import JSZip from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class ZipService {

  constructor() { }

  extractImagesFromZip(file: File): Promise<{ blob: Blob; filename: string; }[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const buffer = event.target?.result;

        if (buffer instanceof ArrayBuffer) {
          JSZip.loadAsync(buffer).then((zip) => {
            const filePromises: Promise<{ blob: Blob; filename: string; }>[] = [];

            zip.forEach((relativePath, zipEntry) => {
              if (!zipEntry.dir && this.isImageFile(zipEntry.name)) {
                const filePromise = zip.file(zipEntry.name)?.async('blob').then((blob) => {
                  return { blob, filename: zipEntry.name }; // Store blob and filename
                });

                if (filePromise) {
                  filePromises.push(filePromise);
                }
              }
            });

            Promise.all(filePromises).then((files) => {
              resolve(files);
            }).catch((error) => {
              reject('Error reading files from zip: ' + error);
            });
          }).catch((error) => {
            reject('Error loading zip file: ' + error);
          });
        } else {
          reject('Failed to read file as ArrayBuffer');
        }
      };

      reader.onerror = (event: ProgressEvent<FileReader>) => {
        reject('Error reading file: ' + (event.target?.error?.message ?? 'Unknown error'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  private isImageFile(filename: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  }
}
