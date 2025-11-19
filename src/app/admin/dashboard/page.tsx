// // app/admin/dashboard/page.tsx

// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
// import Image from 'next/image';
// import { Product, Category } from '@/lib/types';

// export default function AdminDashboard() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const auth = sessionStorage.getItem('adminAuth');
//     if (!auth) {
//       router.push('/admin');
//       return;
//     }

//     fetchProducts();
//     fetchCategories();
//   }, [router]);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch('/api/categories');
//       const data = await res.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;

//     try {
//       console.log('Deleting product with id:', id);

//       const res = await fetch(`/api/products/${id}`, {
//         method: 'DELETE'
//       });

//       if (res.ok) {
//         alert('Product deleted successfully!');
//         fetchProducts();
//       } else {
//         const error = await res.json();
//         alert(`Failed to delete product: ${error.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       alert('Failed to delete product. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem('adminAuth');
//     router.push('/admin');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl text-[#301E0B]">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-stone-100 py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-[#301E0B]">Dashboard</h1>
//           <div className="flex gap-4">
//             <Link
//               href="/admin/dashboard/categories"
//               className="bg-[#301E0B] text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-900 transition flex items-center space-x-2"
//             >
//               <Package size={20} />
//               <span>Categories</span>
//             </Link>
//             <Link
//               href="/admin/dashboard/add-product"
//               className="bg-[#301E0B] text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-800 transition flex items-center space-x-2"
//             >
//               <Plus size={20} />
//               <span>Add Product</span>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 mb-1">Total Products</p>
//                 <p className="text-3xl font-bold text-[#301E0B]">{products.length}</p>
//               </div>
//               <Package className="text-[#301E0B]" size={48} />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 mb-1">Categories</p>
//                 <p className="text-3xl font-bold text-[#301E0B]">{categories.length}</p>
//               </div>
//               <Package className="text-amber-600" size={48} />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 mb-1">In Stock</p>
//                 <p className="text-3xl font-bold text-[#301E0B]">
//                   {products.filter(p => p.inStock).length}
//                 </p>
//               </div>
//               <Package className="text-green-600" size={48} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-[#301E0B] text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left">Image</th>
//                   <th className="px-6 py-3 text-left">Name</th>
//                   <th className="px-6 py-3 text-left">Category</th>
//                   <th className="px-6 py-3 text-left">Price</th>
//                   <th className="px-6 py-3 text-left">Stock</th>
//                   <th className="px-6 py-3 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-8 text-center text-[#301E0B]">
//                       No products yet. Create your first product!
//                     </td>
//                   </tr>
//                 ) : (
//                   products.map(product => (
//                     <tr key={product.id} className="border-b border-amber-100 hover:bg-amber-50">
//                       <td className="px-6 py-4">
//                         <div className="relative w-16 h-16">
//                           <Image
//                             src={product.imageUrl}
//                             alt={product.name}
//                             fill
//                             className="object-cover rounded"
//                           />
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 font-semibold text-[#301E0B]">{product.name}</td>
//                       <td className="px-6 py-4 text-[#301E0B]">{product.category?.name}</td>
//                       <td className="px-6 py-4 text-[#301E0B]">KSh {product.price.toLocaleString()}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                           product.inStock
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {product.inStock ? 'In Stock' : 'Out of Stock'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex gap-2">
//                           <Link
//                             href={`/products/${product.id}`}
//                             className="text-blue-600 hover:text-blue-800"
//                             title="View Product"
//                           >
//                             <Eye size={20} />
//                           </Link>
//                           <Link
//                             href={`/admin/dashboard/edit-product/${product.id}`}
//                             className="text-amber-600 hover:text-amber-800"
//                             title="Edit Product"
//                           >
//                             <Edit size={20} />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(product.id)}
//                             className="text-red-600 hover:text-red-800"
//                             title="Delete Product"
//                           >
//                             <Trash2 size={20} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Plus, Edit, Trash2, Eye, Search, Bell, Settings, Menu, Grid3x3, List, MoreVertical, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Product, Category } from '@/lib/types';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentView, setCurrentView] = useState<'dashboard' | 'categories'>('dashboard');
  const [categoryFormData, setCategoryFormData] = useState({ name: '', slug: '' });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
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

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        const error = await res.json();
        alert(`Failed to delete product: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const generateSlug = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleCategoryNameChange = (name: string) => {
    setCategoryFormData({
      name,
      slug: generateSlug(name)
    });
  };

  const handleCategorySubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!categoryFormData.name || !categoryFormData.slug) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (editingCategoryId) {
        const res = await fetch(`/api/categories/${editingCategoryId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryFormData)
        });

        if (res.ok) {
          alert('Category updated successfully');
          setEditingCategoryId(null);
        }
      } else {
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryFormData)
        });

        if (res.ok) {
          alert('Category created successfully');
        }
      }

      setCategoryFormData({ name: '', slug: '' });
      setShowCategoryForm(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleEditCategory = (category: Category) => {
    setCategoryFormData({ name: category.name, slug: category.slug });
    setEditingCategoryId(category.id);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure? This will affect all products in this category.')) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const handleCancelCategoryForm = () => {
    setShowCategoryForm(false);
    setCategoryFormData({ name: '', slug: '' });
    setEditingCategoryId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-[#301E0B]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="text-[#301E0B]" size={32} />
              <h1 className="text-2xl font-semibold text-[#301E0B]">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#301E0B] focus:border-transparent"
                />
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Bell size={20} className="text-gray-600" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Settings size={20} className="text-gray-600" />
              </button>

              <div className="w-10 h-10 bg-[#301E0B] rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#301E0B] border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">

          <nav className="space-y-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition ${currentView === 'dashboard'
                  ? 'text-[#301E0B] bg-amber-50'
                  : 'text-gray-50 hover:border-2'
                }`}
            >
              <Package size={20} />
              <span>My Products</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('categories');
                setShowCategoryForm(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition ${currentView === 'categories'
                  ? 'text-[#301E0B] bg-amber-50'
                  : 'text-gray-50 hover:border-2'
                }`}
            >
              <Grid3x3 size={20} />
              <span>Categories</span>
            </button>

            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-50 hover:border-2 rounded-lg transition">
              <Package size={20} />
              <span>In Stock</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-50 hover:border-2 rounded-lg transition">
              <Trash2 size={20} />
              <span>Trash</span>
            </a>
          </nav>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Storage</p>
            <p className="text-xs text-gray-500 mb-2">{products.length} of 100 products</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-[#301E0B] h-2 rounded-full"
                style={{ width: `${(products.length / 100) * 100}%` }}
              ></div>
            </div>
            <button className="text-sm text-[#301E0B] font-medium hover:underline">
              Upgrade Storage
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-4 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1200px]">
            {/* Dashboard View */}
            {currentView === 'dashboard' && (
              <>
                {/* Quick Access Section */}
                <section className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">QUICK ACCESS</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Recent Products Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">RECENT</p>
                          <p className="text-xs text-gray-500">Latest Products</p>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {products.slice(0, 4).map((product, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
                            <Package size={16} className="text-[#301E0B]" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Categories Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">CATEGORIES</p>
                          <p className="text-xs text-gray-500">{categories.length} total</p>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {categories.slice(0, 4).map((cat, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                            <Grid3x3 size={16} className="text-blue-600" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stock Status Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">IN STOCK</p>
                          <p className="text-xs text-gray-500">{products.filter(p => p.inStock).length} available</p>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {products.filter(p => p.inStock).slice(0, 4).map((product, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                            <Package size={16} className="text-green-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* All Products Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">ALL PRODUCTS</h2>
                    

                    <div className="flex items-center gap-2">
                      <div>
                      <Link
                        href="/admin/dashboard/add-product"
                        className="w-full bg-[#301E0B] text-white px-3 py-2 rounded-full font-semibold hover:bg-amber-900 transition flex items-center justify-center"
                      >
                        <Plus size={20} />
                        <span>New Product</span>
                      </Link>
                    </div>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-amber-100 text-[#301E0B]' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <List size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-amber-100 text-[#301E0B]' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <Grid3x3 size={20} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Filter size={20} />
                      </button>
                    </div>
                  </div>

                  {products.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                      <Package size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-2">No products yet</p>
                      <p className="text-sm text-gray-500">Create your first product to get started!</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      {/* Table Header */}
                      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                        <div className="col-span-1">IMAGE</div>
                        <div className="col-span-3">NAME</div>
                        <div className="col-span-2">CATEGORY</div>
                        <div className="col-span-2">LAST MODIFIED</div>
                        <div className="col-span-2">PRICE</div>
                        <div className="col-span-1">STATUS</div>
                        <div className="col-span-1"></div>
                      </div>

                      {/* Table Body */}
                      <div className="divide-y divide-gray-100">
                        {products.map(product => (
                          <div
                            key={product.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition items-center"
                          >
                            <div className="col-span-1">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>

                            <div className="col-span-3">
                              <p className="font-medium text-gray-900">{product.name}</p>
                            </div>

                            <div className="col-span-2">
                              <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                <Grid3x3 size={14} />
                                {product.category?.name || 'Uncategorized'}
                              </span>
                            </div>

                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                              </p>
                            </div>

                            <div className="col-span-2">
                              <p className="font-medium text-gray-900">KSh {product.price.toLocaleString()}</p>
                            </div>

                            <div className="col-span-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.inStock
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-red-50 text-red-700'
                                }`}>
                                {product.inStock ? '✓' : '✗'}
                              </span>
                            </div>

                            <div className="col-span-1 flex justify-end gap-1">
                              <Link
                                href={`/products/${product.id}`}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="View"
                              >
                                <Eye size={16} />
                              </Link>
                              <Link
                                href={`/admin/dashboard/edit-product/${product.id}`}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </Link>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </>
            )}

            {/* Categories View */}
            {currentView === 'categories' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
                    <p className="text-gray-600 mt-2">Manage all your product categories</p>
                  </div>

                  {!showCategoryForm && (
                    <button
                      onClick={() => setShowCategoryForm(true)}
                      className="bg-[#301E0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition flex items-center gap-2"
                    >
                      <Plus size={20} />
                      <span>Add Category</span>
                    </button>
                  )}
                </div>

                {/* Category Form */}
                {showCategoryForm && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      {editingCategoryId ? 'Edit Category' : 'Add New Category'}
                    </h2>

                    <div>
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={categoryFormData.name}
                          onChange={(e) => handleCategoryNameChange(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#301E0B] focus:border-transparent"
                          placeholder="e.g., Danglings, Studs, Necklaces"
                        />
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Slug (URL-friendly)
                        </label>
                        <input
                          type="text"
                          value={categoryFormData.slug}
                          onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#301E0B] focus:border-transparent"
                          placeholder="e.g., danglings, studs, necklaces"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          This will be used in URLs. Lowercase letters and hyphens only.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={(e) => handleCategorySubmit(e)}
                          className="flex-1 bg-[#301E0B] text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition flex items-center justify-center gap-2"
                        >
                          {editingCategoryId ? (
                            <>
                              <Edit size={18} />
                              Update Category
                            </>
                          ) : (
                            <>
                              <Plus size={18} />
                              Create Category
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleCancelCategoryForm}
                          className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {categories.length === 0 ? (
                    <div className="p-12 text-center">
                      <Grid3x3 size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-2">No categories yet</p>
                      <p className="text-sm text-gray-500">Create your first category to get started!</p>
                    </div>
                  ) : (
                    <>
                      {/* Table Header */}
                      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                        <div className="col-span-4">NAME</div>
                        <div className="col-span-4">SLUG</div>
                        <div className="col-span-2">PRODUCTS</div>
                        <div className="col-span-2">ACTIONS</div>
                      </div>

                      {/* Table Body */}
                      <div className="divide-y divide-gray-100">
                        {categories.map(category => (
                          <div
                            key={category.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition items-center"
                          >
                            <div className="col-span-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                  <Grid3x3 size={20} className="text-[#301E0B]" />
                                </div>
                                <p className="font-semibold text-gray-900">{category.name}</p>
                              </div>
                            </div>

                            <div className="col-span-4">
                              <p className="text-gray-600 text-sm font-mono">{category.slug}</p>
                            </div>

                            <div className="col-span-2">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                {category._count?.products || 0} products
                              </span>
                            </div>

                            <div className="col-span-2 flex gap-1">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}