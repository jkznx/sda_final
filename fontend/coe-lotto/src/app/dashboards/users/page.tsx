import wait from "@/app/@lib/wait";

export default async function users() {
  await wait(5000);
  return (
    <div>
      <h1>Users</h1>
      <p>Users will be listed here.</p>
    </div>
  ); 
}