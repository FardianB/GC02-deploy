import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";

export default function CreateProductPage() {
  const navigate = useNavigate();

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/products`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

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
    }
  }

  return (
    <>
      <ProductForm
        title="Add New Product"
        buttonText="Submit"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
