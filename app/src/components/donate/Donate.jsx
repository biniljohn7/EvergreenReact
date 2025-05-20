import React, { useState } from "react";
import Button from "../../UI/button/button";
import Input from "../../UI/input/InputWithSwitch";
import Select from "../../UI/select/SelectWithSwitch";
import { DONATE_SPACIFICATIONS } from "../../helper/constant";

import DonateWrapper from "./donate.style";

const Donate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [donor, setDonor] = useState("");
  const [mName, setMName] = useState("");

  const handleDonate = () => {
    const body = {
      method: "donate",
      name: name,
      email: email,
      amount: amount,
      donor: donor,
      mentionedName: mName,
    };
  };

  return (
    <div>
      <div className="nobg">
        <DonateWrapper onSubmit={(e) => e.preventDefault()}>
          <section className="row donate mlr-0">
            <div className="container">
              <div className="col-md-6 donate-sec">
                <div className="top-head mb-40">Donation Entry Form</div>

                <div className="form-sec mb-40">
                  <div className="main-head mb-40">Donate</div>

                  <div className="inp-row mtb-20">
                    <div className="col-11">
                      <Input
                        type="text"
                        placeholder="Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="inp-row mtb-20">
                    <div className="col-11">
                      <Input
                        type="text"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="inp-row mtb-20">
                    <div className="col-11">
                      <Input
                        type="text"
                        placeholder="Amount"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="inp-row mtb-20">
                    <div className="col-11">
                      <Select
                        id="donor"
                        options={DONATE_SPACIFICATIONS}
                        value={DONATE_SPACIFICATIONS.find(
                          (opt) => opt.value === donor
                        )}
                        onChange={(selectedOption) => {
                          setDonor(selectedOption?.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="inp-row mtb-20">
                    <div className="col-11">
                      <Input
                        type="text"
                        placeholder="Mention Name"
                        id="mnName"
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-container">
                    <Button
                      className="button mt-20"
                      name="Save"
                      clicked={handleDonate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </DonateWrapper>
      </div>
    </div>
  );
};

export default Donate;
