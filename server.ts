const port = 8080;

Deno.serve({ port }, (req: Request) => {
  console.log(req)
  return new Response("Hello, world!");
});
