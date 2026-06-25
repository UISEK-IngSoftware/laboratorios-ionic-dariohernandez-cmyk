import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN; // 
export const fetchRepositories = async (): Promise<Repository<any>[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
        t: Date.now(), // Add a timestamp to prevent caching  
      },
    });
    return response.data as Repository<any>[];
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const createRepository = async (
  repository: Partial<Repository<any>> = {}
): Promise<Repository<any> | null> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repository, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data as Repository<any>;
  } catch (error) {
    console.error("Error creating repository:", error);
    return null;
  }
};
export const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });
    return response.data as GithubUser;
  } catch (error) {
    console.error("Error obteniendo información del usuario:", error);
    return null;
  }
};