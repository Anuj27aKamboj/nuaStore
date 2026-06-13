# NuaStore

Mini e-commerce app for the Nua frontend assignment.

**Live URL:** _add after deploying_

---

## Setup

Node 18+ required.

```bash
git clone <your-repo-url>
cd nua-store
npm install
npm run dev
```

Opens at `http://localhost:5173`. `npm run build` works without errors.

---

## Stack

- React 18 + TypeScript
- Vite
- React Router v6
- SCSS Modules (BEM)
- Context API + useReducer
- localStorage for cart persistence
- Fake Store API

---

## Folder structure

```
src/
├── components/
│   ├── Navbar/
│   ├── ProductCard/
│   ├── CartDrawer/
│   ├── VariantSelector/
│   └── QuantityPicker/
├── pages/
│   ├── Home/
│   └── ProductDetail/
├── context/
│   ├── CartContext.tsx
│   └── cartReducer.ts
├── hooks/
│   └── useProducts.ts
├── utils/
│   └── variants.ts
├── types/
│   └── index.ts
└── styles/
    ├── _variables.scss
    └── global.scss
```

See [DECISIONS.md](./DECISIONS.md) for design decisions and trade-offs.
