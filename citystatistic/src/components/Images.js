import React, { useState } from "react";
import "../slideshow.css";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Images(props) {
  let page = 0;
  const [files, setFiles] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  function nextSlide() {
    if (page === props.img.length - 1) {
      page = 0;
    } else {
      page++;
    }

    let mySlide = document.querySelector(".mySlides");
    mySlide.innerHTML = `<img
    class="slide-image"
    src=${props.img[page]}
  />`;
  }

  function prevSlide() {
    if (page > 0) {
      page--;
    } else {
      page = props.img.length - 1;
    }
    let mySlide = document.querySelector(".mySlides");
    mySlide.innerHTML = `<img
    class="slide-image"
    src=${props.img[page]}
  />`;
  }

  function getFiles(e) {
    setFiles(e);
  }
  function uploadImage() {
    axios({
      method: "post",
      url: `http://localhost:8080/saveimage/${props.slug}`,
      headers: { Authorization: `Bearer ${cookies["auth"]}` },
      data: {
        base64: `${files[0].base64}`,
      },
    });
    props.img.push(files[0].base64);
    window.location.reload();
  }
  if (props.img.length < 1) {
    return (
      <div>
        {!cookies["auth"] ? (
          ""
        ) : (
          <div class="filebase-container">
            <FileBase64 multiple={true} onDone={getFiles} />
            <button id="upload-button" onClick={uploadImage}>
              upload
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {!cookies["auth"] ? (
          ""
        ) : (
          <div class="filebase-container">
            <FileBase64 multiple={true} onDone={getFiles} />
            <button onClick={uploadImage}>upload</button>
          </div>
        )}
        <div class="slideshow-container">
          <div class="mySlides">
            <img class="slide-image" src={props.img[page]} />
            {/* <div class="text">Caption Text</div> */}
          </div>
          <a class="prev" onClick={prevSlide}>
            &#10094;
          </a>
          <a class="next" onClick={nextSlide}>
            &#10095;
          </a>
        </div>
      </div>
    );
  }
}
