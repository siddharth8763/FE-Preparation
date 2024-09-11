function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback(
    (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  ); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}



// By default, when a component re-renders, React re-renders all of its children recursively. This is why, 
// when ProductPage re-renders with a different theme, the ShippingForm component also re-renders. 
// This is fine for components that don’t require much calculation to re-render. 
// But if you verified a re-render is slow, 
// you can tell ShippingForm to skip re-rendering when its props 
// are the same as on last render by wrapping it in memo:


const ShippingForm = React.memo(function ShippingForm({ onSubmit }) {
  // ...
});