import React, { useEffect, useState } from "react";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import { getMembers } from "../../api/LeadershipAPI";
import MemberForm from "./MemberForm";
import { store } from "../../redux/store";

const Members = () => {
  const toast = Toast();
  let Spn = Spinner();
  let pgn = 1;

  const [members, setMembers] = useState([]);
  const [isMbrOpen, setMbrOpen] = useState(false);
  const [type, setType] = useState();
  const [modDatas, setModDatas] = useState({});

  const { userRoles } = store.getState().auth;

  const mmbrsLstType = {
    "state-leader": { value: "state", label: "State Members" },
    "section-leader": { value: "section", label: "Section Members" },
    "section-president": { value: "section", label: "Section Members" },
    "affiliate-leader": { value: "affiliate", label: "Affiliate Members" },
    "collegiate-leaders": { value: "collegiate", label: "Collegiate Members" },
    "section-officer": { value: "section", label: "Section Members" },
  };

  const seen = new Set();
  const filteredRoles = userRoles.filter((roleKey) => {
    const value = mmbrsLstType[roleKey]?.value;
    if (value && !seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });

  const buildRequestBody = (overrides = {}) => ({
    method: "get-members",
    page: pgn,
    key: document.getElementById("srchKey")?.value || "",
    type: type,
    ...overrides,
  });

  const getRole = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    showMembers(e, selectedType);
  };

  const showMembers = (e, selectedType = type, append = false) => {
    const body = buildRequestBody({ type: selectedType, page: pgn });
    fetchMembers(body, append);
    e.preventDefault();
  };

  const showMore = (e, currentPage, append) => {
    pgn = currentPage + 1;
    const body = buildRequestBody({ page: pgn });
    fetchMembers(body, append);
  };

  const handleAddContent = (success = false) => {
    if (success) {
      const body = buildRequestBody({ page: 1 });
      fetchMembers(body);
      setModDatas({});
      setMbrOpen(false);
    }
  };

  const editMember = (iKey) => {
    const m = members.list[iKey];
    const modData = {
      id: m.id,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      address: m.address,
      city: m.city,
      zipcode: m.zipcode,
      phone: m.phone,
      section: m.section,
      affiliation: m.affiliation,
      sectionId: m.cruntChptr,
      affiliationId: m.affilateOrgzn,
    };
    setModDatas(modData);
    setMbrOpen(true);
  };

  const fetchMembers = (body, append = false) => {
    Spn.Show();
    getMembers(body)
      .then((res) => {
        if (res.status === "ok") {
          if (append) {
            setMembers((prev) => ({
              ...prev,
              list: [...prev.list, ...res.data.list],
              currentPageNo: res.data.currentPageNo,
              totalPages: res.data.totalPages,
            }));
          } else {
            setMembers(res.data);
          }
        } else {
          setMembers([]);
        }
      })
      .catch(() => {
        toast.Error("Failed to retrieve members list. Please try again later!");
      })
      .finally(() => {
        Spn.Hide();
      });
  };

  useEffect(() => {
    if (filteredRoles.length > 0 && !type) {
      const initialType = mmbrsLstType[filteredRoles[0]].value;
      setType(initialType);
      const body = buildRequestBody({ type: initialType });
      fetchMembers(body);
    }
  }, [filteredRoles]);

  return (
    <>
      {toast?.Obj}
      <div className="due-serch">
        <div className="add-membs">
          <span
            className="btn"
            onClick={() => {
              setMbrOpen(true);
              setModDatas({});
            }}
          >
            ADD NEW MEMBER
          </span>
          <select
            name="type"
            id="type"
            className="select"
            value={type || ""}
            onChange={getRole}
          >
            {filteredRoles.map((roleKey) => (
              <option key={roleKey} value={mmbrsLstType[roleKey].value}>
                {mmbrsLstType[roleKey].label}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={(e) => showMembers(e, type)}>
          <input type="text" name="key" className="key-inp" id="srchKey" />
          <button
            type="button"
            className="srch-btn"
            onClick={(e) => showMembers(e, type)}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      <div className="member-wrap">
        {members && members.totalPages ? (
          members.list && members.list.length > 0 ? (
            <>
              {members.list.map((memb, index) => (
                <div className="ech-memb" key={index}>
                  <div className="edit-btn">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => editMember(index)}
                    >
                      edit
                    </span>
                  </div>
                  <div className="memb-top">
                    <div className="memb-avatar">
                      {memb.avatar ? (
                        <div className="mbr-img">
                          <img src={memb.avatar} alt="" />
                        </div>
                      ) : (
                        <div className="no-img">
                          <span className="material-symbols-outlined icn">
                            person
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="memb-nam">{memb.name}</div>
                  </div>
                  <div className="memb-dtls">
                    <div className="dt-itm">
                      <span className="material-symbols-outlined">barcode</span>
                      <span>{memb.memberId ?? "--"}</span>
                    </div>
                    <div className="dt-itm">
                      <span className="material-symbols-outlined">
                        share_location
                      </span>
                      <span>
                        {memb.city
                          ? `${memb.city}, ${memb.zipcode}`
                          : memb.zipcode || "--"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )
        ) : (
          <div className="no-dues memb">No members found</div>
        )}
      </div>
      {members.totalPages > members.currentPageNo ? (
        <div className="show-more members">
          <span
            className="btn"
            onClick={(e) => showMore(e, members.currentPageNo, true)}
          >
            Show more
          </span>
        </div>
      ) : (
        ""
      )}
      {isMbrOpen && (
        <MemberForm
          isOpen={isMbrOpen}
          data={modDatas}
          toggle={() => setMbrOpen(!isMbrOpen)}
          addContent={handleAddContent}
        />
      )}
    </>
  );
};

export default Members;
