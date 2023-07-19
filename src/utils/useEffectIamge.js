import { useEffect } from "react";
import { useState } from "react";

function useFetchImageData(todoList) {
  const [imageData, setImageData] = useState({});
  const SERICE_API = process.env.REACT_APP_SERVICE_API;
  // useEffect(() => {
  //   todoList.forEach((todo) => {
  //     axios
  //       .get(`http://localhost:8080/file/review/${todo.linkImg}`, {
  //         responseType: "arraybuffer",
  //       })
  //       .then((response) =>
  //         setImageData((prevImageData) => ({
  //           ...prevImageData,
  //           [todo.id]: `data:image/jpeg;base64,${btoa(
  //             new Uint8Array(response.data).reduce(
  //               (data, byte) => data + String.fromCharCode(byte),
  //               ""
  //             )
  //           )}`,
  //         }))
  //       );
  //   });
  // }, [todoList]);
  function fetchImage(link) {
    return fetch(SERICE_API+`/file/review/${link}`).then((response) =>
      response.blob()
    );
  }

  function loadImageData(todo) {
    fetchImage(todo.linkImg).then((blob) => {
      const url = URL.createObjectURL(blob);
      setImageData((prevImageData) => ({
        ...prevImageData,
        [todo.id]: url,
      }));
    });
  }

  useEffect(() => {
    if (todoList) {
      todoList.forEach((todo) => {
        loadImageData(todo);
      });
    }
  }, [todoList]);

  return imageData;
}

export default useFetchImageData;
