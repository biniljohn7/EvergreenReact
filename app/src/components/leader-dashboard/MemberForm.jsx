import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "../dues/dues.style";
import { dashboardNewMember } from "../../api/LeadershipAPI";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/input/input";
import Select from "../../UI/select/select";
import { getSection, getAffiliation } from "../../api/commonAPI";
import Toast from "../../UI/Toast/Toast";

const WIDTH_CLASS = window.innerWidth >= 1024 ? "wp-80" : "wp-100";

function MemberForm(props) {
  const [ErrorList, setErrorList] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [affiliationList, setAffiliationList] = useState([]);
  const [formValues, setFormValues] = useState({
    id: props.data.id ?? "",
    firstName: props.data.firstName,
    lastName: props.data.firstName,
    email: props.data.email,
    address: props.data.address,
    city: props.data.city,
    zipcode: props.data.zipcode,
    phone: props.data.phone,
    section: props.data.section,
    affiliation: props.data.affiliation,
    sectionId: props.data.sectionId,
    affiliationId: props.data.affiliationId,
  });

  let Spn = Spinner();
  const Tst = Toast();

  useEffect(() => {
    Spn.Show();
    getSection()
      .then((res) => {
        setSectionList([...res.data]);
        Spn.Hide();
      })
      .catch((err) => {
        Tst.Error("Failed to retrive Section list. Please try again later!");
      });
    getAffiliation()
      .then((res) => {
        setAffiliationList([...res.data]);
        Spn.Hide();
      })
      .catch((err) => {
        "Failed to retrive Affiliation list. Please try again later!";
      });
  }, []);

  const storeData = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const Error = ({ field }) => {
    return ErrorList[field] ? (
      <div className="text-danger">{ErrorList[field]}</div>
    ) : (
      <></>
    );
  };

  const handleForm = () => {
    function el(id) {
      return document.getElementById(id);
    }

    let sErrs = {};

    if (!el("firstName").value.trim()) {
      sErrs["firstName"] = "This field is required";
    }
    if (!el("lastName").value.trim()) {
      sErrs["lastName"] = "This field is required";
    }
    if (!el("email").value.trim()) {
      sErrs["email"] = "This field is required";
    }
    if (!el("zipcode").value.trim()) {
      sErrs["zipcode"] = "This field is required";
    }
    if (!formValues.section) {
      sErrs["section"] = "This field is required";
    }
    if (!formValues.affiliation) {
      sErrs["affiliation"] = "This field is required";
    }

    setErrorList(sErrs);

    if (Object.keys(sErrs).length < 1) {
      Spn.Show();

      const data = {
        method: "dues-add-new-member",
        id: formValues.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        address: formValues.address,
        city: formValues.city,
        zipcode: formValues.zipcode,
        phone: formValues.phone,
        section: formValues.section,
        affiliation: formValues.affiliation,
      };

      dashboardNewMember(data)
        .then((res) => {
          if (res.status === "ok") {
            Spn.Hide();
            props.addContent(true);
          } else {
            // sErrs["email"] = "Email is already Registered!";
          }
        })
        .catch((err) => {
          Tst.Error("Something went wrong!");
        })
        .finally(() => {
          Spn.Hide();
        });
    }
  };

  return (
    <div>
      {Spn.Obj}
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        size="lg"
        className="signin"
        backdrop="static"
        keyboard={false}
      >
        <Wrapper>
          <div className="plr-30 ptb-50 position-relative member-form">
            <div className="popup-title">
              {formValues.id != "" ? "Modify" : "Add"} Member
            </div>
            <div
              className="cursor-pointer text-bold close"
              onClick={(e) => {
                props.toggle();
              }}
            >
              X
            </div>
            <form action="">
              <div className="mb-15">
                <Input
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.firstName}
                />
                <Error field="firstName" />
              </div>
              <div className="mb-15">
                <Input
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.lastName}
                />
                <Error field="lastName" />
              </div>
              <div className="mb-15">
                <Input
                  id="email"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.email}
                />
                <Error field="email" />
              </div>
              <div className="mb-15 member">
                <Select
                  label="Section"
                  name="section"
                  placeholder="Choose Section"
                  id="section"
                  options={sectionList}
                  onChange={storeData}
                  value={formValues.sectionId}
                />
                <Error field="section" />
              </div>
              <div className="mb-15 member">
                <Select
                  label="Affiliates"
                  name="affiliation"
                  placeholder="Choose Affiliate"
                  id="affiliation"
                  options={affiliationList}
                  onChange={storeData}
                  value={formValues.affiliationId}
                />
                <Error field="affiliation" />
              </div>
              <div className="addr-label">Shipping Address</div>
              <div className="mb-15">
                <Input
                  id="address"
                  label="Address"
                  name="address"
                  placeholder="Address"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.address}
                />
              </div>
              <div className="mb-15">
                <Input
                  id="city"
                  label="City"
                  name="city"
                  placeholder="City"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.city}
                />
              </div>
              <div className="mb-15">
                <Input
                  id="zipcode"
                  label="Zipcode"
                  name="zipcode"
                  placeholder="Zipcode"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.zipcode}
                />
                <Error field="zipcode" />
              </div>
              <div className="mb-15">
                <Input
                  id="phone"
                  label="Phone"
                  name="phone"
                  placeholder="Phone"
                  fontSize={"fs-16 text-dark"}
                  contentFontSize="fs-14"
                  type="text"
                  onChange={storeData}
                  value={formValues.phone}
                />
                <Error field="phone" />
              </div>

              <div className="text-center">
                <button
                  className="btn btn-rounded button plr-50 ptb-10 mt-20"
                  type="button"
                  onClick={(e) => handleForm(e)}
                >
                  Save
                </button>
              </div>
            </form>
            {/* )} */}
          </div>
        </Wrapper>
      </Modal>
    </div>
  );
}

export default MemberForm;
