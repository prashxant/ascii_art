import { NextResponse } from 'next/server';
import { Jimp } from 'jimp';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const asciiChars = '@%#*+=-:. ';
    const image = await Jimp.read(buffer);

    // Resize to width 100, maintain aspect ratio, and convert to greyscale
    image.resize({ w: 100 }).greyscale();

    let ascii = '';
    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        // Get the red component (since it's greyscale, r=g=b)
        const pixelColor = image.getPixelColor(x, y);
        const r = (pixelColor >> 24) & 0xff;
        const char = asciiChars[Math.floor((r / 255) * (asciiChars.length - 1))];
        ascii += char;
      }
      ascii += '\n';
    }

    return NextResponse.json({ ascii });
  } catch (error) {
    console.error('Error converting image to ASCII:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
