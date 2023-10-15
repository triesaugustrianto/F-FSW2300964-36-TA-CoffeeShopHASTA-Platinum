import React, { useState } from "react";
import { coffe } from "../../assets";
import useSWR from "swr";
import { fetcher } from "../../fetch";
import { Errors, Loading, Modals, ProfilUpdate } from "../../components";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash, ExclamationCircle } from "react-bootstrap-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

//modul
export const AkunUser = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  //fetch data
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/user/ffbf266b-2193-4426-9e10-c883c995ea49`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  //updateData
  const updateProfil = (data) => {
    axios
      .put(
        `http://localhost:2000/api/users/update/ffbf266b-2193-4426-9e10-c883c995ea49`,
        data
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Success Update Account !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.href = "/user/akun";
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        console.log(err);
      });
  };
  return (
    <div className="row ">
      <ToastContainer />
      <div className="container position-relative">
        <div className="h-50 ">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt=""
            className="img-fluid rounded-bottom-4"
          />
        </div>
        <div
          className="card position-absolute  start-50 translate-middle-x"
          style={{ width: "18rem", bottom: "-25px" }}
        >
          <div className="card-body text-success d-flex justify-content-between align-items-center rounded-3">
            <h5 className="card-title">
              Hi, <span className="fs-6">{data.name}</span>
            </h5>
            <img
              src={coffe}
              alt="coffe"
              className="img-thumbnail rounded-circle"
              style={{ width: "50px" }}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 col mx-2">
        <ProfilUpdate
          name={data.name}
          phone={data.phone}
          email={data.email}
          addres={data.address}
        />
        <div className="container">
          <Modals
            id={"name"}
            title={"update name"}
            content={
              <form onSubmit={handleSubmit(updateProfil)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={data.name}
                    {...register("name")}
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </form>
            }
          />
          <Modals
            id={"email"}
            title={"update email"}
            content={
              <form onSubmit={handleSubmit(updateProfil)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    defaultValue={data.email}
                    {...register("email")}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </form>
            }
          />
          <Modals
            id={"phone"}
            title={"update phone"}
            content={
              <form onSubmit={handleSubmit(updateProfil)}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    phone
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    defaultValue={data.phone}
                    {...register("phone")}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </form>
            }
          />
          <Modals
            id={"address"}
            title={"update address"}
            content={
              <form onSubmit={handleSubmit(updateProfil)}>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="address"
                    className="form-control"
                    id="address"
                    defaultValue={data.address}
                    {...register("address")}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </form>
            }
          />
          <Modals
            id={"password"}
            title={"testing password"}
            content={
              <form onSubmit={handleSubmit(updateProfil)}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group flex-nowrap">
                    <input
                      type={show ? "text" : "password"}
                      className="form-control"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="input-group-text "
                      onClick={() => setShow(!show)}
                    >
                      {show ? <Eye /> : <EyeSlash />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </form>
            }
          />
        </div>
      </div>
    </div>
  );
};