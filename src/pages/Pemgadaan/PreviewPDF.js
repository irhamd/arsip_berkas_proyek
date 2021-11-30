import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
function PreviewPDF() {
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const url =
        "file:///D:/User/Documents/Surat%20Lamar%20rev.pdf"

    return (
        <div>
            <a href={"http://192.168.169.180:8080/Panduan%20Persiapan%20Bagi%20Peserta%20Ujian%20TOEFL%20ITP%20(1).pdf"} target="_blank">Download Pdf</a>

        </div>
    )
}

export default PreviewPDF
