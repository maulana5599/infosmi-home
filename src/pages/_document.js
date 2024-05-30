import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="shortcut icon"
          href="assets/images/favicon.png"
          type="image/png"
        />
        <link
          rel="stylesheet"
          href="/uitemplate/assets/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/uitemplate/assets/css/flaticon.css" />
        <link rel="stylesheet" href="/uitemplate/assets/css/LineIcons.css" />
        <link rel="stylesheet" href="/uitemplate/assets/css/animate.css" />
        <link rel="stylesheet" href="/uitemplate/assets/css/slick.css" />
        <link rel="stylesheet" href="/uitemplate/assets/css/default.css" />
        <link rel="stylesheet" href="/uitemplate/assets/css/style.css" />
      </Head>
      <body id="page-top" style={{backgroundColor: "#f8f8f6"}}>
        <Main />
        <NextScript />
        <script src="/uitemplate/assets/js/vendor/modernizr-3.6.0.min.js"></script>
        <script src="/uitemplate/assets/js/vendor/jquery-1.12.4.min.js"></script>
        <script src="/uitemplate/assets/js/bootstrap.min.js"></script>
        <script src="/uitemplate/assets/js/popper.min.js"></script>
        <script src="/uitemplate/assets/js/waypoints.min.js"></script>
        <script src="/uitemplate/assets/js/jquery.counterup.min.js"></script>
        <script src="/uitemplate/assets/js/slick.min.js"></script>
        <script src="/uitemplate/assets/js/jquery.magnific-popup.min.js"></script>
        <script src="/uitemplate/assets/js/jquery.easing.min.js"></script>
        <script src="/uitemplate/assets/js/scrolling-nav.js"></script>
        <script src="/uitemplate/assets/js/jquery.countdown.min.js"></script>
        <script src="/uitemplate/assets/js/wow.min.js"></script>
        <script src="/uitemplate/assets/js/main.js"></script>
      </body>
    </Html>
  );
}
