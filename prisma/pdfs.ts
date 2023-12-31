// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${process.env.PWD
    }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

import PDFDocument from "pdfkit";
const { faker } = require("@faker-js/faker");
const fs = require('fs');

export default async function generatePDF(title: string, author: string): Promise<ArrayBuffer> {
  const doc = new PDFDocument({
    font: './PTSerif-Regular.ttf'
  });
  doc.pipe(fs.createWriteStream('./output.pdf'));

  doc.moveDown();
  doc.fontSize(25);
  doc.text(title, { align: 'center' });

  doc.moveDown();
  doc.fontSize(17);
  doc.text(author, { align: 'center' });

  const x = Math.random() * 400;
  const y = 400 + Math.random() * 200;
  const radius = 100 + Math.random() * 200;

  const shapeColor = faker.color.rgb({ format: 'hex', casing: 'lower' });

  doc.save()
    .circle(x, y, radius)
    .fill(shapeColor)
    .restore();

  doc.end();

  await new Promise((resolve) => setTimeout(resolve, 100));
  const pdfBuffer = fs.readFileSync('./output.pdf');

  fs.unlinkSync('./output.pdf');

  return new Uint8Array(pdfBuffer.buffer);
};
