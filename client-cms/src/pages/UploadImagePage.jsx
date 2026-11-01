import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";

export default function UploadImagePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // function untuk request product yang mau diganti gambarnya
  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${baseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProduct(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
        },
      }).showToast();
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("imgUrl", file);

      const { data } = await axios.patch(
        `${baseUrl}/products/${id}/img-url`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

      navigate("/");
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "black",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Upload Image</h1>
        <p className="font-bold mb-3">{product.name}</p>
        <img src={product.imgUrl} alt="product image" className="w-60 mb-5" />
        <form onSubmit={handleUpload}>
          <input
            type="file"
            className="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          {loading ? (
            <>
              <span className="loading loading-spinner mt-5"></span>
            </>
          ) : (
            <>
              <Button text="Upload" />
            </>
          )}
        </form>
      </div>
    </>
  );
}
