import { Nav } from "../../components/Nav.tsx";

export default function Blog() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#49475B]">
      <Nav />
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.png"
          width="128"
          height="128"
          alt="Dan O'Neill Online logo; the initialism DOO imposed on a cornflower blue background"
        />
        <h1 class="text-4xl font-bold">There is no blog</h1>
        <p class="my-4">
          Why would there be a blog?
        </p>
      </div>
    </div>
  );
}
