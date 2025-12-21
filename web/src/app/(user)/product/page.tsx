// produk.tsx - Sistem Katalog Pembelian Next.js
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProdukCatalog() {
  const products: Product[] = [
    {
      id: 1,
      name: "Trophy Emas Premium",
      price: 150000,
      image: "/img1.jpg",
    },
    {
      id: 2,
      name: "Trophy Silver Modern",
      price: 120000,
      image: "/img2.jpg",
    },
    {
      id: 3,
      name: "Trophy Kustom Resin",
      price: 200000,
      image: "/img3.jpg",
    },
    {
      id: 4,
      name: "Trophy Kustom Resin",
      price: 200000,
      image: "/img3.jpg",
    },
    {
      id: 5,
      name: "Trophy Kustom Resin",
      price: 200000,
      image: "/img3.jpg",
    },
    {
      id: 6,
      name: "Trophy Kustom Resin",
      price: 200000,
      image: "/img3.jpg",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Katalog Produk thropy</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl shadow-md p-4 hover:shadow-lg transition bg-white"
          >
            <div className="w-full h-48 relative mb-3">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-600 mb-3">Rp {item.price.toLocaleString()}</p>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}