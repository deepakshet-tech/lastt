import { useEffect, useState } from "react";
import { GlobalStyle, Navbar, Footer, SearchModal, CartDrawer, AuthModal } from "./shared.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { CollectionsPage } from "./pages/CollectionsPage.jsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.jsx";
import { BridalPage } from "./pages/BridalPage.jsx";
import { CustomOrderPage } from "./pages/CustomOrderPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { PolicyPage } from "./pages/PolicyPage.jsx";

const PAGE_PATHS = {
  Home: "/",
  Collections: "/collections",
  Bridal: "/bridal",
  "Custom Order": "/custom-order",
  Contact: "/contact",
};

const POLICY_KEYS = [
  "About Us",
  "Privacy Policy",
  "Return Policy",
  "Shipping Policy",
  "Terms & Conditions",
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const titleFromSegment = (segment) =>
  segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const getRouteState = () => {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const [, first = "", second = ""] = path.split("/");

  if (first === "collections") {
    return {
      page: "Collections",
      collectionsTab: second ? titleFromSegment(decodeURIComponent(second)) : "Rings",
      policyPage: null,
    };
  }

  if (first === "policy") {
    const key = POLICY_KEYS.find((item) => slugify(item) === second) || "About Us";
    return { page: "Policy", collectionsTab: "Rings", policyPage: key };
  }

  if (first === "bridal") return { page: "Bridal", collectionsTab: "Rings", policyPage: null };
  if (first === "custom-order") return { page: "Custom Order", collectionsTab: "Rings", policyPage: null };
  if (first === "contact") return { page: "Contact", collectionsTab: "Rings", policyPage: null };

  return { page: "Home", collectionsTab: "Rings", policyPage: null };
};

const pushPath = (path) => {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
};

export default function App() {
  const initialRoute = getRouteState();
  const [page, setPage] = useState(initialRoute.page);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [collectionsTab, setCollectionsTab] = useState(initialRoute.collectionsTab);
  const [policyPage, setPolicyPage] = useState(initialRoute.policyPage);

  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteState();
      setPage(route.page);
      setCollectionsTab(route.collectionsTab);
      setPolicyPage(route.policyPage);
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (targetPage) => {
    setPage(targetPage);
    setPolicyPage(null);
    setSelectedProduct(null);
    pushPath(PAGE_PATHS[targetPage] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPolicyPage = (key) => {
    setPolicyPage(key);
    setPage("Policy");
    setSelectedProduct(null);
    pushPath(`/policy/${slugify(key)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openShopCategory = (category) => {
    setCollectionsTab(category);
    setPage("Collections");
    setPolicyPage(null);
    setSelectedProduct(null);
    pushPath(`/collections/${slugify(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => setCartItems((prev) => [...prev, product]);
  const removeFromCart = (idx) =>
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  const clearCart = () => setCartItems([]);
  const placeOrder = (orderDetails) => {
    setOrders((prev) => [orderDetails, ...prev]);
    setCartItems([]);
  };
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.findIndex((p) => p.id === product.id);
      if (exists >= 0) return prev.filter((_, i) => i !== exists);
      return [...prev, product];
    });
  };
  const removeWishlist = (idx) =>
    setWishlist((prev) => prev.filter((_, i) => i !== idx));
  const isWishlisted = (id) => wishlist.some((p) => p.id === id);

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setPage("ProductDetail");
    pushPath("/product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAuth = () => setShowAuth(true);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <GlobalStyle />
      <Navbar
        page={page}
        setPage={navigateTo}
        cartCount={cartItems.length}
        setCollectionsTab={setCollectionsTab}
        onSearchOpen={() => setShowSearch(true)}
        onCartOpen={() => setShowCart(true)}
        onProfileOpen={() => setShowAuth(true)}
        user={user}
      />

      <main style={{ minHeight: "70vh" }}>
        {page === "Home" && (
          <HomePage
            setPage={navigateTo}
            onAddToCart={addToCart}
            setCollectionsTab={setCollectionsTab}
            user={user}
            onOpenAuth={openAuth}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}
        {page === "Collections" && (
          <CollectionsPage
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            activeTab={collectionsTab}
            setActiveTab={setCollectionsTab}
            user={user}
            onOpenAuth={openAuth}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}
        {page === "ProductDetail" && selectedProduct && (
          <ProductDetailPage
            key={`${selectedProduct.id}-${selectedProduct.img}`}
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => navigateTo("Collections")}
            onViewProduct={viewProduct}
            user={user}
            onOpenAuth={openAuth}
            isWishlisted={isWishlisted}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {page === "Bridal" && (
          <BridalPage
            onAddToCart={addToCart}
            user={user}
            onOpenAuth={openAuth}
          />
        )}
        {page === "Custom Order" && <CustomOrderPage />}
        {page === "Contact" && <ContactPage />}
        {page === "Policy" && policyPage && (
          <PolicyPage policyKey={policyPage} onBack={() => navigateTo("Home")} />
        )}
      </main>

      <Footer
        setPage={navigateTo}
        onPolicyPage={openPolicyPage}
        onShopCategory={openShopCategory}
      />

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onViewProduct={(p) => {
            viewProduct(p);
            setShowSearch(false);
          }}
        />
      )}
      {showCart && (
        <CartDrawer
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onClear={clearCart}
          onPlaceOrder={placeOrder}
          user={user}
          onOpenAuth={() => {
            setShowCart(false);
            setShowAuth(true);
          }}
        />
      )}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          user={user}
          onLogin={(u) => setUser(u)}
          onLogout={() => {
            setUser(null);
            setWishlist([]);
          }}
          orders={orders}
          wishlist={wishlist}
          onRemoveWishlist={removeWishlist}
        />
      )}
    </div>
  );
}
