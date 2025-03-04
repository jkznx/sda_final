import wait from "@/app/@lib/wait";

export default async function Carts() {
  await wait(5000);
  return (
    <div>
      <h1>Carts</h1>
      <p>Carts will be listed here.</p>
    </div>
  ); 
}