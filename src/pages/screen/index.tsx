import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/global.module.css";

export default function Screen() {
  const [movie, setMovie] = useState([]);
  const fetchScreen = () => {
    axios
      .get(
        "https://screen-api-cms.loket.com/v4/web/movie/now_playing?city=Jakarta"
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout>
      <section className="about-area pt-115 pb-130">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
