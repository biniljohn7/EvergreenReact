import React, { useState, useEffect } from "react";
import Toast from "../../UI/Toast/Toast";
import SelectMember from "../dues/SelectMember";
import Select from "react-select";

const Officers = () => {
  const toast = Toast();
  let mbrExist = false;

  const [isMbrOpen, setMbrOpen] = useState(false);
  const [membId, setMembId] = useState({});
  const [content, setContent] = useState([]);

  const addMbr = (mbrId) => {
    setMembId((prev) => {
      if (prev.id == mbrId) {
        mbrExist = true;
        return prev;
      }

      return {
        ...prev,
        id: mbrId,
      };
    });
  };

  const handleAddContent = (person) => {
    addMbr(person.id);
    if (!mbrExist) {
      setContent([...content, person]);
    } else {
      toast.Error("Member already added!");
    }
    setMbrOpen(false);
  };

  return (
    <>
      {toast?.Obj}
      <div className="add-btn">
        <span
          className="btn button plr-29 ptb-10"
          onClick={() => setMbrOpen(true)}
        >
          <span class="material-symbols-outlined icn">add_circle</span>
          <span className="btn-txt">Choose Officers</span>
        </span>

        <div className="selected-membs">
          {content && content.length > 0
            ? content.map((usr) => (
                <div key={usr.id} id={`person-${usr.id}`} className="ech-usr">
                  <div className="can-btn">
                    <span
                      className="material-symbols-outlined"
                      //   onClick={(e) => {
                      //     if (
                      //       window.confirm(
                      //         "Are you sure you want to remove this member?"
                      //       )
                      //     ) {
                      //       removeMbr(item.id);
                      //     }
                      //   }}
                    >
                      cancel
                    </span>
                  </div>
                  <div className="usr-top">{usr.name}</div>
                  <div className="usr-wrap">
                    <div className="wp-lf">Member ID:</div>
                    <div className="wp-rg">{usr.memberid ?? "--"}</div>
                  </div>
                  <div className="usr-wrap">
                    <div className="wp-lf">City:</div>
                    <div className="wp-rg">{usr.city ?? "--"}</div>
                  </div>
                  <div className="usr-wrap">
                    <div className="wp-lf">Zipcode:</div>
                    <div className="wp-rg">{usr.zipcode ?? "--"}</div>
                  </div>
                  <div className="usr-wrap">
                    <div className="wp-lf">Section:</div>
                    <div className="wp-rg">{usr.section ?? "--"}</div>
                  </div>
                  <div className="usr-wrap">
                    <div className="wp-lf">Affiliation:</div>
                    <div className="wp-rg">{usr.affiliation ?? "--"}</div>
                  </div>
                  <div className="usr-wrap">
                    <div className="wp-lf">Role:</div>
                    <div className="wp-rg">
                      <Select
                        id="leaderRole"
                        placeholder="Choose Role"
                        options={[]}
                        value=""
                      />
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      {isMbrOpen && (
        <SelectMember
          isOpen={isMbrOpen}
          toggle={() => {
            setMbrOpen(!isMbrOpen);
          }}
          addContent={handleAddContent}
        />
      )}
    </>
  );
};

export default Officers;
