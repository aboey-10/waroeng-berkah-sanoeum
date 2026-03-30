import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Stok Waroeng Berkah Sanum Humaira</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-emerald-50 text-emerald-800">
            <th className="p-3 border-b">Nama Barang</th>
            <th className="p-3 border-b">Harga Grosir</th>
            <th className="p-3 border-b">Stok</th>
            <th className="p-3 border-b">Satuan</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-3 border-b font-medium">{item.name}</td>
              <td className="p-3 border-b">Rp {item.wholesalePrice.toLocaleString()}</td>
              <td className={`p-3 border-b ${item.stockQuantity < 10 ? 'text-red-600 font-bold' : ''}`}>
                {item.stockQuantity}
              </td>
              <td className="p-3 border-b">{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;