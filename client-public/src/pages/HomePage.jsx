import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/url";
import Card from "../components/Card";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pages = generatePages();

  // function untuk request product dari server
  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/pub/products?search=${search}&filter=${filter}&sort=${sort}&page[number]=${currentPage}`,
      );

      setProducts(data.data);
      setTotalPage(data.totalPages);
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

  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  function handleFilter(e) {
    setFilter(e.target.value);
    setCurrentPage(1);
  }

  function generatePages() {
    const array = [];
    for (let i = 1; i <= totalPage; i++) {
      array.push(i);
    }

    return array;
  }

  function handlePages(page) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    // jalan saat pertama kali render & setiap search, filter, sort, currentPage berubah
    fetchProducts();
  }, [search, filter, sort, currentPage]);

  return (
    <>
      <div id="PAGE-HOME" className="p-5">
        {/* informasi aplikasi */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold">
            IPhone Second, Anti Drama
          </h1>
          <p className="mt-2">
            Lagi cari iPhone second tapi takut zonk? Tenang, di sini semua unit
            sudah dicek satu-satu. Tinggal pilih mau yang Like New atau Normal,
            sesuaikan sama kantong!
          </p>
        </div>

        {/* search, filter, sort */}
        <div className="flex justify-between mb-5">
          <input
            type="text"
            className="input w-80"
            placeholder="Search"
            onChange={handleSearch}
          />
          <div className="flex gap-4">
            <select className="select w-44" onChange={handleFilter}>
              <option value="">All Category</option>
              <option value="1">Like New</option>
              <option value="2">Normal</option>
            </select>
            <select
              className="select w-44"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="DESC">Newest</option>
              <option value="ASC">Oldest</option>
            </select>
          </div>
        </div>

        {loading ? (
          <>
            {/* loading */}
            <div className="flex justify-center w-screen h-screen"></div>
          </>
        ) : (
          <>
            {/* card */}
            <main className="grid grid-cols-4 gap-5">
              {products.map((product) => {
                return <Card product={product} key={product.id} />;
              })}
            </main>
          </>
        )}

        {/* pagination */}
        <div className="flex justify-center mt-5">
          <div className="join">
            <button
              className="join-item btn btn-outline"
              onClick={handlePrevious}
              disabled={currentPage <= 1}
            >
              Prev
            </button>
            {pages.map((page) => {
              return (
                <button
                  key={page}
                  className={
                    page === currentPage
                      ? "join-item btn btn-neutral"
                      : "join-item btn btn-outline"
                  }
                  onClick={() => handlePages(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="join-item btn btn-outline"
              onClick={handleNext}
              disabled={currentPage >= totalPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
