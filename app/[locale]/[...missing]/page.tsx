import { notFound } from "next/navigation";

/** Any URL that matches no route renders the localized 404 inside the site layout. */
export default function Missing() {
  notFound();
}
