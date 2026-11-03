'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  User,
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  LogOut,
  Store,
  Layers,
  DollarSign,
  PackageCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Save,
  Wheat,
} from 'lucide-react';
import { Product } from '@/types';
import { FALLBACK_PRODUCTS } from '@/lib/api';

const AVAILABLE_IMAGES = [
  { label: 'Ají Colorado Seleccionado 1kg', url: '/productos/aji-calidad-kilo.jpeg' },
  { label: 'Chicharrón en Tira (13 unidades)', url: '/productos/chicharron-tira-13unidades.jpeg' },
  { label: 'Platanitos Chips (26 unidades)', url: '/productos/platanitos-chips-26unidades.jpeg' },
  { label: 'Habas Saladas Fritas (26 unidades)', url: '/productos/habas-saladas-26unidades.jpeg' },
  { label: 'Maní Dulce Confitado (26 unidades)', url: '/productos/mani-dulce-confitado-26unidades.jpeg' },
  { label: 'Chicharrón Redondo Familiar 200g', url: '/productos/chicharron-redondo.jpeg' },
  { label: 'Ají Secado al Sol Chuquisaqueño 250g', url: '/productos/aji-secado-tradicional.jpeg' },
  { label: 'Chicharrones Tira Doble (26 unidades)', url: '/productos/chicharron-tira-detalle.jpeg' },
  { label: 'Ají Colorado Primera Quintal', url: '/productos/aji-quintal-primera.jpeg' },
  { label: 'Ají con Pepa Quintal', url: '/productos/aji-quintal-con-pepa.jpeg' },
  { label: 'Maní Molido para Sopa (500g)', url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Maní Crudo Seleccionado (1 kg)', url: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ají Amarillo Dulce Molido (250g)', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ name: string; username: string } | null>(null);

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('15.00');
  const [formStock, setFormStock] = useState('50');
  const [formCategory, setFormCategory] = useState('cat-abarrotes');
  const [formImageUrl, setFormImageUrl] = useState('/productos/aji-calidad-kilo.jpeg');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('sucrenita_admin_session');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setAdminUser(parsed.user);
      }

      const storedCustomProducts = localStorage.getItem('sucrenita_custom_products');
      if (storedCustomProducts) {
        const parsedProducts = JSON.parse(storedCustomProducts);
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts);
        }
      }
    } catch {
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        localStorage.setItem(
          'sucrenita_admin_session',
          JSON.stringify({ token: data.token, user: data.user })
        );
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setLoginError(data.message || 'Credenciales incorrectas');
      }
    } catch {
      setLoginError('Error de conexión con el servidor de autenticación');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sucrenita_admin_session');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        categoryFilter === 'all' || p.categoryId === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, categoryFilter]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSlug('');
    setFormDescription('');
    setFormPrice('15.00');
    setFormStock('50');
    setFormCategory('cat-abarrotes');
    setFormImageUrl('/productos/aji-calidad-kilo.jpeg');
    setFormIsActive(true);
    setFormSuccessMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormSlug(product.slug);
    setFormDescription(product.description || '');
    setFormPrice(String(product.price));
    setFormStock(String(product.stock));
    setFormCategory(product.categoryId);
    setFormImageUrl(product.imageUrl || '/productos/aji-calidad-kilo.jpeg');
    setFormIsActive(product.isActive);
    setFormSuccessMessage('');
    setIsModalOpen(true);
  };

  const handleFormNameChange = (val: string) => {
    setFormName(val);
    if (!editingProduct) {
      const generated = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormSlug(generated);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formPrice) {
      return;
    }

    const priceNum = parseFloat(formPrice);
    const stockNum = parseInt(formStock, 10) || 0;

    const categoryObj = {
      id: formCategory,
      name:
        formCategory === 'cat-snacks'
          ? 'Snacks Artesanales'
          : 'Abarrotes y Condimentos',
      slug:
        formCategory === 'cat-snacks'
          ? 'snacks-artesanales'
          : 'abarrotes-condimentos',
    };

    let updatedList: Product[];

    if (editingProduct) {
      updatedList = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName.trim(),
            slug: formSlug.trim() || p.slug,
            description: formDescription.trim() || null,
            price: priceNum,
            stock: stockNum,
            categoryId: formCategory,
            category: categoryObj,
            imageUrl: formImageUrl,
            isActive: formIsActive,
          };
        }
        return p;
      });
      setFormSuccessMessage('Producto actualizado exitosamente');
    } else {
      const newProd: Product = {
        id: `prod-custom-${Date.now()}`,
        name: formName.trim(),
        slug: formSlug.trim() || `producto-${Date.now()}`,
        description: formDescription.trim() || null,
        price: priceNum,
        stock: stockNum,
        categoryId: formCategory,
        category: categoryObj,
        imageUrl: formImageUrl,
        isActive: formIsActive,
      };
      updatedList = [newProd, ...products];
      setFormSuccessMessage('Nuevo producto registrado exitosamente');
    }

    setProducts(updatedList);
    try {
      localStorage.setItem(
        'sucrenita_custom_products',
        JSON.stringify(updatedList)
      );
    } catch {
    }

    setTimeout(() => {
      setIsModalOpen(false);
    }, 900);
  };

  const handleToggleActive = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    });
    setProducts(updated);
    try {
      localStorage.setItem('sucrenita_custom_products', JSON.stringify(updated));
    } catch {
    }
  };

  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const activeCount = products.filter((p) => p.isActive).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-pastel-sandDark shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-pastel-amber flex items-center justify-center text-pastel-amberText font-serif font-bold text-2xl mx-auto shadow-soft border border-pastel-amberBorder">
              S
            </div>
            <h1 className="font-serif text-2xl font-bold text-sucrenita-900">
              Panel Administrativo
            </h1>
            <p className="text-xs text-sucrenita-600">
              Productos Sucreñita &bull; Gestión de catálogo y almacén
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="admin-username"
                className="text-xs font-semibold text-sucrenita-800 block"
              >
                Usuario Administrador
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-sucrenita-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Usuario registrado"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-xs text-sucrenita-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="admin-password"
                className="text-xs font-semibold text-sucrenita-800 block"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sucrenita-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Contraseña de acceso"
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-xs text-sucrenita-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Ver u ocultar contraseña"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sucrenita-400 hover:text-sucrenita-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 text-white font-semibold text-xs shadow-soft transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoggingIn ? 'Verificando...' : 'Ingresar al Panel'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-pastel-sandDark text-center">
            <Link
              href="/"
              className="text-xs text-sucrenita-500 hover:text-sucrenita-800 transition-colors inline-flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Regresar a la tienda pública</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-sandDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pastel-amber flex items-center justify-center text-pastel-amberText font-serif font-bold text-lg border border-pastel-amberBorder">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-base text-sucrenita-900 block leading-tight">
                Productos Sucreñita
              </span>
              <span className="text-[11px] text-pastel-peachText font-bold uppercase tracking-wider">
                Panel de Administración
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-sucrenita-900">
                {adminUser?.name || 'Jhojan Erick Romero Morales'}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">
                @{adminUser?.username || 'engel7u7'} &bull; Administrador
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pastel-sand/60 hover:bg-pastel-amber/40 border border-pastel-sandDark text-xs font-semibold text-sucrenita-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ver Tienda</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-1">
            <span className="text-xs text-sucrenita-500 font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-pastel-amberText" />
              Total Catálogo
            </span>
            <div className="font-serif text-3xl font-bold text-sucrenita-900">
              {products.length}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              {activeCount} productos activos
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-1">
            <span className="text-xs text-sucrenita-500 font-medium flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-pastel-sageText" />
              Stock Disponible
            </span>
            <div className="font-serif text-3xl font-bold text-sucrenita-900">
              {totalStock}
            </div>
            <span className="text-[11px] text-sucrenita-500 block">
              Unidades en almacén
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-1">
            <span className="text-xs text-sucrenita-500 font-medium flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-pastel-peachText" />
              Abarrotes & Maní
            </span>
            <div className="font-serif text-3xl font-bold text-sucrenita-900">
              {products.filter((p) => p.categoryId === 'cat-abarrotes').length}
            </div>
            <span className="text-[11px] text-sucrenita-500 block">
              Línea cocina tradicional
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-1">
            <span className="text-xs text-sucrenita-500 font-medium flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Snacks Caseros
            </span>
            <div className="font-serif text-3xl font-bold text-sucrenita-900">
              {products.filter((p) => p.categoryId === 'cat-snacks').length}
            </div>
            <span className="text-[11px] text-sucrenita-500 block">
              Chicharrones y tostados
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-sucrenita-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o slug..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-xs text-sucrenita-900"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark text-xs font-semibold text-sucrenita-800 focus:outline-none"
              >
                <option value="all">Todas las categorías</option>
                <option value="cat-abarrotes">Abarrotes y Condimentos</option>
                <option value="cat-snacks">Snacks Artesanales</option>
              </select>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 text-white font-semibold text-xs shadow-soft transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Producto</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-pastel-sandDark shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-pastel-sandDark bg-pastel-sand/40 text-sucrenita-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Foto</th>
                  <th className="p-4">Nombre Comercial</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio (Bs)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pastel-sandDark/70">
                {filteredProducts.map((p) => {
                  const priceNum =
                    typeof p.price === 'string' ? parseFloat(p.price) : p.price;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-pastel-sand/20 transition-colors"
                    >
                      <td className="p-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pastel-sand border border-pastel-sandDark shrink-0">
                          {p.imageUrl ? (
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-sucrenita-400">
                              PS
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-serif font-bold text-sucrenita-900 block text-xs">
                          {p.name}
                        </span>
                        <span className="font-mono text-[10px] text-sucrenita-400">
                          {p.slug}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-pastel-amber/50 text-pastel-amberText border border-pastel-amberBorder">
                          {p.category?.name || 'Abarrotes'}
                        </span>
                      </td>
                      <td className="p-4 font-serif font-bold text-xs text-sucrenita-900">
                        Bs {priceNum.toFixed(2)}
                      </td>
                      <td className="p-4 font-medium text-sucrenita-700">
                        {p.stock} unidades
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(p.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            p.isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span>{p.isActive ? 'Activo' : 'En Pausa'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-xl bg-pastel-sand/60 hover:bg-pastel-amber/50 text-sucrenita-700 border border-pastel-sandDark transition-colors"
                            aria-label={`Editar ${p.name}`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-pastel-sandDark max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-pastel-amber to-amber-200/80 p-5 border-b border-pastel-amberBorder flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-sucrenita-900">
                {editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/40 text-sucrenita-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveProduct}
              className="p-6 overflow-y-auto space-y-4 flex-1 text-xs"
            >
              {formSuccessMessage && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{formSuccessMessage}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-sucrenita-800 block">
                  Nombre Comercial del Producto
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => handleFormNameChange(e.target.value)}
                  placeholder="Ej. Maní Tostado sin Sal (500g)"
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-sucrenita-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 block">
                    Slug / URL Única
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="mani-tostado-sin-sal-500g"
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark font-mono text-[11px] text-sucrenita-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 block">
                    Categoría
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark font-semibold text-sucrenita-800"
                  >
                    <option value="cat-abarrotes">Abarrotes y Condimentos</option>
                    <option value="cat-snacks">Snacks Artesanales</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 block">
                    Precio en Bolivianos (Bs)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark font-bold text-sucrenita-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 block">
                    Stock en Almacén (Unidades)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark text-sucrenita-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-sucrenita-800 block">
                  Foto del Producto
                </label>
                <select
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark text-sucrenita-800 mb-2 font-medium"
                >
                  {AVAILABLE_IMAGES.map((img) => (
                    <option key={img.url} value={img.url}>
                      {img.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="O escribe una ruta de imagen personalizada"
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark font-mono text-[11px] text-sucrenita-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-sucrenita-800 block">
                  Descripción y Consejos Culinarios
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detalles del producto, calidad de grano, textura..."
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark text-sucrenita-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="form-active"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="accent-sucrenita-700 w-4 h-4 rounded cursor-pointer"
                />
                <label
                  htmlFor="form-active"
                  className="font-medium text-sucrenita-800 cursor-pointer"
                >
                  Producto visible y disponible en la tienda pública
                </label>
              </div>

              <div className="pt-4 border-t border-pastel-sandDark flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-pastel-sand hover:bg-pastel-amber/40 text-sucrenita-700 font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 text-white font-semibold shadow-soft transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Guardar Cambios' : 'Registrar Producto'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

