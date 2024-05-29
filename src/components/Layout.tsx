"use client"

import { Helmet } from "react-helmet";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Dashboard" }: LayoutProps) {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={"Tapak Suci Sukabumi"} />
        <meta name="author" content="Maulana Muhammad Rizky" />
        <title>{title ?? ""}</title>
      </Helmet>
      <Header/>
      {children}
    </>
  );
}
