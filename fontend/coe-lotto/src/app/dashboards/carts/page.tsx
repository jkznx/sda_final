import wait from "@/app/@lib/wait";

export default async function Carts() {
  await wait(5000);
  return (
    <CartLayout>
      <h1 className="text-2xl font-bold">Carts</h1>

      <ul className="list-disc pl-5">

        {cartItems.map((item: { name: string; price: number }, index: number) => (

          <li key={index}>
            {item.name} - ${item.price}
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeItemFromCart(item)}>Remove</button>

          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold">Total: ${totalCost}</h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => alert('Proceeding to checkout')}>Checkout</button>

    </CartLayout>
  );
}
