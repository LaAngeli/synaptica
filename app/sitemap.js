import { SITE_URL } from "../lib/seo";

export default function sitemap() {
  const routes = ["/", "/services", "/pricing", "/conditions", "/contact", "/faq"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
