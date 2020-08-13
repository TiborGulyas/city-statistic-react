import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Images() {
  const [images, setImages] = useState([]);
  console.log(images[0]);
  useEffect(() => {
    const apiPath = `http://localhost:8080/getimage/budapest`;
    axios.get(apiPath).then((res) => {
      setImages((img) => [...img, res.data]);
    });
  }, []);
  if (images.length < 1) {
    return (
      <table id="wrapper">
        <tr>
          <td>
            <img
              id="loading"
              src="/globe.gif"
              alt="loading globe"
              width="10%"
              height="auto"
            />
          </td>
        </tr>
      </table>
    );
  } else {
    return (
      <div>
        <img src={images[0]} alt="" width="20%" />
      </div>
    );
  }
}