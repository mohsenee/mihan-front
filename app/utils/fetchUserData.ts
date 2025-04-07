import { AppDispatch } from '../store/store';
import { setUserName } from '../store/userSlice';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchUserData = async (dispatch: AppDispatch, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/getUserData`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUserName(data.userName));
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('role', data.role);
      localStorage.setItem('access', data.access.toString());
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
