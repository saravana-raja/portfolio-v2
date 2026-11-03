export function GET() {
  return Response.json({
    status: "ok",
    service: "portfolio",
    time: new Date().toISOString(),
  });
}
