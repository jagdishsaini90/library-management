import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../axios/axiosIntercepters";

export const useUploadBook = () => {
  const [success, setSuccess] = useState({
    flag: false,
    link: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImages] = useState([]);
  const [book, setBook] = useState({
    data: {},
    count: 0,
  });

  const uploadImages = async (images) => {
    await images.map(async (img) => {
      const formData = new FormData();

      formData.append("file", img);
      formData.append("upload_preset", "tndwevch");
      formData.append("cloud_name", "dnda0xwpu");
      formData.append("folder", "library");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dnda0xwpu/image/upload",
        formData
      );
      setImages((prev) => [...prev, res.data.secure_url]);
    });
  };

  const postBook = async (images, book) => {
    setError(() => null);
    setLoading((prev) => !prev);

    try {
      setBook((prev) => {
        prev.data = book;
        prev.count = images.length;
        return prev;
      });

      await uploadImages(images);
    } catch (err) {
      setError(() => err.message);
    }
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    if (imagesUrl.length > 0 && imagesUrl.length === book.count) {
      setLoading((prev) => !prev);

      const postBooks = async () => {
        book.data.imageLink = imagesUrl;

        try {
          await axiosInstance({
            method: "POST",
            url: "/books",
            data: JSON.stringify({
              book: book.data,
            }),
          })
            .then((res) => {
              setSuccess(() => {
                return { flag: true, link: res.data.payload._id };
              });
              setTimeout(() => {
                setSuccess((prev) => !prev);
              }, 3000);
            })
            .catch((error) => {
              setError(() => error.response?.data);
              setTimeout(() => {
                setError(() => null);
              }, 4000);
            });
          setImages(() => []);
        } catch (err) {
          setError(() => err.message);
          setTimeout(() => {
            setError(() => null);
          }, 4000);
        }
      };

      postBooks();

      setLoading((prev) => !prev);
    }
  }, [imagesUrl, book.count, book.data]);

  return {
    postBook,
    success,
    error,
    loading,
  };
};
