import React from "react";
import Toast from "../../UI/Toast/Toast";
import Pix from "../../helper/Pix";

const Dues = () => {
  const toast = Toast();

  return (
    <>
      {toast?.Obj}
      <div className="dues-wrap">
        <div className="dues-list">
          <label>
            <input type="checkbox" />
            <div className="list-top">
              <div className="mb-name">Collegiate Membership</div>
              <div className="mb-date">14 May, 2025</div>
            </div>
            <div className="list-btm">
              <div className="btm-left">
                <div className="left-itm">Amaya Williams</div>
                <div className="left-itm">
                  <div className="itm-lf">Member ID:</div>
                  <div className="itm-rg">768768</div>
                </div>
                <div className="left-itm">
                  <div className="itm-lf">City:</div>
                  <div className="itm-rg">London</div>
                </div>
                <div className="left-itm">
                  <div className="itm-lf">Zipcode:</div>
                  <div className="itm-rg">768768</div>
                </div>
              </div>
              <div className="btm-right">{Pix.dollar(7567, 1)}</div>
            </div>
          </label>
        </div>
        <div className="dues-list">
          <label>
            <input type="checkbox" />
            <div className="list-top">
              <div className="mb-name">Collegiate Membership</div>
              <div className="mb-date">14 May, 2025</div>
            </div>
            <div className="list-btm">
              <div className="btm-left">
                <div className="left-itm">Amaya Williams</div>
                <div className="left-itm">
                  <div className="itm-lf">Member ID:</div>
                  <div className="itm-rg">768768</div>
                </div>
                <div className="left-itm">
                  <div className="itm-lf">City:</div>
                  <div className="itm-rg">London</div>
                </div>
                <div className="left-itm">
                  <div className="itm-lf">Zipcode:</div>
                  <div className="itm-rg">768768</div>
                </div>
              </div>
              <div className="btm-right">{Pix.dollar(7567, 1)}</div>
            </div>
          </label>
        </div>
        <div className="dues-list">
          <label>
            <input type="checkbox" />
            <div className="list-top">
              <div className="mb-name">Collegiate Membership</div>
              <div className="mb-date">14 May, 2025</div>
            </div>
            <div className="list-btm">
              <div className="btm-left">
                <div className="left-itm">Amaya Williams</div>
                <div className="left-itm">
                  <div className="itm-lf">Member ID:</div>
                  <div className="itm-rg">768768</div>
                </div>
                <div className="left-itm">
                  <div className="itm-lf">City:</div>
                  <div className="itm-rg">London</div>
                </div>
                <div className="left-itm">
                  <div className="itm-lf">Zipcode:</div>
                  <div className="itm-rg">768768</div>
                </div>
              </div>
              <div className="btm-right">{Pix.dollar(7567, 1)}</div>
            </div>
          </label>
        </div>
      </div>
      <div className="dues-btn">
        <span className="btn button">RENEW</span>
      </div>
    </>
  );
};

export default Dues;
