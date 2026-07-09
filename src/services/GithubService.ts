import axios, { AxiosError } from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";
import AuthService from "./AuthService";

const GITHUB_API_URL = "https://api.github.com";

const githubApiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para añadir el token en cada request
githubApiClient.interceptors.request.use((config) => {
  config.headers.Authorization = AuthService.getAuthHeader();
  return config;
});

// 🔹 Manejo centralizado de errores en español
const manejarError = (error: unknown, contexto: string) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    console.error(`${contexto}:`, err.response?.data || err.message);
  } else {
    console.error(`${contexto}:`, error);
  }
};

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await githubApiClient.get<Repository[]>("/user/repos", {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });
    return response.data;
  } catch (error) {
    manejarError(error, "Error al obtener repositorios");
    return [];
  }
};

export const createRepository = async (
  repository: Partial<Repository>
): Promise<Repository | null> => {
  try {
    const response = await githubApiClient.post<Repository>(
      "/user/repos",
      repository
    );
    return response.data;
  } catch (error) {
    manejarError(error, "Error al crear el repositorio");
    return null;
  }
};

export const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await githubApiClient.get<GithubUser>("/user");
    return response.data;
  } catch (error) {
    manejarError(error, "Error al obtener información del usuario");
    return null;
  }
};
