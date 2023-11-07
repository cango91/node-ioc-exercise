export default interface UserResponseDTO {
    user: { id: string, username: string };
    token: string;
}