import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import { Link, useParams } from "react-router";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  // function untuk request detail product dari server
  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/pub/products/${id}`);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <>
          {/* loading */}
          <div className="flex justify-center mt-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div id="PAGE-DETAIL" className="p-5">
            <div className="grid grid-cols-2 gap-5">
              <img
                src={product.imgUrl}
                alt="product image"
                className="w-full"
              />
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-xl mt-3">Rp {product.price}</p>
                <p className="mt-3">Stock: {product.stock}</p>
                <p className="mt-3">{product.description}</p>
                <Link to="/" className="btn btn-primary mt-5">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
