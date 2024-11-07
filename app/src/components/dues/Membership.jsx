import React, { useEffect, useState } from "react";
import Wrapper from "./dues.style";
import Select from "react-select";
import {
    getMembershipType,
    getAttachment,
    getMembership,
} from "../../api/duesAPI";
import { connect } from "react-redux";
import AuthActions from "../../redux/auth/actions";
import { ToastsStore } from "react-toasts";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { chooseMembership as enhancer } from "./enhancer";
import Modal from "./Payment";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";

import Checkbox from "../../UI/checkbox/checkbox";
import '../../assets/css/style2.css'
import MemberModal from "./ChooseMember";
import { store } from "../../redux/store";

const { logout } = AuthActions;

/* const list = [
  {
    label: "Not Applicable",
    value: "NotApplicable",
  },
  {
    label: "25 Years",
    value: "TwentyFiveYears",
  },
  {
    label: "50 Years",
    value: "FiftyYears",
  },
]; */

const Membership = (props) => {

    const [dropdown, setDropdown] = useState(null);
    const [subDropdown, setSubDropdown] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [PkdPlan, setPkdPlan] = useState(false);
    const [PkdSubPlan, setPkdSubPlan] = useState(false);
    const [isOwnChk, ownCheck] = useState(true);
    const [isGiftChk, giftCheck] = useState(false);

    const [isMbrOpen, setMbrOpen] = useState(false);
    const [content, setContent] = useState([]);

    const [members, setMembers] = useState([]);
    const [subDropItems, setSubDrop] = useState({});

    const {
        values,
        errors,
        touched,
        submitCount,
        handleChange
    } = props;

    const lgMbr = store.getState().auth.memberId;
    let mbrExist = false;

    let Spn = Spinner();
    let Tst = Toast();

    useEffect(() => {
        getMembershipType()
            .then((res) => {
                setDropdown(res.data);
            })
            .catch((err) => {
                // console.error(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        props.logout();
                        ToastsStore.error("Session Expire! Please login again.");
                        setTimeout(() => props.history.replace("/signin"), 800);
                    } else {
                        ToastsStore.error("Something went wrong!");
                    }
                } else if (err.request) {
                    ToastsStore.error("Unable to connect to server!");
                } else {
                    ToastsStore.error("Something went wrong!");
                }
            });

        addMbr(store.getState().auth.memberId);
    }, []);

    document.title = 'Membership - ' + window.seoTagLine;

    const Error = (props) => {
        const field1 = props.field;
        if ((errors[field1] && touched[field1]) || submitCount > 0) {
            return <div className="text-danger">{errors[field1]}</div>;
        } else {
            return <div />;
        }
    };

    const handleForm = (e) => {
        if (PkdPlan && PkdSubPlan) {
            Spn.Show();
            getMembership({
                membershipTypeId: PkdPlan,
                membershipChargesId: PkdSubPlan.membershipChargesId,
                serviceAward: "NotApplicable",
            })
                .then((res) => {
                    if (res.success === 1) {
                        setData(res.data);
                        setOpen(!isOpen);
                    } else {
                        //         ToastsStore.error(res.message);
                    }
                })
                .catch((err) => {
                    //       console.error(err);
                    //       ToastsStore.error("Something went wrong!");
                }).finally(() => {
                    Spn.Hide();
                });
        }

        e.preventDefault();
        return false;
    };

    const addMbr = (mbrId) => {
        setMembers(prevMembers => {
            const exstMbrIndx = prevMembers.findIndex(member => member.id === mbrId);

            if (exstMbrIndx !== -1) {
                // If the member exists, update the specific property for that member
                /*return prevMembers.map((member, index) =>
                    index === exstMbrIndx ? { ...member, planId: selectedOp.membershipTypeId } : member
                );*/
                mbrExist = true;
                return prevMembers;
            } else {
                return [
                    ...prevMembers,
                    {
                        id: mbrId,
                        planId: null,
                        subPlanId: null,
                        secDonation: null,
                        natnDonation: null,
                    }
                ];
            }
        });
    }

    const handleAddContent = (person) => {

        addMbr(person.id);
        if (!mbrExist) {
            setContent(
                [
                    ...content,
                    person
                ]
            );
        } else {
            console.log('member exist');
        }
        setMbrOpen(false);
    };


    return <Wrapper>
        {Spn.Obj}
        {Tst.Obj}
        <div className="red pt-20 bread-nav">
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/dues" className="text-white">
                            Dues
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active className="text-white">
                        Choose Membership
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
        <div className="container">
            <div className="ptb-50">
                <h4 className="mb-15">Choose Membership</h4>
                <form>

                    <>
                        <Checkbox
                            id="isOwn"
                            name="isOwn"
                            checked={isOwnChk}
                            onChange={(e) => {
                                ownCheck(!isOwnChk);

                            }}
                            label="Own Membership"
                        />
                        <div id="ownMembership" style={{ display: isOwnChk ? 'block' : 'none' }}>
                            <div className="mtb-20">
                                <label className="fs-16">Membership Dues/Fees:</label>
                                <Select
                                    id="plan"
                                    placeholder="Select membership type"
                                    options={dropdown || []}
                                    styles={{
                                        control: (value) => {
                                            return {
                                                ...value,
                                                minHeight: "44px",
                                                width: window.innerWidth >= 768 ? "50%" : "100%",
                                            };
                                        },
                                        placeholder: (defaultStyles) => {
                                            return {
                                                ...defaultStyles,
                                                paddingTop: "10px",
                                                paddingBottom: "10px",
                                                fontSize: "14px",
                                            };
                                        },
                                        menu: (provided, state) => ({
                                            ...provided,
                                            width: window.innerWidth >= 768 ? "50%" : "100%",
                                        }),
                                    }}
                                    onChange={(selectedOp) => {
                                        if (
                                            selectedOp &&
                                            selectedOp.membershipTypeId
                                        ) {
                                            Spn.Show();

                                            // setPkdPlan(selectedOp.membershipTypeId);
                                            // setPkdSubPlan(false);
                                            setMembers(prevItems =>
                                                prevItems.map((mbr) =>
                                                    mbr.id === lgMbr ? { ...mbr, planId: selectedOp.membershipTypeId, subPlanId: null } : mbr
                                                )
                                            );

                                            getAttachment(selectedOp.membershipTypeId)
                                                .then((res) => {
                                                    // setSubDropdown(res.data || []);
                                                    setSubDrop(prevDrpItems =>
                                                    ({
                                                        ...prevDrpItems,
                                                        [lgMbr]: {
                                                            items: res.data || []
                                                        },
                                                    })
                                                    );
                                                })
                                                .catch((err) => {
                                                    //     console.error(err);
                                                    //     ToastsStore.info("Failed to retrive list");
                                                })
                                                .finally(() => {
                                                    Spn.Hide();
                                                });
                                        }
                                    }}
                                    getOptionLabel={(op) => op.membershipTypeName}
                                    getOptionValue={(op) => op}
                                />
                                <Error field="plan" />
                            </div>
                            {subDropItems && subDropItems[lgMbr] && subDropItems[lgMbr].items && (
                                <div className="mt-10">
                                    <Select
                                        id="subPlan"
                                        placeholder="Amount"
                                        options={subDropItems[lgMbr].items || []}
                                        styles={{
                                            control: (value) => {
                                                return {
                                                    ...value,
                                                    minHeight: "44px",
                                                    width: window.innerWidth >= 768 ? "50%" : "100%",
                                                };
                                            },
                                            placeholder: (defaultStyles) => {
                                                return {
                                                    ...defaultStyles,
                                                    paddingTop: "10px",
                                                    paddingBottom: "10px",
                                                    fontSize: "14px",
                                                };
                                            },
                                            menu: (provided, state) => ({
                                                ...provided,
                                                width: window.innerWidth >= 768 ? "50%" : "100%",
                                            }),
                                        }}
                                        onChange={(selectedOp) => {
                                            //setPkdSubPlan(selectedOp);
                                            setMembers(prevItems =>
                                                prevItems.map((mbr) =>
                                                    mbr.id === lgMbr ? { ...mbr, subPlanId: selectedOp } : mbr
                                                )
                                            );
                                        }}
                                        getOptionLabel={(op) => op.chargesTitle}
                                        getOptionValue={(op) => op}
                                        value={members.find(m => m.id === lgMbr)?.subPlanId || null}
                                    />
                                    <Error field="subPlan" />
                                </div>
                            )}
                        </div>
                    </>

                    <>
                        <div className="mb20">
                            <Checkbox
                                id="isGift"
                                name="isGift"
                                checked={isGiftChk}
                                onChange={(e) => {
                                    giftCheck(!isGiftChk);
                                }}
                                label="Gift Membership To Others"
                            />
                        </div>
                        <div className="gift-membership" id="giftMembership" style={{ display: isGiftChk ? 'block' : 'none' }}>

                            <div id="selectedMembers">
                                {
                                    content && content.length > 0 ? (
                                        content.map(item => (
                                            <div className="ech-mbr" id={`person-${item.id}`} key={item.id}>
                                                <div className="avatar-sec">
                                                    {item.avatarUrl ? (
                                                        <div className="mbr-img">
                                                            <img src={item.avatarUrl} alt="" />
                                                        </div>
                                                    ) : (
                                                        <div className="no-img">
                                                            <span class="material-symbols-outlined icn">
                                                                person
                                                            </span>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                                <div className="mbr-nam">
                                                    {item.name}
                                                </div>
                                                <div className="action">
                                                    <span className="material-symbols-outlined">cancel</span>
                                                </div>

                                                <div className="" style={{ width: '450px' }}>
                                                    <label className="fs-16">Membership Dues/Fees:</label>
                                                    <Select
                                                        id=""
                                                        placeholder="Select membership type"
                                                        options={dropdown || []}
                                                        styles={{
                                                            control: (value) => {
                                                                return {
                                                                    ...value,
                                                                    minHeight: "44px",
                                                                    width: window.innerWidth >= 768 ? "50%" : "100%",
                                                                };
                                                            },
                                                            placeholder: (defaultStyles) => {
                                                                return {
                                                                    ...defaultStyles,
                                                                    paddingTop: "10px",
                                                                    paddingBottom: "10px",
                                                                    fontSize: "14px",
                                                                };
                                                            },
                                                            menu: (provided, state) => ({
                                                                ...provided,
                                                                width: window.innerWidth >= 768 ? "50%" : "100%",
                                                            }),
                                                        }}
                                                        onChange={(selectedOp) => {
                                                            if (
                                                                selectedOp &&
                                                                selectedOp.membershipTypeId
                                                            ) {
                                                                Spn.Show();

                                                                setMembers(prevItems =>
                                                                    prevItems.map((mbr) =>
                                                                        mbr.id === item.id ? { ...mbr, planId: selectedOp.membershipTypeId, subPlanId: null } : mbr
                                                                    )
                                                                );

                                                                getAttachment(selectedOp.membershipTypeId)
                                                                    .then((res) => {

                                                                        setSubDrop(prevDrpItems =>
                                                                        ({
                                                                            ...prevDrpItems,
                                                                            [item.id]: {
                                                                                items: res.data || []
                                                                            },
                                                                        })
                                                                        );
                                                                    })
                                                                    .catch((err) => {
                                                                        //     console.error(err);
                                                                    })
                                                                    .finally(() => {
                                                                        Spn.Hide();
                                                                    });
                                                            }
                                                        }}
                                                        getOptionLabel={(op) => op.membershipTypeName}
                                                        getOptionValue={(op) => op}
                                                    />
                                                    {/* <Error field="plan" /> */}
                                                </div>

                                                {subDropItems && subDropItems[item.id] && subDropItems[item.id].items && (
                                                    <div className="" style={{ width: '450px' }}>
                                                        <Select
                                                            id="subPlan2"
                                                            placeholder="Amount"
                                                            options={subDropItems[item.id].items || []}
                                                            styles={{
                                                                control: (value) => {
                                                                    return {
                                                                        ...value,
                                                                        minHeight: "44px",
                                                                        width: window.innerWidth >= 768 ? "50%" : "100%",
                                                                    };
                                                                },
                                                                placeholder: (defaultStyles) => {
                                                                    return {
                                                                        ...defaultStyles,
                                                                        paddingTop: "10px",
                                                                        paddingBottom: "10px",
                                                                        fontSize: "14px",
                                                                    };
                                                                },
                                                                menu: (provided, state) => ({
                                                                    ...provided,
                                                                    width: window.innerWidth >= 768 ? "50%" : "100%",
                                                                }),
                                                            }}
                                                            onChange={(selectedOp) => {
                                                                setMembers(prevItems =>
                                                                    prevItems.map((mbr) =>
                                                                        mbr.id === item.id ? { ...mbr, subPlanId: selectedOp } : mbr
                                                                    )
                                                                );
                                                            }}
                                                            getOptionLabel={(op) => op.chargesTitle}
                                                            getOptionValue={(op) => op}
                                                            value={members.find(m => m.id === item.id)?.subPlanId || null}
                                                        />
                                                        <Error field="subPlan" />
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : ('')
                                }
                            </div>


                            <div className="add-btn-sec">
                                <span className="btn" id="addBtn" onClick={(e) => setMbrOpen(true)}>
                                    <span class="material-symbols-outlined icn">
                                        add_circle
                                    </span>
                                    <span className="btn-txt">
                                        Add More
                                    </span>
                                </span>
                            </div>
                        </div>
                    </>

                    {
                        PkdPlan && PkdSubPlan ?
                            <div className="text-center mt-50">
                                <button
                                    type="button"
                                    className="btn btn-rounded button plr-50 ptb-10"
                                    onClick={(e) => handleForm(e)}
                                >
                                    NEXT
                                </button>
                            </div> :
                            null
                    }
                </form>
            </div>
        </div>

        {
            data && isOpen && (
                <Modal
                    isOpen={isOpen}
                    toggle={() => {
                        setOpen(!isOpen)
                    }}
                    data={data}
                    membershipValue={values}
                    changeURL={props.history.push}
                />
            )
        }

        {
            isMbrOpen && (
                <MemberModal
                    isOpen={isMbrOpen}
                    toggle={() => {
                        setMbrOpen(!isMbrOpen)
                    }}
                    addContent={handleAddContent}
                    changeURL={props.history.push}
                />
            )
        }
    </Wrapper >
};

export default compose(enhancer, connect(null, { logout }))(Membership);
