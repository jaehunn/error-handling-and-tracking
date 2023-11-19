import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/me", () => {
    return HttpResponse.json({ name: "Jaehun" });
  }),
];
