import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import { useNavigate } from "react-router";
import Button from "../components/Button";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  function handleForm(e, fieldName) {
    setForm((oldValue) => {
      return {
        ...oldValue,
        [fieldName]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/add-user`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: "Succeed add new staff",
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
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Add New Staff</h1>
        <form className="w-96" onSubmit={handleSubmit}>
          <label className="label">Username</label>
          <input
            type="text"
            className="input w-full mb-3"
            placeholder="Username"
            onChange={(e) => handleForm(e, "username")}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full mb-3"
            placeholder="Email"
            onChange={(e) => handleForm(e, "email")}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full mb-3"
            placeholder="Password"
            onChange={(e) => handleForm(e, "password")}
          />

          <label className="label">Phone Number</label>
          <input
            type="text"
            className="input w-full mb-3"
            placeholder="Phone Number"
            onChange={(e) => handleForm(e, "phoneNumber")}
          />

          <label className="label">Address</label>
          <textarea
            className="textarea w-full"
            placeholder="Address"
            onChange={(e) => handleForm(e, "address")}
          ></textarea>

          <Button text="Add Staff" />
        </form>
      </div>
    </>
  );
}
