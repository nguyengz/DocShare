import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function useFetchImageData(todoList) {
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    todoList.forEach((todo) => {
      axios
        .get(`http://localhost:8080/file/review/${todo.linkImg}`, {
          responseType: "arraybuffer",
        })
        .then((response) =>
          setImageData((prevImageData) => ({
            ...prevImageData,
            [todo.id]: `data:image/jpeg;base64,${btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )}`,
          }))
        );
    });
  }, [todoList]);

  return imageData;
}

export default useFetchImageData;
