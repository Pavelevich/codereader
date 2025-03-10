import { Component, OnInit, ViewChild } from '@angular/core';
import {ZXingScannerComponent, ZXingScannerModule} from '@zxing/ngx-scanner';
import { BarcodeFormat, Result, ResultPoint } from '@zxing/library';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  imports: [
    ZXingScannerModule,
    NgStyle,
    NgForOf
  ],
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @ViewChild('scanner') scanner: ZXingScannerComponent | undefined;

  allowedFormats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODABAR,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.ITF,
    BarcodeFormat.MAXICODE,
    BarcodeFormat.PDF_417,
    BarcodeFormat.RSS_14,
    BarcodeFormat.RSS_EXPANDED
  ];

  codesRead: string[] = [];

  // Variables para el recuadro dinámico
  rectLeft = 0;
  rectTop = 0;
  rectWidth = 0;
  rectHeight = 0;

  ngOnInit() { }

  onScanComplete(result: Result | null): void {
    if (!result) {
      return;
    }

    const text = result.getText();
    if (text && !this.codesRead.includes(text)) {
      this.codesRead.push(text);
    }

    const points: ResultPoint[] = result.getResultPoints() || [];
    if (points.length === 0) {
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
    points.forEach((point: ResultPoint) => {
      const x = point.getX();
      const y = point.getY();
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    });

    const videoElem = this.scanner?.previewElemRef?.nativeElement;
    if (!videoElem) { return; }
    const videoWidth = videoElem.videoWidth;
    const videoHeight = videoElem.videoHeight;
    const displayedWidth = videoElem.clientWidth;
    const displayedHeight = videoElem.clientHeight;

    if (!videoWidth || !videoHeight || !displayedWidth || !displayedHeight) {
      return;
    }

    const scaleX = displayedWidth / videoWidth;
    const scaleY = displayedHeight / videoHeight;

    this.rectLeft = minX * scaleX;
    this.rectTop = minY * scaleY;
    this.rectWidth = (maxX - minX) * scaleX;
    this.rectHeight = (maxY - minY) * scaleY;
  }

  getBoundingBoxStyle() {
    return {
      left: `${this.rectLeft}px`,
      top: `${this.rectTop}px`,
      width: `${this.rectWidth}px`,
      height: `${this.rectHeight}px`
    };
  }
}
