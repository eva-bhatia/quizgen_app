import pdfParse from 'pdf-parse';

/**
 * Extracts text from a PDF file buffer
 * @param pdfBuffer - The PDF file as a buffer
 * @returns A promise that resolves to the extracted text
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(pdfBuffer);
    
    // Get the text content from the PDF
    const text = data.text;
    
    // Check if we got meaningful content
    if (!text || text.trim().length < 50) {
      throw new Error("No meaningful text could be extracted from the PDF");
    }
    
    return text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
