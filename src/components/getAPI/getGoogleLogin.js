// import axios from 'axios';


// const getGoogleProfile = async (userAccessToken) => {

//     // axios
//     //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`, {
//     //         headers: {
//     //             Authorization: `Bearer ${userAccessToken}`,
//     //             Accept: 'application/json'
//     //         }
//     //     })
//     //     .then((res) => {
//     //         setProfile(res.data);
//     //         console.log(profile)
//     //     })
//     //     .catch((err) => console.log(err));

//     try {
//         const response = await axios
//             .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`, {
//                 headers: {
//                     Authorization: `Bearer ${userAccessToken}`,
//                     Accept: 'application/json'
//                 }
//             });
//         const res = response.data;
//         localStorage.setItem('profile', JSON.stringify(res));
//         console.log('success profile:', res)
//         return res;
//     } catch (error) {
//         console.error('Error fetching:', error);
//         localStorage.setItem('profile', JSON.stringify(error));
//         throw error;
//     }
// };
// export default getGoogleProfile;

import axios from 'axios';
import { useEffect, useState } from 'react';

const useGgPf = (userAccessToken) => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`, {
                    headers: {
                        Authorization: `Bearer ${userAccessToken}`,
                        Accept: 'application/json'
                    }
                });
                const data = response.data;
                setProfile(data);

                localStorage.setItem('profile', JSON.stringify(data));
                console.log('Get success google api profile:', data)
                return data;

            } catch (error) {
                console.error('Error fetching:', error);
                setProfile([]);
                return profile;
            }
        };

        fetch();
    }, []);
    return profile;
};
export default useGgPf;