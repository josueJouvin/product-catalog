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
├── store/
│   ├── store.ts              # Configuración del store Redux
│   └── productsSlice.ts      # Estado de productos + selectores memoizados
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
├── types/
│   └── product.ts            # Tipos TypeScript
└── mocks/
    └── initialProducts.ts    # Datos estáticos
```

## 🏗️ Arquitectura

### Redux Store

- **Slice:** `productsSlice` maneja todo el estado de productos
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

- ✅ Lista de productos en grid responsive
- ✅ Toggle de favoritos con feedback visual
- ✅ Resumen de favoritos (cantidad y total en $)
- ✅ Navegación a detalle de producto

### Vista de Detalle

- ✅ Información completa del producto
- ✅ Botón para volver a la lista
- ✅ Manejo de producto no encontrado

## 👨‍💻 Autor

Josue Garces Jouvin
