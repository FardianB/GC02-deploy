import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import Button from "./Button";

export default function ProductForm({
  title,
  buttonText,
  product,
  handleSubmit,
}) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    categoryId: 0,
  });

  // isi form dengan data lama (untuk halaman edit)
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        categoryId: product.categoryId,
      });
    }
  }, [product]);

  function handleForm(e, fieldName) {
    if (
      fieldName === "price" ||
      fieldName === "stock" ||
      fieldName === "categoryId"
    ) {
      setForm((oldValue) => {
        return {
          ...oldValue,
          [fieldName]: +e.target.value,
        };
      });
    } else {
      setForm((oldValue) => {
        return {
          ...oldValue,
          [fieldName]: e.target.value,
        };
      });
    }
  }

  // function untuk request category dari server
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCategories(data.categories);
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
    fetchCategories();
  }, []);

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">{title}</h1>
        <form className="w-96" onSubmit={(e) => handleSubmit(e, form)}>
          <label className="label">Nama</label>
          <input
            type="text"
            className="input w-full mb-3"
            placeholder="Nama"
            value={form.name}
            onChange={(e) => handleForm(e, "name")}
          />

          <label className="label">Deskripsi</label>
          <textarea
            className="textarea w-full mb-3"
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => handleForm(e, "description")}
          ></textarea>

          <label className="label">Harga</label>
          <input
            type="number"
            className="input w-full mb-3"
            placeholder="Harga"
            value={form.price}
            onChange={(e) => handleForm(e, "price")}
          />

          <label className="label">Stok</label>
          <input
            type="number"
            className="input w-full mb-3"
            placeholder="Stok"
            value={form.stock}
            onChange={(e) => handleForm(e, "stock")}
          />

          <label className="label">URL Gambar</label>
          <input
            type="text"
            className="input w-full mb-3"
            placeholder="URL Gambar"
            value={form.imgUrl}
            onChange={(e) => handleForm(e, "imgUrl")}
          />

          <label className="label">Kategori</label>
          <select
            className="select w-full"
            value={form.categoryId}
            onChange={(e) => handleForm(e, "categoryId")}
          >
            <option value={0} disabled>
              Pilih Kategori
            </option>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <Button text={buttonText} />
        </form>
      </div>
    </>
  );
}
