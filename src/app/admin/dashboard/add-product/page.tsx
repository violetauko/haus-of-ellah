'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function AddProductPage() {
  type Category = { id: string; name: string };
  type FormDataState = {
    name: string;
    description: string;
    price: string;
    categoryId: string;
    inStock: boolean;
    imageUrl?: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    inStock: true
  });
  const router = useRouter();
  
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: data[0].id }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImagePreview(URL.createObjectURL(file));
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      setFormData(prev => ({ ...prev, imageUrl: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Product Image</label>
            <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center">
              {imagePreview ? (
                <div className="relative w-full h-64 mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ) : (
                <Upload className="mx-auto text-amber-600 mb-4" size={48} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                required
              />
              <label
                htmlFor="image-upload"
                className="bg-amber-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-800 transition cursor-pointer inline-block"
              >
                Choose Image
              </label>
            </div>
          </div>
          
          {/* Name */}
          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
            />
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Price (KSh)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          {/* Category */}
          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          {/* In Stock */}
          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="w-5 h-5 text-amber-900"
              />
              <span className="text-amber-900 font-semibold">In Stock</span>
            </label>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-amber-900 text-white py-3 rounded-lg font-bold hover:bg-amber-800 transition disabled:bg-gray-400"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}