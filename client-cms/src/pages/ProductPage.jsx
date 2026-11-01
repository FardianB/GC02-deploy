import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import { Link } from "react-router";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // function untuk request product dari server
  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProducts(data.data);
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

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${baseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

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

      fetchProducts();
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link to="/add" className="btn btn-primary">
            Add Product
          </Link>
        </div>

        {loading ? (
          <>
            {/* loading */}
            <div className="flex justify-center mt-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>
                        <img
                          src={product.imgUrl}
                          alt="product image"
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td>Rp {product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            to={`/edit/${product.id}`}
                            className="btn btn-sm"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/upload/${product.id}`}
                            className="btn btn-sm"
                          >
                            Upload Image
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-sm btn-error"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
