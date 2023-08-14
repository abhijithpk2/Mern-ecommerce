import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';
import  { Toaster } from "react-hot-toast";


const Layouts = ({ children,title,description,keywords,author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Toaster/>
      <Footer />
    </>
  );
};
Layouts.defultProps = {
  title:"E-commerce App-shop now",
  description: "Mern stack project",
  keywords: "mern,mongodb,react,node",
  author: "Abhijith"
}

export default Layouts