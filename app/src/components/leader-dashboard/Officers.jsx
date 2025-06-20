import React, { useState, useEffect } from "react";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import SelectMember from "../dues/SelectMember";
import Select from "react-select";
import { MEMBER_ROLES } from "../../helper/constant";
import {
  getOfficers,
  electOfficers,
  removeOfficer,
} from "../../api/LeadershipAPI";

const Officers = () => {
  const toast = Toast();
  let Spn = Spinner();
  let mbrExist = false;

  const [isMbrOpen, setMbrOpen] = useState(false);
  const [membId, setMembId] = useState({});
  const [content, setContent] = useState([]);
  const [officerTitles, setOfficersTitles] = useState([]);

  // const addMbr = (mbrId, mbrName) => {
  //   setMembId((prev) => {
  //     if (prev[mbrId]) {
  //       mbrExist = true;
  //       return prev;
  //     }

  //     return {
  //       ...prev,
  //       [mbrId]: [mbrName],
  //     };
  //   });
  // };

  // const handleAddContent = (person) => {
  //   addMbr(person.id, person.name);
  //   if (!mbrExist) {
  //     setContent([...content, person]);
  //   } else {
  //     toast.Error("Member already added!");
  //   }
  //   setMbrOpen(false);
  // };

  const addMbr = (mbrId, mbrName, currentMembId) => {
    if (currentMembId[mbrId]) {
      return { updated: currentMembId, exists: true };
    }

    return {
      updated: {
        ...currentMembId,
        [mbrId]: [mbrName],
      },
      exists: false,
    };
  };

  const handleAddContent = (person) => {
    setMembId((prevMembId) => {
      const { updated, exists } = addMbr(person.id, person.name, prevMembId);
      console.log(exists);

      if (!exists) {
        setContent([...content, person]);
      } else {
        toast.Error("Member already added!");
      }

      return updated;
    });

    setMbrOpen(false);
  };

  console.log(membId, content);

  const removeMbr = (mbrId, offId) => {
    let isRemove = true;

    if (mbrId && offId) {
      const data = {
        method: "remove-officer",
        officer: offId,
      };

      removeOfficer(data)
        .then((res) => {
          if (res.status == "ok") {
            isRemove = true;
          } else {
            isRemove = false;
            toast.Error("Failed to remove member.");
          }
        })
        .catch((err) => {
          isRemove = false;
          toast.Error("Failed to remove member.");
        });
    }

    if (isRemove) {
      setMembId((prev) => {
        const updated = { ...prev };
        delete updated[mbrId];
        return updated;
      });
      setContent((prev) => prev.filter((cnt) => cnt.id !== mbrId));
      toast.Success("Member removed successfully.");
    }
  };

  const setOfficers = (officer, member, title) => {
    Spn.Show();

    if ((member, title)) {
      const data = {
        method: "elect-officers",
        officer: officer,
        member: member,
        title: title,
      };

      electOfficers(data)
        .then((res) => {
          if (res.status == "ok") {
            getExOfficers();
            toast.Success("The officer’s title has been set.");
          } else {
            toast.Error(res.message);
          }
        })
        .catch((err) => {
          toast.Error("Failed to elect the officer. Please try again.");
        });
    }
  };

  const getExOfficers = () => {
    getOfficers()
      .then((res) => {
        const officers = res.data.officers;
        const dbMembData = officers.reduce((acc, officer) => {
          acc[officer.id] = [officer.name];
          return acc;
        }, {});

        setMembId((prev) => {
          return dbMembData;
        });

        setContent((prev) => {
          const merged = [...prev, ...officers];
          const updatedOfficers = Array.from(
            new Map(
              merged.map((officer) => [Number(officer.id), officer])
            ).values()
          );
          return updatedOfficers;
        });

        setOfficersTitles(res.data.titles.data);
      })
      .catch((err) => {
        toast.Error("Failed to retrive officers list. Please try again later!");
      });
  };

  useEffect(() => {
    Spn.Show();
    getExOfficers();
  }, []);

  return (
    <>
      {toast?.Obj}
      <div className="officers-wrap">
        <div>
          <span
            className="btn button plr-29 ptb-10"
            onClick={() => setMbrOpen(true)}
          >
            <span className="material-symbols-outlined icn">add_circle</span>
            <span className="btn-txt">Choose Officers</span>
          </span>
        </div>

        <div className="selected-membs">
          {content && content.length > 0 ? (
            content.map((usr, index) => (
              <div key={index} id={`person-${usr.id}`} className="ech-usr">
                <div className="can-btn">
                  <span
                    className="material-symbols-outlined"
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove this officer?"
                        )
                      ) {
                        removeMbr(usr.id, usr.offId);
                      }
                    }}
                  >
                    cancel
                  </span>
                </div>
                <div className="usr-top">{usr.name}</div>
                <div className="usr-wrap">
                  <div className="wp-lf">Member ID:</div>
                  <div className="wp-rg">{usr.memberId ?? "--"}</div>
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
                      options={officerTitles || []}
                      value={
                        officerTitles.find((op) => op.id === usr.title) || null
                      }
                      getOptionLabel={(op) => op.title}
                      getOptionValue={(op) => op}
                      onChange={(selectedOp) => {
                        setOfficers(usr.offId, usr.id, selectedOp.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-list">No officers have been elected</div>
          )}
        </div>
      </div>
      {isMbrOpen && (
        <SelectMember
          isOpen={isMbrOpen}
          toggle={() => {
            setMbrOpen(!isMbrOpen);
          }}
          addContent={handleAddContent}
          formType="elect-officer"
        />
      )}
    </>
  );
};

export default Officers;
