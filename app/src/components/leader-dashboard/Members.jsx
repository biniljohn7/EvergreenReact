import React, { useEffect, useState } from "react";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import { getMembers } from "../../api/LeadershipAPI";

const Members = () => {
  const toast = Toast();
  let Spn = Spinner();

  const [members, setMembers] = useState([]);

  const showMembers = (e) => {
    Spn.Show();
    getMembers(document.getElementById("srchKey").value)
      .then((res) => {
        if (res.status == "ok") {
          setMembers(res.data);
        }
      })
      .catch((err) => {
        toast.Error("Failed to retrive members list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });

    e.preventDefault();
    return false;
  };

  useEffect(() => {
    Spn.Show();
    getMembers("")
      .then((res) => {
        if (res.status == "ok") {
          setMembers(res.data);
        }
      })
      .then((err) => {
        toast.Error("Failed to retrive members list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });
  }, []);

  return (
    <>
      {toast?.Obj}
      <div className="due-serch">
        <form onSubmit={(e) => showMembers(e)}>
          <input type="text" name="key" className="key-inp" id="srchKey" />
          <button
            type="button"
            className="srch-btn"
            onClick={(e) => showMembers(e)}
          >
            <span class="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      <div className="member-wrap">
        <div className="ech-memb">
          <div className="memb-top">
            <div className="memb-avatar">
              <div className="no-img">
                <span class="material-symbols-outlined icn">person</span>
              </div>
            </div>
            <div className="memb-nam">David Peter</div>
          </div>
          <div className="memb-dtls">
            <div className="dt-itm">
              <span class="material-symbols-outlined">barcode</span>
              <span>68768</span>
            </div>
            <div className="dt-itm">
              <span class="material-symbols-outlined">share_location</span>
              <span>London, 876876</span>
            </div>
          </div>
        </div>
        <div className="ech-memb">
          <div className="memb-top">
            <div className="memb-avatar">
              <div className="no-img">
                <span class="material-symbols-outlined icn">person</span>
              </div>
            </div>
            <div className="memb-nam">David Peter</div>
          </div>
          <div className="memb-dtls">
            <div className="dt-itm">
              <span class="material-symbols-outlined">barcode</span>
              <span>68768</span>
            </div>
            <div className="dt-itm">
              <span class="material-symbols-outlined">share_location</span>
              <span>London, 876876</span>
            </div>
          </div>
        </div>
        <div className="ech-memb">
          <div className="memb-top">
            <div className="memb-avatar">
              <div className="no-img">
                <span class="material-symbols-outlined icn">person</span>
              </div>
            </div>
            <div className="memb-nam">David Peter</div>
          </div>
          <div className="memb-dtls">
            <div className="dt-itm">
              <span class="material-symbols-outlined">barcode</span>
              <span>68768</span>
            </div>
            <div className="dt-itm">
              <span class="material-symbols-outlined">share_location</span>
              <span>London, 876876</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;
