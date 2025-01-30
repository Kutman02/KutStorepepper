import { GetServerSideProps } from 'next';
import { getProducts } from '@src/api/product';
import CategoryProduct from '@src/components/pages/categoryProduct';

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  try {
    console.log('Fetching products for category page...');
    console.log('Category params:', params);
    console.log('Query:', query);

    const products = await getProducts();
    console.log('Received products:', products);

    if (!products || products.length === 0) {
      console.log('No products found');
      return {
        props: {
          products: [],
          category: params?.category || null,
        },
      };
    }

    return {
      props: {
        products,
        category: params?.category || null,
      },
    };
  } catch (error) {
    console.error('Error in category page:', error);
    // Вместо возврата пустого массива, возвращаем notFound
    return {
      notFound: true,
    };
  }
};

export default CategoryProduct; 