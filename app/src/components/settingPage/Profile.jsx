import React, { useState } from "react";
import LabelWithValue from "../../UI/labelWithValue/LabelWithValue";
import Wrapper from "./common.style";
import UpdateProfile from "./EditProfile";
import { store } from "../../redux/store";
import Pix from "../../helper/Pix";
import Checkbox from "../../UI/checkbox/checkbox";
import { PROFILE_OPTIONS } from "../../helper/constant";

const Profile = (props) => {
  const isProfileCreated = store.getState().auth.isProfileCreated;
  const profile = props.data;
  const [editMode, setEditMode] = useState(isProfileCreated ? false : true);
  console.log(profile);

  const { userRoles } = store.getState().auth;
  const roleLabels = PROFILE_OPTIONS.memberRole
    .filter((option) => userRoles.includes(option.value))
    .map((option) => option.label);

  document.title = "Profile - " + window.seoTagLine;

  return (
    <Wrapper>
      <section className={props.isMobile ? " border plr-15 ptb-30" : ""}>
        <div className="mb-20">
          <h3 className="text-bold">
            Personal Information
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
                {
                    `${(profile.profile.prefix.name && profile.visible.prefix) ? profile.profile.prefix.name : ""}
                    ${profile.profile.firstName || ""}
                    ${profile.profile.middleName || ""} 
                    ${profile.profile.lastName || ""}${profile.profile.suffix.name ? ", " + (profile.profile.suffix.name || "") : ""}`.trim() || "-"
                }
              </div>
            </div>
            {
                profile.profile.ageRange ? (
                    <div className="col-6 pt-2">
                        <div className="form-group">
                            <label className="fs-18 medium-text">Age Category&nbsp;:&nbsp;</label>
                            {profile.profile.ageRange}
                        </div>
                    </div>
                ) : ''
            }
            {
                profile.profile.racialIdentity.name &&
                profile.visible.racialIdentity ? (
                    <div className="col-6 pt-2">
                        <div className="form-group">
                            <label className="fs-18 medium-text">Racial Identity&nbsp;:&nbsp;</label>
                            {profile.profile.racialIdentity.name ?? "-"}
                        </div>
                    </div>
                ) : ''
            }
            {
                profile.profile.household.name &&
                profile.visible.household ? (
                    <div className="col-6 pt-2">
                        <div className="form-group">
                            <label className="fs-18 medium-text">Household&nbsp;:&nbsp;</label>
                            {profile.profile.household.name ?? "-"}
                        </div>
                    </div>
                ) : ''
            }
            {
                profile.profile.biography &&
                profile.visible.biography ? (
                    <div className="col-6 pt-2">
                        <div className="form-group">
                            <label className="fs-18 medium-text">Shot Bio&nbsp;:&nbsp;</label>
                            {profile.profile.biography ?? "-"}
                        </div>
                    </div>
                ) : ''
            }
            
            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Contact Information</h3>
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
                  Address 1&nbsp;:&nbsp;
                </label>
                {profile.profile.address || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Address 2&nbsp;:&nbsp;
                </label>
                {profile.profile.address2 || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  City&nbsp;:&nbsp;
                </label>
                {profile.profile.city || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  State&nbsp;:&nbsp;
                </label>
                {profile.profile.state.name || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Country&nbsp;:&nbsp;
                </label>
                {profile.profile.country.name || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Zip Code&nbsp;:&nbsp;
                </label>
                {profile.profile.zipcode || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Registered Voting Precinct / Ward / District&nbsp;:&nbsp;
                </label>
                {profile.profile.regVotWrdDist ?? "-"}
              </div>
            </div>
            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Professional Information</h3>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Employer Name&nbsp;:&nbsp;
                </label>
                {profile.profile.employerName || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Business Email Address&nbsp;:&nbsp;
                </label>
                {profile.profile.businessEmail || ""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Employment Status&nbsp;:&nbsp;
                </label>
                {profile.profile.employmentStatus.name || ""}
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
                  Salary Range&nbsp;:&nbsp;
                </label>
                {profile.profile.salaryRange.name || ""}
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
                  Expertise&nbsp;:&nbsp;
                </label>
                <ul>
                  {profile.profile.expertises &&
                    profile.profile.expertises.map((cert, index) => {
                      return <li key={index}>{cert.name}</li>;
                    })}
                </ul>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Volunteer Interests&nbsp;:&nbsp;
                </label>
                <ul>
                  {profile.profile.volunteers &&
                    profile.profile.volunteers.map((cert, index) => {
                      return <li key={index}>{cert.name}</li>;
                    })}
                </ul>
              </div>
            </div>
            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Guardian / Parental information</h3>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  First Name&nbsp;:&nbsp;
                </label>
                {profile.profile.gpFirstName ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Last Name&nbsp;:&nbsp;
                </label>
                {profile.profile.gpLastName ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Phone Number&nbsp;:&nbsp;
                </label>
                {profile.profile.gpPhone ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Email&nbsp;:&nbsp;
                </label>
                {profile.profile.gpEmail ?? "-"}
              </div>
            </div>
            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Organizational Information</h3>
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
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Section of Initiation&nbsp;:&nbsp;
                </label>
                {(profile.profile.chapterOfInitiation &&
                  profile.profile.chapterOfInitiation.name) ??
                  "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Collegiate Section&nbsp;:&nbsp;
                </label>
                {profile.profile.collegiateSection.name ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Affiliate Organization&nbsp;:&nbsp;
                </label>
                <ul>
                    {profile.profile.affilateOrgzn &&
                        profile.profile.affilateOrgzn.map((aff, index) => {
                            return <li key={index}>{aff.name}</li>
                    })}
                </ul>
              </div>
            </div>
            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Membership & Status Info</h3>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Member ID&nbsp;:&nbsp;
                </label>
                {profile.profile.memberCode ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Membership Category&nbsp;:&nbsp;
                </label>
                Legacy Membership
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Status&nbsp;:&nbsp;
                </label>
                Active
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Most Current Paid Date&nbsp;:&nbsp;
                </label>
                {profile.profile.yearOfInitiation ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Last Paid Date&nbsp;:&nbsp;
                </label>
                {profile.profile.yearOfInitiation ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Date of Initiation (Original Join Date)&nbsp;:&nbsp;
                </label>
                {profile.profile.yearOfInitiation ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Join Date (Upgrade Date)&nbsp;:&nbsp;
                </label>
                {profile.profile.yearOfInitiation ?? "-"}
              </div>
            </div>

            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Leadership & Roles</h3>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">Appointed NCNW Officer Positions&nbsp;:&nbsp;</label>
                {profile.profile.leadershipRole && (
                  <ul>
                    {roleLabels.map((label, index) => (
                      <React.Fragment key={index}>
                        <li>{label}</li>
                      </React.Fragment>
                    ))}
                  </ul>
                )}
                {""}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Elected&nbsp;:&nbsp;
                </label>
                Financial Secretary
              </div>
            </div>

            <div className="col-12 pt-2">
              <div className="form-group">
                <h3 className="text-bold">Others</h3>
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <Checkbox
                    label="Deceased"
                    checked={true}
                    isDisabled={true}
                />
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Total Sum of Legacy Payment&nbsp;:&nbsp;
                </label>
                {Pix.dollar(2700, 1)}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Total Sum of Legacy Life Payment&nbsp;:&nbsp;
                </label>
                {Pix.dollar(2700, 1)}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Pin Shipping Indicator&nbsp;:&nbsp;
                </label>
                Shipped
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  Pin Shipping Date&nbsp;:&nbsp;
                </label>
                {profile.profile.yearOfInitiation ?? "-"}
              </div>
            </div>
            <div className="col-6 pt-2">
              <div className="form-group">
                <label className="fs-18 medium-text">
                  President Circle&nbsp;:&nbsp;
                </label>
                Sample Circle
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
