import axios from 'axios';

const getGgPf = async (userAccessToken) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
                Accept: 'application/json'
            }
        });

        if (response.status !== 200) {
            console.log("status in getGgPf khac 200")
            return false;
        }

        const data = response.data;
        console.log("profile api called success", data);
        localStorage.setItem('profile', JSON.stringify(data));
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log("profile in getGgPf", profile)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getGgPf };