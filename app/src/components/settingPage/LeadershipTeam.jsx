import React, { useState, useEffect } from "react";
import Wrapper from "./common.style";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import UserPic from "../../assets/images/user_1x.png";
import "./LeadershipTeam.css";
import { viewLeaders } from "../../api/memberAPI";

const LeadershipTeam = (props) => {
  let Tst = Toast();
  let Spn = Spinner();

  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  document.title = "Leadership Team - " + window.seoTagLine;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewLeaders();
        setTeamData(res?.data?.teamData || []);
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("Session Expired! Please login again.");
        } else {
          console.log("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return null;
  return (
    <>
      {Tst.Obj}
      {Spn.Obj}
      <Wrapper>
        <section className={props.isMobile ? "leader-section" : ""}>
          <h3 className="text-bold mb-20">Leadership Team</h3>
          {teamData && teamData.length > 0 ? (
            teamData.map((group, index) => (
              <div key={index} className="mb-30">
                <h4 className="leader-role">{group.role}</h4>
                <div>
                  {group.members.map((member, idx) => (
                    <div key={idx} className="leader-card">
                      <img
                        src={
                          member.profileImage ? member.profileImage : UserPic
                        }
                        alt={member.name}
                        className="leader-image"
                      />
                      <div>
                        <div className="leader-name">{member.name}</div>
                        <div className="leader-title">{member.title}</div>
                        <div className="leader-details">
                          <strong>Member ID:</strong> {member.memberId ?? "--"}
                          <br />
                          <strong>Address:</strong> {member.address ?? "--"}
                          {/* <br />
                        <a
                          href={member.messageLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Send Message
                        </a> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-list">No details found.</div>
          )}
        </section>
      </Wrapper>
    </>
  );
};

export default LeadershipTeam;
