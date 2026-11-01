import { Link } from "react-router";

export default function Card({ product }) {
  return (
    <>
      <Link to={`/detail/${product.id}`} className="card bg-base-100 shadow-sm">
        <figure>
          <img
            src={product.imgUrl}
            alt="product image"
            className="h-60 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <p className="font-bold">Rp {product.price}</p>
        </div>
      </Link>
    </>
  );
}
