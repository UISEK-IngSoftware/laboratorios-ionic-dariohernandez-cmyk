export interface Repository<T> {
    id: string;
    name: string;
    description: string;
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}
