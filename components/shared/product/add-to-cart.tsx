'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Cart, CartItem } from '@/types';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from 'react';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      //Handle success add to cart
      toast.success(`${item.name} added to cart`, {
        duration: 5000, //Adjust display duration
        description: res.message,
        action: {
          label: 'Go To Cart',
          onClick: () => router.push('/cart'),
        },
      });
    });
  };

  //Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  //Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return (
    <>
      <Toaster /> {/*Ensure to include Toaster */}
      {existItem ? (
        <div>
          <Button
            type='button'
            variant='outline'
            onClick={handleRemoveFromCart}
          >
            {isPending ? (
              <Loader className='w-4 h-4 animate-spin' />
            ) : (
              <Minus className='h-4 w-4' />
            )}
          </Button>
          <span className='px-2'>{existItem.qty}</span>
          <Button type='button' variant='outline' onClick={handleAddToCart}>
            {isPending ? (
              <Loader className='w-4 h-4 animate-spin' />
            ) : (
              <Plus className='h-4 w-4' />
            )}
          </Button>
        </div>
      ) : (
        <Button className='w-full' type='button' onClick={handleAddToCart}>
          {' '}
          {isPending ? (
            <Loader className='w-4 h-4 animate-spin' />
          ) : (
            <Plus className='h-4 w-4' />
          )}{' '}
          Add to cart{' '}
        </Button>
      )}
    </>
  );
};

export default AddToCart;
