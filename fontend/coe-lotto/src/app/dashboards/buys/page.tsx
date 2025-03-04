import wait from "@/app/@lib/wait";

export default async function Buys() {
  await wait(5000);
  return (
    <div>
      <h1>Buys</h1>
      <p>Buys will be listed here.</p>
    </div>
  ); 
}