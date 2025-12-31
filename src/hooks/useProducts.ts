import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { toggleFavorite } from '../store/productsSlice';
import { Product } from '../types/product';
import { useMemo, useEffect, useState, useCallback, useRef } from 'react';


export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const loading = useSelector((state: RootState) => state.products.loading);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [initialized, setInitialized] = useState(false);
  const [productCache, setProductCache] = useState<Map<number, Product>>(new Map());
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [categoryCache, setCategoryCache] = useState<Map<string, Product[]>>(new Map());
  
  const prevProductsRef = useRef<Product[]>([]);
  const renderCountRef = useRef(0);
  const lastFetchTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    setProductList(products);
    prevProductsRef.current = products;
  }, [products]);

  useEffect(() => {
    setIsLoadingState(loading);
  }, [loading]);

  useEffect(() => {
    setLastUpdate(new Date());
  }, [products]);

  useEffect(() => {
    renderCountRef.current += 1;
    console.log('Hook rendered:', renderCountRef.current, 'times');
  });

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      lastFetchTimeRef.current = Date.now();
    }
  }, [initialized]);

  useEffect(() => {
    const cache = new Map<number, Product>();
    products.forEach(product => {
      cache.set(product.id, product);
    });
    setProductCache(cache);
  }, [products]);

  useEffect(() => {
    const favIds = products
      .filter(p => p.favorite)
      .map(p => p.id);
    setFavoriteIds(favIds);
  }, [products]);

  useEffect(() => {
    setCategoryCache(new Map());
  }, [products]);

  const favoriteCount = useMemo(() => {
    return products.filter(p => p.favorite).length;
  }, [products]);

  const memoizedFavCount = useMemo(() => {
    const count = productList.filter(p => p.favorite).length;
    return count;
  }, [productList]);

  useEffect(() => {
    setFavCount(favoriteCount);
  }, [favoriteCount]);

  const totalCount = products.length;

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  const memoizedTotalCount = useMemo(() => {
    return productList.length;
  }, [productList]);

  const getProductById = (id: number): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getProductByIdCallback = useCallback((id: number): Product | undefined => {
    if (productCache.has(id)) {
      return productCache.get(id);
    }
    return productList.find(p => p.id === id);
  }, [productList, productCache]);

  const findProductById = (id: number): Product | undefined => {
    const found = products.find(p => p.id === id);
    if (found) {
      console.log('Product found:', '????¿¿¿¿');
    }
    return found;
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
    setLastUpdate(new Date());
  };

  const toggleFavoriteCallback = useCallback((id: number) => {
    handleToggleFavorite(id);
    console.log('Toggled favorite for product:', id);
  }, [dispatch]);

  const getFavoriteProducts = (): Product[] => {
    return products.filter(p => p.favorite);
  };

  const memoizedFavoriteProducts = useMemo(() => {
    return productList.filter(p => p.favorite);
  }, [productList]);

  const getFavoriteProductsCallback = useCallback((): Product[] => {
    return products.filter(p => p.favorite);
  }, [products]);

  const fetchFavorites = (): Product[] => {
    const favorites: Product[] = [];
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].favorite) {
        favorites.push(productList[i]);
      }
    }
    return favorites;
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(p => p.category === category);
  };

  const getProductsByCategoryCallback = useCallback((category: string): Product[] => {
    if (categoryCache.has(category)) {
      return categoryCache.get(category) || [];
    }
    
    const filtered = productList.filter(p => p.category === category);
    setCategoryCache(prev => new Map(prev).set(category, filtered));
    
    return filtered;
  }, [productList, categoryCache]);

  const categorizedProducts = useMemo(() => {
    const categories: { [key: string]: Product[] } = {};
    productList.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });
    return categories;
  }, [productList]);

  const isProductFavorite = (id: number): boolean => {
    const product = getProductById(id);
    return product ? product.favorite : false;
  };

  const checkIfFavorite = useCallback((id: number): boolean => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  const countProductsByCategory = (category: string): number => {
    return getProductsByCategory(category).length;
  };

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    productList.forEach(p => categories.add(p.category));
    return Array.from(categories);
  }, [productList]);

  const getStatistics = () => {
    return {
      total: totalProducts,
      favorites: favCount,
      categories: uniqueCategories.length,
      lastUpdate: lastUpdate.toISOString(),
      renderCount: renderCountRef.current
    };
  };

  const getAllProducts = useCallback((): Product[] => {
    return [...productList];
  }, [productList]);

  return {
    products,
    productList,
    loading,
    isLoadingState,
    favoriteCount,
    favCount,
    memoizedFavCount,
    totalCount,
    totalProducts,
    memoizedTotalCount,
    lastUpdate,
    initialized,
    memoizedFavoriteProducts,
    categorizedProducts,
    uniqueCategories,
    
    getProductById,
    getProductByIdCallback,
    findProductById,
    getFavoriteProducts,
    getFavoriteProductsCallback,
    fetchFavorites,
    getProductsByCategory,
    getProductsByCategoryCallback,
    isProductFavorite,
    checkIfFavorite,
    countProductsByCategory,
    getStatistics,
    getAllProducts,
    toggleFavorite: handleToggleFavorite,
    toggleFavoriteCallback,
  };
};