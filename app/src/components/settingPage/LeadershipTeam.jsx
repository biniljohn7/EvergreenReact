import React from "react";
import Wrapper from "./common.style";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import UserPic from "../../assets/images/user_1x.png";
import "./LeadershipTeam.css";

const LeadershipTeam = (props) => {
  let Tst = Toast();
  let Spn = Spinner();
  document.title = "Leadership Team - " + window.seoTagLine;

  const teamData = [
    {
      role: "State Leader",
      members: [
        {
          name: "Dr. Anita Roberts",
          title: "State Chairperson",
          memberId: "SL001",
          address: "123 Unity Blvd, Washington, DC",
          messageLink: "mailto:anita.roberts@example.com",
          profileImage: UserPic,
        },
        {
          name: "James Carter",
          title: "Deputy State Leader",
          memberId: "SL002",
          address: "456 Harmony Rd, Richmond, VA",
          messageLink: "mailto:james.carter@example.com",
          profileImage: UserPic,
        },
      ],
    },
    {
      role: "Section Leader",
      members: [
        {
          name: "Maria Gonzalez",
          title: "North Section Lead",
          memberId: "SEC101",
          address: "789 North St, Chicago, IL",
          messageLink: "mailto:maria.gonzalez@example.com",
          profileImage: UserPic,
        },
        {
          name: "John Lee",
          title: "South Section Lead",
          memberId: "SEC102",
          address: "321 South Ave, Dallas, TX",
          messageLink: "mailto:john.lee@example.com",
          profileImage: UserPic,
        },
      ],
    },
    {
      role: "Section President",
      members: [
        {
          name: "Tanya Brooks",
          title: "President - Atlanta Section",
          memberId: "PRES301",
          address: "100 Peach St, Atlanta, GA",
          messageLink: "mailto:tanya.brooks@example.com",
          profileImage: UserPic,
        },
        {
          name: "Samuel Wright",
          title: "President - Miami Section",
          memberId: "PRES302",
          address: "200 Ocean Dr, Miami, FL",
          messageLink: "mailto:samuel.wright@example.com",
          profileImage: UserPic,
        },
      ],
    },
  ];

  return (
    <>
      {Tst.Obj}
      {Spn.Obj}
      <Wrapper>
        <section className={props.isMobile ? "leader-section" : ""}>
          <h3 className="text-bold mb-20">Leadership Team</h3>
          {teamData.map((group, index) => (
            <div key={index} className="mb-30">
              <h4 className="leader-role">{group.role}</h4>
              <div>
                {group.members.map((member, idx) => (
                  <div key={idx} className="leader-card">
                    <img
                      src={member.profileImage}
                      alt={member.name}
                      className="leader-image"
                    />
                    <div>
                      <div className="leader-name">{member.name}</div>
                      <div className="leader-title">{member.title}</div>
                      <div className="leader-details">
                        <strong>Member ID:</strong> {member.memberId}
                        <br />
                        <strong>Address:</strong> {member.address}
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
          ))}
        </section>
      </Wrapper>
    </>
  );
};

export default LeadershipTeam;
