import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PdfBody } from "./pdfBody";
import { Flex } from "antd";

interface PdfGeneratorProps {
  location: string;
  dateRange: string;
  answer: string | null;
  reset: () => void;
}

function capitalizeEveryWord(input: string) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({
  location,
  dateRange,
  answer,
  reset,
}) => {
  // Use a ref to access the content div
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const input = contentRef.current;

    if (input) {
      // Capture the element as a canvas
      const originalDisplay = input.style.display;
      input.style.display = "block";
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Create a jsPDF instance
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add the image to the PDF and save it
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");

      input.style.display = originalDisplay;
    }
  };

  return (
    <div>
      <div ref={contentRef} style={styles.content}>
        {/* Add a background banner */}
        <div style={styles.banner}>
          <h1
            style={styles.title}
          >{`Trip to ${capitalizeEveryWord(location)}`}</h1>
          <p style={styles.subtitle}>{dateRange}</p>
        </div>

        {/* Body Content */}
        <div style={styles.body} className="px-6">
          <PdfBody text={answer} />

          {/* Example image (You can replace the image URL) */}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>MovinAI</p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button onClick={reset} style={styles.buttonBack}>
          Cancel
        </button>
        <button onClick={generatePDF} style={styles.button}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

// TypeScript style object to style the content div
const styles: { [key: string]: React.CSSProperties } = {
  content: {
    width: "210mm",
    height: "297mm",
    backgroundColor: "#ffffff",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "none",
  },
  banner: {
    backgroundColor: "#023047",
    paddingTop: "10px",
    paddingBottom: "30px",
    borderRadius: "8px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    color: "#fff",
    fontSize: "16px",
  },
  body: {
    marginTop: "20px",
    textAlign: "justify",
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.6",
  },
  image: {
    display: "block",
    margin: "20px auto",
    borderRadius: "8px",
  },
  footer: {
    position: "absolute",
    bottom: "20px",
    width: "100%",
    textAlign: "center",
    // borderTop: "1px solid #ccc",
    paddingTop: "10px",
  },
  footerText: {
    fontSize: "12px",
    color: "#999",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#023047",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    marginLeft: "30px",
    width: "150px",
  },
  buttonBack: {
    padding: "10px 20px",
    backgroundColor: "#fff",
    width: "130px",
    color: "black",
    border: "solid",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default PdfGenerator;
