import axios, { AxiosError } from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";
import { RepositoryPayLoad } from "../interfaces/RepositoryPayLoad";
import AuthService from "./AuthService";

type RepositoryType = Repository<any>;

const GITHUB_API_URL = "https://api.github.com";

const githubApiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para añadir el token en cada request
githubApiClient.interceptors.request.use((config) => {
  config.headers.Authorization = AuthService.getAuthHeader() ?? "";
  return config;
});

// 🔹 Manejo centralizado de errores
const manejarError = (error: unknown, contexto: string) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    console.error(`${contexto}:`, err.response?.data || err.message);
  } else {
    console.error(`${contexto}:`, error);
  }
};

// 🔹 Obtener repositorios del usuario autenticado
export const fetchRepositories = async (): Promise<RepositoryType[]> => {
  try {
    const response = await githubApiClient.get<RepositoryType[]>("/user/repos", {
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

// 🔹 Crear un nuevo repositorio
export const createRepository = async (
  repository: Partial<RepositoryType>
): Promise<RepositoryType | null> => {
  try {
    const response = await githubApiClient.post<RepositoryType>(
      "/user/repos",
      repository
    );
    return response.data;
  } catch (error) {
    manejarError(error, "Error al crear el repositorio");
    return null;
  }
};

// 🔹 Actualizar un repositorio existente (solo campos permitidos)
export const updateRepository = async (
  owner: string,
  repo: string,
  data: Partial<RepositoryPayLoad> & { homepage?: string; private?: boolean }
): Promise<RepositoryType | null> => {
  try {
    const payload: any = {};
    if (data.description !== undefined) payload.description = data.description;
    if (data.homepage !== undefined) payload.homepage = data.homepage;
    if (data.private !== undefined) payload.private = data.private;

    const response = await githubApiClient.patch<RepositoryType>(
      `/repos/${owner}/${repo}`,
      payload
    );
    return response.data;
  } catch (error) {
    manejarError(error, "Error al actualizar el repositorio");
    return null;
  }
};

// 🔹 Eliminar un repositorio
export const deleteRepository = async (
  owner: string,
  repo: string
): Promise<boolean> => {
  try {
    const response = await githubApiClient.delete(`/repos/${owner}/${repo}`);
    if (response.status === 204) {
      console.log(`Repositorio ${repo} eliminado correctamente`);
      return true;
    }
    console.warn(`No se pudo eliminar el repositorio ${repo}`);
    return false;
  } catch (error) {
    manejarError(error, "Error al eliminar el repositorio");
    return false;
  }
};

// 🔹 Obtener información del usuario autenticado
export const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await githubApiClient.get<GithubUser>("/user");
    return response.data;
  } catch (error) {
    manejarError(error, "Error al obtener información del usuario");
    return null;
  }
};
