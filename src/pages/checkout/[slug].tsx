import Layout from "@/components/Layout";
import api from "@/components/utils/axios";
import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export default function Checkout() {
  const checkoutState = useSelector((state: any) => state.cartState);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateBirth, setDateBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const checkoutPayments = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      checkout_ticket: checkoutState?.checkout_ticket,
      event: checkoutState?.event,
      event_id: checkoutState?.event_id,
      name_regis: name,
      email: email,
      date_birth: dateBirth,
      gender: gender,
      phone_number: phoneNumber,
    };

    api
      .post("/checkout-event", formData)
      .then((res) => {
        console.log(res.data); 
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Terjadi kesalahan pada server !");
      });
  };
  return (
    <Layout>
      <section id="about" className="about-area pb-130 pt-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="about-image mt-50 wow fadeInLeft"
                data-wow-duration="1s"
              >
                <img
                  className="img-thumbnail"
                  src="https://api.yesplis.com/images/banner/a4382ac21129200a85351dac1d538f1c1064b4cd.png.webp"
                  alt="About"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-content mt-45 wow fadeInRight"
                data-wow-duration="1s"
              >
                <div className="section-title">
                  <h2 className="title">Shiela On 7: Kutunggu Dibandung</h2>
                </div>{" "}
                {/* section title */}
                <p className="date">
                  <span>
                    25<sup>th</sup>
                  </span>
                  December’ 19
                </p>
                <p className="mt-4">
                  <i className="lni lni-map-marker" />
                  <span>Stadion Mandala Krida | Mandala Krida</span>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 ol-md-6 mt-3">
              <div className="card">
                <div className="card-header">
                  <h4>Registration Data</h4>
                </div>
                <div className="card-body">
                  <form id="form-submit" onSubmit={checkoutPayments}>
                    <input
                      type="hidden"
                      name="kegiatan_id"
                      defaultValue="{{ $id }}"
                    />
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name_regis"
                        className="form-control"
                        autoComplete="true"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        autoComplete="true"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Date 0f Birth</label>
                      <input
                        type="date"
                        name="date_birth"
                        className="form-control"
                        autoComplete="true"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDateBirth(e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>Gender</label>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setGender(e.target.value)
                          }
                          required
                        />
                        <label>Male</label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setGender(e.target.value)
                          }
                          required
                        />
                        <label>Female</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPhoneNumber(e.target.value)
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <span>Pay Now</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </Layout>
  );
}
