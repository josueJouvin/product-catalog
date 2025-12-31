# Catálogo de Productos - Prueba Técnica

Aplicación de catálogo de productos con gestión de favoritos usando Redux Toolkit.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Ejecutar test
npm run test
```

## 📁 Estructura del Proyecto

```
src/
├── api/
│   └── productsApi.ts        # Servicio HTTP para Fake Store API
├── store/
│   ├── store.ts              # Configuración del store Redux
│   └── productsSlice.ts      # Estado de productos + thunks + selectores
├── hooks/
│   └── useProducts.ts        # Custom hook refactorizado
├── components/
│   ├── Header.tsx            # Header de la aplicación
│   ├── ProductCard.tsx       # Card individual de producto
│   └── FavoriteToggleButton.tsx # Botón de favoritos reutilizable
├── pages/
│   ├── ProductList.tsx       # Vista principal (lista)
│   └── ProductDetail.tsx     # Vista de detalle
├── utils/
│   └── formatPrice.ts        # Utilidad para formatear precios
└── types/
    └── product.ts            # Tipos TypeScript
```

## 🏗️ Arquitectura

### API Integration

- **Fake Store API:** Integración con API externa para obtener productos reales
- **Mapeo de datos:** Adapta el contrato externo al formato interno
- **AsyncThunk:** Manejo de estados asíncronos (pending/fulfilled/rejected)

### Redux Store

- **Slice:** `productsSlice` maneja estado de productos y llamadas API
- **Thunk:** `fetchProducts` para carga asíncrona desde la API
- **Reducer:** `toggleFavorite` para cambiar estado de favorito
- **Selectores memoizados:** Optimizan cálculos de favoritos y totales

### Custom Hook

`useProducts` encapsula toda la lógica de lectura/escritura del store:

- **Lectura:** Selectores para productos, favoritos, conteos y totales
- **Escritura:** Dispatch de acciones para modificar estado
- **Refactorizado:** De 230 líneas a menos de 50 líneas

### Utilidades

`formatPrice` función helper para formatear precios:

- **Formato:** Estándar USD con separadores de miles ($2,849.97)
- **Implementación:** Usa `Intl.NumberFormat` nativo de JavaScript

### Componentes

- **ProductList:** Vista principal con grid de productos
- **ProductDetail:** Vista de detalle de producto individual
- **ProductCard:** Componente reutilizable para cada producto

## 🔄 Refactorización

### Código Original (useProducts.ts)

El hook original contenía código "sucio":

- ❌ 10+ variables de estado local que duplicaban Redux
- ❌ 9 useEffect que solo copiaban valores
- ❌ Funciones duplicadas
- ❌ Cálculos repetidos sin memoización real

### Mejoras Aplicadas

- ✅ Eliminado todo el estado local innecesario
- ✅ Implementados selectores memoizados con `createSelector`
- ✅ Unificadas funciones duplicadas
- ✅ Removidas caches innecesarias

Ver detalles completos en [REFACTORING.md](./REFACTORING.md)

## 🛠️ Tecnologías

- React 18
- TypeScript
- Redux Toolkit
- Material UI
- Bootstrap
- React Router DOM
- Vite
- Vitest

## 📋 Funcionalidades

### Vista Principal

- ✅ Carga de productos desde Fake Store API
- ✅ Estados de loading y error
- ✅ Lista de productos en grid responsive
- ✅ Toggle de favoritos con feedback visual
- ✅ Resumen de favoritos (cantidad y total en $)
- ✅ Navegación a detalle de producto
- ✅ Visualización de ID de producto en cada card
- ✅ Precios formateados con separadores de miles

### Vista de Detalle

- ✅ Información completa del producto
- ✅ Botón para volver a la lista
- ✅ Manejo de producto no encontrado
- ✅ Chips con ID y categoría
- ✅ Precio formateado correctamente

## 👨‍💻 Autor

Josue Garces Jouvin
