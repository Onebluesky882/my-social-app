import { Metadata } from "next";

export const metadata: Metadata = {
  title: "homepage",
  description: "homepage",
};

export default async function Homepage() {
  return <div className="bg-background">homepage</div>;
}
