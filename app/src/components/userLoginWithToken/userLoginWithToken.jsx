import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../helper/constant'
import { useDispatch } from 'react-redux';
import AuthActions from "../../redux/auth/actions";

const UserLoginWithToken = (props) => {
    const { key } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const validateToken = async (token) => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/public/?method=user-login-with-token`,
                    { token }
                );
                if (response.data.status === 'ok') {
                    const r = response.data.data;
                    dispatch(
                        AuthActions.login({
                            isLogin: true,
                            accessToken: r.accessToken,
                            memberId: r.memberId,
                            firstName: r.firstName,
                            lastName: r.lastName,
                            referralPoints: r.refferalPoints || 0,
                            prefix: r.prefix,
                            profileImage: r.profileImage,
                            isProfileCreated: r.profileCreated,
                            isNotificationOn: r.notification || false,
                            currentChapter: r.currentChapter,
                            userRoles: r.roles,
                            membershipStatus: r.membershipStatus,
                        })
                    );
                    props.history.push("/account");
                }
            } catch (error) {
            }
        };
        if (key) {
            validateToken(key);
        }
    }, []);

    return <></>
}

export default UserLoginWithToken;
