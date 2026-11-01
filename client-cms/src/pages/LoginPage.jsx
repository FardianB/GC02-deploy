import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const { data } = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Toastify({
        text: "Succeed Login",
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-sm w-96">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={handleLogin}>
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full mb-3"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button text="Login" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
