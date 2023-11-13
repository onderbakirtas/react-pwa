import { FC } from "react";
import styles from "../styles/components/Product.module.scss";

export type TProduct = {
  id: string;
  name: string;
  onDelete?: (id: string) => void;
};

const Product: FC<TProduct> = ({ id, name, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className={styles.productCard}>
      <h2>{name}</h2>
      <button onClick={handleDelete}>delete product</button>
    </div>
  );
};

export default Product;
