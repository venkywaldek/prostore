
import ProductList from '@/components/shared/product/product-list';
import  {getLatestProducts}  from '@/lib/actions/product.actions';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList
        data={latestProducts.map((product)=> ({
          ...product,
          rating: Number(product.rating)
        }))}
        title='Newest Arrivals'
        limit={4}
      />
    </>
  );
};

export default Homepage;
