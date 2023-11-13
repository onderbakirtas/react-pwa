import { onValue, push, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import Product, { TProduct } from "../components/Product";

const Products = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    const newProductRef = ref(db, "products");

    const newProduct = { name };

    await push(newProductRef, newProduct);

    setName("");
  };

  const deleteProduct = (id: string) => async () => {
    const productRef = ref(db, `products/${id}`);

    await remove(productRef);
  };

  useEffect(() => {
    setLoading(true);

    const query = ref(db, "products");

    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const products = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
        }));

        setProducts(products);
      } else {
        setProducts([]);
      }

      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <fieldset style={{ marginBottom: "20px" }}>
        <legend>Add Product Form</legend>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button style={{ marginTop: "10px" }} onClick={addProduct}>
          Add Product
        </button>
      </fieldset>
      {loading && <div>Loading...</div>}
      {products.map((product: TProduct) => (
        <Product key={product.id} {...product} onDelete={deleteProduct} />
      ))}
    </div>
  );
};

export default Products;
