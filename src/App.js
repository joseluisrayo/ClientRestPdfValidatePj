import React, { useState, useEffect } from "react";
import "./css/App.css";
import logoPj from "./assets/logo-pj.png";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const URL_API = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const { namepdf } = useParams();
  const [width, setWindowWidth] = useState(0);
  const [fileBase64, setFileBase64] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    fetch(URL_API + `getValidarDocumentoPdf/${namepdf}`, {
      headers: {
        "Content-type": "application/json",
        authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFileBase64(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [namepdf, fileBase64]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    showStyleMobil: width < 1024 ? 495 : 0,
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <div className="container">
              <img src={logoPj} alt="LogoPj" width={300} height={60} />
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-3 mb-3">
        <div className="container-frame d-flex justify-content-center">
          <Document file={fileBase64} onLoadSuccess={onDocumentLoadSuccess}>
            <Page height={responsive.showStyleMobil} className="conatiner-pagepdf" pageNumber={pageNumber} />

            <div className="page-controls">
              <button
                type="button"
                onClick={changePageBack}
                disabled={pageNumber > 1 ? "" : true}
              >
                ‹
              </button>
              <span>
                {pageNumber} de {numPages}
              </span>
              <button
                type="button"
                onClick={changePageNext}
                disabled={pageNumber < numPages ? "" : true}
              >
                ›
              </button>
            </div>
          </Document>
        </div>
      </div>
      <div className="containerFooter">
        Av. Paseo de la República S/N Palacio de Justicia, Cercado, Lima - Perú
        <br />
        Copyright © - 2022 Todos los derechos reservados
      </div>
    </>
  );
}

export default App;
