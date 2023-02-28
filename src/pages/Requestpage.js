import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Requestpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="arziform">
      <div className="arziarea">
        <form className="arzilabel" onSubmit={handleSubmit(onSubmit)}>
          <div className="formarziarea">
            <div className="form-group grouping">
              <div className="arzilab">
                <label className="arzilbltext">name</label>
              </div>
              <div className="arziin">
                {" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="arziintext"
                  {...register("name",{required:true})}
                />
                 {errors.name && (
                  <p className="alretmsg">please enter your name</p>
                )}
              </div>
            </div>
            <div className="form-group  grouping">
              <div className="arzilab">
                <label className="arzilbltext">email address</label>
              </div>
              <div className="arziin">
                {" "}
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="arziintext"
                  {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })}
                />
                  {errors.email && errors.email.type === 'required' && (
            <p className='alretmsg'>Email is required.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className='alretmsg'>Email is not valid.</p>
          )}
              </div>
            </div>

            <div className="form-group  grouping">
              <div className="arzilab">
                <label className="arzilbltext">city</label>
              </div>
              <div className="arziin">
                {" "}
                <input
                  type="text"
                  name="city"
                  className="arziintext"
                  placeholder="city"
                  {...register("city" ,{required:true})}
                />
                {errors.city && (
                  <p className="alretmsg">please enter your city</p>
                )}
              </div>
            </div>

            <div className="form-group  grouping">
              <div className="arzilab">
                <label className="arzilbltext">state</label>
              </div>
              <div className="arziin">
                {" "}
                <input
                  type="text"
                  name="state"
                  className="arziintext"
                  placeholder="State"
                  {...register("state",{required:true})}
                />
                 {errors.state && (
                  <p className="alretmsg">please enter your state</p>
                )}
              </div>
            </div>
            <div className="form-group  grouping">
              <div className="arzilab">
                <label className="arzilbltext">phone number</label>
              </div>
              <div className="arziin">
                {" "}
                <input
                  type="number"
                  name="phone"
                  className="arziintext"
                  placeholder="Phone Number"
                  {...register("phone" ,{required:true , Length:'10' })}
                />
                  {errors.phone && errors.phone.type === 'required' && (
            <p className='alretmsg'>please enter your phone number</p>
          )}
            {errors.phone && errors.phone.type === 'Length' && (
            <p className='alretmsg'>please enter your phone number</p>
          )}
              </div>
            </div>
            <div className="form-group   grouping">
              <div className="arzilab">
                <label className="arzilbltext">arzii</label>
              </div>
              <div className="arziin">
                {" "}
                <textarea
                  type="text"
                  name="arzii"
                  rows="4"
                  cols="50"
                  className="arziintext"
                  placeholder="Arzii"
                  {...register("arzii" , {required:true})}
                />
                 {errors.address && (
                  <p className="alretmsg">please enter your  address</p>
                )}
              </div>
            </div>
            <div className="form-group arzibtnarea">
              <label></label>
              <button type="submit" className="arzibtn">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Requestpage;
