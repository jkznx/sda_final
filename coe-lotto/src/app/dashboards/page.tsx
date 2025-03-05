import wait from "../@lib/wait";

export default async function DashboardPage() {
  await wait(3000);
  return (
    <div>
        <h1>Dashboard</h1>
        <p>Dashboard will be displayed here.</p>
    </div>
  ); 
}