import { NextRequest, NextResponse } from "next/server";

const GRAPHQL_BACKEND_URL =
  process.env.GRAPHQL_API_BACKEND_URL ||
  "https://iuc1oq7yai.execute-api.us-east-1.amazonaws.com/graphql";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "application/json";
  const accept = request.headers.get("accept") || "application/json";
  const authorization = request.headers.get("authorization");
  const body = await request.arrayBuffer();

  try {
    const backendResponse = await fetch(GRAPHQL_BACKEND_URL, {
      method: "POST",
      headers: {
        "content-type": contentType,
        accept,
        ...(authorization ? { authorization } : {}),
      },
      body,
    });

    const responseBody = await backendResponse.arrayBuffer();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        "content-type":
          backendResponse.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("GraphQL proxy error:", error);
    return NextResponse.json(
      { errors: [{ message: "No se pudo conectar con el servidor" }] },
      { status: 502 }
    );
  }
}
