'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  categoryId: string;
  category?: Category;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    
    fetchProducts();
    fetchCategories();
  }, [router]);
  
  const fetchProducts = async (): Promise<void> => {
    try {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCategories = async (): Promise<void> => {
    try {
      const res = await fetch('/api/categories');
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleLogout = (): void => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-xl text-amber-900">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard/add-product"
              className="bg-amber-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-800 transition flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-amber-900">{products.length}</p>
              </div>
              <Package className="text-amber-600" size={48} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Categories</p>
                <p className="text-3xl font-bold text-amber-900">{categories.length}</p>
              </div>
              <Package className="text-amber-600" size={48} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">In Stock</p>
                <p className="text-3xl font-bold text-amber-900">
                  {products.filter((p: Product) => p.inStock).length}
                </p>
              </div>
              <Package className="text-green-600" size={48} />
            </div>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product.id} className="border-b border-amber-100 hover:bg-amber-50">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-amber-900">{product.name}</td>
                    <td className="px-6 py-4">{product.category?.name}</td>
                    <td className="px-6 py-4">KSh {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={20} />
                        </Link>
                        <Link
                          href={`/admin/dashboard/edit-product/${product.id}`}
                          className="text-amber-600 hover:text-amber-800"
                        >
                          <Edit size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}