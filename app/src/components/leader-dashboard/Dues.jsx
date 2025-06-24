import React, { useState, useEffect } from "react";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import Pix from "../../helper/Pix";
import { getDues, renewal } from "../../api/LeadershipAPI";

const Dues = () => {
  const toast = Toast();
  let Spn = Spinner();

  const [members, setMembers] = useState([]);
  const [renew, setRenew] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const addDues = (dueId, amount, isRenew) => {
    setRenew((prev) => {
      const updated = { ...prev };
      if (!isRenew) {
        delete updated[dueId];
        return updated;
      } else {
        return {
          ...updated,
          [dueId]: [parseFloat(amount), true],
        };
      }
    });
  };

  const makePayment = () => {
    const dueIds = Object.entries(renew).map(([id]) => id);

    const renewData = {
      ids: dueIds,
    };

    Spn.Show();
    renewal(renewData)
      .then((res) => {
        if (res.status === "ok") {
          if (res.data && res.data.paymentUrl) {
            window.location.href = res.data.paymentUrl;
          } else {
            toast.Error("Something went wrong!");
          }
          //   toast.Success("Membership renewal was successful.");
          //   setMembers((prev) =>
          //     prev.map((member) => ({
          //       ...member,
          //       dues: member.dues.filter((due) => !dueIds.includes(due.id)),
          //     }))
          //   );
          //   setRenew({});
          //   setTotalAmount(0);
        }
      })
      .catch(() => {
        toast.Error("Something went wrong!");
      });
  };

  const transformData = (data) => {
    return Object.values(data.list).map((member) => ({
      name: `${member.firstName} ${member.lastName}`,
      memberId: member.memberId,
      city: member.city || "--",
      zipcode: member.zipcode || "--",
      dues: member.dues.map((due) => ({
        ...due,
        amount: parseFloat(due.amount),
      })),
    }));
  };

  const showDues = (e) => {
    e.preventDefault();
    Spn.Show();
    getDues(document.getElementById("srchKey").value)
      .then((res) => {
        if (res.status === "ok") {
          setMembers(transformData(res.data));
        }
      })
      .catch(() => {
        toast.Error("Failed to retrieve Dues list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });
  };

  useEffect(() => {
    Spn.Show();
    getDues("")
      .then((res) => {
        if (res.status === "ok") {
          setMembers(transformData(res.data));
        }
      })
      .catch(() => {
        toast.Error("Failed to retrieve Dues list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });
  }, []);

  return (
    <>
      {toast?.Obj}
      {Spn.Obj}
      <div className="due-serch">
        <form onSubmit={(e) => showDues(e)}>
          <input type="text" name="key" className="key-inp" id="srchKey" />
          <button
            type="button"
            className="srch-btn"
            onClick={(e) => showDues(e)}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>

      {console.log(members)}
      {members && members.length > 0 ? (
        <>
          <div className="dues-wrap">
            {members.map((member, index) => (
              <div className="dues-list" key={index}>
                <label>
                  <div className="list-top">
                    <div className="top-rg">
                      <div className="mb-name">{member.name}</div>
                      <div className="mb-date">
                        <div className="dt-lbl">Member ID</div>
                        <div className="dt-vl">{member.memberId ?? "--"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="list-btm">
                    <div className="btm-left">
                      <div className="left-itm">
                        <div className="itm-lf">City:</div>
                        <div className="itm-rg">{member.city ?? "--"}</div>
                      </div>
                      <div className="left-itm">
                        <div className="itm-lf">Zipcode:</div>
                        <div className="itm-rg">{member.zipcode ?? "--"}</div>
                      </div>
                    </div>
                  </div>
                </label>

                {member.dues.length > 0 ? (
                  member.dues.map((due, dIndex) => (
                    <div className="dues-list mbship" key={dIndex}>
                      <label>
                        <div className="list-top">
                          <div className="top-lf">
                            <input
                              type="checkbox"
                              checked={renew[due.id]?.[1] || false}
                              onChange={() => {
                                const isActive = renew[due.id]?.[1] || false;
                                addDues(due.id, due.amount, !isActive);

                                setTotalAmount((prev) =>
                                  !isActive
                                    ? prev + parseFloat(due.amount)
                                    : prev - parseFloat(due.amount)
                                );
                              }}
                            />
                          </div>
                          <div className="top-rg">
                            <div className="mb-name">{due.title}</div>
                          </div>
                        </div>
                        <div className="list-btm">
                          <div className="btm-right">
                            {Pix.dollar(due.amount || 0, 1)}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="no-dues">No dues for this member.</div>
                )}
              </div>
            ))}
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
        <div className="no-dues">No members found.</div>
      )}
    </>
  );
};

export default Dues;
