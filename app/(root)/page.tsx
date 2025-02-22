import ProductList from '@/components/shared/product/product-list';
import sampleData from '@/db/sample-data';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      {/* <ProductList
        data={sampleData.products}
        title='Newest Arrivals'
        limit={4}
      /> */}
      <ProductList
        data={latestProducts.map((product) => ({
          ...product,
          rating: product.rating.toString(),
        }))}
        title='Newest Arrivals'
        limit={4}
      />
    </>
  );
};

export default Homepage;
