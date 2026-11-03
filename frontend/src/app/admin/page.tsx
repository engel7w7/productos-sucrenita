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
  ShoppingBag,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Clock,
  MapPin,
  Phone,
  QrCode,
  SlidersHorizontal,
} from 'lucide-react';
import { Product } from '@/types';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import {
  getExchangeRateConfig,
  saveExchangeRateConfig,
  ExchangeRateConfig,
} from '@/lib/exchangeRate';
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  OrderRecord,
  OrderStatus,
} from '@/lib/orders';
import { PayPalIcon, WhatsAppIcon } from '@/components/SocialIcons';

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

  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'rates' | 'analytics'>('catalog');

  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderMethodFilter, setOrderMethodFilter] = useState<string>('all');

  const [exchangeConfig, setExchangeConfig] = useState<ExchangeRateConfig>(getExchangeRateConfig());
  const [rateInput, setRateInput] = useState<string>('12.50');
  const [rateNoteInput, setRateNoteInput] = useState<string>('');
  const [rateSuccessMessage, setRateSuccessMessage] = useState<string>('');

  const [calcBobInput, setCalcBobInput] = useState<string>('150');

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

      const loadedOrders = getOrders();
      setOrders(loadedOrders);

      const loadedConfig = getExchangeRateConfig();
      setExchangeConfig(loadedConfig);
      setRateInput(loadedConfig.rate.toString());
      setRateNoteInput(loadedConfig.note);
    } catch {
    }
  }, []);

  useEffect(() => {
    const handleOrdersUpdate = () => {
      setOrders(getOrders());
    };
    const handleRateUpdate = () => {
      const updated = getExchangeRateConfig();
      setExchangeConfig(updated);
      setRateInput(updated.rate.toString());
    };

    window.addEventListener('sucrenita_orders_updated', handleOrdersUpdate);
    window.addEventListener('sucrenita_exchange_rate_updated', handleRateUpdate);

    return () => {
      window.removeEventListener('sucrenita_orders_updated', handleOrdersUpdate);
      window.removeEventListener('sucrenita_exchange_rate_updated', handleRateUpdate);
    };
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

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus =
        orderStatusFilter === 'all' || o.status === orderStatusFilter;
      const matchesMethod =
        orderMethodFilter === 'all' || o.paymentMethod === orderMethodFilter;
      return matchesStatus && matchesMethod;
    });
  }, [orders, orderStatusFilter, orderMethodFilter]);

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

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormDescription(p.description || '');
    setFormPrice(
      typeof p.price === 'string' ? p.price : Number(p.price).toFixed(2)
    );
    setFormStock((p.stock || 0).toString());
    setFormCategory(p.categoryId || 'cat-abarrotes');
    setFormImageUrl(p.imageUrl || '/productos/aji-calidad-kilo.jpeg');
    setFormIsActive(p.isActive);
    setFormSuccessMessage('');
    setIsModalOpen(true);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleFormNameChange = (val: string) => {
    setFormName(val);
    if (!editingProduct) {
      setFormSlug(generateSlug(val));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPrice) || 0;
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

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = updateOrderStatus(orderId, status);
    setOrders(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = deleteOrder(orderId);
    setOrders(updated);
  };

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(rateInput);
    if (!parsed || parsed <= 0) return;

    const saved = saveExchangeRateConfig(parsed, rateNoteInput.trim());
    setExchangeConfig(saved);
    setRateSuccessMessage('Tipo de cambio paralelo/BCB actualizado correctamente');
    setTimeout(() => {
      setRateSuccessMessage('');
    }, 3500);
  };

  const handleApplyPresetRate = (rateVal: number) => {
    setRateInput(rateVal.toString());
    const saved = saveExchangeRateConfig(rateVal, rateNoteInput.trim());
    setExchangeConfig(saved);
    setRateSuccessMessage(`Tipo de cambio fijado en 1 USD = ${rateVal.toFixed(2)} BOB`);
    setTimeout(() => {
      setRateSuccessMessage('');
    }, 3500);
  };

  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const activeCount = products.filter((p) => p.isActive).length;
  const totalCatalogValueBob = products.reduce((acc, p) => {
    const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
    return acc + price * (p.stock || 0);
  }, 0);

  const totalOrdersAmountBob = orders.reduce((acc, o) => acc + (o.totalBob || 0), 0);
  const deliveredOrdersCount = orders.filter((o) => o.status === 'ENTREGADO').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'PENDIENTE' || o.status === 'PAGADO').length;

  const calculatedUsd = (parseFloat(calcBobInput) || 0) / (exchangeConfig.rate || 12.50);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-cacao-900 rounded-3xl p-8 border border-pastel-sandDark dark:border-cacao-800 shadow-2xl space-y-6 transition-colors">
          <div className="text-center space-y-2">
            <div className="relative w-16 h-16 rounded-3xl overflow-hidden mx-auto shadow-soft border border-pastel-amberBorder dark:border-amber-800/70 bg-sucrenita-800">
              <Image
                src="/logo-profile.jpg"
                alt="Logo Productos Sucreñita"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h1 className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-cacao-50">
              Panel Administrativo
            </h1>
            <p className="text-xs text-sucrenita-600 dark:text-cacao-300">
              Productos Sucreñita &bull; Gestión integral de catálogo, pedidos y divisas
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-pastel-peach dark:bg-rose-950/60 border border-pastel-peachBorder dark:border-rose-800/60 text-pastel-peachText dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-pastel-peachText" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="admin-username"
                className="text-xs font-semibold text-sucrenita-800 dark:text-cacao-200 block"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-xs text-sucrenita-900 dark:text-cacao-100 placeholder-sucrenita-400 dark:placeholder-cacao-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="admin-password"
                className="text-xs font-semibold text-sucrenita-800 dark:text-cacao-200 block"
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
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-xs text-sucrenita-900 dark:text-cacao-100 placeholder-sucrenita-400 dark:placeholder-cacao-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Ver u ocultar contraseña"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sucrenita-400 hover:text-sucrenita-700 dark:text-cacao-400 dark:hover:text-cacao-100"
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
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold text-xs shadow-soft transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoggingIn ? 'Verificando...' : 'Ingresar al Panel'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-pastel-sandDark dark:border-cacao-800 text-center">
            <Link
              href="/"
              className="text-xs text-sucrenita-500 dark:text-cacao-300 hover:text-sucrenita-800 dark:hover:text-cacao-100 transition-colors inline-flex items-center gap-1"
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
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-cacao-900/95 backdrop-blur-md border-b border-pastel-sandDark dark:border-cacao-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-pastel-amberBorder dark:border-amber-800/70 bg-sucrenita-800 shrink-0 shadow-soft">
              <Image
                src="/logo-profile.jpg"
                alt="Logo Productos Sucreñita"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50 block leading-tight">
                Productos Sucreñita
              </span>
              <span className="text-[11px] text-pastel-peachText dark:text-amber-300 font-bold uppercase tracking-wider">
                Panel de Administración Integral
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-sucrenita-900 dark:text-cacao-100">
                {adminUser?.name || 'Jhojan Erick Romero Morales'}
              </span>
              <span className="text-[11px] text-pastel-sageText dark:text-emerald-400 font-medium">
                @{adminUser?.username || 'engel7u7'} &bull; Administrador
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pastel-sand/60 hover:bg-pastel-amber/40 dark:bg-cacao-800 dark:hover:bg-cacao-750 border border-pastel-sandDark dark:border-cacao-700 text-xs font-semibold text-sucrenita-700 dark:text-cacao-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ver Tienda</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pastel-peach/60 hover:bg-pastel-peach dark:bg-rose-950/60 dark:hover:bg-rose-900/60 border border-pastel-peachBorder dark:border-rose-800/60 text-xs font-semibold text-pastel-peachText dark:text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>

        <div className="border-t border-pastel-sandDark dark:border-cacao-800 bg-pastel-sand/30 dark:bg-cacao-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-sucrenita-800 dark:bg-amber-700 text-white shadow-soft'
                  : 'bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-cacao-200 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Catálogo & Inventario</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {products.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-sucrenita-800 dark:bg-amber-700 text-white shadow-soft'
                  : 'bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-cacao-200 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ventas & Pedidos</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {orders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rates')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'rates'
                  ? 'bg-sucrenita-800 dark:bg-amber-700 text-white shadow-soft'
                  : 'bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-cacao-200 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Divisas & Tipo de Cambio</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {exchangeConfig.rate.toFixed(2)} Bs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-sucrenita-800 dark:bg-amber-700 text-white shadow-soft'
                  : 'bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-cacao-200 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Finanzas & Estadísticas</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'catalog' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-pastel-amberText" />
                  Total Catálogo
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {products.length}
                </div>
                <span className="text-[11px] text-pastel-sageText dark:text-emerald-400 font-semibold block">
                  {activeCount} productos activos
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <PackageCheck className="w-3.5 h-3.5 text-pastel-sageText" />
                  Stock Disponible
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {totalStock}
                </div>
                <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300 block">
                  Unidades en almacén
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <Wheat className="w-3.5 h-3.5 text-pastel-peachText" />
                  Abarrotes & Maní
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {products.filter((p) => p.categoryId === 'cat-abarrotes').length}
                </div>
                <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300 block">
                  Línea cocina tradicional
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-pastel-sageText" />
                  Snacks Caseros
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {products.filter((p) => p.categoryId === 'cat-snacks').length}
                </div>
                <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300 block">
                  Chicharrones y tostados
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-md">
                  <Search className="w-4 h-4 text-sucrenita-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre o slug..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-xs text-sucrenita-900 dark:text-cacao-100 placeholder-sucrenita-400 dark:placeholder-cacao-400"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3.5 py-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 text-xs font-semibold text-sucrenita-800 dark:text-cacao-100 focus:outline-none"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="cat-abarrotes">Abarrotes y Condimentos</option>
                    <option value="cat-snacks">Snacks Artesanales</option>
                  </select>

                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold text-xs shadow-soft transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Producto</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-cacao-850 rounded-3xl border border-pastel-sandDark dark:border-cacao-800 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-pastel-sandDark dark:border-cacao-800 bg-pastel-sand/40 dark:bg-cacao-900 text-sucrenita-600 dark:text-cacao-300 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-4">Foto</th>
                      <th className="p-4">Nombre Comercial</th>
                      <th className="p-4">Categoría</th>
                      <th className="p-4">Precio (Bs)</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Estado</th>
                      <th className="p-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pastel-sandDark/70 dark:divide-cacao-800">
                    {filteredProducts.map((p) => {
                      const priceNum =
                        typeof p.price === 'string' ? parseFloat(p.price) : p.price;
                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-pastel-sand/20 dark:hover:bg-cacao-800/40 transition-colors"
                        >
                          <td className="p-4">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pastel-sand dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 shrink-0">
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
                            <span className="font-serif font-bold text-sucrenita-900 dark:text-cacao-100 block text-xs">
                              {p.name}
                            </span>
                            <span className="font-mono text-[10px] text-sucrenita-400 dark:text-cacao-300">
                              {p.slug}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-pastel-amber/50 dark:bg-amber-950/60 text-pastel-amberText dark:text-amber-300 border border-pastel-amberBorder dark:border-amber-800/60">
                              {p.category?.name || 'Abarrotes'}
                            </span>
                          </td>
                          <td className="p-4 font-serif font-bold text-xs text-sucrenita-900 dark:text-cacao-50">
                            Bs {priceNum.toFixed(2)}
                          </td>
                          <td className="p-4 font-medium text-sucrenita-700 dark:text-cacao-200">
                            {p.stock} unidades
                          </td>
                          <td className="p-4">
                            <button
                              type="button"
                              onClick={() => handleToggleActive(p.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                                p.isActive
                                  ? 'bg-pastel-sage text-pastel-sageText border-pastel-sageBorder dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
                                  : 'bg-pastel-peach text-pastel-peachText border-pastel-peachBorder dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  p.isActive ? 'bg-[#1F7A4C]' : 'bg-pastel-peachText'
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
                                className="p-2 rounded-xl bg-pastel-sand/60 hover:bg-pastel-amber/50 dark:bg-cacao-800 dark:hover:bg-cacao-750 text-sucrenita-700 dark:text-cacao-200 border border-pastel-sandDark dark:border-cacao-700 transition-colors"
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
          </>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-pastel-amberText" />
                  Total Órdenes
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {orders.length}
                </div>
                <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300 block">
                  Registros en sistema
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-pastel-sageText" />
                  Monto Facturado
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  Bs {totalOrdersAmountBob.toFixed(2)}
                </div>
                <span className="text-[11px] text-pastel-sageText dark:text-emerald-400 font-semibold block">
                  Total en bolivianos
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-pastel-peachText" />
                  Por Despachar
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {pendingOrdersCount}
                </div>
                <span className="text-[11px] text-pastel-peachText dark:text-amber-300 block">
                  Pendientes y pagados
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-1">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pastel-sageText" />
                  Entregados
                </span>
                <div className="font-serif text-3xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {deliveredOrdersCount}
                </div>
                <span className="text-[11px] text-pastel-sageText dark:text-emerald-400 block">
                  Completados con éxito
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sucrenita-600 dark:text-cacao-300" />
                <span className="text-xs font-bold text-sucrenita-900 dark:text-cacao-100">
                  Filtrar Registro de Ventas:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 text-xs font-semibold text-sucrenita-800 dark:text-cacao-100 focus:outline-none"
                >
                  <option value="all">Todos los estados</option>
                  <option value="PENDIENTE">Pendientes</option>
                  <option value="PAGADO">Pagados</option>
                  <option value="EN_CAMINO">En Camino</option>
                  <option value="ENTREGADO">Entregados</option>
                </select>

                <select
                  value={orderMethodFilter}
                  onChange={(e) => setOrderMethodFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 text-xs font-semibold text-sucrenita-800 dark:text-cacao-100 focus:outline-none"
                >
                  <option value="all">Todos los métodos de pago</option>
                  <option value="SIMPLE_QR">Simple QR Bancario</option>
                  <option value="PAYPAL">PayPal Checkout</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 space-y-2">
                  <ShoppingBag className="w-10 h-10 text-sucrenita-400 mx-auto" />
                  <h4 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-100">
                    No se encontraron pedidos con estos filtros
                  </h4>
                  <p className="text-xs text-sucrenita-500 dark:text-cacao-300">
                    Los nuevos pedidos realizados por Simple QR o PayPal aparecerán automáticamente aquí.
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const statusColors: Record<OrderStatus, string> = {
                    PENDIENTE: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
                    PAGADO: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
                    EN_CAMINO: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
                    ENTREGADO: 'bg-pastel-sage dark:bg-emerald-950/70 text-pastel-sageText dark:text-emerald-300 border-pastel-sageBorder dark:border-emerald-800/70',
                  };

                  const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
                  const notifyMsg = encodeURIComponent(
                    `Hola ${order.customerName}, le saludamos de Productos Sucreñita. Le informamos sobre su pedido #${order.id}: el estado actual es ${order.status}. Total: Bs ${order.totalBob.toFixed(2)}. ¡Muchas gracias por preferir nuestra sazón chuquisaqueña!`
                  );

                  return (
                    <div
                      key={order.id}
                      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pastel-sandDark/70 dark:border-cacao-700 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-sucrenita-900 dark:text-cacao-50">
                            #{order.id}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sucrenita-600 dark:text-cacao-300 bg-pastel-sand/50 dark:bg-cacao-800 px-2 py-0.5 rounded-lg border border-pastel-sandDark dark:border-cacao-700">
                            {order.paymentMethod === 'PAYPAL' ? (
                              <>
                                <PayPalIcon className="w-3.5 h-3.5" />
                                <span>PayPal (${order.totalUsd?.toFixed(2)} USD)</span>
                              </>
                            ) : (
                              <>
                                <QrCode className="w-3.5 h-3.5 text-pastel-amberText" />
                                <span>Simple QR Bancario</span>
                              </>
                            )}
                          </span>
                        </div>

                        <span className="text-xs text-sucrenita-500 dark:text-cacao-400">
                          {order.createdAt}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="font-bold text-sucrenita-800 dark:text-cacao-200 block uppercase tracking-wider text-[10px]">
                            Cliente y Destino
                          </span>
                          <p className="font-semibold text-sucrenita-900 dark:text-cacao-100">
                            {order.customerName}
                          </p>
                          <p className="text-sucrenita-600 dark:text-cacao-300 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{order.customerPhone}</span>
                          </p>
                          <p className="text-sucrenita-600 dark:text-cacao-300 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{order.customerCity} &bull; {order.customerAddress}</span>
                          </p>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <span className="font-bold text-sucrenita-800 dark:text-cacao-200 block uppercase tracking-wider text-[10px]">
                            Productos Ordenados
                          </span>
                          <div className="bg-pastel-sand/30 dark:bg-cacao-900/60 p-3 rounded-2xl border border-pastel-sandDark/60 dark:border-cacao-800 space-y-1">
                            {order.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs text-sucrenita-800 dark:text-cacao-200"
                              >
                                <span>
                                  {it.quantity}x {it.name}
                                </span>
                                <span className="font-serif font-semibold">
                                  Bs {(it.priceBob * it.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                            <div className="pt-2 border-t border-pastel-sandDark/70 dark:border-cacao-700 flex items-center justify-between font-bold text-sucrenita-900 dark:text-cacao-50">
                              <span>Total a Cobrar:</span>
                              <span className="font-serif text-sm">
                                Bs {order.totalBob.toFixed(2)}
                                {order.totalUsd && (
                                  <span className="text-xs text-[#003087] dark:text-sky-300 font-sans ml-1.5">
                                    (${order.totalUsd.toFixed(2)} USD)
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-pastel-sandDark/60 dark:border-cacao-700 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-sucrenita-600 dark:text-cacao-300">
                            Cambiar estado:
                          </span>
                          {(['PENDIENTE', 'PAGADO', 'EN_CAMINO', 'ENTREGADO'] as OrderStatus[]).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleUpdateOrderStatus(order.id, st)}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
                                order.status === st
                                  ? 'bg-sucrenita-800 dark:bg-amber-700 text-white shadow-soft'
                                  : 'bg-pastel-sand/60 dark:bg-cacao-800 text-sucrenita-700 dark:text-cacao-200 hover:bg-pastel-sand border border-pastel-sandDark dark:border-cacao-700'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${cleanPhone || '59171152182'}?text=${notifyMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1F7A4C] hover:bg-[#19653E] text-white text-[11px] font-semibold transition-colors"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                            <span>Notificar al Cliente</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-1.5 rounded-xl text-sucrenita-400 hover:text-rose-600 transition-colors"
                            aria-label="Eliminar registro de orden"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'rates' && (
          <div className="space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pastel-sandDark/70 dark:border-cacao-700 pb-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pastel-amber/60 dark:bg-amber-950/60 text-pastel-amberText dark:text-amber-300 border border-pastel-amberBorder dark:border-amber-800/60 mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Cotización Oficial para Pasarelas Digitales</span>
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-cacao-50">
                    Tipo de Cambio BOB / USD (PayPal)
                  </h3>
                  <p className="text-xs text-sucrenita-600 dark:text-cacao-300 mt-1 max-w-2xl leading-relaxed">
                    Ajusta la tasa de cambio paralela y referencial que se utiliza para calcular el monto en dólares estadounidenses en la pasarela de PayPal de la tienda virtual, en concordancia con estimaciones del Ministerio de Economía y el Banco Central de Bolivia (BCB).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 text-center shrink-0">
                  <span className="text-[10px] text-sucrenita-500 dark:text-cacao-400 uppercase font-bold tracking-wider block">
                    Tasa Activa en Tienda
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#003087] dark:text-sky-300 mt-0.5">
                    {exchangeConfig.rate.toFixed(2)} Bs
                  </div>
                  <span className="text-[10px] text-sucrenita-500 dark:text-cacao-400">
                    por 1.00 USD
                  </span>
                </div>
              </div>

              {rateSuccessMessage && (
                <div className="p-3.5 rounded-2xl bg-pastel-sage dark:bg-emerald-950/60 border border-pastel-sageBorder dark:border-emerald-800/60 text-pastel-sageText dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-pastel-sageText" />
                  <span>{rateSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveRate} className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Valor de Cambio (Bolivianos por cada Dólar USD)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="0.10"
                      min="1"
                      required
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="w-44 px-4 py-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 font-serif font-bold text-lg text-sucrenita-900 dark:text-cacao-100 focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold text-xs shadow-soft transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Actualizar Cotización</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Presets y Cotizaciones Rápidas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[11.50, 12.00, 12.50, 13.00, 13.50, 14.00].map((presetVal) => (
                      <button
                        key={presetVal}
                        type="button"
                        onClick={() => handleApplyPresetRate(presetVal)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          exchangeConfig.rate === presetVal
                            ? 'bg-sucrenita-800 dark:bg-amber-700 text-white border-transparent'
                            : 'bg-pastel-sand/40 dark:bg-cacao-800 text-sucrenita-700 dark:text-cacao-200 hover:bg-pastel-sand border-pastel-sandDark dark:border-cacao-700'
                        }`}
                      >
                        {presetVal.toFixed(2)} Bs
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Nota explicativa o Fuente Oficial
                  </label>
                  <input
                    type="text"
                    value={rateNoteInput}
                    onChange={(e) => setRateNoteInput(e.target.value)}
                    placeholder="Ej. Cotización referencial según estimaciones del Ministerio de Economía / BCB"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 text-xs text-sucrenita-900 dark:text-cacao-100 focus:outline-none"
                  />
                </div>
              </form>

              <div className="pt-4 border-t border-pastel-sandDark/70 dark:border-cacao-700">
                <h4 className="font-serif font-bold text-sm text-sucrenita-900 dark:text-cacao-100 mb-3">
                  Simulador de Conversión Inmediata
                </h4>
                <div className="p-4 rounded-2xl bg-pastel-sand/40 dark:bg-cacao-900/60 border border-pastel-sandDark dark:border-cacao-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-sucrenita-700 dark:text-cacao-200">
                      Si el cliente gasta:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        value={calcBobInput}
                        onChange={(e) => setCalcBobInput(e.target.value)}
                        className="w-28 px-3 py-1.5 rounded-xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 font-bold text-xs text-sucrenita-900 dark:text-cacao-100"
                      />
                      <span className="text-xs font-bold text-sucrenita-700 dark:text-cacao-200">
                        BOB
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-sucrenita-700 dark:text-cacao-200">
                      Paga exactamente en PayPal:
                    </span>
                    <span className="font-serif text-xl font-bold text-[#003087] dark:text-sky-300">
                      ${calculatedUsd.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-pastel-amber/30 dark:bg-amber-950/40 border border-pastel-amberBorder dark:border-amber-800/60 text-xs text-sucrenita-800 dark:text-amber-100 space-y-1.5">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-pastel-amberText dark:text-amber-300" />
                  <span>Transparencia Cambiaria para Clientes del Exterior</span>
                </span>
                <p className="text-[11px] leading-relaxed text-sucrenita-700 dark:text-cacao-200">
                  Al emplear esta tasa paralela/referencial, los turistas y familiares residentes en el extranjero pagan el contravalor equivalente real en dólares, evitando discrepancias cambiarias en Bolivia y garantizando fondos íntegros para el taller artesanal.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-3">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-pastel-sageText" />
                  Valoración Total del Almacén
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  Bs {totalCatalogValueBob.toFixed(2)}
                </div>
                <p className="text-xs text-sucrenita-600 dark:text-cacao-300 leading-relaxed">
                  Calculado multiplicando el precio comercial por el stock registrado de cada producto en inventario.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-3">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-pastel-amberText" />
                  Equivalente en Dólares (PayPal)
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#003087] dark:text-sky-300">
                  ${(totalCatalogValueBob / exchangeConfig.rate).toFixed(2)} USD
                </div>
                <p className="text-xs text-sucrenita-600 dark:text-cacao-300 leading-relaxed">
                  Valor estimado al tipo de cambio paralelo activo de 1 USD = {exchangeConfig.rate.toFixed(2)} BOB.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-3">
                <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pastel-sageText" />
                  Disponibilidad de Catálogo
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  {((activeCount / (products.length || 1)) * 100).toFixed(0)}%
                </div>
                <p className="text-xs text-sucrenita-600 dark:text-cacao-300 leading-relaxed">
                  {activeCount} de {products.length} productos listados se encuentran activos y visibles en la tienda pública.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-4">
                <h4 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50 flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-pastel-amberText" />
                  <span>Distribución por Línea Comercial</span>
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-pastel-sand/40 dark:bg-cacao-900/60 border border-pastel-sandDark dark:border-cacao-700 flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-xs text-sucrenita-900 dark:text-cacao-100">
                        Abarrotes & Maní Tradicional
                      </h5>
                      <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300">
                        Maní molido, ají en vaina, ají molido y quintales
                      </span>
                    </div>
                    <span className="font-serif font-bold text-sm text-sucrenita-900 dark:text-cacao-50">
                      {products.filter((p) => p.categoryId === 'cat-abarrotes').length} productos
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-pastel-sand/40 dark:bg-cacao-900/60 border border-pastel-sandDark dark:border-cacao-700 flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-xs text-sucrenita-900 dark:text-cacao-100">
                        Snacks Artesanales Caseros
                      </h5>
                      <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300">
                        Chicharrón en tira, platanitos, habas saladas y garrapiñados
                      </span>
                    </div>
                    <span className="font-serif font-bold text-sm text-sucrenita-900 dark:text-cacao-50">
                      {products.filter((p) => p.categoryId === 'cat-snacks').length} productos
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-4">
                <h4 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-pastel-sageText" />
                  <span>Canales de Venta & Pagos Habilitados</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-pastel-sand/30 dark:bg-cacao-900/60 border border-pastel-sandDark/70 dark:border-cacao-700">
                    <span className="font-medium text-sucrenita-800 dark:text-cacao-200">Simple QR Bancario (Bolivia):</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Activo (Sin comisiones)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-pastel-sand/30 dark:bg-cacao-900/60 border border-pastel-sandDark/70 dark:border-cacao-700">
                    <span className="font-medium text-sucrenita-800 dark:text-cacao-200">PayPal Checkout Internacional:</span>
                    <span className="font-bold text-[#003087] dark:text-sky-300">Activo (1 USD = {exchangeConfig.rate.toFixed(2)} BOB)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-pastel-sand/30 dark:bg-cacao-900/60 border border-pastel-sandDark/70 dark:border-cacao-700">
                    <span className="font-medium text-sucrenita-800 dark:text-cacao-200">WhatsApp Oficial Directo:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">+591 71152182</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-pastel-sand/30 dark:bg-cacao-900/60 border border-pastel-sandDark/70 dark:border-cacao-700">
                    <span className="font-medium text-sucrenita-800 dark:text-cacao-200">Cobertura de Envíos:</span>
                    <span className="font-bold text-sucrenita-900 dark:text-cacao-100">Sucre (24h) y Encomiendas Nacionales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-cacao-900 rounded-3xl overflow-hidden shadow-2xl border border-pastel-sandDark dark:border-cacao-800 max-h-[90vh] flex flex-col transition-colors">
            <div className="bg-gradient-to-r from-pastel-amber to-amber-200/80 dark:from-cacao-950 dark:to-cacao-900 p-5 border-b border-pastel-amberBorder dark:border-cacao-800 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">
                {editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/40 dark:hover:bg-cacao-800 text-sucrenita-700 dark:text-cacao-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveProduct}
              className="p-6 overflow-y-auto space-y-4 flex-1 text-xs"
            >
              {formSuccessMessage && (
                <div className="p-3 rounded-2xl bg-pastel-sage dark:bg-emerald-950/60 border border-pastel-sageBorder dark:border-emerald-800/60 text-pastel-sageText dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pastel-sageText shrink-0" />
                  <span>{formSuccessMessage}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                  Nombre Comercial del Producto
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => handleFormNameChange(e.target.value)}
                  placeholder="Ej. Maní Tostado sin Sal (500g)"
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-sucrenita-900 dark:text-cacao-100 placeholder-sucrenita-400 dark:placeholder-cacao-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Slug / URL Única
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="mani-tostado-sin-sal-500g"
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 font-mono text-[11px] text-sucrenita-700 dark:text-cacao-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Categoría
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 font-semibold text-sucrenita-800 dark:text-cacao-100"
                  >
                    <option value="cat-abarrotes">Abarrotes y Condimentos</option>
                    <option value="cat-snacks">Snacks Artesanales</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Precio en Bolivianos (Bs)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 font-bold text-sucrenita-900 dark:text-cacao-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                    Stock en Almacén (Unidades)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-900 dark:text-cacao-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                  Foto del Producto
                </label>
                <select
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-800 dark:text-cacao-100 mb-2 font-medium"
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
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 font-mono text-[11px] text-sucrenita-700 dark:text-cacao-200"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-sucrenita-800 dark:text-cacao-200 block">
                  Descripción y Consejos Culinarios
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detalles del producto, calidad de grano, textura..."
                  className="w-full p-2.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-900 dark:text-cacao-100"
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
                  className="font-medium text-sucrenita-800 dark:text-cacao-200 cursor-pointer"
                >
                  Producto visible y disponible en la tienda pública
                </label>
              </div>

              <div className="pt-4 border-t border-pastel-sandDark dark:border-cacao-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-pastel-sand hover:bg-pastel-amber/40 dark:bg-cacao-800 dark:hover:bg-cacao-750 text-sucrenita-700 dark:text-cacao-200 font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold shadow-soft transition-all"
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
