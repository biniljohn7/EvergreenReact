import React, { useState, useEffect, useRef } from "react";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import Pix from "../../helper/Pix";
import Checkbox from "../../UI/checkbox/checkbox";
import { getDues, renewal } from "../../api/LeadershipAPI";

const Dues = () => {
  const toast = Toast();
  let Spn = Spinner();

  const [dues, setDues] = useState([]);
  const [renew, setRenew] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const addDues = (membership, amount, isRenew) => {
    setRenew((prev) => {
      if (!isRenew) {
        const updated = { ...prev };
        delete updated[membership];
        return updated;
      } else {
        return {
          ...prev,
          [membership]: [amount, true],
        };
      }
    });
  };

  const makePayment = () => {
    const membershipIds = Object.entries(renew).map(([id]) => parseInt(id));

    const renewData = {
      ids: membershipIds,
    };

    renewal(renewData)
      .then((res) => {
        if (res.status == "ok") {
          toast.Success("Membership renewal was successful.");

          setDues((prev) =>
            prev.filter((due) => !membershipIds.includes(due.membershipId))
          );
          setRenew({});
          setTotalAmount(0);
        }
      })
      .catch((err) => {
        toast.Error("Something went wrong!");
      });
  };

  const showDues = (e) => {
    Spn.Show();
    getDues(document.getElementById("srchKey").value)
      .then((res) => {
        if (res.status == "ok") {
          setDues(res.data.dues);
        }
      })
      .catch((err) => {
        toast.Error("Failed to retrive Dues list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });

    e.preventDefault();
    return false;
  };

  useEffect(() => {
    Spn.Show();
    getDues("")
      .then((res) => {
        if (res.status == "ok") {
          setDues(res.data.dues);
        }
      })
      .catch((err) => {
        toast.Error("Failed to retrive Dues list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });
  }, []);

  return (
    <>
      {toast?.Obj}
      <div className="due-serch">
        <form onSubmit={(e) => showDues(e)}>
          <input type="text" name="key" className="key-inp" id="srchKey" />
          <button
            type="button"
            className="srch-btn"
            onClick={(e) => showDues(e)}
          >
            <span class="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      {dues && dues.length > 0 ? (
        <>
          <div className="dues-wrap">
            {dues.map((due, index) => {
              return (
                <div className="dues-list" key={index}>
                  <label>
                    <div className="list-top">
                      <div className="top-lf">
                        <input
                          type="checkbox"
                          checked={renew[due.membershipId]?.[1] || false}
                          onChange={() => {
                            const [amount, status] = renew[
                              due.membershipId
                            ] || [due.amount, false];
                            addDues(due.membershipId, amount, !status);

                            if (!renew[due.membershipId]?.[1]) {
                              setTotalAmount(
                                (prev) => prev + parseInt(due.amount)
                              );
                            } else {
                              setTotalAmount(
                                (prev) => prev - parseInt(due.amount)
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="top-rg">
                        <div className="mb-name">{due.planName || "--"}</div>
                        <div className="mb-date">
                          <div className="dt-lbl">Final payment</div>
                          <div className="dt-vl">{due.lastPaid || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                    <div className="list-btm">
                      <div className="btm-left">
                        <div className="left-itm">{due.name || "Unknown"}</div>
                        <div className="left-itm">
                          <div className="itm-lf">Member ID:</div>
                          <div className="itm-rg">{due.memberId || "--"}</div>
                        </div>
                        <div className="left-itm">
                          <div className="itm-lf">City:</div>
                          <div className="itm-rg">{due.city || "--"}</div>
                        </div>
                        <div className="left-itm">
                          <div className="itm-lf">Zipcode:</div>
                          <div className="itm-rg">{due.zipcode || "--"}</div>
                        </div>
                      </div>
                      <div className="btm-right">
                        {Pix.dollar(due.amount || 0, 1)}
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
          {Object.keys(renew).length !== 0 && (
            <div className="dues-btn">
              <span className="btn button" onClick={makePayment}>
                RENEW
              </span>
              <span className="ttl-amnt">
                <span className="ttl-lbl">Total Amount:</span>
                <span className="ttl-vl">
                  {Pix.dollar(totalAmount || 0, 1)}
                </span>
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="no-dues">No dues found.</div>
      )}
    </>
  );
};

export default Dues;
