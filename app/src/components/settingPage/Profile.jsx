import React, { useState } from "react";
import LabelWithValue from "../../UI/labelWithValue/LabelWithValue";
import Wrapper from "./common.style";
import UpdateProfile from "./EditProfile";
import { store } from "../../redux/store";

const Profile = (props) => {
  const isProfileCreated = store.getState().auth.isProfileCreated;
  const profile = props.data;
  const [editMode, setEditMode] = useState(isProfileCreated ? false : true);
  console.log(profile);

  document.title = "Profile - " + window.seoTagLine;

  return (
    <Wrapper>
      <section className={props.isMobile ? " border plr-15 ptb-30" : ""}>
        <div className="mb-20">
          <h3 className="text-bold">
            Profile
            <span
              className="float-right cursor-pointer fs-18"
              onClick={(e) => setEditMode(!editMode)}
            >
              Edit
            </span>
          </h3>
        </div>
        {isProfileCreated ? (
          <div className={"row"}>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">Name&nbsp;:&nbsp;</label>
                {profile.profile.firstName + " " + profile.profile.lastName ??
                  "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">Mobile&nbsp;:&nbsp;</label>
                {profile.profile.phoneNumber ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">Email&nbsp;:&nbsp;</label>
                {profile.profile.email ?? "-"}{" "}
              </div>
            </div>

            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Address&nbsp;:&nbsp;
                </label>
                {profile.profile.address ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Shot Bio&nbsp;:&nbsp;
                </label>
                {profile.profile.biography ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Occupation&nbsp;:&nbsp;
                </label>
                {profile.profile.occupation.name ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Education&nbsp;:&nbsp;
                </label>
                <ul>
                  {profile.profile.educations &&
                    profile.profile.educations.map((edu, index) => {
                      return (
                        <li key={index}>
                          <LabelWithValue
                            label="University"
                            value={edu.university.name}
                          />
                          <LabelWithValue
                            label="Degree"
                            value={edu.degree.name}
                          />
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Certifications&nbsp;:&nbsp;
                </label>
                <ul>
                  {profile.profile.certifications &&
                    profile.profile.certifications.map((cert, index) => {
                      return <li key={index}>{cert.name}</li>;
                    })}
                </ul>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Industry&nbsp;:&nbsp;
                </label>
                {profile.profile.industry.name ?? "-"}
              </div>
            </div>

            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Affiliate Organization&nbsp;:&nbsp;
                </label>
                {profile.profile.affilateOrgzn.name ?? "-"}
              </div>
            </div>

            <div className="col-6 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Organizational Data</h3>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">&nbsp;&nbsp;</label>
              </div>
            </div>

            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Country&nbsp;:&nbsp;
                </label>
                {(profile.profile.nation && profile.profile.nation.name) ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">Region&nbsp;:&nbsp;</label>
                {(profile.profile.region && profile.profile.region.name) ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Organizational State&nbsp;:&nbsp;
                </label>
                {(profile.profile.organizationalState &&
                  profile.profile.organizationalState.name) ??
                  "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Section Of Initiation&nbsp;:&nbsp;
                </label>
                {(profile.profile.chapterOfInitiation &&
                  profile.profile.chapterOfInitiation.name) ??
                  "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Date of Initiation&nbsp;:&nbsp;
                </label>
                {profile.profile.yearOfInitiation ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Current Section&nbsp;:&nbsp;
                </label>
                {profile.profile.currentChapter &&
                profile.profile.currentChapter.name != ""
                  ? profile.profile.currentChapter.name
                  : "National Member"}
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <LabelWithValue
              label="Name"
              value={profile.profile.firstName + " " + profile.profile.lastName}
            />
            <LabelWithValue label="Email" value={profile.profile.email} />
            <LabelWithValue
              label="Member ID"
              value={profile.profile.memberCode}
            />
          </React.Fragment>
        )}
        {editMode && (
          <UpdateProfile
            show={editMode}
            toggle={() => setEditMode(!editMode)}
            profile={profile}
            updatePage={() => window.location.reload()}
          />
        )}
      </section>
    </Wrapper>
  );
};

export default Profile;
